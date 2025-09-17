#!/usr/bin/env python3
"""
Test script pro testování vylepšeného scraperu na 20 náhodných ETF
"""

import sys
import os
import random
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_random_etfs():
    """Test na 20 náhodných ETF z různých kategorií"""
    
    # Rozšířený seznam ETF ISIN kódů z různých kategorií
    etf_isins = [
        # Akciové ETF - rozvinuté trhy
        "IE00B6YX5C33",  # SPDR S&P 500 UCITS ETF
        "IE00BK5BQT80",  # Vanguard FTSE All-World UCITS ETF
        "IE00B4L5Y983",  # iShares Core MSCI World UCITS ETF
        "IE00B5BMR087",  # iShares Core S&P 500 UCITS ETF
        "IE00B1XNHC34",  # iShares Core MSCI Europe UCITS ETF
        "IE00BKM4GZ66",  # iShares Core MSCI Europe UCITS ETF EUR
        "IE00B02KXL92",  # iShares MSCI Europe UCITS ETF
        "IE00B14X4Q57",  # iShares STOXX Europe 600 UCITS ETF
        "IE00BFY0GT14",  # Vanguard FTSE Developed Europe ex UK UCITS ETF
        "LU0274208692",  # Xtrackers MSCI World UCITS ETF
        
        # Akciové ETF - rozvíjející se trhy
        "IE00B4L5YC18",  # iShares Core MSCI Emerging Markets IMI UCITS ETF
        "IE00BKM4GZ66",  # iShares Core MSCI EM IMI UCITS ETF USD
        "IE00BZ56RN96",  # Vanguard FTSE Emerging Markets UCITS ETF
        "LU0292107645",  # Xtrackers MSCI Emerging Markets UCITS ETF
        "IE00B6YX5D40",  # SPDR MSCI Emerging Markets UCITS ETF
        
        # Dluhopisové ETF
        "IE00B4WXJJ64",  # iShares Core Global Aggregate Bond UCITS ETF
        "IE00BF4RFH31",  # iShares Core EUR Corp Bond UCITS ETF
        "IE00B1FZS798",  # iShares EUR High Yield Corp Bond UCITS ETF
        "LU0378449770",  # Xtrackers EUR Corporate Bond UCITS ETF
        "IE00B3S45072",  # Vanguard EUR Corporate Bond UCITS ETF
        
        # Komoditní ETF
        "IE00B579F325",  # iShares Diversified Commodity Swap UCITS ETF
        "LU0292106241",  # Xtrackers MSCI World Energy UCITS ETF
        "IE00B6R52259",  # iShares STOXX Europe 600 Oil & Gas UCITS ETF
        
        # Sektorové ETF
        "IE00B0M62Q58",  # iShares MSCI World Information Technology UCITS ETF
        "IE00B4ND3602",  # iShares MSCI World Health Care UCITS ETF
        "IE00B0M63177",  # iShares MSCI World Financials UCITS ETF
        "LU0533032420",  # Xtrackers MSCI World Consumer Discretionary UCITS ETF
        
        # Regionální ETF
        "IE00B4L5Y983",  # iShares Core MSCI World UCITS ETF
        "IE00B52VJ196",  # iShares MSCI Japan UCITS ETF
        "IE00B50MZ724",  # iShares MSCI Pacific ex Japan UCITS ETF
        "LU0274221281",  # Xtrackers MSCI Japan UCITS ETF
        
        # Smart Beta / Factor ETF
        "IE00BL25JL35",  # Vanguard FTSE All-World High Dividend Yield UCITS ETF
        "IE00BZ56SW52",  # Vanguard ESG Global All Cap UCITS ETF
        "IE00BNG8L278",  # Vanguard ESG Developed Europe All Cap UCITS ETF
        "LU0322250985",  # Xtrackers MSCI World Quality UCITS ETF
        
        # Další populární ETF
        "LU1681045370",  # Amundi Prime Europe UCITS ETF
        "LU1681045453",  # Amundi Prime Global UCITS ETF
        "FR0010315770",  # Lyxor Core STOXX Europe 600 UCITS ETF
        "LU0908500753",  # Lyxor MSCI World UCITS ETF
        "IE00BGV5VN51",  # Vanguard S&P 500 UCITS ETF
        "IE00B3XXRP09",  # Vanguard FTSE Developed Europe UCITS ETF
    ]
    
    # Vybere 20 náhodných ETF
    random.seed(42)  # Pro reprodukovatelnost výsledků
    selected_etfs = random.sample(etf_isins, min(20, len(etf_isins)))
    
    print("🚀 TESTING IMPROVED SCRAPER ON 20 RANDOM ETFs")
    print("=" * 80)
    print(f"Selected ETFs: {len(selected_etfs)}")
    print("=" * 80)
    
    scraper = CompleteProductionScraper()
    results = []
    
    for i, isin in enumerate(selected_etfs, 1):
        print(f"\n[{i}/20] Testing ISIN: {isin}")
        print("-" * 60)
        
        try:
            etf_data = scraper.scrape_etf_complete_with_retry(isin)
            
            if etf_data:
                has_primary_ticker = bool(etf_data.primary_ticker)
                total_tickers = len([listing for listing in etf_data.exchange_listings if listing.ticker])
                
                result = {
                    'isin': isin,
                    'name': etf_data.name,
                    'primary_ticker': etf_data.primary_ticker,
                    'primary_exchange': etf_data.primary_exchange,
                    'total_exchanges': etf_data.total_exchanges,
                    'total_tickers': total_tickers,
                    'success': has_primary_ticker or total_tickers > 0,
                    'error': None
                }
                
                print(f"✅ {etf_data.name}")
                print(f"📊 Primary ticker: {etf_data.primary_ticker or 'None'}")
                print(f"📊 Exchange listings: {etf_data.total_exchanges}")
                print(f"📊 Tickers found: {total_tickers}")
                
                if total_tickers > 0:
                    print("📋 Tickers:")
                    for listing in etf_data.exchange_listings:
                        if listing.ticker:
                            print(f"   • {listing.ticker} ({listing.exchange_name}, {listing.trade_currency})")
                
            else:
                result = {
                    'isin': isin,
                    'name': 'Failed to scrape',
                    'primary_ticker': None,
                    'primary_exchange': None,
                    'total_exchanges': 0,
                    'total_tickers': 0,
                    'success': False,
                    'error': 'No data returned'
                }
                print("❌ Failed to scrape ETF data")
                
        except Exception as e:
            result = {
                'isin': isin,
                'name': 'Error during scraping',
                'primary_ticker': None,
                'primary_exchange': None,
                'total_exchanges': 0,
                'total_tickers': 0,
                'success': False,
                'error': str(e)
            }
            print(f"❌ Error: {e}")
        
        results.append(result)
    
    # Analýza výsledků
    print(f"\n{'='*80}")
    print("📊 ANALÝZA VÝSLEDKŮ")
    print("=" * 80)
    
    successful = [r for r in results if r['success']]
    with_primary_ticker = [r for r in results if r['primary_ticker']]
    with_any_tickers = [r for r in results if r['total_tickers'] > 0]
    failed = [r for r in results if not r['success']]
    
    print(f"✅ Úspěšně nalezen alespoň jeden ticker: {len(successful)}/20 ({len(successful)/20*100:.1f}%)")
    print(f"🎯 S primary tickerem: {len(with_primary_ticker)}/20 ({len(with_primary_ticker)/20*100:.1f}%)")
    print(f"📋 S jakýmkoli tickerem: {len(with_any_tickers)}/20 ({len(with_any_tickers)/20*100:.1f}%)")
    print(f"❌ Neúspěšné: {len(failed)}/20 ({len(failed)/20*100:.1f}%)")
    
    if with_any_tickers:
        total_tickers_found = sum(r['total_tickers'] for r in with_any_tickers)
        avg_tickers = total_tickers_found / len(with_any_tickers)
        print(f"📈 Průměrný počet tickerů na ETF: {avg_tickers:.1f}")
    
    # Detailní výsledky
    print(f"\n📋 DETAILNÍ VÝSLEDKY:")
    print("-" * 80)
    for i, result in enumerate(results, 1):
        status = "✅" if result['success'] else "❌"
        ticker_info = result['primary_ticker'] or f"({result['total_tickers']} tickers)"
        print(f"{i:2d}. {status} {result['isin']}: {ticker_info}")
        if result['error']:
            print(f"     Error: {result['error']}")
    
    # Konkrétní problémy
    if failed:
        print(f"\n❌ NEÚSPĚŠNÉ ETF:")
        print("-" * 40)
        for result in failed:
            print(f"• {result['isin']}: {result['error'] or 'Unknown error'}")
    
    return results

if __name__ == "__main__":
    test_random_etfs()