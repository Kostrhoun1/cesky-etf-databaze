#!/usr/bin/env python3
"""
OPRAVA pro ticker extrakci v JustETF scraperu
Přidává robustnější metody pro získávání ticker informací
"""

import re
import requests
from bs4 import BeautifulSoup

def _extract_stock_exchange_data_improved(self, soup: BeautifulSoup, etf):
    """VYLEPŠENÁ extrakce stock exchange dat s lepším ticker searchem"""
    print(f"DEBUG: Extracting exchange data for {etf.isin}")
    
    # Metoda 1: Hledej různé varianty exchange sekcí
    exchange_section = self._find_exchange_section_improved(soup)
    
    if exchange_section:
        print("DEBUG: Exchange section found, parsing table...")
        self._parse_exchange_table_improved(exchange_section, etf)
    else:
        print("DEBUG: No exchange section found, trying text extraction...")
        self._extract_exchange_from_text_improved(soup, etf)
    
    # Metoda 2: Fallback - hledej ticker v celém textu
    if not etf.primary_ticker:
        print("DEBUG: No primary ticker found, trying regex fallback...")
        self._extract_ticker_from_full_text(soup, etf)
    
    print(f"DEBUG: Final result - Primary: {etf.primary_ticker}, Exchanges: {etf.total_exchanges}")

def _find_exchange_section_improved(self, soup: BeautifulSoup):
    """Najde exchange sekci pomocí různých strategií"""
    
    # Strategie 1: Hledej nadpisy obsahující exchange/listing/trading
    exchange_keywords = [
        'stock exchange', 'exchanges', 'listing', 'listings', 
        'trading', 'where to buy', 'available on', 'traded on'
    ]
    
    for keyword in exchange_keywords:
        # Hledej nadpisy
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5'], 
                                string=re.compile(rf'{keyword}', re.I))
        
        for heading in headings:
            # Najdi parent sekci
            section = heading.find_parent(['section', 'div', 'article'])
            if section and section.find('table'):
                return section
            
            # Nebo najdi následující sekci s tabulkou
            next_sibling = heading.find_next_sibling()
            while next_sibling:
                if next_sibling.name in ['section', 'div'] and next_sibling.find('table'):
                    return next_sibling
                next_sibling = next_sibling.find_next_sibling()
    
    # Strategie 2: Hledej tabulky s exchange sloupci
    tables = soup.find_all('table')
    for table in tables:
        headers = table.find_all(['th', 'td'])
        header_text = ' '.join([h.get_text().lower() for h in headers[:5]])  # První 5 buněk
        
        if any(keyword in header_text for keyword in ['exchange', 'listing', 'ticker', 'symbol']):
            return table.find_parent(['section', 'div']) or table
    
    # Strategie 3: Hledej podle CSS class/id
    exchange_containers = soup.find_all(['div', 'section'], 
                                      attrs={'class': re.compile(r'exchange|listing|trading', re.I)})
    for container in exchange_containers:
        if container.find('table'):
            return container
    
    return None

def _parse_exchange_table_improved(self, section: BeautifulSoup, etf):
    """VYLEPŠENÉ parsování tabulky s exchange daty"""
    table = section if section.name == 'table' else section.find('table')
    
    if not table:
        print("DEBUG: No table found in exchange section")
        return
    
    rows = table.find_all('tr')
    if len(rows) < 2:  # Musí mít alespoň header + 1 data row
        print("DEBUG: Table has insufficient rows")
        return
    
    # Identifikuj sloupce
    header_row = rows[0]
    headers = [th.get_text().strip().lower() for th in header_row.find_all(['th', 'td'])]
    
    print(f"DEBUG: Table headers: {headers}")
    
    col_mapping = {}
    for i, header in enumerate(headers):
        # Více variant pro ticker
        if any(keyword in header for keyword in ['ticker', 'symbol', 'code', 'trading symbol']):
            col_mapping['ticker'] = i
        elif any(keyword in header for keyword in ['exchange', 'market', 'listing']):
            col_mapping['exchange'] = i
        elif any(keyword in header for keyword in ['currency', 'curr']):
            col_mapping['currency'] = i
        elif any(keyword in header for keyword in ['bloomberg', 'bbg']):
            col_mapping['bloomberg'] = i
        elif any(keyword in header for keyword in ['reuters', 'ric']):
            col_mapping['reuters'] = i
    
    print(f"DEBUG: Column mapping: {col_mapping}")
    
    # Parsuj data řádky
    for row_idx, row in enumerate(rows[1:], 1):
        cells = row.find_all(['td', 'th'])
        if len(cells) < 2:
            continue
        
        listing = ExchangeListing()
        
        # Extract data podle mappingu
        if 'exchange' in col_mapping and col_mapping['exchange'] < len(cells):
            listing.exchange_name = cells[col_mapping['exchange']].get_text().strip()
        
        if 'currency' in col_mapping and col_mapping['currency'] < len(cells):
            listing.trade_currency = cells[col_mapping['currency']].get_text().strip()
        
        if 'ticker' in col_mapping and col_mapping['ticker'] < len(cells):
            ticker_text = cells[col_mapping['ticker']].get_text().strip()
            # Čištění ticker textu
            ticker_clean = re.sub(r'[^\w.-]', '', ticker_text).upper()
            if ticker_clean and len(ticker_clean) >= 2:
                listing.ticker = ticker_clean
        
        if 'bloomberg' in col_mapping and col_mapping['bloomberg'] < len(cells):
            bloomberg_raw = cells[col_mapping['bloomberg']].get_text().strip()
            if bloomberg_raw and bloomberg_raw not in ['--', '-', 'N/A']:
                listing.bloomberg_code = bloomberg_raw
        
        if 'reuters' in col_mapping and col_mapping['reuters'] < len(cells):
            reuters_raw = cells[col_mapping['reuters']].get_text().strip()
            if reuters_raw and reuters_raw not in ['--', '-', 'N/A']:
                listing.reuters_code = reuters_raw
        
        # Validace a přidání
        if listing.exchange_name and len(listing.exchange_name) > 1:
            etf.add_exchange_listing(listing)
            print(f"DEBUG: Added listing - Exchange: {listing.exchange_name}, Ticker: {listing.ticker}")

def _extract_ticker_from_full_text(self, soup: BeautifulSoup, etf):
    """Fallback extrakce ticker z celého textu pomocí regex"""
    text = soup.get_text()
    
    # Regex patterns pro ticker hledání
    ticker_patterns = [
        # Pattern 1: "Ticker: XXXX" nebo "Symbol: XXXX"
        r'(?:ticker|symbol|trading symbol)[:\s]+([A-Z0-9]{2,8})',
        
        # Pattern 2: V závorkách za názvem ETF
        r'\(([A-Z0-9]{2,8})\)',
        
        # Pattern 3: "Available as XXXX on..."
        r'(?:available as|traded as)[:\s]+([A-Z0-9]{2,8})',
        
        # Pattern 4: "XXXX shares" (pro akciové ETF)
        r'([A-Z0-9]{2,8})\s+shares',
        
        # Pattern 5: "Quote XXXX"
        r'quote[:\s]+([A-Z0-9]{2,8})',
        
        # Pattern 6: "ISIN: XXX, Ticker: XXXX"
        rf'{re.escape(etf.isin)}[^a-zA-Z0-9]*(?:ticker|symbol)[:\s]*([A-Z0-9]{{2,8}})'
    ]
    
    for i, pattern in enumerate(ticker_patterns, 1):
        matches = re.findall(pattern, text, re.I)
        for match in matches:
            ticker_candidate = match.upper().strip()
            
            # Validace ticker kandidáta
            if self._is_valid_ticker(ticker_candidate, etf):
                if not etf.primary_ticker:
                    etf.primary_ticker = ticker_candidate
                    etf.primary_exchange = f"Extracted (method {i})"
                    print(f"DEBUG: Found ticker '{ticker_candidate}' using pattern {i}")
                    return

def _is_valid_ticker(self, ticker: str, etf) -> bool:
    """Validuje, zda je ticker kandidát platný"""
    if not ticker or len(ticker) < 2 or len(ticker) > 8:
        return False
    
    # Vyloučí ISIN (12 znaků)
    if len(ticker) == 12:
        return False
    
    # Vyloučí common false positives
    false_positives = [
        'EUR', 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK',  # měny
        'ETF', 'UCITS', 'ACC', 'DIST', 'DIV',             # ETF related
        'FUND', 'INDEX', 'MSCI', 'FTSE',                  # fund related
        'HTML', 'HTTP', 'HTTPS', 'WWW',                   # web related
        'PDF', 'CSV', 'JSON', 'XML'                       # file types
    ]
    
    if ticker in false_positives:
        return False
    
    # Ticker by měl obsahovat alespoň jedno písmeno
    if not re.search(r'[A-Z]', ticker):
        return False
    
    return True

def _extract_exchange_from_text_improved(self, soup: BeautifulSoup, etf):
    """VYLEPŠENÁ fallback extrakce exchange dat z textu"""
    text = soup.get_text()
    
    # Rozšířený seznam burz s jejich typickými tickery
    exchange_info = {
        'London Stock Exchange': {'currency': 'GBP', 'aliases': ['LSE', 'London']},
        'Frankfurt Stock Exchange': {'currency': 'EUR', 'aliases': ['Frankfurt', 'FSE']},
        'Stuttgart Stock Exchange': {'currency': 'EUR', 'aliases': ['Stuttgart']},
        'Euronext Amsterdam': {'currency': 'EUR', 'aliases': ['Amsterdam', 'Euronext']},
        'Six Swiss Exchange': {'currency': 'CHF', 'aliases': ['Swiss', 'SIX']},
        'XETRA': {'currency': 'EUR', 'aliases': ['Xetra']},
        'Borsa Italiana': {'currency': 'EUR', 'aliases': ['Milan', 'Milano']},
        'gettex': {'currency': 'EUR', 'aliases': ['Gettex']},
        'Tradegate': {'currency': 'EUR', 'aliases': ['Tradegate']},
        'NYSE': {'currency': 'USD', 'aliases': ['New York']},
        'NASDAQ': {'currency': 'USD', 'aliases': ['Nasdaq']},
        'Euronext Paris': {'currency': 'EUR', 'aliases': ['Paris']}
    }
    
    found_exchanges = []
    
    for exchange, info in exchange_info.items():
        # Hledej exchange + možné ticker patterns
        exchange_patterns = [exchange] + info['aliases']
        
        for pattern in exchange_patterns:
            if pattern.lower() in text.lower():
                listing = ExchangeListing()
                listing.exchange_name = exchange
                listing.trade_currency = info['currency']
                
                # Pokus se najít ticker poblíž názvu burzy
                exchange_context = self._extract_context_around_exchange(text, pattern)
                ticker_candidate = self._find_ticker_in_context(exchange_context)
                
                if ticker_candidate:
                    listing.ticker = ticker_candidate
                
                found_exchanges.append(listing)
                break
    
    # Přidej nalezené exchanges
    for listing in found_exchanges:
        etf.add_exchange_listing(listing)
        print(f"DEBUG: Added fallback exchange - {listing.exchange_name}: {listing.ticker}")

def _extract_context_around_exchange(self, text: str, exchange_name: str) -> str:
    """Extrahuje kontext kolem názvu burzy (±100 znaků)"""
    pattern = re.compile(re.escape(exchange_name), re.I)
    match = pattern.search(text)
    
    if match:
        start = max(0, match.start() - 100)
        end = min(len(text), match.end() + 100)
        return text[start:end]
    
    return ""

def _find_ticker_in_context(self, context: str) -> str:
    """Najde ticker v kontextu kolem burzy"""
    # Hledej pattern "TICKER on EXCHANGE" nebo "EXCHANGE: TICKER"
    ticker_patterns = [
        r'([A-Z0-9]{2,8})\s+(?:on|at)\s+',  # "VWCE on London"
        r':\s*([A-Z0-9]{2,8})',              # "London: VWCE"
        r'\(([A-Z0-9]{2,8})\)',              # "(VWCE)"
        r'([A-Z0-9]{2,8})\s*-\s*',           # "VWCE - "
    ]
    
    for pattern in ticker_patterns:
        matches = re.findall(pattern, context, re.I)
        for match in matches:
            ticker = match.upper().strip()
            if self._is_valid_ticker(ticker, None):
                return ticker
    
    return None

# NÁVOD PRO INTEGRACI:
"""
Chcete-li opravit ticker extrakci, nahraďte tyto metody v původním scriptu:

1. _extract_stock_exchange_data (řádek 1026) → _extract_stock_exchange_data_improved
2. _parse_exchange_table (řádek 1045) → _parse_exchange_table_improved  
3. _extract_exchange_from_text (řádek 1102) → _extract_exchange_from_text_improved

A přidejte nové metody:
- _find_exchange_section_improved
- _extract_ticker_from_full_text
- _is_valid_ticker
- _extract_context_around_exchange
- _find_ticker_in_context
"""