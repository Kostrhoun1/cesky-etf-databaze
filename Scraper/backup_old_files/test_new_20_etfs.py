#!/usr/bin/env python3
"""
Test na úplně jiných 20 ETF pro ověření oprav
Obsahuje různé typy ETF: dluhopisové, komoditní, sektorové, regionální
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_new_20_etfs():
    """Test na úplně jiných 20 ETF"""
    
    # Úplně jiné ETF - mix kategorií, regionů, poskytovatelů
    new_test_etfs = [
        # Dluhopisové ETF
        "IE00B1FZS574",  # iShares Core Global Aggregate Bond UCITS ETF
        "IE00BZ163L38",  # Vanguard EUR Corporate Bond UCITS ETF
        "LU0908501215",  # Amundi Government Bond UCITS ETF
        
        # Komoditní ETF
        "IE00B579F325",  # iShares Diversified Commodity Swap UCITS ETF
        "IE00B6R52036",  # iShares MSCI ACWI UCITS ETF
        "DE000A0H0785",  # iShares Gold Producers UCITS ETF
        
        # Sektorové ETF
        "IE00B0M63177",  # iShares MSCI World Health Care UCITS ETF
        "IE00B4ND3602",  # iShares Automation & Robotics UCITS ETF
        "IE00BGV5VR99",  # Vanguard Information Technology UCITS ETF
        "IE00BM67HK77",  # Xtrackers MSCI World Consumer Staples UCITS ETF
        
        # Regionální ETF
        "IE00B14X4Q57",  # iShares MSCI Japan UCITS ETF
        "IE00B0M63516",  # iShares MSCI Europe UCITS ETF
        "IE00B4L5YX21",  # iShares Core MSCI Japan IMI UCITS ETF
        "LU0322253732",  # Xtrackers MSCI Brazil UCITS ETF
        
        # ESG/Sustainable ETF
        "IE00BFNM3K80",  # iShares MSCI World ESG Enhanced UCITS ETF
        "IE00BNG8L278",  # Vanguard ESG Global All Cap UCITS ETF
        "LU0629459743",  # Xtrackers MSCI World ESG UCITS ETF
        
        # Další poskytovatelé
        "LU0959211880",  # BNP Paribas Easy ECPI Global ESG Infrastructure UCITS ETF
        "IE00BYTH6121",  # WisdomTree Cloud Computing UCITS ETF
        "LU0292109856",  # Xtrackers II Global Government Bond UCITS ETF
    ]
    
    print("🔍 TEST NOVÝCH 20 ETF - OVĚŘENÍ OPRAV")
    print("=" * 80)
    print("Testuje různé kategorie: dluhopisy, komodity, sektorové, regionální, ESG")
    print("Různé poskytovatele: iShares, Vanguard, Xtrackers, Amundi, BNP, WisdomTree")
    
    scraper = CompleteProductionScraper()
    results = []
    
    for i, isin in enumerate(new_test_etfs, 1):
        print(f"\n[{i}/20] Processing ISIN: {isin}")
        print("-" * 50)
        
        try:
            etf_data = scraper.scrape_etf_complete_with_retry(isin)
            
            if etf_data:
                # Zkontroluj klíčová pole
                result = {
                    'isin': isin,
                    'name': etf_data.name,
                    'fund_provider': etf_data.fund_provider,
                    'category': etf_data.category,
                    'region': etf_data.region,
                    'legal_structure': etf_data.legal_structure,
                    'distribution_frequency': etf_data.distribution_frequency,
                    'investment_focus': etf_data.investment_focus,
                    'sustainability': etf_data.sustainability,
                    'primary_ticker': etf_data.primary_ticker,
                    'ter': etf_data.ter,
                    'fund_size': etf_data.fund_size,
                    'success': True
                }
                
                print(f"✅ {etf_data.name[:60]}...")
                print(f"   Provider: {etf_data.fund_provider}")
                print(f"   Category: {etf_data.category}")
                print(f"   Region: {etf_data.region}")
                print(f"   Ticker: {etf_data.primary_ticker}")
                
                # Zkontroluj dříve prázdná pole
                empty_fields = []
                if not etf_data.legal_structure or etf_data.legal_structure.strip() == '':
                    empty_fields.append('legal_structure')
                if not etf_data.distribution_frequency or etf_data.distribution_frequency.strip() == '':
                    empty_fields.append('distribution_frequency')
                if not etf_data.investment_focus or etf_data.investment_focus.strip() == '':
                    empty_fields.append('investment_focus')
                if not etf_data.sustainability or etf_data.sustainability.strip() == '':
                    empty_fields.append('sustainability')
                
                if empty_fields:
                    print(f"   ⚠️  Empty fields: {', '.join(empty_fields)}")
                else:
                    print(f"   🎉 All previously empty fields now filled!")
                
            else:
                result = {'isin': isin, 'success': False, 'error': 'No data returned'}
                print(f"❌ Failed to scrape {isin}")
        
        except Exception as e:
            result = {'isin': isin, 'success': False, 'error': str(e)}
            print(f"❌ Error processing {isin}: {e}")
        
        results.append(result)
    
    # Analýza výsledků
    print(f"\n{'='*80}")
    print("📊 ANALÝZA VÝSLEDKŮ NOVÉHO TESTU")
    print("=" * 80)
    
    successful_results = [r for r in results if r.get('success', False)]
    print(f"✅ Successfully scraped: {len(successful_results)}/20 ({len(successful_results)/20*100:.1f}%)")
    
    if successful_results:
        # Analýza podle kategorií
        categories = {}
        regions = {}
        providers = {}
        
        # Analýza dříve prázdných polí
        legal_structure_filled = 0
        distribution_frequency_filled = 0
        investment_focus_filled = 0
        sustainability_filled = 0
        
        for result in successful_results:
            # Kategorie
            cat = result.get('category', 'Unknown')
            categories[cat] = categories.get(cat, 0) + 1
            
            # Regiony
            reg = result.get('region', 'Unknown')
            regions[reg] = regions.get(reg, 0) + 1
            
            # Poskytovatelé
            prov = result.get('fund_provider', 'Unknown')
            providers[prov] = providers.get(prov, 0) + 1
            
            # Dříve prázdná pole
            if result.get('legal_structure') and result.get('legal_structure').strip():
                legal_structure_filled += 1
            if result.get('distribution_frequency') and result.get('distribution_frequency').strip():
                distribution_frequency_filled += 1
            if result.get('investment_focus') and result.get('investment_focus').strip():
                investment_focus_filled += 1
            if result.get('sustainability') and result.get('sustainability').strip():
                sustainability_filled += 1
        
        total = len(successful_results)
        
        print(f"\n📋 KATEGORIE:")
        for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            print(f"   {cat}: {count} ETF ({count/total*100:.1f}%)")
        
        print(f"\n🌍 REGIONY:")
        for reg, count in sorted(regions.items(), key=lambda x: x[1], reverse=True):
            print(f"   {reg}: {count} ETF ({count/total*100:.1f}%)")
        
        print(f"\n🏢 POSKYTOVATELÉ:")
        for prov, count in sorted(providers.items(), key=lambda x: x[1], reverse=True):
            print(f"   {prov}: {count} ETF ({count/total*100:.1f}%)")
        
        print(f"\n🔧 DŘÍVE PRÁZDNÁ POLE - POKROK:")
        print(f"   Legal Structure: {legal_structure_filled}/{total} ({legal_structure_filled/total*100:.1f}%)")
        print(f"   Distribution Frequency: {distribution_frequency_filled}/{total} ({distribution_frequency_filled/total*100:.1f}%)")
        print(f"   Investment Focus: {investment_focus_filled}/{total} ({investment_focus_filled/total*100:.1f}%)")
        print(f"   Sustainability: {sustainability_filled}/{total} ({sustainability_filled/total*100:.1f}%)")
        
        # Kontrola problémů
        unknown_categories = [r for r in successful_results if r.get('category') in ['Ostatní', 'Unknown', '']]
        unknown_regions = [r for r in successful_results if r.get('region') in ['Neznámý', 'Unknown', 'Ostatní', '']]
        empty_providers = [r for r in successful_results if not r.get('fund_provider') or r.get('fund_provider').strip() == '']
        
        print(f"\n⚠️  POTENCIÁLNÍ PROBLÉMY:")
        if unknown_categories:
            print(f"   Neznámé kategorie: {len(unknown_categories)} ETF")
        if unknown_regions:
            print(f"   Neznámé regiony: {len(unknown_regions)} ETF")
        if empty_providers:
            print(f"   Prázdní poskytovatelé: {len(empty_providers)} ETF")
        
        if not unknown_categories and not unknown_regions and not empty_providers:
            print(f"   🎉 Žádné zásadní problémy!")
    
    return results

if __name__ == "__main__":
    test_new_20_etfs()