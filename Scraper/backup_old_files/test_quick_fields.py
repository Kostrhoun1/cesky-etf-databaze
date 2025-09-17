#!/usr/bin/env python3
"""
Rychlý test polí na 3 ETF pro identifikaci problémů
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def quick_field_test():
    """Rychlý test na 3 ETF"""
    
    test_etfs = [
        "IE00B6YX5C33",  # SPDR S&P 500
        "IE00BK5BQT80",  # Vanguard FTSE All-World
        "IE00B4L5Y983",  # iShares Core MSCI World
    ]
    
    print("🔍 QUICK FIELD ANALYSIS - 3 ETFs")
    print("=" * 60)
    
    scraper = CompleteProductionScraper()
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n[{i}/3] Testing ISIN: {isin}")
        print("-" * 40)
        
        try:
            etf_data = scraper.scrape_etf_complete_with_retry(isin)
            
            if etf_data:
                print(f"✅ {etf_data.name}")
                
                # Print všechna klíčová pole
                print(f"\n📋 BASIC INFO:")
                print(f"   Name: {etf_data.name}")
                print(f"   ISIN: {etf_data.isin}")
                print(f"   Provider: {etf_data.fund_provider}")
                print(f"   Domicile: {etf_data.fund_domicile}")
                
                print(f"\n💰 COSTS & SIZE:")
                print(f"   TER (text): {etf_data.ter}")
                print(f"   TER (numeric): {etf_data.ter_numeric}")
                print(f"   Fund Size (text): {etf_data.fund_size}")
                print(f"   Fund Size (numeric): {etf_data.fund_size_numeric}")
                print(f"   Fund Currency: {etf_data.fund_currency}")
                
                print(f"\n🏢 STRUCTURE:")
                print(f"   Legal Structure: {etf_data.legal_structure}")
                print(f"   Replication: {etf_data.replication}")
                print(f"   Distribution Policy: {etf_data.distribution_policy}")
                print(f"   Distribution Frequency: {etf_data.distribution_frequency}")
                
                print(f"\n📊 INVESTMENT:")
                print(f"   Index Name: {etf_data.index_name}")
                print(f"   Investment Focus: {etf_data.investment_focus}")
                print(f"   Category: {etf_data.category}")
                print(f"   Region: {etf_data.region}")
                print(f"   Sustainability: {etf_data.sustainability}")
                
                print(f"\n📈 TICKERS & EXCHANGES:")
                print(f"   Primary Ticker: {etf_data.primary_ticker}")
                print(f"   Primary Exchange: {etf_data.primary_exchange}")
                print(f"   Total Exchanges: {etf_data.total_exchanges}")
                
                print(f"\n🏗️ HOLDINGS & COMPOSITION:")
                print(f"   Total Holdings: {etf_data.total_holdings}")
                print(f"   Sectors Count: {len(etf_data.sectors) if etf_data.sectors else 0}")
                print(f"   Countries Count: {len(etf_data.countries) if etf_data.countries else 0}")
                print(f"   Holdings Count: {len(etf_data.holdings) if etf_data.holdings else 0}")
                
                if etf_data.sectors:
                    print(f"   Top Sectors: {etf_data.sectors[:3]}")
                if etf_data.countries:
                    print(f"   Top Countries: {etf_data.countries[:3]}")
                if etf_data.holdings:
                    print(f"   Top Holdings: {etf_data.holdings[:3]}")
            
            else:
                print(f"❌ Failed to scrape {isin}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print(f"\n" + "="*60)
    print("📊 SUMMARY")
    print("="*60)
    print("Zkontrolujte která pole jsou prázdná nebo nesprávně parsovaná.")

if __name__ == "__main__":
    quick_field_test()