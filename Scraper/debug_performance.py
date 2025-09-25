#!/usr/bin/env python3
"""
DEBUG SCRIPT - Analyza performance dat z JustETF
"""

import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime

def debug_etf_performance(isin: str):
    """Debug performance extraction pro konkrétní ETF"""
    url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
    
    print(f"🔍 DEBUGGING ETF: {isin}")
    print(f"URL: {url}")
    print("="*80)
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # 1. Hledání performance tabulek
        print("📊 HLEDÁNÍ PERFORMANCE TABULEK:")
        tables = soup.find_all('table')
        for i, table in enumerate(tables):
            text = table.get_text()
            if any(term in text.lower() for term in ['performance', 'return', '1m', '3m', '6m', '2021', '2022', '2023', '2024']):
                print(f"  Tabulka {i+1}: {text[:200]}...")
                print(f"  HTML: {str(table)[:300]}...")
                print()
        
        # 2. Hledání v divech s performance třídami
        print("📈 HLEDÁNÍ PERFORMANCE DIVŮ:")
        perf_divs = soup.find_all(['div', 'section'], class_=re.compile(r'performance|return|chart', re.I))
        for i, div in enumerate(perf_divs):
            print(f"  Div {i+1}: class='{div.get('class')}' -> {div.get_text()[:150]}...")
        
        # 3. Hledání všech span/td s procenty
        print("📋 HLEDÁNÍ ČÍSEL S PROCENTY:")
        elements = soup.find_all(['span', 'td', 'div'], string=re.compile(r'[+-]?\d+[.,]\d+%'))
        for element in elements[:10]:  # Prvních 10
            print(f"  {element.name}: '{element.get_text()}' | class='{element.get('class')}' | parent='{element.parent.name}'")
        
        # 4. Hledání konkrétních textů
        print("🔎 HLEDÁNÍ KONKRÉTNÍCH TEXTŮ:")
        full_text = soup.get_text()
        
        # Hledání období
        periods = ['1 Month', '1M', '3 Month', '3M', '6 Month', '6M', '2021', '2022', '2023', '2024']
        for period in periods:
            if period in full_text:
                # Najdi kontext
                lines = full_text.split('\n')
                for line in lines:
                    if period in line and '%' in line:
                        print(f"  {period}: {line.strip()}")
        
        # 5. Hledání JavaScript dat
        print("🔧 HLEDÁNÍ JAVASCRIPT DAT:")
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string and any(term in script.string for term in ['performance', 'return', 'chart']):
                print(f"  Script obsahuje performance data: {script.string[:200]}...")
        
        return soup
        
    except Exception as e:
        print(f"❌ CHYBA: {e}")
        return None

def test_performance_patterns():
    """Test stávajících regex patterns"""
    print("\n🧪 TEST STÁVAJÍCÍCH REGEX PATTERNS:")
    
    # Test vzorky textu (simulace JustETF HTML)
    test_texts = [
        "1 Month: +2.34%",
        "1M +1.23%", 
        "3 Month: -0.45%",
        "6M: +5.67%",
        "Year 2021: +15.23%",
        "2022: -8.45%",
        "Return 2023: +12.34%",
        ">1M</td><td>+2.11%</td>",
        "1 month +3.45%"
    ]
    
    perf_patterns = {
        'return_1m': [
            r'1\s*(?:Month|M|měsíc)[:\s]*([+-]?\d+[.,]\d+)%',
            r'1M[:\s]*([+-]?\d+[.,]\d+)%',
            r'1\s*month[:\s]*([+-]?\d+[.,]\d+)%',
            r'>1M</td>\s*<td[^>]*>([+-]?\d+[.,]\d+)%',
            r'1\s*mth[:\s]*([+-]?\d+[.,]\d+)%'
        ],
        'return_3m': [
            r'3\s*(?:Month|M|měsíc)[:\s]*([+-]?\d+[.,]\d+)%',
            r'3M[:\s]*([+-]?\d+[.,]\d+)%'
        ],
        'return_6m': [
            r'6\s*(?:Month|M|měsíc)[:\s]*([+-]?\d+[.,]\d+)%',
            r'6M[:\s]*([+-]?\d+[.,]\d+)%'
        ],
        'return_2021': [
            r'(?:Year\s*)?2021[:\s]*([+-]?\d+[.,]\d+)%',
            r'Return\s*2021[:\s]*([+-]?\d+[.,]\d+)%'
        ]
    }
    
    for field, patterns in perf_patterns.items():
        print(f"\n{field}:")
        for pattern in patterns:
            print(f"  Pattern: {pattern}")
            for text in test_texts:
                match = re.search(pattern, text, re.IGNORECASE)
                if match:
                    print(f"    ✅ MATCH: '{text}' -> {match.group(1)}")

if __name__ == "__main__":
    # Test na konkrétním ETF
    debug_etf_performance("IE000IEGVMH6")
    
    # Test regex patterns
    test_performance_patterns()