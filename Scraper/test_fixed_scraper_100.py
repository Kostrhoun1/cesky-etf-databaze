#!/usr/bin/env python3
"""
TEST OPRAVENÉHO SCRAPERU - 100 ETF
Rychlý test pro ověření že vše funguje před kompletním během
"""

import csv
from final_scraper import CompleteProductionScraper

def test_fixed_scraper():
    """Test opraveného scraperu na prvních 100 ETF"""
    
    print("🚀 TEST OPRAVENÉHO SCRAPERU - 100 ETF")
    print("="*60)
    
    # Spusti scraper s menším CSV
    scraper = CompleteProductionScraper(batch_size=50)
    
    print(f"📊 Testování prvních 100 ETF z ISIN_test_100.csv")
    
    try:
        results = scraper.run_complete_production_scraping(
            csv_file='ISIN_test_100.csv',
            resume=False,
            start_batch=0
        )
        
        print(f"\n✅ Test dokončen!")
        print(f"📊 Výsledky v: justetf_complete_production/results/")
        
        # Rychlá analýza posledního batch souboru
        latest_file = "justetf_complete_production/results/batch_0001_*.json"
        print(f"🔍 Zkontrolujte: {latest_file}")
        
    except Exception as e:
        print(f"❌ Chyba během testu: {e}")

if __name__ == "__main__":
    test_fixed_scraper()