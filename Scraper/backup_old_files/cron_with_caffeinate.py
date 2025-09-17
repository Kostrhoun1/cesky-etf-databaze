#!/usr/bin/env python3
"""
CRON + CAFFEINATE - Nejlepší kompromis
- Nulové zatížení dokud neběží
- Zabrání uspání během scrapingu
- Vhodné pro cron job
"""

import subprocess
import logging
import sys
from datetime import datetime

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('cron_etf.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def run_etf_automation_with_caffeinate():
    """Spustí ETF automatizaci s caffeinate"""
    start_time = datetime.now()
    logger.info("🌙 CRON ETF AUTOMATION - START")
    logger.info(f"Čas: {start_time}")
    
    caffeinate_process = None
    
    try:
        # Spustí caffeinate na pozadí
        logger.info("☕ Spouštím caffeinate - Mac se neuspí")
        caffeinate_process = subprocess.Popen([
            'caffeinate', '-d', '-i', '-s', '-u'
        ])
        
        # Spustí automation
        logger.info("🚀 Spouštím ETF automation...")
        result = subprocess.run([
            "python3", "complete_automation.py",
            "--batch-size", "50"
        ], capture_output=True, text=True, timeout=14400)  # 4h timeout
        
        end_time = datetime.now()
        duration = end_time - start_time
        
        if result.returncode == 0:
            logger.info("✅ ETF automation úspěšná")
            logger.info(f"⏱️  Doba trvání: {duration}")
            logger.info("📝 Výstup:")
            logger.info(result.stdout[-500:])
        else:
            logger.error(f"❌ ETF automation selhala: {result.returncode}")
            logger.error(f"Chyba: {result.stderr}")
            
    except subprocess.TimeoutExpired:
        logger.error("❌ ETF automation timeout (>4 hodiny)")
    except Exception as e:
        logger.error(f"❌ Neočekávaná chyba: {e}")
    finally:
        # Vždy ukončí caffeinate
        if caffeinate_process:
            logger.info("💤 Ukončuji caffeinate - Mac může spát")
            caffeinate_process.terminate()
            caffeinate_process.wait()
        
        end_time = datetime.now()
        total_duration = end_time - start_time
        logger.info(f"🏁 CRON ETF AUTOMATION - KONEC ({total_duration})")

if __name__ == "__main__":
    run_etf_automation_with_caffeinate()