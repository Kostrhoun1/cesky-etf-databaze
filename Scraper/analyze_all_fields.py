#!/usr/bin/env python3
"""
Detailní analýza kvality všech polí ze 100 ETF testu
"""

import json
import pandas as pd
from collections import defaultdict

def analyze_all_fields():
    """Analyzuje kvalitu všech polí z 100 ETF testu"""
    
    print("📊 DETAILNÍ ANALÝZA VŠECH POLÍ - 100 ETF")
    print("="*70)
    
    # Načteme data
    with open('automated_test_100etf_results.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    total_etfs = len(data)
    print(f"Celkem ETF: {total_etfs}")
    print("="*70)
    
    # Analýza každého pole
    field_stats = {}
    
    # Definice všech polí s očekávanými typy
    all_fields = {
        'isin': 'string',
        'name': 'string', 
        'fund_provider': 'string',
        'investment_focus': 'string',
        'currency_risk': 'string',
        'strategy_risk': 'string',
        'category': 'string',
        'region': 'string',
        'is_leveraged': 'boolean',
        'fund_currency': 'string',
        'fund_domicile': 'string',
        'ter_numeric': 'number',
        'fund_size_numeric': 'number',
        'distribution_policy': 'string',
        'replication': 'string',
        'legal_structure': 'string',
        'index_name': 'string',
        'return_1y': 'number',
        'primary_ticker': 'string',
        'current_dividend_yield_numeric': 'number',
        'scraping_status': 'string'
    }
    
    for field, expected_type in all_fields.items():
        filled_count = 0
        empty_count = 0
        sample_values = []
        
        for etf in data:
            value = etf.get(field)
            
            # Počítáme filled/empty podle typu
            if expected_type == 'string':
                if value and value.strip() and value != 'N/A':
                    filled_count += 1
                    if len(sample_values) < 5:
                        sample_values.append(value[:50] + "..." if len(str(value)) > 50 else str(value))
                else:
                    empty_count += 1
            
            elif expected_type == 'number':
                if value is not None and value != 'N/A':
                    filled_count += 1
                    if len(sample_values) < 5:
                        sample_values.append(str(value))
                else:
                    empty_count += 1
            
            elif expected_type == 'boolean':
                if value is not None:
                    filled_count += 1
                    if len(sample_values) < 5:
                        sample_values.append(str(value))
                else:
                    empty_count += 1
        
        coverage = (filled_count / total_etfs) * 100
        
        field_stats[field] = {
            'filled': filled_count,
            'empty': empty_count,
            'coverage': coverage,
            'samples': sample_values
        }
    
    # Seřazení podle coverage (nejhorší první)
    sorted_fields = sorted(field_stats.items(), key=lambda x: x[1]['coverage'])
    
    print("🔍 ANALÝZA PODLE COVERAGE (nejhorší → nejlepší):")
    print("="*70)
    
    critical_fields = []
    good_fields = []
    excellent_fields = []
    
    for field, stats in sorted_fields:
        coverage = stats['coverage']
        filled = stats['filled']
        samples = ", ".join(stats['samples'][:3])
        
        # Kategorizace podle kvality
        if coverage < 30:
            status = "🔴 KRITICKÉ"
            critical_fields.append(field)
        elif coverage < 70:
            status = "🟡 PRŮMĚRNÉ"
        elif coverage < 90:
            status = "🟢 DOBRÉ"
            good_fields.append(field)
        else:
            status = "✅ VÝBORNÉ"
            excellent_fields.append(field)
        
        print(f"{status} {field}: {filled}/{total_etfs} ({coverage:.1f}%)")
        if samples and coverage < 90:  # Zobrazíme vzorky jen pro problémová pole
            print(f"    Vzorky: {samples}")
        print()
    
    # Souhrn kategorií
    print("="*70)
    print("📋 SOUHRN PODLE KATEGORIE:")
    print("="*70)
    print(f"🔴 KRITICKÉ ({len(critical_fields)}): {', '.join(critical_fields)}")
    print(f"🟢 DOBRÉ ({len(good_fields)}): {', '.join(good_fields[:5])}{'...' if len(good_fields) > 5 else ''}")
    print(f"✅ VÝBORNÉ ({len(excellent_fields)}): {', '.join(excellent_fields[:5])}{'...' if len(excellent_fields) > 5 else ''}")
    
    # Nová pole - speciální analýza
    print("\n" + "="*70)
    print("🆕 ANALÝZA NOVÝCH POLÍ:")
    print("="*70)
    
    # Investment Focus detailní analýza
    focus_data = [etf.get('investment_focus', '') for etf in data if etf.get('investment_focus')]
    focus_patterns = defaultdict(int)
    for focus in focus_data:
        if focus:
            # Rozložíme na součásti
            parts = [p.strip() for p in focus.split(',')]
            for part in parts:
                focus_patterns[part] += 1
    
    print("📊 Investment Focus - nejčastější komponenty:")
    for pattern, count in sorted(focus_patterns.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"   {pattern}: {count}x")
    
    # Currency Risk analýza
    currency_data = [etf.get('currency_risk', '') for etf in data if etf.get('currency_risk')]
    currency_patterns = defaultdict(int)
    
    print(f"\n💱 Currency Risk vzorky ({len(currency_data)}/100):")
    for i, curr in enumerate(currency_data[:5]):
        print(f"   {curr}")
    
    # Provider analýza
    providers = defaultdict(int)
    missing_providers = []
    
    for etf in data:
        provider = etf.get('fund_provider', '').strip()
        if provider:
            providers[provider] += 1
        else:
            missing_providers.append(etf.get('isin', 'N/A'))
    
    print(f"\n🏢 Poskytovatelé (missing: {len(missing_providers)}):")
    for provider, count in sorted(providers.items(), key=lambda x: x[1], reverse=True):
        print(f"   {provider}: {count}x")
    
    if missing_providers:
        print(f"\n❌ ETF bez poskytovatele: {', '.join(missing_providers[:10])}")
    
    # Doporučení na zlepšení
    print("\n" + "="*70)
    print("🎯 DOPORUČENÍ NA ZLEPŠENÍ:")
    print("="*70)
    
    if 'legal_structure' in critical_fields:
        print("1. 🔴 Legal Structure: Přidat regex pro detekci UCITS/SICAV/AIF")
    
    if 'current_dividend_yield_numeric' in critical_fields:
        print("2. 🔴 Dividend Yield: Zlepšit parsing dividend informací")
    
    if 'strategy_risk' in critical_fields:
        print("3. 🔴 Strategy Risk: Najít správné CSS selektory na JustETF")
    
    if field_stats['investment_focus']['coverage'] < 80:
        print("4. 🟡 Investment Focus: Optimalizovat CSS selektory")
        
    if len(missing_providers) > 10:
        print("5. 🟡 Fund Provider: Zlepšit detekci poskytovatele")
    
    print(f"\n💾 Výsledky uloženy do: field_analysis_100etf.json")
    
    # Export detailní analýzy
    analysis_export = {
        'total_etfs': total_etfs,
        'field_coverage': {field: stats['coverage'] for field, stats in field_stats.items()},
        'critical_fields': critical_fields,
        'good_fields': good_fields,
        'excellent_fields': excellent_fields,
        'investment_focus_patterns': dict(focus_patterns),
        'providers': dict(providers),
        'missing_providers': missing_providers
    }
    
    with open('field_analysis_100etf.json', 'w', encoding='utf-8') as f:
        json.dump(analysis_export, f, indent=2, ensure_ascii=False)
    
    return analysis_export

if __name__ == "__main__":
    analyze_all_fields()