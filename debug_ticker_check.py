#!/usr/bin/env python3
"""
Debug ticker data pro IE00B5BMR087
"""

import sys
import os
sys.path.append('/Users/tomaskostrhoun/Documents/ETF/Scraper')

from final_scraper import CompleteProductionScraper
import json

def debug_ticker_data():
    scraper = CompleteProductionScraper()
    print('🔍 Re-scraping IE00B5BMR087 pro kontrolu ticker dat...')
    etf = scraper.scrape_etf_complete_with_retry('IE00B5BMR087', max_retries=1)
    
    if etf.scraping_status == 'success':
        print(f'Název: {etf.name}')
        print(f'Primary ticker: {etf.primary_ticker}')
        print()
        print('🏛️ EXCHANGE DATA:')
        for i, ex in enumerate(etf.exchanges[:5]):
            print(f'  Exchange {i+1}: {ex.get("ticker", "N/A")} | {ex.get("name", "N/A")} | {ex.get("currency", "N/A")}')
        
        # Kontrola všech ticker polí
        all_etf_data = etf.to_dict()
        tickers = [
            all_etf_data.get('primary_ticker'),
            all_etf_data.get('exchange_1_ticker'),
            all_etf_data.get('exchange_2_ticker'),
            all_etf_data.get('exchange_3_ticker'),
            all_etf_data.get('exchange_4_ticker'),
            all_etf_data.get('exchange_5_ticker')
        ]
        
        valid_tickers = [t for t in tickers if t and t != '-']
        print(f'\n🎯 Všechny parsed tickery: {valid_tickers}')
        
        # Hledat CSPX
        has_cspx = any('CSPX' == str(t) for t in tickers if t)
        print(f'Obsahuje CSPX: {"✅ ANO" if has_cspx else "❌ NE"}')
        
        # Hledat podobné tickery
        similar_tickers = [t for t in valid_tickers if 'CSP' in str(t)]
        print(f'Podobné CSP* tickery: {similar_tickers}')
        
        # Export dat pro analýzu
        with open('debug_ticker_data.json', 'w') as f:
            json.dump(all_etf_data, f, indent=2)
        print('\n💾 Detailní data: debug_ticker_data.json')
        
    else:
        print(f'❌ Scraping selhal: {etf.scraping_status}')

if __name__ == "__main__":
    debug_ticker_data()