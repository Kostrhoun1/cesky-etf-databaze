#!/usr/bin/env python3
"""
FINÁLNÍ TEST - ověření JSON exportu
"""

import json
from final_scraper import CompleteProductionScraper

def final_json_test():
    """Test JSON exportu s novými performance poli"""
    
    scraper = CompleteProductionScraper(batch_size=1)
    
    # Test na problematickém ETF
    isin = "IE000IEGVMH6"
    
    print(f"🔥 FINÁLNÍ TEST JSON EXPORTU - {isin}")
    print("="*60)
    
    etf = scraper.scrape_etf_complete_with_retry(isin)
    etf_dict = etf.to_dict()
    
    # Zkontroluj performance data v JSON
    performance_fields = [
        'return_1m', 'return_3m', 'return_6m', 
        'return_2021', 'return_2022', 'return_2023', 'return_2024',
        'return_inception'
    ]
    
    print("\n📊 PERFORMANCE DATA V JSON:")
    print("-" * 40)
    
    found = 0
    for field in performance_fields:
        value = etf_dict.get(field)
        if value is not None:
            print(f"  ✅ {field}: {value}%")
            found += 1
        else:
            print(f"  ❌ {field}: NULL")
    
    print(f"\n🎯 JSON EXPORT: {found}/{len(performance_fields)} polí")
    
    # Uložení pro kontrolu
    with open('final_test_output.json', 'w', encoding='utf-8') as f:
        json.dump(etf_dict, f, indent=2, ensure_ascii=False, default=str)
    
    if found == len(performance_fields):
        print("🎉 PERFEKTNÍ! Všechna data jsou v JSON!")
        return True
    else:
        print("❌ PROBLÉM! Některá data chybí v JSON exportu.")
        return False

if __name__ == "__main__":
    success = final_json_test()
    exit(0 if success else 1)