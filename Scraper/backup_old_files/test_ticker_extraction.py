#!/usr/bin/env python3
"""
Test script pro ověření ticker extrakce na konkrétním ETF
"""

import requests
from bs4 import BeautifulSoup
import re

def test_ticker_extraction(isin: str):
    """Test ticker extrakce na konkrétním ISIN"""
    url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
    
    print(f"🔍 Testing ticker extraction for ISIN: {isin}")
    print(f"URL: {url}")
    print("-" * 60)
    
    try:
        # Fetch stránku
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extrahuj název ETF
        name = "Unknown ETF"
        name_element = soup.find('h1')
        if name_element:
            name = name_element.get_text().strip()
        
        print(f"📋 ETF Name: {name}")
        print()
        
        # Test různých metod extrakce
        results = {}
        
        # Metoda 1: Hledání exchange tabulky
        results['table_method'] = find_ticker_in_tables(soup)
        
        # Metoda 2: Regex v celém textu
        results['regex_method'] = find_ticker_with_regex(soup, isin)
        
        # Metoda 3: Hledání v kontextu burz
        results['exchange_context'] = find_ticker_in_exchange_context(soup)
        
        # Metoda 4: Meta tags a strukturovaná data
        results['meta_method'] = find_ticker_in_meta(soup)
        
        # Výsledky
        print("📊 VÝSLEDKY TESTOVÁNÍ:")
        print("=" * 40)
        
        for method, ticker in results.items():
            status = "✅ FOUND" if ticker else "❌ NOT FOUND"
            print(f"{method:20} | {status:12} | {ticker or 'N/A'}")
        
        # Nejlepší kandidát
        found_tickers = [t for t in results.values() if t]
        if found_tickers:
            print(f"\n🎯 NEJLEPŠÍ KANDIDÁT: {found_tickers[0]}")
        else:
            print(f"\n❌ ŽÁDNÝ TICKER NENALEZEN")
        
        return found_tickers[0] if found_tickers else None
        
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return None

def find_ticker_in_tables(soup):
    """Hledá ticker v tabulkách"""
    tables = soup.find_all('table')
    
    for table in tables:
        # Zkontroluj header
        headers = table.find_all(['th', 'td'])
        header_text = ' '.join([h.get_text().lower() for h in headers[:10]])
        
        if any(keyword in header_text for keyword in ['ticker', 'symbol', 'exchange', 'trading']):
            print(f"🔍 Found relevant table with headers: {header_text[:100]}...")
            
            # Parsuj řádky
            rows = table.find_all('tr')
            for row in rows[1:]:  # Skip header
                cells = row.find_all(['td', 'th'])
                for cell in cells:
                    cell_text = cell.get_text().strip()
                    # Hledej ticker pattern
                    ticker_match = re.match(r'^([A-Z0-9]{2,8})$', cell_text)
                    if ticker_match and is_valid_ticker(ticker_match.group(1)):
                        return ticker_match.group(1)
    
    return None

def find_ticker_with_regex(soup, isin):
    """Hledá ticker pomocí regex patterns"""
    text = soup.get_text()
    
    patterns = [
        r'(?:ticker|symbol|trading symbol)[:\s]+([A-Z0-9]{2,8})',
        r'\(([A-Z0-9]{2,8})\)',
        rf'{re.escape(isin)}[^a-zA-Z0-9]*(?:ticker|symbol)[:\s]*([A-Z0-9]{{2,8}})',
        r'quote[:\s]+([A-Z0-9]{2,8})',
        r'([A-Z0-9]{2,8})\s+shares',
    ]
    
    for i, pattern in enumerate(patterns, 1):
        matches = re.findall(pattern, text, re.I)
        for match in matches:
            ticker = match.upper().strip()
            if is_valid_ticker(ticker):
                print(f"🔍 Regex pattern {i} found: {ticker}")
                return ticker
    
    return None

def find_ticker_in_exchange_context(soup):
    """Hledá ticker v kontextu burz"""
    text = soup.get_text()
    
    exchanges = [
        'London Stock Exchange', 'LSE', 'Frankfurt', 'XETRA', 
        'Stuttgart', 'Euronext', 'Swiss', 'gettex', 'Tradegate'
    ]
    
    for exchange in exchanges:
        if exchange.lower() in text.lower():
            # Extrahuj kontext kolem burzy
            pattern = re.compile(re.escape(exchange), re.I)
            match = pattern.search(text)
            
            if match:
                start = max(0, match.start() - 100)
                end = min(len(text), match.end() + 100)
                context = text[start:end]
                
                # Hledej ticker v kontextu
                ticker_patterns = [
                    r'([A-Z0-9]{2,8})\s+(?:on|at)\s+',
                    r':\s*([A-Z0-9]{2,8})',
                    r'\(([A-Z0-9]{2,8})\)',
                ]
                
                for pattern in ticker_patterns:
                    matches = re.findall(pattern, context, re.I)
                    for match in matches:
                        ticker = match.upper().strip()
                        if is_valid_ticker(ticker):
                            print(f"🔍 Exchange context found: {ticker} near {exchange}")
                            return ticker
    
    return None

def find_ticker_in_meta(soup):
    """Hledá ticker v meta tags a strukturovaných datech"""
    # Meta tags
    meta_tags = soup.find_all('meta')
    for meta in meta_tags:
        content = meta.get('content', '')
        if content:
            ticker_match = re.search(r'\b([A-Z0-9]{2,8})\b', content)
            if ticker_match and is_valid_ticker(ticker_match.group(1)):
                return ticker_match.group(1)
    
    # JSON-LD structured data
    scripts = soup.find_all('script', type='application/ld+json')
    for script in scripts:
        try:
            import json
            data = json.loads(script.string)
            # Hledej ticker v strukturovaných datech
            ticker = extract_ticker_from_json(data)
            if ticker:
                return ticker
        except:
            continue
    
    return None

def extract_ticker_from_json(data, path=""):
    """Rekurzivně hledá ticker v JSON datech"""
    if isinstance(data, dict):
        for key, value in data.items():
            if 'ticker' in key.lower() or 'symbol' in key.lower():
                if isinstance(value, str) and is_valid_ticker(value):
                    return value.upper()
            
            result = extract_ticker_from_json(value, f"{path}.{key}")
            if result:
                return result
    
    elif isinstance(data, list):
        for i, item in enumerate(data):
            result = extract_ticker_from_json(item, f"{path}[{i}]")
            if result:
                return result
    
    return None

def is_valid_ticker(ticker):
    """Validuje ticker"""
    if not ticker or len(ticker) < 2 or len(ticker) > 8:
        return False
    
    false_positives = [
        'EUR', 'USD', 'GBP', 'CHF', 'ETF', 'UCITS', 'ACC', 'DIST',
        'FUND', 'INDEX', 'MSCI', 'FTSE', 'HTML', 'HTTP', 'PDF'
    ]
    
    return ticker not in false_positives and re.search(r'[A-Z]', ticker)

def main():
    """Test na známých ETF"""
    test_isins = [
        "IE00B6YX5C33",  # SPDR S&P 500 (měl by mít SPY5)
        "IE00BK5BQT80",  # Vanguard FTSE All-World (VWCE)
        "IE00B4L5Y983",  # iShares Core MSCI World (IWDA)
        "IE00B5BMR087",  # iShares Core S&P 500 (CSPX)
    ]
    
    print("🚀 TESTING TICKER EXTRACTION")
    print("=" * 60)
    
    results = {}
    
    for isin in test_isins:
        print(f"\n{'='*60}")
        ticker = test_ticker_extraction(isin)
        results[isin] = ticker
        print(f"{'='*60}")
    
    print(f"\n📊 CELKOVÉ VÝSLEDKY:")
    print("-" * 40)
    for isin, ticker in results.items():
        status = "✅" if ticker else "❌"
        print(f"{status} {isin}: {ticker or 'NOT FOUND'}")

if __name__ == "__main__":
    main()