#!/usr/bin/env python3
"""
Test kompletního upload flow do databáze
"""

import sys
import os
import json
from final_scraper import CompleteProductionScraper

def test_database_upload():
    """Test 3 ETF s kompletním uploadem do databáze"""
    
    print("🔬 TEST DATABÁZOVÉHO UPLOADU")
    print("="*50)
    
    # 3 reprezentativní ETF pro test
    test_etfs = [
        'IE00B4L5Y983',  # iShares Core MSCI World
        'IE00B5BMR087',  # iShares Core S&P 500  
        'IE000Z3S26J2',  # iShares S&P 500 EUR Hedged
    ]
    
    scraper = CompleteProductionScraper()
    results = []
    
    print(f"🎯 Testování {len(test_etfs)} ETF s kompletním flow:")
    print("   1. Scraping dat z JustETF")
    print("   2. Výpočet ETF ratingu")  
    print("   3. Upload do Supabase databáze")
    print("   4. Verificace dat v DB")
    print("-" * 50)
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n📊 [{i}/{len(test_etfs)}] Testování {isin}")
        
        try:
            # SCRAPING
            print("   🔄 Scraping dat...")
            etf = scraper.scrape_etf_complete_with_retry(isin, max_retries=1)
            
            if etf.scraping_status == 'success':
                print(f"   ✅ Scraping: {etf.name[:50]}...")
                
                # RATING CALCULATION  
                print("   🔄 Počítání ratingu...")
                complete_data = etf.to_dict()
                
                rating_info = ""
                if complete_data.get('rating'):
                    rating_info = f"Rating: {complete_data['rating']} ({complete_data.get('rating_score', 'N/A')})"
                else:
                    rating_info = "Rating: N/A"
                
                print(f"   ✅ {rating_info}")
                
                # DATABASE UPLOAD
                print("   🔄 Upload do databáze...")
                
                # Transform pro databázi
                db_data = scraper.transform_etf_for_database(etf)
                
                # Upload do Supabase (s conflict resolution)
                try:
                    # Použít upsert s on_conflict pro update existujících záznamů
                    response = scraper.supabase.table('etf_funds').upsert(
                        db_data, 
                        on_conflict='isin'
                    ).execute()
                    print("   ✅ Databáze: Úspěšně nahráno/aktualizováno")
                    
                    # VERIFICATION - přečteme data zpět
                    print("   🔄 Verifikace dat v DB...")
                    verify_response = scraper.supabase.table('etf_funds').select('*').eq('isin', isin).execute()
                    
                    if verify_response.data:
                        db_record = verify_response.data[0]
                        print(f"   ✅ Verifikace: Data nalezena v DB")
                        print(f"      📋 Název: {db_record.get('name', 'N/A')[:50]}...")
                        print(f"      💰 TER: {db_record.get('ter_numeric', 'N/A')}%")
                        print(f"      🏆 Rating: {db_record.get('rating', 'N/A')}")
                        print(f"      💱 Currency Risk: {db_record.get('currency_risk', 'N/A')[:30]}...")
                        print(f"      📊 Investment Focus: {db_record.get('investment_focus', 'N/A')[:30]}...")
                        
                        # Kompletní info pro analýzu
                        results.append({
                            'isin': isin,
                            'scraping_success': True,
                            'rating_calculated': bool(complete_data.get('rating')),
                            'database_upload': True,
                            'verification_success': True,
                            'db_record_count': len(verify_response.data),
                            'rating': db_record.get('rating'),
                            'rating_score': db_record.get('rating_score'),
                            'currency_risk': bool(db_record.get('currency_risk')),
                            'investment_focus': bool(db_record.get('investment_focus')),
                            'strategy_risk': bool(db_record.get('strategy_risk')),
                        })
                    else:
                        print("   ❌ Verifikace: Data nenalezena v DB!")
                        results.append({
                            'isin': isin,
                            'scraping_success': True,
                            'database_upload': True,
                            'verification_success': False
                        })
                
                except Exception as db_error:
                    print(f"   ❌ Databáze: {str(db_error)[:100]}...")
                    results.append({
                        'isin': isin,
                        'scraping_success': True,
                        'database_upload': False,
                        'error': str(db_error)
                    })
                
            else:
                print(f"   ❌ Scraping selhal: {etf.scraping_status}")
                results.append({
                    'isin': isin,
                    'scraping_success': False,
                    'scraping_status': etf.scraping_status
                })
                
        except Exception as e:
            print(f"   💥 Celková chyba: {str(e)[:100]}...")
            results.append({
                'isin': isin,
                'scraping_success': False,
                'error': str(e)
            })
    
    # FINAL ANALYSIS
    print("\n" + "="*50)
    print("📋 VÝSLEDKY DATABÁZOVÉHO TESTU")
    print("="*50)
    
    successful_scraping = sum(1 for r in results if r.get('scraping_success'))
    successful_uploads = sum(1 for r in results if r.get('database_upload'))
    successful_verifications = sum(1 for r in results if r.get('verification_success'))
    successful_ratings = sum(1 for r in results if r.get('rating_calculated'))
    
    print(f"✅ Scraping úspěšnost: {successful_scraping}/{len(test_etfs)}")
    print(f"✅ Rating výpočet: {successful_ratings}/{successful_scraping}")
    print(f"✅ Databáze upload: {successful_uploads}/{successful_scraping}")
    print(f"✅ Verifikace dat: {successful_verifications}/{successful_uploads}")
    
    if results:
        print(f"\n🎯 CELKOVÁ ÚSPĚŠNOST:")
        if successful_verifications == len(test_etfs):
            print("🟢 PERFEKTNÍ - vše funguje!")
        elif successful_uploads == len(test_etfs):
            print("🟡 DOBRÉ - upload funguje, verifikace potřebuje kontrolu")
        elif successful_scraping == len(test_etfs):
            print("🟡 ČÁSTEČNÉ - scraping OK, databáze má problémy")
        else:
            print("🔴 PROBLÉMY - scraping selhává")
    
    # Export výsledků
    with open('database_upload_test_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Detailní výsledky: database_upload_test_results.json")
    
    return results

if __name__ == "__main__":
    test_database_upload()