#!/usr/bin/env python3
"""
KOMPLETNÍ analýza VŠECH polí scraperu - 100 ETF test
"""

import json
import pandas as pd
from collections import defaultdict

def analyze_complete_fields():
    """Analyzuje VŠECHNA pole z 100 ETF testu"""
    
    print("🔍 KOMPLETNÍ ANALÝZA VŠECH POLÍ SCRAPERU - 100 ETF")
    print("="*80)
    
    # Načteme data
    with open('automated_test_100etf_results.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    total_etfs = len(data)
    print(f"Celkem ETF: {total_etfs}")
    print("="*80)
    
    # DEFINICE VŠECH POLÍ SCRAPERU (podle třídy ETFDataComplete)
    all_scraper_fields = {
        # Základní informace
        'isin': 'string',
        'name': 'string',
        'url': 'string',
        
        # Popisy
        'description_en': 'string',
        'description_cs': 'string',
        
        # Náklady
        'ter': 'string',
        'ter_numeric': 'number',
        
        # Informace o fondu
        'fund_size': 'string',
        'fund_size_numeric': 'number',
        'fund_size_currency': 'string',
        'fund_currency': 'string',
        'fund_domicile': 'string',
        'fund_provider': 'string',
        'inception_date': 'string',
        
        # Distribuce
        'distribution_policy': 'string',
        'distribution_frequency': 'string',
        
        # Struktura
        'replication': 'string',
        'legal_structure': 'string',
        
        # Investiční
        'index_name': 'string',
        'investment_focus': 'string',
        'sustainability': 'string',
        
        # Risk
        'currency_risk': 'string',
        'strategy_risk': 'string',
        
        # Kategorizace
        'category': 'string',
        'region': 'string',
        'is_leveraged': 'boolean',
        
        # Holdings
        'total_holdings': 'number',
        
        # Performance
        'return_1m': 'number',
        'return_3m': 'number', 
        'return_6m': 'number',
        'return_ytd': 'number',
        'return_1y': 'number',
        'return_3y': 'number',
        'return_5y': 'number',
        'return_2021': 'number',
        'return_2022': 'number',
        'return_2023': 'number',
        'return_2024': 'number',
        'return_inception': 'number',
        
        # Risk metriky
        'volatility_1y': 'number',
        'volatility_3y': 'number',
        'volatility_5y': 'number',
        'return_per_risk_1y': 'number',
        'return_per_risk_3y': 'number',
        'return_per_risk_5y': 'number',
        'max_drawdown_1y': 'number',
        'max_drawdown_3y': 'number',
        'max_drawdown_5y': 'number',
        'max_drawdown_inception': 'number',
        'beta': 'number',
        'correlation': 'number',
        'tracking_error': 'number',
        'information_ratio': 'number',
        
        # Exchange data
        'primary_exchange': 'string',
        'primary_ticker': 'string',
        'total_exchanges': 'number',
        
        # Dividend data
        'current_dividend_yield': 'string',
        'current_dividend_yield_numeric': 'number',
        'dividends_12m': 'string',
        'dividends_12m_numeric': 'number',
        'dividends_12m_currency': 'string',
        'dividend_extraction_method': 'string',
        
        # Metadata
        'scraping_status': 'string',
        'scraping_date': 'string',
        'retry_count': 'number',
    }
    
    # Analýza každého pole
    field_stats = {}
    missing_fields = []
    
    for field, expected_type in all_scraper_fields.items():
        filled_count = 0
        empty_count = 0
        sample_values = []
        
        # Kontrola jestli pole existuje v datech
        field_exists = any(field in etf for etf in data)
        if not field_exists:
            missing_fields.append(field)
            continue
        
        for etf in data:
            value = etf.get(field)
            
            # Počítáme filled/empty podle typu
            if expected_type == 'string':
                if value and str(value).strip() and str(value) not in ['N/A', '', 'None']:
                    filled_count += 1
                    if len(sample_values) < 3:
                        sample_str = str(value)[:40] + "..." if len(str(value)) > 40 else str(value)
                        sample_values.append(sample_str)
                else:
                    empty_count += 1
            
            elif expected_type == 'number':
                if value is not None and value != 'N/A' and str(value) != 'None':
                    try:
                        float(value)
                        filled_count += 1
                        if len(sample_values) < 3:
                            sample_values.append(str(value))
                    except (ValueError, TypeError):
                        empty_count += 1
                else:
                    empty_count += 1
            
            elif expected_type == 'boolean':
                if value is not None:
                    filled_count += 1
                    if len(sample_values) < 3:
                        sample_values.append(str(value))
                else:
                    empty_count += 1
        
        coverage = (filled_count / total_etfs) * 100
        
        field_stats[field] = {
            'filled': filled_count,
            'empty': empty_count,
            'coverage': coverage,
            'samples': sample_values,
            'type': expected_type
        }
    
    # Seřazení podle coverage (nejhorší první)
    sorted_fields = sorted(field_stats.items(), key=lambda x: x[1]['coverage'])
    
    print("🔍 ANALÝZA VŠECH POLÍ (nejhorší → nejlepší coverage):")
    print("="*80)
    
    critical = []  # < 30%
    poor = []      # 30-50%
    fair = []      # 50-70%
    good = []      # 70-90%
    excellent = [] # 90%+
    
    for field, stats in sorted_fields:
        coverage = stats['coverage']
        filled = stats['filled']
        field_type = stats['type']
        samples = ", ".join(stats['samples'][:2])
        
        # Kategorizace podle kvality
        if coverage < 30:
            status = "🔴 KRITICKÉ"
            critical.append(field)
        elif coverage < 50:
            status = "🟠 ŠPATNÉ"
            poor.append(field)
        elif coverage < 70:
            status = "🟡 PRŮMĚRNÉ" 
            fair.append(field)
        elif coverage < 90:
            status = "🟢 DOBRÉ"
            good.append(field)
        else:
            status = "✅ VÝBORNÉ"
            excellent.append(field)
        
        print(f"{status:15} {field:25} ({field_type:6}): {filled:3}/{total_etfs} ({coverage:5.1f}%)")
        if samples and coverage < 90:  # Vzorky jen pro problémová pole
            print(f"                     Vzorky: {samples}")
        print()
    
    # Souhrn kategorií
    print("="*80)
    print("📊 SOUHRN PODLE KVALITY:")
    print("="*80)
    print(f"🔴 KRITICKÉ    ({len(critical):2}): {', '.join(critical[:8])}{'...' if len(critical) > 8 else ''}")
    print(f"🟠 ŠPATNÉ      ({len(poor):2}): {', '.join(poor[:8])}{'...' if len(poor) > 8 else ''}")
    print(f"🟡 PRŮMĚRNÉ    ({len(fair):2}): {', '.join(fair[:8])}{'...' if len(fair) > 8 else ''}")
    print(f"🟢 DOBRÉ       ({len(good):2}): {', '.join(good[:8])}{'...' if len(good) > 8 else ''}")
    print(f"✅ VÝBORNÉ     ({len(excellent):2}): {', '.join(excellent[:8])}{'...' if len(excellent) > 8 else ''}")
    
    if missing_fields:
        print(f"\n❌ CHYBĚJÍCÍ POLE ({len(missing_fields)}): {', '.join(missing_fields[:10])}{'...' if len(missing_fields) > 10 else ''}")
    
    # Analýza podle typů
    print(f"\n📋 ANALÝZA PODLE TYPŮ:")
    print("="*80)
    
    by_type = defaultdict(list)
    for field, stats in field_stats.items():
        by_type[stats['type']].append((field, stats['coverage']))
    
    for field_type, fields in by_type.items():
        avg_coverage = sum(coverage for _, coverage in fields) / len(fields)
        print(f"{field_type:8}: {len(fields):2} polí, průměr {avg_coverage:5.1f}%")
    
    # TOP priority pro fixing
    print(f"\n🎯 TOP PRIORITA PRO OPRAVU:")
    print("="*80)
    
    important_fields = [
        'fund_provider', 'fund_currency', 'fund_domicile', 'ter_numeric', 
        'fund_size_numeric', 'replication', 'legal_structure', 'index_name',
        'distribution_policy', 'return_1y', 'current_dividend_yield_numeric'
    ]
    
    priority_issues = []
    for field in important_fields:
        if field in field_stats and field_stats[field]['coverage'] < 80:
            priority_issues.append((field, field_stats[field]['coverage']))
    
    priority_issues.sort(key=lambda x: x[1])  # Seřadit podle coverage
    
    for i, (field, coverage) in enumerate(priority_issues[:10], 1):
        print(f"{i:2}. {field:25}: {coverage:5.1f}% coverage")
    
    # Export
    export_data = {
        'total_etfs': total_etfs,
        'field_stats': {field: {'coverage': stats['coverage'], 'filled': stats['filled']} 
                       for field, stats in field_stats.items()},
        'categories': {
            'critical': critical,
            'poor': poor, 
            'fair': fair,
            'good': good,
            'excellent': excellent
        },
        'missing_fields': missing_fields,
        'priority_fixes': [(field, coverage) for field, coverage in priority_issues]
    }
    
    with open('complete_field_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(export_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Kompletní analýza uložena: complete_field_analysis.json")
    return export_data

if __name__ == "__main__":
    analyze_complete_fields()