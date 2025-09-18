#!/usr/bin/env python3

import os
from supabase import create_client, Client

def test_etf_ratings():
    url = os.environ.get("SUPABASE_URL", "https://uidorhhlqxrwljwcqmgf.supabase.co")
    key = os.environ.get("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZG9yaGhscXhyd2xqd2NxbWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3OTYzNjQsImV4cCI6MjAxMDM3MjM2NH0.3aHa8SvnwZKh5dYMjAEkq-vHj8kBgJMJZJGLqebGN3o")
    
    supabase: Client = create_client(url, key)
    
    try:
        print("🔍 Testing specific ETFs with known ratings...")
        
        # Test specific ETFs we know have ratings
        specific_isins = ['IE00B5BMR087', 'IE00B4L5Y983']
        
        for isin in specific_isins:
            response = supabase.from('etf_funds').select('isin,name,rating,rating_score').eq('isin', isin).execute()
            
            if response.data and len(response.data) > 0:
                etf = response.data[0]
                print(f"✅ {etf['name']} ({etf['isin']})")
                print(f"   Rating: {etf['rating']} stars | Score: {etf['rating_score']}")
            else:
                print(f"❌ No data found for {isin}")
        
        print("\n🔍 Testing top 10 ETFs by fund size...")
        
        response = supabase.from('etf_funds').select('isin,name,fund_size_numeric,rating,rating_score').order('fund_size_numeric', ascending=False).limit(10).execute()
        
        if response.data:
            print(f"Found {len(response.data)} ETFs:")
            for i, etf in enumerate(response.data):
                rating = etf.get('rating', 'NULL')
                rating_score = etf.get('rating_score', 'NULL')
                fund_size = etf.get('fund_size_numeric', 0)
                print(f"  {i+1}. {etf['name']}")
                print(f"     ISIN: {etf['isin']} | Size: €{fund_size:,.0f}M")
                print(f"     Rating: {rating} stars | Score: {rating_score}")
                print()
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_etf_ratings()