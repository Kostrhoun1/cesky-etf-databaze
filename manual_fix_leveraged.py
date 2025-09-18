#!/usr/bin/env python3

from supabase import create_client, Client

SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Definitive leveraged patterns
leveraged_patterns = [
    ('2x', 'Leveraged'),
    ('3x', 'Leveraged'), 
    ('5x', 'Leveraged'),
    ('Daily Leveraged', 'Leveraged'),
    ('Daily Short', 'Leveraged'),
    ('(-2x)', 'Inverse'),
    ('(-1x)', 'Inverse')
]

print("Fixing leveraged ETFs manually...")

updated_count = 0

for pattern, description in leveraged_patterns:
    print(f"\nLooking for ETFs with '{pattern}' pattern...")
    
    # Use ilike for case-insensitive search
    response = supabase.table('etf_funds').select('isin,name,is_leveraged').like('name', f'%{pattern}%').eq('is_leveraged', False).execute()
    
    if response.data:
        print(f"Found {len(response.data)} ETFs to update:")
        
        for etf in response.data:
            # Skip bond maturity funds
            if any(skip in etf['name'].lower() for skip in ['short maturity', 'short duration', 'short-term']):
                print(f"   ⏭️ Skipping (bond fund): {etf['name']}")
                continue
                
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

print(f"\n🎯 Total updated: {updated_count} ETFs")

# Final count
final_count = supabase.table('etf_funds').select('isin').eq('is_leveraged', True).execute()
print(f"📊 Total leveraged ETFs in database: {len(final_count.data)}")

print("\nDone!")