#!/usr/bin/env python3

"""
Test script to verify rating functionality for frontend
"""

import os
from supabase import create_client, Client

def test_frontend_rating():
    """Test that rating fields are accessible via the same query the frontend uses"""
    url = os.environ.get("SUPABASE_URL", "https://uidorhhlqxrwljwcqmgf.supabase.co")
    key = os.environ.get("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZG9yaGhscXhyd2xqd2NxbWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3OTYzNjQsImV4cCI6MjAxMDM3MjM2NH0.3aHa8SvnwZKh5dYMjAEkq-vHj8kBgJMJZJGLqebGN3o")
    
    supabase: Client = create_client(url, key)
    
    try:
        print("🔍 Testing frontend-style rating query...")
        
        # Use the exact same SELECT query as the frontend
        select_fields = (
            "isin,name,fund_provider,category,ter_numeric,return_1y,return_3y,return_5y,return_ytd,"
            "fund_size_numeric,degiro_free,primary_ticker,distribution_policy,index_name,fund_currency,"
            "replication,region,current_dividend_yield_numeric,exchange_1_ticker,exchange_2_ticker,"
            "exchange_3_ticker,exchange_4_ticker,exchange_5_ticker,rating,rating_score,updated_at"
        )
        response = supabase.from('etf_funds').select(select_fields).order('fund_size_numeric', ascending=False).limit(5).execute()
        
        if response.data:
            print(f"✅ Query succeeded! Found {len(response.data)} ETFs")
            for i, etf in enumerate(response.data):
                rating = etf.get('rating', 'NULL')
                rating_score = etf.get('rating_score', 'NULL')
                print(f"  {i+1}. {etf['name']}")
                print(f"     ISIN: {etf['isin']}")
                print(f"     Rating: {rating} stars | Score: {rating_score}")
                print()
            return True
        else:
            print("❌ Query returned no data")
            return False
            
    except Exception as e:
        print(f"❌ Query failed with error: {e}")
        return False

if __name__ == "__main__":
    success = test_frontend_rating()
    if success:
        print("🎉 Rating functionality test PASSED - frontend should work correctly!")
    else:
        print("💥 Rating functionality test FAILED")