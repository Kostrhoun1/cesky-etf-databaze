#!/usr/bin/env python3
"""
Ověření věku ETF IE0003XJA0J9 a testování rating logiky
"""

import sys
import os
sys.path.append('/Users/tomaskostrhoun/Documents/ETF/Scraper')

from etf_rating import calculate_etf_rating, get_years_since_inception
from supabase import create_client
from datetime import datetime

# Supabase konfigurace
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def test_etf_age_and_rating():
    print("🔍 TESTOVÁNÍ VĚKU ETF A RATING LOGIKY")
    print("=" * 50)
    
    isin = "IE0003XJA0J9"
    supabase = get_supabase_client()
    
    # Získej ETF data
    response = supabase.table('etf_funds').select('*').eq('isin', isin).execute()
    
    if not response.data:
        print(f"❌ ETF {isin} nenalezen")
        return
    
    etf = response.data[0]
    
    print(f"📊 ETF: {etf['name']}")
    print(f"   ISIN: {isin}")
    print(f"   Provider: {etf['fund_provider']}")
    print(f"   Inception Date: '{etf.get('inception_date', 'N/A')}'")
    
    # Test věku
    inception_date = etf.get('inception_date', '')
    years = get_years_since_inception(inception_date)
    
    print(f"\n⏰ ANALÝZA VĚKU:")
    print(f"   Inception Date String: '{inception_date}'")
    print(f"   Vypočítaný věk: {years:.2f} let")
    print(f"   Splňuje 3-letý limit: {'✅ ANO' if years >= 3.0 else '❌ NE'}")
    
    # Test rating logiky
    print(f"\n🔢 TESTOVÁNÍ RATING LOGIKY:")
    
    rating_result = calculate_etf_rating(etf)
    
    print(f"   Rating: {rating_result.get('rating', 'None')}")
    print(f"   Score: {rating_result.get('rating_score', 'None')}")
    print(f"   Note: {rating_result.get('rating_note', 'None')}")
    
    if rating_result.get('rating_breakdown'):
        print(f"   Breakdown: {rating_result['rating_breakdown']}")
    
    # Ruční testování s různými daty
    print(f"\n🧪 MANUÁLNÍ TESTY RŮZNÝCH INCEPTION DATES:")
    
    test_dates = [
        ("", "Prázdný string"),
        ("2024-01-01", "Mladý fond (< 1 rok)"),
        ("2022-01-01", "2 roky starý"),
        ("2021-01-01", "3 roky starý"), 
        ("2020-01-01", "4 roky starý"),
        ("2010-01-01", "Starý fond")
    ]
    
    for test_date, description in test_dates:
        years = get_years_since_inception(test_date)
        print(f"   '{test_date}' ({description}): {years:.2f} let - {'✅' if years >= 3.0 else '❌'}")
    
    # Test s kompletními daty
    print(f"\n🎯 TEST S KOMPLETNÍMI DATY:")
    
    test_etf_young = {
        'name': 'Test Young ETF',
        'ter_numeric': 0.07,  # 0.07%
        'fund_size_numeric': 500,  # 500M
        'fund_provider': 'Amundi',
        'inception_date': '2022-01-01',  # 2 roky - mladý
        'return_3y': 10.0,
        'return_per_risk_3y': 0.5,
    }
    
    test_etf_old = {
        'name': 'Test Old ETF',
        'ter_numeric': 0.07,  # 0.07%
        'fund_size_numeric': 500,  # 500M
        'fund_provider': 'Amundi',
        'inception_date': '2020-01-01',  # 4 roky - starý
        'return_3y': 10.0,
        'return_per_risk_3y': 0.5,
    }
    
    young_result = calculate_etf_rating(test_etf_young)
    old_result = calculate_etf_rating(test_etf_old)
    
    print(f"   Mladý ETF (2 roky): Rating = {young_result.get('rating')}, Note = {young_result.get('rating_note', 'None')}")
    print(f"   Starý ETF (4 roky): Rating = {old_result.get('rating')}, Score = {old_result.get('rating_score')}")

def check_database_inception_dates():
    """Zkontroluje formáty inception_date v databázi"""
    print(f"\n📋 ANALÝZA INCEPTION_DATE FORMÁTŮ V DATABÁZI")
    print("=" * 50)
    
    supabase = get_supabase_client()
    
    # Získej vzorek inception_date
    response = supabase.table('etf_funds').select(
        'isin,name,inception_date'
    ).not_.is_('inception_date', 'null').limit(20).execute()
    
    if response.data:
        print("Vzorky inception_date formátů:")
        for etf in response.data[:10]:
            inception = etf.get('inception_date', 'N/A')
            years = get_years_since_inception(inception)
            print(f"   {etf['isin']}: '{inception}' → {years:.2f} let")
    
    # Statistiky
    all_response = supabase.table('etf_funds').select(
        'inception_date'
    ).not_.is_('inception_date', 'null').execute()
    
    if all_response.data:
        total_count = len(all_response.data)
        young_count = 0
        old_count = 0
        invalid_count = 0
        
        for etf in all_response.data:
            inception = etf.get('inception_date', '')
            years = get_years_since_inception(inception)
            
            if years == 0:
                invalid_count += 1
            elif years < 3.0:
                young_count += 1
            else:
                old_count += 1
        
        print(f"\n📊 STATISTIKY VĚKU FONDŮ:")
        print(f"   Celkem fondů s inception_date: {total_count}")
        print(f"   Mladší než 3 roky: {young_count} ({young_count/total_count*100:.1f}%)")
        print(f"   Starší než 3 roky: {old_count} ({old_count/total_count*100:.1f}%)")
        print(f"   Neplatné datum: {invalid_count} ({invalid_count/total_count*100:.1f}%)")

def main():
    test_etf_age_and_rating()
    check_database_inception_dates()

if __name__ == "__main__":
    main()