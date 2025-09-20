#!/usr/bin/env python3
"""
Analýza problémů s ratingem konkrétního ETF
"""

import os
from supabase import create_client, Client
import json
import pandas as pd

# Supabase konfigurace
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def get_etf_details(isin):
    """Získá kompletní detaily o ETF"""
    print(f"🔍 Hledání ETF s ISIN: {isin}")
    
    supabase = get_supabase_client()
    
    # Získej všechna data o ETF
    response = supabase.table('etf_funds').select('*').eq('isin', isin).execute()
    
    if not response.data:
        print(f"❌ ETF s ISIN {isin} nenalezen v databázi")
        return None
    
    etf = response.data[0]
    
    print(f"✅ Nalezen ETF: {etf['name']}")
    print(f"   Provider: {etf['fund_provider']}")
    print(f"   Kategorie: {etf['category']}")
    print(f"   TER: {etf['ter_numeric']}%")
    print(f"   Velikost fondu: {etf['fund_size_numeric']} {etf['fund_size_currency']}")
    print(f"   Rating: {etf.get('rating', 'N/A')}")
    print(f"   Rating Score: {etf.get('rating_score', 'N/A')}")
    
    return etf

def analyze_rating_factors(etf):
    """Analyzuje faktory ovlivňující rating"""
    print(f"\n📊 ANALÝZA RATING FAKTORŮ")
    print("=" * 40)
    
    rating_factors = {
        'ter_numeric': etf.get('ter_numeric', 0),
        'fund_size_numeric': etf.get('fund_size_numeric', 0),
        'return_1y': etf.get('return_1y', 0),
        'return_3y': etf.get('return_3y', 0),
        'return_5y': etf.get('return_5y', 0),
        'return_ytd': etf.get('return_ytd', 0),
        'volatility_1y': etf.get('volatility_1y', 0),
        'volatility_3y': etf.get('volatility_3y', 0),
        'volatility_5y': etf.get('volatility_5y', 0),
        'tracking_error': etf.get('tracking_error', 0),
        'return_per_risk_1y': etf.get('return_per_risk_1y', 0),
        'return_per_risk_3y': etf.get('return_per_risk_3y', 0),
        'return_per_risk_5y': etf.get('return_per_risk_5y', 0),
        'max_drawdown_1y': etf.get('max_drawdown_1y', 0),
        'max_drawdown_3y': etf.get('max_drawdown_3y', 0),
        'max_drawdown_5y': etf.get('max_drawdown_5y', 0),
        'is_leveraged': etf.get('is_leveraged', False)
    }
    
    print("🔢 Klíčové metriky:")
    for factor, value in rating_factors.items():
        if isinstance(value, (int, float)) and value != 0:
            print(f"   ✅ {factor}: {value}")
        elif value == 0 or value is None:
            print(f"   ❌ {factor}: {value} (MISSING DATA)")
        else:
            print(f"   📋 {factor}: {value}")
    
    # Spočítej missing data percentage
    numeric_factors = [k for k, v in rating_factors.items() if k != 'is_leveraged']
    missing_count = sum(1 for k in numeric_factors if rating_factors[k] == 0 or rating_factors[k] is None)
    missing_percentage = missing_count / len(numeric_factors) * 100
    
    print(f"\n📉 MISSING DATA ANALÝZA:")
    print(f"   Chybějící metriky: {missing_count}/{len(numeric_factors)} ({missing_percentage:.1f}%)")
    
    return rating_factors, missing_percentage

def compare_with_similar_etfs(etf):
    """Porovnej s podobnými ETF ve stejné kategorii"""
    print(f"\n🔍 POROVNÁNÍ S PODOBNÝMI ETF")
    print("=" * 40)
    
    supabase = get_supabase_client()
    
    category = etf.get('category')
    provider = etf.get('fund_provider')
    
    if not category:
        print("❌ Kategorie ETF není definována")
        return None
    
    # Najdi podobné ETF ve stejné kategorii
    response = supabase.table('etf_funds').select(
        'isin,name,fund_provider,ter_numeric,fund_size_numeric,rating,rating_score,return_1y,return_3y,volatility_1y'
    ).eq('category', category).not_.is_('rating', 'null').order('rating', desc=True).limit(10).execute()
    
    if not response.data:
        print(f"❌ Nenalezeny ETF ve stejné kategorii: {category}")
        return None
    
    similar_etfs = response.data
    
    print(f"📊 Top 10 ETF v kategorii '{category}':")
    print("ISIN            | Název                          | Provider  | TER%  | Rating | Ret1Y%")
    print("-" * 90)
    
    our_etf_found = False
    for similar_etf in similar_etfs:
        isin = similar_etf['isin']
        name = similar_etf['name'][:30]
        provider = similar_etf['fund_provider'][:8]
        ter = similar_etf['ter_numeric'] or 0
        rating = similar_etf.get('rating', 'N/A')
        ret1y = similar_etf.get('return_1y', 0)
        
        if isin == etf['isin']:
            print(f">>> {isin} | {name:30} | {provider:8} | {ter:5.2f} | {rating:6} | {ret1y:6.1f}")
            our_etf_found = True
        else:
            print(f"    {isin} | {name:30} | {provider:8} | {ter:5.2f} | {rating:6} | {ret1y:6.1f}")
    
    if not our_etf_found:
        print(f"\n⚠️  Náš ETF {etf['isin']} není v top 10 této kategorie")
        
        # Zkus najít pozici našeho ETF
        all_response = supabase.table('etf_funds').select(
            'isin,rating'
        ).eq('category', category).not_.is_('rating', 'null').order('rating', desc=True).execute()
        
        if all_response.data:
            all_etfs = all_response.data
            our_position = None
            for i, e in enumerate(all_etfs, 1):
                if e['isin'] == etf['isin']:
                    our_position = i
                    break
            
            if our_position:
                print(f"📍 Pozice našeho ETF: {our_position}/{len(all_etfs)} v kategorii")
    
    return similar_etfs

def identify_rating_issues(etf, rating_factors, missing_percentage):
    """Identifikuje konkrétní problémy s ratingem"""
    print(f"\n🚨 IDENTIFIKACE PROBLÉMŮ S RATINGEM")
    print("=" * 50)
    
    issues = []
    
    # 1. Missing data issue
    if missing_percentage > 50:
        issues.append({
            'type': 'CRITICAL',
            'issue': 'High Missing Data',
            'description': f'{missing_percentage:.1f}% klíčových metrik chybí',
            'impact': 'Severely impacts rating calculation'
        })
    elif missing_percentage > 25:
        issues.append({
            'type': 'WARNING',
            'issue': 'Missing Data',
            'description': f'{missing_percentage:.1f}% klíčových metrik chybí',
            'impact': 'Moderately impacts rating calculation'
        })
    
    # 2. Performance issues
    return_1y = rating_factors.get('return_1y', 0)
    if return_1y < -10:
        issues.append({
            'type': 'WARNING',
            'issue': 'Poor 1Y Performance',
            'description': f'1-year return: {return_1y:.1f}%',
            'impact': 'Negative performance hurts rating'
        })
    
    # 3. High fees
    ter = rating_factors.get('ter_numeric', 0)
    if ter > 0.75:
        issues.append({
            'type': 'WARNING',
            'issue': 'High Fees',
            'description': f'TER: {ter:.2f}% (above 0.75%)',
            'impact': 'High fees reduce rating'
        })
    
    # 4. High volatility
    volatility_1y = rating_factors.get('volatility_1y', 0)
    if volatility_1y > 25:
        issues.append({
            'type': 'INFO',
            'issue': 'High Volatility',
            'description': f'1Y Volatility: {volatility_1y:.1f}%',
            'impact': 'High risk may affect rating'
        })
    
    # 5. Small fund size
    fund_size = rating_factors.get('fund_size_numeric', 0)
    if fund_size < 100_000_000:  # Less than 100M
        issues.append({
            'type': 'INFO',
            'issue': 'Small Fund Size',
            'description': f'AUM: {fund_size:,.0f}',
            'impact': 'Small funds may have lower ratings'
        })
    
    # 6. Leveraged ETF
    if rating_factors.get('is_leveraged'):
        issues.append({
            'type': 'INFO',
            'issue': 'Leveraged ETF',
            'description': 'This is a leveraged product',
            'impact': 'Leveraged ETFs typically have lower ratings due to higher risk'
        })
    
    # Print issues
    if not issues:
        print("✅ Žádné zjevné problémy nenalezeny")
    else:
        for issue in issues:
            icon = "🚨" if issue['type'] == 'CRITICAL' else "⚠️" if issue['type'] == 'WARNING' else "ℹ️"
            print(f"{icon} {issue['type']}: {issue['issue']}")
            print(f"   {issue['description']}")
            print(f"   Dopad: {issue['impact']}")
            print()
    
    return issues

def generate_recommendations(etf, issues):
    """Generuje doporučení pro zlepšení ratingu"""
    print(f"\n💡 DOPORUČENÍ PRO ZLEPŠENÍ")
    print("=" * 30)
    
    recommendations = []
    
    for issue in issues:
        if issue['issue'] == 'High Missing Data':
            recommendations.append("🔄 Aktualizovat data scrapery pro získání chybějících metrik")
            recommendations.append("📊 Implementovat backup data sources pro chybějící údaje")
        
        elif issue['issue'] == 'Missing Data':
            recommendations.append("📈 Doplnit chybějící performance metriky")
        
        elif issue['issue'] == 'Poor 1Y Performance':
            recommendations.append("📋 Zkontrolovat správnost performance dat")
            recommendations.append("⚖️ Upravit rating algoritmus pro lepší zpracování volatilních period")
        
        elif issue['issue'] == 'High Fees':
            recommendations.append("💰 Zvýraznit jiné pozitivní aspekty ETF (tracking error, likvidita)")
        
        elif issue['issue'] == 'Leveraged ETF':
            recommendations.append("🏷️ Vytvořit separátní rating kategorii pro leveraged produkty")
            recommendations.append("⚠️ Přidat warning o vyšším riziku leveraged ETF")
    
    # General recommendations
    recommendations.extend([
        "🔍 Implementovat quality score pro data completeness",
        "📊 Vytvořit peer comparison v rámci kategorie",
        "🎯 Přidat váhování podle fund size a liquidity"
    ])
    
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec}")
    
    return recommendations

def main():
    print("🔍 ANALÝZA ETF RATING PROBLÉMŮ")
    print("=" * 50)
    
    # ISIN k analýze
    isin = "IE0003XJA0J9"
    
    # 1. Získej ETF detaily
    etf = get_etf_details(isin)
    if not etf:
        return
    
    # 2. Analyzuj rating faktory
    rating_factors, missing_percentage = analyze_rating_factors(etf)
    
    # 3. Porovnej s podobnými ETF
    similar_etfs = compare_with_similar_etfs(etf)
    
    # 4. Identifikuj problémy
    issues = identify_rating_issues(etf, rating_factors, missing_percentage)
    
    # 5. Generuj doporučení
    recommendations = generate_recommendations(etf, issues)
    
    # 6. Uložení analýzy
    analysis_result = {
        'isin': isin,
        'etf_details': etf,
        'rating_factors': rating_factors,
        'missing_data_percentage': missing_percentage,
        'identified_issues': issues,
        'recommendations': recommendations,
        'similar_etfs': similar_etfs
    }
    
    output_file = f"/Users/tomaskostrhoun/Documents/ETF/etf_rating_analysis_{isin}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(analysis_result, f, indent=2, default=str, ensure_ascii=False)
    
    print(f"\n💾 Analýza uložena: {output_file}")
    
    return analysis_result

if __name__ == "__main__":
    main()