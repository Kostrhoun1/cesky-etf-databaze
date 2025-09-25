#!/usr/bin/env python3
"""
Rychlý spouštěcí script pro 100 ETF test bez input()
"""

import sys
import os
import json
from final_scraper import CompleteProductionScraper

def run_automated_100_test():
    """Test 100 ETF bez interaktivního inputu"""
    
    # Automaticky vybraných 100 nejpopulárnějších ETF
    test_etfs = [
        # US Akciové ETF (20)
        'IE00B4L5Y983', 'IE00B5BMR087', 'IE00B3RBWM25', 'IE00BFY0GT14', 'IE00B4L5YC18',
        'IE00BK1PV551', 'IE00BKM4GZ66', 'IE00BJ0KDQ92', 'IE00B441G979', 'IE00B4K48X80',
        'IE00B1XNHC34', 'IE00B4WXJJ64', 'IE00B52VJ196', 'IE00BK5BQV03', 'IE00B1FZS350',
        'IE00B14X4N27', 'IE00B0M63177', 'IE00BZ163G84', 'IE00BKM4H197', 'IE00B5L8K969',
        
        # Evropské ETF (15)
        'IE00B4K48X80', 'IE00BK5BQT80', 'IE00B466KX20', 'IE00B2NPKV68', 'IE00B3YLTY66',
        'IE00BZ163L38', 'IE00B3VWN518', 'IE00BZ163M45', 'IE00B14X4M10', 'IE00B1FZSC47',
        'IE00B3F81409', 'IE00B14X4Q57', 'IE00B4WXJD03', 'IE00B3DKXQ41', 'IE00B4WXJH71',
        
        # Hedged ETF (20) - KRITICKÉ PRO CURRENCY_RISK TEST
        'IE000Z3S26J2', 'IE00BKBF6H24', 'IE00B8GKDB10', 'IE00BG13YL86', 'IE00BGJWQW54',
        'IE00BYXG2H39', 'IE00B6R52259', 'IE00BYXG2L65', 'IE00B945VV12', 'IE00BFNM3G05',
        'IE00B6R52036', 'IE00BYXG2M72', 'IE00BFNM3N12', 'IE00B6R52143', 'IE00BWZN1T31',
        'IE00B579F325', 'IE00B4ND3602', 'IE00B4WXJG34', 'IE00B6R51Z18', 'IE00BFNM3P42',
        
        # Sektorové ETF (15)
        'IE00B3WJKG14', 'IE00B4MEQM36', 'IE00B3WJKD61', 'IE00BYXG2S69', 'IE00B3WJMF04',
        'IE00B4PUP468', 'IE00BWZN0Q95', 'IE00BYYL9714', 'IE00B1FZS467', 'IE00B14X4T88',
        'IE00B4G8SV44', 'IE00BYXG2V04', 'IE00B4G8T94', 'IE00B14X4V90', 'IE00BYXG2W11',
        
        # REIT a Komodity (10)
        'IE00B1FZS574', 'IE00B4G8SX68', 'IE00BYXG2X28', 'IE00B579F325', 'IE00B4ND3602',
        'IE00B4WXJG34', 'IE00B6R51Z18', 'IE00B4WXJH71', 'IE00BFNM3P42', 'IE00B6R52259',
        
        # Xtrackers a další provideři (20)
        'LU0290358497', 'LU0274208692', 'LU0274208346', 'LU0274211217', 'LU0274208999',
        'LU0839027447', 'LU0274208775', 'LU0274211308', 'LU0839027363', 'LU0274211142',
        'LU0274208858', 'LU0839027520', 'LU0274208932', 'LU0274211225', 'LU0839027447',
        'LU0908500753', 'LU0908501017', 'LU0908501108', 'LU0908501280', 'LU0908501447'
    ]
    
    print("🚀 AUTOMATICKÝ TEST 100 ETF - AKTUALIZOVANÝ SCRAPER")
    print("="*70)
    print(f"Test ETF: {len(test_etfs)} fondů")
    print("Fokus: currency_risk, strategy_risk, investment_focus")
    print("Zjednodušená kategorizace a region mapping")
    print("="*70)
    
    scraper = CompleteProductionScraper()
    results = []
    failed_count = 0
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n📊 [{i}/{len(test_etfs)}] {isin}")
        
        try:
            etf = scraper.scrape_etf_complete_with_retry(isin, max_retries=2)
            
            if etf.scraping_status == 'success':
                # OPRAVENO: Použít kompletní to_dict() metodu místo vlastního slovníku
                test_results = etf.to_dict()
                
                results.append(test_results)
                
                # Rychlý status
                hedged_status = "🔒" if (etf.currency_risk and 'hedged' in etf.currency_risk.lower()) else "🔓"
                focus_status = "📊" if etf.investment_focus else "❌"
                
                print(f"✅ {etf.fund_provider} | {hedged_status} {focus_status} | {etf.category} | {etf.region}")
                
            else:
                failed_count += 1
                print(f"❌ FAILED: {etf.scraping_status}")
                
        except Exception as e:
            failed_count += 1
            print(f"💥 ERROR: {str(e)[:100]}...")
    
    # VÝSLEDKOVÁ ANALÝZA
    print("\n" + "="*70)
    print("📊 VÝSLEDKY AUTOMATICKÉHO TESTU")
    print("="*70)
    
    if results:
        total = len(results)
        success_rate = (total / len(test_etfs)) * 100
        
        print(f"✅ Úspěšnost: {total}/{len(test_etfs)} ({success_rate:.1f}%)")
        print(f"❌ Selhání: {failed_count}")
        
        # Analýza klíčových polí
        investment_focus_count = sum(1 for r in results if r['investment_focus'])
        currency_risk_count = sum(1 for r in results if r['currency_risk'])
        strategy_risk_count = sum(1 for r in results if r['strategy_risk'])
        
        print(f"\n🆕 NOVÁ POLE:")
        print(f"   investment_focus: {investment_focus_count}/{total} ({investment_focus_count/total*100:.1f}%)")
        print(f"   currency_risk: {currency_risk_count}/{total} ({currency_risk_count/total*100:.1f}%)")
        print(f"   strategy_risk: {strategy_risk_count}/{total} ({strategy_risk_count/total*100:.1f}%)")
        
        # Hedged ETF detekce
        hedged_etfs = [r for r in results if r['currency_risk'] and 'hedged' in r['currency_risk'].lower()]
        print(f"\n💱 HEDGED ETF: {len(hedged_etfs)}/{total} ({len(hedged_etfs)/total*100:.1f}%)")
        
        # Kategorie distribuce
        categories = {}
        for r in results:
            categories[r['category']] = categories.get(r['category'], 0) + 1
        
        print(f"\n📂 KATEGORIE:")
        for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            print(f"   {cat}: {count}")
        
        # Export
        output_file = f'automated_test_100etf_results.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 Výsledky: {output_file}")
        
        # Doporučení
        print(f"\n🎯 STATUS:")
        if currency_risk_count == 0:
            print("🚨 KRITICKÉ: Currency risk není scrapováno!")
        elif currency_risk_count > total * 0.5:
            print("✅ Currency risk funguje dobře!")
        
        if investment_focus_count > total * 0.8:
            print("✅ Investment focus výborný!")
        
    return results

if __name__ == "__main__":
    run_automated_100_test()