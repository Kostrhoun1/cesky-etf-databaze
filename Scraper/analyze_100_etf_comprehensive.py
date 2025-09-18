#!/usr/bin/env python3

import pandas as pd
import sys
from collections import defaultdict

def analyze_100_etf_results():
    """Comprehensive analysis of 100 ETF test results"""
    
    try:
        # Find the most recent results file
        import glob
        import os
        
        pattern = "/Users/tomaskostrhoun/Documents/ETF/Scraper/justetf_complete_production/results/FINAL_COMPLETE_WITH_DIVIDENDS_*.csv"
        files = glob.glob(pattern)
        files.sort(key=os.path.getmtime, reverse=True)
        
        if not files:
            print("❌ No results files found!")
            return
            
        latest_file = files[0]
        print(f"📄 Analyzing: {os.path.basename(latest_file)}")
        
        # Read the results
        df = pd.read_csv(latest_file, sep=';')
        
        print("=" * 80)
        print("COMPREHENSIVE 100 ETF DATA EXTRACTION ANALYSIS")
        print("=" * 80)
        print(f"Total ETFs analyzed: {len(df)}")
        print()
        
        # Define all critical metrics to analyze
        all_metrics = {
            # Basic Info
            'Basic Information': ['name', 'ter_numeric', 'fund_size_numeric', 'inception_date', 'fund_provider'],
            
            # Performance Metrics
            'Returns': ['return_1y', 'return_3y', 'return_5y', 'return_ytd'],
            
            # Risk Metrics  
            'Volatility': ['volatility_1y', 'volatility_3y', 'volatility_5y'],
            
            # Risk-Adjusted Performance
            'Return per Risk': ['return_per_risk_1y', 'return_per_risk_3y', 'return_per_risk_5y'],
            
            # Drawdown Analysis
            'Max Drawdown': ['max_drawdown_1y', 'max_drawdown_3y', 'max_drawdown_5y', 'max_drawdown_inception'],
            
            # Advanced Risk Metrics
            'Advanced Risk': ['beta', 'correlation', 'tracking_error', 'information_ratio'],
            
            # Dividend Information
            'Dividends': ['current_dividend_yield_numeric', 'dividends_12m_numeric'],
            
            # Holdings & Composition
            'Holdings': ['total_holdings', 'holding_1_name', 'holding_1_weight'],
            
            # Geographic & Sector
            'Geography': ['country_1_name', 'country_1_weight', 'sector_1_name', 'sector_1_weight'],
            
            # Exchange Data
            'Exchange Info': ['primary_exchange', 'primary_ticker', 'total_exchanges'],
            
            # Rating System
            'Ratings': ['rating', 'rating_score', 'rating_ter_score', 'rating_size_score', 
                       'rating_track_record_score', 'rating_provider_score', 'rating_performance_score']
        }
        
        # Analyze each category
        category_results = {}
        
        for category, metrics in all_metrics.items():
            print(f"\n📊 {category.upper()} METRICS:")
            print("-" * 50)
            
            category_stats = {}
            available_metrics = [m for m in metrics if m in df.columns]
            
            if not available_metrics:
                print(f"   ❌ No {category.lower()} columns found in data")
                continue
                
            for metric in available_metrics:
                non_null_count = df[metric].notna().sum()
                coverage_pct = (non_null_count / len(df)) * 100
                
                # Determine status
                if coverage_pct >= 80:
                    status = "✅ EXCELLENT"
                elif coverage_pct >= 60:
                    status = "🟡 GOOD"    
                elif coverage_pct >= 40:
                    status = "🟠 FAIR"
                elif coverage_pct >= 20:
                    status = "🔴 POOR"
                else:
                    status = "❌ CRITICAL"
                
                category_stats[metric] = {
                    'coverage': coverage_pct,
                    'count': non_null_count,
                    'status': status
                }
                
                print(f"   {metric:25s}: {non_null_count:3d}/{len(df):3d} ({coverage_pct:5.1f}%) {status}")
                
                # Show examples for successful extractions
                if non_null_count > 0 and coverage_pct < 100:
                    sample_values = df[metric].dropna().head(3).astype(str).tolist()
                    if sample_values:
                        examples = ", ".join(sample_values[:3])
                        print(f"   {'':27s}Examples: {examples}")
            
            category_results[category] = category_stats
        
        print("\n" + "=" * 80)
        print("SUMMARY ANALYSIS")
        print("=" * 80)
        
        # Overall statistics
        total_metrics = sum(len(stats) for stats in category_results.values())
        excellent_metrics = sum(1 for stats in category_results.values() 
                               for stat in stats.values() if stat['coverage'] >= 80)
        critical_metrics = sum(1 for stats in category_results.values() 
                              for stat in stats.values() if stat['coverage'] < 20)
        
        print(f"📈 OVERALL PERFORMANCE:")
        print(f"   Total metrics analyzed: {total_metrics}")
        print(f"   Excellent coverage (≥80%): {excellent_metrics} ({(excellent_metrics/total_metrics)*100:.1f}%)")
        print(f"   Critical issues (<20%): {critical_metrics} ({(critical_metrics/total_metrics)*100:.1f}%)")
        
        print(f"\n🔍 CRITICAL ISSUES REQUIRING ATTENTION:")
        for category, stats in category_results.items():
            critical_in_category = [metric for metric, data in stats.items() if data['coverage'] < 20]
            if critical_in_category:
                print(f"   {category}: {', '.join(critical_in_category)}")
        
        print(f"\n🌟 TOP PERFORMING CATEGORIES:")
        category_averages = {}
        for category, stats in category_results.items():
            if stats:
                avg_coverage = sum(data['coverage'] for data in stats.values()) / len(stats)
                category_averages[category] = avg_coverage
        
        sorted_categories = sorted(category_averages.items(), key=lambda x: x[1], reverse=True)
        for category, avg_coverage in sorted_categories[:5]:
            print(f"   {category}: {avg_coverage:.1f}% average coverage")
        
        # ETF type analysis
        print(f"\n📋 DATASET COMPOSITION:")
        if 'category' in df.columns:
            category_counts = df['category'].value_counts()
            print("   By Category:")
            for cat, count in category_counts.head(5).items():
                print(f"     {cat}: {count} ETFs")
        
        if 'region' in df.columns:
            region_counts = df['region'].value_counts()
            print("   By Region:")
            for region, count in region_counts.head(5).items():
                print(f"     {region}: {count} ETFs")
        
        print("\n" + "=" * 80)
        print("RECOMMENDATIONS FOR IMPROVEMENT")
        print("=" * 80)
        
        # Generate specific recommendations
        recommendations = []
        
        for category, stats in category_results.items():
            critical_metrics = [metric for metric, data in stats.items() if data['coverage'] < 20]
            poor_metrics = [metric for metric, data in stats.items() if 20 <= data['coverage'] < 40]
            
            if critical_metrics:
                recommendations.append(f"🔴 URGENT: Fix {category} extraction for {', '.join(critical_metrics)}")
            elif poor_metrics:
                recommendations.append(f"🟠 IMPROVE: Enhance {category} patterns for {', '.join(poor_metrics)}")
        
        if recommendations:
            for i, rec in enumerate(recommendations, 1):
                print(f"{i:2d}. {rec}")
        else:
            print("🎉 No critical issues found - data extraction is performing excellently!")
        
        print("=" * 80)
        
    except Exception as e:
        print(f"❌ Error during analysis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    analyze_100_etf_results()