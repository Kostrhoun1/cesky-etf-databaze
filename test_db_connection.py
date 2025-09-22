#!/usr/bin/env python3
"""
Test database connection and basic queries
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env')

def test_database_connection():
    """Test connection to Supabase and run basic queries"""
    
    # Initialize Supabase client
    url = os.getenv('VITE_SUPABASE_URL')
    key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')  # Use service role for full access
    
    if not url or not key:
        print("❌ Missing Supabase credentials in .env file")
        return
    
    print(f"🔗 Connecting to: {url}")
    supabase: Client = create_client(url, key)
    
    try:
        # Test basic connection with count
        print("\n📊 Testing basic connection...")
        result = supabase.table('etf_funds').select('*', count='exact').limit(1).execute()
        total_count = result.count
        print(f"✅ Connected! Total ETFs in database: {total_count:,}")
        
        # Test regions query
        print("\n🌍 Checking regions...")
        regions_result = supabase.table('etf_funds').select('region').execute()
        regions = {}
        for row in regions_result.data:
            region = row.get('region', 'NULL')
            regions[region] = regions.get(region, 0) + 1
        
        print("Regions in database:")
        for region, count in sorted(regions.items(), key=lambda x: x[1], reverse=True):
            print(f"  {region}: {count:,}")
        
        # Test specific query
        print("\n🔍 Sample query - US/North America ETFs...")
        us_etfs = supabase.table('etf_funds').select('name,region').eq('region', 'Severní Amerika').limit(5).execute()
        print("Sample North America ETFs:")
        for etf in us_etfs.data:
            print(f"  - {etf['name']} ({etf['region']})")
            
        print("\n✅ Database connection test completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

if __name__ == "__main__":
    test_database_connection()