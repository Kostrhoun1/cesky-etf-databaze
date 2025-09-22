#!/usr/bin/env python3
"""
Database Analyzer - Universal tool for analyzing ETF database
Usage: python3 db_analyzer.py [query_type] [parameters]

Examples:
  python3 db_analyzer.py regions
  python3 db_analyzer.py count_by region
  python3 db_analyzer.py search "MSCI World"
  python3 db_analyzer.py top_holdings 5
"""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv
from collections import Counter

# Load environment variables
load_dotenv('.env')

class DatabaseAnalyzer:
    def __init__(self):
        url = os.getenv('VITE_SUPABASE_URL')
        key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
        
        if not url or not key:
            raise Exception("Missing Supabase credentials in .env file")
        
        self.supabase: Client = create_client(url, key)
        print(f"🔗 Connected to: {url}")
    
    def get_all_data(self, columns="*", limit=None):
        """Get all ETF data with optional column selection and limit"""
        query = self.supabase.table('etf_funds').select(columns)
        if limit:
            query = query.limit(limit)
        return query.execute()
    
    def analyze_regions(self):
        """Analyze region distribution"""
        print("\n🌍 REGION ANALYSIS")
        print("=" * 40)
        
        result = self.supabase.table('etf_funds').select('region').execute()
        regions = Counter(row.get('region', 'NULL') for row in result.data)
        
        for region, count in regions.most_common():
            print(f"{region:20} : {count:4,}")
        
        return regions
    
    def count_by_field(self, field):
        """Count occurrences by any field"""
        print(f"\n📊 COUNT BY {field.upper()}")
        print("=" * 40)
        
        result = self.supabase.table('etf_funds').select(field).execute()
        counts = Counter(row.get(field, 'NULL') for row in result.data)
        
        for value, count in counts.most_common(10):  # Top 10
            value_str = str(value)[:30]  # Truncate long values
            print(f"{value_str:32} : {count:4,}")
        
        return counts
    
    def search_etfs(self, search_term):
        """Search ETFs by name or ISIN"""
        print(f"\n🔍 SEARCH: '{search_term}'")
        print("=" * 50)
        
        # Search in name and ISIN
        result = self.supabase.table('etf_funds').select('name,isin,region,ter_numeric').or_(
            f'name.ilike.%{search_term}%,isin.ilike.%{search_term}%'
        ).limit(10).execute()
        
        for etf in result.data:
            ter = etf.get('ter_numeric', 'N/A')
            print(f"{etf['name'][:40]:42} | {etf['isin']} | {etf.get('region', 'N/A'):15} | TER: {ter}")
        
        print(f"\nFound {len(result.data)} results (showing max 10)")
        return result.data
    
    def analyze_top_holdings(self, limit=10):
        """Analyze most common holdings across all ETFs"""
        print(f"\n🏢 TOP {limit} HOLDINGS ACROSS ALL ETFs")
        print("=" * 50)
        
        result = self.supabase.table('etf_funds').select(
            'holding_1_name,holding_2_name,holding_3_name,holding_4_name,holding_5_name'
        ).execute()
        
        holdings = []
        for row in result.data:
            for i in range(1, 6):
                holding = row.get(f'holding_{i}_name')
                if holding and holding.strip():
                    holdings.append(holding.strip())
        
        holdings_counter = Counter(holdings)
        
        for holding, count in holdings_counter.most_common(limit):
            print(f"{holding[:40]:42} : appears in {count:3,} ETFs")
        
        return holdings_counter
    
    def custom_query(self, table='etf_funds', columns='*', filters=None, limit=100):
        """Execute custom query"""
        print(f"\n⚡ CUSTOM QUERY")
        print("=" * 30)
        
        query = self.supabase.table(table).select(columns)
        
        if filters:
            for field, value in filters.items():
                query = query.eq(field, value)
        
        if limit:
            query = query.limit(limit)
        
        result = query.execute()
        print(f"Query returned {len(result.data)} rows")
        
        return result.data

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return
    
    analyzer = DatabaseAnalyzer()
    command = sys.argv[1].lower()
    
    try:
        if command == 'regions':
            analyzer.analyze_regions()
        
        elif command == 'count_by' and len(sys.argv) > 2:
            field = sys.argv[2]
            analyzer.count_by_field(field)
        
        elif command == 'search' and len(sys.argv) > 2:
            search_term = sys.argv[2]
            analyzer.search_etfs(search_term)
        
        elif command == 'top_holdings':
            limit = int(sys.argv[2]) if len(sys.argv) > 2 else 10
            analyzer.analyze_top_holdings(limit)
        
        elif command == 'stats':
            # Overall statistics
            print("📊 OVERALL STATISTICS")
            print("=" * 30)
            result = analyzer.supabase.table('etf_funds').select('*', count='exact').limit(1).execute()
            total = result.count
            print(f"📊 Total ETFs: {total:,}")
            analyzer.analyze_regions()
        
        else:
            print(f"Unknown command: {command}")
            print(__doc__)
    
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()