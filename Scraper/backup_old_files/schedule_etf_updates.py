#!/usr/bin/env python3
"""
ETF SCHEDULER - Pravidelné automatické aktualizace
Naplánuje pravidelné spouštění ETF scrapingu
"""

import schedule
import time
import subprocess
import logging
from datetime import datetime
import os
import sys

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('etf_scheduler.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class ETFScheduler:
    def __init__(self):
        self.automation_script = "complete_automation.py"
    
    def run_etf_update(self):
        """Spustí ETF update"""
        logger.info("🕐 PLÁNOVANÉ ETF UPDATE - START")
        logger.info(f"Čas: {datetime.now()}")
        
        try:
            # Spustí complete automation
            result = subprocess.run([
                "python", self.automation_script,
                "--batch-size", "50"
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                logger.info("✅ Plánovaný ETF update úspěšný")
                logger.info("Výstup:", result.stdout[-500:])  # Posledních 500 znaků
            else:
                logger.error(f"❌ Plánovaný ETF update selhal: {result.returncode}")
                logger.error("Chyba:", result.stderr)
                
        except Exception as e:
            logger.error(f"❌ Chyba při spouštění plánovaného update: {e}")
    
    def start_scheduler(self):
        """Spustí scheduler"""
        logger.info("🚀 ETF SCHEDULER SPUŠTĚN")
        logger.info("Plánované časy:")
        logger.info("  - Každý den v 02:00 (noční update)")
        
        # Naplánuj úkoly - 1x denně v noci
        schedule.every().day.at("02:00").do(self.run_etf_update)
        
        # Hlavní smyčka
        while True:
            try:
                schedule.run_pending()
                time.sleep(60)  # Kontroluj každou minutu
            except KeyboardInterrupt:
                logger.info("🛑 Scheduler ukončen uživatelem")
                break
            except Exception as e:
                logger.error(f"❌ Chyba v scheduleru: {e}")
                time.sleep(300)  # Počkej 5 minut při chybě

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        # Test režim - spustí update ihned
        logger.info("🧪 TEST MODE - spouštím ETF update ihned")
        scheduler = ETFScheduler()
        scheduler.run_etf_update()
        return
    
    # Normální scheduler režim
    scheduler = ETFScheduler()
    scheduler.start_scheduler()

if __name__ == "__main__":
    main()