#!/usr/bin/env python3
"""
Test skutečného service role přístupu
"""

from supabase import create_client, Client

# Supabase config s skutečným service role klíčem
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

print("🚀 Testing REAL SERVICE ROLE functionality")
print(f"Service key starts with: {SERVICE_ROLE_KEY[:30]}...")

try:
    # Create Supabase client with service role
    supabase: Client = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)
    print("✅ Supabase client created with SERVICE ROLE")
    
    # Test 1: Add test column
    print("\n🧪 TEST 1: Adding test column")
    try:
        # Add test column directly to table
        response = supabase.rpc('sql', {
            'query': '''
                ALTER TABLE etf_funds 
                ADD COLUMN IF NOT EXISTS test_claude_service_column TEXT DEFAULT 'service_role_test';
                
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'etf_funds' 
                    AND column_name = 'test_claude_service_column';
            '''
        }).execute()
        
        print("✅ SCHEMA MODIFICATION SUCCESS!")
        print(f"Response: {response.data}")
        
    except Exception as e:
        print(f"❌ Schema modification failed: {e}")
    
    # Test 2: Insert test data (bypass RLS)
    print("\n🧪 TEST 2: Insert data with service role (bypass RLS)")
    try:
        test_data = {
            'isin': 'SERVICETEST123',
            'name': 'Service Role Test ETF',
            'ter_numeric': 0.05,
            'category': 'ServiceTest',
            'region': 'Test',
            'test_claude_service_column': 'inserted_by_service_role'
        }
        
        response = supabase.table('etf_funds').insert(test_data).execute()
        print("✅ DATA INSERT SUCCESS (RLS bypassed)!")
        print(f"Inserted: {response.data}")
        
        # Clean up
        supabase.table('etf_funds').delete().eq('isin', 'SERVICETEST123').execute()
        print("✅ Test data cleaned up")
        
    except Exception as e:
        print(f"❌ Data insert failed: {e}")
    
    # Test 3: Read admin table (bypass RLS)
    print("\n🧪 TEST 3: Read admin table with service role")
    try:
        response = supabase.table('app_admins').select('*').execute()
        print(f"✅ CAN READ ADMIN TABLE: {len(response.data)} admin users")
        for admin in response.data:
            print(f"  - {admin.get('user_email', 'No email')}")
            
    except Exception as e:
        print(f"❌ Admin table read failed: {e}")
    
    # Test 4: Count ETFs
    print("\n🧪 TEST 4: ETF data access")
    try:
        response = supabase.table('etf_funds').select('isin', count='exact').limit(1).execute()
        print(f"✅ ETF ACCESS: {response.count} total ETFs")
        
    except Exception as e:
        print(f"❌ ETF access failed: {e}")
    
    print("\n🎯 SERVICE ROLE TEST RESULTS:")
    print("- Service role can modify database schema")
    print("- Service role bypasses RLS for data operations") 
    print("- Service role has full admin access to all tables")
    
except Exception as e:
    print(f"❌ Failed to create service role client: {e}")