#!/usr/bin/env python3

from supabase import create_client, Client

SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def is_leveraged_etf(name):
    """Determine if an ETF is leveraged based on its name"""
    name_lower = name.lower()
    
    # Leveraged keywords - but exclude bond maturity funds
    leveraged_patterns = [
        '2x', '3x', '4x', '5x', 
        '(-2x)', '(-3x)', 
        'daily leveraged', 'daily short',
        'leveraged', 'short', 'inverse'
    ]
    
    # Exclude non-leveraged "short" funds
    non_leveraged_patterns = [
        'short maturity', 'short duration', 'short-term',
        'short term', 'short dated', 'short government'
    ]
    
    # Check if it contains leveraged patterns
    has_leveraged = any(pattern in name_lower for pattern in leveraged_patterns)
    
    # But exclude if it's just a maturity/duration fund
    is_excluded = any(pattern in name_lower for pattern in non_leveraged_patterns)
    
    return has_leveraged and not is_excluded

print("🔍 Finding all leveraged ETFs...")

# Get all ETFs that are currently not marked as leveraged
response = supabase.table('etf_funds').select('isin,name,is_leveraged').eq('is_leveraged', False).execute()
all_etfs = response.data

print(f"Found {len(all_etfs)} ETFs currently marked as non-leveraged")

leveraged_etfs_to_update = []

for etf in all_etfs:
    if is_leveraged_etf(etf['name']):
        leveraged_etfs_to_update.append(etf)

print(f"\n📈 Found {len(leveraged_etfs_to_update)} ETFs that should be marked as leveraged:")

for etf in leveraged_etfs_to_update:
    print(f"  - {etf['name']} ({etf['isin']})")

if leveraged_etfs_to_update:
    print(f"\n🔄 Updating {len(leveraged_etfs_to_update)} ETFs...")
    
    updated_count = 0
    for etf in leveraged_etfs_to_update:
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
    
    print(f"\n🎯 Update complete: {updated_count}/{len(leveraged_etfs_to_update)} ETFs updated")

# Final count
final_count = supabase.table('etf_funds').select('isin').eq('is_leveraged', True).execute()
print(f"\n📊 Total leveraged ETFs in database: {len(final_count.data)}")

print("\nDone!")