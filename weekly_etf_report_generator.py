#!/usr/bin/env python3
"""
Týdenní ETF Report Generator
Kombinuje aktuální tržní informace s ETF daty z databáze pro automatické generování článků
"""

import os
import json
from datetime import datetime, timedelta
from supabase import create_client, Client
from dotenv import load_dotenv
import requests
from typing import List, Dict, Any

# Načtení environment variables
load_dotenv()

# Supabase setup
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_ANON_KEY = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    print("ERROR: Supabase credentials not found in .env file")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

class WeeklyETFReporter:
    def __init__(self):
        self.report_date = datetime.now()
        self.week_start = self.report_date - timedelta(days=7)
        
    def get_etf_performance_data(self) -> Dict[str, Any]:
        """Získá data o výkonnosti ETF z databáze"""
        try:
            # TOP 5 akciových ETF za poslední týden (YTD jako proxy)
            top_equity_response = supabase.table('etf_funds')\
                .select('name, primary_ticker, return_ytd, fund_provider, category')\
                .eq('category', 'Akcie')\
                .not_.is_('return_ytd', 'null')\
                .eq('is_leveraged', False)\
                .order('return_ytd', desc=True)\
                .limit(5)\
                .execute()
            
            # TOP 5 dluhopisových ETF
            top_bonds_response = supabase.table('etf_funds')\
                .select('name, primary_ticker, return_ytd, fund_provider, category')\
                .eq('category', 'Dluhopisy')\
                .not_.is_('return_ytd', 'null')\
                .eq('is_leveraged', False)\
                .order('return_ytd', desc=True)\
                .limit(5)\
                .execute()
            
            # FLOP 5 akciových ETF (nejhorší výkonnost)
            flop_equity_response = supabase.table('etf_funds')\
                .select('name, primary_ticker, return_ytd, fund_provider, category')\
                .eq('category', 'Akcie')\
                .not_.is_('return_ytd', 'null')\
                .eq('is_leveraged', False)\
                .order('return_ytd', desc=False)\
                .limit(5)\
                .execute()
            
            # Nejlevnější ETF podle TER
            cheapest_response = supabase.table('etf_funds')\
                .select('name, primary_ticker, ter_numeric, fund_provider, category')\
                .not_.is_('ter_numeric', 'null')\
                .eq('is_leveraged', False)\
                .order('ter_numeric', desc=False)\
                .limit(10)\
                .execute()
            
            # Statistiky podle kategorií
            categories_stats = {}
            for category in ['Akcie', 'Dluhopisy', 'Krypto', 'Komodity', 'Nemovitosti']:
                stats_response = supabase.table('etf_funds')\
                    .select('return_ytd, ter_numeric')\
                    .eq('category', category)\
                    .eq('is_leveraged', False)\
                    .not_.is_('return_ytd', 'null')\
                    .execute()
                
                if stats_response.data:
                    returns = [etf['return_ytd'] for etf in stats_response.data if etf['return_ytd'] is not None]
                    avg_return = sum(returns) / len(returns) if returns else 0
                    categories_stats[category] = {
                        'count': len(stats_response.data),
                        'avg_return_ytd': round(avg_return, 2)
                    }
            
            return {
                'top_equity': top_equity_response.data,
                'top_bonds': top_bonds_response.data,
                'flop_equity': flop_equity_response.data,
                'cheapest': cheapest_response.data,
                'categories_stats': categories_stats
            }
            
        except Exception as e:
            print(f"Chyba při získávání ETF dat: {e}")
            return {}
    
    def generate_markdown_report(self, market_data: Dict, etf_data: Dict) -> str:
        """Generuje markdown článek"""
        
        report_md = f"""# Týdenní ETF přehled - {self.report_date.strftime('%d.%m.%Y')}

## 📈 Tržní přehled týdne

### Hlavní indexy
{market_data.get('market_summary', 'Data o trzích nejsou k dispozici')}

### Klíčové události
{market_data.get('key_events', 'Žádné klíčové události')}

## 🏆 TOP výkonnost ETF fondů

### TOP 5 akciových ETF (YTD)
"""
        
        if etf_data.get('top_equity'):
            for i, etf in enumerate(etf_data['top_equity'], 1):
                report_md += f"{i}. **{etf['name']}** ({etf['primary_ticker']}) - {etf['return_ytd']:.2f}% YTD\n"
                report_md += f"   *{etf['fund_provider']}*\n\n"
        
        report_md += """
### TOP 5 dluhopisových ETF (YTD)
"""
        
        if etf_data.get('top_bonds'):
            for i, etf in enumerate(etf_data['top_bonds'], 1):
                report_md += f"{i}. **{etf['name']}** ({etf['primary_ticker']}) - {etf['return_ytd']:.2f}% YTD\n"
                report_md += f"   *{etf['fund_provider']}*\n\n"
        
        report_md += """
## 📉 Nejhorší výkonnost

### FLOP 5 akciových ETF (YTD)
"""
        
        if etf_data.get('flop_equity'):
            for i, etf in enumerate(etf_data['flop_equity'], 1):
                report_md += f"{i}. **{etf['name']}** ({etf['primary_ticker']}) - {etf['return_ytd']:.2f}% YTD\n"
                report_md += f"   *{etf['fund_provider']}*\n\n"
        
        report_md += """
## 💰 Nejlevnější ETF podle TER

"""
        
        if etf_data.get('cheapest'):
            for i, etf in enumerate(etf_data['cheapest'][:5], 1):
                report_md += f"{i}. **{etf['name']}** ({etf['primary_ticker']}) - {etf['ter_numeric']:.2f}% TER\n"
                report_md += f"   *{etf['fund_provider']} | {etf['category']}*\n\n"
        
        report_md += """
## 📊 Statistiky podle kategorií

"""
        
        if etf_data.get('categories_stats'):
            for category, stats in etf_data['categories_stats'].items():
                icon = {'Akcie': '📈', 'Dluhopisy': '🛡️', 'Krypto': '₿', 'Komodity': '💎', 'Nemovitosti': '🏢'}.get(category, '📊')
                report_md += f"**{icon} {category}**: {stats['count']} fondů, průměrný výnos YTD: {stats['avg_return_ytd']:.2f}%\n\n"
        
        report_md += f"""
## 🔮 Výhled na příští týden

- Sledujte rozhodnutí centrálních bank o úrokových sazbách
- Pozor na makroekonomická data z USA a Evropy
- Zajímavé příležitosti v sektorech s nízkým TER

---

*Zpracováno: {self.report_date.strftime('%d.%m.%Y %H:%M')} | Zdroj: ETF Průvodce databáze*
"""
        
        return report_md
    
    def save_report(self, content: str, filename: str = None):
        """Uloží report do souboru"""
        if not filename:
            filename = f"weekly_etf_report_{self.report_date.strftime('%Y_%m_%d')}.md"
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Report uložen jako: {filename}")
        return filename

def main():
    """Hlavní funkce pro generování týdenního reportu"""
    reporter = WeeklyETFReporter()
    
    print("🚀 Generuji týdenní ETF report...")
    
    # Získání ETF dat z databáze
    print("📊 Načítám data z ETF databáze...")
    etf_data = reporter.get_etf_performance_data()
    
    # Mock market data (v reálné implementaci by bylo z API nebo web scrapingu)
    market_data = {
        'market_summary': """
**S&P 500**: +1.6% (nový rekord na 6,584 bodech)
**NASDAQ**: +0.44% (dosáhl 22,141 bodů)  
**STOXX Europe 600**: +1.03% (5,447 bodů)
**VIX**: Pokles volatility na 14.2 bodů
        """,
        'key_events': """
- **Fed rozhodnutí**: Očekává se první snížení sazeb v roce 2025
- **ECB**: Ponechání sazeb na 2%, inflace kolem cíle
- **Inflace USA**: CPI vzrostl na 2.9% (vliv cel)
- **Evropa**: Slabý růst, Q2 pouze +0.1%
        """
    }
    
    # Generování reportu
    print("📝 Generuji markdown report...")
    report_content = reporter.generate_markdown_report(market_data, etf_data)
    
    # Uložení
    filename = reporter.save_report(report_content)
    
    print(f"✅ Týdenní ETF report úspěšně vygenerován!")
    print(f"📄 Soubor: {filename}")
    
    # Ukázka prvních řádků
    print("\n" + "="*50)
    print("UKÁZKA REPORTU:")
    print("="*50)
    print(report_content[:800] + "...")

if __name__ == "__main__":
    main()