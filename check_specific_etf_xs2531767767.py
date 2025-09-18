#!/usr/bin/env python3

from supabase import create_client, Client

SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0NDc0NCwiZXhwIjoyMDY0NDIwNzQ0fQ.SI_s72FBMs2qSqhKBsm7ZJSnPOnCEfWn1zQ6nxMtgyo"

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Check XS2531767767 specifically
response = supabase.table('etf_funds').select('*').eq('isin', 'XS2531767767').execute()
if response.data:
    etf = response.data[0]
    print(f"ISIN: {etf['isin']}")
    print(f"Name: {etf['name']}")
    print(f"Category: {etf['category']}")
    print(f"Is Leveraged: {etf['is_leveraged']}")
    print(f"Index Name: {etf.get('index_name', 'N/A')}")
    print(f"Investment Focus: {etf.get('investment_focus', 'N/A')}")
    print(f"Return YTD: {etf.get('return_ytd', 'N/A')}")
    print(f"Fund Size: {etf.get('fund_size_numeric', 'N/A')}")
else:
    print("XS2531767767 not found")

# Check top 10 ETFs by YTD return
print("\n=== TOP 10 ETFs by YTD return ===")
top_ytd = supabase.table('etf_funds').select('isin,name,category,is_leveraged,return_ytd').order('return_ytd', ascending=False).limit(10).execute()
if top_ytd.data:
    for i, etf in enumerate(top_ytd.data, 1):
        print(f"{i}. {etf['name']} ({etf['isin']}) - YTD: {etf.get('return_ytd', 'N/A')}% - Leveraged: {etf['is_leveraged']}")