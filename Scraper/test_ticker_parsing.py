#!/usr/bin/env python3
"""
Test ticker parsing logic
"""

import re

def _is_obviously_invalid_ticker(ticker: str) -> bool:
    """Méně přísná validace - vyloučí pouze zjevně špatné tickery"""
    if not ticker or len(ticker) < 2 or len(ticker) > 8:
        return True
    
    # Vyloučí pouze zjevně neplatné tickery
    obviously_invalid = {
        # Měny
        'EUR', 'USD', 'GBP', 'CHF', 'GBX', 'USX', 'EUX',
        # ETF/Fund related základní
        'ETF', 'UCITS', 'ACC', 'DIST', 'FUND', 'INDEX',
        'ETC', 'ETN', 'ETP',
        # Burzy
        'NYSE', 'LSE', 'FSE', 'NASDAQ', 'AMEX',
        # Technické
        'HTML', 'HTTP', 'HTTPS', 'WWW', 'PDF', 'CSV', 'JSON',
        # Města/země
        'LONDON', 'FRANKFURT', 'STUTTGART', 'AMSTERDAM', 'MILAN', 'PARIS',
        # Časté chyby
        'ISIN', 'WKN', 'CUSIP', 'SEDOL', 'MARKET', 'STOCK'
    }
    
    return ticker in obviously_invalid

def test_ticker_processing():
    # Test data from HTML debug
    test_cases = [
        "CSPX",
        "SXR8", 
        "CSP1",
        "CSSPX",
        "-",
        ""
    ]
    
    print("Testing ticker processing logic:")
    print("=" * 50)
    
    for ticker_text in test_cases:
        print(f"\nTesting: '{ticker_text}'")
        
        # Čištění ticker textu - zachová pouze alfanumerické znaky
        ticker_clean = re.sub(r'[^A-Z0-9]', '', ticker_text.upper())
        print(f"  After cleaning: '{ticker_clean}'")
        
        if ticker_clean and len(ticker_clean) >= 2 and ticker_clean not in ['-', '--', 'N/A', '']:
            print(f"  ✅ Passed basic checks")
            
            # Méně přísná validace - přijmeme jakýkoliv rozumný ticker
            if re.match(r'^[A-Z0-9]{2,8}$', ticker_clean):
                print(f"  ✅ Passed regex check")
                
                if not _is_obviously_invalid_ticker(ticker_clean):
                    print(f"  ✅ FINAL RESULT: ACCEPTED as '{ticker_clean}'")
                else:
                    print(f"  ❌ REJECTED: Obviously invalid ticker")
            else:
                print(f"  ❌ REJECTED: Failed regex check")
        else:
            print(f"  ❌ REJECTED: Failed basic checks")

if __name__ == "__main__":
    test_ticker_processing()