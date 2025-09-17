#!/usr/bin/env python3
"""
Test script pro extrakci tickerů z JustETF pro CSPX ETF
"""

import requests
from bs4 import BeautifulSoup
import time

def test_cspx_extraction():
    """Test extrakce tickerů pro CSPX ETF"""
    
    isin = "IE00B5BMR087"  # iShares Core S&P 500 UCITS ETF USD (Acc)
    url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
    
    print(f"Testing ticker extraction for CSPX ETF")
    print(f"ISIN: {isin}")
    print(f"URL: {url}")
    print("-" * 80)
    
    # Headers to mimic real browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }
    
    try:
        print("Fetching page...")
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        print(f"Response status: {response.status_code}")
        print(f"Content length: {len(response.content)} bytes")
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Look for exchange/listing tables
        print("\n1. Looking for exchange tables...")
        tables = soup.find_all('table')
        print(f"Found {len(tables)} tables")
        
        for i, table in enumerate(tables):
            headers = table.find('tr')
            if headers:
                header_texts = [th.get_text().strip() for th in headers.find_all(['th', 'td'])]
                if any('ticker' in h.lower() or 'listing' in h.lower() for h in header_texts):
                    print(f"\nTable {i} (potential exchange table):")
                    print(f"Headers: {header_texts}")
                    
                    # Print first few rows
                    rows = table.find_all('tr')[1:4]  # First 3 data rows
                    for j, row in enumerate(rows):
                        cells = [td.get_text().strip() for td in row.find_all(['td', 'th'])]
                        print(f"Row {j}: {cells}")
        
        # Look for text containing common exchange names and CSPX
        print("\n2. Looking for CSPX in page text...")
        text = soup.get_text()
        
        # Search for CSPX specifically
        if 'CSPX' in text:
            print("✅ Found CSPX in page text!")
            # Get context around CSPX
            import re
            matches = re.finditer(r'.{0,50}CSPX.{0,50}', text, re.IGNORECASE)
            for match in matches:
                print(f"Context: '{match.group().strip()}'")
        else:
            print("❌ CSPX not found in page text")
        
        # Look for other common tickers
        print("\n3. Looking for other potential tickers...")
        common_tickers = ['SXR8', 'CSX1', 'SWDA', 'VWCE', 'VUAA']
        for ticker in common_tickers:
            if ticker in text:
                print(f"✅ Found {ticker} in page text")
                # Get context
                import re
                matches = re.finditer(f'.{{0,30}}{ticker}.{{0,30}}', text, re.IGNORECASE)
                for match in matches:
                    print(f"  Context: '{match.group().strip()}'")
        
        # Look for exchange-specific sections
        print("\n4. Looking for exchange sections...")
        exchange_keywords = ['London Stock Exchange', 'XETRA', 'Stuttgart', 'Frankfurt', 'Euronext']
        for exchange in exchange_keywords:
            if exchange.lower() in text.lower():
                print(f"✅ Found {exchange}")
        
        # Save HTML for manual inspection
        with open('/Users/tomaskostrhoun/Documents/ETF/Scraper/cspx_debug.html', 'w', encoding='utf-8') as f:
            f.write(str(soup.prettify()))
        print(f"\n5. HTML saved to cspx_debug.html for manual inspection")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_cspx_extraction()