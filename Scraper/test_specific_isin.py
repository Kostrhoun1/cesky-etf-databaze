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
            print(f"   Rating: {etf['rating']} stars")
            print(f"   Score: {etf['rating_score']}")
            
            # Try select * as well
            print("\n🔍 Testing select * query...")
            response2 = supabase.from('etf_funds').select('*').eq('isin', 'IE00B5BMR087').single().execute()
            if response2.data:
                print(f"✅ Select * works - has rating: {response2.data.get('rating', 'MISSING')}")
                print(f"   Available keys: {list(response2.data.keys())[:10]}...")  # First 10 keys
            else:
                print("❌ Select * failed")
                
        else:
            print("❌ No data found for IE00B5BMR087")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_specific_isin()