#!/usr/bin/env python3

from supabase import create_client, Client

SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Check XS2531767767 specifically
response = supabase.table('etf_funds').select('isin,name,is_leveraged,return_ytd').eq('isin', 'XS2531767767').execute()
if response.data:
    etf = response.data[0]
    print(f"XS2531767767:")
    print(f"  Name: {etf['name']}")
    print(f"  Is Leveraged: {etf['is_leveraged']}")
    print(f"  YTD Return: {etf.get('return_ytd', 'N/A')}")
else:
    print("XS2531767767 not found")

# Check what should be top non-leveraged ETFs by YTD
print("\n=== TOP 10 NON-LEVERAGED ETFs by YTD return ===")
top_nonleveraged = supabase.table('etf_funds').select('isin,name,is_leveraged,return_ytd').eq('is_leveraged', False).order('return_ytd').execute()

if top_nonleveraged.data:
    # Sort by return_ytd descending manually
    sorted_etfs = sorted(top_nonleveraged.data, key=lambda x: x.get('return_ytd', -999), reverse=True)
    
    print("Top performing non-leveraged ETFs:")
    for i, etf in enumerate(sorted_etfs[:10], 1):
        ytd = etf.get('return_ytd', 'N/A')
        print(f"{i}. {etf['name']} ({etf['isin']}) - YTD: {ytd}%")