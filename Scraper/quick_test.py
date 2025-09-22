#!/usr/bin/env python3
"""
Rychlý test pouze 5 ETF pro debugging
"""

import sys
import os
from final_scraper import CompleteProductionScraper

def quick_test():
    print("🔬 RYCHLÝ TEST - 5 ETF")
    print("="*40)
    
    # Pouze 5 ETF pro rychlý test
    test_etfs = [
        'IE00B4L5Y983',  # iShares Core MSCI World
        'IE00B5BMR087',  # iShares Core S&P 500
        'IE000Z3S26J2',  # iShares S&P 500 EUR Hedged
        'IE00B3RBWM25',  # Vanguard FTSE All-World
        'LU0290358497',  # Xtrackers MSCI World
    ]
    
    print(f"Test ETF: {len(test_etfs)}")
    print("Testování nových polí: currency_risk, investment_focus, strategy_risk")
    print("="*40)
    
    scraper = CompleteProductionScraper()
    results = []
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n📊 [{i}/{len(test_etfs)}] Testování {isin}")
        
        try:
            etf = scraper.scrape_etf_complete_with_retry(isin, max_retries=1)
            
            if etf.scraping_status == 'success':
                print(f"✅ SUCCESS: {etf.name}")
                print(f"   Provider: {etf.fund_provider}")
                print(f"   Investment Focus: {etf.investment_focus or 'N/A'}")
                print(f"   Currency Risk: {etf.currency_risk or 'N/A'}")
                print(f"   Strategy Risk: {etf.strategy_risk or 'N/A'}")
                print(f"   Category: {etf.category}")
                print(f"   Region: {etf.region}")
                print(f"   TER: {etf.ter_numeric}%")
                print(f"   Leveraged: {etf.is_leveraged}")
                
                # OPRAVENO: Použít to_dict() pro kompletní data
                results.append(etf.to_dict())
                
            else:
                print(f"❌ FAILED: {etf.scraping_status}")
                
        except Exception as e:
            print(f"💥 ERROR: {str(e)}")
    
    # Výsledky
    print(f"\n🎯 VÝSLEDKY:")
    print(f"Úspěšných: {len(results)}/{len(test_etfs)}")
    
    if results:
        investment_focus_count = sum(1 for r in results if r['investment_focus'])
        currency_risk_count = sum(1 for r in results if r['currency_risk'])
        strategy_risk_count = sum(1 for r in results if r['strategy_risk'])
        
        print(f"Investment Focus: {investment_focus_count}/{len(results)}")
        print(f"Currency Risk: {currency_risk_count}/{len(results)}")
        print(f"Strategy Risk: {strategy_risk_count}/{len(results)}")
        
        if currency_risk_count > 0:
            print("✅ Currency Risk field funguje!")
        else:
            print("⚠️ Currency Risk field není scrapováno")
    
    return results

if __name__ == "__main__":
    quick_test()