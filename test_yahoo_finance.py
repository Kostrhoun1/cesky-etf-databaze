#!/usr/bin/env python3
"""
Test script pro Yahoo Finance API - stahování dat o US ETF
"""

import yfinance as yf
import json
import pandas as pd

# Top 10 US ETF pro test
etf_tickers = [
    "SPY",   # SPDR S&P 500 ETF Trust
    "QQQ",   # Invesco QQQ Trust
    "IVV",   # iShares Core S&P 500 ETF
    "VTI",   # Vanguard Total Stock Market ETF
    "VOO",   # Vanguard S&P 500 ETF
    "VEA",   # Vanguard FTSE Developed Markets ETF
    "IEFA",  # iShares Core MSCI EAFE IMI Index ETF
    "VWO",   # Vanguard FTSE Emerging Markets ETF
    "AGG",   # iShares Core U.S. Aggregate Bond ETF
    "BND"    # Vanguard Total Bond Market ETF
]

def get_etf_data(ticker):
    """Získá základní data o ETF z Yahoo Finance"""
    try:
        etf = yf.Ticker(ticker)
        info = etf.info
        
        # Základní informace
        data = {
            'ticker': ticker,
            'longName': info.get('longName', 'N/A'),
            'category': info.get('category', 'N/A'),
            'totalAssets': info.get('totalAssets', None),
            'expenseRatio': info.get('annualReportExpenseRatio', None),
            'yield': info.get('yield', None),
            'beta': info.get('beta', None),
            'nav': info.get('navPrice', None),
            'currency': info.get('currency', 'USD'),
            'fundFamily': info.get('fundFamily', 'N/A'),
            'fundInceptionDate': info.get('fundInceptionDate', 'N/A'),
            'ytdReturn': info.get('ytdReturn', None),
            'trailingPE': info.get('trailingPE', None),
            'volume': info.get('volume', None),
            'averageVolume': info.get('averageVolume', None),
            'fiftyTwoWeekLow': info.get('fiftyTwoWeekLow', None),
            'fiftyTwoWeekHigh': info.get('fiftyTwoWeekHigh', None)
        }
        
        # Pokus o holdings (ne všechny ETF to mají)
        try:
            holdings = etf.major_holders
            if holdings is not None and not holdings.empty:
                data['top_holders'] = holdings.to_dict()
        except:
            data['top_holders'] = None
            
        return data
        
    except Exception as e:
        print(f"Chyba při získávání dat pro {ticker}: {e}")
        return None

def main():
    print("🚀 Testování Yahoo Finance API pro US ETF")
    print("=" * 50)
    
    all_etf_data = []
    
    for ticker in etf_tickers:
        print(f"📊 Stahování dat pro {ticker}...")
        data = get_etf_data(ticker)
        
        if data:
            all_etf_data.append(data)
            print(f"   ✅ {data['longName']}")
            if data['expenseRatio']:
                print(f"      Expense Ratio: {data['expenseRatio']:.4f} ({data['expenseRatio']*100:.2f}%)")
            if data['totalAssets']:
                aum_billions = data['totalAssets'] / 1_000_000_000
                print(f"      AUM: ${aum_billions:.1f}B")
            print()
        else:
            print(f"   ❌ Nepodařilo se získat data pro {ticker}")
    
    # Uložení do JSON
    output_file = "/Users/tomaskostrhoun/Documents/ETF/yahoo_finance_test_results.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_etf_data, f, indent=2, default=str)
    
    print(f"💾 Data uložena do: {output_file}")
    print(f"📈 Úspěšně získáno dat pro {len(all_etf_data)}/{len(etf_tickers)} ETF")
    
    # Přehled dostupných polí
    if all_etf_data:
        print("\n📋 Dostupná pole:")
        sample_etf = all_etf_data[0]
        for key, value in sample_etf.items():
            if value is not None:
                print(f"   ✅ {key}: {type(value).__name__}")
            else:
                print(f"   ❌ {key}: None")

if __name__ == "__main__":
    main()