#!/usr/bin/env python3
"""
RYCHLÝ SCRAPER BEZ DEBUG VÝSTUPU
"""

import subprocess
import sys
from datetime import datetime

def run_fast_scraper():
    print("🚀 RYCHLÝ ETF SCRAPER (BEZ DEBUG)")
    print("=" * 60)
    print(f"⏰ Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("📊 ~3600 ETF, batch 50, BEZ debug výstupu")
    print("⏱️  Očekávaný čas: 2-4 hodiny")
    print("")
    
    # Spustí caffeinate
    caffeinate_process = None
    try:
        print("☕ Spouštím caffeinate...")
        caffeinate_process = subprocess.Popen(['caffeinate', '-d', '-i', '-s', '-u'])
        
        # Spustí scraper BEZ resume a s přímým výstupem
        cmd = [
            "python3", "-u", "final_scraper.py",
            "--csv", "ISIN.csv", 
            "--batch-size", "50"
        ]
        
        print(f"📋 Příkaz: {' '.join(cmd)}")
        print("🔄 ŽIVÝ PROGRESS VÝSTUP:")
        print("=" * 60)
        
        # PŘÍMÉ spuštění bez subprocess - výstup v reálném čase
        start_time = datetime.now()
        return_code = subprocess.call(cmd)
        end_time = datetime.now()
        total_duration = end_time - start_time
        
        print("\n" + "=" * 60)
        if return_code == 0:
            print("✅ RYCHLÝ SCRAPING DOKONČEN!")
            print(f"⏰ Celkový čas: {total_duration}")
        else:
            print(f"❌ SCRAPING SELHAL (kód: {return_code})")
            
        return return_code == 0
        
    except KeyboardInterrupt:
        print("\n\n⚠️  PŘERUŠENO")
        return False
        
    finally:
        if caffeinate_process:
            caffeinate_process.terminate()
            print("💤 Caffeinate ukončen")

if __name__ == "__main__":
    success = run_fast_scraper()
    
    if success:
        print("\n🎉 Hotovo! Otevírám ready_for_upload/")
        import subprocess
        import os
        if os.path.exists("ready_for_upload"):
            subprocess.run(["open", "ready_for_upload"])