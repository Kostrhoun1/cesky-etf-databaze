#!/usr/bin/env python3
"""
Detailní test 20 ETF s kompletní analýzou kvality dat
"""

import sys
import os
import json
from final_scraper import CompleteProductionScraper

def test_20_etf_detailed():
    """Detailní test 20 ETF s analýzou všech polí"""
    
    # 20 různorodých ETF pro kompletní test
    test_etfs = [
        # US Akciové ETF (5)
        'IE00B4L5Y983',  # iShares Core MSCI World
        'IE00B5BMR087',  # iShares Core S&P 500  
        'IE00B3RBWM25',  # Vanguard FTSE All-World
        'IE00BFY0GT14',  # iShares Core S&P 500 Info Tech
        'IE00B4L5YC18',  # iShares Core MSCI EM IMI
        
        # Hedged ETF (5) - kritické pro currency_risk test
        'IE000Z3S26J2',  # iShares S&P 500 EUR Hedged
        'IE00BKBF6H24',  # iShares Core MSCI World EUR Hedged  
        'IE00B8GKDB10',  # iShares EUR Corp Bond EUR Hedged
        'IE00BG13YL86',  # iShares MSCI EM EUR Hedged
        'IE00BGJWQW54',  # iShares NASDAQ 100 EUR Hedged
        
        # Dluhopisové ETF (3)
        'IE00BZ163L38',  # iShares Core EUR Govt Bond
        'IE00B3VWN518',  # Vanguard EUR Treasury Bond
        'IE00BZ163M45',  # iShares EUR Corp Bond
        
        # Sektorové a alternativní ETF (4)
        'IE00B3WJKG14',  # iShares Global Clean Energy
        'IE00B4MEQM36',  # iShares Healthcare Innovation
        'IE00B1FZS467',  # iShares Developed Markets Property
        'IE00B579F325',  # iShares Physical Gold
        
        # Jiní provideři (3)
        'LU0290358497',  # Xtrackers EUR Overnight Rate
        'LU0274208692',  # Xtrackers MSCI World
        'LU0908500753',  # Xtrackers MSCI Emerging Markets
    ]
    
    print("🔬 DETAILNÍ TEST - 20 ETF")
    print("="*60)
    print(f"Test ETF: {len(test_etfs)} fondů")
    print("Analýza: Všechna pole + kvalita dat")
    print("Focus: currency_risk, investment_focus, kategorizace")
    print("="*60)
    
    scraper = CompleteProductionScraper()
    results = []
    failed_etfs = []
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n📊 [{i}/{len(test_etfs)}] {isin}")
        print("-" * 50)
        
        try:
            etf = scraper.scrape_etf_complete_with_retry(isin, max_retries=2)
            
            if etf.scraping_status == 'success':
                # KOMPLETNÍ DATA PRO ANALÝZU
                etf_data = {
                    'isin': etf.isin,
                    'name': etf.name,
                    'fund_provider': etf.fund_provider,
                    
                    # NOVÁ POLE - prioritní analýza
                    'investment_focus': etf.investment_focus,
                    'currency_risk': etf.currency_risk,
                    'strategy_risk': etf.strategy_risk,
                    
                    # KATEGORIZACE
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
                    'volatility_1y': etf.volatility_1y,
                    
                    # INDEX A HOLDINGS
                    'index_name': etf.index_name,
                    'total_holdings': etf.total_holdings,
                    
                    # EXCHANGE DATA
                    'primary_exchange': etf.primary_exchange,
                    'primary_ticker': etf.primary_ticker,
                    'total_exchanges': etf.total_exchanges,
                    
                    # DIVIDENDY
                    'current_dividend_yield_numeric': etf.current_dividend_yield_numeric,
                    'dividends_12m_numeric': etf.dividends_12m_numeric,
                    'dividends_12m_currency': etf.dividends_12m_currency,
                    
                    # RISK METRICS
                    'beta': etf.beta,
                    'correlation': etf.correlation,
                    'tracking_error': etf.tracking_error,
                    'max_drawdown_1y': etf.max_drawdown_1y,
                    
                    'scraping_status': etf.scraping_status
                }
                
                # KVALITA DAT - detailní scoring
                quality_fields = {
                    # CORE FIELDS (kritické)
                    'fund_currency': bool(etf.fund_currency),
                    'fund_domicile': bool(etf.fund_domicile), 
                    'ter_numeric': bool(etf.ter_numeric),
                    'fund_size_numeric': bool(etf.fund_size_numeric),
                    'distribution_policy': bool(etf.distribution_policy),
                    'index_name': bool(etf.index_name),
                    
                    # NOVÁ POLE (prioritní)
                    'investment_focus': bool(etf.investment_focus),
                    'currency_risk': bool(etf.currency_risk),
                    'strategy_risk': bool(etf.strategy_risk),
                    
                    # STRUKTURA
                    'replication': bool(etf.replication),
                    'legal_structure': bool(etf.legal_structure),
                    'inception_date': bool(etf.inception_date),
                    
                    # PERFORMANCE
                    'return_1y': bool(etf.return_1y),
                    'return_ytd': bool(etf.return_ytd),
                    
                    # EXCHANGE
                    'primary_ticker': bool(etf.primary_ticker),
                    'primary_exchange': bool(etf.primary_exchange),
                    
                    # ADVANCED
                    'current_dividend_yield_numeric': bool(etf.current_dividend_yield_numeric),
                    'total_holdings': bool(etf.total_holdings),
                    'sustainability': bool(etf.sustainability),
                    'tracking_error': bool(etf.tracking_error)
                }
                
                filled_fields = sum(quality_fields.values())
                total_fields = len(quality_fields)
                quality_percent = (filled_fields / total_fields) * 100
                
                etf_data['quality_score'] = filled_fields
                etf_data['quality_percent'] = quality_percent
                etf_data['quality_fields'] = quality_fields
                
                results.append(etf_data)
                
                # VÝPIS VÝSLEDKŮ
                print(f"✅ {etf.fund_provider} | {etf.name[:60]}...")
                
                # NOVÁ POLE status
                focus_icon = "📊" if etf.investment_focus else "❌"
                currency_icon = "💱" if etf.currency_risk else "❌"
                strategy_icon = "⚠️" if etf.strategy_risk else "❌"
                hedged_icon = "🔒" if (etf.currency_risk and ('eur' in etf.currency_risk.lower() or 'hedged' in etf.currency_risk.lower())) else "🔓"
                
                print(f"   NOVÁ POLE: {focus_icon}Focus {currency_icon}Currency {strategy_icon}Strategy {hedged_icon}Hedged")
                print(f"   Investment Focus: {(etf.investment_focus or 'N/A')[:50]}...")
                print(f"   Currency Risk: {etf.currency_risk or 'N/A'}")
                print(f"   Strategy Risk: {etf.strategy_risk or 'N/A'}")
                
                # KATEGORIZACE
                print(f"   KATEGORIZACE: 📂{etf.category} | 🌍{etf.region} | 📈{etf.is_leveraged and 'Páková' or 'Normální'}")
                
                # ZÁKLADNÍ DATA
                print(f"   ZÁKLADNÍ: {etf.fund_currency} | {etf.fund_domicile} | TER:{etf.ter_numeric}% | Size:{etf.fund_size_numeric or 'N/A'}M")
                
                # KVALITA
                print(f"   🎯 KVALITA: {filled_fields}/{total_fields} ({quality_percent:.0f}%) | Status: {'VÝBORNÁ' if quality_percent >= 80 else 'DOBRÁ' if quality_percent >= 60 else 'PRŮMĚRNÁ'}")
                
            else:
                failed_etfs.append({'isin': isin, 'status': etf.scraping_status})
                print(f"❌ FAILED: {etf.scraping_status}")
                
        except Exception as e:
            failed_etfs.append({'isin': isin, 'error': str(e)})
            print(f"💥 ERROR: {str(e)[:80]}...")
    
    # DETAILNÍ ANALÝZA VÝSLEDKŮ
    print("\n" + "="*80)
    print("📊 DETAILNÍ ANALÝZA VÝSLEDKŮ - 20 ETF")
    print("="*80)
    
    if results:
        total_success = len(results)
        success_rate = (total_success / len(test_etfs)) * 100
        
        print(f"✅ ÚSPĚŠNOST: {total_success}/{len(test_etfs)} ({success_rate:.1f}%)")
        print(f"❌ SELHÁNÍ: {len(failed_etfs)}")
        
        # ANALÝZA NOVÝCH POLÍ
        print(f"\n🆕 NOVÁ POLE - DETAILNÍ ANALÝZA:")
        new_fields_stats = {
            'investment_focus': [r for r in results if r['investment_focus']],
            'currency_risk': [r for r in results if r['currency_risk']],
            'strategy_risk': [r for r in results if r['strategy_risk']]
        }
        
        for field, found_results in new_fields_stats.items():
            count = len(found_results)
            percentage = (count / total_success) * 100
            print(f"   {field}: {count}/{total_success} ({percentage:.1f}%)")
            
            if found_results and field == 'currency_risk':
                print(f"     Příklady hodnot:")
                for r in found_results[:3]:
                    print(f"       {r['name'][:30]}... → {r['currency_risk']}")
        
        # HEDGED ETF DETEKCE
        hedged_etfs = []
        for r in results:
            if r['currency_risk']:
                currency_text = r['currency_risk'].lower()
                if 'eur' in currency_text or 'hedged' in currency_text:
                    if not ('usd' in currency_text and 'eur' not in currency_text):
                        hedged_etfs.append(r)
        
        print(f"\n💱 HEDGED ETF DETEKCE:")
        print(f"   Detekované hedged ETF: {len(hedged_etfs)}/{total_success} ({len(hedged_etfs)/total_success*100:.1f}%)")
        if hedged_etfs:
            print(f"   Hedged ETF:")
            for etf in hedged_etfs:
                print(f"     {etf['name'][:40]}... → {etf['currency_risk']}")
        
        # KVALITA DAT ANALÝZA
        quality_scores = [r['quality_score'] for r in results]
        avg_quality = sum(quality_scores) / len(quality_scores)
        max_quality = max(quality_scores)
        min_quality = min(quality_scores)
        
        print(f"\n🎯 KVALITA DAT ANALÝZA:")
        print(f"   Průměrná kvalita: {avg_quality:.1f}/20 polí ({avg_quality/20*100:.1f}%)")
        print(f"   Nejlepší: {max_quality}/20 polí")
        print(f"   Nejhorší: {min_quality}/20 polí")
        
        # TOP a WORST ETF podle kvality
        sorted_by_quality = sorted(results, key=lambda x: x['quality_score'], reverse=True)
        print(f"\n🏆 TOP 5 ETF PODLE KVALITY:")
        for etf in sorted_by_quality[:5]:
            print(f"   {etf['name'][:50]}... - {etf['quality_score']}/20 ({etf['quality_percent']:.0f}%)")
        
        print(f"\n🔻 NEJHORŠÍ ETF PODLE KVALITY:")
        for etf in sorted_by_quality[-3:]:
            print(f"   {etf['name'][:50]}... - {etf['quality_score']}/20 ({etf['quality_percent']:.0f}%)")
        
        # ANALÝZA COVERAGE JEDNOTLIVÝCH POLÍ
        print(f"\n📋 COVERAGE JEDNOTLIVÝCH POLÍ:")
        field_coverage = {}
        sample_etf = results[0]['quality_fields']
        
        for field in sample_etf.keys():
            count = sum(1 for r in results if r['quality_fields'][field])
            percentage = (count / total_success) * 100
            field_coverage[field] = (count, percentage)
        
        # Seřazeno podle coverage
        sorted_coverage = sorted(field_coverage.items(), key=lambda x: x[1][1], reverse=True)
        
        print(f"   🥇 NEJLEPŠÍ COVERAGE:")
        for field, (count, percent) in sorted_coverage[:8]:
            status = "🟢" if percent >= 90 else "🟡" if percent >= 70 else "🔴"
            print(f"     {status} {field}: {count}/{total_success} ({percent:.0f}%)")
        
        print(f"\n   🚨 NEJHORŠÍ COVERAGE:")
        for field, (count, percent) in sorted_coverage[-5:]:
            status = "🟢" if percent >= 90 else "🟡" if percent >= 70 else "🔴"
            print(f"     {status} {field}: {count}/{total_success} ({percent:.0f}%)")
        
        # KATEGORIZACE ANALÝZA
        categories = {}
        regions = {}
        providers = {}
        
        for r in results:
            categories[r['category']] = categories.get(r['category'], 0) + 1
            regions[r['region']] = regions.get(r['region'], 0) + 1
            providers[r['fund_provider']] = providers.get(r['fund_provider'], 0) + 1
        
        print(f"\n📂 KATEGORIZACE VÝSLEDKY:")
        for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            print(f"   {cat}: {count} ({count/total_success*100:.0f}%)")
        
        print(f"\n🌍 REGION MAPPING:")
        for reg, count in sorted(regions.items(), key=lambda x: x[1], reverse=True):
            print(f"   {reg}: {count} ({count/total_success*100:.0f}%)")
        
        print(f"\n🏢 PROVIDEŘI:")
        for prov, count in sorted(providers.items(), key=lambda x: x[1], reverse=True):
            print(f"   {prov}: {count}")
        
        # EXPORT VÝSLEDKŮ
        output_data = {
            'summary': {
                'total_tested': len(test_etfs),
                'successful': total_success,
                'failed': len(failed_etfs),
                'success_rate': success_rate,
                'avg_quality': avg_quality,
                'new_fields_coverage': {k: len(v)/total_success*100 for k, v in new_fields_stats.items()},
                'field_coverage': {k: v[1] for k, v in field_coverage.items()}
            },
            'results': results,
            'failed_etfs': failed_etfs
        }
        
        output_file = 'detailed_20etf_test_results.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        # EXCEL export pro analýzu
        try:
            import pandas as pd
            df = pd.DataFrame(results)
            excel_file = 'detailed_20etf_test_results.xlsx'
            df.to_excel(excel_file, index=False)
            print(f"\n💾 VÝSLEDKY EXPORTOVÁNY:")
            print(f"   📊 Excel: {excel_file}")
            print(f"   📄 JSON: {output_file}")
        except ImportError:
            print(f"\n💾 JSON export: {output_file}")
        
    else:
        print("❌ Žádné úspěšné testy!")
    
    # DOPORUČENÍ A ZÁVĚRY
    print(f"\n🎯 ZÁVĚRY A DOPORUČENÍ:")
    if results:
        currency_risk_count = len(new_fields_stats['currency_risk'])
        investment_focus_count = len(new_fields_stats['investment_focus'])
        
        if currency_risk_count >= total_success * 0.8:
            print("✅ Currency Risk má výbornou coverage - hedging detekce bude 100% přesná!")
        elif currency_risk_count >= total_success * 0.5:
            print("🟡 Currency Risk má dobrou coverage - většina hedging bude detekována")
        else:
            print("🔴 Currency Risk má nízkou coverage - zkontroluj regex patterny")
        
        if investment_focus_count >= total_success * 0.9:
            print("✅ Investment Focus je perfektní - kategorizace bude přesnější!")
        else:
            print("🟡 Investment Focus potřebuje zlepšení")
        
        if avg_quality >= 16:
            print("✅ Celková kvalita dat je výborná!")
        elif avg_quality >= 12:
            print("🟡 Celková kvalita dat je dobrá")
        else:
            print("🔴 Celková kvalita dat potřebuje zlepšení")
    
    return results

if __name__ == "__main__":
    test_20_etf_detailed()