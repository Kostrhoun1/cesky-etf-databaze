#!/usr/bin/env python3
"""
Kontrola performance dat v databázi
"""

import json
from supabase import create_client, Client

def check_performance_data():
    """Kontrola performance dat v databázi"""
    
    SUPABASE_URL = "https://gowbjfkljabqnhyghvjd.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvd2JqZmtsamFicW5oeWdodmpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTk2MjM5MSwiZXhwIjoyMDQxNTM4MzkxfQ.OxWXHc7pPM7FWZ7FfyR1nRNcHOrsRIjHM2T1AxqLs60"
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        print('🔍 KONTROLA PERFORMANCE DAT V DATABÁZI')
        print('='*60)
        
        # Test sample ETF
        test_isins = ["IE00B4L5Y983", "IE00B5BMR087", "IE000IEGVMH6"]
        
        for isin in test_isins:
            print(f'\n📊 Kontrola ETF: {isin}')
            
            result = supabase.table('etf_funds').select(
                'isin, name, return_1m, return_3m, return_6m, return_2021, return_2022, return_2023, return_2024'
            ).eq('isin', isin).execute()
            
            if result.data:
                etf = result.data[0]
                print(f'  Název: {etf.get("name", "N/A")}')
                print(f'  return_1m: {etf.get("return_1m", "N/A")}')
                print(f'  return_3m: {etf.get("return_3m", "N/A")}')
                print(f'  return_6m: {etf.get("return_6m", "N/A")}')
                print(f'  return_2021: {etf.get("return_2021", "N/A")}')
                print(f'  return_2022: {etf.get("return_2022", "N/A")}')
                print(f'  return_2023: {etf.get("return_2023", "N/A")}')
                print(f'  return_2024: {etf.get("return_2024", "N/A")}')
            else:
                print(f'  ❌ ETF nenalezen')
        
        # Zjistit kolik ETF má nová data
        print(f'\n📈 STATISTIKY NOVÝCH DAT:')
        
        # Count ETFs with new performance data
        fields_to_check = ['return_1m', 'return_3m', 'return_6m', 'return_2021', 'return_2022', 'return_2023', 'return_2024']
        
        for field in fields_to_check:
            result = supabase.table('etf_funds').select('isin', count='exact').neq(field, None).execute()
            count = result.count
            print(f'  {field}: {count} ETF má data')
        
        # Celkový počet ETF
        total_result = supabase.table('etf_funds').select('isin', count='exact').execute()
        total_count = total_result.count
        print(f'\n📊 Celkem ETF v databázi: {total_count}')
        
    except Exception as e:
        print(f'❌ Chyba: {e}')
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_performance_data()