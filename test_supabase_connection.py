#!/usr/bin/env python3

import os
from supabase import create_client, Client

# Supabase credentials
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

def test_supabase_connection():
    """Test connection to Supabase and check is_leveraged field"""
    
    print("🔗 Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    try:
        print("✅ Connected successfully!")
        
        # Test 1: Check if is_leveraged column exists
        print("\n📊 Testing is_leveraged field...")
        
        # Query the problematic ETF
        response = supabase.table('etf_funds').select('isin, name, category, is_leveraged').eq('isin', 'IE00BLS09N40').execute()
        
        if response.data:
            etf = response.data[0]
            print(f"✅ Found ETF: {etf['name']}")
            print(f"   ISIN: {etf['isin']}")
            print(f"   Category: {etf['category']}")
            print(f"   Is Leveraged: {etf.get('is_leveraged', 'FIELD NOT FOUND')}")
        else:
            print("❌ ETF IE00BLS09N40 not found in database")
            
        # Test 2: Count leveraged ETFs
        print("\n📈 Counting leveraged ETFs...")
        leveraged_response = supabase.table('etf_funds').select('isin, name, category, is_leveraged').eq('is_leveraged', True).execute()
        
        print(f"   Total leveraged ETFs: {len(leveraged_response.data)}")
        
        if leveraged_response.data:
            print("   First 5 leveraged ETFs:")
            for etf in leveraged_response.data[:5]:
                print(f"      - {etf['name']} ({etf['category']}) - {etf['isin']}")
        
        # Test 3: Check table schema
        print("\n🗂️  Checking table structure...")
        schema_response = supabase.table('etf_funds').select('*').limit(1).execute()
        
        if schema_response.data:
            columns = list(schema_response.data[0].keys())
            has_is_leveraged = 'is_leveraged' in columns
            print(f"   is_leveraged column exists: {'✅' if has_is_leveraged else '❌'}")
            print(f"   Total columns: {len(columns)}")
            
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_supabase_connection()