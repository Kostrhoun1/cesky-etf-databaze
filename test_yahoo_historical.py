#!/usr/bin/env python3
"""
Test Yahoo Finance historických dat - zjistíme co všechno můžeme získat
"""

import yfinance as yf
import pandas as pd
import json
from datetime import datetime, timedelta

def test_historical_data(ticker, period="5y"):
    """Test historických dat pro daný ticker"""
    print(f"\n📈 Testování historických dat pro {ticker}")
    print("=" * 50)
    
    try:
        etf = yf.Ticker(ticker)
        
        # 1. Základní historická data (OHLCV)
        hist = etf.history(period=period)
        print(f"📊 Historická data ({period}):")
        print(f"   Počet dní: {len(hist)}")
        print(f"   Od: {hist.index[0].strftime('%Y-%m-%d')}")
        print(f"   Do: {hist.index[-1].strftime('%Y-%m-%d')}")
        print(f"   Sloupce: {list(hist.columns)}")
        
        # Zobrazit první a poslední záznamy
        print(f"\n   První záznam:")
        first = hist.iloc[0]
        print(f"     Open: ${first['Open']:.2f}, Close: ${first['Close']:.2f}, Volume: {first['Volume']:,}")
        
        print(f"   Poslední záznam:")
        last = hist.iloc[-1]
        print(f"     Open: ${last['Open']:.2f}, Close: ${last['Close']:.2f}, Volume: {last['Volume']:,}")
        
        # 2. Dividendy
        try:
            dividends = etf.dividends
            if len(dividends) > 0:
                print(f"\n💰 Dividendy:")
                print(f"   Počet výplat: {len(dividends)}")
                print(f"   Od: {dividends.index[0].strftime('%Y-%m-%d')}")
                print(f"   Do: {dividends.index[-1].strftime('%Y-%m-%d')}")
                print(f"   Poslední dividend: ${dividends.iloc[-1]:.4f}")
                
                # Dividendy za posledních 12 měsíců
                one_year_ago = datetime.now() - timedelta(days=365)
                recent_divs = dividends[dividends.index >= one_year_ago]
                annual_dividend = recent_divs.sum()
                print(f"   Dividendy za 12 měsíců: ${annual_dividend:.4f}")
            else:
                print(f"\n💰 Dividendy: Žádné nalezené")
        except Exception as e:
            print(f"\n💰 Dividendy: Chyba - {e}")
        
        # 3. Stock splits
        try:
            splits = etf.splits
            if len(splits) > 0:
                print(f"\n🔄 Stock splits:")
                print(f"   Počet splitů: {len(splits)}")
                print(f"   Poslední split: {splits.index[-1].strftime('%Y-%m-%d')} - {splits.iloc[-1]}")
            else:
                print(f"\n🔄 Stock splits: Žádné")
        except Exception as e:
            print(f"\n🔄 Stock splits: Chyba - {e}")
        
        # 4. Test různých období
        periods = ["1y", "2y", "5y", "10y", "max"]
        print(f"\n📅 Dostupnost dat pro různá období:")
        for test_period in periods:
            try:
                test_hist = etf.history(period=test_period)
                if len(test_hist) > 0:
                    print(f"   {test_period:>3}: {len(test_hist):>4} dní (od {test_hist.index[0].strftime('%Y-%m-%d')})")
                else:
                    print(f"   {test_period:>3}: Žádná data")
            except Exception as e:
                print(f"   {test_period:>3}: Chyba - {e}")
        
        # 5. Test různých intervalů
        intervals = ["1d", "1wk", "1mo"]
        print(f"\n⏰ Různé intervaly (za posledních 1 rok):")
        for interval in intervals:
            try:
                test_hist = etf.history(period="1y", interval=interval)
                if len(test_hist) > 0:
                    print(f"   {interval:>3}: {len(test_hist):>3} záznamů")
                else:
                    print(f"   {interval:>3}: Žádná data")
            except Exception as e:
                print(f"   {interval:>3}: Chyba - {e}")
        
        return {
            'ticker': ticker,
            'history_available': len(hist) > 0,
            'total_days': len(hist),
            'start_date': hist.index[0].strftime('%Y-%m-%d') if len(hist) > 0 else None,
            'end_date': hist.index[-1].strftime('%Y-%m-%d') if len(hist) > 0 else None,
            'has_dividends': len(dividends) > 0 if 'dividends' in locals() else False,
            'dividend_count': len(dividends) if 'dividends' in locals() and len(dividends) > 0 else 0,
            'has_splits': len(splits) > 0 if 'splits' in locals() else False
        }
        
    except Exception as e:
        print(f"❌ Chyba při získávání dat pro {ticker}: {e}")
        return None

def test_european_etfs():
    """Test evropských ETF s různými tickery"""
    print("\n🇪🇺 TESTOVÁNÍ EVROPSKÝCH ETF")
    print("=" * 60)
    
    # Testujeme různé evropské ETF
    european_etfs = [
        "VWCE.DE",  # Vanguard All-World (Xetra)
        "VWCE.L",   # Vanguard All-World (LSE)
        "CSPX.DE",  # iShares S&P 500 (Xetra)
        "CSPX.L",   # iShares S&P 500 (LSE)
        "EUNL.DE",  # iShares MSCI Europe (Xetra)
        "VFEM.DE",  # Vanguard EM (Xetra)
    ]
    
    results = []
    for ticker in european_etfs:
        result = test_historical_data(ticker, period="5y")
        if result:
            results.append(result)
        
        # Pauza mezi requesty
        import time
        time.sleep(1)
    
    return results

def test_us_etfs():
    """Test amerických ETF"""
    print("\n🇺🇸 TESTOVÁNÍ AMERICKÝCH ETF")
    print("=" * 60)
    
    us_etfs = ["SPY", "VTI", "QQQ", "IVV", "VOO"]
    
    results = []
    for ticker in us_etfs:
        result = test_historical_data(ticker, period="max")  # Maximum pro US ETF
        if result:
            results.append(result)
        
        import time
        time.sleep(1)
    
    return results

def analyze_data_volume():
    """Analýza objemu dat"""
    print("\n📊 ANALÝZA OBJEMU DAT")
    print("=" * 40)
    
    # Test pro jeden ETF - kolik dat za různá období
    ticker = "SPY"  # Jeden z nejstarších ETF
    etf = yf.Ticker(ticker)
    
    periods_analysis = {}
    
    for period in ["1y", "2y", "5y", "10y", "max"]:
        try:
            hist = etf.history(period=period)
            periods_analysis[period] = {
                'days': len(hist),
                'size_mb': hist.memory_usage(deep=True).sum() / 1024 / 1024,
                'start': hist.index[0].strftime('%Y-%m-%d') if len(hist) > 0 else None,
                'end': hist.index[-1].strftime('%Y-%m-%d') if len(hist) > 0 else None
            }
            
            print(f"{period:>4}: {len(hist):>4} dní, {periods_analysis[period]['size_mb']:.2f} MB")
            if period == "max":
                print(f"      Od {periods_analysis[period]['start']} do {periods_analysis[period]['end']}")
                
        except Exception as e:
            print(f"{period:>4}: Chyba - {e}")
    
    return periods_analysis

def main():
    print("🚀 KOMPLEXNÍ TEST YAHOO FINANCE HISTORICKÝCH DAT")
    print("=" * 60)
    
    # Test evropských ETF
    eu_results = test_european_etfs()
    
    # Test amerických ETF  
    us_results = test_us_etfs()
    
    # Analýza objemu dat
    data_analysis = analyze_data_volume()
    
    # Souhrnný report
    print(f"\n📋 SOUHRNNÝ REPORT")
    print("=" * 30)
    
    all_results = eu_results + us_results
    successful = [r for r in all_results if r and r['history_available']]
    
    print(f"Testováno ETF: {len(all_results)}")
    print(f"Úspěšně získána data: {len(successful)}")
    
    if successful:
        avg_days = sum(r['total_days'] for r in successful) / len(successful)
        oldest_start = min(r['start_date'] for r in successful)
        print(f"Průměrný počet dní: {avg_days:.0f}")
        print(f"Nejstarší data od: {oldest_start}")
        
        with_dividends = [r for r in successful if r['has_dividends']]
        print(f"S dividendami: {len(with_dividends)}/{len(successful)}")
    
    # Uložení výsledků
    output = {
        'timestamp': datetime.now().isoformat(),
        'european_etfs': eu_results,
        'us_etfs': us_results,
        'data_volume_analysis': data_analysis,
        'summary': {
            'total_tested': len(all_results),
            'successful': len(successful),
            'avg_days': avg_days if successful else 0,
            'oldest_date': oldest_start if successful else None
        }
    }
    
    with open("/Users/tomaskostrhoun/Documents/ETF/yahoo_historical_test_results.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, default=str)
    
    print(f"\n💾 Výsledky uloženy do yahoo_historical_test_results.json")

if __name__ == "__main__":
    main()