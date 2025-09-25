#!/usr/bin/env python3
"""
RYCHLÝ TEST SCRAPER - pro ověření, že vše funguje
Testuje pouze pár ETF místo všech
"""

import subprocess
import time
import os
from datetime import datetime

def test_scraping():
    """Rychlý test scrapingu"""
    print("🧪 RYCHLÝ TEST SCRAPINGU")
    print("=" * 40)
    print("📊 Testuji pouze 5 ETF (místo 3600+)")
    print("⏱️  Očekávaný čas: 2-5 minut")
    print("")
    
    try:
        print("☕ Spouštím caffeinate...")
        caffeinate_process = subprocess.Popen(['caffeinate', '-d', '-i', '-s', '-u'])
        
        print("🚀 Spouštím test scraping...")
        start_time = datetime.now()
        
        # Test command - pouze 5 ETF
        cmd = [
            "python3", "final_scraper.py",
            "--csv", "ISIN.csv",
            "--batch-size", "5"  # Velmi malý batch pro test
        ]
        
        print(f"📋 Příkaz: {' '.join(cmd)}")
        print("")
        
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            universal_newlines=True
        )
        
        print("🔄 VÝSTUP SCRAPERU:")
        print("-" * 40)
        
        line_count = 0
        last_activity = time.time()
        
        while True:
            # Timeout check
            if time.time() - last_activity > 120:  # 2 minuty bez výstupu
                print(f"\n⏰ TIMEOUT: Žádný výstup po 2 minutách")
                process.terminate()
                break
            
            output = process.stdout.readline()
            
            if output == '' and process.poll() is not None:
                break
                
            if output:
                last_activity = time.time()
                line_count += 1
                timestamp = datetime.now().strftime("%H:%M:%S")
                line = output.strip()
                
                print(f"[{timestamp}] {line}")
                
                # Progress každých 10 řádků
                if line_count % 10 == 0:
                    elapsed = datetime.now() - start_time
                    print(f"📈 {line_count} řádků, běží {elapsed}")
        
        # Výsledek
        return_code = process.poll()
        end_time = datetime.now()
        duration = end_time - start_time
        
        print("")
        print("=" * 40)
        if return_code == 0:
            print("✅ TEST ÚSPĚŠNÝ!")
            print(f"⏱️  Doba: {duration}")
            
            # Zkontroluj výstupní soubory
            if os.path.exists("ready_for_upload"):
                files = os.listdir("ready_for_upload")
                csv_files = [f for f in files if f.endswith('.csv')]
                if csv_files:
                    print(f"📄 Vytvořené soubory: {len(csv_files)}")
                    print(f"📁 Nejnovější: {csv_files[-1]}")
                else:
                    print("⚠️  Žádné CSV soubory v ready_for_upload/")
            
            return True
        else:
            print(f"❌ TEST SELHAL (kód: {return_code})")
            print(f"⏱️  Doba: {duration}")
            return False
            
    except Exception as e:
        print(f"❌ Chyba během testu: {e}")
        return False
    finally:
        if 'caffeinate_process' in locals():
            caffeinate_process.terminate()
            print("💤 Caffeinate ukončen")

def main():
    print("🧪 ETF SCRAPER - RYCHLÝ TEST")
    print("=" * 50)
    print(f"Čas: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("")
    
    # Zkontroluj soubory
    required_files = ["final_scraper.py", "ISIN.csv"]
    missing = [f for f in required_files if not os.path.exists(f)]
    
    if missing:
        print(f"❌ Chybí soubory: {', '.join(missing)}")
        return
    
    print("✅ Všechny soubory nalezeny")
    print("")
    
    choice = input("Spustit rychlý test? (y/N): ").strip().lower()
    if choice in ['y', 'yes', 'ano']:
        success = test_scraping()
        
        if success:
            print("")
            print("🎉 Test dokončen úspěšně!")
            print("💡 Můžete spustit plný scraping přes ETF_Simple_Launcher.command")
        else:
            print("")
            print("⚠️  Test selhal - zkontrolujte chyby výše")
    else:
        print("Test zrušen")

if __name__ == "__main__":
    main()