#!/usr/bin/env python3
"""
KOMPLETNÍ ETF AUTOMATIZACE
- Spustí scraping
- Automaticky připraví data pro upload
- Integruje s web rozhraním
- Scheduling a monitoring
"""

import subprocess
import os
import time
import shutil
from datetime import datetime
from pathlib import Path
import logging
import argparse
import sys

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

class ETFCompleteAutomation:
    def __init__(self):
        self.scraper_script = "final_scraper.py"
        self.isin_file = "ISIN.csv" 
        self.results_dir = "justetf_complete_production/results"
        self.ready_for_upload_dir = "ready_for_upload"
        
        # Vytvoř složku pro připravené soubory
        os.makedirs(self.ready_for_upload_dir, exist_ok=True)
    
    def run_etf_scraping(self, batch_size: int = 50, resume: bool = True) -> bool:
        """Spustí kompletní ETF scraping"""
        try:
            logger.info("🚀 SPOUŠTÍM ETF SCRAPING")
            logger.info("="*50)
            
            cmd = [
                "python3", self.scraper_script,
                "--csv", self.isin_file,
                "--batch-size", str(batch_size)
            ]
            
            if resume:
                cmd.append("--resume")
            
            logger.info(f"Příkaz: {' '.join(cmd)}")
            
            start_time = datetime.now()
            
            # Spustí scraper s real-time outputem
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            
            # Zobrazí output v real-time
            while True:
                output = process.stdout.readline()
                if output == '' and process.poll() is not None:
                    break
                if output:
                    logger.info(f"SCRAPER: {output.strip()}")
            
            # Počkej na dokončení
            return_code = process.poll()
            end_time = datetime.now()
            duration = end_time - start_time
            
            if return_code == 0:
                logger.info("="*50)
                logger.info("✅ SCRAPING ÚSPĚŠNĚ DOKONČEN")
                logger.info(f"⏱️  Doba trvání: {duration}")
                logger.info("="*50)
                return True
            else:
                stderr = process.stderr.read()
                logger.error(f"❌ Scraping selhal s kódem: {return_code}")
                logger.error(f"STDERR: {stderr}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Chyba při spouštění scrapingu: {e}")
            return False
    
    def prepare_upload_files(self) -> str:
        """Připraví nejnovější CSV soubor pro upload"""
        try:
            logger.info("📁 Připravuji soubory pro upload...")
            
            results_path = Path(self.results_dir)
            if not results_path.exists():
                logger.error(f"❌ Složka s výsledky neexistuje: {self.results_dir}")
                return None
            
            # Najdi nejnovější CSV soubor
            csv_files = list(results_path.glob("*.csv"))
            if not csv_files:
                logger.error("❌ Žádné CSV soubory nalezeny")
                return None
            
            latest_csv = max(csv_files, key=lambda f: f.stat().st_mtime)
            logger.info(f"📄 Nejnovější CSV: {latest_csv}")
            
            # Zkopíruj do upload složky s jednoduchým názvem
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            upload_filename = f"etf_data_{timestamp}.csv"
            upload_path = os.path.join(self.ready_for_upload_dir, upload_filename)
            
            shutil.copy2(latest_csv, upload_path)
            logger.info(f"✅ Soubor připraven pro upload: {upload_path}")
            
            return upload_path
            
        except Exception as e:
            logger.error(f"❌ Chyba při přípravě upload souborů: {e}")
            return None
    
    def show_upload_instructions(self, csv_file: str):
        """Zobrazí instrukce pro manuální upload"""
        logger.info("="*60)
        logger.info("📤 INSTRUKCE PRO UPLOAD DAT")
        logger.info("="*60)
        logger.info("1. Otevřete webový prohlížeč")
        logger.info("2. Přejděte na: http://localhost:8083/admin?password=Omitac116")
        logger.info(f"3. Nahrajte soubor: {csv_file}")
        logger.info("4. Počkejte na zpracování a úspěšné nahrání")
        logger.info("="*60)
        
        # Otevře složku s připraveným souborem
        try:
            if sys.platform.startswith('darwin'):  # macOS
                subprocess.run(['open', os.path.dirname(csv_file)])
            elif sys.platform.startswith('win'):   # Windows
                subprocess.run(['explorer', os.path.dirname(csv_file)])
            elif sys.platform.startswith('linux'): # Linux
                subprocess.run(['xdg-open', os.path.dirname(csv_file)])
        except:
            pass
    
    def run_complete_automation(self, batch_size: int = 50, resume: bool = True, 
                              manual_upload: bool = True) -> bool:
        """Spustí kompletní automatizaci"""
        
        logger.info("="*60)
        logger.info("🤖 ETF KOMPLETNÍ AUTOMATIZACE - START")
        logger.info("="*60)
        
        total_start_time = datetime.now()
        
        try:
            # KROK 1: Scraping
            if not self.run_etf_scraping(batch_size=batch_size, resume=resume):
                logger.error("❌ Automatizace selhala na kroku: SCRAPING")
                return False
            
            # KROK 2: Příprava souborů
            csv_file = self.prepare_upload_files()
            if not csv_file:
                logger.error("❌ Automatizace selhala na kroku: PŘÍPRAVA SOUBORŮ")
                return False
            
            # KROK 3: Upload instrukce (nebo automatický upload)
            if manual_upload:
                self.show_upload_instructions(csv_file)
            else:
                # TODO: Implementovat automatický upload přes API
                logger.info("⚠️  Automatický upload není zatím implementován")
                self.show_upload_instructions(csv_file)
            
            total_end_time = datetime.now()
            total_duration = total_end_time - total_start_time
            
            logger.info("="*60)
            logger.info("✅ AUTOMATIZACE ÚSPĚŠNĚ DOKONČENA")
            logger.info(f"⏱️  Celkový čas: {total_duration}")
            logger.info(f"📄 Připravený soubor: {csv_file}")
            logger.info("="*60)
            
            return True
            
        except Exception as e:
            logger.error(f"❌ Neočekávaná chyba v automatizaci: {e}")
            return False

def main():
    parser = argparse.ArgumentParser(description='ETF Complete Automation')
    parser.add_argument('--batch-size', type=int, default=50, help='Velikost batch pro scraping')
    parser.add_argument('--no-resume', action='store_true', help='Nespouštět resume mode')
    parser.add_argument('--auto-upload', action='store_true', help='Pokusit se o automatický upload (experimentální)')
    
    args = parser.parse_args()
    
    automation = ETFCompleteAutomation()
    
    success = automation.run_complete_automation(
        batch_size=args.batch_size,
        resume=not args.no_resume,
        manual_upload=not args.auto_upload
    )
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()