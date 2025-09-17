#!/usr/bin/env python3
"""
Test ticker extraction pro jeden ETF
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_ticker_extraction():
    scraper = CompleteProductionScraper()
    test_isin = "BGGRASE06174"  # Greece ETF
    
    print(f"Testuji ticker extraction pro {test_isin}")
    
    # Scrapuj pouze exchange data
    etf = scraper.scrape_etf_complete(test_isin)
    
    if etf:
        print(f"Primary ticker: '{etf.primary_ticker}'")
        print(f"Primary exchange: '{etf.primary_exchange}'")
        print(f"Total exchanges: {etf.total_exchanges}")
        print(f"Exchange listings: {len(etf.exchange_listings)}")
        
        for i, listing in enumerate(etf.exchange_listings, 1):
            print(f"  {i}. {listing.exchange_name} - Ticker: '{listing.ticker}' - Currency: '{listing.trade_currency}'")
    else:
        print("Scraping failed!")

if __name__ == "__main__":
    test_ticker_extraction()