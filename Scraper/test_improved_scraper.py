#!/usr/bin/env python3
"""
Test opravené ticker extraction logic
"""

import sys
import os
sys.path.append(os.path.dirname(__file__))

from final_scraper import CompleteProductionScraper, ETFDataComplete

def test_ticker_preference():
    """Test ticker preference logic"""
    scraper = CompleteProductionScraper()
    
    print("Testing ticker preference logic...")
    print("-" * 50)
    
    # Test cases
    test_cases = [
        ("CSPX", "SXR8", True, "CSPX should be preferred over SXR8"),
        ("VWCE", "VWCE1", True, "VWCE should be preferred (popular)"),
        ("ABC", "ABCD", True, "ABC should be preferred (shorter)"),
        ("SXR8", "CSPX", False, "CSPX should NOT be replaced by SXR8"),
        ("TEST1", "TEST2", True, "TEST1 should be preferred (alphabetically first)"),
    ]
    
    for new_ticker, current_ticker, expected, description in test_cases:
        result = scraper._is_preferred_ticker(new_ticker, current_ticker)
        status = "✅" if result == expected else "❌"
        print(f"{status} {description}")
        print(f"   {new_ticker} vs {current_ticker} -> {result} (expected {expected})")
        print()

def test_ticker_validation():
    """Test ticker validation logic"""
    scraper = CompleteProductionScraper()
    
    print("Testing ticker validation logic...")
    print("-" * 50)
    
    # Test cases
    test_cases = [
        ("CSPX", False, "CSPX should be valid"),
        ("SXR8", False, "SXR8 should be valid"),
        ("VWCE", False, "VWCE should be valid"),
        ("EUR", True, "EUR should be invalid (currency)"),
        ("ETF", True, "ETF should be invalid (generic)"),
        ("LONDON", True, "LONDON should be invalid (city)"),
        ("XY", False, "XY should be valid (2 chars)"),
        ("ABCDEFGHI", True, "ABCDEFGHI should be invalid (too long)"),
    ]
    
    for ticker, expected_invalid, description in test_cases:
        result = scraper._is_obviously_invalid_ticker(ticker)
        status = "✅" if result == expected_invalid else "❌"
        print(f"{status} {description}")
        print(f"   {ticker} -> invalid: {result} (expected {expected_invalid})")
        print()

def test_etf_ticker_assignment():
    """Test ETF ticker assignment logic"""
    print("Testing ETF ticker assignment...")
    print("-" * 50)
    
    # Create mock ETF
    etf = ETFDataComplete("IE00B5BMR087")
    etf.name = "Test ETF"
    etf.url = "https://example.com"
    
    # Simulate adding exchange listings in order that scraper would encounter them
    from final_scraper import ExchangeListing
    
    # First encountered: London Stock Exchange with CSP1
    listing1 = ExchangeListing()
    listing1.exchange_name = "London Stock Exchange"
    listing1.ticker = "CSP1"
    listing1.trade_currency = "GBX"
    etf.add_exchange_listing(listing1)
    print(f"After adding CSP1: primary_ticker = {etf.primary_ticker}")
    
    # Second encountered: gettex with SXR8
    listing2 = ExchangeListing()
    listing2.exchange_name = "gettex"
    listing2.ticker = "SXR8"
    listing2.trade_currency = "EUR"
    etf.add_exchange_listing(listing2)
    print(f"After adding SXR8: primary_ticker = {etf.primary_ticker}")
    
    # Third encountered: Euronext Amsterdam with CSPX - this should become primary!
    listing3 = ExchangeListing()
    listing3.exchange_name = "Euronext Amsterdam"
    listing3.ticker = "CSPX"
    listing3.trade_currency = "EUR"
    etf.add_exchange_listing(listing3)
    print(f"After adding CSPX: primary_ticker = {etf.primary_ticker}")
    
    print()
    print("Exchange listings:")
    for i, listing in enumerate(etf.exchange_listings):
        print(f"  {i+1}. {listing.exchange_name}: {listing.ticker} ({listing.trade_currency})")
    
    print()
    if etf.primary_ticker == "CSPX":
        print("✅ SUCCESS: CSPX correctly selected as primary ticker!")
    else:
        print(f"❌ FAILED: Expected CSPX, got {etf.primary_ticker}")

if __name__ == "__main__":
    test_ticker_preference()
    test_ticker_validation() 
    test_etf_ticker_assignment()