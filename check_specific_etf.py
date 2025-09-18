#!/usr/bin/env python3

from supabase import create_client, Client

# Supabase credentials
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

def check_specific_etf():
    """Check specific ETF IE00BLS09N40 for leveraged keywords"""
    
    print("🔗 Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    # Leveraged keywords (same as in scraper)
    leveraged_keywords = [
        'leveraged', '2x', '3x', 'ultra', 'leverage', 'daily 2x', 'daily 3x',
        '2x leveraged', '3x leveraged', 'double', 'triple', 'geared'
    ]
    
    try:
        print("🔍 Checking IE00BLS09N40...")
        
        # Get the specific ETF
        response = supabase.table('etf_funds').select('*').eq('isin', 'IE00BLS09N40').execute()
        
        if not response.data:
            print("❌ ETF not found!")
            return
            
        etf = response.data[0]
        
        print(f"✅ Found ETF:")
        print(f"   ISIN: {etf['isin']}")
        print(f"   Name: {etf['name']}")
        print(f"   Category: {etf['category']}")
        print(f"   Is Leveraged: {etf['is_leveraged']}")
        print(f"   Index Name: {etf.get('index_name', 'N/A')}")
        print(f"   Investment Focus: {etf.get('investment_focus', 'N/A')}")
        
        # Check each field for leveraged keywords
        name_lower = (etf['name'] or '').lower()
        index_lower = (etf.get('index_name') or '').lower()
        focus_lower = (etf.get('investment_focus') or '').lower()
        
        print(f"\n🔍 Keyword analysis:")
        print(f"   Name (lowercase): '{name_lower}'")
        print(f"   Index (lowercase): '{index_lower}'")
        print(f"   Focus (lowercase): '{focus_lower}'")
        
        print(f"\n📊 Keyword matches:")
        name_matches = [kw for kw in leveraged_keywords if kw in name_lower]
        index_matches = [kw for kw in leveraged_keywords if kw in index_lower]
        focus_matches = [kw for kw in leveraged_keywords if kw in focus_lower]
        
        print(f"   Name matches: {name_matches}")
        print(f"   Index matches: {index_matches}")
        print(f"   Focus matches: {focus_matches}")
        
        # Determine if it should be leveraged
        should_be_leveraged = bool(name_matches or index_matches or focus_matches)
        print(f"\n🎯 Should be leveraged: {should_be_leveraged}")
        
        if should_be_leveraged and not etf['is_leveraged']:
            print(f"\n🔄 Manually updating this ETF...")
            
            update_response = supabase.table('etf_funds').update({
                'is_leveraged': True
            }).eq('isin', 'IE00BLS09N40').execute()
            
            if update_response.data:
                print(f"   ✅ Successfully updated!")
                
                # Verify
                verify_response = supabase.table('etf_funds').select('isin, name, category, is_leveraged').eq('isin', 'IE00BLS09N40').execute()
                if verify_response.data:
                    updated_etf = verify_response.data[0]
                    print(f"   📊 Verification:")
                    print(f"      Name: {updated_etf['name']}")
                    print(f"      Category: {updated_etf['category']}")
                    print(f"      Is Leveraged: {updated_etf['is_leveraged']}")
            else:
                print(f"   ❌ Update failed!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_specific_etf()