#!/usr/bin/env python3
"""
JustETF COMPLETE Production Scraper - VERZE S DIVIDENDY

KOMPLETNÍ FUNKCIONALITA:
- ✅ Batch processing s checkpointy a resume capability
- ✅ Stock exchange data extraction (burzy, tickery, Bloomberg/Reuters)
- ✅ Holdings, performance, risk metrics
- ✅ České překlady s finančním slovníkem
- ✅ Kategorizace ETF (Akcie/Dluhopisy/Krypto/Komodity)
- ✅ Automatické určení regionu (US/Evropa/Čína/Rozvíjející se země atd.)
- ✅ DIVIDENDOVÉ INFORMACE (Current yield, Last 12 months)
- ✅ Error handling a retry mechanismus
- ✅ Progress monitoring a statistiky
- ✅ Export do Excel, JSON a CSV
- 🔧 OPRAVA: Unicode/emoji problémů pro Windows

INSTALACE ZÁVISLOSTÍ:
pip install requests beautifulsoup4 pandas googletrans==4.0.0rc1 openpyxl

POUŽITÍ:
python final_scraper.py --csv ISIN.csv --batch-size 50 --resume
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import time
import re
from datetime import datetime
import os
import random
from typing import List, Dict, Optional, Tuple
import logging
import argparse
import csv
import sys
from dataclasses import dataclass

# OPRAVA UNICODE - nastavení kodování pro Windows
if sys.platform.startswith('win'):
    import codecs
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except:
        pass

# Pokusí se importovat deep-translator (kompatibilní s novějšími httpx verzemi)
try:
    from deep_translator import GoogleTranslator
    GOOGLETRANS_AVAILABLE = True
except ImportError as e:
    print(f"WARNING: deep-translator není dostupný: {e}")
    print("INFO: Pro povolení překladu nainstalujte: pip install deep-translator")
    GOOGLETRANS_AVAILABLE = False
    GoogleTranslator = None

# Pokusí se importovat Supabase klient a dotenv
try:
    from supabase import create_client, Client
    from dotenv import load_dotenv
    SUPABASE_AVAILABLE = True
    # Načti environment variables z .env souboru
    load_dotenv('../.env')
except ImportError:
    print("WARNING: Supabase klient nebo python-dotenv není nainstalován. Automatické nahrávání do DB bude vypnuté.")
    print("INFO: Pro povolení nahrávání spusťte: pip install supabase python-dotenv")
    SUPABASE_AVAILABLE = False

# ================================
# PRODUCTION KONFIGURACE
# ================================
PRODUCTION_MODE = True
BATCH_SIZE = 50  # Počet ETF v jednom batch
MAX_RETRIES = 3
RETRY_DELAY = 30  # sekund
TRANSLATE_DESCRIPTIONS = True and GOOGLETRANS_AVAILABLE  # Zapnuto s deep-translator
SAVE_HTML = False  # Pro production vypnuto kvůli místu
DEBUG_MODE = False
EXTRACT_EXCHANGE_DATA = True
EXTRACT_DIVIDEND_DATA = True  # NOVÉ: Extrakce dividendových dat
AUTO_UPLOAD_TO_DB = True and SUPABASE_AVAILABLE  # NOVÉ: Automatické nahrávání do databáze

# Výstupní složky
OUTPUT_DIR = "justetf_complete_production"
CHECKPOINTS_DIR = os.path.join(OUTPUT_DIR, "checkpoints")
RESULTS_DIR = os.path.join(OUTPUT_DIR, "results")
LOGS_DIR = os.path.join(OUTPUT_DIR, "logs")

# Vytvoř složky
for directory in [OUTPUT_DIR, CHECKPOINTS_DIR, RESULTS_DIR, LOGS_DIR]:
    os.makedirs(directory, exist_ok=True)

# OPRAVA LOGGINGU - použití safe_log funkce
class SafeFormatter(logging.Formatter):
    """Formatter který bezpečně zpracovává Unicode znaky"""
    def format(self, record):
        try:
            return super().format(record)
        except UnicodeEncodeError:
            # Odstranit emoji a problematické znaky
            record.msg = str(record.msg).encode('ascii', errors='ignore').decode('ascii')
            return super().format(record)

# Upravené logging setup s Unicode podporou
log_file = os.path.join(LOGS_DIR, f'scraping_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log')

# File handler s UTF-8 kodováním
file_handler = logging.FileHandler(log_file, encoding='utf-8')
file_handler.setFormatter(SafeFormatter('%(asctime)s - %(levelname)s - %(message)s'))

# Console handler s fallbackem pro Windows
console_handler = logging.StreamHandler()
console_handler.setFormatter(SafeFormatter('%(asctime)s - %(levelname)s - %(message)s'))

# Nastavení loggeru
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(file_handler)
logger.addHandler(console_handler)

def safe_log(level: str, message: str):
    """Bezpečná logging funkce která odstraní problematické znaky pro Windows"""
    try:
        # Pokus o normální log
        getattr(logger, level.lower())(message)
    except UnicodeEncodeError:
        # Fallback - odstraň emoji a použij ASCII
        clean_message = message.encode('ascii', errors='ignore').decode('ascii')
        clean_message = re.sub(r'[^\x00-\x7F]+', ' ', clean_message)  # Odstraň non-ASCII
        getattr(logger, level.lower())(f"[CLEANED] {clean_message}")

# ================================
# FINANČNÍ SLOVNÍK PRO PŘEKLADY
# ================================
FINANCIAL_TERMS = {
    'stocks': 'akcie',
    'stock': 'akcie',
    'domiciled': 'se sídlem v',
    'domiciled in': 'se sídlem v',
    'tracking': 'sledování',
    'tracks': 'sleduje',
    'assets under management': 'spravovaná aktiva',
    'total expense ratio': 'celkový poměr nákladů',
    'replicates': 'replikuje',
    'performance': 'výkon',
    'underlying index': 'základní index',
    'accumulating': 'akumulující',
    'distributing': 'distribuující',
    'launched': 'spuštěn',
    'sampling technique': 'technikou vzorkování',
    'show more': 'zobrazit více',
    'show less': 'zobrazit méně',
    'government bonds': 'státní dluhopisy',
    'corporate bonds': 'firemní dluhopisy',
    'investment grade': 'investiční stupeň',
    'dividend': 'dividenda',
    'yield': 'výnos'
}

# ================================
# DATOVÉ STRUKTURY
# ================================
@dataclass
class ExchangeListing:
    exchange_name: str = ""
    trade_currency: str = ""
    ticker: str = ""
    bloomberg_code: str = ""
    reuters_code: str = ""
    market_maker: str = ""

class ETFDataComplete:
    def __init__(self, isin: str):
        self.isin = isin
        self.name = ""
        self.url = ""
        
        # Popisy fondů
        self.description_en = ""
        self.description_cs = ""
        
        # Costs
        self.ter = ""
        self.ter_numeric = None
        
        # Fund info
        self.fund_size = ""
        self.fund_size_numeric = None
        self.fund_size_currency = ""
        self.fund_currency = ""
        self.fund_domicile = ""
        self.fund_provider = ""
        self.inception_date = ""
        
        # Distribution
        self.distribution_policy = ""
        self.distribution_frequency = ""
        
        # Structure
        self.replication = ""
        self.legal_structure = ""
        
        # Investment
        self.index_name = ""
        self.investment_focus = ""
        self.sustainability = ""
        
        # Category
        self.category = ""
        
        # Region
        self.region = ""
        
        # Holdings
        self.total_holdings = None
        self.holdings = []
        
        # Geographic
        self.countries = []
        
        # Sectors
        self.sectors = []
        
        # Performance
        self.return_1y = None
        self.return_3y = None
        self.return_5y = None
        self.return_ytd = None
        
        # Risk metriky
        self.volatility_1y = None
        self.volatility_3y = None
        self.volatility_5y = None
        self.return_per_risk_1y = None
        self.return_per_risk_3y = None
        self.return_per_risk_5y = None
        self.max_drawdown_1y = None
        self.max_drawdown_3y = None
        self.max_drawdown_5y = None
        self.max_drawdown_inception = None
        self.beta = None
        self.correlation = None
        self.tracking_error = None
        self.information_ratio = None
        
        # Stock Exchange Data
        self.exchange_listings = []  # List[ExchangeListing]
        self.primary_exchange = ""
        self.primary_ticker = ""
        self.total_exchanges = 0
        
        # NOVÉ: DIVIDENDOVÉ INFORMACE
        self.current_dividend_yield = ""
        self.current_dividend_yield_numeric = None
        self.dividends_12m = ""
        self.dividends_12m_numeric = None
        self.dividends_12m_currency = ""
        self.dividend_extraction_method = ""
        
        # DEGIRO info
        self.degiro_free = False
        
        # Metadata
        self.scraping_date = datetime.now().isoformat()
        self.scraping_status = "pending"
        self.retry_count = 0
        
    def add_exchange_listing(self, listing: ExchangeListing):
        """Přidá nové stock exchange listing"""
        self.exchange_listings.append(listing)
        
        # Smarter primary ticker selection - preferuj známé tickery
        if not self.primary_exchange:
            self.primary_exchange = listing.exchange_name
            self.primary_ticker = listing.ticker
        else:
            # Pokud nový ticker je více "preference" než current primary
            if self._is_preferred_ticker_static(listing.ticker, self.primary_ticker):
                self.primary_ticker = listing.ticker
                self.primary_exchange = listing.exchange_name
        
        self.total_exchanges = len(self.exchange_listings)
    
    @staticmethod
    def _is_preferred_ticker_static(new_ticker: str, current_ticker: str) -> bool:
        """Určuje, zda je nový ticker preferovanější než současný"""
        if not new_ticker or not current_ticker:
            return bool(new_ticker)  # Preferuj neprázdný ticker
        
        # Známé populární tickery (preferuj tyto)
        popular_tickers = {
            'CSPX', 'VWCE', 'IWDA', 'VUAA', 'SWDA', 'VEVE',  # Core ETFs
            'EIMI', 'VFEM', 'XMME',  # Emerging markets
            'VHYL', 'UDVD', 'WDIV',  # Dividend ETFs
            'INRG', 'IUSN'  # Sector ETFs
        }
        
        # Pokud nový ticker je populární a současný ne, preferuj nový
        if new_ticker in popular_tickers and current_ticker not in popular_tickers:
            return True
        
        # Pokud současný ticker je populární a nový ne, zůstaň u současného
        if current_ticker in popular_tickers and new_ticker not in popular_tickers:
            return False
        
        # Pokud oba jsou populární nebo oba nejsou, preferuj kratší ticker
        if len(new_ticker) < len(current_ticker):
            return True
        
        # Při stejné délce, preferuj alfabeticky první
        if len(new_ticker) == len(current_ticker):
            return new_ticker < current_ticker
        
        return False
        
    def to_dict(self):
        base_dict = {
            'isin': self.isin,
            'name': self.name,
            'url': self.url,
            'description_en': self.description_en,
            'description_cs': self.description_cs,
            'ter': self.ter,
            'ter_numeric': self.ter_numeric,
            'fund_size': self.fund_size,
            'fund_size_numeric': self.fund_size_numeric,
            'fund_size_currency': self.fund_size_currency,
            'fund_currency': self.fund_currency,
            'fund_domicile': self.fund_domicile,
            'fund_provider': self.fund_provider,
            'inception_date': self.inception_date,
            'distribution_policy': self.distribution_policy,
            'distribution_frequency': self.distribution_frequency,
            'replication': self.replication,
            'legal_structure': self.legal_structure,
            'index_name': self.index_name,
            'investment_focus': self.investment_focus,
            'sustainability': self.sustainability,
            'category': self.category,
            'region': self.region,
            'total_holdings': self.total_holdings,
            'return_1y': self.return_1y,
            'return_3y': self.return_3y,
            'return_5y': self.return_5y,
            'return_ytd': self.return_ytd,
            'volatility_1y': self.volatility_1y,
            'volatility_3y': self.volatility_3y,
            'volatility_5y': self.volatility_5y,
            'return_per_risk_1y': self.return_per_risk_1y,
            'return_per_risk_3y': self.return_per_risk_3y,
            'return_per_risk_5y': self.return_per_risk_5y,
            'max_drawdown_1y': self.max_drawdown_1y,
            'max_drawdown_3y': self.max_drawdown_3y,
            'max_drawdown_5y': self.max_drawdown_5y,
            'max_drawdown_inception': self.max_drawdown_inception,
            'beta': self.beta,
            'correlation': self.correlation,
            'tracking_error': self.tracking_error,
            'information_ratio': self.information_ratio,
            
            # Stock Exchange Summary
            'primary_exchange': self.primary_exchange,
            'primary_ticker': self.primary_ticker,
            'total_exchanges': self.total_exchanges,
            
            # NOVÉ: Dividendové informace
            'current_dividend_yield': self.current_dividend_yield,
            'current_dividend_yield_numeric': self.current_dividend_yield_numeric,
            'dividends_12m': self.dividends_12m,
            'dividends_12m_numeric': self.dividends_12m_numeric,
            'dividends_12m_currency': self.dividends_12m_currency,
            'dividend_extraction_method': self.dividend_extraction_method,
            
            'scraping_date': self.scraping_date,
            'scraping_status': self.scraping_status,
            'retry_count': self.retry_count,
        }
        
        # Holdings - top 10
        for i in range(10):
            base_dict[f'holding_{i+1}_name'] = self.holdings[i][0] if i < len(self.holdings) else ""
            base_dict[f'holding_{i+1}_weight'] = self.holdings[i][1] if i < len(self.holdings) else None
        
        # Countries - top 5
        for i in range(5):
            base_dict[f'country_{i+1}_name'] = self.countries[i][0] if i < len(self.countries) else ""
            base_dict[f'country_{i+1}_weight'] = self.countries[i][1] if i < len(self.countries) else None
        
        # Sectors - top 5
        for i in range(5):
            base_dict[f'sector_{i+1}_name'] = self.sectors[i][0] if i < len(self.sectors) else ""
            base_dict[f'sector_{i+1}_weight'] = self.sectors[i][1] if i < len(self.sectors) else None
        
        # Exchange Listings (top 5)
        for i in range(5):
            if i < len(self.exchange_listings):
                listing = self.exchange_listings[i]
                base_dict[f'exchange_{i+1}_name'] = listing.exchange_name
                base_dict[f'exchange_{i+1}_currency'] = listing.trade_currency
                base_dict[f'exchange_{i+1}_ticker'] = listing.ticker
                base_dict[f'exchange_{i+1}_bloomberg'] = listing.bloomberg_code
                base_dict[f'exchange_{i+1}_reuters'] = listing.reuters_code
                base_dict[f'exchange_{i+1}_market_maker'] = listing.market_maker
            else:
                base_dict[f'exchange_{i+1}_name'] = ""
                base_dict[f'exchange_{i+1}_currency'] = ""
                base_dict[f'exchange_{i+1}_ticker'] = ""
                base_dict[f'exchange_{i+1}_bloomberg'] = ""
                base_dict[f'exchange_{i+1}_reuters'] = ""
                base_dict[f'exchange_{i+1}_market_maker'] = ""
        
        return base_dict

    def is_synthetic(self) -> bool:
        """Zkontroluje, zda je ETF syntetické"""
        return 'synthetic' in (self.replication or '').lower()


class CompleteProductionScraper:
    def __init__(self, batch_size: int = 50):
        self.batch_size = batch_size
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9,cs;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
        # Inicializace překladače
        if TRANSLATE_DESCRIPTIONS and GOOGLETRANS_AVAILABLE:
            try:
                self.translator = GoogleTranslator(source='en', target='cs')
                safe_log("info", "OK: Deep Translator (Google) inicializován")
            except Exception as e:
                safe_log("warning", f"WARNING: Translator chyba: {e}")
                self.translator = None
        else:
            self.translator = None
            
        # Inicializace Supabase klienta
        if AUTO_UPLOAD_TO_DB and SUPABASE_AVAILABLE:
            try:
                supabase_url = os.getenv('VITE_SUPABASE_URL')
                supabase_key = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')
                
                if not supabase_url or not supabase_key:
                    safe_log("warning", "WARNING: Supabase credentials nejsou nastavené v .env souboru")
                    self.supabase = None
                else:
                    self.supabase = create_client(supabase_url, supabase_key)
                    safe_log("info", "OK: Supabase klient inicializován")
            except Exception as e:
                safe_log("warning", f"WARNING: Supabase klient chyba: {e}")
                self.supabase = None
        else:
            self.supabase = None
    
    def load_isins_from_csv(self, csv_file: str) -> List[str]:
        """Načte ISIN kódy z CSV souboru"""
        safe_log("info", f"INFO: Načítám ISIN kódy z {csv_file}")
        
        isins = []
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    isin = row['ISIN'].strip()
                    if isin and len(isin) == 12:  # Validace ISIN
                        isins.append(isin)
                    else:
                        safe_log("warning", f"WARNING: Nevalidní ISIN: {isin}")
        
        except Exception as e:
            safe_log("error", f"ERROR: Chyba při načítání CSV: {e}")
            raise
        
        safe_log("info", f"OK: Načteno {len(isins)} validních ISIN kódů")
        return isins
    
    def load_checkpoint(self, batch_id: int) -> Optional[List[ETFDataComplete]]:
        """Načte checkpoint pro batch"""
        checkpoint_file = os.path.join(CHECKPOINTS_DIR, f"batch_{batch_id:04d}.json")
        
        if os.path.exists(checkpoint_file):
            try:
                with open(checkpoint_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                etf_list = []
                for item in data:
                    etf = ETFDataComplete(item['isin'])
                    # Restore základní data
                    for key, value in item.items():
                        if hasattr(etf, key):
                            setattr(etf, key, value)
                    
                    # Restore exchange listings
                    etf.exchange_listings = []
                    for i in range(1, 6):
                        exchange_name = item.get(f'exchange_{i}_name', '')
                        if exchange_name:
                            listing = ExchangeListing()
                            listing.exchange_name = exchange_name
                            listing.trade_currency = item.get(f'exchange_{i}_currency', '')
                            listing.ticker = item.get(f'exchange_{i}_ticker', '')
                            listing.bloomberg_code = item.get(f'exchange_{i}_bloomberg', '')
                            listing.reuters_code = item.get(f'exchange_{i}_reuters', '')
                            listing.market_maker = item.get(f'exchange_{i}_market_maker', '')
                            etf.exchange_listings.append(listing)
                    
                    # Restore holdings
                    etf.holdings = []
                    for i in range(1, 11):
                        name = item.get(f'holding_{i}_name', '')
                        weight = item.get(f'holding_{i}_weight')
                        if name and weight is not None:
                            etf.holdings.append((name, weight))
                    
                    # Restore countries a sectors
                    etf.countries = []
                    for i in range(1, 6):
                        name = item.get(f'country_{i}_name', '')
                        weight = item.get(f'country_{i}_weight')
                        if name and weight is not None:
                            etf.countries.append((name, weight))
                    
                    etf.sectors = []
                    for i in range(1, 6):
                        name = item.get(f'sector_{i}_name', '')
                        weight = item.get(f'sector_{i}_weight')
                        if name and weight is not None:
                            etf.sectors.append((name, weight))
                    
                    etf_list.append(etf)
                
                safe_log("info", f"CHECKPOINT: Načten checkpoint pro batch {batch_id}")
                return etf_list
            except Exception as e:
                safe_log("warning", f"WARNING: Chyba při načítání checkpoint: {e}")
        
        return None
    
    def save_checkpoint(self, batch_id: int, etf_list: List[ETFDataComplete]):
        """Uloží checkpoint pro batch"""
        checkpoint_file = os.path.join(CHECKPOINTS_DIR, f"batch_{batch_id:04d}.json")
        
        try:
            data = [etf.to_dict() for etf in etf_list]
            with open(checkpoint_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            safe_log("debug", f"SAVE: Checkpoint uložen pro batch {batch_id}")
        except Exception as e:
            safe_log("error", f"ERROR: Chyba při ukládání checkpoint: {e}")
    
    def is_batch_completed(self, batch_id: int, expected_count: int) -> bool:
        """Zkontroluje, zda je batch dokončený"""
        checkpoint = self.load_checkpoint(batch_id)
        if not checkpoint:
            return False
        
        completed = sum(1 for etf in checkpoint if etf.scraping_status in ['success', 'error', 'not_found'])
        return completed == expected_count
    
    def scrape_etf_complete_with_retry(self, isin: str, max_retries: int = MAX_RETRIES) -> ETFDataComplete:
        """KOMPLETNÍ scraping s retry mechanismem + DIVIDENDY"""
        etf = ETFDataComplete(isin)
        etf.url = f"https://www.justetf.com/en/etf-profile.html?isin={isin}"
        
        for attempt in range(max_retries + 1):
            try:
                safe_log("debug", f"SCRAPING: {isin} (pokus {attempt + 1}/{max_retries + 1})")
                
                # Randomized delay
                time.sleep(random.uniform(2, 5))
                
                response = self.session.get(etf.url, timeout=30)
                
                if response.status_code == 404:
                    etf.scraping_status = "not_found"
                    safe_log("warning", f"WARNING: ETF {isin} nenalezen (404)")
                    break
                
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # KOMPLETNÍ EXTRAKCE - všechna data
                self._extract_basic_info_robust(soup, etf)
                self._extract_fund_info_robust(soup, etf)
                self._extract_detailed_table_data(soup, etf)
                self._extract_total_holdings_improved(soup, etf)
                self._extract_performance_robust(soup, etf)
                self._extract_comprehensive_risk_metrics_improved(soup, etf)
                self._extract_description_improved(soup, etf)
                self._categorize_etf(etf)
                self._determine_region(etf)
                
                # Stock Exchange Data
                if EXTRACT_EXCHANGE_DATA:
                    self._extract_stock_exchange_data(soup, etf)
                
                # NOVÉ: Dividendové informace
                if EXTRACT_DIVIDEND_DATA:
                    self._extract_dividend_data(soup, etf)
                
                # Portfolio data JEN pro fyzické ETF
                if not etf.is_synthetic():
                    self._extract_holdings_enhanced(soup, etf)
                    self._extract_geographic_enhanced(soup, etf)
                    self._extract_sectors_enhanced(soup, etf)
                else:
                    etf.holdings = []
                    etf.countries = []
                    etf.sectors = []
                    etf.total_holdings = None
                
                etf.scraping_status = "success"
                etf.retry_count = attempt
                
                # ROZŠÍŘENÝ LOG s dividendovými informacemi
                div_info = f"| Yield: {etf.current_dividend_yield or 'N/A'}" if etf.current_dividend_yield else ""
                safe_log("debug", f"OK: {isin}: {(etf.name[:30] + '...') if etf.name else 'No name'} | {etf.region} | ({etf.total_exchanges} exchanges) {div_info}")
                break
                
            except requests.exceptions.RequestException as e:
                safe_log("warning", f"WARNING: Network error scraping {isin} (pokus {attempt + 1}): {e}")
                etf.scraping_status = "network_error"
                etf.retry_count = attempt
                
                if attempt < max_retries:
                    time.sleep(RETRY_DELAY)
                
            except Exception as e:
                safe_log("error", f"ERROR: Error scraping {isin} (pokus {attempt + 1}): {e}")
                etf.scraping_status = "error"
                etf.retry_count = attempt
                
                if attempt < max_retries:
                    time.sleep(RETRY_DELAY)
        
        return etf
    
    def process_batch(self, batch_id: int, batch_isins: List[str], resume: bool = False) -> List[ETFDataComplete]:
        """Zpracuje jeden batch ETF s KOMPLETNÍMI daty"""
        safe_log("info", f"BATCH: Processing batch {batch_id} ({len(batch_isins)} ETFs)")
        
        # Pokus o načtení checkpointu
        if resume:
            checkpoint = self.load_checkpoint(batch_id)
            if checkpoint:
                completed = sum(1 for etf in checkpoint if etf.scraping_status in ['success', 'error', 'not_found'])
                if completed == len(batch_isins):
                    safe_log("info", f"OK: Batch {batch_id} už je dokončený")
                    return checkpoint
                else:
                    safe_log("info", f"RESUME: Pokračuji v batch {batch_id} ({completed}/{len(batch_isins)} hotovo)")
                    existing_data = {etf.isin: etf for etf in checkpoint}
        
        etf_list = []
        
        for i, isin in enumerate(batch_isins, 1):
            # Zkontroluj, zda už existuje
            if resume and 'existing_data' in locals() and isin in existing_data:
                existing_etf = existing_data[isin]
                if existing_etf.scraping_status in ['success', 'error', 'not_found']:
                    etf_list.append(existing_etf)
                    safe_log("debug", f"SKIP: Přeskočen {isin} (už hotový)")
                    continue
            
            safe_log("info", f"[{batch_id}:{i}/{len(batch_isins)}] {isin}")
            
            etf = self.scrape_etf_complete_with_retry(isin)
            etf_list.append(etf)
            
            # Průběžné ukládání checkpointu
            if i % 10 == 0:
                self.save_checkpoint(batch_id, etf_list)
        
        # Finální checkpoint
        self.save_checkpoint(batch_id, etf_list)
        
        # Statistiky batch
        successful = sum(1 for etf in etf_list if etf.scraping_status == 'success')
        with_exchanges = sum(1 for etf in etf_list if etf.total_exchanges > 0)
        with_dividends = sum(1 for etf in etf_list if etf.current_dividend_yield)
        safe_log("info", f"OK: Batch {batch_id} dokončen: {successful}/{len(etf_list)} úspěšně, {with_exchanges} s exchange daty, {with_dividends} s dividend daty")
        
        return etf_list
    
    def export_batch_results(self, batch_id: int, etf_list: List[ETFDataComplete]):
        """Export výsledků batch s KOMPLETNÍMI daty (Excel, JSON, CSV)"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Připravi data
        data = [etf.to_dict() for etf in etf_list]
        df = pd.DataFrame(data)
        
        # Excel export
        excel_path = os.path.join(RESULTS_DIR, f'batch_{batch_id:04d}_{timestamp}.xlsx')
        df.to_excel(excel_path, index=False)
        
        # JSON export
        json_path = os.path.join(RESULTS_DIR, f'batch_{batch_id:04d}_{timestamp}.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        # CSV export s UTF-8 encoding
        csv_path = os.path.join(RESULTS_DIR, f'batch_{batch_id:04d}_{timestamp}.csv')
        df.to_csv(csv_path, index=False, encoding='utf-8', sep=';')
        
        safe_log("info", f"EXPORT: Batch {batch_id} exportován:")
        safe_log("info", f"   Excel: {excel_path}")
        safe_log("info", f"   JSON: {json_path}")
        safe_log("info", f"   CSV: {csv_path}")
    
    def run_complete_production_scraping(self, csv_file: str, resume: bool = False, start_batch: int = 0):
        """Hlavní funkce pro KOMPLETNÍ production scraping s dividendy"""
        safe_log("info", "START: Spuštění KOMPLETNÍHO production scrapingu + DIVIDENDY")
        safe_log("info", f"CONFIG: batch_size={self.batch_size}, resume={resume}, exchange_data={EXTRACT_EXCHANGE_DATA}, dividend_data={EXTRACT_DIVIDEND_DATA}")
        
        # Načti ISIN kódy
        all_isins = self.load_isins_from_csv(csv_file)
        total_batches = (len(all_isins) + self.batch_size - 1) // self.batch_size
        
        safe_log("info", f"TOTAL: {len(all_isins)} ETF v {total_batches} batch")
        
        all_results = []
        
        for batch_id in range(start_batch, total_batches):
            start_idx = batch_id * self.batch_size
            end_idx = min(start_idx + self.batch_size, len(all_isins))
            batch_isins = all_isins[start_idx:end_idx]
            
            safe_log("info", f"BATCH: {batch_id + 1}/{total_batches}")
            
            # Zkontroluj, zda už je batch dokončený
            if resume and self.is_batch_completed(batch_id, len(batch_isins)):
                safe_log("info", f"SKIP: Batch {batch_id} už je dokončený, přeskakuji")
                checkpoint = self.load_checkpoint(batch_id)
                if checkpoint:
                    all_results.extend(checkpoint)
                continue
            
            try:
                batch_results = self.process_batch(batch_id, batch_isins, resume)
                self.export_batch_results(batch_id, batch_results)
                all_results.extend(batch_results)
                
                # Statistiky průběhu
                total_processed = (batch_id + 1) * self.batch_size
                total_processed = min(total_processed, len(all_isins))
                progress = (total_processed / len(all_isins)) * 100
                
                safe_log("info", f"PROGRESS: {total_processed}/{len(all_isins)} ({progress:.1f}%)")
                
            except Exception as e:
                safe_log("error", f"ERROR: Chyba v batch {batch_id}: {e}")
                continue
        
        # Finální export všech výsledků
        self.export_final_results(all_results)
        
        safe_log("info", "DONE: KOMPLETNÍ production scraping s dividendy dokončen!")
    
    def export_final_results(self, all_results: List[ETFDataComplete]):
        """Finální export všech KOMPLETNÍCH výsledků s dividendy"""
        if not all_results:
            safe_log("warning", "WARNING: Žádné výsledky k exportu")
            return
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Kombinuj všechny výsledky
        data = [etf.to_dict() for etf in all_results]
        df = pd.DataFrame(data)
        
        # Excel export
        excel_path = os.path.join(RESULTS_DIR, f'FINAL_COMPLETE_WITH_DIVIDENDS_{timestamp}.xlsx')
        df.to_excel(excel_path, index=False)
        
        # JSON export
        json_path = os.path.join(RESULTS_DIR, f'FINAL_COMPLETE_WITH_DIVIDENDS_{timestamp}.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        # CSV export s UTF-8 encoding
        csv_path = os.path.join(RESULTS_DIR, f'FINAL_COMPLETE_WITH_DIVIDENDS_{timestamp}.csv')
        df.to_csv(csv_path, index=False, encoding='utf-8', sep=';')
        
        # KOMPLETNÍ statistiky
        self._print_final_complete_statistics(all_results)
        
        safe_log("info", f"FINAL: KOMPLETNÍ výsledky s dividendy exportovány:")
        safe_log("info", f"   Excel: {excel_path}")
        safe_log("info", f"   JSON: {json_path}")
        safe_log("info", f"   CSV: {csv_path}")
        
        # NOVÉ: Automatické nahrávání do databáze
        if AUTO_UPLOAD_TO_DB and self.supabase:
            safe_log("info", f"🚀 DATABÁZE: Začínám automatické nahrávání do Supabase databáze...")
            successful_etfs = [etf for etf in all_results if etf.scraping_status == 'success']
            
            if successful_etfs:
                upload_success = self.upload_etfs_to_database(successful_etfs)
                if upload_success:
                    safe_log("info", f"🎉 DATABÁZE: ✅ Automatické nahrávání do databáze dokončeno úspěšně!")
                else:
                    safe_log("error", f"❌ DATABÁZE: Chyba při automatickém nahrávání do databáze")
            else:
                safe_log("warning", f"⚠️  DATABÁZE: Žádné úspěšné ETF fondy k nahrání")
        else:
            if AUTO_UPLOAD_TO_DB:
                safe_log("info", f"📤 DATABÁZE: Automatické nahrávání je zapnuté, ale Supabase klient není dostupný")
            else:
                safe_log("info", f"💾 DATABÁZE: Automatické nahrávání je vypnuté (AUTO_UPLOAD_TO_DB=False)")
    
    def _print_final_complete_statistics(self, etf_list: List[ETFDataComplete]):
        """Výpis KOMPLETNÍCH finálních statistik včetně dividend"""
        successful = [etf for etf in etf_list if etf.scraping_status == 'success']
        errors = [etf for etf in etf_list if etf.scraping_status == 'error']
        not_found = [etf for etf in etf_list if etf.scraping_status == 'not_found']
        
        safe_log("info", f"STATS: FINÁLNÍ KOMPLETNÍ STATISTIKY S DIVIDENDY:")
        safe_log("info", f"   Total ETFs: {len(etf_list)}")
        safe_log("info", f"   Successful: {len(successful)} ({len(successful)/len(etf_list)*100:.1f}%)")
        safe_log("info", f"   Errors: {len(errors)} ({len(errors)/len(etf_list)*100:.1f}%)")
        safe_log("info", f"   Not found: {len(not_found)} ({len(not_found)/len(etf_list)*100:.1f}%)")
        
        if successful:
            # DIVIDENDOVÉ STATISTIKY
            with_dividend_yield = [etf for etf in successful if etf.current_dividend_yield]
            with_dividends_12m = [etf for etf in successful if etf.dividends_12m]
            
            safe_log("info", f"DIVIDEND DATA:")
            safe_log("info", f"   ETFs s dividend yield: {len(with_dividend_yield)}/{len(successful)} ({len(with_dividend_yield)/len(successful)*100:.1f}%)")
            safe_log("info", f"   ETFs s 12M dividends: {len(with_dividends_12m)}/{len(successful)} ({len(with_dividends_12m)/len(successful)*100:.1f}%)")
            
            if with_dividend_yield:
                yield_values = [etf.current_dividend_yield_numeric for etf in with_dividend_yield if etf.current_dividend_yield_numeric is not None]
                if yield_values:
                    safe_log("info", f"   Dividend yield range: {min(yield_values):.2f}% - {max(yield_values):.2f}%")
                    safe_log("info", f"   Average dividend yield: {sum(yield_values)/len(yield_values):.2f}%")
            
            # Exchange data statistiky
            with_exchanges = [etf for etf in successful if etf.total_exchanges > 0]
            total_exchange_listings = sum(etf.total_exchanges for etf in with_exchanges)
            
            safe_log("info", f"EXCHANGE DATA:")
            safe_log("info", f"   ETFs s exchange daty: {len(with_exchanges)}/{len(successful)} ({len(with_exchanges)/len(successful)*100:.1f}%)")
            safe_log("info", f"   Celkem exchange listings: {total_exchange_listings}")
            
            # Kategorie
            categories = {}
            for etf in successful:
                cat = etf.category or 'Neznámá'
                categories[cat] = categories.get(cat, 0) + 1
            
            safe_log("info", f"KATEGORIE:")
            for category, count in sorted(categories.items()):
                safe_log("info", f"   {category}: {count} ETF")
            
            # Regiony
            regions = {}
            for etf in successful:
                reg = etf.region or 'Neznámý'
                regions[reg] = regions.get(reg, 0) + 1
            
            safe_log("info", f"REGIONY:")
            for region, count in sorted(regions.items(), key=lambda x: x[1], reverse=True):
                safe_log("info", f"   {region}: {count} ETF")

    # ========================================
    # NOVÉ DIVIDENDOVÉ METODY
    # ========================================
    
    def _extract_dividend_data(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """NOVÁ FUNKCE: Extrakce dividendových informací"""
        safe_log("debug", f"DIVIDEND: Extracting dividend data for {etf.isin}")
        
        # Test různých metod extrakce
        dividend_data = {
            'current_dividend_yield': None,
            'current_dividend_yield_numeric': None,
            'dividends_12m': None,
            'dividends_12m_numeric': None,
            'dividends_12m_currency': None,
            'extraction_method': None
        }
        
        # Metoda 1: Hledání sekce "Dividends"
        dividend_data = self._extract_dividends_method1(soup, dividend_data)
        
        # Metoda 2: Regex v celém textu
        if not dividend_data['current_dividend_yield']:
            dividend_data = self._extract_dividends_method2(soup, dividend_data)
        
        # Metoda 3: Hledání podle class/id
        if not dividend_data['current_dividend_yield']:
            dividend_data = self._extract_dividends_method3(soup, dividend_data)
        
        # Uložení do ETF objektu
        etf.current_dividend_yield = dividend_data['current_dividend_yield'] or ""
        etf.current_dividend_yield_numeric = dividend_data['current_dividend_yield_numeric']
        etf.dividends_12m = dividend_data['dividends_12m'] or ""
        etf.dividends_12m_numeric = dividend_data['dividends_12m_numeric']
        etf.dividends_12m_currency = dividend_data['dividends_12m_currency'] or ""
        etf.dividend_extraction_method = dividend_data['extraction_method'] or ""
        
        safe_log("debug", f"   DIVIDEND: Yield={etf.current_dividend_yield}, 12M={etf.dividends_12m}, Method={etf.dividend_extraction_method}")
    
    def _extract_dividends_method1(self, soup: BeautifulSoup, dividend_data: dict) -> dict:
        """Metoda 1: Hledání sekce Dividends"""
        
        # Hledej nadpis "Dividends"
        dividend_headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5'], 
                                        string=re.compile(r'Dividends?', re.I))
        
        for heading in dividend_headings:
            # Najdi parent sekci
            section = heading.find_parent(['section', 'div', 'article'])
            if not section:
                section = heading.find_next_sibling()
                
            if section:
                section_text = section.get_text()
                
                # Hledej Current dividend yield
                yield_match = re.search(r'Current\s+dividend\s+yield[:\s]*(\d+[.,]\d+)%', section_text, re.I)
                if yield_match:
                    dividend_data['current_dividend_yield'] = f"{yield_match.group(1)}%"
                    dividend_data['current_dividend_yield_numeric'] = float(yield_match.group(1).replace(',', '.'))
                    dividend_data['extraction_method'] = 'method1_section'
                
                # Hledej Dividends last 12 months
                div_12m_patterns = [
                    r'Dividends?\s*\(last\s+12\s+months?\)[:\s]*([A-Z]{3})\s*([\d,\.]+)',
                    r'Dividends?\s*\(last\s+12\s+months?\)[:\s]*([\d,\.]+)\s*([A-Z]{3})',
                    r'Dividends?\s*12\s*months?[:\s]*([A-Z]{3})\s*([\d,\.]+)',
                ]
                
                for pattern in div_12m_patterns:
                    div_match = re.search(pattern, section_text, re.I)
                    if div_match:
                        # Zkontroluj pořadí (měna, hodnota) vs (hodnota, měna)
                        if re.match(r'^[A-Z]{3}$', div_match.group(1)):
                            # Měna, hodnota
                            currency = div_match.group(1)
                            value = div_match.group(2).replace(',', '')
                        else:
                            # Hodnota, měna
                            value = div_match.group(1).replace(',', '')
                            currency = div_match.group(2)
                        
                        dividend_data['dividends_12m'] = f"{currency} {value}"
                        dividend_data['dividends_12m_numeric'] = float(value)
                        dividend_data['dividends_12m_currency'] = currency
                        break
                
                if dividend_data['current_dividend_yield']:
                    break
        
        return dividend_data
    
    def _extract_dividends_method2(self, soup: BeautifulSoup, dividend_data: dict) -> dict:
        """Metoda 2: Regex patterns v celém textu"""
        
        full_text = soup.get_text()
        
        # Current dividend yield patterns
        yield_patterns = [
            r'Current\s+dividend\s+yield[:\s]*(\d+[.,]\d+)%',
            r'Dividend\s+yield[:\s]*(\d+[.,]\d+)%',
            r'Yield[:\s]*(\d+[.,]\d+)%'
        ]
        
        for pattern in yield_patterns:
            yield_match = re.search(pattern, full_text, re.I)
            if yield_match:
                value = yield_match.group(1).replace(',', '.')
                dividend_data['current_dividend_yield'] = f"{value}%"
                dividend_data['current_dividend_yield_numeric'] = float(value)
                dividend_data['extraction_method'] = 'method2_regex'
                break
        
        # Dividends 12 months patterns
        div_12m_patterns = [
            r'Dividends?\s*\(last\s+12\s+months?\)[:\s]*([A-Z]{3})\s*([\d,\.]+)',
            r'Dividends?\s*\(last\s+12\s+months?\)[:\s]*([\d,\.]+)\s*([A-Z]{3})',
            r'Last\s+12\s+months?[:\s]*([A-Z]{3})\s*([\d,\.]+)',
        ]
        
        for pattern in div_12m_patterns:
            div_match = re.search(pattern, full_text, re.I)
            if div_match:
                # Zkontroluj pořadí
                if re.match(r'^[A-Z]{3}$', div_match.group(1)):
                    currency = div_match.group(1)
                    value = div_match.group(2).replace(',', '')
                else:
                    value = div_match.group(1).replace(',', '')
                    currency = div_match.group(2)
                
                dividend_data['dividends_12m'] = f"{currency} {value}"
                dividend_data['dividends_12m_numeric'] = float(value)
                dividend_data['dividends_12m_currency'] = currency
                break
        
        return dividend_data
    
    def _extract_dividends_method3(self, soup: BeautifulSoup, dividend_data: dict) -> dict:
        """Metoda 3: CSS selektory a class/id hledání"""
        
        # Hledej elementy s 'dividend' v class nebo id
        dividend_elements = soup.find_all(['div', 'span', 'td', 'th'], 
                                        attrs={'class': re.compile(r'dividend', re.I)})
        dividend_elements += soup.find_all(['div', 'span', 'td', 'th'], 
                                         attrs={'id': re.compile(r'dividend', re.I)})
        
        for element in dividend_elements:
            element_text = element.get_text().strip()
            
            # Hledej yield v tomto elementu
            yield_match = re.search(r'(\d+[.,]\d+)%', element_text)
            if yield_match and not dividend_data['current_dividend_yield']:
                value = yield_match.group(1).replace(',', '.')
                # Validace - dividend yield by měl být rozumný (0-20%)
                if 0 <= float(value) <= 20:
                    dividend_data['current_dividend_yield'] = f"{value}%"
                    dividend_data['current_dividend_yield_numeric'] = float(value)
                    dividend_data['extraction_method'] = 'method3_css'
        
        return dividend_data

    # ========================================
    # OSTATNÍ EXTRAKČNÍ METODY (stejné jako předtím)
    # ========================================
    
    def _determine_region(self, etf: ETFDataComplete):
        """Určení regionu na základě názvu, indexu a geografického rozložení"""
        name_lower = (etf.name or '').lower()
        index_lower = (etf.index_name or '').lower()
        
        # 1. SPECIFICKÉ INDEXY A NÁZVY
        specific_patterns = {
            'US': [
                's&p 500', 'nasdaq', 'russell', 'dow jones', 'us ', ' us', 'united states',
                'america', 'american', 'usa', 'nyse', 'wilshire', 'us equity', 'us stocks'
            ],
            'Evropa': [
                'europe', 'european', 'stoxx', 'euro ', 'ftse europe', 'msci europe',
                'eurozone', 'emu', 'european monetary', 'euro stoxx', 'ftse 100',
                'dax', 'cac 40', 'ibex', 'ftse mib', 'ats', 'omx', 'bel'
            ],
            'Čína': [
                'china', 'chinese', 'csi ', 'msci china', 'ftse china', 'hang seng',
                'shanghai', 'shenzhen', 'h-shares', 'a-shares', 'hong kong'
            ],
            'Japonsko': [
                'japan', 'japanese', 'nikkei', 'topix', 'msci japan', 'ftse japan',
                'tsx', 'mothers'
            ],
            'Rozvíjející se země': [
                'emerging', 'emerging markets', 'em ', 'msci em', 'ftse em',
                'developing', 'frontier', 'emerging market', 'bric', 'latin america',
                'africa', 'middle east'
            ],
            'Globální': [
                'developed', 'developed markets', 'msci world', 'ftse developed',
                'world ', 'global ', 'international', 'msci acwi', 'all world',
                'all-world', 'worldwide', 'msci world', 'ftse all-world'
            ],
            'Asie': [
                'asia', 'asian', 'asia pacific', 'apac', 'far east', 'asia ex japan',
                'korea', 'taiwan', 'singapore', 'thailand', 'malaysia', 'india'
            ],
            'Pacifik': [
                'pacific', 'australia', 'australian', 'new zealand', 'asx'
            ]
        }
        
        # Zkontroluj specifické patterns
        for region, patterns in specific_patterns.items():
            if any(pattern in name_lower for pattern in patterns) or \
               any(pattern in index_lower for pattern in patterns):
                etf.region = region
                return
        
        # 2. ANALÝZA GEOGRAFICKÉHO ROZLOŽENÍ
        if etf.countries:
            top_countries = dict(etf.countries[:3])
            
            usa_weight = top_countries.get('United States', 0) + top_countries.get('USA', 0)
            if usa_weight > 50:
                etf.region = 'US'
                return
            
            china_weight = top_countries.get('China', 0)
            if china_weight > 40:
                etf.region = 'Čína'
                return
            
            european_countries = ['Germany', 'France', 'United Kingdom', 'UK', 'Switzerland', 
                                'Netherlands', 'Italy', 'Spain', 'Sweden', 'Denmark']
            europe_weight = sum(top_countries.get(country, 0) for country in european_countries)
            if europe_weight > 50:
                etf.region = 'Evropa'
                return
        
        # 3. PODLE KATEGORIE
        if etf.category in ['Krypto', 'Komodity', 'Dluhopisy']:
            etf.region = 'Globální'
            return
        
        # 4. FALLBACK - lepší defaulty podle názvu
        if any(word in name_lower for word in ['bond', 'government', 'treasury']):
            etf.region = 'Globální'
        elif any(word in name_lower for word in ['equity', 'stock', 'shares']):
            etf.region = 'Globální'  # Pravděpodobně diversifikovaný akciový ETF
        else:
            etf.region = 'Ostatní'
    
    def _extract_stock_exchange_data(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Rychlá extrakce stock exchange dat s opravami"""
        exchange_section = None
        
        
        # Hledej Stock Exchange sekci - více metod
        exchange_elements = soup.find_all(['section', 'div', 'table'], 
                                        string=re.compile(r'Stock\s+exchange', re.I))
        
        safe_log("info", f"EXCHANGE: Found {len(exchange_elements)} elements with 'Stock exchange' text")
        
        # Pokus 2: Hledej jen "exchange" 
        if not exchange_elements:
            exchange_elements = soup.find_all(['section', 'div', 'table'], 
                                            string=re.compile(r'exchange', re.I))
            safe_log("info", f"EXCHANGE: Found {len(exchange_elements)} elements with 'exchange' text")
        
        # Pokus 3: Hledej tabulky s typickými exchange headers
        if not exchange_elements:
            tables = soup.find_all('table')
            for table in tables:
                text = table.get_text().lower()
                # Musí mít kombinaci listing/exchange AND ticker/bloomberg
                has_exchange = any(keyword in text for keyword in ['listing', 'stock exchange'])
                has_ticker = any(keyword in text for keyword in ['ticker', 'bloomberg', 'reuters'])
                has_currency = 'currency' in text
                
                if has_exchange and has_ticker and has_currency:
                    exchange_elements = [table]
                    safe_log("info", f"EXCHANGE: Found exchange table with listing+ticker+currency keywords")
                    break
                elif has_ticker and has_currency and ('xetra' in text or 'london' in text):
                    # Fallback - pokud najde ticker+currency+známou burzu
                    exchange_elements = [table]
                    safe_log("info", f"EXCHANGE: Found exchange table with ticker+currency+exchange names")
                    break
        
        for element in exchange_elements:
            parent = element.find_parent(['section', 'div', 'article'])
            if parent:
                exchange_section = parent
                safe_log("info", f"EXCHANGE: Found parent section for stock exchange")
                break
        
        if exchange_section:
            safe_log("info", f"EXCHANGE: Found exchange section, calling _parse_exchange_table")
            self._parse_exchange_table(exchange_section, etf)
        else:
            safe_log("info", f"EXCHANGE: No exchange section found, calling _extract_exchange_from_text")
            self._extract_exchange_from_text(soup, etf)
        
        # Metoda 2: Nastav primary ticker z nejlepšího table kandidáta
        if not etf.primary_ticker and etf.exchange_listings:
            # Najdi první listing s tickerem
            for listing in etf.exchange_listings:
                if listing.ticker:
                    etf.primary_ticker = listing.ticker
                    etf.primary_exchange = listing.exchange_name
                    break
        
        # Metoda 3: Fallback - hledej ticker v celém textu pouze pokud tabulky selhaly
        if not etf.primary_ticker:
            self._extract_ticker_from_full_text(soup, etf)
        
    
    def _parse_exchange_table(self, section: BeautifulSoup, etf: ETFDataComplete):
        """Parsuje tabulku s exchange daty s DEBUG výstupem"""
        table = section if section.name == 'table' else section.find('table')
        
        if not table:
            safe_log("debug", f"EXCHANGE: No table found in section")
            return
        
        rows = table.find_all('tr')
        if not rows:
            safe_log("debug", f"EXCHANGE: No rows found in table")
            return
        
        header_row = rows[0]
        headers = [th.get_text().strip().lower() for th in header_row.find_all(['th', 'td'])]
        safe_log("info", f"EXCHANGE: Headers found: {headers}")
        
        col_mapping = {}
        for i, header in enumerate(headers):
            if 'listing' in header or 'exchange' in header:
                col_mapping['exchange'] = i
            elif 'currency' in header:
                col_mapping['currency'] = i
            elif 'ticker' in header:
                col_mapping['ticker'] = i
            elif 'bloomberg' in header:
                col_mapping['bloomberg'] = i
            elif 'reuters' in header:
                col_mapping['reuters'] = i
        
        safe_log("info", f"EXCHANGE: Column mapping: {col_mapping}")
        
        # Parsuj data řádky
        for row_idx, row in enumerate(rows[1:], 1):
            cells = row.find_all(['td', 'th'])
            if len(cells) < 2:
                continue
            
            safe_log("info", f"EXCHANGE: Row {row_idx} cells: {[cell.get_text().strip() for cell in cells]}")
            
            listing = ExchangeListing()
            
            if 'exchange' in col_mapping and col_mapping['exchange'] < len(cells):
                listing.exchange_name = cells[col_mapping['exchange']].get_text().strip()
            
            if 'currency' in col_mapping and col_mapping['currency'] < len(cells):
                listing.trade_currency = cells[col_mapping['currency']].get_text().strip()
            
            if 'ticker' in col_mapping and col_mapping['ticker'] < len(cells):
                raw_ticker = cells[col_mapping['ticker']].get_text().strip()
                safe_log("info", f"EXCHANGE: Raw ticker from cell {col_mapping['ticker']}: '{raw_ticker}'")
                listing.ticker = raw_ticker
            
            if 'bloomberg' in col_mapping and col_mapping['bloomberg'] < len(cells):
                bloomberg_raw = cells[col_mapping['bloomberg']].get_text().strip()
                if bloomberg_raw and bloomberg_raw != '--':
                    listing.bloomberg_code = bloomberg_raw
            
            if 'reuters' in col_mapping and col_mapping['reuters'] < len(cells):
                reuters_raw = cells[col_mapping['reuters']].get_text().strip()
                if reuters_raw and reuters_raw != '--':
                    listing.reuters_code = reuters_raw
            
            safe_log("debug", f"EXCHANGE: Created listing - Exchange: '{listing.exchange_name}', Ticker: '{listing.ticker}', Currency: '{listing.trade_currency}'")
            
            if listing.exchange_name and len(listing.exchange_name) > 1:
                etf.add_exchange_listing(listing)
                safe_log("debug", f"EXCHANGE: Added listing for {listing.exchange_name}")
            else:
                safe_log("debug", f"EXCHANGE: Skipped listing - invalid exchange name: '{listing.exchange_name}'")
    
    def _extract_exchange_from_text(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Fallback extrakce exchange dat z textu"""
        text = soup.get_text()
        
        exchanges = [
            'London Stock Exchange', 'Frankfurt Stock Exchange', 'Stuttgart Stock Exchange',
            'Euronext Amsterdam', 'Six Swiss Exchange', 'XETRA', 'Borsa Italiana',
            'gettex', 'Tradegate', 'NYSE', 'NASDAQ', 'Euronext Paris'
        ]
        
        for exchange in exchanges:
            if exchange.lower() in text.lower():
                listing = ExchangeListing()
                listing.exchange_name = exchange
                
                currency_mapping = {
                    'London Stock Exchange': 'GBP',
                    'Frankfurt Stock Exchange': 'EUR',
                    'Stuttgart Stock Exchange': 'EUR',
                    'Euronext Amsterdam': 'EUR',
                    'Six Swiss Exchange': 'CHF',
                    'XETRA': 'EUR',
                    'Euronext Paris': 'EUR',
                    'gettex': 'EUR'
                }
                listing.trade_currency = currency_mapping.get(exchange, 'EUR')
                
                etf.add_exchange_listing(listing)
    
    def _extract_basic_info_robust(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrakce základních informací"""
        # Název ETF
        name_selectors = ['h1', '.etf-name', '[data-field="name"]', '.fund-name']
        
        for selector in name_selectors:
            element = soup.select_one(selector)
            if element and element.get_text().strip():
                etf.name = element.get_text().strip()
                etf.name = etf.name.replace('&amp;', '&').replace('  ', ' ')
                break
        
        if not etf.name:
            title = soup.find('title')
            if title:
                title_text = title.get_text()
                if " | " in title_text:
                    etf.name = title_text.split(" | ")[0].strip()
        
        # TER
        text = soup.get_text()
        ter_patterns = [
            r'TER[:\s]*(\d+[.,]\d+)%',
            r'Total Expense Ratio[:\s]*(\d+[.,]\d+)%',
            r'Ongoing charges[:\s]*(\d+[.,]\d+)%',
            r'Annual fee[:\s]*(\d+[.,]\d+)%',
        ]
        
        for pattern in ter_patterns:
            match = re.search(pattern, text, re.I)
            if match:
                ter_value = match.group(1).replace(',', '.')
                etf.ter = f"{ter_value}%"
                try:
                    etf.ter_numeric = float(ter_value)
                except:
                    pass
                break
        
        # Fund size
        size_patterns = [
            r'Fund size[:\s]*(EUR|USD|GBP)\s*([\d,\.]+)\s*m',
            r'Assets under management[:\s]*(EUR|USD|GBP)\s*([\d,\.]+)\s*m',
            r'AUM[:\s]*(EUR|USD|GBP)\s*([\d,\.]+)\s*m',
            r'Net assets[:\s]*(EUR|USD|GBP)\s*([\d,\.]+)\s*million',
        ]
        
        for pattern in size_patterns:
            match = re.search(pattern, text, re.I | re.S)
            if match:
                currency = match.group(1)
                amount = match.group(2).replace(',', '')
                etf.fund_size = f"{currency} {amount}m"
                etf.fund_size_currency = currency
                try:
                    etf.fund_size_numeric = float(amount)
                except:
                    pass
                break
    
    def _extract_fund_info_robust(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrakce informací o fondu"""
        text = soup.get_text()
        
        # Provider z názvu
        if etf.name:
            providers = ['iShares', 'Vanguard', 'Xtrackers', 'Amundi', 'HSBC', 'UBS', 'SPDR', 'Invesco', 'SSGA', 'Lyxor', '21Shares', 'AMINA', 'WisdomTree', 'VanEck', 'Franklin', 'Fidelity', 'JPMorgan', 'BNP Paribas', 'State Street']
            for provider in providers:
                if provider in etf.name:
                    etf.fund_provider = provider
                    break
        
        # Distribution policy z názvu
        if etf.name:
            name_lower = etf.name.lower()
            
            if any(pattern in name_lower for pattern in ['(acc)', 'accumulating', '(c)', ' acc']):
                etf.distribution_policy = 'Accumulating'
            elif any(pattern in name_lower for pattern in ['(dist)', 'distributing', '(d)', ' dist', ' dis']):
                etf.distribution_policy = 'Distributing'
        
        self._extract_index_name(soup, etf)
    
    def _extract_index_name(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrahuje název indexu"""
        if etf.name:
            name = etf.name.replace('UCITS ETF', '').replace('ETP', '').replace('ETF', '')
            
            index_patterns = [
                r'(S&P 500)',
                r'(MSCI World)',
                r'(FTSE [\w\s-]+)',
                r'(NASDAQ [\w\s-]+)',
                r'(MSCI Europe)',
                r'(MSCI Emerging Markets)',
                r'(MSCI [\w\s-]+)',
                r'(Bloomberg [\w\s-]+)',
                r'(Euro Corporate)',
                r'(Government Bond)',
                r'(Bitcoin)',
                r'(Ethereum)',
                r'(Crypto)',
            ]
            
            for pattern in index_patterns:
                match = re.search(pattern, name, re.I)
                if match:
                    index_name = match.group(1).strip()
                    if 3 <= len(index_name) <= 50:
                        etf.index_name = index_name
                        return
    
    def _extract_detailed_table_data(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrahuje detailní data z tabulek"""
        data_tables = []
        
        tables = soup.find_all('table')
        for table in tables:
            rows = table.find_all('tr')
            if len(rows) > 5:
                data_tables.append(table)
        
        data_sections = soup.find_all(['div', 'section'], class_=re.compile(r'data|info|details|basics', re.I))
        for section in data_sections:
            data_tables.append(section)
        
        if not data_tables:
            data_tables = [soup]
        
        for data_source in data_tables:
            self._extract_table_fields(data_source, etf)
    
    def _extract_table_fields(self, source: BeautifulSoup, etf: ETFDataComplete):
        """Extrahuje konkrétní pole z tabulek"""
        text = source.get_text()
        
        field_patterns = {
            'fund_currency': [
                r'Fund currency\s*([A-Z]{3})',
                r'Currency\s*([A-Z]{3})',
                r'Base currency\s*([A-Z]{3})',
            ],
            'fund_domicile': [
                r'Fund domicile\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
                r'Domicile\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
                r'Domiciled in\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
            ],
            'inception_date': [
                r'Inception[/\s]*(?:Listing\s+)?Date\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})',
                r'Launch date\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})',
            ],
            'replication': [
                r'Replication\s*(Physical[^a-zA-Z]*(?:Full replication|Sampling)?)',
                r'Replication\s*(Synthetic[^a-zA-Z]*(?:Unfunded swap|Funded swap)?)',
                r'Replication\s*(Physical|Synthetic|Sampling)',
            ],
            'legal_structure': [
                r'Legal structure\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Structure\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Legal form\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Fund structure\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'UCITS\s*(UCITS[^a-zA-Z]*[^\n]*)',
                r'SICAV\s*(SICAV[^a-zA-Z]*[^\n]*)',
            ],
            'distribution_frequency': [
                r'Distribution frequency\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
                r'Distribution\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
                r'Dividend frequency\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
                r'Payment frequency\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
                r'Frequency\s*([A-Za-z\s]+?)(?:\s*Fund|$|\n)',
            ],
            'investment_focus': [
                r'Investment focus\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Focus\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Investment strategy\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Strategy\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Investment objective\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
            ],
            'sustainability': [
                r'Sustainability\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'ESG\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Social responsibility\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'SRI\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
                r'Sustainable\s*([A-Za-z\s,]+?)(?:\s*Fund|$|\n)',
            ],
        }
        
        for field, pattern_list in field_patterns.items():
            if hasattr(etf, field) and getattr(etf, field):
                continue
                
            for pattern in pattern_list:
                match = re.search(pattern, text, re.I | re.S)
                if match:
                    value = match.group(1).strip()
                    
                    if field == 'fund_currency' and len(value) == 3 and value.isupper():
                        etf.fund_currency = value
                        break
                    elif field == 'fund_domicile' and 3 <= len(value) <= 30:
                        value = re.sub(r'(Fund|Investment|Legal|structure)', '', value, flags=re.I).strip()
                        if value:
                            etf.fund_domicile = value
                            break
                    elif field == 'inception_date' and len(value) >= 8:
                        etf.inception_date = value
                        break
                    elif field == 'replication':
                        if 'physical' in value.lower():
                            etf.replication = 'Physical'
                        elif 'synthetic' in value.lower():
                            if 'unfunded' in value.lower():
                                etf.replication = 'Synthetic (Unfunded swap)'
                            else:
                                etf.replication = 'Synthetic'
                        else:
                            etf.replication = value.title()
                        break
                    elif field == 'legal_structure' and 3 <= len(value) <= 50:
                        value = re.sub(r'(Fund|Investment|ETF)', '', value, flags=re.I).strip()
                        if value:
                            etf.legal_structure = value
                            break
                    elif field == 'distribution_frequency' and 3 <= len(value) <= 30:
                        value = re.sub(r'(Fund|Investment)', '', value, flags=re.I).strip()
                        if value:
                            etf.distribution_frequency = value
                            break
                    elif field == 'investment_focus' and 3 <= len(value) <= 100:
                        value = re.sub(r'(Fund|Investment|ETF)', '', value, flags=re.I).strip()
                        if value:
                            etf.investment_focus = value
                            break
                    elif field == 'sustainability' and 3 <= len(value) <= 50:
                        value = re.sub(r'(Fund|Investment)', '', value, flags=re.I).strip()
                        if value:
                            etf.sustainability = value
                            break
    
    def _extract_total_holdings_improved(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrakce počtu holdings"""
        text = soup.get_text()
        
        out_of_patterns = [
            r'out of\s*([\d,]+)',
            r'von\s*([\d,]+)',
            r'sur\s*([\d,]+)',
        ]
        
        for pattern in out_of_patterns:
            matches = re.findall(pattern, text, re.I)
            for match in matches:
                try:
                    holdings_count = int(match.replace(',', ''))
                    if 10 <= holdings_count <= 15000:
                        etf.total_holdings = holdings_count
                        return
                except ValueError:
                    continue
        
        holdings_patterns = [
            r'(\d{1,5})\s*holdings in total',
            r'Total number of holdings[:\s]*([\d,]+)',
            r'Portfolio contains\s*([\d,]+)\s*securities',
        ]
        
        for pattern in holdings_patterns:
            match = re.search(pattern, text, re.I)
            if match:
                try:
                    holdings_count = int(match.group(1).replace(',', ''))
                    if 10 <= holdings_count <= 15000:
                        etf.total_holdings = holdings_count
                        return
                except ValueError:
                    continue
    
    def _categorize_etf(self, etf: ETFDataComplete):
        """Kategorizace ETF podle typu"""
        name_lower = (etf.name or '').lower()
        index_lower = (etf.index_name or '').lower()
        
        # 1. KRYPTO ETF
        crypto_keywords = [
            'crypto', 'bitcoin', 'ethereum', 'blockchain', 'digital assets',
            'cryptocurrency', 'btc', 'eth', 'digital currency', 'polkadot',
            'chainlink', 'cardano', 'stellar', 'xrp', 'binance', 'solana',
            'polygon', 'matic', 'avalanche', 'avax', 'uniswap', 'algorand'
        ]
        
        if any(keyword in name_lower for keyword in crypto_keywords) or \
           any(keyword in index_lower for keyword in crypto_keywords):
            etf.category = 'Krypto'
            return
        
        # 2. DLUHOPISOVÉ ETF
        bond_keywords = [
            'bond', 'bonds', 'government', 'corporate', 'treasury', 'gilt',
            'bund', 'sovereign', 'credit', 'fixed income', 'duration',
            'maturity', 'yield', 'bloomberg', 'barclays', 'aggregate'
        ]
        
        if any(keyword in name_lower for keyword in bond_keywords) or \
           any(keyword in index_lower for keyword in bond_keywords):
            etf.category = 'Dluhopisy'
            return
        
        # 3. NEMOVITOSTI (REIT) - MUSÍ BÝT PŘED OBECNOU AKCIÍ!
        real_estate_keywords = [
            'real estate', 'reit', 'property', 'infrastructure',
            'immobilien', 'immobilier', 'prop', 'properties', 'realestate',
            'real est', 'propiedades', 'biens immobiliers', 'listed property',
            'listed real estate', 'commercial property', 'residential property',
            'property securities', 'property companies', 'property investment',
            'property index', 'european property', 'global property', 'us property',
            'asia property', 'developed property', 'international property',
            'ftse epra', 'epra nareit', 'epra', 'nareit'
        ]
        
        # Kontroluj i v index_name pro real estate ETF
        if any(keyword in name_lower for keyword in real_estate_keywords) or \
           any(keyword in index_lower for keyword in real_estate_keywords):
            etf.category = 'Nemovitosti'
            return

        # 4. AKCIOVÉ ETF
        equity_keywords = [
            'equity', 'stock', 'stocks', 'shares', 'msci', 'ftse', 's&p',
            'nasdaq', 'dow', 'russell', 'stoxx', 'emerging', 'developed',
            'world', 'europe', 'asia', 'dividend', 'growth', 'value',
            'large cap', 'small cap', 'mid cap', 'sofix', 'crobex', 'bux'
        ]
        
        if any(keyword in name_lower for keyword in equity_keywords) or \
           any(keyword in index_lower for keyword in equity_keywords):
            etf.category = 'Akcie'
            return
        
        # 4. KOMODITNÍ ETF
        commodity_keywords = [
            'commodity', 'commodities', 'gold', 'silver', 'oil', 'energy',
            'metals', 'precious', 'agriculture', 'wheat', 'corn', 'natural gas',
            'copper', 'platinum', 'palladium', 'crude', 'brent'
        ]
        
        if any(keyword in name_lower for keyword in commodity_keywords):
            etf.category = 'Komodity'
            return
        
        # 5. FALLBACK
        etf.category = 'Ostatní'
    
    def _extract_performance_robust(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrakce performance dat"""
        text = soup.get_text()
        
        perf_patterns = {
            'return_ytd': [r'YTD[:\s]*([+-]?\d+[.,]\d+)%'],
            'return_1y': [r'1\s*(?:Year|Y)[:\s]*([+-]?\d+[.,]\d+)%'],
            'return_3y': [r'3\s*(?:Years?|Y)[:\s]*([+-]?\d+[.,]\d+)%'],
            'return_5y': [r'5\s*(?:Years?|Y)[:\s]*([+-]?\d+[.,]\d+)%']
        }
        
        for field, pattern_list in perf_patterns.items():
            for pattern in pattern_list:
                match = re.search(pattern, text, re.I)
                if match:
                    try:
                        value = float(match.group(1).replace(',', '.'))
                        if -95 <= value <= 1000:
                            setattr(etf, field, value)
                            break
                    except:
                        continue
    
    def _extract_comprehensive_risk_metrics_improved(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrakce risk metrik"""
        text = soup.get_text()
        
        tracking_error_patterns = [
            r'Tracking\s+error[:\s]*(\d+[.,]\d+)%',
            r'TE[:\s]*(\d+[.,]\d+)%',
            r'Tracking\s+difference[:\s]*(\d+[.,]\d+)%',
        ]
        
        for pattern in tracking_error_patterns:
            match = re.search(pattern, text, re.I)
            if match:
                try:
                    value = float(match.group(1).replace(',', '.'))
                    if 0.01 <= value <= 5.0:
                        etf.tracking_error = value
                        break
                except ValueError:
                    continue
        
        risk_patterns = {
            'volatility_1y': [r'Volatility\s+1\s+year[:\s]*(\d+[.,]\d+)%'],
            'volatility_3y': [r'Volatility\s+3\s+years?[:\s]*(\d+[.,]\d+)%'],
            'volatility_5y': [r'Volatility\s+5\s+years?[:\s]*(\d+[.,]\d+)%'],
            'max_drawdown_1y': [r'Maximum\s+drawdown\s+1\s+year[:\s]*(-?\d+[.,]\d+)%'],
            'return_per_risk_1y': [r'Return\s+per\s+risk\s+1\s+year[:\s]*(\d+[.,]\d+)']
        }
        
        for metric, pattern_list in risk_patterns.items():
            for pattern in pattern_list:
                match = re.search(pattern, text, re.I | re.S)
                if match:
                    try:
                        value = float(match.group(1).replace(',', '.'))
                        if self._validate_risk_value(metric, value):
                            setattr(etf, metric, value)
                            break
                    except:
                        continue
    
    def _validate_risk_value(self, metric: str, value: float) -> bool:
        """Validace risk hodnot"""
        if metric.startswith('volatility'):
            return 0 <= value <= 200
        elif metric.startswith('return_per_risk'):
            return -5 <= value <= 10
        elif metric.startswith('max_drawdown'):
            return -100 <= value <= 0
        elif metric == 'tracking_error':
            return 0.01 <= value <= 5.0
        return True
    
    def _extract_description_improved(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Extrakce popisu s překlady"""
        description_text = ""
        
        # Metoda 1: Hledej sekci "Description"
        description_section = soup.find('section', {'id': 'description'}) or \
                            soup.find('div', {'class': re.compile(r'description', re.I)})
        
        if description_section:
            description_text = description_section.get_text().strip()
        
        # Metoda 2: Hledej podle nadpisu "Description"
        if not description_text:
            description_headings = soup.find_all(['h1', 'h2', 'h3', 'h4'], 
                                                string=re.compile(r'Description', re.I))
            
            for heading in description_headings:
                next_element = heading.find_next_sibling()
                if next_element:
                    description_text = next_element.get_text().strip()
                    break
        
        # Metoda 3: Fallback
        if not description_text:
            all_paragraphs = soup.find_all('p')
            for p in all_paragraphs:
                text = p.get_text().strip()
                if (len(text) > 200 and 
                    any(keyword in text.lower() for keyword in ['etf', 'etp', 'fund', 'track', 'index', 'seeks'])):
                    description_text = text
                    break
        
        # Čištění textu
        if description_text:
            # Odstranění UI artefaktů "Show more/Show less" ve všech variantách
            description_text = re.sub(r'Show more\s*Show less', '', description_text, flags=re.IGNORECASE)
            description_text = re.sub(r'Ukázat více\s*show méně', '', description_text, flags=re.IGNORECASE)
            description_text = re.sub(r'Show more\s*show méně', '', description_text, flags=re.IGNORECASE)
            description_text = re.sub(r'Ukázat více\s*Show less', '', description_text, flags=re.IGNORECASE)
            description_text = re.sub(r'Show more', '', description_text, flags=re.IGNORECASE)
            description_text = re.sub(r'Show less', '', description_text, flags=re.IGNORECASE)
            description_text = re.sub(r'Ukázat více', '', description_text, flags=re.IGNORECASE)
            description_text = re.sub(r'show méně', '', description_text, flags=re.IGNORECASE)
            
            # Standardní čištění bílých znaků
            description_text = re.sub(r'\s+', ' ', description_text)
            description_text = description_text.replace('\n', ' ').replace('\r', ' ')
            description_text = description_text.strip()
            
            if len(description_text) > 2000:
                description_text = description_text[:2000] + "..."
            
            etf.description_en = description_text
            
            # PŘEKLAD
            if self.translator and description_text and TRANSLATE_DESCRIPTIONS:
                try:
                    time.sleep(1)
                    etf.description_cs = self._improve_czech_translation(description_text)
                except Exception as e:
                    safe_log("warning", f"WARNING: Translation failed: {e}")
                    etf.description_cs = "[Překlad se nezdařil]"
            else:
                etf.description_cs = "[Překlad vypnutý]" if not TRANSLATE_DESCRIPTIONS else "[Překladač nedostupný]"
    
    def _improve_czech_translation(self, english_text: str) -> str:
        """Vylepšuje český překlad s finančním slovníkem"""
        if not english_text or not self.translator:
            return english_text
        
        try:
            czech_text = self.translator.translate(english_text)
            
            # Pooprav s finančním slovníkem
            for en_term, cs_term in FINANCIAL_TERMS.items():
                pattern = re.compile(re.escape(en_term), re.IGNORECASE)
                czech_text = pattern.sub(cs_term, czech_text)
            
            # Odstranění UI artefaktů "Show more/Show less" z překladu
            czech_text = re.sub(r'Show more\s*Show less', '', czech_text, flags=re.IGNORECASE)
            czech_text = re.sub(r'Ukázat více\s*show méně', '', czech_text, flags=re.IGNORECASE)
            czech_text = re.sub(r'Show more\s*show méně', '', czech_text, flags=re.IGNORECASE)
            czech_text = re.sub(r'Ukázat více\s*Show less', '', czech_text, flags=re.IGNORECASE)
            czech_text = re.sub(r'Show more', '', czech_text, flags=re.IGNORECASE)
            czech_text = re.sub(r'Show less', '', czech_text, flags=re.IGNORECASE)
            czech_text = re.sub(r'Ukázat více', '', czech_text, flags=re.IGNORECASE)
            czech_text = re.sub(r'show méně', '', czech_text, flags=re.IGNORECASE)
            
            # Specifické opravy
            czech_text = czech_text.replace('zásob', 'akcií')
            czech_text = czech_text.replace('byt v', 'se sídlem v')
            czech_text = czech_text.replace('p.a.ETF', 'p.a. ETF')
            
            # Finální čištění bílých znaků
            czech_text = re.sub(r'\s+', ' ', czech_text).strip()
            
            return czech_text
            
        except Exception as e:
            safe_log("warning", f"WARNING: Translation improvement failed: {e}")
            return english_text
    
    def _extract_holdings_enhanced(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Holdings extrakce pro akcie i dluhopisy"""
        if etf.is_synthetic():
            return
        
        holdings = []
        
        # Najdi holdings sekci
        holdings_section = soup.find('section', id='holdings') or \
                         soup.find('div', class_=re.compile('holdings', re.I))
        
        if holdings_section:
            table = holdings_section.find('table')
            if table:
                rows = table.find_all('tr')[1:]  # Skip header
                for row in rows[:10]:
                    cells = row.find_all('td')
                    if len(cells) >= 2:
                        name = cells[0].get_text().strip()
                        weight_text = cells[1].get_text()
                        weight_match = re.search(r'(\d+[.,]\d+)%', weight_text)
                        
                        if weight_match and name:
                            weight = float(weight_match.group(1).replace(',', '.'))
                            
                            if etf.category == 'Dluhopisy':
                                if self._is_bond_code(name) and 0.1 <= weight <= 50:
                                    holdings.append((name, weight))
                            else:
                                if len(name) > 2 and not self._is_bond_code(name) and 0.1 <= weight <= 25:
                                    holdings.append((name, weight))
        
        # Fallback pro akciové ETF
        if not holdings and etf.category == 'Akcie':
            text = soup.get_text()
            companies = [
                'Apple', 'Microsoft', 'Amazon', 'Nvidia', 'Meta', 'Alphabet', 'Tesla',
                'Berkshire Hathaway', 'UnitedHealth', 'Johnson & Johnson', 'JPMorgan',
                'Visa', 'Procter & Gamble', 'Mastercard', 'Home Depot', 'Coca-Cola'
            ]
            
            for company in companies:
                patterns = [
                    rf'{re.escape(company)}\s*(\d+[.,]\d+)%',
                    rf'{re.escape(company)}[^\d]*(\d+[.,]\d+)%'
                ]
                
                for pattern in patterns:
                    match = re.search(pattern, text, re.I)
                    if match:
                        weight = float(match.group(1).replace(',', '.'))
                        if 0.5 <= weight <= 15:
                            holdings.append((company, weight))
                        break
        
        holdings.sort(key=lambda x: x[1], reverse=True)
        etf.holdings = holdings[:10]
    
    def _is_bond_code(self, name: str) -> bool:
        """Detekuje, zda je název kódem dluhopisu"""
        if not name or len(name) < 6:
            return False
        
        bond_patterns = [
            r'^[A-Z]{2}\d{10,12}$',  # BE6285455497
            r'^XS\d{10}$',           # XS1001749289
            r'^[A-Z]{2}\d{8,12}$',   # Obecný format
            r'^US\d{9}[A-Z]\d{2}$',  # US treasury format
        ]
        
        return any(re.match(pattern, name.upper()) for pattern in bond_patterns)
    
    def _extract_geographic_enhanced(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Geografické rozložení pro fyzické ETF"""
        if etf.is_synthetic():
            return
        
        countries = []
        text = soup.get_text()
        
        country_list = [
            'United States', 'USA', 'Germany', 'Japan', 'United Kingdom', 'UK',
            'France', 'China', 'Canada', 'Switzerland', 'Netherlands', 'Australia',
            'Other', 'Others', 'Bulgaria', 'Croatia', 'Czech Republic', 'Greece',
            'Hungary', 'Poland', 'Romania', 'Slovakia', 'Slovenia'
        ]
        
        for country in country_list:
            patterns = [
                rf'{re.escape(country)}\s*(\d+[.,]\d+)%',
                rf'{re.escape(country)}[^\d]*(\d+[.,]\d+)%'
            ]
            
            for pattern in patterns:
                match = re.search(pattern, text, re.I)
                if match:
                    weight = float(match.group(1).replace(',', '.'))
                    if 0.5 <= weight <= 100:
                        countries.append((country, weight))
                    break
        
        countries.sort(key=lambda x: x[1], reverse=True)
        etf.countries = countries[:5]
    
    def _extract_sectors_enhanced(self, soup: BeautifulSoup, etf: ETFDataComplete):
        """Sektorové rozložení pro fyzické ETF"""
        if etf.is_synthetic():
            return
        
        sectors = []
        text = soup.get_text()
        
        sector_list = [
            'Technology', 'Information Technology', 'IT',
            'Financials', 'Financial Services', 'Health Care', 'Healthcare',
            'Consumer Discretionary', 'Consumer Staples', 'Industrials',
            'Energy', 'Materials', 'Real Estate', 'Utilities',
            'Communication Services', 'Telecommunications'
        ]
        
        for sector in sector_list:
            patterns = [
                rf'{re.escape(sector)}\s*(\d+[.,]\d+)%',
                rf'{re.escape(sector)}[^\d]*(\d+[.,]\d+)%'
            ]
            
            for pattern in patterns:
                match = re.search(pattern, text, re.I)
                if match:
                    weight = float(match.group(1).replace(',', '.'))
                    if 1 <= weight <= 50:
                        sectors.append((sector, weight))
                    break
        
        sectors.sort(key=lambda x: x[1], reverse=True)
        etf.sectors = sectors[:5]

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

    def _parse_exchange_table_improved(self, section: BeautifulSoup, etf: ETFDataComplete):
        """VYLEPŠENÉ parsování tabulky s exchange daty"""
        table = section if section.name == 'table' else section.find('table')
        
        if not table:
            return
        
        rows = table.find_all('tr')
        if len(rows) < 2:  # Musí mít alespoň header + 1 data row
            return
        
        # Identifikuj sloupce
        header_row = rows[0]
        headers = [th.get_text().strip().lower() for th in header_row.find_all(['th', 'td'])]
        
        
        # OPRAVENO: Manuální mapování podle pozice, protože header text je vždy stejný
        # Headers: ['listing', 'trade currency', 'ticker', 'bloomberg / inav bloomberg code', 'reuters ric / inav reuters', 'market maker']
        col_mapping = {}
        
        # Based on observed header pattern from JustETF
        if len(headers) >= 6:
            col_mapping = {
                'exchange': 0,    # 'listing'
                'currency': 1,    # 'trade currency' 
                'ticker': 2,      # 'ticker' - OPRAVENO: index 2, ne 3!
                'bloomberg': 3,   # 'bloomberg / inav bloomberg code'
                'reuters': 4,     # 'reuters ric / inav reuters'
                'market_maker': 5 # 'market maker'
            }
        else:
            # Fallback - dynamic mapping
            for i, header in enumerate(headers):
                if any(keyword in header for keyword in ['ticker', 'symbol', 'code']) and 'trading' not in header:
                    col_mapping['ticker'] = i
                elif any(keyword in header for keyword in ['listing', 'exchange']) and 'market' not in header:
                    col_mapping['exchange'] = i
                elif any(keyword in header for keyword in ['currency', 'curr']) and 'trade' in header:
                    col_mapping['currency'] = i
                elif any(keyword in header for keyword in ['bloomberg', 'bbg']) and ('inav' in header or '/' in header):
                    col_mapping['bloomberg'] = i
                elif any(keyword in header for keyword in ['reuters', 'ric']) and ('inav' in header or '/' in header):
                    col_mapping['reuters'] = i
                elif any(keyword in header for keyword in ['market maker', 'maker']):
                    col_mapping['market_maker'] = i
        
        
        # Parsuj data řádky
        for row_idx, row in enumerate(rows[1:], 1):
            cells = row.find_all(['td', 'th'])
            if len(cells) < 2:
                continue
            
            listing = ExchangeListing()
            
            # OPRAVENO: Exchange je vždy v prvním sloupci (listing)
            if len(cells) > 0:
                exchange_text = cells[0].get_text().strip()
                # Vyčistí exchange název - odstraní zbytečné znaky
                exchange_clean = re.sub(r'\s+', ' ', exchange_text).strip()
                if exchange_clean and len(exchange_clean) > 3:  # Minimální délka pro exchange
                    listing.exchange_name = exchange_clean
            
            # Currency je ve druhém sloupci
            if 'currency' in col_mapping and col_mapping['currency'] < len(cells):
                listing.trade_currency = cells[col_mapping['currency']].get_text().strip()
            
            # OPRAVENO: Ticker je ve třetím sloupci (index 2)
            if 'ticker' in col_mapping and col_mapping['ticker'] < len(cells):
                ticker_text = cells[col_mapping['ticker']].get_text().strip()
                # Čištění ticker textu - zachová pouze alfanumerické znaky
                ticker_clean = re.sub(r'[^A-Z0-9]', '', ticker_text.upper())
                if ticker_clean and len(ticker_clean) >= 2 and ticker_clean not in ['-', '--', 'N/A', '']:
                    # Přijmeme jakýkoliv rozumný ticker bez přísné validace
                    if re.match(r'^[A-Z0-9]{2,8}$', ticker_clean):
                        listing.ticker = ticker_clean
            
            # Bloomberg kód
            if 'bloomberg' in col_mapping and col_mapping['bloomberg'] < len(cells):
                bloomberg_raw = cells[col_mapping['bloomberg']].get_text().strip()
                # Extrahuj pouze Bloomberg část před /
                if bloomberg_raw and bloomberg_raw not in ['--', '-', 'N/A', '']:
                    bloomberg_parts = bloomberg_raw.split('/')
                    if bloomberg_parts[0].strip():
                        listing.bloomberg_code = bloomberg_parts[0].strip()
            
            # Reuters kód  
            if 'reuters' in col_mapping and col_mapping['reuters'] < len(cells):
                reuters_raw = cells[col_mapping['reuters']].get_text().strip()
                # Extrahuj pouze Reuters část za /
                if reuters_raw and reuters_raw not in ['--', '-', 'N/A', '']:
                    reuters_parts = reuters_raw.split('/')
                    if len(reuters_parts) > 1 and reuters_parts[1].strip():
                        listing.reuters_code = reuters_parts[1].strip()
                    elif len(reuters_parts) == 1 and reuters_parts[0].strip():
                        listing.reuters_code = reuters_parts[0].strip()
            
            # Validace a přidání - přidej i když nemá ticker (může být užitečné pro fallback)
            if listing.exchange_name and len(listing.exchange_name) > 3:
                etf.add_exchange_listing(listing)
                ticker_info = listing.ticker if listing.ticker else "No ticker"

    def _extract_ticker_from_full_text(self, soup: BeautifulSoup, etf: ETFDataComplete):
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
                        return

    def _is_valid_ticker(self, ticker: str, etf) -> bool:
        """Validuje, zda je ticker kandidát platný"""
        if not ticker or len(ticker) < 2 or len(ticker) > 8:
            return False
        
        # Vyloučí ISIN (12 znaků)
        if len(ticker) == 12:
            return False
        
        # Vyloučí common false positives
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
            
            # Platform specific
            'GETTEX', 'XETRA', 'TRADEGATE', 'LANG', 'SWISS',
            'AMSTERDAM', 'FRANKFURT', 'LONDON', 'MILAN', 'PARIS',
            'STUTTGART', 'EURONEXT', 'NYSE', 'NASDAQ',
            
            # Technical/Finance terms
            'AUM', 'TER', 'NAV', 'ISIN', 'WKN', 'CUSIP', 'SEDOL',
            'RIC', 'BLOOMBERG', 'REUTERS', 'MARKET', 'STOCK',
            'BOND', 'EQUITY', 'FIXED', 'INCOME', 'YIELD',
        }
        
        if ticker in false_positives:
            return False
        
        # Ticker by měl obsahovat alespoň jedno písmeno
        if not re.search(r'[A-Z]', ticker):
            return False
        
        return True
    
    def _is_obviously_invalid_ticker(self, ticker: str) -> bool:
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
    
    def _is_preferred_ticker(self, new_ticker: str, current_ticker: str) -> bool:
        """Určuje, zda je nový ticker preferovanější než současný"""
        if not new_ticker or not current_ticker:
            return bool(new_ticker)  # Preferuj neprázdný ticker
        
        # Známé populární tickery (preferuj tyto)
        popular_tickers = {
            'CSPX', 'VWCE', 'IWDA', 'VUAA', 'SWDA', 'VEVE',  # Core ETFs
            'EIMI', 'VFEM', 'XMME',  # Emerging markets
            'VHYL', 'UDVD', 'WDIV',  # Dividend ETFs
            'INRG', 'IUSN'  # Sector ETFs
        }
        
        # Pokud nový ticker je populární a současný ne, preferuj nový
        if new_ticker in popular_tickers and current_ticker not in popular_tickers:
            return True
        
        # Pokud současný ticker je populární a nový ne, zůstaň u současného
        if current_ticker in popular_tickers and new_ticker not in popular_tickers:
            return False
        
        # Pokud oba jsou populární nebo oba nejsou, preferuj kratší ticker
        if len(new_ticker) < len(current_ticker):
            return True
        
        # Při stejné délce, preferuj alfabeticky první
        if len(new_ticker) == len(current_ticker):
            return new_ticker < current_ticker
        
        return False

    def _extract_exchange_from_text_improved(self, soup: BeautifulSoup, etf: ETFDataComplete):
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

    def transform_etf_for_database(self, etf: ETFDataComplete) -> Dict:
        """Transformuje ETF data do formátu pro databázi (stejná logika jako v useETFUpsert.ts)"""
        # Použij built-in to_dict() metodu která správně transformuje exchange_listings
        etf_dict = etf.to_dict()
        
        return {
            'isin': etf.isin,
            'name': etf.name,
            'url': etf.url,
            'description_en': etf.description_en,
            'description_cs': etf.description_cs,
            'ter': etf.ter,
            'ter_numeric': etf.ter_numeric or 0,
            'fund_size': etf.fund_size,
            'fund_size_numeric': etf.fund_size_numeric or 0,
            'fund_size_currency': etf.fund_size_currency,
            'fund_currency': etf.fund_currency,
            'fund_domicile': etf.fund_domicile,
            'fund_provider': etf.fund_provider,
            'inception_date': etf.inception_date,
            'distribution_policy': etf.distribution_policy,
            'distribution_frequency': etf.distribution_frequency,
            'replication': etf.replication,
            'legal_structure': etf.legal_structure,
            'index_name': etf.index_name,
            'investment_focus': etf.investment_focus,
            'sustainability': etf.sustainability,
            'category': etf.category,
            'region': etf.region,
            'total_holdings': etf.total_holdings or 0,
            'return_1y': etf.return_1y or 0,
            'return_3y': etf.return_3y or 0,
            'return_5y': etf.return_5y or 0,
            'return_ytd': etf.return_ytd or 0,
            'volatility_1y': etf.volatility_1y or 0,
            'volatility_3y': etf.volatility_3y or 0,
            'volatility_5y': etf.volatility_5y or 0,
            'return_per_risk_1y': etf.return_per_risk_1y or 0,
            'return_per_risk_3y': etf.return_per_risk_3y or 0,
            'return_per_risk_5y': etf.return_per_risk_5y or 0,
            'max_drawdown_1y': etf.max_drawdown_1y or 0,
            'max_drawdown_3y': etf.max_drawdown_3y or 0,
            'max_drawdown_5y': etf.max_drawdown_5y or 0,
            'max_drawdown_inception': etf.max_drawdown_inception or 0,
            'beta': etf.beta or 0,
            'correlation': etf.correlation or 0,
            'tracking_error': etf.tracking_error or 0,
            'information_ratio': etf.information_ratio or 0,
            'primary_exchange': etf_dict.get('exchange_1_name', etf.primary_exchange),
            'primary_ticker': etf_dict.get('exchange_1_ticker', etf.primary_ticker),
            'total_exchanges': etf.total_exchanges or 0,
            # Dividend fields
            'current_dividend_yield': etf.current_dividend_yield,
            'current_dividend_yield_numeric': etf.current_dividend_yield_numeric or 0,
            'dividends_12m': etf.dividends_12m,
            'dividends_12m_numeric': etf.dividends_12m_numeric or 0,
            'dividends_12m_currency': etf.dividends_12m_currency,
            'dividend_extraction_method': etf.dividend_extraction_method,
            'scraping_date': etf.scraping_date,
            'scraping_status': etf.scraping_status,
            'retry_count': etf.retry_count or 0,
            'degiro_free': etf.degiro_free or False,
            # Holdings - použij to_dict() transformaci
            'holding_1_name': etf_dict.get('holding_1_name', ''),
            'holding_1_weight': etf_dict.get('holding_1_weight', 0) or 0,
            'holding_2_name': etf_dict.get('holding_2_name', ''),
            'holding_2_weight': etf_dict.get('holding_2_weight', 0) or 0,
            'holding_3_name': etf_dict.get('holding_3_name', ''),
            'holding_3_weight': etf_dict.get('holding_3_weight', 0) or 0,
            'holding_4_name': etf_dict.get('holding_4_name', ''),
            'holding_4_weight': etf_dict.get('holding_4_weight', 0) or 0,
            'holding_5_name': etf_dict.get('holding_5_name', ''),
            'holding_5_weight': etf_dict.get('holding_5_weight', 0) or 0,
            'holding_6_name': etf_dict.get('holding_6_name', ''),
            'holding_6_weight': etf_dict.get('holding_6_weight', 0) or 0,
            'holding_7_name': etf_dict.get('holding_7_name', ''),
            'holding_7_weight': etf_dict.get('holding_7_weight', 0) or 0,
            'holding_8_name': etf_dict.get('holding_8_name', ''),
            'holding_8_weight': etf_dict.get('holding_8_weight', 0) or 0,
            'holding_9_name': etf_dict.get('holding_9_name', ''),
            'holding_9_weight': etf_dict.get('holding_9_weight', 0) or 0,
            'holding_10_name': etf_dict.get('holding_10_name', ''),
            'holding_10_weight': etf_dict.get('holding_10_weight', 0) or 0,
            # Countries - použij to_dict() transformaci  
            'country_1_name': etf_dict.get('country_1_name', ''),
            'country_1_weight': etf_dict.get('country_1_weight', 0) or 0,
            'country_2_name': etf_dict.get('country_2_name', ''),
            'country_2_weight': etf_dict.get('country_2_weight', 0) or 0,
            'country_3_name': etf_dict.get('country_3_name', ''),
            'country_3_weight': etf_dict.get('country_3_weight', 0) or 0,
            'country_4_name': etf_dict.get('country_4_name', ''),
            'country_4_weight': etf_dict.get('country_4_weight', 0) or 0,
            'country_5_name': etf_dict.get('country_5_name', ''),
            'country_5_weight': etf_dict.get('country_5_weight', 0) or 0,
            # Sectors - použij to_dict() transformaci
            'sector_1_name': etf_dict.get('sector_1_name', ''),
            'sector_1_weight': etf_dict.get('sector_1_weight', 0) or 0,
            'sector_2_name': etf_dict.get('sector_2_name', ''),
            'sector_2_weight': etf_dict.get('sector_2_weight', 0) or 0,
            'sector_3_name': etf_dict.get('sector_3_name', ''),
            'sector_3_weight': etf_dict.get('sector_3_weight', 0) or 0,
            'sector_4_name': etf_dict.get('sector_4_name', ''),
            'sector_4_weight': etf_dict.get('sector_4_weight', 0) or 0,
            'sector_5_name': etf_dict.get('sector_5_name', ''),
            'sector_5_weight': etf_dict.get('sector_5_weight', 0) or 0,
            # Exchanges - použij to_dict() transformaci (KLÍČOVÁ OPRAVA!)
            'exchange_1_name': etf_dict.get('exchange_1_name', ''),
            'exchange_1_currency': etf_dict.get('exchange_1_currency', ''),
            'exchange_1_ticker': etf_dict.get('exchange_1_ticker', ''),
            'exchange_1_bloomberg': etf_dict.get('exchange_1_bloomberg', ''),
            'exchange_1_reuters': etf_dict.get('exchange_1_reuters', ''),
            'exchange_1_market_maker': etf_dict.get('exchange_1_market_maker', ''),
            'exchange_2_name': etf_dict.get('exchange_2_name', ''),
            'exchange_2_currency': etf_dict.get('exchange_2_currency', ''),
            'exchange_2_ticker': etf_dict.get('exchange_2_ticker', ''),
            'exchange_2_bloomberg': etf_dict.get('exchange_2_bloomberg', ''),
            'exchange_2_reuters': etf_dict.get('exchange_2_reuters', ''),
            'exchange_2_market_maker': etf_dict.get('exchange_2_market_maker', ''),
            'exchange_3_name': etf_dict.get('exchange_3_name', ''),
            'exchange_3_currency': etf_dict.get('exchange_3_currency', ''),
            'exchange_3_ticker': etf_dict.get('exchange_3_ticker', ''),
            'exchange_3_bloomberg': etf_dict.get('exchange_3_bloomberg', ''),
            'exchange_3_reuters': etf_dict.get('exchange_3_reuters', ''),
            'exchange_3_market_maker': etf_dict.get('exchange_3_market_maker', ''),
            'exchange_4_name': etf_dict.get('exchange_4_name', ''),
            'exchange_4_currency': etf_dict.get('exchange_4_currency', ''),
            'exchange_4_ticker': etf_dict.get('exchange_4_ticker', ''),
            'exchange_4_bloomberg': etf_dict.get('exchange_4_bloomberg', ''),
            'exchange_4_reuters': etf_dict.get('exchange_4_reuters', ''),
            'exchange_4_market_maker': etf_dict.get('exchange_4_market_maker', ''),
            'exchange_5_name': etf_dict.get('exchange_5_name', ''),
            'exchange_5_currency': etf_dict.get('exchange_5_currency', ''),
            'exchange_5_ticker': etf_dict.get('exchange_5_ticker', ''),
            'exchange_5_bloomberg': etf_dict.get('exchange_5_bloomberg', ''),
            'exchange_5_reuters': etf_dict.get('exchange_5_reuters', ''),
            'exchange_5_market_maker': etf_dict.get('exchange_5_market_maker', ''),
        }

    def upload_etfs_to_database(self, etfs: List[ETFDataComplete]) -> bool:
        """Nahraje ETF data do Supabase databáze pomocí upsert"""
        if not self.supabase:
            safe_log("warning", "WARNING: Supabase klient není inicializovaný, přeskakuji nahrávání do DB")
            return False
            
        try:
            # Transformuj data pro databázi
            transformed_etfs = [self.transform_etf_for_database(etf) for etf in etfs]
            
            safe_log("info", f"INFO: Nahrávám {len(transformed_etfs)} ETF fondů do databáze...")
            
            # Použij upsert pro insert nebo update podle ISIN
            response = self.supabase.table('etf_funds').upsert(
                transformed_etfs,
                on_conflict='isin'
            ).execute()
            
            if response.data:
                safe_log("info", f"SUCCESS: ✅ Úspěšně nahráno {len(response.data)} ETF fondů do databáze")
                return True
            else:
                safe_log("error", f"ERROR: Databáze nevrátila data o upsert operaci")
                return False
                
        except Exception as e:
            safe_log("error", f"ERROR: Chyba při nahrávání do databáze: {e}")
            return False


def main():
    parser = argparse.ArgumentParser(description='JustETF Complete Scraper with Dividends - KOMPLETNÍ VERZE')
    parser.add_argument('--csv', required=True, help='Cesta k CSV souboru s ISIN kódy')
    parser.add_argument('--batch-size', type=int, default=50, help='Velikost batch (default: 50)')
    parser.add_argument('--resume', action='store_true', help='Pokračovat v přerušeném scrapingu')
    parser.add_argument('--start-batch', type=int, default=0, help='Začít od konkrétního batch')
    
    args = parser.parse_args()
    
    print("="*80)
    print("JustETF COMPLETE Production Scraper - VERZE S DIVIDENDY")
    print("="*80)
    print("KOMPLETNÍ FUNKCIONALITA:")
    print("   ✅ Stock exchange data (burzy, tickery, Bloomberg/Reuters)")
    print("   ✅ Holdings, performance, risk metrics")
    print("   ✅ České překlady s finančním slovníkem")
    print("   ✅ Kategorizace ETF (Akcie/Dluhopisy/Krypto/Komodity)")
    print("   ✅ Automatické určení regionu (US/Evropa/Čína/Rozvíjející se země atd.)")
    print("   ✅ DIVIDENDOVÉ INFORMACE (Current yield, Last 12 months)")
    print("   ✅ Batch processing s checkpointy")
    print("   ✅ Resume capability")
    print("   ✅ Unicode/emoji problémů pro Windows (FIX)")
    print("   ✅ Export do Excel, JSON a CSV formátů")
    print("="*80)
    print(f"CSV soubor: {args.csv}")
    print(f"Batch size: {args.batch_size}")
    print(f"Resume mode: {args.resume}")
    print(f"Exchange data: {EXTRACT_EXCHANGE_DATA}")
    print(f"Dividend data: {EXTRACT_DIVIDEND_DATA}")
    print(f"Překlady: {TRANSLATE_DESCRIPTIONS}")
    print(f"Automatické nahrávání do DB: {AUTO_UPLOAD_TO_DB}")
    print(f"Výstupní složka: {OUTPUT_DIR}")
    print(f"Export formáty: Excel (.xlsx), JSON (.json), CSV (.csv)")
    print("="*80)
    
    scraper = CompleteProductionScraper(batch_size=args.batch_size)
    scraper.run_complete_production_scraping(
        csv_file=args.csv,
        resume=args.resume,
        start_batch=args.start_batch
    )


if __name__ == "__main__":
    main()