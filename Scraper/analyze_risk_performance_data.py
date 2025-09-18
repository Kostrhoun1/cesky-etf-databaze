#!/usr/bin/env python3
"""
Detailed analysis of risk and performance data collected per ETF
Analyzes all performance metrics, risk measures, and data quality
"""

import json
import os
from collections import defaultdict, Counter
import statistics
from datetime import datetime

def analyze_risk_performance():
    """Comprehensive analysis of risk and performance data"""
    
    # Find the latest results file with most ETFs
    results_dir = "justetf_complete_production/results"
    latest_file = None
    
    for filename in os.listdir(results_dir):
        if filename.endswith('.json') and '20250918' in filename:
            filepath = os.path.join(results_dir, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if isinstance(data, list) and len(data) >= 100:
                        if not latest_file or len(data) > len(latest_file[1]):
                            latest_file = (filepath, data)
            except:
                continue
    
    if not latest_file:
        print("❌ No suitable results file found")
        return
    
    filepath, etf_data = latest_file
    print(f"\n🔍 ANALYZING RISK & PERFORMANCE DATA")
    print(f"📄 File: {os.path.basename(filepath)}")
    print(f"📊 ETFs: {len(etf_data)}")
    print("="*80)
    
    # Define all performance and risk metrics
    performance_metrics = {
        'return_1y': 'Return 1 Year (%)',
        'return_3y': 'Return 3 Years (% p.a.)',
        'return_5y': 'Return 5 Years (% p.a.)',
        'return_ytd': 'Return YTD (%)',
        'return_per_risk_1y': 'Return per Risk 1Y (Sharpe)',
        'return_per_risk_3y': 'Return per Risk 3Y (Sharpe)',  
        'return_per_risk_5y': 'Return per Risk 5Y (Sharpe)'
    }
    
    risk_metrics = {
        'volatility_1y': 'Volatility 1 Year (%)',
        'volatility_3y': 'Volatility 3 Years (%)',
        'volatility_5y': 'Volatility 5 Years (%)',
        'max_drawdown_1y': 'Max Drawdown 1Y (%)',
        'max_drawdown_3y': 'Max Drawdown 3Y (%)',
        'max_drawdown_5y': 'Max Drawdown 5Y (%)',
        'max_drawdown_inception': 'Max Drawdown Since Inception (%)'
    }
    
    advanced_metrics = {
        'beta': 'Beta (Market Sensitivity)',
        'correlation': 'Correlation to Benchmark',
        'tracking_error': 'Tracking Error (%)',
        'information_ratio': 'Information Ratio'
    }
    
    all_metrics = {**performance_metrics, **risk_metrics, **advanced_metrics}
    
    # Analyze each metric
    metric_analysis = {}
    
    for metric, description in all_metrics.items():
        values = []
        null_count = 0
        empty_count = 0
        valid_count = 0
        
        for etf in etf_data:
            value = etf.get(metric)
            if value is None:
                null_count += 1
            elif value == "":
                empty_count += 1
            else:
                valid_count += 1
                if isinstance(value, (int, float)):
                    values.append(value)
        
        total = len(etf_data)
        coverage = valid_count / total * 100
        
        stats = {}
        if values:
            stats = {
                'count': len(values),
                'min': min(values),
                'max': max(values),
                'mean': statistics.mean(values),
                'median': statistics.median(values),
                'stdev': statistics.stdev(values) if len(values) > 1 else 0
            }
        
        metric_analysis[metric] = {
            'description': description,
            'total': total,
            'valid': valid_count,
            'null': null_count,
            'empty': empty_count,
            'coverage': coverage,
            'values': values,
            'stats': stats
        }
    
    # Print analysis
    print("\n📊 PERFORMANCE METRICS ANALYSIS")
    print("="*60)
    
    for metric, description in performance_metrics.items():
        data = metric_analysis[metric]
        print(f"\n📈 {description}")
        print(f"   Coverage: {data['valid']}/{data['total']} ({data['coverage']:.1f}%)")
        print(f"   Missing:  {data['null']} null + {data['empty']} empty")
        
        if data['stats']:
            stats = data['stats']
            print(f"   Range:    {stats['min']:.2f}% to {stats['max']:.2f}%")
            print(f"   Average:  {stats['mean']:.2f}% (±{stats['stdev']:.2f})")
            print(f"   Median:   {stats['median']:.2f}%")
            
            # Show distribution for key metrics
            if metric in ['return_1y', 'return_3y', 'return_5y']:
                values = data['values']
                positive = len([v for v in values if v > 0])
                negative = len([v for v in values if v < 0])
                print(f"   Positive: {positive}/{len(values)} ({positive/len(values)*100:.1f}%)")
                print(f"   Negative: {negative}/{len(values)} ({negative/len(values)*100:.1f}%)")
    
    print("\n📊 RISK METRICS ANALYSIS")
    print("="*60)
    
    for metric, description in risk_metrics.items():
        data = metric_analysis[metric]
        print(f"\n⚠️  {description}")
        print(f"   Coverage: {data['valid']}/{data['total']} ({data['coverage']:.1f}%)")
        print(f"   Missing:  {data['null']} null + {data['empty']} empty")
        
        if data['stats']:
            stats = data['stats']
            print(f"   Range:    {stats['min']:.2f}% to {stats['max']:.2f}%")
            print(f"   Average:  {stats['mean']:.2f}% (±{stats['stdev']:.2f})")
            print(f"   Median:   {stats['median']:.2f}%")
    
    print("\n📊 ADVANCED METRICS ANALYSIS")
    print("="*60)
    
    for metric, description in advanced_metrics.items():
        data = metric_analysis[metric]
        print(f"\n🔬 {description}")
        print(f"   Coverage: {data['valid']}/{data['total']} ({data['coverage']:.1f}%)")
        print(f"   Missing:  {data['null']} null + {data['empty']} empty")
        
        if data['stats']:
            stats = data['stats']
            print(f"   Range:    {stats['min']:.3f} to {stats['max']:.3f}")
            print(f"   Average:  {stats['mean']:.3f} (±{stats['stdev']:.3f})")
            print(f"   Median:   {stats['median']:.3f}")
    
    # Analysis by time period
    print("\n📅 DATA AVAILABILITY BY TIME PERIOD")
    print("="*60)
    
    time_periods = {
        '1 Year': ['return_1y', 'volatility_1y', 'max_drawdown_1y', 'return_per_risk_1y'],
        '3 Years': ['return_3y', 'volatility_3y', 'max_drawdown_3y', 'return_per_risk_3y'],
        '5 Years': ['return_5y', 'volatility_5y', 'max_drawdown_5y', 'return_per_risk_5y']
    }
    
    for period, metrics in time_periods.items():
        print(f"\n📆 {period} Data:")
        for metric in metrics:
            coverage = metric_analysis[metric]['coverage']
            status = "✅ Good" if coverage >= 50 else "⚠️ Poor" if coverage >= 20 else "❌ Critical"
            print(f"   {metric:20}: {coverage:5.1f}% {status}")
    
    # Risk-adjusted performance analysis
    print("\n🎯 RISK-ADJUSTED PERFORMANCE ANALYSIS")
    print("="*60)
    
    # Find ETFs with complete risk-adjusted data
    complete_data_etfs = []
    for etf in etf_data:
        if (etf.get('return_per_risk_3y') is not None and
            etf.get('return_3y') is not None and
            etf.get('volatility_3y') is not None):
            complete_data_etfs.append(etf)
    
    print(f"ETFs with complete 3Y risk data: {len(complete_data_etfs)}/{len(etf_data)} ({len(complete_data_etfs)/len(etf_data)*100:.1f}%)")
    
    if complete_data_etfs:
        print("\nTOP 10 RISK-ADJUSTED PERFORMERS (3Y Sharpe Ratio):")
        sorted_etfs = sorted(complete_data_etfs, key=lambda x: x.get('return_per_risk_3y', 0), reverse=True)[:10]
        
        for i, etf in enumerate(sorted_etfs, 1):
            name = etf['name'][:40] + '...' if len(etf['name']) > 40 else etf['name']
            sharpe = etf.get('return_per_risk_3y', 0)
            return_3y = etf.get('return_3y', 0)
            vol_3y = etf.get('volatility_3y', 0)
            category = etf.get('category', 'Unknown')
            
            print(f"  {i:2d}. {name}")
            print(f"      Sharpe: {sharpe:.2f} | Return: {return_3y:.1f}% | Vol: {vol_3y:.1f}% | {category}")
    
    # Performance by category
    print("\n📊 PERFORMANCE BY CATEGORY")
    print("="*60)
    
    category_performance = defaultdict(list)
    for etf in etf_data:
        if etf.get('return_1y') is not None and etf.get('category'):
            category_performance[etf['category']].append(etf['return_1y'])
    
    print("Average 1Y Returns by Category:")
    for category, returns in category_performance.items():
        if len(returns) >= 5:  # Only show categories with 5+ ETFs
            avg_return = statistics.mean(returns)
            count = len(returns)
            print(f"  {category:15}: {avg_return:6.2f}% ({count} ETFs)")
    
    # Data quality assessment
    print("\n🔍 DATA QUALITY ASSESSMENT")
    print("="*60)
    
    high_quality = []  # ETFs with >80% metrics available
    medium_quality = []  # ETFs with 50-80% metrics available  
    low_quality = []  # ETFs with <50% metrics available
    
    for etf in etf_data:
        available_metrics = 0
        total_metrics = len(all_metrics)
        
        for metric in all_metrics.keys():
            if etf.get(metric) is not None and etf.get(metric) != "":
                available_metrics += 1
        
        coverage = available_metrics / total_metrics * 100
        
        if coverage >= 80:
            high_quality.append((etf, coverage))
        elif coverage >= 50:
            medium_quality.append((etf, coverage))
        else:
            low_quality.append((etf, coverage))
    
    print(f"High Quality (≥80% metrics): {len(high_quality)}/{len(etf_data)} ({len(high_quality)/len(etf_data)*100:.1f}%)")
    print(f"Medium Quality (50-79%):     {len(medium_quality)}/{len(etf_data)} ({len(medium_quality)/len(etf_data)*100:.1f}%)")
    print(f"Low Quality (<50%):          {len(low_quality)}/{len(etf_data)} ({len(low_quality)/len(etf_data)*100:.1f}%)")
    
    if high_quality:
        print(f"\nTop 5 Highest Quality ETFs:")
        high_quality.sort(key=lambda x: x[1], reverse=True)
        for i, (etf, coverage) in enumerate(high_quality[:5], 1):
            name = etf['name'][:45] + '...' if len(etf['name']) > 45 else etf['name']
            print(f"  {i}. {name} ({coverage:.1f}% coverage)")
    
    # Problematic patterns
    print("\n⚠️  PROBLEMATIC PATTERNS")
    print("="*60)
    
    print("Metrics with <30% coverage:")
    for metric, data in metric_analysis.items():
        if data['coverage'] < 30:
            print(f"  {metric:25}: {data['coverage']:5.1f}%")
    
    print("\nETFs with extreme values:")
    extreme_etfs = []
    for etf in etf_data:
        # Check for extreme returns (>100% or <-50%)
        for return_field in ['return_1y', 'return_3y', 'return_5y']:
            value = etf.get(return_field)
            if value is not None and (value > 100 or value < -50):
                extreme_etfs.append((etf['name'][:40], return_field, value))
    
    for name, field, value in extreme_etfs[:5]:
        print(f"  {name}: {field} = {value:.1f}%")
    
    print("\n" + "="*80)
    print("🎯 RECOMMENDATIONS")
    print("="*80)
    
    # Calculate priority fixes
    critical_metrics = []
    for metric, data in metric_analysis.items():
        if data['coverage'] < 30 and metric in ['return_per_risk_3y', 'max_drawdown_3y', 'max_drawdown_5y']:
            critical_metrics.append(metric)
    
    print("1. CRITICAL DATA GAPS TO FIX:")
    for metric in critical_metrics:
        coverage = metric_analysis[metric]['coverage']
        print(f"   • {metric}: {coverage:.1f}% coverage - needs scraping improvement")
    
    high_coverage_metrics = [m for m, d in metric_analysis.items() if d['coverage'] > 80]
    print(f"\n2. WORKING WELL ({len(high_coverage_metrics)} metrics >80% coverage):")
    for metric in high_coverage_metrics[:5]:
        coverage = metric_analysis[metric]['coverage']  
        print(f"   • {metric}: {coverage:.1f}% coverage ✅")
    
    rating_ready_etfs = len([etf for etf in etf_data if 
                           etf.get('return_per_risk_3y') is not None and 
                           etf.get('ter_numeric') is not None and
                           etf.get('fund_size_numeric') is not None])
    
    print(f"\n3. RATING SYSTEM STATUS:")
    print(f"   • ETFs ready for rating: {rating_ready_etfs}/{len(etf_data)} ({rating_ready_etfs/len(etf_data)*100:.1f}%)")
    print(f"   • Main blocker: return_per_risk_3y coverage at {metric_analysis['return_per_risk_3y']['coverage']:.1f}%")

if __name__ == "__main__":
    analyze_risk_performance()