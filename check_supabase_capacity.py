#!/usr/bin/env python3
"""
Script pro zjištění aktuálního využití Supabase databáze
"""

import os
from supabase import create_client, Client
import json
from datetime import datetime

# Supabase konfigurace z .env
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    """Vytvoří Supabase klienta"""
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def check_database_size():
    """Zjistí velikost databáze a jednotlivých tabulek"""
    print("🔍 ANALÝZA VELIKOSTI SUPABASE DATABÁZE")
    print("=" * 50)
    
    supabase = get_supabase_client()
    
    try:
        # Počet ETF fondů
        etf_count_response = supabase.table('etf_funds').select('isin', count='exact').execute()
        etf_count = etf_count_response.count
        print(f"📊 Počet ETF fondů: {etf_count:,}")
        
        # Vzorkovost dat - kolik ETF má vyplněné klíčové údaje
        etf_sample = supabase.table('etf_funds').select('isin,name,ter_numeric,return_1y,fund_size_numeric,primary_ticker').limit(10).execute()
        
        filled_fields = {
            'name': 0,
            'ter_numeric': 0, 
            'return_1y': 0,
            'fund_size_numeric': 0,
            'primary_ticker': 0
        }
        
        for etf in etf_sample.data:
            for field in filled_fields:
                if etf.get(field) and str(etf.get(field)).strip() not in ['', '0', 'None', 'null']:
                    filled_fields[field] += 1
        
        print(f"\n📋 Vzorkovost dat (z {len(etf_sample.data)} ETF):")
        for field, count in filled_fields.items():
            percentage = (count / len(etf_sample.data)) * 100
            print(f"   {field}: {count}/{len(etf_sample.data)} ({percentage:.0f}%)")
        
        # ETF s tickery
        etf_with_tickers = supabase.table('etf_funds').select('isin').not_.is_('primary_ticker', 'null').execute()
        print(f"\n🎯 ETF s primary_ticker: {len(etf_with_tickers.data):,}")
        
        # ETF s exchange tickery
        etf_with_exchange_tickers = supabase.table('etf_funds').select('isin').not_.is_('exchange_1_ticker', 'null').execute()
        print(f"🎯 ETF s exchange_1_ticker: {len(etf_with_exchange_tickers.data):,}")
        
        # Celkový počet ticker polí co nejsou null
        ticker_fields = ['primary_ticker', 'exchange_1_ticker', 'exchange_2_ticker', 'exchange_3_ticker', 'exchange_4_ticker', 'exchange_5_ticker']
        total_tickers = 0
        
        for field in ticker_fields:
            response = supabase.table('etf_funds').select('isin').not_.is_(field, 'null').execute()
            field_count = len(response.data)
            total_tickers += field_count
            print(f"   {field}: {field_count:,}")
        
        print(f"\n📈 Celkem ticker záznamů: {total_tickers:,}")
        
        # Odhad velikosti řádku
        sample_etf = supabase.table('etf_funds').select('*').limit(1).execute()
        if sample_etf.data:
            # Hrubý odhad - každý řádek má cca 150 polí, průměrně 20 znaků = 3KB per řádek
            estimated_row_size = 3  # KB
            estimated_total_size = etf_count * estimated_row_size
            
            print(f"\n💾 Odhad velikosti:")
            print(f"   Velikost řádku: ~{estimated_row_size} KB")
            print(f"   Celková velikost ETF tabulky: ~{estimated_total_size:,} KB ({estimated_total_size/1024:.1f} MB)")
        
        return {
            'etf_count': etf_count,
            'etf_with_primary_ticker': len(etf_with_tickers.data),
            'etf_with_exchange_ticker': len(etf_with_exchange_tickers.data),
            'total_ticker_fields': total_tickers,
            'estimated_size_mb': estimated_total_size/1024 if 'estimated_total_size' in locals() else 0,
            'data_quality': filled_fields
        }
        
    except Exception as e:
        print(f"❌ Chyba při analýze databáze: {e}")
        return None

def estimate_historical_data_requirements():
    """Odhad požadavků na historická data"""
    print(f"\n📊 ODHAD POŽADAVKŮ NA HISTORICKÁ DATA")
    print("=" * 50)
    
    # Scénáře
    scenarios = {
        "Minimální (top 100 ETF, 1 rok)": {
            'etf_count': 100,
            'days': 250,
            'bytes_per_record': 100  # datum, OHLCV = cca 100 bytů
        },
        "Střední (top 500 ETF, 2 roky)": {
            'etf_count': 500, 
            'days': 500,
            'bytes_per_record': 100
        },
        "Velký (1000 ETF, 5 let)": {
            'etf_count': 1000,
            'days': 1250,
            'bytes_per_record': 100
        },
        "Maximum (3500 ETF, 5 let)": {
            'etf_count': 3500,
            'days': 1250,
            'bytes_per_record': 100
        }
    }
    
    for scenario_name, params in scenarios.items():
        total_records = params['etf_count'] * params['days']
        total_bytes = total_records * params['bytes_per_record']
        total_mb = total_bytes / (1024 * 1024)
        
        print(f"\n🎯 {scenario_name}:")
        print(f"   ETF fondů: {params['etf_count']:,}")
        print(f"   Dní historie: {params['days']:,}")
        print(f"   Celkem záznamů: {total_records:,}")
        print(f"   Velikost: {total_mb:.1f} MB")
        
        # Odhad API calls pro Yahoo Finance
        api_calls = params['etf_count']  # 1 call per ETF
        print(f"   Yahoo API calls: {api_calls:,}")

def check_supabase_plan_limits():
    """Informace o Supabase plánech"""
    print(f"\n📋 SUPABASE PLÁNY A LIMITY")
    print("=" * 30)
    
    plans = {
        "Free": {
            "database_size": "500 MB",
            "api_requests": "50,000/month",
            "storage": "1 GB",
            "bandwidth": "2 GB", 
            "price": "$0"
        },
        "Pro": {
            "database_size": "8 GB",
            "api_requests": "500,000/month", 
            "storage": "100 GB",
            "bandwidth": "50 GB",
            "price": "$25/month"
        },
        "Team": {
            "database_size": "8 GB",
            "api_requests": "1,500,000/month",
            "storage": "100 GB", 
            "bandwidth": "250 GB",
            "price": "$599/month"
        }
    }
    
    for plan_name, limits in plans.items():
        print(f"\n💳 {plan_name} ({limits['price']}):")
        for key, value in limits.items():
            if key != 'price':
                print(f"   {key}: {value}")

def main():
    print("🚀 SUPABASE KAPACITA A PLÁNOVÁNÍ")
    print("=" * 60)
    
    # Zkontroluj aktuální využití
    current_usage = check_database_size()
    
    # Odhad požadavků na historická data
    estimate_historical_data_requirements()
    
    # Info o plánech
    check_supabase_plan_limits()
    
    # Doporučení
    print(f"\n🎯 DOPORUČENÍ")
    print("=" * 20)
    
    if current_usage:
        current_size = current_usage.get('estimated_size_mb', 0)
        print(f"✅ Aktuální velikost: ~{current_size:.1f} MB")
        
        if current_size < 100:
            print("✅ Free plán: Stačí pro základní historická data (top 100 ETF)")
            print("⚠️  Pro všech 3500 ETF budete potřebovat Pro plán")
        elif current_size < 500:
            print("⚠️  Blížíte se limitu Free plánu")
            print("💡 Doporučuji upgrade na Pro plán")
        else:
            print("❌ Překračujete Free plán")
            print("🚨 Nutný upgrade na Pro plán")
    
    # Uložení analýzy
    output = {
        'timestamp': datetime.now().isoformat(),
        'current_usage': current_usage,
        'recommendations': {
            'free_plan_sufficient_for': 'Top 100 ETF s 1-2 roky historie',
            'pro_plan_recommended_for': 'Všech 3500 ETF s 5 lety historie',
            'estimated_full_size': '450 MB (historická data) + 20 MB (ETF data) = 470 MB'
        }
    }
    
    with open("/Users/tomaskostrhoun/Documents/ETF/supabase_capacity_analysis.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, default=str)
    
    print(f"\n💾 Analýza uložena do supabase_capacity_analysis.json")

if __name__ == "__main__":
    main()