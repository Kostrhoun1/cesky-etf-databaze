#!/usr/bin/env python3
"""
RYCHLÝ TEST - jeden ETF s kontrolou opravy
"""

from final_scraper import CompleteProductionScraper

def quick_test():
    """Rychlý test na problematickém ETF"""
    
    scraper = CompleteProductionScraper(batch_size=1)
    
    # Test na ETF, který měl problém
    isin = "IE000IEGVMH6"
    
    print(f"🔥 RYCHLÝ TEST OPRAVY - {isin}")
    print("="*60)
    
    etf = scraper.scrape_etf_complete_with_retry(isin)
    
    # Zkontroluj performance data
    performance_fields = [
        'return_1m', 'return_3m', 'return_6m', 
        'return_2021', 'return_2022', 'return_2023', 'return_2024'
    ]
    
    print("\n📊 PERFORMANCE DATA:")
    print("-" * 40)
    
    found = 0
    for field in performance_fields:
        value = getattr(etf, field, None)
        if value is not None:
            print(f"  ✅ {field}: {value}%")
            found += 1
        else:
            print(f"  ❌ {field}: NULL")
    
    print(f"\n🎯 VÝSLEDEK: {found}/{len(performance_fields)} polí nalezeno")
    
    if found == len(performance_fields):
        print("🎉 ÚSPĚCH! Všechna performance data jsou k dispozici!")
        return True
    elif found > 0:
        print("⚠️ ČÁSTEČNÝ ÚSPĚCH! Některá data fungují.")
        return False
    else:
        print("❌ NEÚSPĚCH! Žádná performance data se neextraktovala.")
        return False

if __name__ == "__main__":
    success = quick_test()
    exit(0 if success else 1)