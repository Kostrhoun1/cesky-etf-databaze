#!/usr/bin/env python3
"""
Enhanced Performance Scraper pro JustETF
Rozšíření pro kratší výkonnostní období (1M, 3M, 6M) + roční data

NOVÁ FUNKCIONALITA:
- ✅ 1 month, 3 months, 6 months výkonnost
- ✅ Roční výkonnosti (2024, 2023, 2022, 2021)
- ✅ Inception (MAX) výkonnost
- ✅ Aktualizace existujících záznamů v databázi
- ✅ Batch processing s progress tracking

POUŽITÍ:
python enhanced_performance_scraper.py --batch-size 50 --limit 100
"""

import requests
from bs4 import BeautifulSoup
import time
import re
from datetime import datetime
import os
import random
from typing import Dict, Optional
import logging
from supabase import create_client, Client
from dotenv import load_dotenv

# Načtení environment variables
load_dotenv()

# Supabase setup
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_ANON_KEY = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    print("ERROR: Supabase credentials not found in .env file")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('enhanced_performance_scraper.log'),
        logging.StreamHandler()
    ]
)

class EnhancedPerformanceScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
    def extract_performance_data(self, isin: str) -> Dict[str, Optional[float]]:
        """Extrahuje všechna výkonnostní data z JustETF stránky"""
        
        url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            performance_data = {
                'return_1m': None,
                'return_3m': None, 
                'return_6m': None,
                'return_2024': None,
                'return_2023': None,
                'return_2022': None,
                'return_2021': None,
                'return_inception': None
            }
            
            # Najít performance sekci
            performance_section = soup.find('div', {'class': 'fund-performance'}) or \
                                soup.find('section', {'id': 'performance'}) or \
                                soup.find('div', string=re.compile('Performance'))
            
            if not performance_section:
                # Alternativní hledání
                performance_section = soup.find('div', string=re.compile('1 month|3 months|YTD'))
                if performance_section:
                    performance_section = performance_section.find_parent()
            
            if performance_section:
                # Hledat všechny řádky s performance daty
                performance_rows = performance_section.find_all(['tr', 'div', 'li'])
                
                for row in performance_rows:
                    text = row.get_text(strip=True)
                    
                    # Mapování klíčových slov na databázové sloupce
                    mappings = [
                        (r'1\s*month', 'return_1m'),
                        (r'3\s*months', 'return_3m'),
                        (r'6\s*months', 'return_6m'),
                        (r'2024', 'return_2024'),
                        (r'2023', 'return_2023'),
                        (r'2022', 'return_2022'),
                        (r'2021', 'return_2021'),
                        (r'Since\s*inception|MAX', 'return_inception')
                    ]
                    
                    for pattern, column in mappings:
                        if re.search(pattern, text, re.IGNORECASE):
                            # Extrahovat procento
                            percentage_match = re.search(r'([+-]?\d+\.?\d*)%', text)
                            if percentage_match:
                                value = float(percentage_match.group(1))
                                performance_data[column] = value
                                logging.info(f"Found {column}: {value}% for {isin}")
            
            # Alternativní metoda - hledat v tabulkách
            tables = soup.find_all('table')
            for table in tables:
                rows = table.find_all('tr')
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    if len(cells) >= 2:
                        period = cells[0].get_text(strip=True)
                        value_text = cells[1].get_text(strip=True)
                        
                        # Extrahovat hodnotu
                        percentage_match = re.search(r'([+-]?\d+\.?\d*)%', value_text)
                        if percentage_match:
                            value = float(percentage_match.group(1))
                            
                            # Mapování období
                            if re.search(r'1.*month', period, re.IGNORECASE):
                                performance_data['return_1m'] = value
                            elif re.search(r'3.*month', period, re.IGNORECASE):
                                performance_data['return_3m'] = value
                            elif re.search(r'6.*month', period, re.IGNORECASE):
                                performance_data['return_6m'] = value
                            elif '2024' in period:
                                performance_data['return_2024'] = value
                            elif '2023' in period:
                                performance_data['return_2023'] = value
                            elif '2022' in period:
                                performance_data['return_2022'] = value
                            elif '2021' in period:
                                performance_data['return_2021'] = value
                            elif re.search(r'inception|max', period, re.IGNORECASE):
                                performance_data['return_inception'] = value
            
            return performance_data
            
        except Exception as e:
            logging.error(f"Error scraping {isin}: {e}")
            return {}
    
    def update_etf_performance(self, isin: str, performance_data: Dict[str, Optional[float]]) -> bool:
        """Aktualizuje performance data v databázi"""
        
        try:
            # Přidat timestamp
            performance_data['performance_last_updated'] = datetime.now().isoformat()
            
            # Odstranit None hodnoty
            update_data = {k: v for k, v in performance_data.items() if v is not None}
            
            if not update_data:
                logging.warning(f"No performance data to update for {isin}")
                return False
            
            result = supabase.table('etf_funds')\
                .update(update_data)\
                .eq('isin', isin)\
                .execute()
            
            if result.data:
                logging.info(f"Updated {isin} with {len(update_data)} performance fields")
                return True
            else:
                logging.warning(f"No rows updated for {isin}")
                return False
                
        except Exception as e:
            logging.error(f"Database error for {isin}: {e}")
            return False
    
    def get_etfs_to_update(self, limit: int = 100) -> list:
        """Získá seznam ETF pro aktualizaci (preferuje ty bez performance dat)"""
        
        try:
            # Nejprve ETF bez 1M dat
            result = supabase.table('etf_funds')\
                .select('isin, name')\
                .is_('return_1m', 'null')\
                .limit(limit)\
                .execute()
            
            if result.data:
                return result.data
            
            # Pokud všechny mají data, vezmi nejstarší aktualizované
            result = supabase.table('etf_funds')\
                .select('isin, name')\
                .order('performance_last_updated', desc=False)\
                .limit(limit)\
                .execute()
            
            return result.data or []
            
        except Exception as e:
            logging.error(f"Error fetching ETFs: {e}")
            return []
    
    def run_batch_update(self, batch_size: int = 50, limit: int = 100):
        """Spustí batch aktualizaci performance dat"""
        
        logging.info(f"Starting enhanced performance scraping - batch size: {batch_size}, limit: {limit}")
        
        etfs = self.get_etfs_to_update(limit)
        
        if not etfs:
            logging.info("No ETFs found for update")
            return
        
        logging.info(f"Found {len(etfs)} ETFs to update")
        
        success_count = 0
        error_count = 0
        
        for i, etf in enumerate(etfs, 1):
            isin = etf['isin']
            name = etf['name']
            
            logging.info(f"[{i}/{len(etfs)}] Processing {isin} - {name}")
            
            # Scrape performance data
            performance_data = self.extract_performance_data(isin)
            
            if performance_data:
                # Update database
                if self.update_etf_performance(isin, performance_data):
                    success_count += 1
                    logging.info(f"✅ Successfully updated {isin}")
                else:
                    error_count += 1
                    logging.error(f"❌ Failed to update database for {isin}")
            else:
                error_count += 1
                logging.error(f"❌ No performance data extracted for {isin}")
            
            # Rate limiting
            if i % batch_size == 0:
                delay = random.uniform(3, 7)
                logging.info(f"Batch {i//batch_size} completed. Sleeping for {delay:.1f}s...")
                time.sleep(delay)
            else:
                time.sleep(random.uniform(1, 3))
        
        # Final statistics
        logging.info(f"""
Performance scraping completed!
✅ Successful updates: {success_count}
❌ Errors: {error_count}
📊 Success rate: {success_count/(success_count+error_count)*100:.1f}%
        """)

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Enhanced Performance Scraper for JustETF')
    parser.add_argument('--batch-size', type=int, default=50, help='Batch size for processing')
    parser.add_argument('--limit', type=int, default=100, help='Maximum number of ETFs to process')
    
    args = parser.parse_args()
    
    scraper = EnhancedPerformanceScraper()
    scraper.run_batch_update(args.batch_size, args.limit)

if __name__ == "__main__":
    main()