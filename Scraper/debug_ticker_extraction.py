#!/usr/bin/env python3
"""
Debug ticker extraction ze scraped HTML
"""

from bs4 import BeautifulSoup

# Načti HTML soubor, který jsme předtím uložili
def debug_ticker_extraction():
    try:
        with open('cspx_debug.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        print("DEBUG: Ticker extraction from CSPX HTML")
        print("=" * 60)
        
        # Najdi tabulky
        tables = soup.find_all('table')
        print(f"Found {len(tables)} tables")
        
        for i, table in enumerate(tables):
            rows = table.find_all('tr')
            if len(rows) < 2:
                continue
            
            # Zkontroluj header
            header_row = rows[0]
            headers = [th.get_text().strip() for th in header_row.find_all(['th', 'td'])]
            
            print(f"\nTable {i}:")
            print(f"Headers: {headers}")
            
            # Zkontroluj, zda obsahuje exchange/ticker info
            has_exchange_info = any(
                keyword in ' '.join(headers).lower() 
                for keyword in ['listing', 'exchange', 'ticker', 'trade', 'currency']
            )
            
            if has_exchange_info:
                print("✅ This looks like exchange table!")
                
                # Print first few data rows
                for j, row in enumerate(rows[1:6]):  # First 5 data rows
                    cells = [td.get_text().strip() for td in row.find_all(['td', 'th'])]
                    print(f"  Row {j+1}: {cells}")
                
                # Pokusí se najít ticker sloupec
                print(f"\nAnalyzing header mapping:")
                for idx, header in enumerate(headers):
                    print(f"  Column {idx}: '{header}'")
                    if 'ticker' in header.lower():
                        print(f"    ✅ TICKER COLUMN!")
                    elif 'listing' in header.lower() or 'exchange' in header.lower():
                        print(f"    ✅ EXCHANGE COLUMN!")
                    elif 'currency' in header.lower():
                        print(f"    ✅ CURRENCY COLUMN!")
            
        # Pokus o alternatívní hledání tickerů v textu
        print(f"\n" + "="*60)
        print("ALTERNATIVE: Searching for CSPX in all table cells")
        
        all_cells = soup.find_all(['td', 'th'])
        cspx_cells = [cell for cell in all_cells if 'CSPX' in cell.get_text().upper()]
        
        print(f"Found {len(cspx_cells)} cells containing CSPX:")
        for cell in cspx_cells:
            print(f"  - '{cell.get_text().strip()}'")
            # Get parent row context
            parent_row = cell.find_parent('tr')
            if parent_row:
                row_cells = [td.get_text().strip() for td in parent_row.find_all(['td', 'th'])]
                print(f"    Row context: {row_cells}")
        
    except FileNotFoundError:
        print("Error: cspx_debug.html not found. Run test_cspx_extraction.py first.")

if __name__ == "__main__":
    debug_ticker_extraction()