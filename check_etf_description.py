#!/usr/bin/env python3
"""
Kontrola popisů ETF v databázi
"""

import os
from supabase import create_client, Client

def check_etf_description():
    """Kontrola popisů konkrétního ETF"""
    
    SUPABASE_URL = "https://gowbjfkljabqnhyghvjd.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvd2JqZmtsamFicW5oeWdodmpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTk2MjM5MSwiZXhwIjoyMDQxNTM4MzkxfQ.OxWXHc7pPM7FWZ7FfyR1nRNcHOrsRIjHM2T1AxqLs60"
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Amundi Core MSCI USA
        isin = "IE000IEGVMH6"
        
        print(f'🔍 Kontrola ETF s ISIN: {isin}')
        print('='*60)
        
        # Hledáme v tabulce etf_funds
        result = supabase.table('etf_funds').select('*').eq('isin', isin).execute()
        
        if result.data:
            etf = result.data[0]
            print(f'📊 Název: {etf.get("name", "N/A")}')
            print(f'📊 ISIN: {etf.get("isin", "N/A")}')
            print()
            
            print('📝 ANGLICKÝ POPIS (description_en):')
            print(etf.get('description_en', 'Žádný anglický popis'))
            print()
            
            print('📝 ČESKÝ POPIS (description_cs):')
            print(etf.get('description_cs', 'Žádný český popis'))
            print()
            
            # Další relevantní pole
            print('📊 DALŠÍ POLE:')
            print(f'  - Provider: {etf.get("fund_provider", "N/A")}')
            print(f'  - Category: {etf.get("category", "N/A")}')
            print(f'  - Region: {etf.get("region", "N/A")}')
            print(f'  - Currency: {etf.get("fund_currency", "N/A")}')
            
        else:
            print(f'❌ ETF s ISIN {isin} nebyl nalezen')
            
            # Zkusíme hledat podle názvu
            print('\n🔍 Hledám podle názvu "Amundi Core MSCI USA"...')
            result = supabase.table('etf_funds').select('*').ilike('name', '%Amundi Core MSCI USA%').execute()
            
            if result.data:
                for etf in result.data:
                    print(f'✅ Nalezen: {etf.get("name")} ({etf.get("isin")})')
            else:
                print('❌ Nenalezen žádný ETF s názvem obsahujícím "Amundi Core MSCI USA"')
        
    except Exception as e:
        print(f'❌ Chyba: {e}')

if __name__ == "__main__":
    check_etf_description()