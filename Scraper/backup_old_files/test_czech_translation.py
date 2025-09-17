#!/usr/bin/env python3
"""
Test českého překladu popisů ETF přes Google Translate
Ověří, zda překlad správně zachází s českými znaky a nerozbitím textu
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_czech_translation():
    """Test českého překladu s focus na české znaky"""
    
    # Test ETF s různými typy popisů
    test_etfs = [
        "IE00B6YX5C33",  # SPDR S&P 500 - jednoduchý popis
        "IE00BK5BQT80",  # Vanguard FTSE All-World - složitější popis
        "IE00B4L5Y983",  # iShares Core MSCI World - dlouhý popis
    ]
    
    print("🔍 TEST ČESKÉHO PŘEKLADU ETF POPISŮ")
    print("=" * 70)
    print("Testuje Google Translate s českými znaky a encoding")
    
    scraper = CompleteProductionScraper()
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n[{i}/3] Testing ISIN: {isin}")
        print("-" * 50)
        
        try:
            etf_data = scraper.scrape_etf_complete_with_retry(isin)
            
            if etf_data:
                print(f"✅ {etf_data.name}")
                
                # Zkontroluj původní (anglický) popis
                print(f"\n📋 PŮVODNÍ POPIS (EN):")
                if etf_data.description_en:
                    print(f"   Délka: {len(etf_data.description_en)} znaků")
                    print(f"   Preview: {etf_data.description_en[:100]}...")
                else:
                    print("   ❌ Žádný anglický popis")
                
                # Zkontroluj český popis
                print(f"\n🇨🇿 ČESKÝ POPIS (CS):")
                if etf_data.description_cs:
                    print(f"   Délka: {len(etf_data.description_cs)} znaků")
                    print(f"   Preview: {etf_data.description_cs[:100]}...")
                    
                    # Zkontroluj české znaky
                    czech_chars = ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž']
                    found_czech_chars = [char for char in czech_chars if char in etf_data.description_cs.lower()]
                    
                    if found_czech_chars:
                        print(f"   ✅ České znaky nalezeny: {', '.join(found_czech_chars)}")
                    else:
                        print(f"   ⚠️  Žádné české znaky (možná není potřeba)")
                    
                    # Zkontroluj encoding problémy
                    encoding_issues = []
                    if '?' in etf_data.description_cs:
                        encoding_issues.append("Otazníky (?)")
                    if '�' in etf_data.description_cs:
                        encoding_issues.append("Replacement znaky (�)")
                    if 'Ã' in etf_data.description_cs or 'Ä' in etf_data.description_cs:
                        encoding_issues.append("UTF-8 encoding problémy")
                    
                    if encoding_issues:
                        print(f"   ❌ ENCODING PROBLÉMY: {', '.join(encoding_issues)}")
                    else:
                        print(f"   ✅ Encoding vypadá v pořádku")
                    
                    # Zkontroluj kvalitu překladu
                    if len(etf_data.description_cs) < 20:
                        print(f"   ⚠️  Překlad možná příliš krátký")
                    elif etf_data.description_cs == etf_data.description_en:
                        print(f"   ⚠️  Překlad identický s originálem (možná se nepřeložil)")
                    else:
                        print(f"   ✅ Překlad vypadá úspěšný")
                        
                else:
                    print("   ❌ Žádný český popis")
                
                # Dodatečné info
                print(f"\n📊 DALŠÍ INFO:")
                print(f"   Translation method: {etf_data.translation_method if hasattr(etf_data, 'translation_method') else 'Unknown'}")
                
            else:
                print(f"❌ Failed to scrape {isin}")
                
        except Exception as e:
            print(f"❌ Error processing {isin}: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n" + "="*70)
    print("🎯 SUMMARY ČESKÉHO PŘEKLADU")
    print("="*70)
    print("Zkontrolujte:")
    print("1. ✅ České znaky se zobrazují správně (á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž)")
    print("2. ❌ Žádné encoding problémy (?, �, Ã, Ä)")
    print("3. ✅ Překlad není identický s originálem")
    print("4. ✅ Překlad má rozumnou délku")
    print("\nPokud jsou problémy, možné příčiny:")
    print("- Google Translate API limity")
    print("- UTF-8 encoding issues")
    print("- Network problémy")

if __name__ == "__main__":
    test_czech_translation()