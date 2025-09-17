#!/usr/bin/env python3
"""
ROBUSTNĚJŠÍ test script pro ticker extrakci s vylepšenou validací
"""

import requests
from bs4 import BeautifulSoup
import re
import time

def test_robust_ticker_extraction(isin: str):
    """Robustnější test ticker extrakce"""
    url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
    
    print(f"🔍 Testing ticker extraction for ISIN: {isin}")
    print(f"URL: {url}")
    print("-" * 60)
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extrahuj název ETF
        name = extract_etf_name(soup)
        print(f"📋 ETF Name: {name}")
        print()
        
        # Všechny kandidáti na ticker
        all_candidates = []
        
        # Metoda 1: Robustnější table parsing
        table_candidates = find_tickers_in_tables_robust(soup)
        for candidate in table_candidates:
            all_candidates.append(('table', candidate['ticker'], candidate['confidence'], candidate['context']))
        
        # Metoda 2: Vylepšené regex patterns
        regex_candidates = find_tickers_with_improved_regex(soup, isin)
        for candidate in regex_candidates:
            all_candidates.append(('regex', candidate['ticker'], candidate['confidence'], candidate['context']))
        
        # Metoda 3: Exchange context s lepší validací
        exchange_candidates = find_tickers_in_exchange_context_robust(soup)
        for candidate in exchange_candidates:
            all_candidates.append(('exchange', candidate['ticker'], candidate['confidence'], candidate['context']))
        
        # Metoda 4: Structured data mining
        structured_candidates = find_tickers_in_structured_data(soup)
        for candidate in structured_candidates:
            all_candidates.append(('structured', candidate['ticker'], candidate['confidence'], candidate['context']))
        
        # Vyhodnocení a ranking
        ranked_candidates = rank_ticker_candidates(all_candidates, name)
        
        # Výsledky
        print("📊 VŠICHNI KANDIDÁTI (seřazeni dle důvěryhodnosti):")
        print("=" * 70)
        print(f"{'METHOD':<12} | {'TICKER':<8} | {'CONF':<4} | {'CONTEXT':<30}")
        print("-" * 70)
        
        for method, ticker, confidence, context in ranked_candidates:
            print(f"{method:<12} | {ticker:<8} | {confidence:<4} | {context[:30]:<30}")
        
        # Nejlepší kandidát
        if ranked_candidates:
            best_ticker = ranked_candidates[0][1]
            best_confidence = ranked_candidates[0][2]
            print(f"\n🎯 NEJLEPŠÍ TICKER: {best_ticker} (confidence: {best_confidence}/10)")
            
            # Validace s expected tickery
            expected = get_expected_ticker(isin)
            if expected:
                if best_ticker == expected:
                    print(f"✅ SPRÁVNĚ! Očekávaný ticker: {expected}")
                else:
                    print(f"❌ CHYBA! Očekávaný ticker: {expected}, nalezen: {best_ticker}")
            
            return best_ticker
        else:
            print(f"\n❌ ŽÁDNÝ VALIDNÍ TICKER NENALEZEN")
            return None
        
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return None

def extract_etf_name(soup):
    """Extrahuje název ETF"""
    # Zkus různé selektory
    selectors = ['h1', '.etf-name', '[data-field="name"]', '.fund-name']
    
    for selector in selectors:
        element = soup.select_one(selector)
        if element and element.get_text().strip():
            return element.get_text().strip()
    
    # Fallback - z title
    title = soup.find('title')
    if title:
        title_text = title.get_text()
        if " | " in title_text:
            return title_text.split(" | ")[0].strip()
        return title_text.strip()
    
    return "Unknown ETF"

def find_tickers_in_tables_robust(soup):
    """Robustnější hledání v tabulkách s lepší column detection"""
    candidates = []
    tables = soup.find_all('table')
    
    for table_idx, table in enumerate(tables):
        rows = table.find_all('tr')
        if len(rows) < 2:
            continue
        
        # Analyzuj header row
        header_row = rows[0]
        headers = [th.get_text().strip().lower() for th in header_row.find_all(['th', 'td'])]
        
        print(f"🔍 Table {table_idx + 1} headers: {headers}")
        
        # Najdi column indices
        ticker_cols = []
        currency_cols = []
        exchange_cols = []
        
        for i, header in enumerate(headers):
            if any(keyword in header for keyword in ['ticker', 'symbol', 'code']) and 'currency' not in header:
                ticker_cols.append(i)
            elif any(keyword in header for keyword in ['currency', 'curr']):
                currency_cols.append(i)
            elif any(keyword in header for keyword in ['exchange', 'market', 'listing']):
                exchange_cols.append(i)
        
        print(f"   Ticker columns: {ticker_cols}, Currency columns: {currency_cols}")
        
        # Parsuj data rows
        for row_idx, row in enumerate(rows[1:], 1):
            cells = row.find_all(['td', 'th'])
            
            # Pro každý ticker column
            for ticker_col in ticker_cols:
                if ticker_col < len(cells):
                    cell_text = cells[ticker_col].get_text().strip()
                    
                    # Vyčisti a validuj ticker
                    ticker_clean = clean_ticker_text(cell_text)
                    if ticker_clean and is_robust_ticker(ticker_clean):
                        
                        # Určuj kontext
                        exchange_info = ""
                        if exchange_cols and exchange_cols[0] < len(cells):
                            exchange_info = cells[exchange_cols[0]].get_text().strip()
                        
                        context = f"Table{table_idx+1} Row{row_idx} {exchange_info}".strip()
                        
                        # Confidence scoring
                        confidence = calculate_ticker_confidence(ticker_clean, cell_text, headers[ticker_col], context)
                        
                        candidates.append({
                            'ticker': ticker_clean,
                            'confidence': confidence,
                            'context': context
                        })
                        
                        print(f"   Found ticker candidate: {ticker_clean} (conf: {confidence}) in {context}")
    
    return candidates

def find_tickers_with_improved_regex(soup, isin):
    """Vylepšené regex patterns s kontextovou validací"""
    candidates = []
    text = soup.get_text()
    
    # Vylepšené patterns s kontextem
    patterns = [
        # Pattern 1: Explicit ticker/symbol labels
        (r'(?:ticker|symbol|trading symbol)[:\s]*([A-Z0-9]{2,8})(?!\d)', 'explicit_label', 9),
        
        # Pattern 2: V závorce za názvem ETF (ale ne ISIN)
        (r'\(([A-Z]{2,6}[0-9]?)\)(?!\d{6})', 'parentheses', 7),
        
        # Pattern 3: "Available as TICKER on..."
        (r'(?:available as|traded as|listed as)[:\s]*([A-Z0-9]{2,8})', 'availability', 8),
        
        # Pattern 4: "ISIN: XXX, Ticker: YYYY"
        (rf'{re.escape(isin)}[^a-zA-Z0-9]*(?:ticker|symbol)[:\s]*([A-Z0-9]{{2,8}})', 'isin_context', 10),
        
        # Pattern 5: Exchange context "TICKER on EXCHANGE"
        (r'([A-Z0-9]{2,8})\s+(?:on|at)\s+(?:London|Frankfurt|XETRA|Euronext)', 'exchange_context', 8),
        
        # Pattern 6: Bloomberg/Reuters codes (lower confidence)
        (r'bloomberg[:\s]*([A-Z0-9]{2,8})', 'bloomberg', 5),
        (r'reuters[:\s]*([A-Z0-9]{2,8})', 'reuters', 5),
    ]
    
    for pattern, pattern_name, base_confidence in patterns:
        matches = re.finditer(pattern, text, re.I)
        for match in matches:
            ticker_candidate = match.group(1).upper().strip()
            
            if is_robust_ticker(ticker_candidate):
                # Extrahuj kontext kolem match
                start = max(0, match.start() - 50)
                end = min(len(text), match.end() + 50)
                context = text[start:end].replace('\n', ' ')
                
                # Upravuj confidence na základě kontextu
                confidence = adjust_confidence_by_context(base_confidence, context, ticker_candidate)
                
                candidates.append({
                    'ticker': ticker_candidate,
                    'confidence': confidence,
                    'context': f"{pattern_name}: {context[:30]}"
                })
                
                print(f"   Regex found: {ticker_candidate} via {pattern_name} (conf: {confidence})")
    
    return candidates

def find_tickers_in_exchange_context_robust(soup):
    """Robustnější hledání v kontextu burz"""
    candidates = []
    text = soup.get_text()
    
    # Rozšířený seznam burz s aliases
    exchanges = {
        'London Stock Exchange': ['LSE', 'London'],
        'Frankfurt Stock Exchange': ['Frankfurt', 'FSE'],
        'XETRA': ['Xetra'],
        'Stuttgart Stock Exchange': ['Stuttgart'],
        'Euronext Amsterdam': ['Amsterdam', 'Euronext'],
        'Six Swiss Exchange': ['Swiss', 'SIX'],
        'Borsa Italiana': ['Milan', 'Milano'],
        'gettex': ['Gettex'],
        'Tradegate': ['Tradegate'],
        'NYSE': ['New York'],
        'NASDAQ': ['Nasdaq'],
    }
    
    for exchange, aliases in exchanges.items():
        all_names = [exchange] + aliases
        
        for name in all_names:
            if name.lower() in text.lower():
                # Najdi kontext kolem burzy
                context = extract_context_around_text(text, name, 100)
                
                # Hledej ticker patterns v kontextu
                ticker_patterns = [
                    r'([A-Z0-9]{2,8})\s+(?:on|at)\s+' + re.escape(name),
                    re.escape(name) + r'[:\s]*([A-Z0-9]{2,8})',
                    r'\(([A-Z0-9]{2,8})\)[^a-zA-Z0-9]*' + re.escape(name),
                ]
                
                for pattern in ticker_patterns:
                    matches = re.findall(pattern, context, re.I)
                    for match in matches:
                        ticker = match.upper().strip()
                        if is_robust_ticker(ticker):
                            confidence = 6  # Střední confidence pro exchange context
                            candidates.append({
                                'ticker': ticker,
                                'confidence': confidence,
                                'context': f"{name}: {context[:30]}"
                            })
                            print(f"   Exchange context: {ticker} near {name}")
    
    return candidates

def find_tickers_in_structured_data(soup):
    """Hledání v strukturovaných datech (JSON-LD, meta tags)"""
    candidates = []
    
    # JSON-LD structured data
    scripts = soup.find_all('script', type='application/ld+json')
    for script in scripts:
        try:
            import json
            data = json.loads(script.string)
            ticker = extract_ticker_from_json_recursive(data)
            if ticker and is_robust_ticker(ticker):
                candidates.append({
                    'ticker': ticker.upper(),
                    'confidence': 7,
                    'context': 'JSON-LD structured data'
                })
                print(f"   Structured data: {ticker}")
        except:
            continue
    
    # Meta tags
    meta_tags = soup.find_all('meta')
    for meta in meta_tags:
        content = meta.get('content', '')
        name = meta.get('name', '')
        
        if any(keyword in name.lower() for keyword in ['ticker', 'symbol']) and content:
            ticker_match = re.search(r'\b([A-Z0-9]{2,8})\b', content)
            if ticker_match and is_robust_ticker(ticker_match.group(1)):
                candidates.append({
                    'ticker': ticker_match.group(1).upper(),
                    'confidence': 6,
                    'context': f'Meta tag: {name}'
                })
                print(f"   Meta tag: {ticker_match.group(1)} from {name}")
    
    return candidates

def clean_ticker_text(text):
    """Vyčistí ticker text"""
    if not text:
        return ""
    
    # Odstraň whitespace a speciální znaky
    cleaned = re.sub(r'[^\w.-]', '', text).upper()
    
    # Odstraň trailing numbers pokud nejsou součástí ticker
    # (ale zachovej čísla jako součást ticker - např. SPY5)
    return cleaned

def is_robust_ticker(ticker):
    """Robustnější validace ticker"""
    if not ticker or len(ticker) < 2 or len(ticker) > 8:
        return False
    
    # Rozšířený seznam false positives
    false_positives = {
        # Měny
        'EUR', 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF',
        'JPY', 'AUD', 'CAD', 'NZD', 'SGD', 'HKD', 'CNY', 'INR', 'BRL', 'MXN',
        'GBX', 'USX', 'EUX',  # Currency codes variants
        
        # ETF/Fund related
        'ETF', 'UCITS', 'ACC', 'DIST', 'DIV', 'FUND', 'INDEX', 'MSCI', 'FTSE',
        'ETC', 'ETN', 'ETP', 'SICAV', 'OEIC', 'UNIT', 'SHARE', 'SHARES',
        
        # Market/Exchange related
        'NYSE', 'LSE', 'FSE', 'XETRA', 'NASDAQ', 'AMEX',
        
        # Common words  
        'THE', 'AND', 'FOR', 'WITH', 'FROM', 'INTO', 'UPON', 'OVER',
        'UNDER', 'ABOVE', 'BELOW', 'BETWEEN', 'AMONG', 'THROUGH',
        'OF', 'TO', 'IN', 'ON', 'AT', 'BY', 'AS', 'IS', 'ARE', 'BE',
        
        # Technical/Web related
        'HTML', 'HTTP', 'HTTPS', 'WWW', 'PDF', 'CSV', 'JSON', 'XML',
        'API', 'URL', 'URI', 'CSS', 'JS',
        
        # Time/Date related
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
        'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',
        
        # Measurements
        'KG', 'LB', 'OZ', 'GM', 'ML', 'LT', 'GAL', 'FT', 'IN', 'CM', 'MM',
        
        # Generic codes
        'CODE', 'ID', 'REF', 'NUM', 'NO', 'NR', 'QTY', 'AMT', 'PCT', 'RATE'
    }
    
    if ticker in false_positives:
        return False
    
    # Musí obsahovat alespoň jedno písmeno
    if not re.search(r'[A-Z]', ticker):
        return False
    
    # Nesmí být pouze čísla
    if ticker.isdigit():
        return False
    
    # ISIN check (12 characters)
    if len(ticker) == 12 and re.match(r'^[A-Z]{2}[A-Z0-9]{10}$', ticker):
        return False
    
    return True

def calculate_ticker_confidence(ticker, original_text, column_header, context):
    """Vypočítá confidence score pro ticker"""
    confidence = 5  # Base confidence
    
    # Bonus za explicitní ticker column
    if any(keyword in column_header.lower() for keyword in ['ticker', 'symbol']):
        confidence += 3
    
    # Bonus za kratší ticker (typicky jsou kratší)
    if len(ticker) <= 4:
        confidence += 1
    
    # Malus za dlouhý ticker
    if len(ticker) > 6:
        confidence -= 1
    
    # Bonus za alfanumerický mix
    if re.search(r'[A-Z]', ticker) and re.search(r'[0-9]', ticker):
        confidence += 1
    
    # Malus pokud obsahuje pouze čísla na konci (může být currency code)
    if re.search(r'\d{2,}$', ticker):
        confidence -= 2
    
    # Bonus za známé ticker patterns
    if re.match(r'^[A-Z]{3,5}[0-9]?$', ticker):  # Typický ETF ticker pattern
        confidence += 2
    
    return min(10, max(1, confidence))

def adjust_confidence_by_context(base_confidence, context, ticker):
    """Upraví confidence na základě kontextu"""
    confidence = base_confidence
    
    context_lower = context.lower()
    
    # Bonus za kontext s "ticker", "symbol"
    if any(word in context_lower for word in ['ticker', 'symbol', 'trading symbol']):
        confidence += 2
    
    # Malus za kontext s "currency", "price"
    if any(word in context_lower for word in ['currency', 'price', 'cost', 'fee']):
        confidence -= 2
    
    # Bonus za exchange names v kontextu
    exchanges = ['london', 'frankfurt', 'xetra', 'euronext', 'swiss']
    if any(exchange in context_lower for exchange in exchanges):
        confidence += 1
    
    # Malus pokud je ticker ve špatném kontextu
    bad_contexts = ['email', 'phone', 'address', 'website', 'url']
    if any(bad in context_lower for bad in bad_contexts):
        confidence -= 3
    
    return min(10, max(1, confidence))

def rank_ticker_candidates(candidates, etf_name):
    """Seřadí kandidáty podle důvěryhodnosti"""
    # Odstranění duplicit se zachováním nejlepšího confidence
    unique_candidates = {}
    for method, ticker, confidence, context in candidates:
        if ticker not in unique_candidates or confidence > unique_candidates[ticker][1]:
            unique_candidates[ticker] = (method, confidence, context)
    
    # Převod zpět na list s přidáním name-based bonusu
    final_candidates = []
    for ticker, (method, confidence, context) in unique_candidates.items():
        # Bonus pokud ticker souvisí s názvem ETF
        name_bonus = 0
        if etf_name and ticker in etf_name:
            name_bonus = 1
        
        final_confidence = min(10, confidence + name_bonus)
        final_candidates.append((method, ticker, final_confidence, context))
    
    # Seřazení podle confidence (desc) a pak podle délky ticker (asc)
    return sorted(final_candidates, key=lambda x: (-x[2], len(x[1])))

def extract_context_around_text(text, search_term, context_size):
    """Extrahuje kontext kolem hledaného textu"""
    pattern = re.compile(re.escape(search_term), re.I)
    match = pattern.search(text)
    
    if match:
        start = max(0, match.start() - context_size)
        end = min(len(text), match.end() + context_size)
        return text[start:end].replace('\n', ' ')
    
    return ""

def extract_ticker_from_json_recursive(data, path=""):
    """Rekurzivně hledá ticker v JSON datech"""
    if isinstance(data, dict):
        for key, value in data.items():
            # Prioritní klíče pro ticker
            if key.lower() in ['ticker', 'symbol', 'tradingsymbol', 'code']:
                if isinstance(value, str) and is_robust_ticker(value):
                    return value.upper()
            
            result = extract_ticker_from_json_recursive(value, f"{path}.{key}")
            if result:
                return result
    
    elif isinstance(data, list):
        for i, item in enumerate(data):
            result = extract_ticker_from_json_recursive(item, f"{path}[{i}]")
            if result:
                return result
    
    return None

def get_expected_ticker(isin):
    """Vrátí očekávaný ticker pro známé ISIN"""
    expected_mapping = {
        "IE00B6YX5C33": "SPY5",   # SPDR S&P 500 (Dist)
        "IE00BK5BQT80": "VWCE",   # Vanguard FTSE All-World
        "IE00B4L5Y983": "IWDA",   # iShares Core MSCI World  
        "IE00B5BMR087": "CSPX",   # iShares Core S&P 500
    }
    return expected_mapping.get(isin)

def main():
    """Robustní test na známých ETF"""
    test_isins = [
        "IE00B6YX5C33",  # SPDR S&P 500 (očekáváno: SPY5)
        "IE00BK5BQT80",  # Vanguard All-World (očekáváno: VWCE)
        "IE00B4L5Y983",  # iShares MSCI World (očekáváno: IWDA)
        "IE00B5BMR087",  # iShares S&P 500 (očekáváno: CSPX)
    ]
    
    print("🚀 ROBUSTNÍ TESTING TICKER EXTRACTION")
    print("=" * 70)
    
    results = {}
    correct_count = 0
    
    for i, isin in enumerate(test_isins):
        print(f"\n{'='*70}")
        print(f"TEST {i+1}/{len(test_isins)}")
        ticker = test_robust_ticker_extraction(isin)
        results[isin] = ticker
        
        expected = get_expected_ticker(isin)
        if expected and ticker == expected:
            correct_count += 1
        
        print(f"{'='*70}")
        
        # Delay mezi requesty
        if i < len(test_isins) - 1:
            time.sleep(2)
    
    print(f"\n📊 FINÁLNÍ VÝSLEDKY:")
    print("=" * 50)
    for isin, ticker in results.items():
        expected = get_expected_ticker(isin)
        status = "✅" if ticker == expected else "❌"
        print(f"{status} {isin}: {ticker or 'NOT FOUND'} (expected: {expected})")
    
    print(f"\n🎯 ÚSPĚŠNOST: {correct_count}/{len(test_isins)} ({correct_count/len(test_isins)*100:.1f}%)")

if __name__ == "__main__":
    main()