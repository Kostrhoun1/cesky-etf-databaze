#!/usr/bin/env python3
"""
Test performance databáze po optimalizaci
"""

import time
import requests
import json
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

def test_database_performance():
    """Test rychlosti databázových dotazů po optimalizaci"""
    
    print("🚀 TEST PERFORMANCE DATABÁZE PO OPTIMALIZACI")
    print("=" * 60)
    
    # Supabase connection
    url = os.getenv("VITE_SUPABASE_URL")
    key = os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")
    
    if not url or not key:
        print("❌ Chybí Supabase credentials v .env")
        return
    
    supabase: Client = create_client(url, key)
    
    tests = []
    
    # TEST 1: Základní SELECT všech ETF
    print("\n📊 Test 1: Načítání všech ETF")
    start_time = time.time()
    try:
        response = supabase.table('etf_funds').select('isin, name, ter_numeric, fund_size_numeric').execute()
        end_time = time.time()
        count = len(response.data) if response.data else 0
        duration = end_time - start_time
        print(f"✅ Načteno {count} ETF za {duration:.3f}s")
        tests.append({"test": "Všechna ETF", "duration": duration, "count": count})
    except Exception as e:
        print(f"❌ Chyba: {e}")
        tests.append({"test": "Všechna ETF", "error": str(e)})
    
    # TEST 2: Filtrování podle TER (použije idx_etf_funds_ter_size)
    print("\n💰 Test 2: Filtrování podle TER < 0.5%")
    start_time = time.time()
    try:
        response = supabase.table('etf_funds').select('*').lt('ter_numeric', 0.5).execute()
        end_time = time.time()
        count = len(response.data) if response.data else 0
        duration = end_time - start_time
        print(f"✅ Nalezeno {count} ETF s TER < 0.5% za {duration:.3f}s")
        tests.append({"test": "TER filtr", "duration": duration, "count": count})
    except Exception as e:
        print(f"❌ Chyba: {e}")
        tests.append({"test": "TER filtr", "error": str(e)})
    
    # TEST 3: Filtrování podle velikosti (použije idx_etf_funds_size_desc)
    print("\n📈 Test 3: Top 50 největších ETF")
    start_time = time.time()
    try:
        response = supabase.table('etf_funds').select('name, fund_size_numeric, ter_numeric').gt('fund_size_numeric', 0).order('fund_size_numeric', desc=True).limit(50).execute()
        end_time = time.time()
        count = len(response.data) if response.data else 0
        duration = end_time - start_time
        print(f"✅ Načteno top {count} ETF za {duration:.3f}s")
        tests.append({"test": "Top ETF", "duration": duration, "count": count})
    except Exception as e:
        print(f"❌ Chyba: {e}")
        tests.append({"test": "Top ETF", "error": str(e)})
    
    # TEST 4: Složité filtrování (použije idx_etf_funds_performance)
    print("\n🎯 Test 4: Performance filtrování (return_1y > 5%)")
    start_time = time.time()
    try:
        response = supabase.table('etf_funds').select('name, return_1y, volatility_1y').gt('return_1y', 5).is_('scraping_status', 'success').execute()
        end_time = time.time()
        count = len(response.data) if response.data else 0
        duration = end_time - start_time
        print(f"✅ Nalezeno {count} ETF s return > 5% za {duration:.3f}s")
        tests.append({"test": "Performance filtr", "duration": duration, "count": count})
    except Exception as e:
        print(f"❌ Chyba: {e}")
        tests.append({"test": "Performance filtr", "error": str(e)})
    
    # TEST 5: ISIN lookup (použije idx_etf_funds_isin_unique)
    print("\n🔍 Test 5: ISIN lookup (nejrychlejší)")
    test_isins = ['IE00B4L5Y983', 'IE00B5BMR087', 'IE000Z3S26J2']
    start_time = time.time()
    try:
        for isin in test_isins:
            response = supabase.table('etf_funds').select('*').eq('isin', isin).execute()
        end_time = time.time()
        duration = end_time - start_time
        print(f"✅ 3x ISIN lookup za {duration:.3f}s ({duration/3:.3f}s průměr)")
        tests.append({"test": "ISIN lookup", "duration": duration, "avg_per_lookup": duration/3})
    except Exception as e:
        print(f"❌ Chyba: {e}")
        tests.append({"test": "ISIN lookup", "error": str(e)})
    
    # TEST 6: Text search (použije idx_etf_funds_search GIN index)
    print("\n🔎 Test 6: Full-text search")
    start_time = time.time()
    try:
        # Simulace text search pomocí ilike (ideálně by měl web používat full-text search)
        response = supabase.table('etf_funds').select('name, fund_provider').ilike('name', '%World%').execute()
        end_time = time.time()
        count = len(response.data) if response.data else 0
        duration = end_time - start_time
        print(f"✅ Nalezeno {count} ETF s 'World' za {duration:.3f}s")
        tests.append({"test": "Text search", "duration": duration, "count": count})
    except Exception as e:
        print(f"❌ Chyba: {e}")
        tests.append({"test": "Text search", "error": str(e)})
    
    # SUMMARY
    print("\n" + "=" * 60)
    print("📋 SOUHRN PERFORMANCE TESTŮ")
    print("=" * 60)
    
    successful_tests = [t for t in tests if 'error' not in t]
    failed_tests = [t for t in tests if 'error' in t]
    
    if successful_tests:
        print("✅ Úspěšné testy:")
        for test in successful_tests:
            duration = test.get('duration', 0)
            count = test.get('count', '-')
            status = "🟢 RYCHLÉ" if duration < 0.5 else "🟡 OK" if duration < 2.0 else "🔴 POMALÉ"
            print(f"   {test['test']}: {duration:.3f}s | {count} záznamů | {status}")
        
        avg_duration = sum(t['duration'] for t in successful_tests) / len(successful_tests)
        print(f"\n📊 Průměrná doba dotazu: {avg_duration:.3f}s")
        
        if avg_duration < 0.5:
            print("🎉 VÝBORNĚ! Databáze je velmi rychlá")
        elif avg_duration < 1.0:
            print("👍 DOBŘE! Databáze je dostatečně rychlá")
        else:
            print("⚠️  Databáze by mohla být rychlejší")
    
    if failed_tests:
        print(f"\n❌ Selhalo {len(failed_tests)} testů:")
        for test in failed_tests:
            print(f"   {test['test']}: {test['error']}")
    
    # Export výsledků
    with open('database_performance_results.json', 'w', encoding='utf-8') as f:
        json.dump({
            'timestamp': time.time(),
            'tests': tests,
            'summary': {
                'successful_count': len(successful_tests),
                'failed_count': len(failed_tests),
                'avg_duration': avg_duration if successful_tests else None
            }
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Detailní výsledky: database_performance_results.json")
    
    return tests

if __name__ == "__main__":
    test_database_performance()