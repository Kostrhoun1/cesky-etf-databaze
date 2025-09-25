#!/usr/bin/env python3
"""
Komplexní test všech parsovaných polí na 20 ETF
Identifikuje problémy v parsování jednotlivých datových polí
"""

import sys
import os
import random
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def analyze_field_quality(field_name, values):
    """Analyzuje kvalitu parsovaného pole"""
    non_empty = [v for v in values if v and str(v).strip() and str(v) not in ['Unknown', 'Neznámý', '0', '0.0', 'N/A']]
    empty_count = len(values) - len(non_empty)
    
    analysis = {
        'total': len(values),
        'filled': len(non_empty),
        'empty': empty_count,
        'fill_rate': len(non_empty) / len(values) * 100 if values else 0,
        'sample_values': list(set(non_empty))[:5],  # První 5 unikátních hodnot
        'issues': []
    }
    
    # Specifické kontroly podle typu pole - OPRAVENO názvy polí
    if field_name == 'ter_numeric':
        # TER by měl být mezi 0 a 3%
        invalid_ter = [v for v in non_empty if not isinstance(v, (int, float)) or v < 0 or v > 5]
        if invalid_ter:
            analysis['issues'].append(f"Invalid TER values: {invalid_ter[:3]}")
    
    elif field_name == 'fund_size_numeric':
        # Fund size by měl být pozitivní číslo
        invalid_size = [v for v in non_empty if not isinstance(v, (int, float)) or v <= 0]
        if invalid_size:
            analysis['issues'].append(f"Invalid fund size values: {invalid_size[:3]}")
    
    elif field_name in ['inception_date', 'fund_domicile', 'fund_provider']:
        # Textová pole by neměla být prázdná
        very_short = [v for v in non_empty if len(str(v)) < 3]
        if very_short:
            analysis['issues'].append(f"Very short values: {very_short[:3]}")
    
    elif field_name in ['primary_ticker', 'exchange_1_ticker']:
        # Tickery by měly být 2-8 znaků
        invalid_tickers = [v for v in non_empty if len(str(v)) < 2 or len(str(v)) > 8]
        if invalid_tickers:
            analysis['issues'].append(f"Invalid ticker format: {invalid_tickers[:3]}")
    
    elif field_name == 'total_exchanges':
        # Počet burz by měl být pozitivní
        invalid_count = [v for v in non_empty if not isinstance(v, int) or v <= 0]
        if invalid_count:
            analysis['issues'].append(f"Invalid exchange count: {invalid_count[:3]}")
    
    elif field_name == 'total_holdings':
        # Počet holdings by měl být pozitivní
        invalid_count = [v for v in non_empty if not isinstance(v, int) or v <= 0]
        if invalid_count:
            analysis['issues'].append(f"Invalid holdings count: {invalid_count[:3]}")
    
    return analysis

def test_comprehensive_parsing():
    """Komplexní test parsování všech polí"""
    
    # 20 různorodých ETF
    test_etfs = [
        "IE00B6YX5C33",  # SPDR S&P 500 UCITS ETF
        "IE00BK5BQT80",  # Vanguard FTSE All-World UCITS ETF
        "IE00B4L5Y983",  # iShares Core MSCI World UCITS ETF
        "IE00B5BMR087",  # iShares Core S&P 500 UCITS ETF
        "IE00B1XNHC34",  # iShares Core MSCI Europe UCITS ETF
        "LU0274208692",  # Xtrackers MSCI World UCITS ETF
        "IE00B4L5YC18",  # iShares Core MSCI Emerging Markets IMI UCITS ETF
        "IE00BZ56RN96",  # Vanguard FTSE Emerging Markets UCITS ETF
        "IE00B4WXJJ64",  # iShares Core Global Aggregate Bond UCITS ETF
        "IE00BF4RFH31",  # iShares Core EUR Corp Bond UCITS ETF
        "IE00B579F325",  # iShares Diversified Commodity Swap UCITS ETF
        "IE00B0M62Q58",  # iShares MSCI World Information Technology UCITS ETF
        "IE00B52VJ196",  # iShares MSCI Japan UCITS ETF
        "LU1681045370",  # Amundi Prime Europe UCITS ETF
        "FR0010315770",  # Lyxor Core STOXX Europe 600 UCITS ETF
        "IE00BL25JL35",  # Vanguard FTSE All-World High Dividend Yield UCITS ETF
        "IE00BZ56SW52",  # Vanguard ESG Global All Cap UCITS ETF
        "LU0322250985",  # Xtrackers MSCI World Quality UCITS ETF
        "IE00BGV5VN51",  # Vanguard S&P 500 UCITS ETF
        "IE00B3XXRP09",  # Vanguard FTSE Developed Europe UCITS ETF
    ]
    
    print("🔍 COMPREHENSIVE FIELD PARSING TEST - 20 ETFs")
    print("=" * 80)
    
    scraper = CompleteProductionScraper()
    all_results = []
    
    for i, isin in enumerate(test_etfs, 1):
        print(f"\n[{i}/20] Processing ISIN: {isin}")
        print("-" * 50)
        
        try:
            etf_data = scraper.scrape_etf_complete_with_retry(isin)
            
            if etf_data:
                # Extrahuj všechna pole pro analýzu - OPRAVENO podle skutečné struktury ETFDataComplete
                result = {
                    'isin': isin,
                    'name': etf_data.name,
                    'ter': etf_data.ter,
                    'ter_numeric': etf_data.ter_numeric,
                    'fund_size': etf_data.fund_size,
                    'fund_size_numeric': etf_data.fund_size_numeric,
                    'fund_size_currency': etf_data.fund_size_currency,
                    'inception_date': etf_data.inception_date,
                    'fund_domicile': etf_data.fund_domicile,
                    'fund_provider': etf_data.fund_provider,
                    'fund_currency': etf_data.fund_currency,
                    'distribution_policy': etf_data.distribution_policy,
                    'distribution_frequency': etf_data.distribution_frequency,
                    'replication': etf_data.replication,
                    'legal_structure': etf_data.legal_structure,
                    'primary_ticker': etf_data.primary_ticker,
                    'primary_exchange': etf_data.primary_exchange,
                    'exchange_1_ticker': etf_data.exchange_1_ticker if hasattr(etf_data, 'exchange_1_ticker') else None,
                    'exchange_1_name': etf_data.exchange_1_name if hasattr(etf_data, 'exchange_1_name') else None,
                    'exchange_1_currency': etf_data.exchange_1_currency if hasattr(etf_data, 'exchange_1_currency') else None,
                    'total_exchanges': etf_data.total_exchanges,
                    'region': etf_data.region,
                    'category': etf_data.category,
                    'index_name': etf_data.index_name,
                    'investment_focus': etf_data.investment_focus,
                    'sustainability': etf_data.sustainability,
                    'total_holdings': etf_data.total_holdings,
                    'sectors_count': len(etf_data.sectors) if etf_data.sectors else 0,
                    'holdings_count': len(etf_data.holdings) if etf_data.holdings else 0,
                    'countries_count': len(etf_data.countries) if etf_data.countries else 0,
                    'success': True
                }
                
                print(f"✅ {etf_data.name[:50]}...")
                print(f"   TER: {etf_data.ter}, Fund Size: {etf_data.fund_size}")
                print(f"   Ticker: {etf_data.primary_ticker}, Provider: {etf_data.fund_provider}")
                print(f"   Exchanges: {etf_data.total_exchanges}, Sectors: {len(etf_data.sectors) if etf_data.sectors else 0}")
                
            else:
                result = {'isin': isin, 'success': False, 'error': 'No data returned'}
                print(f"❌ Failed to scrape {isin}")
        
        except Exception as e:
            result = {'isin': isin, 'success': False, 'error': str(e)}
            print(f"❌ Error processing {isin}: {e}")
        
        all_results.append(result)
    
    # Analýza výsledků
    print(f"\n{'='*80}")
    print("📊 COMPREHENSIVE FIELD ANALYSIS")
    print("=" * 80)
    
    successful_results = [r for r in all_results if r.get('success', False)]
    
    print(f"✅ Successfully scraped: {len(successful_results)}/20 ({len(successful_results)/20*100:.1f}%)")
    
    if not successful_results:
        print("❌ No successful results to analyze")
        return
    
    # Analyzuj každé pole - OPRAVENO podle skutečné struktury
    fields_to_analyze = [
        'name', 'ter', 'ter_numeric', 'fund_size', 'fund_size_numeric', 'fund_size_currency',
        'inception_date', 'fund_domicile', 'fund_provider', 'fund_currency',
        'distribution_policy', 'distribution_frequency', 'replication', 'legal_structure',
        'primary_ticker', 'primary_exchange', 'exchange_1_ticker', 'exchange_1_name',
        'exchange_1_currency', 'total_exchanges', 'region', 'category',
        'index_name', 'investment_focus', 'sustainability', 'total_holdings',
        'sectors_count', 'holdings_count', 'countries_count'
    ]
    
    field_analyses = {}
    
    for field in fields_to_analyze:
        values = [r.get(field) for r in successful_results]
        field_analyses[field] = analyze_field_quality(field, values)
    
    # Seřaď pole podle fill rate
    sorted_fields = sorted(field_analyses.items(), key=lambda x: x[1]['fill_rate'], reverse=True)
    
    print(f"\n📋 FIELD QUALITY ANALYSIS (sorted by fill rate):")
    print("-" * 80)
    print(f"{'Field':<20} {'Fill Rate':<10} {'Issues':<15} {'Sample Values'}")
    print("-" * 80)
    
    for field_name, analysis in sorted_fields:
        fill_rate = f"{analysis['fill_rate']:.1f}%"
        issues_count = len(analysis['issues'])
        issues_str = f"{issues_count} issues" if issues_count > 0 else "OK"
        sample = str(analysis['sample_values'][:2])[:30] + "..." if len(str(analysis['sample_values'])) > 30 else str(analysis['sample_values'][:2])
        
        status = "✅" if analysis['fill_rate'] > 80 and issues_count == 0 else "⚠️" if analysis['fill_rate'] > 50 else "❌"
        
        print(f"{status} {field_name:<18} {fill_rate:<10} {issues_str:<15} {sample}")
    
    # Detailní problémy
    print(f"\n❌ DETAILED ISSUES:")
    print("-" * 50)
    
    problematic_fields = [(name, analysis) for name, analysis in field_analyses.items() 
                         if analysis['fill_rate'] < 80 or analysis['issues']]
    
    if not problematic_fields:
        print("🎉 No major issues found!")
    else:
        for field_name, analysis in problematic_fields:
            print(f"\n🔍 {field_name}:")
            print(f"   Fill rate: {analysis['fill_rate']:.1f}% ({analysis['filled']}/{analysis['total']})")
            if analysis['issues']:
                for issue in analysis['issues']:
                    print(f"   ⚠️  {issue}")
            if analysis['fill_rate'] < 50:
                print(f"   📋 Sample filled values: {analysis['sample_values'][:3]}")
    
    # TOP/BOTTOM performers
    print(f"\n🏆 BEST PERFORMING FIELDS (>90% fill rate):")
    best_fields = [(name, analysis) for name, analysis in sorted_fields 
                   if analysis['fill_rate'] > 90 and not analysis['issues']]
    for name, analysis in best_fields[:5]:
        print(f"   ✅ {name}: {analysis['fill_rate']:.1f}%")
    
    print(f"\n📉 WORST PERFORMING FIELDS (<50% fill rate):")
    worst_fields = [(name, analysis) for name, analysis in sorted_fields 
                    if analysis['fill_rate'] < 50]
    for name, analysis in worst_fields:
        print(f"   ❌ {name}: {analysis['fill_rate']:.1f}%")
    
    # Recommendations
    print(f"\n💡 RECOMMENDATIONS:")
    print("-" * 30)
    
    critical_fields = [name for name, analysis in field_analyses.items() 
                      if analysis['fill_rate'] < 70 and name in ['name', 'ter', 'aum', 'fund_provider']]
    
    if critical_fields:
        print(f"🚨 Fix critical fields: {', '.join(critical_fields)}")
    
    low_fill_fields = [name for name, analysis in field_analyses.items() 
                      if analysis['fill_rate'] < 50]
    
    if low_fill_fields:
        print(f"📈 Improve extraction for: {', '.join(low_fill_fields[:5])}")
    
    issue_fields = [name for name, analysis in field_analyses.items() if analysis['issues']]
    
    if issue_fields:
        print(f"🔧 Fix validation issues in: {', '.join(issue_fields[:3])}")
    
    return field_analyses

if __name__ == "__main__":
    test_comprehensive_parsing()