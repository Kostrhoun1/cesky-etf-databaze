#!/usr/bin/env python3
"""
Manual script to add rating columns to Supabase database
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env')

def add_rating_columns():
    # Initialize Supabase client using correct credentials from .env file
    url = os.getenv('VITE_SUPABASE_URL', 'https://nbhwnatadyubiuadfakx.supabase.co')
    key = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY')
    supabase: Client = create_client(url, key)
    
    print("🔧 Manuální přidání rating sloupců do etf_funds tabulky...")
    
    # First get an existing record to test with
    try:
        response = supabase.table('etf_funds').select('isin').limit(1).execute()
        if not response.data:
            print("❌ Žádné záznamy v databázi")
            return
        
        test_isin = response.data[0]['isin']
        print(f"✅ Testovací ISIN: {test_isin}")
        
        # Try to update with rating columns - this should create them automatically
        print("🔧 Pokouším se vytvořit sloupce přidáním rating dat...")
        update_response = supabase.table('etf_funds').update({
            'rating': 4,
            'rating_score': 85
        }).eq('isin', test_isin).execute()
        
        print("✅ Rating sloupce úspěšně vytvořeny!")
        print(f"Aktualizováno: {update_response.data}")
        
        # Verify by reading back
        verify_response = supabase.table('etf_funds').select('isin, rating, rating_score').eq('isin', test_isin).execute()
        if verify_response.data:
            print("✅ Ověření úspěšné:")
            print(f"  ISIN: {verify_response.data[0]['isin']}")
            print(f"  Rating: {verify_response.data[0]['rating']}")
            print(f"  Rating Score: {verify_response.data[0]['rating_score']}")
        
    except Exception as e:
        print(f"❌ Chyba: {e}")

if __name__ == "__main__":
    add_rating_columns()