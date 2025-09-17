#!/usr/bin/env python3
"""
JEDNODUCHÝ ETF LAUNCHER - fallback bez GUI
"""

import subprocess
import time
import os
from datetime import datetime

def print_header():
    print("=" * 60)
    print("🤖 ETF SCRAPER - JEDNODUCHÝ LAUNCHER")
    print("=" * 60)
    print(f"Čas: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("")

def check_files():
    """Zkontroluje potřebné soubory"""
    required_files = ["final_scraper.py", "ISIN.csv", "complete_automation.py"]
    missing = []
    
    for file in required_files:
        if not os.path.exists(file):
            missing.append(file)
    
    if missing:
        print(f"❌ Chybí soubory: {', '.join(missing)}")
        return False
    else:
        print("✅ Všechny soubory nalezeny")
        return True

def run_etf_scraping():
    """Spustí ETF scraping"""
    print("\n🚀 SPOUŠTÍM ETF SCRAPING...")
    print("⏱️  Odhadovaný čas: 4-6 hodin")
    print("☕ Spouštím caffeinate - Mac se neuspí")
    print("")
    
    caffeinate_process = None
    
    try:
        # Spustí caffeinate
        caffeinate_process = subprocess.Popen(['caffeinate', '-d', '-i', '-s', '-u'])
        
        # Spustí automation
        print("📊 Začínám stahování ETF dat...")
        process = subprocess.Popen([
            "python3", "complete_automation.py", 
            "--batch-size", "50"
        ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, 
           text=True, bufsize=1, universal_newlines=True)
        
        # Zobrazuje progress s vylepšeným formátováním
        line_count = 0
        batch_count = 0
        etf_count = 0
        
        print("🔄 SLEDOVÁNÍ PRŮBĚHU:")
        print("=" * 50)
        
        while True:
            output = process.stdout.readline()
            if output == '' and process.poll() is not None:
                break
            if output:
                line_count += 1
                timestamp = datetime.now().strftime("%H:%M:%S")
                line = output.strip()
                
                # Zvýrazni důležité informace
                if "batch" in line.lower() and "dokončen" in line.lower():
                    batch_count += 1
                    print(f"\n🎯 [{timestamp}] BATCH #{batch_count} DOKONČEN")
                    print(f"📄 {line}")
                    print("-" * 50)
                elif "etf" in line.lower() and ("scraped" in line.lower() or "processed" in line.lower()):
                    etf_count += 1
                    if etf_count % 10 == 0:  # Každých 10 ETF
                        print(f"📊 [{timestamp}] Zpracováno: {etf_count} ETF fondů")
                elif "phase" in line.lower():
                    print(f"\n🚀 [{timestamp}] NOVÁ FÁZE")
                    print(f"📋 {line}")
                    print("-" * 50)
                elif "error" in line.lower() or "❌" in line:
                    print(f"\n⚠️  [{timestamp}] VAROVÁNÍ/CHYBA:")
                    print(f"❌ {line}")
                    print("-" * 50)
                elif "successfully" in line.lower() or "✅" in line:
                    print(f"\n✅ [{timestamp}] ÚSPĚCH:")
                    print(f"🎉 {line}")
                    print("-" * 50)
                else:
                    # Normální výstup (každý 5. řádek)
                    if line_count % 5 == 0:
                        print(f"[{timestamp}] {line}")
                
                # Progress indikátor každých 100 řádků
                if line_count % 100 == 0:
                    print(f"\n📈 PROGRESS: {line_count} log zpráv zpracováno")
                    print(f"⏰ Běží od: {datetime.now().strftime('%H:%M:%S')}")
                    print("🔄 Scraping pokračuje...")
                    print("=" * 50)
        
        # Zkontroluj výsledek
        return_code = process.poll()
        
        if return_code == 0:
            print("\n" + "=" * 60)
            print("✅ ETF SCRAPING ÚSPĚŠNĚ DOKONČEN!")
            print("=" * 60)
            print("📁 Zkontrolujte složku: ready_for_upload/")
            print("📤 Pro upload přejděte na: http://localhost:8083/admin?password=Omitac116")
            print("")
            
            # Otevři složku s výsledky
            if os.path.exists("ready_for_upload"):
                subprocess.run(["open", "ready_for_upload"])
                print("📂 Složka ready_for_upload/ byla otevřena")
            
            return True
        else:
            print(f"\n❌ ETF scraping selhal (kód: {return_code})")
            return False
            
    except Exception as e:
        print(f"\n❌ Chyba: {e}")
        return False
    finally:
        # Ukončí caffeinate
        if caffeinate_process:
            caffeinate_process.terminate()
            print("💤 Caffeinate ukončen - Mac může spát")

def main():
    print_header()
    
    if not check_files():
        print("\n⚠️  Spusťte skript ze správné složky!")
        input("Stiskněte Enter pro ukončení...")
        return
    
    print("\n📋 MOŽNOSTI:")
    print("1. 🚀 Spustit ETF scraping")
    print("2. 📤 Otevřít upload stránku")
    print("3. 📁 Otevřít složku s výsledky")
    print("4. ❌ Ukončit")
    
    while True:
        try:
            choice = input("\nVyberte možnost (1-4): ").strip()
            
            if choice == "1":
                confirm = input("\n⚠️  Scraping trvá 4-6 hodin. Pokračovat? (y/N): ")
                if confirm.lower() in ['y', 'yes', 'ano']:
                    success = run_etf_scraping()
                    if success:
                        input("\nStiskněte Enter pro pokračování...")
                else:
                    print("Scraping zrušen")
                    
            elif choice == "2":
                url = "http://localhost:8083/admin?password=Omitac116"
                subprocess.run(["open", url])
                print(f"🌐 Otevírám: {url}")
                
            elif choice == "3":
                if os.path.exists("ready_for_upload"):
                    subprocess.run(["open", "ready_for_upload"])
                    print("📂 Otevírám složku ready_for_upload/")
                else:
                    print("📂 Složka ready_for_upload/ neexistuje")
                    
            elif choice == "4":
                print("👋 Ukončuji...")
                break
                
            else:
                print("❌ Neplatná volba, zkuste znovu")
                
        except KeyboardInterrupt:
            print("\n\n👋 Ukončuji...")
            break
        except Exception as e:
            print(f"❌ Chyba: {e}")

if __name__ == "__main__":
    main()