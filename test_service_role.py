#!/usr/bin/env python3
"""
Test Supabase service role functionality
- Add new column to test schema operations
- Test insert/update operations
"""

import os
from supabase import create_client, Client

# Supabase config
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"

# Try to find service role key
SERVICE_ROLE_KEY = (
    os.getenv('SUPABASE_SERVICE_ROLE_KEY') or 
    os.getenv('VITE_SUPABASE_SERVICE_ROLE_KEY') or 
    os.getenv('SUPABASE_SERVICE_KEY')
)

if SERVICE_ROLE_KEY:
    print(f"✅ Found service role key: {SERVICE_ROLE_KEY[:20]}...")
else:
    print("❌ Service role key not found, using anon key")
    SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

try:
    # Create Supabase client
    supabase: Client = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)
    print(f"✅ Supabase client created")
    
    # Test 1: Try to add a test column
    print("\n🧪 TEST 1: Schema modification (add column)")
    try:
        # Try to add a test column to etf_funds
        response = supabase.rpc('sql', {
            'query': '''
                ALTER TABLE etf_funds 
                ADD COLUMN IF NOT EXISTS test_claude_column TEXT DEFAULT 'test_value';
            '''
        }).execute()
        print("✅ Column added successfully!")
        print(f"Response: {response}")
    except Exception as e:
        print(f"❌ Schema modification failed: {e}")
    
    # Test 2: Try to insert data
    print("\n🧪 TEST 2: Data insertion")
    try:
        # Try to insert a test record
        test_data = {
            'isin': 'TEST123456789',
            'name': 'Claude Test ETF',
            'ter_numeric': 0.1,
            'category': 'Test',
            'region': 'Test'
        }
        
        response = supabase.table('etf_funds').insert(test_data).execute()
        print("✅ Data inserted successfully!")
        print(f"Inserted: {response.data}")
        
        # Clean up: delete the test record
        supabase.table('etf_funds').delete().eq('isin', 'TEST123456789').execute()
        print("✅ Test data cleaned up")
        
    except Exception as e:
        print(f"❌ Data insertion failed: {e}")
    
    # Test 3: Try to update existing data
    print("\n🧪 TEST 3: Data update")
    try:
        # Get first ETF and try to update it
        response = supabase.table('etf_funds').select('isin').limit(1).execute()
        if response.data:
            test_isin = response.data[0]['isin']
            
            # Try to update
            update_response = supabase.table('etf_funds').update({
                'test_claude_column': 'updated_by_claude'
            }).eq('isin', test_isin).execute()
            
            print(f"✅ Data updated successfully for ISIN: {test_isin}")
            print(f"Updated: {update_response.data}")
        else:
            print("❌ No ETF data found to update")
            
    except Exception as e:
        print(f"❌ Data update failed: {e}")
    
    # Test 4: Verify RLS is working
    print("\n🧪 TEST 4: RLS verification")
    try:
        # Count total ETF records
        response = supabase.table('etf_funds').select('isin', count='exact').execute()
        print(f"✅ Can read ETF data: {response.count} records found")
        
        # Try to read admin table (should work with service role)
        admin_response = supabase.table('app_admins').select('user_email').execute()
        print(f"✅ Can read admin data: {len(admin_response.data)} admin users")
        
    except Exception as e:
        print(f"❌ RLS verification failed: {e}")
    
    print("\n🎯 TEST SUMMARY:")
    print("- If schema operations succeed: service role is working")
    print("- If schema operations fail: using anon key (expected)")
    print("- If data operations succeed: RLS policies are correct")
    print("- If data operations fail: RLS policies need adjustment")
        
except Exception as e:
    print(f"❌ Failed to create Supabase client: {e}")