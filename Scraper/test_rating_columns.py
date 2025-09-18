#!/usr/bin/env python3
"""
Test skript pro ověření existence rating sloupců v databázi
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Načti environment variables
load_dotenv('../.env')

def test_rating_columns():
    """Test existence rating sloupců v databázi"""
    
    # Initialize Supabase client
    url = os.getenv('VITE_SUPABASE_URL')
    key = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')
    
    if not url or not key:
        print("❌ Chybí Supabase credentials")
        return False
        
    supabase: Client = create_client(url, key)
    
    print("🔍 Testuji existence rating sloupců...")
    
    try:
        # Test 1: Zkus načíst data včetně rating sloupců
        print("📊 Test 1: Zkouším SELECT s rating sloupci...")
        response = supabase.table('etf_funds').select('isin, name, rating, rating_score').limit(3).execute()
        
        if response.data:
            print("✅ Rating sloupce EXISTUJÍ!")
            print(f"Nalezeno {len(response.data)} záznamů:")
            for item in response.data:
                print(f"  - {item['isin']}: {item['name']} | Rating: {item.get('rating', 'NULL')} | Score: {item.get('rating_score', 'NULL')}")
            return True
        else:
            print("⚠️  Žádná data v databázi")
            return False
            
    except Exception as e:
        print(f"❌ Rating sloupce NEEXISTUJÍ!")
        print(f"   Chyba: {e}")
        
        # Test 2: Zkus alespoň základní dotaz bez rating sloupců
        print("\n📊 Test 2: Zkouším základní SELECT bez rating sloupců...")
        try:
            response2 = supabase.table('etf_funds').select('isin, name').limit(3).execute()
            if response2.data:
                print(f"✅ Databáze funguje, má {len(response2.data)} záznamů")
                print("❌ Ale rating sloupce chybí")
            else:
                print("❌ Databáze je prázdná")
        except Exception as e2:
            print(f"❌ Celková chyba databáze: {e2}")
        
        return False

if __name__ == "__main__":
    test_rating_columns()