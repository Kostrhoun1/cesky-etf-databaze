#!/usr/bin/env python3
"""
Test rozšířených exchange listings pro IE00B5BMR087
"""

import sys
import os
sys.path.append('/Users/tomaskostrhoun/Documents/ETF/Scraper')

from final_scraper import CompleteProductionScraper
import json

def test_extended_exchanges():
    """Test parsování všech exchanges pro IE00B5BMR087"""
    
    print("🔍 TEST ROZŠÍŘENÝCH EXCHANGE LISTINGS")
    print("=" * 60)
    
    scraper = CompleteProductionScraper()
    print("📊 Re-scraping IE00B5BMR087 s rozšířeným exchange parsing...")
    
    etf = scraper.scrape_etf_complete_with_retry('IE00B5BMR087', max_retries=1)
    
    if etf.scraping_status == 'success':
        print(f"✅ Scraping úspěšný")
        print(f"📋 Název: {etf.name}")
        print(f"🎯 Primary ticker: {etf.primary_ticker}")
        print(f"🏛️ Celkem exchanges: {etf.total_exchanges}")
        print()
        
        # Zobrazit všechny exchange listings
        print("🏦 VŠECHNY EXCHANGE LISTINGS:")
        print("-" * 60)
        
        for i, listing in enumerate(etf.exchange_listings, 1):
            print(f"Exchange {i}:")
            print(f"  📍 Burza: {listing.exchange_name}")
            print(f"  💱 Měna: {listing.trade_currency}")
            print(f"  🎫 Ticker: {listing.ticker}")
            print(f"  📊 Bloomberg: {listing.bloomberg_code}")
            print(f"  📈 Reuters: {listing.reuters_code}")
            print(f"  🏢 Market Maker: {listing.market_maker}")
            print()
        
        # Test export do dict
        etf_dict = etf.to_dict()
        
        print("📤 EXPORT DO DATABÁZOVÝCH POLÍ:")
        print("-" * 60)
        
        all_tickers = []
        for i in range(1, 11):
            exchange_name = etf_dict.get(f'exchange_{i}_name', '')
            exchange_ticker = etf_dict.get(f'exchange_{i}_ticker', '')
            exchange_currency = etf_dict.get(f'exchange_{i}_currency', '')
            
            if exchange_name:
                print(f"Exchange {i}: {exchange_name} | {exchange_ticker} | {exchange_currency}")
                if exchange_ticker and exchange_ticker != '-':
                    all_tickers.append(exchange_ticker)
        
        print(f"\n🎯 VŠECHNY NALEZENÉ TICKERY: {all_tickers}")
        
        # Kontrola na CSPX
        has_cspx = 'CSPX' in all_tickers
        print(f"🔍 Obsahuje CSPX ticker: {'✅ ANO' if has_cspx else '❌ NE'}")
        
        # Export pro analýzu
        with open('extended_exchange_test.json', 'w', encoding='utf-8') as f:
            json.dump(etf_dict, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 Detailní data: extended_exchange_test.json")
        
        # Vyhodnocení
        print("\n" + "=" * 60)
        print("📋 VYHODNOCENÍ TESTU")
        print("=" * 60)
        
        expected_exchanges = [
            'London Stock Exchange',
            'gettex', 
            'Stuttgart Stock Exchange',
            'Bolsa Mexicana de Valores',
            'Borsa Italiana',
            'Euronext Amsterdam',
            'SIX Swiss Exchange',
            'XETRA'
        ]
        
        found_exchanges = [listing.exchange_name for listing in etf.exchange_listings]
        
        print(f"🎯 Očekávané burzy: {len(expected_exchanges)}")
        print(f"✅ Nalezené burzy: {len(found_exchanges)}")
        
        missing_exchanges = [ex for ex in expected_exchanges if ex not in found_exchanges]
        if missing_exchanges:
            print(f"❌ Chybějící burzy: {missing_exchanges}")
        
        if has_cspx and len(found_exchanges) >= 6:
            print("\n🎉 SUPER! Rozšířené parsing funguje správně!")
        elif has_cspx:
            print("\n👍 DOBŘE! CSPX nalezen, ale mohlo by být více burz")
        else:
            print("\n⚠️  PROBLÉM! CSPX ticker nebyl nalezen")
            
    else:
        print(f"❌ Scraping selhal: {etf.scraping_status}")

if __name__ == "__main__":
    test_extended_exchanges()