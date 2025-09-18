#!/usr/bin/env python3

import os
from supabase import create_client, Client

def test_specific_isin():
    url = os.environ.get("SUPABASE_URL", "https://uidorhhlqxrwljwcqmgf.supabase.co")
    key = os.environ.get("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZG9yaGhscXhyd2xqd2NxbWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3OTYzNjQsImV4cCI6MjAxMDM3MjM2NH0.3aHa8SvnwZKh5dYMjAEkq-vHj8kBgJMJZJGLqebGN3o")
    
    supabase: Client = create_client(url, key)
    
    try:
        print("🔍 Testing ISIN IE00B5BMR087...")
        
        response = supabase.from('etf_funds').select('isin,name,rating,rating_score').eq('isin', 'IE00B5BMR087').execute()
        
        if response.data and len(response.data) > 0:
            etf = response.data[0]
            print(f"✅ Found: {etf['name']}")
            print(f"   ISIN: {etf['isin']}")
            print(f"   Rating: {etf.get('rating', 'MISSING')} stars")
            print(f"   Score: {etf.get('rating_score', 'MISSING')}")
        else:
            print("❌ No data found for IE00B5BMR087")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_specific_isin()