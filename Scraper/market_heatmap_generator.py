#!/usr/bin/env python3
"""
Market Heatmap Generator - získává performance data pro sektory, regiony a třídy aktiv
"""

import yfinance as yf
import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Tuple

class MarketHeatmapGenerator:
    def __init__(self):
        # S&P 500 sektory přes SPDR ETFs
        self.sectors = {
            'Technology': 'XLK',
            'Healthcare': 'XLV', 
            'Financials': 'XLF',
            'Energy': 'XLE',
            'Utilities': 'XLU',
            'Consumer Staples': 'XLP',
            'Consumer Discretionary': 'XLY',
            'Industrials': 'XLI',
            'Materials': 'XLB',
            'Real Estate': 'XLRE',
            'Communication Services': 'XLC'
        }
        
        # Regiony/země
        self.regions = {
            'USA': 'VTI',
            'Europe': 'VGK', 
            'Japan': 'EWJ',
            'China': 'FXI',
            'Emerging Markets': 'VWO',
            'Developed Markets': 'VEA',
            'Asia Pacific': 'VPL'
        }
        
        # Třídy aktiv
        self.asset_classes = {
            'US Stocks': 'VTI',
            'International Stocks': 'VTIAX',
            'Bonds': 'BND',
            'REITs': 'VNQ',
            'Commodities': 'DJP',
            'Gold': 'GLD',
            'Bitcoin': 'BTC-USD',
            'Oil': 'USO'
        }

    def get_performance_data(self, symbols: Dict[str, str], period: str = "1mo") -> Dict[str, Dict]:
        """
        Získá performance data pro zadané symboly
        
        Args:
            symbols: Dict s názvy a tickery
            period: Období (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 3y, 5y, 10y, ytd, max)
        """
        performance_data = {}
        
        for name, symbol in symbols.items():
            try:
                print(f"📊 Získávám data pro {name} ({symbol})...")
                
                ticker = yf.Ticker(symbol)
                
                # Speciální handling pro WTD a MTD
                if period == 'wtd':
                    # Week to date - od pondělí tohoto týdne
                    today = datetime.now()
                    days_since_monday = today.weekday()
                    monday = today - timedelta(days=days_since_monday)
                    hist = ticker.history(start=monday.strftime('%Y-%m-%d'))
                elif period == 'mtd':
                    # Month to date - od 1. tohoto měsíce
                    today = datetime.now()
                    first_day = today.replace(day=1)
                    hist = ticker.history(start=first_day.strftime('%Y-%m-%d'))
                else:
                    # Standardní období
                    hist = ticker.history(period=period)
                
                if len(hist) < 2:
                    print(f"❌ Nedostatek dat pro {symbol}")
                    continue
                    
                # Vypočítat performance
                start_price = hist['Close'].iloc[0]
                end_price = hist['Close'].iloc[-1]
                performance = ((end_price - start_price) / start_price) * 100
                
                # Získat základní info
                info = ticker.info
                current_price = end_price
                
                performance_data[name] = {
                    'symbol': symbol,
                    'performance': round(performance, 2),
                    'current_price': round(current_price, 2),
                    'currency': info.get('currency', 'USD'),
                    'name': info.get('longName', name),
                    'last_updated': datetime.now().isoformat()
                }
                
                print(f"  ✅ {name}: {performance:.2f}%")
                
            except Exception as e:
                print(f"❌ Chyba při získávání dat pro {symbol}: {e}")
                continue
        
        return performance_data

    def generate_heatmap_data(self, period: str = "1mo") -> Dict:
        """Generuje kompletní heatmap data pro všechny kategorie"""
        print(f"🔥 Generuji market heatmap pro období: {period}")
        
        heatmap_data = {
            'metadata': {
                'period': period,
                'generated_at': datetime.now().isoformat(),
                'data_source': 'Yahoo Finance'
            },
            'sectors': self.get_performance_data(self.sectors, period),
            'regions': self.get_performance_data(self.regions, period),
            'asset_classes': self.get_performance_data(self.asset_classes, period)
        }
        
        return heatmap_data

    def save_heatmap_data(self, data: Dict, filename: str = None):
        """Uloží heatmap data do JSON souboru"""
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"market_heatmap_{timestamp}.json"
        
        # Uložit do ETF složky pro frontend
        output_path = os.path.join("/Users/tomaskostrhoun/Documents/ETF/src/data", filename)
        
        # Vytvořit složku pokud neexistuje
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Heatmap data uložena do: {output_path}")
        return output_path

    def generate_summary_stats(self, data: Dict) -> Dict:
        """Generuje souhrnné statistiky pro heatmap"""
        stats = {
            'best_performers': {},
            'worst_performers': {},
            'category_averages': {}
        }
        
        for category, items in data.items():
            if category == 'metadata':
                continue
                
            if not items:
                continue
                
            performances = [(name, item['performance']) for name, item in items.items()]
            performances.sort(key=lambda x: x[1], reverse=True)
            
            # Nejlepší a nejhorší
            if performances:
                stats['best_performers'][category] = performances[0]
                stats['worst_performers'][category] = performances[-1]
                
                # Průměr kategorie
                avg_performance = sum(p[1] for p in performances) / len(performances)
                stats['category_averages'][category] = round(avg_performance, 2)
        
        return stats

def main():
    """Test funkce"""
    generator = MarketHeatmapGenerator()
    
    # Generovat data pro různá období
    periods = ['1d', 'wtd', 'mtd', 'ytd', '1y', '3y', '5y', '10y']
    
    for period in periods:
        print(f"\n{'='*50}")
        print(f"Generuji heatmap pro období: {period}")
        print(f"{'='*50}")
        
        try:
            heatmap_data = generator.generate_heatmap_data(period)
            
            # Přidat statistiky
            stats = generator.generate_summary_stats(heatmap_data)
            heatmap_data['summary_stats'] = stats
            
            # Uložit
            filename = f"market_heatmap_{period}.json"
            generator.save_heatmap_data(heatmap_data, filename)
            
            print(f"\n📊 Souhrn pro {period}:")
            for category, avg in stats['category_averages'].items():
                print(f"  {category}: {avg:.2f}% průměr")
                
        except Exception as e:
            print(f"❌ Chyba při generování {period}: {e}")
            continue

if __name__ == "__main__":
    main()