#!/usr/bin/env python3
"""
Test uploader for a single batch file to validate the approach
"""

import json
import os
import sys
import time
from typing import Dict, List, Any
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def safe_log(level: str, message: str):
    """Safe logging with error handling"""
    try:
        getattr(logging, level)(message)
    except Exception as e:
        print(f"Logging error: {e}, Original message: {message}")

# Initialize Supabase client
try:
    from supabase import create_client, Client
    from dotenv import load_dotenv
    
    load_dotenv()
    
    SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
    SUPABASE_ANON_KEY = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')
    
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        raise Exception("Missing Supabase credentials in environment variables")
    
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    safe_log("info", "✅ Supabase client initialized successfully")
    
except Exception as e:
    safe_log("error", f"❌ Failed to initialize Supabase client: {e}")
    sys.exit(1)

def transform_etf_for_database(etf_data: Dict[str, Any]) -> Dict[str, Any]:
    """Transform ETF data for database upload with rating fields"""
    def safe_numeric(value):
        if value == "" or value is None:
            return None
        try:
            if isinstance(value, (int, float)):
                return value
            if isinstance(value, str):
                # Try to convert to float first, then int if it's a whole number
                float_val = float(value)
                if float_val.is_integer():
                    return int(float_val)
                return float_val
            return None
        except (ValueError, TypeError):
            return None
    
    def safe_integer(value):
        if value == "" or value is None:
            return None
        try:
            if isinstance(value, int):
                return value
            if isinstance(value, (float, str)):
                return int(float(value))
            return None
        except (ValueError, TypeError):
            return None

    transformed = {
        'isin': etf_data.get('isin', ''),
        'name': etf_data.get('name', ''),
        'url': etf_data.get('url', ''),
        'description_en': etf_data.get('description_en', ''),
        'description_cs': etf_data.get('description_cs', ''),
        'ter': etf_data.get('ter', ''),
        'ter_numeric': safe_numeric(etf_data.get('ter_numeric')),
        'fund_size': etf_data.get('fund_size', ''),
        'fund_size_numeric': safe_numeric(etf_data.get('fund_size_numeric')),
        'fund_size_currency': etf_data.get('fund_size_currency', ''),
        'fund_currency': etf_data.get('fund_currency', ''),
        'fund_domicile': etf_data.get('fund_domicile', ''),
        'fund_provider': etf_data.get('fund_provider', ''),
        'inception_date': etf_data.get('inception_date', ''),
        'distribution_policy': etf_data.get('distribution_policy', ''),
        'distribution_frequency': etf_data.get('distribution_frequency', ''),
        'replication': etf_data.get('replication', ''),
        'legal_structure': etf_data.get('legal_structure', ''),
        'index_name': etf_data.get('index_name', ''),
        'investment_focus': etf_data.get('investment_focus', ''),
        'sustainability': etf_data.get('sustainability', ''),
        'category': etf_data.get('category', ''),
        'region': etf_data.get('region', ''),
        'total_holdings': safe_integer(etf_data.get('total_holdings')),
        'return_1y': safe_numeric(etf_data.get('return_1y')),
        'return_3y': safe_numeric(etf_data.get('return_3y')),
        'return_5y': safe_numeric(etf_data.get('return_5y')),
        'return_ytd': safe_numeric(etf_data.get('return_ytd')),
        'volatility_1y': safe_numeric(etf_data.get('volatility_1y')),
        'volatility_3y': safe_numeric(etf_data.get('volatility_3y')),
        'volatility_5y': safe_numeric(etf_data.get('volatility_5y')),
        'return_per_risk_1y': safe_numeric(etf_data.get('return_per_risk_1y')),
        'return_per_risk_3y': safe_numeric(etf_data.get('return_per_risk_3y')),
        'return_per_risk_5y': safe_numeric(etf_data.get('return_per_risk_5y')),
        'max_drawdown_1y': safe_numeric(etf_data.get('max_drawdown_1y')),
        'max_drawdown_3y': safe_numeric(etf_data.get('max_drawdown_3y')),
        'max_drawdown_5y': safe_numeric(etf_data.get('max_drawdown_5y')),
        'max_drawdown_inception': safe_numeric(etf_data.get('max_drawdown_inception')),
        'beta': safe_numeric(etf_data.get('beta')),
        'correlation': safe_numeric(etf_data.get('correlation')),
        'tracking_error': safe_numeric(etf_data.get('tracking_error')),
        'information_ratio': safe_numeric(etf_data.get('information_ratio')),
        'primary_exchange': etf_data.get('primary_exchange', ''),
        'primary_ticker': etf_data.get('primary_ticker', ''),
        'total_exchanges': safe_integer(etf_data.get('total_exchanges')),
        'current_dividend_yield': etf_data.get('current_dividend_yield', ''),
        'current_dividend_yield_numeric': safe_numeric(etf_data.get('current_dividend_yield_numeric')),
        'dividends_12m': etf_data.get('dividends_12m', ''),
        'dividends_12m_numeric': safe_numeric(etf_data.get('dividends_12m_numeric')),
        'dividends_12m_currency': etf_data.get('dividends_12m_currency', ''),
        'scraping_date': etf_data.get('scraping_date', ''),
        'scraping_status': etf_data.get('scraping_status', ''),
        'retry_count': safe_integer(etf_data.get('retry_count', 0)),
        'rating': safe_integer(etf_data.get('rating')),
        'rating_score': safe_integer(etf_data.get('rating_score')),
    }
    
    return transformed

def main():
    """Test with batch_0001.json"""
    batch_path = "/Users/tomaskostrhoun/Documents/ETF/Scraper/justetf_complete_production/checkpoints/batch_0001.json"
    
    if not os.path.exists(batch_path):
        safe_log("error", f"❌ Batch file not found: {batch_path}")
        sys.exit(1)
    
    # Load batch data
    safe_log("info", f"📂 Loading batch file: {batch_path}")
    try:
        with open(batch_path, 'r', encoding='utf-8') as f:
            etfs = json.load(f)
        safe_log("info", f"📊 Loaded {len(etfs)} ETFs")
    except Exception as e:
        safe_log("error", f"❌ Failed to load batch: {e}")
        sys.exit(1)
    
    # Test with just first 3 ETFs
    test_etfs = etfs[:3]
    safe_log("info", f"🧪 Testing with first {len(test_etfs)} ETFs")
    
    # Transform and upload
    success_count = 0
    for i, etf in enumerate(test_etfs, 1):
        try:
            safe_log("info", f"📤 Uploading ETF {i}/{len(test_etfs)}: {etf.get('isin', 'Unknown')} - {etf.get('name', 'Unknown')}")
            
            transformed = transform_etf_for_database(etf)
            
            # Try with rating fields first
            try:
                response = supabase.table('etf_funds').upsert(
                    [transformed],
                    on_conflict='isin'
                ).execute()
                
                if response.data:
                    success_count += 1
                    safe_log("info", f"✅ ETF {i}: Successfully uploaded with rating fields")
                    safe_log("info", f"   Rating: {transformed.get('rating')}, Score: {transformed.get('rating_score')}")
                else:
                    safe_log("warning", f"⚠️ ETF {i}: No data returned")
                    
            except Exception as rating_error:
                safe_log("warning", f"⚠️ ETF {i}: Rating fields failed: {rating_error}")
                safe_log("info", f"🔄 ETF {i}: Retrying without rating fields...")
                
                # Remove rating fields and retry
                transformed_no_rating = transformed.copy()
                transformed_no_rating.pop('rating', None)
                transformed_no_rating.pop('rating_score', None)
                
                response = supabase.table('etf_funds').upsert(
                    [transformed_no_rating],
                    on_conflict='isin'
                ).execute()
                
                if response.data:
                    success_count += 1
                    safe_log("info", f"✅ ETF {i}: Successfully uploaded without rating fields")
                else:
                    safe_log("error", f"❌ ETF {i}: Failed completely")
            
            time.sleep(0.2)  # Small delay
            
        except Exception as e:
            safe_log("error", f"❌ ETF {i}: Failed: {e}")
    
    safe_log("info", f"\n🎯 TEST RESULTS:")
    safe_log("info", f"✅ Successful uploads: {success_count}/{len(test_etfs)}")
    safe_log("info", f"📈 Success rate: {(success_count/len(test_etfs)*100):.1f}%")
    
    if success_count == len(test_etfs):
        safe_log("info", "🎉 Test successful! Ready for full upload.")
        return 0
    else:
        safe_log("error", "❌ Test failed!")
        return 1

if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        safe_log("info", "\n⏹️ Test interrupted by user")
        sys.exit(1)
    except Exception as e:
        safe_log("error", f"❌ Unexpected error: {e}")
        sys.exit(1)