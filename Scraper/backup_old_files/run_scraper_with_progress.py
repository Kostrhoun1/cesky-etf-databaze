#!/usr/bin/env python3
"""
SPUSTÍ SCRAPER S JASNÝM PROGRESS MONITORINGEM
"""

import subprocess
import time
import sys
from datetime import datetime

def run_scraper_with_progress():
    print("🚀 SPOUŠTÍM ETF SCRAPER S PROGRESS MONITORINGEM")
    print("=" * 60)
    print(f"⏰ Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("")
    
    # Spustí caffeinate
    caffeinate_process = None
    try:
        print("☕ Spouštím caffeinate (Mac se neuspí)...")
        caffeinate_process = subprocess.Popen(['caffeinate', '-d', '-i', '-s', '-u'])
        
        # Spustí scraper
        cmd = [
            "python3", "complete_automation.py", 
            "--batch-size", "50"
        ]
        
        print(f"📋 Příkaz: {' '.join(cmd)}")
        print("🔄 VÝSTUP SCRAPERU:")
        print("=" * 60)
        
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            universal_newlines=True
        )
        
        line_count = 0
        batch_count = 0
        etf_count = 0
        start_time = datetime.now()
        
        for line in iter(process.stdout.readline, ''):
            line = line.strip()
            if not line:
                continue
                
            line_count += 1
            current_time = datetime.now()
            elapsed = current_time - start_time
            timestamp = current_time.strftime("%H:%M:%S")
            
            # Zobraz všechny řádky pro debugging
            print(f"[{timestamp}] {line}")
            
            # Detekuj důležité události
            if "batch" in line.lower() and ("completed" in line.lower() or "finished" in line.lower()):
                batch_count += 1
                print(f"\n🎯 BATCH #{batch_count} DOKONČEN! (Čas: {elapsed})")
                print("-" * 50)
                
            elif "processing etf" in line.lower() or "scraping" in line.lower():
                etf_count += 1
                if etf_count % 10 == 0:
                    print(f"\n📊 PROGRESS: {etf_count} ETF zpracováno (Čas: {elapsed})")
                    print("-" * 40)
                    
            # Progress každých 100 řádků
            if line_count % 100 == 0:
                print(f"\n📈 LOGS: {line_count} řádků, běží {elapsed}")
                print("🔄 Scraping pokračuje...")
                print("=" * 60)
                
            # Flush output aby se zobrazoval v real-time
            sys.stdout.flush()
        
        # Čekej na dokončení
        return_code = process.wait()
        end_time = datetime.now()
        total_duration = end_time - start_time
        
        print("\n" + "=" * 60)
        if return_code == 0:
            print("✅ SCRAPER ÚSPĚŠNĚ DOKONČEN!")
            print(f"⏰ Celkový čas: {total_duration}")
            print(f"📊 Zpracovaných batchů: {batch_count}")
            print(f"📈 Celkem řádků logu: {line_count}")
        else:
            print(f"❌ SCRAPER SELHAL (kód: {return_code})")
            
        print("=" * 60)
        
        return return_code == 0
        
    except KeyboardInterrupt:
        print("\n\n⚠️  PŘERUŠENO UŽIVATELEM")
        if process:
            process.terminate()
        return False
        
    except Exception as e:
        print(f"\n❌ CHYBA: {e}")
        return False
        
    finally:
        if caffeinate_process:
            caffeinate_process.terminate()
            print("💤 Caffeinate ukončen")

if __name__ == "__main__":
    success = run_scraper_with_progress()
    
    if success:
        print("\n🎉 Hotovo! Zkontrolujte složku ready_for_upload/")
        import subprocess
        import os
        if os.path.exists("ready_for_upload"):
            subprocess.run(["open", "ready_for_upload"])
    else:
        print("\n⚠️  Scraping se nepodařil dokončit")