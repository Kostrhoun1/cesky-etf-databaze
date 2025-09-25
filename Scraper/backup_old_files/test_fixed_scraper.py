#!/usr/bin/env python3
"""
Test script pro ověření opravených změn v scraperu
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_fixed_issues():
    """Test opravených problémů"""
    
    # Test ETF s různými charakteristikami
    test_cases = [
        {
            'isin': 'IE00B6YX5C33',  # SPDR S&P 500 - má tabulky i tickery
            'expected_ticker': 'SPY5',
            'description': 'SPDR S&P 500 UCITS ETF'
        },
        {
            'isin': 'IE00BK5BQT80',  # Vanguard FTSE All-World
            'expected_ticker': 'VWCE', 
            'description': 'Vanguard FTSE All-World UCITS ETF'
        },
        {
            'isin': 'LU0908500753',  # Měl ticker MEUDNMM v tabulce
            'expected_ticker': None,  # Testujeme jestli najde table ticker
            'description': 'Amundi Core Stoxx Europe 600 UCITS ETF'
        }
    ]
    
    print("🔧 TESTING FIXED TICKER EXTRACTION")
    print("=" * 70)
    
    scraper = CompleteProductionScraper()
    results = []
    
    for i, case in enumerate(test_cases, 1):
        print(f"\n[{i}/3] Testing: {case['description']}")
        print(f"ISIN: {case['isin']}")
        print("-" * 60)
        
        try:
            etf_data = scraper.scrape_etf_complete_with_retry(case['isin'])
            
            if etf_data:
                # Count tickers found in tables
                table_tickers = [listing.ticker for listing in etf_data.exchange_listings if listing.ticker]
                table_ticker_count = len(table_tickers)
                
                result = {
                    'isin': case['isin'],
                    'name': etf_data.name,
                    'primary_ticker': etf_data.primary_ticker,
                    'expected_ticker': case['expected_ticker'],
                    'table_tickers': table_tickers,
                    'table_ticker_count': table_ticker_count,
                    'exchange_count': etf_data.total_exchanges,
                    'primary_source': 'table' if table_ticker_count > 0 and etf_data.primary_ticker in table_tickers else 'regex',
                    'success': bool(etf_data.primary_ticker)
                }
                
                print(f"✅ {etf_data.name}")
                print(f"📊 Primary ticker: {etf_data.primary_ticker}")
                print(f"📊 Expected: {case['expected_ticker'] or 'Any valid ticker'}")
                print(f"📊 Table tickers found: {table_ticker_count}")
                if table_tickers:
                    print(f"   Tickers: {', '.join(table_tickers)}")
                print(f"📊 Total exchanges: {etf_data.total_exchanges}")
                print(f"📊 Ticker source: {result['primary_source']}")
                
                # Check if matches expected
                if case['expected_ticker']:
                    matches = etf_data.primary_ticker == case['expected_ticker']
                    print(f"🎯 Expected match: {'✅' if matches else '❌'}")
                
            else:
                result = {
                    'isin': case['isin'],
                    'name': 'Failed to scrape',
                    'primary_ticker': None,
                    'expected_ticker': case['expected_ticker'],
                    'table_tickers': [],
                    'table_ticker_count': 0,
                    'exchange_count': 0,
                    'primary_source': None,
                    'success': False
                }
                print("❌ Failed to scrape ETF data")
                
        except Exception as e:
            result = {
                'isin': case['isin'],
                'name': f'Error: {str(e)}',
                'primary_ticker': None,
                'expected_ticker': case['expected_ticker'],
                'table_tickers': [],
                'table_ticker_count': 0,
                'exchange_count': 0,
                'primary_source': None,
                'success': False
            }
            print(f"❌ Error: {e}")
        
        results.append(result)
    
    # Summary
    print(f"\n{'='*70}")
    print("📊 SUMMARY OF FIXES")
    print("=" * 70)
    
    successful = [r for r in results if r['success']]
    table_based = [r for r in results if r['primary_source'] == 'table']
    regex_based = [r for r in results if r['primary_source'] == 'regex']
    
    print(f"✅ Successfully found tickers: {len(successful)}/3")
    print(f"📋 From table parsing: {len(table_based)}/3")
    print(f"🔍 From regex fallback: {len(regex_based)}/3")
    
    if table_based:
        total_table_tickers = sum(r['table_ticker_count'] for r in table_based)
        avg_table_tickers = total_table_tickers / len(table_based)
        print(f"📈 Average table tickers per ETF: {avg_table_tickers:.1f}")
    
    print(f"\n📋 DETAILED RESULTS:")
    print("-" * 50)
    for i, result in enumerate(results, 1):
        status = "✅" if result['success'] else "❌"
        source = f"({result['primary_source']})" if result['primary_source'] else ""
        print(f"{i}. {status} {result['primary_ticker']} {source}")
        if result['table_ticker_count'] > 0:
            print(f"   Table tickers: {', '.join(result['table_tickers'])}")
    
    return results

if __name__ == "__main__":
    test_fixed_issues()