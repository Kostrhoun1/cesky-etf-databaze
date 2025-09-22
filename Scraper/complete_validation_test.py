#!/usr/bin/env python3
"""
KOMPLETNÍ VALIDAČNÍ TEST - 20 ETF s ověřením VŠECH polí
"""

import json
import time
from final_scraper import CompleteProductionScraper

def complete_validation_test():
    """Test 20 ETF s kompletní validací všech polí"""
    
    # Test ISIN - mix různých typů ETF
    test_isins = [
        "IE000IEGVMH6",  # Amundi Core MSCI USA - test case z problému
        "IE00B4L5Y983",  # iShares Core MSCI World UCITS ETF USD
        "IE00B5BMR087",  # iShares Core S&P 500 UCITS ETF USD  
        "IE00B3RBWM25",  # Vanguard FTSE All-World UCITS ETF
        "IE00BFY0GT14",  # SPDR MSCI World UCITS ETF
        "IE00B4L5YC18",  # iShares Core MSCI Emerging Markets IMI
        "IE00BK1PV551",  # Xtrackers MSCI World UCITS ETF
        "IE00BKM4GZ66",  # iShares Core MSCI Emerging Markets IMI
        "IE00BJ0KDQ92",  # Xtrackers MSCI World UCITS ETF 1C
        "IE00B441G979",  # iShares Core MSCI World UCITS ETF USD
        "IE00B4K48X80",  # iShares Core EURO STOXX 50 UCITS ETF
        "IE00B1XNHC34",  # iShares Core S&P 500 UCITS ETF USD
        "IE00B4WXJJ64",  # iShares Core Euro Government Bond UCITS ETF EUR
        "IE00B52VJ196",  # iShares Core EURO STOXX 50 UCITS ETF EUR
        "IE00BK5BQV03",  # Vanguard FTSE All-World UCITS ETF USD Acc
        "IE00B1FZS350",  # iShares Developed Markets Property Yield
        "IE00B14X4N27",  # iShares Core EURO STOXX 50 UCITS ETF EUR
        "IE00B0M63177",  # iShares MSCI Emerging Markets UCITS ETF
        "IE00BZ163G84",  # Vanguard USD Corporate Bond UCITS ETF
        "IE00BKM4H197"   # iShares Core MSCI Total World Stock Market
    ]
    
    print("🚀 KOMPLETNÍ VALIDAČNÍ TEST - 20 ETF")
    print("="*80)
    print("Testování VŠECH polí včetně performance dat")
    print("="*80)
    
    scraper = CompleteProductionScraper(batch_size=20)
    results = []
    
    for i, isin in enumerate(test_isins, 1):
        print(f"\n📊 [{i}/20] Testování {isin}")
        print("-" * 60)
        
        try:
            etf = scraper.scrape_etf_complete_with_retry(isin)
            results.append(etf.to_dict())
            
            # Immediate validation
            validate_etf_fields(etf, i)
            
            # Pauza mezi requesty
            time.sleep(2)
            
        except Exception as e:
            print(f"❌ CHYBA při scrapingu {isin}: {e}")
            continue
    
    # Kompletní analýza výsledků
    print("\n" + "="*80)
    print("📊 KOMPLETNÍ ANALÝZA VÝSLEDKŮ")
    print("="*80)
    
    analyze_all_fields(results)
    
    # Uložení výsledků
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    filename = f"complete_validation_test_{timestamp}.json"
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False, default=str)
    
    print(f"\n💾 Výsledky uloženy: {filename}")
    
    return results

def validate_etf_fields(etf, index):
    """Validace všech polí jednotlivého ETF"""
    
    # Základní pole
    basic_fields = ['isin', 'name', 'ter_numeric', 'fund_provider']
    basic_ok = all(getattr(etf, field, None) is not None for field in basic_fields)
    
    # Performance pole - KRITICKÉ
    performance_fields = [
        'return_1m', 'return_3m', 'return_6m', 
        'return_2021', 'return_2022', 'return_2023', 'return_2024',
        'return_1y', 'return_3y', 'return_5y', 'return_ytd',
        'return_inception'
    ]
    
    perf_results = {}
    for field in performance_fields:
        value = getattr(etf, field, None)
        perf_results[field] = value is not None
        if value is not None:
            print(f"  ✅ {field}: {value}%")
        else:
            print(f"  ❌ {field}: NULL")
    
    # Holdings
    holdings_ok = bool(getattr(etf, 'holding_1_name', None))
    
    # Exchange data
    exchange_ok = bool(getattr(etf, 'primary_ticker', None))
    
    # Nová pole
    new_fields = ['investment_focus', 'currency_risk', 'strategy_risk']
    new_results = {}
    for field in new_fields:
        value = getattr(etf, field, None)
        new_results[field] = value is not None
    
    # Shrnutí pro ETF
    total_perf = sum(perf_results.values())
    perf_percentage = (total_perf / len(performance_fields)) * 100
    
    print(f"  📊 SOUHRN ETF #{index}:")
    print(f"    Základní pole: {'✅' if basic_ok else '❌'}")
    print(f"    Performance: {total_perf}/{len(performance_fields)} ({perf_percentage:.1f}%)")
    print(f"    Holdings: {'✅' if holdings_ok else '❌'}")
    print(f"    Exchange: {'✅' if exchange_ok else '❌'}")
    print(f"    Nová pole: {sum(new_results.values())}/{len(new_fields)}")

def analyze_all_fields(results):
    """Analýza všech polí napříč všemi ETF"""
    
    if not results:
        print("❌ Žádné výsledky k analýze!")
        return
    
    total_etf = len(results)
    print(f"📊 Analyzuji {total_etf} ETF")
    
    # Performance pole analýza
    performance_fields = [
        'return_1m', 'return_3m', 'return_6m', 
        'return_2021', 'return_2022', 'return_2023', 'return_2024',
        'return_1y', 'return_3y', 'return_5y', 'return_ytd',
        'return_inception'
    ]
    
    print("\n🎯 PERFORMANCE DATA COVERAGE:")
    print("-" * 50)
    
    for field in performance_fields:
        count = sum(1 for etf in results if etf.get(field) is not None)
        percentage = (count / total_etf) * 100
        status = "✅" if percentage >= 90 else "⚠️" if percentage >= 50 else "❌"
        print(f"  {status} {field}: {count}/{total_etf} ({percentage:.1f}%)")
    
    # Ostatní pole
    print("\n📋 OSTATNÍ POLE:")
    print("-" * 50)
    
    other_fields = [
        'ter_numeric', 'fund_provider', 'category', 'region',
        'total_holdings', 'holding_1_name', 'primary_ticker',
        'investment_focus', 'currency_risk', 'strategy_risk',
        'current_dividend_yield_numeric', 'dividends_12m_numeric'
    ]
    
    for field in other_fields:
        count = sum(1 for etf in results if etf.get(field) is not None)
        percentage = (count / total_etf) * 100
        status = "✅" if percentage >= 90 else "⚠️" if percentage >= 50 else "❌"
        print(f"  {status} {field}: {count}/{total_etf} ({percentage:.1f}%)")
    
    # Celkové hodnocení
    print("\n🏆 CELKOVÉ HODNOCENÍ:")
    print("-" * 50)
    
    # Performance coverage
    perf_coverage = []
    for etf in results:
        count = sum(1 for field in performance_fields if etf.get(field) is not None)
        coverage = (count / len(performance_fields)) * 100
        perf_coverage.append(coverage)
    
    avg_coverage = sum(perf_coverage) / len(perf_coverage)
    
    print(f"  📊 Průměrná performance coverage: {avg_coverage:.1f}%")
    
    perfect_etfs = sum(1 for coverage in perf_coverage if coverage == 100)
    print(f"  🎯 ETF s kompletními performance daty: {perfect_etfs}/{total_etf}")
    
    if avg_coverage >= 90:
        print("  🎉 VÝBORNĚ! Performance extrakce funguje skvěle!")
    elif avg_coverage >= 70:
        print("  👍 DOBŘE! Většina performance dat se extraktuje.")
    else:
        print("  ⚠️ PROBLÉM! Performance extrakce potřebuje opravu.")

if __name__ == "__main__":
    complete_validation_test()