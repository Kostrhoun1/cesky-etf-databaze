#!/usr/bin/env python3
"""
Test script pro aktualizovaný scraper s novými poli
Testuje currency_risk, strategy_risk a zjednodušenou kategorizaci
"""

import sys
import os
import json
from final_scraper import CompleteProductionScraper

def test_updated_scraper():
    """Test aktualizovaného scraperu s novými poli"""
    
    # Načti 100 ETF z CSV souboru
    csv_file = input("Zadej cestu k CSV souboru s ISIN kódy (nebo Enter pro default): ").strip()
    if not csv_file:
        # Vytvoř seznam 100 nejpopulárnějších ETF pro test
        test_etfs = [
            # US Akciové ETF
            'IE00B4L5Y983', 'IE00B5BMR087', 'IE00B3RBWM25', 'IE00BFY0GT14', 'IE00B4L5YC18',
            'IE00BK1PV551', 'IE00BKM4GZ66', 'IE00BJ0KDQ92', 'IE00B441G979', 'IE00B4K48X80',
            # Evropské ETF
            'IE00B4K48X80', 'IE00B4L5Y983', 'IE00BK5BQT80', 'IE00B1XNHC34', 'IE00B4WXJJ64',
            'IE00BKM4GZ66', 'IE00B52VJ196', 'IE00BK5BQV03', 'IE00B1FZS350', 'IE00B14X4N27',
            # Emerging Markets
            'IE00B4L5YC18', 'IE00BKM4GZ66', 'IE00B0M63177', 'IE00BZ163G84', 'IE00B1FZS350',
            'IE00BKM4H197', 'IE00B5L8K969', 'IE00B466KX20', 'IE00B2NPKV68', 'IE00B3YLTY66',
            # Dluhopisové ETF
            'IE00BZ163L38', 'IE00B3VWN518', 'IE00BZ163M45', 'IE00B14X4M10', 'IE00B1FZSC47',
            'IE00B3F81409', 'IE00B14X4Q57', 'IE00B4WXJD03', 'IE00B3DKXQ41', 'IE00B4WXJH71',
            # Hedged ETF (klíčové pro test currency_risk)
            'IE000Z3S26J2', 'IE00BKBF6H24', 'IE00B8GKDB10', 'IE00BG13YL86', 'IE00BGJWQW54',
            'IE00BYXG2H39', 'IE00B6R52259', 'IE00BYXG2L65', 'IE00B945VV12', 'IE00BFNM3G05',
            # Sektorové ETF
            'IE00B3WJKG14', 'IE00B4MEQM36', 'IE00B6R52036', 'IE00BYXG2M72', 'IE00B3WJKD61',
            'IE00BYXG2S69', 'IE00BFNM3N12', 'IE00B6R52143', 'IE00BWZN1T31', 'IE00B3WJMF04',
            # Komoditní a alternativní ETF
            'IE00B579F325', 'IE00B4ND3602', 'IE00B4WXJG34', 'IE00B6R51Z18', 'IE00B4WXJH71',
            'IE00BFNM3P42', 'IE00B6R52259', 'IE00B4PUP468', 'IE00BWZN0Q95', 'IE00BYYL9714',
            # REIT ETF
            'IE00B1FZS467', 'IE00B14X4T88', 'IE00B4G8SV44', 'IE00BYXG2V04', 'IE00B4G8T94',
            'IE00B14X4V90', 'IE00BYXG2W11', 'IE00B1FZS574', 'IE00B4G8SX68', 'IE00BYXG2X28',
            # Více diverse ETF pro kompletní test
            'LU0290358497', 'LU0274208692', 'LU0274208346', 'LU0274211217', 'LU0274208999',
            'LU0839027447', 'LU0274208775', 'LU0274211308', 'LU0839027363', 'LU0274211142',
            'LU0274208858', 'LU0839027520', 'LU0274208932', 'LU0274211225', 'LU0839027447'
        ]
        test_etfs = test_etfs[:100]  # Omez na 100
    else:
        # Načti z CSV
        import csv
        test_etfs = []
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for i, row in enumerate(reader):
                    if i >= 100:  # Limit 100 ETF
                        break
                    isin = row['ISIN'].strip()
                    if isin and len(isin) == 12:
                        test_etfs.append(isin)
        except Exception as e:
            print(f"❌ Chyba při načítání CSV: {e}")
            return []
    
    print("🚀 TESTOVÁNÍ AKTUALIZOVANÉHO SCRAPERU")
    print("="*60)
    print(f"Test ETF: {len(test_etfs)} fondů")
    print("Nová pole: currency_risk, strategy_risk")
    print("Zjednodušená logika: investment_focus priorita")
    print("="*60)
    
    scraper = CompleteProductionScraper()
    results = []
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n📊 [{i}/{len(test_etfs)}] Testování {isin}")
        print("-" * 40)
        
        try:
            # Scrape ETF
            etf = scraper.scrape_etf_complete_with_retry(isin)
            
            if etf.scraping_status == 'success':
                # DETAILNÍ TEST VŠECH POLÍ
                test_results = {
                    'isin': etf.isin,
                    'name': etf.name,
                    'fund_provider': etf.fund_provider,
                    
                    # NOVÁ POLE - prioritní test
                    'investment_focus': etf.investment_focus,
                    'currency_risk': etf.currency_risk,
                    'strategy_risk': etf.strategy_risk,
                    
                    # KATEGORIZACE A REGION
                    'category': etf.category,
                    'region': etf.region,
                    'is_leveraged': etf.is_leveraged,
                    
                    # ZÁKLADNÍ INFO
                    'fund_currency': etf.fund_currency,
                    'fund_domicile': etf.fund_domicile,
                    'inception_date': etf.inception_date,
                    'ter_numeric': etf.ter_numeric,
                    'fund_size_numeric': etf.fund_size_numeric,
                    
                    # STRUKTURA
                    'distribution_policy': etf.distribution_policy,
                    'distribution_frequency': etf.distribution_frequency,
                    'replication': etf.replication,
                    'legal_structure': etf.legal_structure,
                    'sustainability': etf.sustainability,
                    
                    # PERFORMANCE
                    'return_1y': etf.return_1y,
                    'return_3y': etf.return_3y,
                    'return_5y': etf.return_5y,
                    'return_ytd': etf.return_ytd,
                    
                    # INDEX INFO
                    'index_name': etf.index_name,
                    'total_holdings': etf.total_holdings,
                    
                    # BURZY
                    'primary_exchange': etf.primary_exchange,
                    'primary_ticker': etf.primary_ticker,
                    'total_exchanges': etf.total_exchanges,
                    
                    # DIVIDENDY
                    'current_dividend_yield_numeric': etf.current_dividend_yield_numeric,
                    'dividends_12m_numeric': etf.dividends_12m_numeric,
                    
                    # SCRAPING STATUS
                    'scraping_status': etf.scraping_status
                }
                
                results.append(test_results)
                
                # Kompaktní výpis pro 100 ETF
                print(f"✅ [{etf.fund_provider}] {etf.name[:50]}...")
                print(f"   💱 Currency: {etf.currency_risk or 'N/A'} | Focus: {(etf.investment_focus or 'N/A')[:30]}...")
                print(f"   📂 {etf.category} | 🌍 {etf.region} | TER: {etf.ter_numeric or 'N/A'}%")
                
                # DETAILNÍ KVALITA DAT - count všech polí
                quality_fields = {
                    'investment_focus': bool(etf.investment_focus),
                    'currency_risk': bool(etf.currency_risk), 
                    'strategy_risk': bool(etf.strategy_risk),
                    'fund_currency': bool(etf.fund_currency),
                    'fund_domicile': bool(etf.fund_domicile),
                    'ter_numeric': bool(etf.ter_numeric),
                    'fund_size_numeric': bool(etf.fund_size_numeric),
                    'distribution_policy': bool(etf.distribution_policy),
                    'replication': bool(etf.replication),
                    'legal_structure': bool(etf.legal_structure),
                    'index_name': bool(etf.index_name),
                    'return_1y': bool(etf.return_1y),
                    'primary_ticker': bool(etf.primary_ticker),
                    'dividend_yield': bool(etf.current_dividend_yield_numeric)
                }
                
                filled_fields = sum(quality_fields.values())
                total_fields = len(quality_fields)
                quality_percent = (filled_fields / total_fields) * 100
                
                print(f"   🎯 Data Quality: {filled_fields}/{total_fields} ({quality_percent:.0f}%)")
                
                # Přidej quality info do výsledků
                test_results['quality_score'] = filled_fields
                test_results['quality_percent'] = quality_percent
                test_results['quality_fields'] = quality_fields
                
            else:
                print(f"❌ FAILED: {etf.scraping_status}")
                
        except Exception as e:
            print(f"💥 ERROR: {str(e)}")
    
    # DETAILNÍ ANALÝZA VÝSLEDKŮ
    print("\n" + "="*80)
    print("📊 DETAILNÍ ANALÝZA VÝSLEDKŮ - 100 ETF TEST")
    print("="*80)
    
    if results:
        total_etfs = len(results)
        success_rate = (total_etfs / len(test_etfs)) * 100
        
        print(f"✅ Úspěšně scrapováno: {total_etfs}/{len(test_etfs)} ETF ({success_rate:.1f}%)")
        
        # ANALÝZA NOVÝCH POLÍ
        print(f"\n🆕 NOVÁ POLE - STATISTIKY:")
        new_fields = ['investment_focus', 'currency_risk', 'strategy_risk']
        for field in new_fields:
            count = sum(1 for r in results if r[field])
            percentage = (count / total_etfs) * 100
            print(f"   {field}: {count}/{total_etfs} ({percentage:.1f}%)")
        
        # ANALÝZA VŠECH KLÍČOVÝCH POLÍ
        print(f"\n📋 VŠECHNA POLE - COVERAGE ANALÝZA:")
        all_fields = [
            'fund_currency', 'fund_domicile', 'ter_numeric', 'fund_size_numeric',
            'distribution_policy', 'replication', 'legal_structure', 'index_name',
            'return_1y', 'primary_ticker', 'current_dividend_yield_numeric'
        ]
        
        field_stats = {}
        for field in all_fields:
            count = sum(1 for r in results if r[field])
            percentage = (count / total_etfs) * 100
            field_stats[field] = (count, percentage)
            print(f"   {field}: {count}/{total_etfs} ({percentage:.1f}%)")
        
        # TOP a BOTTOM pole podle coverage
        sorted_fields = sorted(field_stats.items(), key=lambda x: x[1][1], reverse=True)
        print(f"\n🥇 NEJLEPŠÍ COVERAGE:")
        for field, (count, percent) in sorted_fields[:5]:
            print(f"   {field}: {percent:.1f}%")
        
        print(f"\n🚨 NEJHORŠÍ COVERAGE:")
        for field, (count, percent) in sorted_fields[-5:]:
            print(f"   {field}: {percent:.1f}%")
        
        # KVALITA DAT ANALÝZA
        quality_scores = [r['quality_score'] for r in results]
        avg_quality = sum(quality_scores) / len(quality_scores)
        max_quality = max(quality_scores)
        min_quality = min(quality_scores)
        
        print(f"\n🎯 KVALITA DAT:")
        print(f"   Průměr: {avg_quality:.1f}/14 polí ({avg_quality/14*100:.1f}%)")
        print(f"   Maximum: {max_quality}/14 polí")
        print(f"   Minimum: {min_quality}/14 polí")
        
        # TOP kvalita ETF
        top_quality_etfs = sorted(results, key=lambda x: x['quality_score'], reverse=True)[:5]
        print(f"\n🏆 TOP 5 ETF PODLE KVALITY DAT:")
        for etf in top_quality_etfs:
            print(f"   {etf['name'][:40]}... - {etf['quality_score']}/14 ({etf['quality_percent']:.0f}%)")
        
        # KATEGORIE A REGIONY
        categories = {}
        regions = {}
        providers = {}
        
        for r in results:
            categories[r['category']] = categories.get(r['category'], 0) + 1
            regions[r['region']] = regions.get(r['region'], 0) + 1
            providers[r['fund_provider']] = providers.get(r['fund_provider'], 0) + 1
        
        print(f"\n📂 KATEGORIE DISTRIBUCE:")
        for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            print(f"   {cat}: {count} ({count/total_etfs*100:.1f}%)")
        
        print(f"\n🌍 REGION DISTRIBUCE:")
        for reg, count in sorted(regions.items(), key=lambda x: x[1], reverse=True):
            print(f"   {reg}: {count} ({count/total_etfs*100:.1f}%)")
        
        print(f"\n🏢 TOP PROVIDERS:")
        for prov, count in sorted(providers.items(), key=lambda x: x[1], reverse=True)[:10]:
            print(f"   {prov}: {count}")
        
        # HEDGED ETF ANALÝZA
        hedged_etfs = [r for r in results if r['currency_risk'] and 'hedged' in r['currency_risk'].lower()]
        print(f"\n💱 HEDGED ETF DETEKCE:")
        print(f"   Celkem hedged: {len(hedged_etfs)}/{total_etfs} ({len(hedged_etfs)/total_etfs*100:.1f}%)")
        
        if hedged_etfs:
            print(f"   Příklady hedged ETF:")
            for etf in hedged_etfs[:5]:
                print(f"     {etf['name'][:40]}... - {etf['currency_risk']}")
        
        # EXPORT DETAILNÍCH VÝSLEDKŮ
        output_file = f'detailed_test_results_{total_etfs}etf.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                'summary': {
                    'total_tested': len(test_etfs),
                    'successful': total_etfs,
                    'success_rate': success_rate,
                    'avg_quality': avg_quality,
                    'field_coverage': field_stats
                },
                'results': results
            }, f, indent=2, ensure_ascii=False)
        
        # EXCEL EXPORT PRO LEPŠÍ ANALÝZU
        try:
            import pandas as pd
            df = pd.DataFrame(results)
            excel_file = f'detailed_test_results_{total_etfs}etf.xlsx'
            df.to_excel(excel_file, index=False)
            print(f"\n💾 Výsledky exportovány:")
            print(f"   JSON: {output_file}")
            print(f"   Excel: {excel_file}")
        except ImportError:
            print(f"\n💾 Výsledky exportovány: {output_file}")
        
    else:
        print("❌ Žádné úspěšné testy!")
    
    # DOPORUČENÍ PRO VYLEPŠENÍ
    print(f"\n🎯 DOPORUČENÍ PRO VYLEPŠENÍ:")
    if results:
        currency_risk_count = sum(1 for r in results if r['currency_risk'])
        if currency_risk_count == 0:
            print("🚨 KRITICKÉ: Currency Risk pole není scrapováno - zkontroluj regex patterny!")
        elif currency_risk_count < total_etfs * 0.5:
            print("⚠️  Currency Risk má nízkou coverage - zlepši regex patterny")
        else:
            print("✅ Currency Risk funguje dobře!")
        
        strategy_risk_count = sum(1 for r in results if r['strategy_risk'])
        if strategy_risk_count < total_etfs * 0.3:
            print("⚠️  Strategy Risk má nízkou coverage - možná není na všech ETF stránkách")
        
        investment_focus_count = sum(1 for r in results if r['investment_focus'])
        if investment_focus_count > total_etfs * 0.8:
            print("✅ Investment Focus má výbornou coverage!")
    
    return results

if __name__ == "__main__":
    results = test_updated_scraper()