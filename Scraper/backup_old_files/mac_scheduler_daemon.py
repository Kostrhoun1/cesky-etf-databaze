#!/usr/bin/env python3
"""
MAC ETF SCHEDULER DAEMON - Prevence uspání Macu během scrapingu
Používá macOS caffeinate pro zabránění spánku během dlouhých operací
"""

import schedule
import time
import subprocess
import logging
import signal
import sys
import os
from datetime import datetime

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('mac_etf_scheduler.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class MacETFScheduler:
    def __init__(self):
        self.automation_script = "complete_automation.py"
        self.caffeinate_process = None
        self.running = True
        
        # Signal handlers pro graceful shutdown
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)
    
    def signal_handler(self, signum, frame):
        """Graceful shutdown handler"""
        logger.info(f"📶 Přijat signál {signum}, ukončuji scheduler...")
        self.running = False
        if self.caffeinate_process:
            self.caffeinate_process.terminate()
        sys.exit(0)
    
    def prevent_sleep(self):
        """Zabrání uspání Macu pomocí caffeinate"""
        try:
            logger.info("☕ Spouštím caffeinate - Mac se neuspí během scrapingu")
            # Spustí caffeinate na pozadí - zabrání spánku displeje i systému
            self.caffeinate_process = subprocess.Popen([
                'caffeinate', 
                '-d',  # Zabrání spánku displeje
                '-i',  # Zabrání spánku při nečinnosti
                '-s',  # Zabrání spánku systému
                '-u'   # Vytvoří user assertion (simulator user activity)
            ])
            logger.info("✅ Caffeinate aktivní - Mac zůstane bdělý")
            return True
        except Exception as e:
            logger.error(f"❌ Chyba při spouštění caffeinate: {e}")
            return False
    
    def allow_sleep(self):
        """Povolí uspání Macu ukončením caffeinate"""
        if self.caffeinate_process:
            try:
                logger.info("💤 Ukončuji caffeinate - Mac se může uspat")
                self.caffeinate_process.terminate()
                self.caffeinate_process.wait()
                self.caffeinate_process = None
                logger.info("✅ Caffeinate ukončen - Mac může spát normálně")
            except Exception as e:
                logger.error(f"❌ Chyba při ukončování caffeinate: {e}")
    
    def run_etf_update_with_prevention(self):
        """Spustí ETF update s prevencí uspání"""
        update_start = datetime.now()
        logger.info("🌙 NOČNÍ ETF UPDATE - START")
        logger.info(f"Čas: {update_start}")
        
        # Zabrání uspání před začátkem
        sleep_prevented = self.prevent_sleep()
        
        try:
            # Spustí complete automation
            logger.info("🚀 Spouštím ETF scraping...")
            result = subprocess.run([
                "python3", self.automation_script,
                "--batch-size", "50"
            ], capture_output=True, text=True, timeout=14400)  # 4 hodiny timeout
            
            update_end = datetime.now()
            duration = update_end - update_start
            
            if result.returncode == 0:
                logger.info("✅ Noční ETF update úspěšný")
                logger.info(f"⏱️  Doba trvání: {duration}")
                logger.info("📝 Posledních 500 znaků výstupu:")
                logger.info(result.stdout[-500:])
            else:
                logger.error(f"❌ Noční ETF update selhal: {result.returncode}")
                logger.error(f"❌ Chyba: {result.stderr}")
                
        except subprocess.TimeoutExpired:
            logger.error("❌ ETF update timeout (více než 4 hodiny)")
        except Exception as e:
            logger.error(f"❌ Chyba při spouštění nočního update: {e}")
        finally:
            # Vždy povol uspání po dokončení
            if sleep_prevented:
                self.allow_sleep()
            
            update_end = datetime.now()
            total_duration = update_end - update_start
            logger.info(f"🏁 Noční update dokončen, celkový čas: {total_duration}")
    
    def start_scheduler(self):
        """Spustí scheduler s prevencí uspání"""
        logger.info("="*60)
        logger.info("🤖 MAC ETF SCHEDULER DAEMON SPUŠTĚN")
        logger.info("="*60)
        logger.info("Plánované časy:")
        logger.info("  - Každý den v 02:00 (noční update)")
        logger.info("Funkce:")
        logger.info("  ☕ Caffeinate - zabrání uspání během scrapingu")
        logger.info("  🌙 Optimalizováno pro noční běh")
        logger.info("  📱 Graceful shutdown na SIGINT/SIGTERM")
        logger.info("="*60)
        
        # Kontrola dostupnosti caffeinate
        try:
            subprocess.run(['caffeinate', '-t', '1'], check=True, capture_output=True)
            logger.info("✅ Caffeinate dostupný")
        except:
            logger.warning("⚠️  Caffeinate není dostupný - Mac se může uspat během scrapingu")
        
        # Naplánuj úkol - 1x denně v noci
        schedule.every().day.at("02:00").do(self.run_etf_update_with_prevention)
        
        logger.info("🎯 Scheduler aktivní, čekám na 02:00...")
        
        # Hlavní smyčka
        while self.running:
            try:
                schedule.run_pending()
                time.sleep(60)  # Kontroluj každou minutu
            except KeyboardInterrupt:
                logger.info("🛑 Scheduler ukončen uživatelem (Ctrl+C)")
                break
            except Exception as e:
                logger.error(f"❌ Chyba v scheduleru: {e}")
                time.sleep(300)  # Počkaj 5 minut při chybě
        
        # Cleanup při ukončení
        self.allow_sleep()
        logger.info("👋 Mac ETF Scheduler daemon ukončen")

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        # Test režim - spustí update ihned s prevencí uspání
        logger.info("🧪 TEST MODE - spouštím noční ETF update ihned")
        scheduler = MacETFScheduler()
        scheduler.run_etf_update_with_prevention()
        return
    
    # Kontrola běžícího procesu
    try:
        result = subprocess.run(['pgrep', '-f', 'mac_scheduler_daemon.py'], 
                              capture_output=True, text=True)
        if result.stdout.strip():
            existing_pids = result.stdout.strip().split('\n')
            current_pid = str(os.getpid())
            other_pids = [pid for pid in existing_pids if pid != current_pid]
            
            if other_pids:
                logger.warning(f"⚠️  Jiný scheduler daemon už běží (PID: {', '.join(other_pids)})")
                logger.warning("Ukončete ho před spuštěním nového:")
                logger.warning(f"kill {' '.join(other_pids)}")
                sys.exit(1)
    except:
        pass  # Není kritické pokud pgrep selže
    
    # Normální daemon režim
    scheduler = MacETFScheduler()
    scheduler.start_scheduler()

if __name__ == "__main__":
    main()