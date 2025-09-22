#!/usr/bin/env python3
"""
Analýza zajímavých dat pro X posty
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv
from collections import Counter
import statistics

# Load environment variables
load_dotenv('.env')

class InterestingDataAnalyzer:
    def __init__(self):
        url = os.getenv('VITE_SUPABASE_URL')
        key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
        self.supabase: Client = create_client(url, key)
    
    def cheapest_etfs_by_ter(self, limit=10):
        """Nejlevnější ETF podle TER"""
        print(f"\n💰 {limit} NEJLEVNĚJŠÍCH ETF (TER)")
        print("=" * 50)
        
        result = self.supabase.table('etf_funds').select(
            'name,ter_numeric,fund_provider,region'
        ).not_.is_('ter_numeric', 'null').gt('ter_numeric', 0).order('ter_numeric').limit(limit).execute()
        
        for etf in result.data:
            ter = etf['ter_numeric']
            print(f"{ter:.3f}% | {etf['name'][:35]:37} | {etf['fund_provider']}")
        
        return result.data
    
    def most_expensive_etfs(self, limit=10):
        """Nejdražší ETF podle TER"""
        print(f"\n💸 {limit} NEJDRAŽŠÍCH ETF (TER)")
        print("=" * 50)
        
        result = self.supabase.table('etf_funds').select(
            'name,ter_numeric,fund_provider,region'
        ).not_.is_('ter_numeric', 'null').gt('ter_numeric', 0).order('ter_numeric', desc=True).limit(limit).execute()
        
        for etf in result.data:
            ter = etf['ter_numeric']
            print(f"{ter:.3f}% | {etf['name'][:35]:37} | {etf['fund_provider']}")
        
        return result.data
    
    def biggest_etfs_by_size(self, limit=10):
        """Největší ETF podle velikosti"""
        print(f"\n🏢 {limit} NEJVĚTŠÍCH ETF (podle velikosti)")
        print("=" * 50)
        
        result = self.supabase.table('etf_funds').select(
            'name,fund_size_numeric,fund_provider,region'
        ).not_.is_('fund_size_numeric', 'null').gt('fund_size_numeric', 0).order('fund_size_numeric', desc=True).limit(limit).execute()
        
        for etf in result.data:
            size = etf['fund_size_numeric']
            size_bil = size / 1000  # Convert to billions
            print(f"{size_bil:.1f}B € | {etf['name'][:35]:37} | {etf['fund_provider']}")
        
        return result.data
    
    def best_performing_etfs_ytd(self, limit=10):
        """Nejlepší ETF YTD výkonnost"""
        print(f"\n📈 {limit} NEJLEPŠÍCH ETF (YTD výkonnost)")
        print("=" * 50)
        
        result = self.supabase.table('etf_funds').select(
            'name,return_ytd,fund_provider,region'
        ).not_.is_('return_ytd', 'null').order('return_ytd', desc=True).limit(limit).execute()
        
        for etf in result.data:
            ytd = etf['return_ytd']
            print(f"{ytd:+6.1f}% | {etf['name'][:35]:37} | {etf['fund_provider']}")
        
        return result.data
    
    def worst_performing_etfs_ytd(self, limit=10):
        """Nejhorší ETF YTD výkonnost"""
        print(f"\n📉 {limit} NEJHORŠÍCH ETF (YTD výkonnost)")
        print("=" * 50)
        
        result = self.supabase.table('etf_funds').select(
            'name,return_ytd,fund_provider,region'
        ).not_.is_('return_ytd', 'null').order('return_ytd').limit(limit).execute()
        
        for etf in result.data:
            ytd = etf['return_ytd']
            print(f"{ytd:+6.1f}% | {etf['name'][:35]:37} | {etf['fund_provider']}")
        
        return result.data
    
    def vanguard_vs_ishares_comparison(self):
        """Porovnání Vanguard vs iShares"""
        print(f"\n⚔️ VANGUARD vs ISHARES")
        print("=" * 40)
        
        # Get Vanguard stats
        vanguard = self.supabase.table('etf_funds').select(
            'ter_numeric,fund_size_numeric'
        ).eq('fund_provider', 'Vanguard').not_.is_('ter_numeric', 'null').execute()
        
        # Get iShares stats  
        ishares = self.supabase.table('etf_funds').select(
            'ter_numeric,fund_size_numeric'
        ).eq('fund_provider', 'iShares').not_.is_('ter_numeric', 'null').execute()
        
        vanguard_count = len(vanguard.data)
        ishares_count = len(ishares.data)
        
        vanguard_avg_ter = statistics.mean([etf['ter_numeric'] for etf in vanguard.data if etf['ter_numeric']])
        ishares_avg_ter = statistics.mean([etf['ter_numeric'] for etf in ishares.data if etf['ter_numeric']])
        
        print(f"Vanguard:   {vanguard_count:3d} ETF | Průměrný TER: {vanguard_avg_ter:.3f}%")
        print(f"iShares:    {ishares_count:3d} ETF | Průměrný TER: {ishares_avg_ter:.3f}%")
        
        winner = "Vanguard" if vanguard_avg_ter < ishares_avg_ter else "iShares"
        print(f"\n🏆 Nižší TER: {winner}")
        
        return {
            'vanguard': {'count': vanguard_count, 'avg_ter': vanguard_avg_ter},
            'ishares': {'count': ishares_count, 'avg_ter': ishares_avg_ter}
        }
    
    def most_popular_holdings(self, limit=15):
        """Nejoblíbenější holdings napříč ETF"""
        print(f"\n🏢 {limit} NEJOBLÍBENĚJŠÍCH HOLDINGS")
        print("=" * 50)
        
        result = self.supabase.table('etf_funds').select(
            'holding_1_name,holding_2_name,holding_3_name,holding_4_name,holding_5_name'
        ).execute()
        
        holdings = []
        for row in result.data:
            for i in range(1, 6):
                holding = row.get(f'holding_{i}_name')
                if holding and holding.strip():
                    holdings.append(holding.strip())
        
        holdings_counter = Counter(holdings)
        
        for holding, count in holdings_counter.most_common(limit):
            print(f"{count:3d}x | {holding}")
        
        return holdings_counter.most_common(limit)
    
    def emerging_markets_analysis(self):
        """Analýza rozvíjejících se trhů"""
        print(f"\n🌍 ANALÝZA ROZVÍJEJÍCÍCH SE TRHŮ")
        print("=" * 50)
        
        em_etfs = self.supabase.table('etf_funds').select(
            'name,ter_numeric,return_ytd,fund_size_numeric'
        ).eq('region', 'Rozvíjející se trhy').not_.is_('ter_numeric', 'null').execute()
        
        count = len(em_etfs.data)
        avg_ter = statistics.mean([etf['ter_numeric'] for etf in em_etfs.data if etf['ter_numeric']])
        
        ytd_returns = [etf['return_ytd'] for etf in em_etfs.data if etf['return_ytd'] is not None]
        avg_ytd = statistics.mean(ytd_returns) if ytd_returns else 0
        
        print(f"Počet EM ETF:     {count}")
        print(f"Průměrný TER:     {avg_ter:.3f}%")
        print(f"Průměrný YTD:     {avg_ytd:+.1f}%")
        
        return {'count': count, 'avg_ter': avg_ter, 'avg_ytd': avg_ytd}
    
    def dividend_etfs_analysis(self):
        """Analýza dividendových ETF"""
        print(f"\n💰 ANALÝZA DIVIDENDOVÝCH ETF")
        print("=" * 50)
        
        # Search for dividend-related ETFs
        dividend_etfs = self.supabase.table('etf_funds').select(
            'name,current_dividend_yield_numeric,distribution_policy'
        ).or_(
            'name.ilike.%dividend%,name.ilike.%yield%,name.ilike.%income%'
        ).not_.is_('current_dividend_yield_numeric', 'null').execute()
        
        count = len(dividend_etfs.data)
        if count > 0:
            avg_yield = statistics.mean([etf['current_dividend_yield_numeric'] for etf in dividend_etfs.data if etf['current_dividend_yield_numeric']])
            print(f"Počet dividend ETF: {count}")
            print(f"Průměrný výnos:     {avg_yield:.2f}%")
            
            # Top 5 highest yielding
            print("\nTop 5 nejvyšší výnosy:")
            sorted_etfs = sorted(dividend_etfs.data, key=lambda x: x['current_dividend_yield_numeric'] or 0, reverse=True)[:5]
            for etf in sorted_etfs:
                yield_val = etf['current_dividend_yield_numeric']
                print(f"{yield_val:.2f}% | {etf['name'][:40]}")
        
        return dividend_etfs.data

def main():
    analyzer = InterestingDataAnalyzer()
    
    print("🎯 ZAJÍMAVÁ DATA PRO X POSTY")
    print("=" * 60)
    
    # Run various analyses
    analyzer.cheapest_etfs_by_ter(5)
    analyzer.most_expensive_etfs(5)
    analyzer.biggest_etfs_by_size(5)
    analyzer.best_performing_etfs_ytd(5)
    analyzer.worst_performing_etfs_ytd(5)
    analyzer.vanguard_vs_ishares_comparison()
    analyzer.most_popular_holdings(10)
    analyzer.emerging_markets_analysis()
    analyzer.dividend_etfs_analysis()

if __name__ == "__main__":
    main()