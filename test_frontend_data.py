#!/usr/bin/env python3

from supabase import create_client, Client

SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

def test_frontend_data():
    print("🔗 Connecting to Supabase...")
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    try:
        print("📊 Testing limited query (like frontend)...")
        fields = 'isin,name,fund_provider,category,is_leveraged,ter_numeric,fund_size_numeric'
        response = supabase.from('etf_funds').select(fields).order('fund_size_numeric', ascending=False).limit(10).execute()
        
        if response.data:
            print(f"\n✅ Found {len(response.data)} ETFs")
            print("\n🔍 First few ETFs with leverage info:")
            for i, etf in enumerate(response.data[:5]):
                print(f"  {i+1}. {etf['name']}")
                print(f"      ISIN: {etf['isin']}")
                print(f"      Category: {etf['category']}")
                print(f"      Is Leveraged: {etf.get('is_leveraged', 'MISSING!')}")
                print(f"      Fund Size: {etf.get('fund_size_numeric', 'N/A')}")
                print()
                
            leveraged_count = sum(1 for etf in response.data if etf.get('is_leveraged') == True)
            print(f"📈 Leveraged ETFs in top 10: {leveraged_count}")
            
            missing_leveraged_field = sum(1 for etf in response.data if 'is_leveraged' not in etf)
            print(f"⚠️  Records missing is_leveraged field: {missing_leveraged_field}")
            
        else:
            print("❌ No data returned!")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_frontend_data()