#!/usr/bin/env python3
"""
Comprehensive analysis script for 200 ETF test results
Analyzes all scraped data fields, missing data, rating distribution, etc.
"""

import json
import os
from collections import defaultdict, Counter
from datetime import datetime

def analyze_scraped_data():
    """Analyze all scraped data from the 200 ETF test"""
    
    # Find the latest 200 ETF results file
    results_dir = "justetf_complete_production/results"
    latest_file = None
    
    # Look for files that might contain 200 ETF results
    for filename in os.listdir(results_dir):
        if filename.endswith('.json'):
            filepath = os.path.join(results_dir, filename)
            # Check if file is from today and contains multiple ETFs
            if '20250918' in filename:
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        if isinstance(data, list) and len(data) >= 10:
                            print(f"Found candidate file: {filename} with {len(data)} ETFs")
                            if not latest_file or len(data) > len(latest_file[1]):
                                latest_file = (filepath, data)
                except:
                    continue
    
    if not latest_file:
        print("❌ No suitable results file found")
        return
    
    filepath, etf_data = latest_file
    print(f"\n🔍 ANALYZING: {os.path.basename(filepath)}")
    print(f"📊 TOTAL ETFs: {len(etf_data)}")
    print("="*80)
    
    # Initialize counters
    field_stats = {}
    rating_stats = {'with_rating': 0, 'without_rating': 0, 'rating_distribution': Counter()}
    age_stats = {'too_young': 0, 'old_enough': 0, 'no_date': 0}
    performance_stats = {}
    
    # Analyze each ETF
    for i, etf in enumerate(etf_data):
        
        # Analyze all fields
        for field, value in etf.items():
            if field not in field_stats:
                field_stats[field] = {'total': 0, 'filled': 0, 'null': 0, 'empty_string': 0}
            
            field_stats[field]['total'] += 1
            
            if value is None:
                field_stats[field]['null'] += 1
            elif value == "":
                field_stats[field]['empty_string'] += 1
            else:
                field_stats[field]['filled'] += 1
        
        # Analyze ratings
        if etf.get('rating') is not None:
            rating_stats['with_rating'] += 1
            rating_stats['rating_distribution'][etf['rating']] += 1
        else:
            rating_stats['without_rating'] += 1
        
        # Analyze age based on inception date
        inception_date = etf.get('inception_date')
        if inception_date:
            try:
                # Try to parse date to determine age
                if '2024' in inception_date or '2023' in inception_date or '2022' in inception_date:
                    age_stats['too_young'] += 1
                else:
                    age_stats['old_enough'] += 1
            except:
                age_stats['no_date'] += 1
        else:
            age_stats['no_date'] += 1
    
    # Print comprehensive analysis
    print("\n📊 RATING DISTRIBUTION ANALYSIS")
    print("="*50)
    total_etfs = len(etf_data)
    with_rating = rating_stats['with_rating']
    without_rating = rating_stats['without_rating']
    
    print(f"ETFs with rating: {with_rating}/{total_etfs} ({with_rating/total_etfs*100:.1f}%)")
    print(f"ETFs without rating: {without_rating}/{total_etfs} ({without_rating/total_etfs*100:.1f}%)")
    
    if with_rating > 0:
        print("\nRating breakdown:")
        for rating in sorted(rating_stats['rating_distribution'].keys()):
            count = rating_stats['rating_distribution'][rating]
            stars = "⭐" * rating
            print(f"  {rating} {stars}: {count} ETFs ({count/with_rating*100:.1f}%)")
    
    print("\n📅 AGE ANALYSIS")
    print("="*50)
    print(f"Too young (2022-2024): {age_stats['too_young']}/{total_etfs} ({age_stats['too_young']/total_etfs*100:.1f}%)")
    print(f"Old enough (pre-2022): {age_stats['old_enough']}/{total_etfs} ({age_stats['old_enough']/total_etfs*100:.1f}%)")
    print(f"No inception date: {age_stats['no_date']}/{total_etfs} ({age_stats['no_date']/total_etfs*100:.1f}%)")
    
    print("\n📈 KEY PERFORMANCE DATA AVAILABILITY")
    print("="*60)
    key_performance_fields = [
        'return_per_risk_1y', 'return_per_risk_3y', 'return_per_risk_5y',
        'return_1y', 'return_3y', 'return_5y',
        'max_drawdown_1y', 'max_drawdown_3y', 'max_drawdown_5y',
        'volatility_1y', 'volatility_3y', 'volatility_5y',
        'ter_numeric', 'fund_size_numeric'
    ]
    
    for field in key_performance_fields:
        if field in field_stats:
            filled = field_stats[field]['filled']
            total = field_stats[field]['total']
            percentage = filled/total*100 if total > 0 else 0
            print(f"  {field:25}: {filled:3d}/{total} ({percentage:5.1f}%)")
    
    print("\n🏢 FUND CHARACTERISTICS")
    print("="*50)
    
    # Categories
    categories = Counter()
    regions = Counter() 
    providers = Counter()
    
    for etf in etf_data:
        if etf.get('category'):
            categories[etf['category']] += 1
        if etf.get('region'):
            regions[etf['region']] += 1
        if etf.get('fund_provider'):
            providers[etf['fund_provider']] += 1
    
    print("Top categories:")
    for category, count in categories.most_common(5):
        print(f"  {category}: {count} ETFs")
    
    print("\nTop regions:")
    for region, count in regions.most_common(5):
        print(f"  {region}: {count} ETFs")
    
    print("\nTop providers:")
    for provider, count in providers.most_common(5):
        print(f"  {provider}: {count} ETFs")
    
    print("\n📊 FUND SIZE ANALYSIS")
    print("="*50)
    fund_sizes = []
    zero_size_count = 0
    
    for etf in etf_data:
        size = etf.get('fund_size_numeric')
        if size is not None:
            fund_sizes.append(size)
            if size == 0:
                zero_size_count += 1
    
    if fund_sizes:
        avg_size = sum(fund_sizes) / len(fund_sizes)
        sorted_sizes = sorted(fund_sizes)
        median_size = sorted_sizes[len(sorted_sizes)//2]
        
        print(f"Average fund size: {avg_size:.1f}M EUR")
        print(f"Median fund size: {median_size:.1f}M EUR")
        print(f"ETFs with 0 size: {zero_size_count}/{len(fund_sizes)} ({zero_size_count/len(fund_sizes)*100:.1f}%)")
        print(f"Largest fund: {max(fund_sizes):.1f}M EUR")
    
    print("\n💰 TER (FEE) ANALYSIS")  
    print("="*50)
    ter_values = []
    
    for etf in etf_data:
        ter = etf.get('ter_numeric')
        if ter is not None:
            ter_values.append(ter)
    
    if ter_values:
        avg_ter = sum(ter_values) / len(ter_values)
        sorted_ter = sorted(ter_values)
        median_ter = sorted_ter[len(sorted_ter)//2]
        
        print(f"Average TER: {avg_ter:.3f}%")
        print(f"Median TER: {median_ter:.3f}%") 
        print(f"Lowest TER: {min(ter_values):.3f}%")
        print(f"Highest TER: {max(ter_values):.3f}%")
        
        # TER ranges
        cheap_count = len([t for t in ter_values if t <= 0.2])
        moderate_count = len([t for t in ter_values if 0.2 < t <= 0.5])
        expensive_count = len([t for t in ter_values if t > 0.5])
        
        print(f"\nTER ranges:")
        print(f"  Cheap (≤0.2%): {cheap_count}/{len(ter_values)} ({cheap_count/len(ter_values)*100:.1f}%)")
        print(f"  Moderate (0.2-0.5%): {moderate_count}/{len(ter_values)} ({moderate_count/len(ter_values)*100:.1f}%)")
        print(f"  Expensive (>0.5%): {expensive_count}/{len(ter_values)} ({expensive_count/len(ter_values)*100:.1f}%)")
    
    print("\n📈 EXAMPLES OF ETFs WITH RATINGS")
    print("="*60)
    rated_etfs = [etf for etf in etf_data if etf.get('rating') is not None]
    if rated_etfs:
        # Show top 5 rated ETFs
        top_rated = sorted(rated_etfs, key=lambda x: x.get('rating_score', 0), reverse=True)[:5]
        
        print("TOP 5 RATED ETFs:")
        for i, etf in enumerate(top_rated, 1):
            name = etf['name'][:50] + '...' if len(etf['name']) > 50 else etf['name']
            rating = etf.get('rating', 'N/A')
            score = etf.get('rating_score', 'N/A')
            ter = etf.get('ter_numeric', 'N/A')
            size = etf.get('fund_size_numeric', 'N/A')
            
            print(f"  {i}. {name}")
            print(f"     Rating: {rating}⭐ ({score}/100) | TER: {ter}% | Size: {size}M EUR")
    
    print("\n❌ EXAMPLES OF ETFs WITHOUT RATINGS")
    print("="*60)
    unrated_etfs = [etf for etf in etf_data if etf.get('rating') is None][:5]
    
    for i, etf in enumerate(unrated_etfs, 1):
        name = etf['name'][:50] + '...' if len(etf['name']) > 50 else etf['name']
        inception = etf.get('inception_date', 'Unknown')
        ter = etf.get('ter_numeric', 'N/A')
        size = etf.get('fund_size_numeric', 'N/A')
        rpr_3y = etf.get('return_per_risk_3y', 'NULL')
        
        print(f"  {i}. {name}")
        print(f"     Inception: {inception} | TER: {ter}% | Size: {size}M EUR | RPR 3Y: {rpr_3y}")
    
    print("\n" + "="*80)
    print("🎯 SUMMARY RECOMMENDATIONS")
    print("="*80)
    
    # Calculate percentages for key issues
    young_pct = age_stats['too_young'] / total_etfs * 100
    no_rpr_3y = field_stats.get('return_per_risk_3y', {}).get('null', 0) + field_stats.get('return_per_risk_3y', {}).get('empty_string', 0)
    no_rpr_3y_pct = no_rpr_3y / total_etfs * 100 if total_etfs > 0 else 0
    
    print(f"1. {young_pct:.1f}% of ETFs are too young (2022-2024) for ratings")
    print(f"2. {no_rpr_3y_pct:.1f}% of ETFs missing return_per_risk_3y data")
    print(f"3. Only {with_rating}/{total_etfs} ({with_rating/total_etfs*100:.1f}%) ETFs have ratings")
    print(f"4. {zero_size_count} ETFs have 0 assets (potentially delisted)")
    
    if young_pct > 50:
        print("\n⚠️  MAJOR ISSUE: Most ETFs in sample are too young for rating")
        print("   → Need to test with older ETFs (pre-2022) for proper rating distribution")
    
    if no_rpr_3y_pct > 80:
        print("\n⚠️  DATA EXTRACTION ISSUE: Most ETFs missing return_per_risk_3y")
        print("   → Scraping patterns may need further refinement")

if __name__ == "__main__":
    analyze_scraped_data()