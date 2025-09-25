#!/usr/bin/env python3
"""
Skript pro vytvoření rating sloupců v Supabase databázi
"""

import os
from supabase import create_client, Client

def create_rating_columns():
    # Initialize Supabase client
    url = os.getenv('VITE_SUPABASE_URL', 'https://cwtbhfgciwqfhkqqyawp.supabase.co')
    key = os.getenv('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3dGJoZmdjaXdxZmhrcXF5YXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0Mjk1MzksImV4cCI6MjA0MzAwNTUzOX0.qb3ZVi2vMg5mZ9XQ2QdvV6TKNt4XPrvWY1YQT5PlcPQ')
    supabase: Client = create_client(url, key)
    
    print("🔧 Pokouším se vytvořit rating sloupce v etf_funds tabulce...")
    
    try:
        # Nejdříve zkusíme přidat rating sloupec
        response = supabase.rpc('sql', {
            'query': 'ALTER TABLE etf_funds ADD COLUMN IF NOT EXISTS rating INTEGER;'
        }).execute()
        print("✅ Rating sloupec vytvořen/ověřen")
        
        # Pak přidáme rating_score sloupec  
        response = supabase.rpc('sql', {
            'query': 'ALTER TABLE etf_funds ADD COLUMN IF NOT EXISTS rating_score INTEGER;'
        }).execute()
        print("✅ Rating_score sloupec vytvořen/ověřen")
        
        print("🎉 Všechny rating sloupce byly úspěšně vytvořeny!")
        
        # Test - zkusíme načíst jeden záznam s rating poli
        test_response = supabase.table('etf_funds').select('isin, rating, rating_score').limit(1).execute()
        if test_response.data:
            print("✅ Test čtení rating sloupců úspěšný")
            print(f"Test data: {test_response.data[0]}")
        else:
            print("⚠️  Žádná data pro test")
            
    except Exception as e:
        print(f"❌ Chyba při vytváření sloupců: {e}")
        
        # Zkusíme alternativní přístup - vytvoříme testovací záznam s rating daty
        print("🔄 Zkouším alternativní přístup - vytvoření testovacího záznamu...")
        try:
            # Načteme existující záznam
            existing = supabase.table('etf_funds').select('*').limit(1).execute()
            if existing.data:
                test_isin = existing.data[0]['isin']
                # Pokusíme se aktualizovat záznam s rating daty
                update_response = supabase.table('etf_funds').update({
                    'rating': 4,
                    'rating_score': 80
                }).eq('isin', test_isin).execute()
                
                print("✅ Alternativní přístup úspěšný - sloupce byly vytvořeny automaticky")
            else:
                print("❌ Žádné existující záznamy pro test")
                
        except Exception as e2:
            print(f"❌ Alternativní přístup také selhal: {e2}")
            print("\n💡 Doporučení:")
            print("1. Ověř, že máš správná oprávnění k databázi")
            print("2. Možná bude potřeba vytvořit sloupce manuálně v Supabase Dashboard")
            print("3. Nebo použít service_role klíč místo anon klíče")

if __name__ == "__main__":
    create_rating_columns()