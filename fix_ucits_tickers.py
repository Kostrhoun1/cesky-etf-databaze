#!/usr/bin/env python3
"""
Automatická oprava tickerů pro Yahoo Finance kompatibilitu
Generováno z analýzy UCITS ETF databáze
"""

import yfinance as yf
import time
from supabase import create_client

# Supabase konfigurace
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_ticker_variants(base_ticker, exchanges):
    """Generuje varianty tickerů pro testování"""
    variants = []
    
    # Exchange mappings
    exchange_suffixes = {
        'Xetra': '.DE',
        'London Stock Exchange': '.L',
        'LSE': '.L',
        'Borsa Italiana': '.MI', 
        'Euronext Paris': '.PA',
        'Euronext Amsterdam': '.AS'
    }
    
    # Přidej ticker s příponou podle burzy
    for exchange in exchanges:
        suffix = exchange_suffixes.get(exchange)
        if suffix:
            variants.append(f"{base_ticker}{suffix}")
    
    # Přidej bez přípony
    variants.append(base_ticker)
    
    # Priorita: LSE > Xetra > ostatní
    priority_order = ['.L', '.DE', '.MI', '.PA', '.AS']
    sorted_variants = []
    
    for priority in priority_order:
        for variant in variants:
            if variant.endswith(priority) and variant not in sorted_variants:
                sorted_variants.append(variant)
    
    # Přidej zbývající
    for variant in variants:
        if variant not in sorted_variants:
            sorted_variants.append(variant)
    
    return sorted_variants

def test_ticker_with_yahoo(ticker):
    """Testuje ticker s Yahoo Finance"""
    try:
        etf = yf.Ticker(ticker)
        hist = etf.history(period="5d")
        
        if len(hist) > 0:
            info = etf.info
            return {
                'working': True,
                'days': len(hist),
                'price': info.get('regularMarketPrice'),
                'currency': info.get('currency'),
                'exchange': info.get('exchange')
            }
        else:
            return {'working': False, 'error': 'No historical data'}
            
    except Exception as e:
        return {'working': False, 'error': str(e)}

def find_working_ticker_for_etf(isin, name, tickers, exchanges):
    """Najde funkční ticker pro ETF"""
    print(f"🔍 Testování {name[:30]:30} ({isin})")
    
    # Generuj varianty
    if tickers:
        base_ticker = tickers[0]  # První ticker jako základ
        variants = generate_ticker_variants(base_ticker, exchanges)
        
        # Přidej původní tickery
        for ticker in tickers:
            if ticker not in variants:
                variants.append(ticker)
    else:
        print(f"   ❌ Žádné tickery k dispozici")
        return None
    
    # Testuj varianty
    for ticker in variants[:5]:  # Omez na 5 variant
        print(f"   🧪 {ticker:>10}", end="")
        
        result = test_ticker_with_yahoo(ticker)
        
        if result['working']:
            print(f" ✅ FUNGUJE | ${result['price']} | {result['currency']}")
            return {
                'working_ticker': ticker,
                'original_tickers': tickers,
                'test_result': result
            }
        else:
            print(f" ❌ {result['error'][:20]}")
        
        time.sleep(1)  # Rate limiting
    
    print(f"   ❌ Žádný funkční ticker nenalezen")
    return None

def main():
    print("🚀 AUTOMATIC TICKER CORRECTION FOR UCITS ETF")
    print("=" * 60)
    
    # TODO: Implementace hlavní logiky
    pass

if __name__ == "__main__":
    main()
