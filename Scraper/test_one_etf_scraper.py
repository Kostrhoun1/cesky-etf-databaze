#!/usr/bin/env python3
"""
Test scraper pro jeden konkrétní ETF - ověří že scraping funguje
"""

import requests
from bs4 import BeautifulSoup
import re
from typing import Dict, Optional

def test_scrape_one_etf(isin: str = "IE00B4L5Y983"):  # Core MSCI World
    """Test scraping jednoho ETF z JustETF"""
    
    print(f"🔍 Testujeme scraping pro ISIN: {isin}")
    
    url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
    print(f"🌐 URL: {url}")
    
    # Setup session
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    })
    
    try:
        print("📡 Stahujeme stránku...")
        response = session.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Najít název ETF
        title = soup.find('h1')
        if title:
            print(f"📊 ETF: {title.get_text(strip=True)}")
        
        print("\n🔍 Hledáme performance data...")
        
        # Metoda 1: Hledat konkrétní texty
        performance_data = {}
        
        # Projít všechny elementy na stránce
        all_text = soup.get_text()
        
        # Vzory pro hledání
        patterns = {
            'YTD': r'YTD[^\d]*([+-]?\d+\.?\d*)%',
            '1 month': r'1\s*month[^\d]*([+-]?\d+\.?\d*)%',
            '3 months': r'3\s*months[^\d]*([+-]?\d+\.?\d*)%', 
            '6 months': r'6\s*months[^\d]*([+-]?\d+\.?\d*)%',
            '1 year': r'1\s*year[^\d]*([+-]?\d+\.?\d*)%',
            '2024': r'2024[^\d]*([+-]?\d+\.?\d*)%',
            '2023': r'2023[^\d]*([+-]?\d+\.?\d*)%',
            '2022': r'2022[^\d]*([+-]?\d+\.?\d*)%',
            '2021': r'2021[^\d]*([+-]?\d+\.?\d*)%',
            'Since inception': r'Since\s*inception[^\d]*([+-]?\d+\.?\d*)%',
            'MAX': r'MAX[^\d]*([+-]?\d+\.?\d*)%'
        }
        
        for period, pattern in patterns.items():
            matches = re.findall(pattern, all_text, re.IGNORECASE)
            if matches:
                # Vzít první match
                value = float(matches[0])
                performance_data[period] = value
                print(f"  ✅ {period}: {value}%")
        
        # Metoda 2: Hledat v tabulkách
        print("\n📊 Hledáme v tabulkách...")
        tables = soup.find_all('table')
        for i, table in enumerate(tables):
            print(f"  Tabulka {i+1}:")
            rows = table.find_all('tr')
            for row in rows:
                cells = row.find_all(['td', 'th'])
                if len(cells) >= 2:
                    period = cells[0].get_text(strip=True)
                    value_text = cells[1].get_text(strip=True)
                    
                    # Hledat procenta
                    percentage_match = re.search(r'([+-]?\d+\.?\d*)%', value_text)
                    if percentage_match and any(keyword in period.lower() for keyword in ['month', 'year', 'ytd', '2024', '2023', '2022', '2021', 'inception']):
                        value = float(percentage_match.group(1))
                        print(f"    ✅ {period}: {value}%")
        
        # Metoda 3: Hledat performance sekce
        print("\n🎯 Hledáme performance sekce...")
        performance_keywords = ['performance', 'return', 'chart', 'historical']
        
        for keyword in performance_keywords:
            sections = soup.find_all(['div', 'section'], string=re.compile(keyword, re.IGNORECASE))
            for section in sections:
                parent = section.find_parent()
                if parent:
                    text = parent.get_text()
                    if '1 month' in text or '3 months' in text:
                        print(f"    📍 Našli jsme sekci s '{keyword}':")
                        lines = text.split('\n')[:10]  # Prvních 10 řádků
                        for line in lines:
                            if line.strip() and ('%' in line or 'month' in line.lower()):
                                print(f"      {line.strip()}")
        
        print(f"\n✅ Celkem nalezeno {len(performance_data)} performance hodnot:")
        for period, value in performance_data.items():
            print(f"  📊 {period}: {value}%")
        
        return performance_data
        
    except Exception as e:
        print(f"❌ Chyba: {e}")
        return {}

if __name__ == "__main__":
    # Test s populárním ETF
    test_scrape_one_etf("IE00B4L5Y983")  # iShares Core MSCI World
    print("\n" + "="*50)
    # Test s jiným ETF
    test_scrape_one_etf("IE00B3RBWM25")  # Vanguard FTSE All-World