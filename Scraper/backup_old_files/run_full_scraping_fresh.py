#!/usr/bin/env python3
"""
SPUSTÍ PLNÝ SCRAPING BEZ RESUME MODE
"""

import subprocess
import sys
from datetime import datetime

def run_full_scraping():
    print("🚀 SPOUŠTÍM PLNÝ ETF SCRAPING (BEZ RESUME)")
    print("=" * 60)
    print(f"⏰ Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("📊 Celkem ~3600 ETF, batch size 50")
    print("⏱️  Odhadovaný čas: 4-6 hodin")
    print("")
    
    # Spustí caffeinate
    caffeinate_process = None
    try:
        print("☕ Spouštím caffeinate...")
        caffeinate_process = subprocess.Popen(['caffeinate', '-d', '-i', '-s', '-u'])
        
        # Spustí scraper BEZ resume mode
        cmd = [
            "python3", "final_scraper.py",
            "--csv", "ISIN.csv", 
            "--batch-size", "50"
            # Bez --resume!
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
        
        batch_count = 0
        etf_count = 0
        start_time = datetime.now()
        
        for line in iter(process.stdout.readline, ''):
            line = line.strip()
            if not line:
                continue
                
            current_time = datetime.now()
            elapsed = current_time - start_time
            timestamp = current_time.strftime("%H:%M:%S")
            
            # Zobraz důležité řádky
            print(f"[{timestamp}] {line}")
            
            # Detekuj progress
            if "batch" in line.lower() and "dokončen" in line.lower():
                batch_count += 1
                print(f"\n🎯 BATCH #{batch_count} DOKONČEN! (Čas: {elapsed})")
                print("-" * 50)
                
            elif "[" in line and "]" in line and "/" in line:
                # Progress řádky typu "[0:15/50]"
                if line.count("/") == 1 and ":" in line:
                    etf_count += 1
                    if etf_count % 20 == 0:
                        print(f"\n📊 PROGRESS: ~{etf_count} ETF zpracováno (Čas: {elapsed})")
                        print("-" * 40)
                        
            sys.stdout.flush()
        
        return_code = process.wait()
        end_time = datetime.now()
        total_duration = end_time - start_time
        
        print("\n" + "=" * 60)
        if return_code == 0:
            print("✅ PLNÝ SCRAPING DOKONČEN!")
            print(f"⏰ Celkový čas: {total_duration}")
            print(f"📊 Zpracovaných batchů: {batch_count}")
            print("📁 Výsledky v ready_for_upload/")
        else:
            print(f"❌ SCRAPING SELHAL (kód: {return_code})")
            
        return return_code == 0
        
    except KeyboardInterrupt:
        print("\n\n⚠️  PŘERUŠENO UŽIVATELEM")
        if process:
            process.terminate()
        return False
        
    finally:
        if caffeinate_process:
            caffeinate_process.terminate()
            print("💤 Caffeinate ukončen")

if __name__ == "__main__":
    success = run_full_scraping()
    
    if success:
        print("\n🎉 Hotovo! Otevírám ready_for_upload/")
        import subprocess
        import os
        if os.path.exists("ready_for_upload"):
            subprocess.run(["open", "ready_for_upload"])