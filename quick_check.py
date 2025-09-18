#!/usr/bin/env python3

from supabase import create_client, Client

SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Check total counts
total_response = supabase.table('etf_funds').select('isin').execute()
print(f"Total ETFs: {len(total_response.data)}")

# Check leveraged count
leveraged_response = supabase.table('etf_funds').select('isin').eq('is_leveraged', True).execute()
print(f"Leveraged ETFs: {len(leveraged_response.data)}")

# Check XS2842095676 specifically
specific_response = supabase.table('etf_funds').select('isin,name,is_leveraged').eq('isin', 'XS2842095676').execute()
if specific_response.data:
    etf = specific_response.data[0]
    print(f"XS2842095676: {etf['name']} - is_leveraged: {etf['is_leveraged']}")
else:
    print("XS2842095676 not found")