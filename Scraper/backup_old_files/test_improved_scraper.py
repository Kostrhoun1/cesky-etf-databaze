#!/usr/bin/env python3
"""
Test script pro testování vylepšeného scraperu na jednom ETF
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_single_etf(isin: str):
    """Test jednoho ETF"""
    print(f"🧪 Testing improved scraper on ISIN: {isin}")
    print("=" * 60)
    
    scraper = CompleteProductionScraper()
    
    try:
        etf_data = scraper.scrape_etf_complete_with_retry(isin)
        
        if etf_data:
            print(f"✅ Successfully scraped: {etf_data.name}")
            print(f"📊 Primary ticker: {etf_data.primary_ticker}")
            print(f"📊 Primary exchange: {etf_data.primary_exchange}")
            print(f"📊 Total exchanges: {etf_data.total_exchanges}")
            
            print(f"\n📋 Exchange listings:")
            for i, listing in enumerate(etf_data.exchange_listings, 1):
                print(f"  {i}. {listing.exchange_name}: {listing.ticker} ({listing.trade_currency})")
                
            return etf_data.primary_ticker is not None
        else:
            print("❌ Failed to scrape ETF data")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    # Test na známém ETF s očekávaným tickerem
    test_isins = [
        ("IE00B6YX5C33", "SPY5"),  # SPDR S&P 500
        ("IE00BK5BQT80", "VWCE"),  # Vanguard FTSE All-World
    ]
    
    print("🚀 TESTING IMPROVED SCRAPER")
    print("=" * 60)
    
    success_count = 0
    total_count = len(test_isins)
    
    for isin, expected_ticker in test_isins:
        print(f"\n{'='*60}")
        success = test_single_etf(isin)
        if success:
            success_count += 1
        print(f"Expected ticker: {expected_ticker}")
        print(f"{'='*60}")
    
    print(f"\n📊 FINAL RESULTS: {success_count}/{total_count} ETFs successfully scraped ticker data")

if __name__ == "__main__":
    main()