#!/usr/bin/env python3

from supabase import create_client, Client

# Supabase credentials
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

def update_leveraged_etfs():
    """Find and mark leveraged ETFs in existing database"""
    
    print("🔗 Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    # Leveraged keywords (same as in scraper)
    leveraged_keywords = [
        'leveraged', '2x', '3x', 'ultra', 'leverage', 'daily 2x', 'daily 3x',
        '2x leveraged', '3x leveraged', 'double', 'triple', 'geared'
    ]
    
    try:
        print("📊 Fetching all ETFs...")
        
        # Get all ETFs
        response = supabase.table('etf_funds').select('isin, name, index_name, investment_focus, category, is_leveraged').execute()
        
        etfs = response.data
        print(f"   Total ETFs: {len(etfs)}")
        
        leveraged_etfs = []
        
        print("\n🔍 Scanning for leveraged ETFs...")
        
        for etf in etfs:
            name_lower = (etf['name'] or '').lower()
            index_lower = (etf['index_name'] or '').lower()
            focus_lower = (etf['investment_focus'] or '').lower()
            
            # Check if any leveraged keyword is present
            is_leveraged = (
                any(keyword in name_lower for keyword in leveraged_keywords) or
                any(keyword in index_lower for keyword in leveraged_keywords) or
                any(keyword in focus_lower for keyword in leveraged_keywords)
            )
            
            if is_leveraged and not etf['is_leveraged']:
                leveraged_etfs.append({
                    'isin': etf['isin'],
                    'name': etf['name'],
                    'category': etf['category']
                })
                print(f"   📈 Found: {etf['name']} ({etf['category']}) - {etf['isin']}")
        
        print(f"\n📊 Summary:")
        print(f"   Found {len(leveraged_etfs)} leveraged ETFs to update")
        
        if leveraged_etfs:
            print(f"\n⚠️  About to update {len(leveraged_etfs)} ETFs:")
            for etf in leveraged_etfs:
                print(f"      - {etf['name']} ({etf['category']})")
            
            confirm = input(f"\n❓ Update these {len(leveraged_etfs)} ETFs? (y/N): ")
            
            if confirm.lower() == 'y':
                print("\n🔄 Updating leveraged ETFs...")
                
                updated_count = 0
                for etf in leveraged_etfs:
                    try:
                        update_response = supabase.table('etf_funds').update({
                            'is_leveraged': True
                        }).eq('isin', etf['isin']).execute()
                        
                        if update_response.data:
                            updated_count += 1
                            print(f"   ✅ Updated: {etf['name']}")
                        else:
                            print(f"   ❌ Failed: {etf['name']}")
                            
                    except Exception as e:
                        print(f"   ❌ Error updating {etf['name']}: {e}")
                
                print(f"\n🎯 Update complete: {updated_count}/{len(leveraged_etfs)} ETFs updated")
                
                # Verify the problematic ETF
                print(f"\n🔍 Checking IE00BLS09N40...")
                verify_response = supabase.table('etf_funds').select('isin, name, category, is_leveraged').eq('isin', 'IE00BLS09N40').execute()
                
                if verify_response.data:
                    etf = verify_response.data[0]
                    print(f"   Name: {etf['name']}")
                    print(f"   Category: {etf['category']}")
                    print(f"   Is Leveraged: {etf['is_leveraged']}")
                
            else:
                print("❌ Update cancelled")
        else:
            print("ℹ️  No leveraged ETFs found to update")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    update_leveraged_etfs()