#!/usr/bin/env python3
"""
Test exportu VŠECH polí ze scraperu - ověření úplných dat
"""

import sys
import os
import json
from final_scraper import CompleteProductionScraper

def test_full_export():
    """Test 5 ETF s KOMPLETNÍM exportem všech polí"""
    
    print("🔬 TEST KOMPLETNÍHO EXPORTU - VŠECHNA POLE")
    print("="*60)
    
    # 5 reprezentativních ETF 
    test_etfs = [
        'IE00B4L5Y983',  # iShares Core MSCI World
        'IE00B5BMR087',  # iShares Core S&P 500
        'IE000Z3S26J2',  # iShares S&P 500 EUR Hedged  
        'IE00B3RBWM25',  # Vanguard FTSE All-World
        'LU0290358497',  # Xtrackers 
    ]
    
    scraper = CompleteProductionScraper()
    results = []
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n📊 [{i}/{len(test_etfs)}] Testování {isin}")
        
        try:
            etf = scraper.scrape_etf_complete_with_retry(isin, max_retries=1)
            
            if etf.scraping_status == 'success':
                print(f"✅ SUCCESS: {etf.name[:50]}...")
                
                # KOMPLETNÍ to_dict() export - VŠECHNA POLE!
                complete_data = etf.to_dict()
                results.append(complete_data)
                
                # Spočítat obsazená pole
                filled_fields = 0
                total_fields = 0
                
                for key, value in complete_data.items():
                    total_fields += 1
                    if value is not None and str(value).strip() and str(value) not in ['', 'None']:
                        filled_fields += 1
                
                coverage = (filled_fields / total_fields) * 100
                print(f"   📊 POLE: {filled_fields}/{total_fields} ({coverage:.1f}%)")
                
            else:
                print(f"❌ FAILED: {etf.scraping_status}")
                
        except Exception as e:
            print(f"💥 ERROR: {str(e)}")
    
    # Export kompletních dat
    output_file = 'test_full_export_results.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n🎯 VÝSLEDKY:")
    print(f"Úspěšných: {len(results)}/{len(test_etfs)}")
    
    if results:
        # Analýza všech polí
        all_fields = set()
        for result in results:
            all_fields.update(result.keys())
        
        print(f"📊 CELKEM POLÍ: {len(all_fields)}")
        print(f"💾 Export: {output_file}")
        
        # Ukázka některých polí
        sample_etf = results[0]
        print(f"\n🔍 VZORKA POLÍ (první ETF):")
        
        # Kategorizace polí podle typu
        basic_fields = ['isin', 'name', 'fund_provider', 'fund_currency', 'ter_numeric']
        performance_fields = ['return_1y', 'return_3y', 'return_5y', 'volatility_1y', 'beta']
        structure_fields = ['replication', 'legal_structure', 'distribution_policy']
        new_fields = ['investment_focus', 'currency_risk', 'strategy_risk']
        
        print("   ZÁKLADNÍ:")
        for field in basic_fields:
            value = sample_etf.get(field, 'N/A')
            print(f"     {field}: {value}")
            
        print("   NOVÁ POLE:")
        for field in new_fields:
            value = sample_etf.get(field, 'N/A')
            print(f"     {field}: {value}")
            
        print("   PERFORMANCE:")
        for field in performance_fields:
            value = sample_etf.get(field, 'N/A')
            print(f"     {field}: {value}")
            
        print("   STRUKTURA:")
        for field in structure_fields:
            value = sample_etf.get(field, 'N/A')
            print(f"     {field}: {value}")
        
        # Coverage analýza
        print(f"\n📋 COVERAGE ANALÝZA:")
        field_coverage = {}
        
        for field in sorted(all_fields):
            filled_count = 0
            for result in results:
                value = result.get(field)
                if value is not None and str(value).strip() and str(value) not in ['', 'None']:
                    filled_count += 1
            
            coverage = (filled_count / len(results)) * 100
            field_coverage[field] = coverage
        
        # Seřadit podle coverage
        sorted_coverage = sorted(field_coverage.items(), key=lambda x: x[1], reverse=True)
        
        print("   TOP 10 NEJLEPŠÍCH:")
        for field, coverage in sorted_coverage[:10]:
            print(f"     {field}: {coverage:.0f}%")
        
        print("   TOP 10 NEJHORŠÍCH:")
        for field, coverage in sorted_coverage[-10:]:
            print(f"     {field}: {coverage:.0f}%")
    
    return results

if __name__ == "__main__":
    test_full_export()