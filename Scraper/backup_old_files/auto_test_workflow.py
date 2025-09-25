#!/usr/bin/env python3
"""
AUTOMATICKÝ TEST CELÉHO WORKFLOW - bez user inputu
"""

import subprocess
import time
import os
import requests
import json
from datetime import datetime

def test_scraping_small():
    """Test scrapingu malého vzorku"""
    print("🧪 FÁZE 1: TEST SCRAPINGU")
    print("=" * 40)
    
    try:
        print("☕ Spouštím caffeinate...")
        caffeinate_process = subprocess.Popen(['caffeinate', '-d', '-i', '-s', '-u'])
        
        print("🚀 Scraping 3 ETF...")
        start_time = datetime.now()
        
        # Velmi malý test - jen 3 ETF
        process = subprocess.run([
            "python3", "final_scraper.py",
            "--csv", "ISIN.csv", 
            "--batch-size", "3"
        ], capture_output=True, text=True, timeout=300)  # 5 minut timeout
        
        end_time = datetime.now()
        duration = end_time - start_time
        
        if process.returncode == 0:
            print(f"✅ Scraping OK ({duration})")
            
            # Najdi CSV soubor
            result_dir = "justetf_complete_production/results"
            if os.path.exists(result_dir):
                csv_files = [f for f in os.listdir(result_dir) if f.endswith('.csv')]
                if csv_files:
                    latest_csv = max(csv_files, key=lambda f: os.path.getctime(os.path.join(result_dir, f)))
                    csv_path = os.path.join(result_dir, latest_csv)
                    print(f"📄 CSV vytvořen: {latest_csv}")
                    return csv_path
                else:
                    print("❌ Žádný CSV soubor nenalezen")
                    return None
            else:
                print("❌ Složka results neexistuje")
                return None
        else:
            print(f"❌ Scraping selhal: {process.stderr}")
            return None
            
    except subprocess.TimeoutExpired:
        print("❌ Scraping timeout")
        return None
    except Exception as e:
        print(f"❌ Chyba: {e}")
        return None
    finally:
        if 'caffeinate_process' in locals():
            caffeinate_process.terminate()

def check_web_app():
    """Zkontroluje, jestli běží web aplikace"""
    print("\n🌐 FÁZE 2: KONTROLA WEB APLIKACE")
    print("=" * 40)
    
    try:
        # Test admin stránky
        url = "http://localhost:8083/admin?password=Omitac116"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            print("✅ Web aplikace běží")
            print(f"📱 Admin stránka: {url}")
            return True
        else:
            print(f"❌ Web aplikace vrací: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Web aplikace neběží")
        print("💡 Spusťte: npm run dev v ETF složce")
        return False
    except Exception as e:
        print(f"❌ Chyba při kontrole: {e}")
        return False

def test_csv_content(csv_path):
    """Test obsahu CSV souboru"""
    print("\n📄 FÁZE 3: KONTROLA CSV OBSAHU")
    print("=" * 40)
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.strip().split('\n')
        print(f"📊 Počet řádků: {len(lines)}")
        
        if len(lines) > 1:  # Header + alespoň 1 ETF
            header = lines[0]
            print(f"📋 Header: {header[:100]}...")
            
            # Zkontroluj důležité sloupce
            required_columns = ['isin', 'name', 'fund_provider', 'category']
            header_lower = header.lower()
            
            missing_columns = []
            for col in required_columns:
                if col not in header_lower:
                    missing_columns.append(col)
            
            if missing_columns:
                print(f"⚠️  Chybí sloupce: {missing_columns}")
            else:
                print("✅ Všechny základní sloupce OK")
            
            # Ukáž první ETF
            if len(lines) > 1:
                first_etf = lines[1]
                print(f"📈 První ETF: {first_etf[:150]}...")
            
            return True
        else:
            print("❌ CSV je prázdný nebo má jen header")
            return False
            
    except Exception as e:
        print(f"❌ Chyba při čtení CSV: {e}")
        return False

def copy_to_ready_folder(csv_path):
    """Zkopíruje CSV do ready_for_upload složky"""
    print("\n📁 FÁZE 4: PŘÍPRAVA PRO UPLOAD")
    print("=" * 40)
    
    try:
        ready_dir = "ready_for_upload"
        os.makedirs(ready_dir, exist_ok=True)
        
        import shutil
        filename = f"test_etf_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        dest_path = os.path.join(ready_dir, filename)
        
        shutil.copy2(csv_path, dest_path)
        print(f"✅ CSV zkopírován: {dest_path}")
        
        return dest_path
        
    except Exception as e:
        print(f"❌ Chyba při kopírování: {e}")
        return None

def show_upload_info(ready_path):
    """Zobrazí informace pro upload"""
    print("\n📤 FÁZE 5: INFORMACE PRO UPLOAD")
    print("=" * 40)
    
    print("💡 Pro testování upload do Supabase:")
    print("1. Otevřete: http://localhost:8083/admin?password=Omitac116")
    print(f"2. Nahrajte soubor: {ready_path}")
    print("3. Zkontrolujte úspěšné zpracování v konzoli")
    print("4. Ověřte data v Supabase Dashboard")

def main():
    print("🧪 AUTOMATICKÝ TEST CELÉHO ETF WORKFLOW")
    print("=" * 50)
    print(f"Čas: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Zkontroluj soubory
    required_files = ["final_scraper.py", "ISIN.csv"]
    missing = [f for f in required_files if not os.path.exists(f)]
    
    if missing:
        print(f"❌ Chybí soubory: {', '.join(missing)}")
        return
    
    print("✅ Všechny soubory nalezeny")
    
    # FÁZE 1: Scraping
    csv_path = test_scraping_small()
    if not csv_path:
        print("\n❌ Test ukončen - scraping selhal")
        return
    
    # FÁZE 2: Web app check
    web_ok = check_web_app()
    
    # FÁZE 3: CSV kontrola
    csv_ok = test_csv_content(csv_path)
    if not csv_ok:
        print("\n❌ Test ukončen - CSV problém")
        return
    
    # FÁZE 4: Příprava pro upload
    ready_path = copy_to_ready_folder(csv_path)
    if not ready_path:
        print("\n❌ Test ukončen - kopírování selhalo")
        return
    
    # FÁZE 5: Upload informace
    show_upload_info(ready_path)
    
    # VÝSLEDEK
    print("\n" + "=" * 50)
    print("🎉 KOMPLETNÍ TEST DOKONČEN!")
    print("=" * 50)
    print("✅ Scraping funguje")
    print("✅ CSV se vytváří správně") 
    print("✅ Data jsou připravena pro upload")
    
    if web_ok:
        print("✅ Web aplikace běží - můžete testovat upload")
        
        # Automaticky otevři upload stránku a složku
        subprocess.run(["open", "http://localhost:8083/admin?password=Omitac116"])
        subprocess.run(["open", os.path.dirname(ready_path)])
        
        print(f"\n📂 Otevřena složka s testovacím CSV")
        print(f"🌐 Otevřena upload stránka")
        print(f"📄 Nahrajte: {os.path.basename(ready_path)}")
    else:
        print("⚠️  Web aplikace neběží - spusťte 'npm run dev' v ETF složce")

if __name__ == "__main__":
    main()