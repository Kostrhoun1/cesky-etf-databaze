#!/usr/bin/env python3
"""
Analýza 2025 YTD performance pro X post
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env')

class YTD2025Analyzer:
    def __init__(self):
        url = os.getenv('VITE_SUPABASE_URL')
        key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
        self.supabase: Client = create_client(url, key)
    
    def analyze_2025_ytd_performance(self):
        """Analýza 2025 YTD performance"""
        print("🎢 2025 YTD EXTREME PERFORMANCE")
        print("=" * 50)
        
        # Check what fields are available for 2025 data
        sample = self.supabase.table('etf_funds').select('*').limit(1).execute()
        if sample.data:
            fields = sample.data[0].keys()
            print("Available fields:", [f for f in fields if 'return' in f])
        
        # Best 2025 YTD performers
        print("\n📈 NEJLEPŠÍ 2025 YTD:")
        print("-" * 40)
        
        # Check if we have 2025 data or use most recent YTD
        best_ytd = self.supabase.table('etf_funds').select(
            'name,return_ytd,fund_provider,primary_ticker,ter_numeric,fund_size_numeric'
        ).not_.is_('return_ytd', 'null').order('return_ytd', desc=True).limit(10).execute()
        
        for etf in best_ytd.data:
            ticker = etf.get('primary_ticker', 'N/A')
            ytd = etf['return_ytd']
            ter = etf.get('ter_numeric', 0)
            provider = etf.get('fund_provider', 'N/A')
            print(f"{ticker:8} | {ytd:+6.1f}% | {ter:.2f}% | {etf['name'][:35]:37}")
        
        # Worst 2025 YTD performers  
        print("\n📉 NEJHORŠÍ 2025 YTD:")
        print("-" * 40)
        
        worst_ytd = self.supabase.table('etf_funds').select(
            'name,return_ytd,fund_provider,primary_ticker,ter_numeric,fund_size_numeric'
        ).not_.is_('return_ytd', 'null').order('return_ytd').limit(10).execute()
        
        for etf in worst_ytd.data:
            ticker = etf.get('primary_ticker', 'N/A')
            ytd = etf['return_ytd']
            ter = etf.get('ter_numeric', 0)
            provider = etf.get('fund_provider', 'N/A')
            print(f"{ticker:8} | {ytd:+6.1f}% | {ter:.2f}% | {etf['name'][:35]:37}")
        
        # Count leverage ETFs in extreme performers
        extreme_etfs = best_ytd.data[:5] + worst_ytd.data[:5]
        leverage_count = sum(1 for etf in extreme_etfs if any(word in etf['name'].lower() 
                            for word in ['3x', '2x', '5x', 'leverage', 'leveraged', 'daily']))
        
        print(f"\n⚡ LEVERAGE v TOP/BOTTOM 10:")
        print(f"{leverage_count}/10 extreme ETF je leveraged ({leverage_count*10}%)")
        
        # Find interesting non-leverage performers
        print(f"\n🎯 ZAJÍMAVÉ NON-LEVERAGE:")
        print("-" * 40)
        
        for etf in best_ytd.data:
            if not any(word in etf['name'].lower() for word in ['3x', '2x', '5x', 'leverage', 'leveraged', 'daily']):
                ticker = etf.get('primary_ticker', 'N/A')
                ytd = etf['return_ytd']
                print(f"{ticker:8} | {ytd:+6.1f}% | {etf['name'][:40]}")
                if len([e for e in best_ytd.data if not any(word in e['name'].lower() for word in ['3x', '2x', '5x', 'leverage', 'leveraged', 'daily'])]) >= 3:
                    break
        
        return best_ytd.data, worst_ytd.data

def main():
    analyzer = YTD2025Analyzer()
    best, worst = analyzer.analyze_2025_ytd_performance()

if __name__ == "__main__":
    main()