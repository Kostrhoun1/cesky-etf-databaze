#!/usr/bin/env python3
"""
ETF AUTOMATION RUNNER - Kompletní automatizace
- Spustí scraper
- Automaticky nahraje data do databáze přes web rozhraní
- Logování a monitoring
- Scheduling support
"""

import subprocess
import requests
import os
import time
from datetime import datetime
import logging
import sys
from pathlib import Path

# Konfigurace
SCRAPER_SCRIPT = "final_scraper.py"
ISIN_FILE = "ISIN.csv"
UPLOAD_URL = "http://localhost:8083/admin?password=Omitac116"  # Upravte URL podle vašeho produkčního serveru
BATCH_SIZE = 50
MAX_RETRIES = 3

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'automation_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class ETFAutomationRunner:
    def __init__(self):
        self.results_dir = "justetf_complete_production/results"
        self.latest_csv = None
        
    def run_scraper(self) -> bool:
        """Spustí scraping proces"""
        try:
            logger.info("🚀 Spouštím ETF scraper...")
            
            cmd = [
                "python", SCRAPER_SCRIPT,
                "--csv", ISIN_FILE,
                "--batch-size", str(BATCH_SIZE),
                "--resume"
            ]
            
            logger.info(f"Příkaz: {' '.join(cmd)}")
            
            # Spustí scraper
            process = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=7200  # 2 hodiny timeout
            )
            
            if process.returncode == 0:
                logger.info("✅ Scraping úspěšně dokončen")
                logger.info(f"STDOUT: {process.stdout[-500:]}")  # Posledních 500 znaků
                return True
            else:
                logger.error(f"❌ Scraping selhal s kódem: {process.returncode}")
                logger.error(f"STDERR: {process.stderr}")
                return False
                
        except subprocess.TimeoutExpired:
            logger.error("❌ Scraping timeout (více než 2 hodiny)")
            return False
        except Exception as e:
            logger.error(f"❌ Chyba při spouštění scraperu: {e}")
            return False
    
    def find_latest_csv(self) -> str:
        """Najde nejnovější CSV soubor"""
        try:
            results_path = Path(self.results_dir)
            if not results_path.exists():
                logger.error(f"❌ Složka s výsledky neexistuje: {self.results_dir}")
                return None
                
            csv_files = list(results_path.glob("*.csv"))
            if not csv_files:
                logger.error("❌ Žádné CSV soubory nalezeny")
                return None
                
            # Seřadí podle času vytvoření
            latest_file = max(csv_files, key=lambda f: f.stat().st_mtime)
            logger.info(f"📄 Nejnovější CSV: {latest_file}")
            return str(latest_file)
            
        except Exception as e:
            logger.error(f"❌ Chyba při hledání CSV souboru: {e}")
            return None
    
    def upload_to_web_interface(self, csv_file: str) -> bool:
        """Nahraje CSV do web rozhraní"""
        try:
            logger.info(f"📤 Nahrávám data z: {csv_file}")
            
            if not os.path.exists(csv_file):
                logger.error(f"❌ CSV soubor neexistuje: {csv_file}")
                return False
            
            # Přečte CSV obsah
            with open(csv_file, 'r', encoding='utf-8') as f:
                csv_content = f.read()
            
            logger.info(f"📊 CSV velikost: {len(csv_content)} znaků")
            
            # Připraví form data pro upload
            files = {
                'csvFile': ('etf_data.csv', csv_content, 'text/csv')
            }
            
            # Pošle POST request na upload endpoint
            # POZNÁMKA: Možná bude potřeba upravit podle skutečného API endpointu
            response = requests.post(
                UPLOAD_URL,
                files=files,
                timeout=300  # 5 minut timeout
            )
            
            if response.status_code == 200:
                logger.info("✅ Data úspěšně nahrána do databáze")
                return True
            else:
                logger.error(f"❌ Chyba při nahrávání: {response.status_code}")
                logger.error(f"Response: {response.text[:500]}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Chyba při nahrávání do web rozhraní: {e}")
            return False
    
    def run_complete_automation(self) -> bool:
        """Spustí kompletní automatizovaný proces"""
        logger.info("="*60)
        logger.info("ETF AUTOMATION RUNNER - START")
        logger.info("="*60)
        
        start_time = datetime.now()
        
        try:
            # 1. Spustí scraper
            if not self.run_scraper():
                logger.error("❌ Automatizace neúspěšná - scraping selhal")
                return False
            
            # 2. Najde nejnovější CSV
            csv_file = self.find_latest_csv()
            if not csv_file:
                logger.error("❌ Automatizace neúspěšná - žádný CSV soubor")
                return False
            
            # 3. Nahraje do databáze
            if not self.upload_to_web_interface(csv_file):
                logger.error("❌ Automatizace neúspěšná - upload selhal")
                return False
            
            end_time = datetime.now()
            duration = end_time - start_time
            
            logger.info("="*60)
            logger.info("✅ AUTOMATIZACE ÚSPĚŠNĚ DOKONČENA")
            logger.info(f"⏱️  Celkový čas: {duration}")
            logger.info(f"📄 Zpracovaný soubor: {csv_file}")
            logger.info("="*60)
            
            return True
            
        except Exception as e:
            logger.error(f"❌ Neočekávaná chyba v automatizaci: {e}")
            return False

def main():
    runner = ETFAutomationRunner()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        # Test mode - pouze najde CSV a zkusí upload
        logger.info("🧪 TEST MODE - pouze upload bez scrapingu")
        csv_file = runner.find_latest_csv()
        if csv_file:
            runner.upload_to_web_interface(csv_file)
        return
    
    # Normální režim
    success = runner.run_complete_automation()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()