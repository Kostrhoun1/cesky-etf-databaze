#!/usr/bin/env python3
"""
Test kompletního pipeline: Scraping → Supabase → Zobrazení
Ověří, že české znaky projdou celou cestou bez poškození
"""

import sys
import os
import json
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_supabase_encoding_pipeline():
    """Test celého pipeline pro české znaky"""
    
    print("🔍 TEST KOMPLETNÍHO PIPELINE - ČESKÉ ZNAKY")
    print("=" * 70)
    print("Testuje: Scraping → JSON serialization → Zobrazení")
    print("Focus: České znaky v description_cs")
    
    scraper = CompleteProductionScraper()
    
    # Test s ETF, který má dobré české překlady
    test_isin = "IE00B6YX5C33"  # SPDR S&P 500 - měl perfektní překlad
    
    print(f"\nTesting ISIN: {test_isin}")
    print("-" * 50)
    
    try:
        # Krok 1: Scraping
        print("🔧 KROK 1: SCRAPING")
        etf_data = scraper.scrape_etf_complete_with_retry(test_isin)
        
        if not etf_data:
            print("❌ Scraping selhal")
            return
        
        print(f"✅ ETF scraped: {etf_data.name}")
        
        # Krok 2: Kontrola raw dat
        print(f"\n🔧 KROK 2: KONTROLA RAW DAT")
        if etf_data.description_cs:
            print(f"   Český popis délka: {len(etf_data.description_cs)} znaků")
            print(f"   Preview: {etf_data.description_cs[:100]}...")
            
            # Najdi české znaky
            czech_chars = ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž']
            found_czech_chars = [char for char in czech_chars if char in etf_data.description_cs.lower()]
            print(f"   České znaky: {', '.join(found_czech_chars) if found_czech_chars else 'ŽÁDNÉ'}")
        else:
            print("   ❌ Žádný český popis")
            return
        
        # Krok 3: JSON Serialization (simulace Supabase ukládání)
        print(f"\n🔧 KROK 3: JSON SERIALIZATION")
        try:
            etf_dict = etf_data.to_dict()
            json_string = json.dumps(etf_dict, ensure_ascii=False, indent=2)
            
            print(f"   JSON délka: {len(json_string)} znaků")
            print("   ✅ JSON serialization úspěšná")
            
            # Zkontroluj JSON encoding
            if '\\u' in json_string:
                print("   ⚠️  JSON obsahuje Unicode escape sekvence")
            else:
                print("   ✅ JSON obsahuje čisté UTF-8 znaky")
                
        except Exception as e:
            print(f"   ❌ JSON serialization selhala: {e}")
            return
        
        # Krok 4: JSON Deserialization (simulace čtení z Supabase)
        print(f"\n🔧 KROK 4: JSON DESERIALIZATION")
        try:
            restored_dict = json.loads(json_string)
            restored_description = restored_dict.get('description_cs', '')
            
            print(f"   Restored délka: {len(restored_description)} znaků")
            print(f"   Preview: {restored_description[:100]}...")
            
            # Porovnej před a po
            if restored_description == etf_data.description_cs:
                print("   ✅ Data identická před a po JSON")
            else:
                print("   ❌ Data se změnila během JSON procesu!")
                print(f"   Původní: {etf_data.description_cs[:50]}...")
                print(f"   Restored: {restored_description[:50]}...")
            
            # Znovu zkontroluj české znaky
            found_czech_chars_after = [char for char in czech_chars if char in restored_description.lower()]
            print(f"   České znaky po JSON: {', '.join(found_czech_chars_after) if found_czech_chars_after else 'ŽÁDNÉ'}")
            
        except Exception as e:
            print(f"   ❌ JSON deserialization selhala: {e}")
            return
        
        # Krok 5: Simulace webového zobrazení
        print(f"\n🔧 KROK 5: SIMULACE WEB ZOBRAZENÍ")
        
        # Simuluj různé web encoding scenáře
        try:
            # HTML escape test
            import html
            html_escaped = html.escape(restored_description)
            print(f"   HTML escaped délka: {len(html_escaped)} znaků")
            
            if html_escaped != restored_description:
                print("   ℹ️  HTML escape změnil text (normální pro <>&)")
                changes = len(restored_description) - len(html_escaped)
                print(f"   Změna délky: {changes} znaků")
            else:
                print("   ✅ HTML escape nezměnil text")
            
            # UTF-8 encode/decode test
            utf8_bytes = restored_description.encode('utf-8')
            utf8_decoded = utf8_bytes.decode('utf-8')
            
            if utf8_decoded == restored_description:
                print("   ✅ UTF-8 encode/decode test prošel")
            else:
                print("   ❌ UTF-8 encode/decode změnil text!")
            
            # České znaky po web processing
            found_czech_chars_web = [char for char in czech_chars if char in utf8_decoded.lower()]
            print(f"   České znaky po web processing: {', '.join(found_czech_chars_web) if found_czech_chars_web else 'ŽÁDNÉ'}")
            
        except Exception as e:
            print(f"   ❌ Web processing simulation selhala: {e}")
            return
        
        # Krok 6: Výsledné shrnutí
        print(f"\n🎯 VÝSLEDNÉ SHRNUTÍ")
        print("-" * 30)
        
        issues = []
        
        # Kontrola každého kroku
        if not found_czech_chars:
            issues.append("Žádné české znaky v raw datech")
        
        if '\\u' in json_string:
            issues.append("JSON používá Unicode escape sekvence")
        
        if restored_description != etf_data.description_cs:
            issues.append("Data se změnila během JSON procesu")
        
        if utf8_decoded != restored_description:
            issues.append("UTF-8 encoding/decoding problém")
        
        if not found_czech_chars_web:
            issues.append("České znaky ztraceny během web processingu")
        
        if issues:
            print("❌ NALEZENÉ PROBLÉMY:")
            for issue in issues:
                print(f"   • {issue}")
        else:
            print("✅ VŠECHNY KONTROLY PROŠLY!")
            print("   České znaky projdou celým pipeline bez problémů")
        
        # Extra info pro debugging
        print(f"\n📊 DEBUGGING INFO:")
        print(f"   Původní text type: {type(etf_data.description_cs)}")
        print(f"   JSON string type: {type(json_string)}")
        print(f"   Restored text type: {type(restored_description)}")
        print(f"   UTF-8 bytes délka: {len(utf8_bytes)}")
        print(f"   UTF-8 string délka: {len(utf8_decoded)}")
        
    except Exception as e:
        print(f"❌ Test selhal s chybou: {e}")
        import traceback
        traceback.print_exc()

def test_specific_czech_characters():
    """Test specifických českých znaků"""
    
    print(f"\n" + "="*70)
    print("🔤 TEST SPECIFICKÝCH ČESKÝCH ZNAKŮ")
    print("="*70)
    
    # Test string s všemi českými znaky
    test_string = "Příběh žluťoučkého koníčka, který běžel přes čerstvě zafarbené stříbrné zvonečky."
    
    print(f"Test string: {test_string}")
    print(f"Délka: {len(test_string)} znaků")
    
    try:
        # JSON test
        json_test = json.dumps({"test": test_string}, ensure_ascii=False)
        restored_test = json.loads(json_test)["test"]
        
        print(f"\nJSON test:")
        print(f"   Before: {test_string}")
        print(f"   After:  {restored_test}")
        print(f"   Match:  {'✅' if test_string == restored_test else '❌'}")
        
        # UTF-8 test
        utf8_bytes = test_string.encode('utf-8')
        utf8_restored = utf8_bytes.decode('utf-8')
        
        print(f"\nUTF-8 test:")
        print(f"   Bytes length: {len(utf8_bytes)}")
        print(f"   String length: {len(utf8_restored)}")
        print(f"   Match:  {'✅' if test_string == utf8_restored else '❌'}")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")

if __name__ == "__main__":
    test_supabase_encoding_pipeline()
    test_specific_czech_characters()