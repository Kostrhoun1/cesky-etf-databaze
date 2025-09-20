#!/usr/bin/env python3
"""
Analýza problémů s Yahoo Finance tickery a návrat na zkoušení s .L a .DE příponami
"""

import yfinance as yf
import json
import pandas as pd
import time

def test_european_ticker_variants():
    """Test různých variant evropských tickerů"""
    print("🔍 TESTOVÁNÍ EVROPSKÝCH TICKER VARIANT")
    print("=" * 50)
    
    # Známé populární ETF s různými možnými tickery
    test_cases = [
        {
            'name': 'Vanguard All-World',
            'isin': 'IE00BK5BQT80',
            'variants': ['VWCE', 'VWCE.L', 'VWCE.DE', 'VWCE.MI', 'VWCE.PA']
        },
        {
            'name': 'iShares Core S&P 500',
            'isin': 'IE00B5BMR087', 
            'variants': ['CSPX', 'CSPX.L', 'CSPX.DE', 'CSPX.MI', 'SXR8.DE']
        },
        {
            'name': 'iShares Core MSCI World',
            'isin': 'IE00B4L5Y983',
            'variants': ['IWDA', 'IWDA.L', 'SWDA.L', 'EUNL.DE', 'EUNL.L']
        },
        {
            'name': 'Vanguard S&P 500',
            'isin': 'IE00B3XXRP09',
            'variants': ['VUAA', 'VUAA.L', 'VUSA.L', 'VUSA.AS']
        },
        {
            'name': 'Vanguard Emerging Markets',
            'isin': 'IE00BK5BR626',
            'variants': ['VFEM', 'VFEM.L', 'VFEM.DE', 'VFEM.MI']
        }
    ]
    
    results = []
    
    for test_case in test_cases:
        print(f"\n📊 {test_case['name']} ({test_case['isin']})")
        print("-" * 60)
        
        case_result = {
            'name': test_case['name'],
            'isin': test_case['isin'],
            'working_tickers': [],
            'failed_tickers': []
        }
        
        for ticker in test_case['variants']:
            try:
                etf = yf.Ticker(ticker)
                hist = etf.history(period="5d")  # Test krátký period
                info = etf.info
                
                if len(hist) > 0:
                    current_price = info.get('regularMarketPrice', 'N/A')
                    exchange = info.get('exchange', 'N/A')
                    currency = info.get('currency', 'N/A')
                    
                    print(f"   ✅ {ticker:>10} | {len(hist):>2} dní | ${current_price} | {exchange} | {currency}")
                    
                    case_result['working_tickers'].append({
                        'ticker': ticker,
                        'days': len(hist),
                        'price': current_price,
                        'exchange': exchange,
                        'currency': currency,
                        'start_date': hist.index[0].strftime('%Y-%m-%d') if len(hist) > 0 else None,
                        'end_date': hist.index[-1].strftime('%Y-%m-%d') if len(hist) > 0 else None
                    })
                else:
                    print(f"   ❌ {ticker:>10} | Žádná data")
                    case_result['failed_tickers'].append(ticker)
                
            except Exception as e:
                print(f"   ❌ {ticker:>10} | Chyba: {str(e)[:50]}")
                case_result['failed_tickers'].append(ticker)
            
            time.sleep(0.5)  # Rate limiting
        
        results.append(case_result)
    
    return results

def test_us_etfs():
    """Test amerických ETF pro porovnání"""
    print(f"\n🇺🇸 TESTOVÁNÍ AMERICKÝCH ETF (pro porovnání)")
    print("=" * 50)
    
    us_tickers = ['SPY', 'QQQ', 'VTI', 'IVV', 'VOO', 'SCHG', 'VUG', 'IWM']
    
    us_results = []
    
    for ticker in us_tickers:
        try:
            etf = yf.Ticker(ticker)
            hist = etf.history(period="5d")
            info = etf.info
            
            if len(hist) > 0:
                current_price = info.get('regularMarketPrice', 'N/A')
                exchange = info.get('exchange', 'N/A')
                volume = info.get('volume', 'N/A')
                
                print(f"   ✅ {ticker:>6} | {len(hist):>2} dní | ${current_price:>7} | {exchange} | Vol: {volume:,}")
                
                us_results.append({
                    'ticker': ticker,
                    'days': len(hist),
                    'price': current_price,
                    'exchange': exchange,
                    'volume': volume,
                    'working': True
                })
            else:
                print(f"   ❌ {ticker:>6} | Žádná data")
                us_results.append({'ticker': ticker, 'working': False})
                
        except Exception as e:
            print(f"   ❌ {ticker:>6} | Chyba: {str(e)[:50]}")
            us_results.append({'ticker': ticker, 'working': False, 'error': str(e)})
        
        time.sleep(0.5)
    
    return us_results

def create_working_ticker_list(eu_results):
    """Vytvoří seznam funkčních tickerů pro další testování"""
    print(f"\n📋 VYTVÁŘENÍ SEZNAMU FUNKČNÍCH TICKERŮ")
    print("=" * 40)
    
    working_etfs = []
    
    for result in eu_results:
        if result['working_tickers']:
            # Vybereme nejlepší ticker (LSE > Xetra > ostatní)
            best_ticker = None
            
            for ticker_info in result['working_tickers']:
                ticker = ticker_info['ticker']
                
                # Priorita: LSE (.L) > Xetra (.DE) > ostatní
                if ticker.endswith('.L'):
                    best_ticker = ticker_info
                    break
                elif ticker.endswith('.DE') and not best_ticker:
                    best_ticker = ticker_info
                elif not best_ticker:
                    best_ticker = ticker_info
            
            if best_ticker:
                working_etfs.append({
                    'name': result['name'],
                    'isin': result['isin'],
                    'recommended_ticker': best_ticker['ticker'],
                    'exchange': best_ticker['exchange'],
                    'currency': best_ticker['currency'],
                    'price': best_ticker['price'],
                    'alternatives': [t['ticker'] for t in result['working_tickers']]
                })
                
                print(f"✅ {result['name'][:30]:30} | {best_ticker['ticker']:>10} | {best_ticker['exchange']}")
    
    return working_etfs

def main():
    print("🚀 ANALÝZA YAHOO FINANCE TICKER PROBLÉMŮ")
    print("=" * 60)
    
    # 1. Test evropských variant
    eu_results = test_european_ticker_variants()
    
    # 2. Test amerických ETF pro srovnání
    us_results = test_us_etfs()
    
    # 3. Vytvoření seznamu funkčních tickerů
    working_etfs = create_working_ticker_list(eu_results)
    
    # 4. Souhrnná analýza
    print(f"\n📊 SOUHRNNÁ ANALÝZA")
    print("=" * 30)
    
    total_eu_tested = sum(len(r['working_tickers']) + len(r['failed_tickers']) for r in eu_results)
    total_eu_working = sum(len(r['working_tickers']) for r in eu_results)
    
    us_working = len([r for r in us_results if r.get('working')])
    
    print(f"🇪🇺 Evropské ETF:")
    print(f"   Testované tickery: {total_eu_tested}")
    print(f"   Funkční: {total_eu_working} ({total_eu_working/total_eu_tested*100:.1f}%)")
    print(f"   ETF s alespoň 1 funkčním tickerem: {len(working_etfs)}/{len(eu_results)}")
    
    print(f"\n🇺🇸 Americké ETF:")
    print(f"   Testované: {len(us_results)}")
    print(f"   Funkční: {us_working} ({us_working/len(us_results)*100:.1f}%)")
    
    # 5. Doporučení pro další kroky
    print(f"\n💡 DOPORUČENÍ:")
    
    if len(working_etfs) >= 20:
        print(f"✅ Máme {len(working_etfs)} funkčních evropských ETF")
        print(f"✅ Doporučuji pokračovat s kombinací EU + US ETF")
        print(f"✅ Priorita: .L (LSE) > .DE (Xetra) tickery")
    else:
        print(f"⚠️  Pouze {len(working_etfs)} funkčních evropských ETF")
        print(f"⚠️  Doporučuji fokus na americké ETF pro začátek")
    
    # 6. Uložení výsledků
    output = {
        'timestamp': pd.Timestamp.now().isoformat(),
        'european_results': eu_results,
        'us_results': us_results,
        'working_etfs': working_etfs,
        'summary': {
            'eu_total_tested': total_eu_tested,
            'eu_working': total_eu_working,
            'eu_success_rate': total_eu_working/total_eu_tested*100 if total_eu_tested > 0 else 0,
            'eu_etfs_with_working_ticker': len(working_etfs),
            'us_tested': len(us_results),
            'us_working': us_working,
            'us_success_rate': us_working/len(us_results)*100 if us_results else 0
        }
    }
    
    output_file = "/Users/tomaskostrhoun/Documents/ETF/yahoo_ticker_analysis.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, default=str, ensure_ascii=False)
    
    print(f"\n💾 Analýza uložena: {output_file}")
    
    return output

if __name__ == "__main__":
    main()