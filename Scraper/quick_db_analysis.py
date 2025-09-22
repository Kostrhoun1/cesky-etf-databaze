#!/usr/bin/env python3
"""
RYCHLÁ ANALÝZA DATABÁZE - HOLDINGS A SEKTORY
"""

import os
from supabase import create_client, Client

# Pevné hodnoty pro testování
SUPABASE_URL = "https://gowbjfkljabqnhyghvjd.supabase.co"
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvd2JqZmtsamFicW5oeWdodmpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTk2MjM5MSwiZXhwIjoyMDQxNTM4MzkxfQ.OxWXHc7pPM7FWZ7FfyR1nRNcHOrsRIjHM2T1AxqLs60"

def analyze_database():
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        print('📊 ANALÝZA HOLDINGS A SEKTORŮ V CELÉ DATABÁZI')
        print('='*60)
        
        # Základní statistiky
        result = supabase.table('etfs').select('*', count='exact').execute()
        total_etfs = result.count
        
        print(f'📈 Celkem ETF v databázi: {total_etfs:,}')
        
        # Quick holdings check - jen sample pro rychlost
        print('\\n🔍 Kontrola holdings (sample 2000 ETF)...')
        
        holdings_sample = supabase.table('etfs').select(
            'holding_1_name,holding_1_weight,holding_2_name,holding_2_weight,holding_3_name,holding_3_weight,holding_4_name,holding_4_weight,holding_5_name,holding_5_weight'
        ).limit(2000).execute()
        
        etfs_with_holdings = 0
        
        for etf in holdings_sample.data:
            has_holdings = any(
                etf.get(f'holding_{i}_name') and etf.get(f'holding_{i}_name').strip() 
                for i in range(1, 6)
            )
            if has_holdings:
                etfs_with_holdings += 1
        
        sample_size = len(holdings_sample.data)
        holdings_percentage = (etfs_with_holdings / sample_size) * 100
        
        print(f'\\n🏢 HOLDINGS VÝSLEDKY:')
        print(f'  Sample: {etfs_with_holdings}/{sample_size} ETF má holdings ({holdings_percentage:.1f}%)')
        print(f'  📊 Odhad pro celou DB: ~{(etfs_with_holdings/sample_size)*total_etfs:,.0f} ETF s holdings')
        
        # Quick sectors check
        print('\\n🔍 Kontrola sektorů (sample 2000 ETF)...')
        
        sectors_sample = supabase.table('etfs').select(
            'sector_1_name,sector_1_weight,sector_2_name,sector_2_weight,sector_3_name,sector_3_weight'
        ).limit(2000).execute()
        
        etfs_with_sectors = 0
        
        for etf in sectors_sample.data:
            has_sectors = any(
                etf.get(f'sector_{i}_name') and etf.get(f'sector_{i}_name').strip()
                for i in range(1, 4)
            )
            if has_sectors:
                etfs_with_sectors += 1
        
        sectors_percentage = (etfs_with_sectors / sample_size) * 100
        
        print(f'\\n🏭 SEKTORY VÝSLEDKY:')
        print(f'  Sample: {etfs_with_sectors}/{sample_size} ETF má sektory ({sectors_percentage:.1f}%)')
        print(f'  📊 Odhad pro celou DB: ~{(etfs_with_sectors/sample_size)*total_etfs:,.0f} ETF se sektory')
        
        # Quick countries check
        print('\\n🔍 Kontrola zemí (sample 2000 ETF)...')
        
        countries_sample = supabase.table('etfs').select(
            'country_1_name,country_1_weight,country_2_name,country_2_weight'
        ).limit(2000).execute()
        
        etfs_with_countries = 0
        
        for etf in countries_sample.data:
            has_countries = any(
                etf.get(f'country_{i}_name') and etf.get(f'country_{i}_name').strip()
                for i in range(1, 3)
            )
            if has_countries:
                etfs_with_countries += 1
        
        countries_percentage = (etfs_with_countries / sample_size) * 100
        
        print(f'\\n🌎 ZEMĚ VÝSLEDKY:')
        print(f'  Sample: {etfs_with_countries}/{sample_size} ETF má země ({countries_percentage:.1f}%)')
        print(f'  📊 Odhad pro celou DB: ~{(etfs_with_countries/sample_size)*total_etfs:,.0f} ETF se zeměmi')
        
        print(f'\\n📈 CELKOVÝ SOUHRN (odhady):')
        print('='*40)
        print(f'  🏢 Holdings pokrytí: ~{holdings_percentage:.1f}%')
        print(f'  🏭 Sektorové pokrytí: ~{sectors_percentage:.1f}%')
        print(f'  🌎 Geografické pokrytí: ~{countries_percentage:.1f}%')
        
    except Exception as e:
        print(f'❌ Chyba: {e}')
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    analyze_database()