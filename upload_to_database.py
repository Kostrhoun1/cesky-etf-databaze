#!/usr/bin/env python3
"""
Rychlé nahrání ETF dat do Supabase databáze
Použije již namačkaná data z final_scraper.py výstupu
"""
import json
import os
import sys
from dotenv import load_dotenv

# Načti environment variables z .env souboru
load_dotenv('.env')

try:
    from supabase import create_client, Client
    
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ CHYBA: Chybí Supabase credentials v .env souboru")
        sys.exit(1)
    
    # Vytvoř klienta s service role klíčem
    supabase = create_client(supabase_url, supabase_key)
    print("✅ Supabase klient inicializován s SERVICE_ROLE klíčem")
    
    # Najdi nejnovější FINAL soubor
    results_dir = "Scraper/justetf_complete_production/results"
    json_files = [f for f in os.listdir(results_dir) if f.startswith("FINAL_COMPLETE_WITH_DIVIDENDS") and f.endswith(".json")]
    json_files.sort()
    
    if not json_files:
        print("❌ CHYBA: Žádný FINAL soubor nenalezen")
        sys.exit(1)
    
    latest_file = json_files[-1]
    file_path = os.path.join(results_dir, latest_file)
    
    print(f"📁 Nahrávám data z: {latest_file}")
    print(f"📊 Velikost souboru: {os.path.getsize(file_path) / 1024 / 1024:.1f} MB")
    
    # Načti JSON data
    with open(file_path, 'r', encoding='utf-8') as f:
        etf_data = json.load(f)
    
    print(f"📈 Celkem ETF k nahrání: {len(etf_data)}")
    
    # Chunked upload pro veliké objemy dat
    chunk_size = 10
    success_count = 0
    total_chunks = (len(etf_data) + chunk_size - 1) // chunk_size
    
    print(f"🔄 Nahrávám v chunks po {chunk_size} ETF...")
    
    for i in range(0, len(etf_data), chunk_size):
        chunk = etf_data[i:i + chunk_size]
        chunk_num = (i // chunk_size) + 1
        
        try:
            print(f"📦 Chunk {chunk_num}/{total_chunks}: Nahrávám {len(chunk)} ETF...")
            
            # Upload chunk
            response = supabase.table('etf_funds').upsert(
                chunk,
                on_conflict='isin'
            ).execute()
            
            if response.data:
                success_count += len(chunk)
                print(f"✅ Chunk {chunk_num}: Úspěšně nahráno {len(chunk)} ETF")
            else:
                print(f"⚠️ Chunk {chunk_num}: Žádná data vrácena")
                
        except Exception as e:
            print(f"❌ Chunk {chunk_num}: Chyba - {e}")
            # Pokračuj i přes chyby
            continue
    
    print(f"\n🎯 Upload dokončen!")
    print(f"✅ Úspěšně nahráno: {success_count}/{len(etf_data)} ETF")
    print(f"📊 Úspěšnost: {success_count/len(etf_data)*100:.1f}%")
    
    # Ověř nahrání
    print("\n🔍 Ověřuji nahrání...")
    count_response = supabase.table('etf_funds').select('isin', count='exact').execute()
    total_in_db = count_response.count if hasattr(count_response, 'count') else 'Neznámo'
    print(f"📈 Celkem ETF v databázi: {total_in_db}")
    
except ImportError:
    print("❌ CHYBA: Supabase klient není nainstalován")
    print("Spusťte: pip install supabase python-dotenv")
    sys.exit(1)
except Exception as e:
    print(f"❌ CHYBA: {e}")
    sys.exit(1)