#!/usr/bin/env python3
"""
TEST A OPRAVA - Performance extrakce
"""

import requests
from bs4 import BeautifulSoup
import re

def test_performance_extraction_fixed(isin: str):
    """Test nové, opravené performance extrakce"""
    url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers, timeout=30)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    print(f"🔍 TESTING ETF: {isin}")
    print("="*60)
    
    # Najdi performance tabulku (ta správná)
    perf_table = None
    tables = soup.find_all('table', class_='table etf-data-table')
    
    for table in tables:
        text = table.get_text()
        if '1 month' in text and '3 months' in text and 'YTD' in text:
            perf_table = table
            break
    
    if not perf_table:
        print("❌ Performance tabulka nebyla nalezena")
        return {}
    
    print("✅ Performance tabulka nalezena!")
    
    # Nové, přesnější regex patterny
    results = {}
    
    # Extrakce pomocí tabulkové struktury
    rows = perf_table.find_all('tr')
    for row in rows:
        label_cell = row.find('td', class_='vallabel')
        value_cell = row.find('td', class_=['val', 'val green', 'val red'])
        
        if label_cell and value_cell:
            label = label_cell.get_text(strip=True).lower()
            value_text = value_cell.get_text(strip=True)
            
            # Extraktuj číslo z hodnoty
            value_match = re.search(r'([+-]?\d+[.,]\d+)', value_text)
            if value_match:
                value = float(value_match.group(1).replace(',', '.'))
                
                # Mapování labelů na pole
                if '1 month' in label:
                    results['return_1m'] = value
                    print(f"  ✅ return_1m: {value}% (z '{label}' -> '{value_text}')")
                elif '3 months' in label:
                    results['return_3m'] = value
                    print(f"  ✅ return_3m: {value}% (z '{label}' -> '{value_text}')")
                elif '6 months' in label:
                    results['return_6m'] = value
                    print(f"  ✅ return_6m: {value}% (z '{label}' -> '{value_text}')")
                elif label == '2021':
                    results['return_2021'] = value
                    print(f"  ✅ return_2021: {value}% (z '{label}' -> '{value_text}')")
                elif label == '2022':
                    results['return_2022'] = value
                    print(f"  ✅ return_2022: {value}% (z '{label}' -> '{value_text}')")
                elif label == '2023':
                    results['return_2023'] = value
                    print(f"  ✅ return_2023: {value}% (z '{label}' -> '{value_text}')")
                elif label == '2024':
                    results['return_2024'] = value
                    print(f"  ✅ return_2024: {value}% (z '{label}' -> '{value_text}')")
                elif 'since inception' in label or label == 'max':
                    results['return_inception'] = value
                    print(f"  ✅ return_inception: {value}% (z '{label}' -> '{value_text}')")
    
    print(f"\n📊 VÝSLEDKY:")
    for field, value in results.items():
        print(f"  {field}: {value}")
    
    missing = []
    expected_fields = ['return_1m', 'return_3m', 'return_6m', 'return_2021', 'return_2022', 'return_2023', 'return_2024']
    for field in expected_fields:
        if field not in results:
            missing.append(field)
    
    if missing:
        print(f"\n❌ CHYBĚJÍCÍ POLE: {missing}")
    else:
        print(f"\n✅ VŠECHNA POLE NALEZENA!")
    
    return results

def generate_fixed_extraction_code():
    """Generuje opravený kód pro final_scraper.py"""
    code = '''
def _extract_performance_robust_FIXED(self, soup: BeautifulSoup, etf: ETFDataComplete):
    """OPRAVENÁ extrakce performance dat - používá tabulkovou strukturu"""
    
    # Najdi performance tabulku
    perf_table = None
    tables = soup.find_all('table', class_='table etf-data-table')
    
    for table in tables:
        text = table.get_text()
        if '1 month' in text and '3 months' in text and 'YTD' in text:
            perf_table = table
            break
    
    if not perf_table:
        safe_log("warning", f"Performance tabulka nenalezena pro {etf.isin}")
        return
    
    # Extrakce pomocí tabulkové struktury
    rows = perf_table.find_all('tr')
    for row in rows:
        label_cell = row.find('td', class_='vallabel')
        value_cell = row.find('td', class_=['val', 'val green', 'val red'])
        
        if label_cell and value_cell:
            label = label_cell.get_text(strip=True).lower()
            value_text = value_cell.get_text(strip=True)
            
            # Extraktuj číslo z hodnoty
            value_match = re.search(r'([+-]?\\d+[.,]\\d+)', value_text)
            if value_match:
                try:
                    value = float(value_match.group(1).replace(',', '.'))
                    
                    # Mapování labelů na pole
                    if '1 month' in label:
                        etf.return_1m = value
                    elif '3 months' in label:
                        etf.return_3m = value
                    elif '6 months' in label:
                        etf.return_6m = value
                    elif label == '2021':
                        etf.return_2021 = value
                    elif label == '2022':
                        etf.return_2022 = value
                    elif label == '2023':
                        etf.return_2023 = value
                    elif label == '2024':
                        etf.return_2024 = value
                    elif 'since inception' in label or label == 'max':
                        etf.return_inception = value
                    elif label == 'ytd':
                        etf.return_ytd = value
                    elif '1 year' in label:
                        etf.return_1y = value
                    elif '3 years' in label:
                        etf.return_3y = value  
                    elif '5 years' in label:
                        etf.return_5y = value
                        
                except ValueError:
                    continue
    '''
    
    print("="*80)
    print("🔧 OPRAVENÝ KÓD PRO final_scraper.py:")
    print("="*80)
    print(code)
    print("="*80)

if __name__ == "__main__":
    # Test na několika ETF
    test_isins = ["IE000IEGVMH6", "IE00B4L5Y983", "IE00B5BMR087"]
    
    for isin in test_isins:
        test_performance_extraction_fixed(isin)
        print("\n" + "="*80 + "\n")
    
    # Generuj opravený kód
    generate_fixed_extraction_code()