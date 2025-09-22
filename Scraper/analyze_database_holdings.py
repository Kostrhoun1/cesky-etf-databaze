#!/usr/bin/env python3
"""
ANALÝZA HOLDINGS A SEKTORŮ V DATABÁZI
"""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

def analyze_database_holdings():
    """Analýza holdings a sektorů v celé databázi"""
    
    # Načti environment variables
    load_dotenv()
    
    # Supabase konfigurace
    url = os.getenv('SUPABASE_URL', 'https://gowbjfkljabqnhyghvjd.supabase.co')
    service_role_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    
    if not service_role_key:
        print("❌ CHYBA: SUPABASE_SERVICE_ROLE_KEY není nastaven")
        return
    
    try:
        supabase: Client = create_client(url, service_role_key)
        
        print('📊 ANALÝZA HOLDINGS A SEKTORŮ V CELÉ DATABÁZI')
        print('='*60)
        
        # Základní statistiky
        result = supabase.table('etfs').select('*', count='exact').execute()
        total_etfs = result.count
        
        print(f'📈 Celkem ETF v databázi: {total_etfs}')
        
        # Holdings analýza
        print('\n🔍 Načítám holdings data...')
        holdings_fields = []
        for i in range(1, 11):
            holdings_fields.extend([f'holding_{i}_name', f'holding_{i}_weight'])
        
        holdings_data = supabase.table('etfs').select(','.join(holdings_fields)).execute()
        
        etfs_with_holdings = 0
        total_holdings_count = 0
        holdings_distribution = [0] * 11  # 0-10 holdings
        
        for etf in holdings_data.data:
            has_holdings = False
            holdings_count = 0
            
            for i in range(1, 11):
                name = etf.get(f'holding_{i}_name')
                weight = etf.get(f'holding_{i}_weight')
                
                if name and name.strip() and weight is not None:
                    holdings_count += 1
                    has_holdings = True
            
            if has_holdings:
                etfs_with_holdings += 1
                total_holdings_count += holdings_count
                holdings_distribution[holdings_count] += 1
        
        print(f'\n🏢 HOLDINGS ANALÝZA:')
        print(f'  ETF s holdings: {etfs_with_holdings:,}/{total_etfs:,} ({etfs_with_holdings/total_etfs*100:.1f}%)')
        if etfs_with_holdings > 0:
            print(f'  Průměrný počet holdings: {total_holdings_count/etfs_with_holdings:.1f}')
            print(f'  Celkem holdings záznamů: {total_holdings_count:,}')
        
        # Distribuce počtu holdings
        print(f'\n📊 DISTRIBUCE POČTU HOLDINGS:')
        for i in range(1, 11):
            if holdings_distribution[i] > 0:
                print(f'  {i} holdings: {holdings_distribution[i]:,} ETF ({holdings_distribution[i]/etfs_with_holdings*100:.1f}%)')
        
        # Sektorová analýza
        print('\n🔍 Načítám sektorová data...')
        sector_fields = []
        for i in range(1, 6):
            sector_fields.extend([f'sector_{i}_name', f'sector_{i}_weight'])
        
        sector_data = supabase.table('etfs').select(','.join(sector_fields)).execute()
        
        etfs_with_sectors = 0
        total_sector_count = 0
        sector_distribution = [0] * 6  # 0-5 sectors
        
        for etf in sector_data.data:
            has_sectors = False
            sector_count = 0
            
            for i in range(1, 6):
                name = etf.get(f'sector_{i}_name')
                weight = etf.get(f'sector_{i}_weight')
                
                if name and name.strip() and weight is not None:
                    sector_count += 1
                    has_sectors = True
            
            if has_sectors:
                etfs_with_sectors += 1
                total_sector_count += sector_count
                sector_distribution[sector_count] += 1
        
        print(f'\n🏭 SEKTOROVÁ ANALÝZA:')
        print(f'  ETF se sektory: {etfs_with_sectors:,}/{total_etfs:,} ({etfs_with_sectors/total_etfs*100:.1f}%)')
        if etfs_with_sectors > 0:
            print(f'  Průměrný počet sektorů: {total_sector_count/etfs_with_sectors:.1f}')
            print(f'  Celkem sektorových záznamů: {total_sector_count:,}')
        
        # Distribuce počtu sektorů
        print(f'\n📊 DISTRIBUCE POČTU SEKTORŮ:')
        for i in range(1, 6):
            if sector_distribution[i] > 0:
                print(f'  {i} sektory: {sector_distribution[i]:,} ETF ({sector_distribution[i]/etfs_with_sectors*100:.1f}%)')
        
        # Geografická analýza
        print('\n🔍 Načítám geografická data...')
        country_fields = []
        for i in range(1, 6):
            country_fields.extend([f'country_{i}_name', f'country_{i}_weight'])
        
        country_data = supabase.table('etfs').select(','.join(country_fields)).execute()
        
        etfs_with_countries = 0
        total_country_count = 0
        
        for etf in country_data.data:
            has_countries = False
            country_count = 0
            
            for i in range(1, 6):
                name = etf.get(f'country_{i}_name')
                weight = etf.get(f'country_{i}_weight')
                
                if name and name.strip() and weight is not None:
                    country_count += 1
                    has_countries = True
            
            if has_countries:
                etfs_with_countries += 1
                total_country_count += country_count
        
        print(f'\n🌎 GEOGRAFICKÁ ANALÝZA:')
        print(f'  ETF se zeměmi: {etfs_with_countries:,}/{total_etfs:,} ({etfs_with_countries/total_etfs*100:.1f}%)')
        if etfs_with_countries > 0:
            print(f'  Průměrný počet zemí: {total_country_count/etfs_with_countries:.1f}')
            print(f'  Celkem geografických záznamů: {total_country_count:,}')
        
        # Celkový souhrn
        print(f'\n📈 CELKOVÝ SOUHRN:')
        print('='*40)
        print(f'  🏢 Holdings pokrytí: {etfs_with_holdings/total_etfs*100:.1f}%')
        print(f'  🏭 Sektorové pokrytí: {etfs_with_sectors/total_etfs*100:.1f}%') 
        print(f'  🌎 Geografické pokrytí: {etfs_with_countries/total_etfs*100:.1f}%')
        
    except Exception as e:
        print(f"❌ Chyba při analýze databáze: {e}")
        return False

if __name__ == "__main__":
    analyze_database_holdings()