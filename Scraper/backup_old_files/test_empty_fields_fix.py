#!/usr/bin/env python3
"""
Test opravených dříve prázdných polí:
- legal_structure
- distribution_frequency 
- investment_focus
- sustainability
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_empty_fields_fix():
    """Test opravených prázdných polí"""
    
    test_etfs = [
        "IE00B6YX5C33",  # SPDR S&P 500
        "IE00BK5BQT80",  # Vanguard FTSE All-World
        "IE00B4L5Y983",  # iShares Core MSCI World
    ]
    
    print("🔧 TESTING PREVIOUSLY EMPTY FIELDS FIXES")
    print("=" * 60)
    
    scraper = CompleteProductionScraper()
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n[{i}/3] Testing ISIN: {isin}")
        print("-" * 40)
        
        try:
            etf_data = scraper.scrape_etf_complete_with_retry(isin)
            
            if etf_data:
                print(f"✅ {etf_data.name}")
                
                # Test dříve prázdných polí
                print(f"\n🔍 PREVIOUSLY EMPTY FIELDS:")
                print(f"   Legal Structure: '{etf_data.legal_structure}'")
                print(f"   Distribution Frequency: '{etf_data.distribution_frequency}'")
                print(f"   Investment Focus: '{etf_data.investment_focus}'")
                print(f"   Sustainability: '{etf_data.sustainability}'")
                
                # Test opravených polí
                print(f"\n✅ FIXED FIELDS:")
                print(f"   Provider: '{etf_data.fund_provider}' (should not be empty)")
                print(f"   Category: '{etf_data.category}' (should be Akcie)")
                print(f"   Region: '{etf_data.region}' (should not be Neznámý)")
                
                # Počítání vyplněných polí
                empty_count = 0
                total_count = 4
                
                if not etf_data.legal_structure or etf_data.legal_structure.strip() == '':
                    empty_count += 1
                if not etf_data.distribution_frequency or etf_data.distribution_frequency.strip() == '':
                    empty_count += 1
                if not etf_data.investment_focus or etf_data.investment_focus.strip() == '':
                    empty_count += 1
                if not etf_data.sustainability or etf_data.sustainability.strip() == '':
                    empty_count += 1
                
                filled_count = total_count - empty_count
                print(f"\n📊 FILL STATS: {filled_count}/{total_count} fields filled ({filled_count/total_count*100:.1f}%)")
                
            else:
                print(f"❌ Failed to scrape {isin}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print(f"\n" + "="*60)
    print("🎯 SUMMARY")
    print("="*60)
    print("Check if the previously empty fields now have data:")
    print("- legal_structure: UCITS, SICAV, etc.")
    print("- distribution_frequency: Quarterly, Semi-annually, etc.")
    print("- investment_focus: Growth, Value, Quality, etc.")
    print("- sustainability: ESG, SRI, etc.")

if __name__ == "__main__":
    test_empty_fields_fix()