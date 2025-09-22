#!/usr/bin/env python3
"""
Detailní analýza pro první 3 X posty s tickery
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env')

class DetailedPostsAnalyzer:
    def __init__(self):
        url = os.getenv('VITE_SUPABASE_URL')
        key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
        self.supabase: Client = create_client(url, key)
    
    def post_1_cheapest_vs_expensive_detailed(self):
        """POST 1: Detailní analýza nejlevnějších vs nejdražších ETF s tickery"""
        print("📊 POST 1: CENOVÉ ŠOKY - DETAILNÍ ANALÝZA")
        print("=" * 60)
        
        # Všechny ETF s TER 0.03%
        cheapest = self.supabase.table('etf_funds').select(
            'name,ter_numeric,fund_provider,isin,primary_ticker,fund_size_numeric'
        ).eq('ter_numeric', 0.03).order('fund_size_numeric', desc=True).execute()
        
        print(f"🎯 NEJLEVNĚJŠÍ ETF (TER 0.03%) - celkem {len(cheapest.data)} fondů:")
        print("-" * 60)
        for etf in cheapest.data:
            ticker = etf.get('primary_ticker', 'N/A')
            size = etf.get('fund_size_numeric', 0)
            size_text = f"{size/1000:.1f}B €" if size and size > 1000 else f"{size:.0f}M €" if size else "N/A"
            print(f"{ticker:8} | {etf['name'][:40]:42} | {size_text:8}")
        
        # Nejdražší ETF
        print(f"\n💸 NEJDRAŽŠÍ ETF:")
        print("-" * 60)
        expensive = self.supabase.table('etf_funds').select(
            'name,ter_numeric,fund_provider,isin,primary_ticker,fund_size_numeric'
        ).not_.is_('ter_numeric', 'null').gt('ter_numeric', 2).order('ter_numeric', desc=True).limit(5).execute()
        
        for etf in expensive.data:
            ticker = etf.get('primary_ticker', 'N/A')
            ter = etf['ter_numeric']
            size = etf.get('fund_size_numeric', 0)
            size_text = f"{size/1000:.1f}B €" if size and size > 1000 else f"{size:.0f}M €" if size else "N/A"
            print(f"{ticker:8} | {ter:.2f}% | {etf['name'][:35]:37} | {size_text:8}")
        
        return cheapest.data, expensive.data
    
    def post_2_vanguard_vs_ishares_detailed(self):
        """POST 2: Detailní bitva Vanguard vs iShares"""
        print("\n⚔️ POST 2: VANGUARD vs ISHARES - DETAILNÍ BITVA")
        print("=" * 60)
        
        # Vanguard top ETF
        vanguard = self.supabase.table('etf_funds').select(
            'name,ter_numeric,fund_provider,primary_ticker,fund_size_numeric'
        ).eq('fund_provider', 'Vanguard').not_.is_('ter_numeric', 'null').order('fund_size_numeric', desc=True).limit(10).execute()
        
        print("🔵 VANGUARD TOP 10 (podle velikosti):")
        print("-" * 60)
        vanguard_total_size = 0
        vanguard_total_ter = 0
        for etf in vanguard.data:
            ticker = etf.get('primary_ticker', 'N/A')
            ter = etf['ter_numeric']
            size = etf.get('fund_size_numeric', 0)
            size_text = f"{size/1000:.1f}B €" if size and size > 1000 else f"{size:.0f}M €" if size else "N/A"
            vanguard_total_size += size if size else 0
            vanguard_total_ter += ter if ter else 0
            print(f"{ticker:8} | {ter:.3f}% | {etf['name'][:35]:37} | {size_text:8}")
        
        # iShares top ETF
        ishares = self.supabase.table('etf_funds').select(
            'name,ter_numeric,fund_provider,primary_ticker,fund_size_numeric'
        ).eq('fund_provider', 'iShares').not_.is_('ter_numeric', 'null').order('fund_size_numeric', desc=True).limit(10).execute()
        
        print("\n🔴 ISHARES TOP 10 (podle velikosti):")
        print("-" * 60)
        ishares_total_size = 0
        ishares_total_ter = 0
        for etf in ishares.data:
            ticker = etf.get('primary_ticker', 'N/A')
            ter = etf['ter_numeric']
            size = etf.get('fund_size_numeric', 0)
            size_text = f"{size/1000:.1f}B €" if size and size > 1000 else f"{size:.0f}M €" if size else "N/A"
            ishares_total_size += size if size else 0
            ishares_total_ter += ter if ter else 0
            print(f"{ticker:8} | {ter:.3f}% | {etf['name'][:35]:37} | {size_text:8}")
        
        print("\n📊 SHRNUTÍ TOP 10:")
        print("-" * 30)
        print(f"Vanguard: {vanguard_total_size/1000:.1f}B € | Avg TER: {vanguard_total_ter/10:.3f}%")
        print(f"iShares:  {ishares_total_size/1000:.1f}B € | Avg TER: {ishares_total_ter/10:.3f}%")
        
        return vanguard.data, ishares.data
    
    def post_3_extreme_performance_detailed(self):
        """POST 3: Detailní analýza extreme performance"""
        print("\n🎢 POST 3: EXTREME PERFORMANCE - DETAILNÍ ANALÝZA")
        print("=" * 60)
        
        # Nejlepší YTD
        best = self.supabase.table('etf_funds').select(
            'name,return_ytd,fund_provider,primary_ticker,fund_size_numeric,ter_numeric'
        ).not_.is_('return_ytd', 'null').order('return_ytd', desc=True).limit(8).execute()
        
        print("📈 NEJLEPŠÍ YTD PERFORMANCE:")
        print("-" * 60)
        for etf in best.data:
            ticker = etf.get('primary_ticker', 'N/A')
            ytd = etf['return_ytd']
            ter = etf.get('ter_numeric', 0)
            size = etf.get('fund_size_numeric', 0)
            size_text = f"{size:.0f}M €" if size else "N/A"
            print(f"{ticker:8} | {ytd:+6.1f}% | TER:{ter:.2f}% | {etf['name'][:30]:32} | {size_text:8}")
        
        # Nejhorší YTD
        worst = self.supabase.table('etf_funds').select(
            'name,return_ytd,fund_provider,primary_ticker,fund_size_numeric,ter_numeric'
        ).not_.is_('return_ytd', 'null').order('return_ytd').limit(8).execute()
        
        print("\n📉 NEJHORŠÍ YTD PERFORMANCE:")
        print("-" * 60)
        for etf in worst.data:
            ticker = etf.get('primary_ticker', 'N/A')
            ytd = etf['return_ytd']
            ter = etf.get('ter_numeric', 0)
            size = etf.get('fund_size_numeric', 0)
            size_text = f"{size:.0f}M €" if size else "N/A"
            print(f"{ticker:8} | {ytd:+6.1f}% | TER:{ter:.2f}% | {etf['name'][:30]:32} | {size_text:8}")
        
        # Leverage analysis
        leverage_count = 0
        for etf in best.data + worst.data:
            if any(word in etf['name'].lower() for word in ['3x', '2x', 'leverage', 'leveraged']):
                leverage_count += 1
        
        print(f"\n⚡ LEVERAGE ANALÝZA:")
        print(f"Z top/bottom 16 ETF je {leverage_count} leveraged ({leverage_count/16*100:.0f}%)")
        
        return best.data, worst.data

def main():
    analyzer = DetailedPostsAnalyzer()
    
    # Analyze data for posts
    cheapest, expensive = analyzer.post_1_cheapest_vs_expensive_detailed()
    vanguard, ishares = analyzer.post_2_vanguard_vs_ishares_detailed()
    best, worst = analyzer.post_3_extreme_performance_detailed()
    
    print(f"\n🎯 READY FOR X POSTS!")

if __name__ == "__main__":
    main()