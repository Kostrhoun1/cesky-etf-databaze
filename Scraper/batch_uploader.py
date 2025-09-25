#!/usr/bin/env python3
"""
Optimized batch uploader for ETF data to Supabase
Processes the 73 batch files from production scraper run with timeout handling
"""

import json
import os
import sys
import time
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('batch_upload.log'),
        logging.StreamHandler()
    ]
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
    # Convert empty strings to None for numeric fields
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

    # Extract dividend data
    def extract_dividend_data(etf_data):
        dividend_data = {}
        try:
            if 'dividends_12m' in etf_data and etf_data['dividends_12m']:
                dividend_str = str(etf_data['dividends_12m']).strip()
                if dividend_str and dividend_str != "":
                    parts = dividend_str.split()
                    if len(parts) >= 2:
                        dividend_data['dividends_12m_numeric'] = safe_numeric(parts[0])
                        dividend_data['dividends_12m_currency'] = parts[1]
                    else:
                        dividend_data['dividends_12m_numeric'] = safe_numeric(dividend_str)
                        dividend_data['dividends_12m_currency'] = etf_data.get('fund_currency', '')
        except Exception as e:
            safe_log("warning", f"Error extracting dividend data: {e}")
        return dividend_data

    dividend_data = extract_dividend_data(etf_data)
    
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
        
        # Performance metrics
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
        
        # Exchange info
        'primary_exchange': etf_data.get('primary_exchange', ''),
        'primary_ticker': etf_data.get('primary_ticker', ''),
        'total_exchanges': safe_integer(etf_data.get('total_exchanges')),
        
        # Dividend info
        'current_dividend_yield': etf_data.get('current_dividend_yield', ''),
        'current_dividend_yield_numeric': safe_numeric(etf_data.get('current_dividend_yield_numeric')),
        'dividends_12m': etf_data.get('dividends_12m', ''),
        'dividends_12m_numeric': dividend_data.get('dividends_12m_numeric', safe_numeric(etf_data.get('dividends_12m_numeric'))),
        'dividends_12m_currency': dividend_data.get('dividends_12m_currency', etf_data.get('dividends_12m_currency', '')),
        
        # Metadata
        'scraping_date': etf_data.get('scraping_date', ''),
        'scraping_status': etf_data.get('scraping_status', ''),
        'retry_count': safe_integer(etf_data.get('retry_count', 0)),
        
        # Rating fields (the key addition!)
        'rating': safe_integer(etf_data.get('rating')),
        'rating_score': safe_integer(etf_data.get('rating_score')),
    }
    
    return transformed

def upload_chunk_to_database(etfs: List[Dict[str, Any]], chunk_size: int = 10) -> bool:
    """Upload ETFs to database in smaller chunks to avoid timeout"""
    success_count = 0
    total_etfs = len(etfs)
    
    safe_log("info", f"📤 Uploading {total_etfs} ETFs in chunks of {chunk_size}...")
    
    for i in range(0, total_etfs, chunk_size):
        chunk = etfs[i:i + chunk_size]
        chunk_num = (i // chunk_size) + 1
        total_chunks = (total_etfs + chunk_size - 1) // chunk_size
        
        try:
            safe_log("info", f"📦 Chunk {chunk_num}/{total_chunks}: Uploading {len(chunk)} ETFs...")
            
            # Transform data for database
            transformed_chunk = [transform_etf_for_database(etf) for etf in chunk]
            
            # Try upload with rating fields first
            try:
                response = supabase.table('etf_funds').upsert(
                    transformed_chunk,
                    on_conflict='isin'
                ).execute()
                
                if response.data:
                    success_count += len(chunk)
                    safe_log("info", f"✅ Chunk {chunk_num}: Successfully uploaded {len(chunk)} ETFs with rating fields")
                else:
                    safe_log("warning", f"⚠️ Chunk {chunk_num}: No data returned from upload")
                    
            except Exception as rating_error:
                safe_log("warning", f"⚠️ Chunk {chunk_num}: Rating fields failed: {rating_error}")
                safe_log("info", f"🔄 Chunk {chunk_num}: Retrying without rating fields...")
                
                # Remove rating fields and retry
                transformed_chunk_no_rating = []
                for etf in transformed_chunk:
                    etf_copy = etf.copy()
                    etf_copy.pop('rating', None)
                    etf_copy.pop('rating_score', None)
                    transformed_chunk_no_rating.append(etf_copy)
                
                response = supabase.table('etf_funds').upsert(
                    transformed_chunk_no_rating,
                    on_conflict='isin'
                ).execute()
                
                if response.data:
                    success_count += len(chunk)
                    safe_log("info", f"✅ Chunk {chunk_num}: Successfully uploaded {len(chunk)} ETFs without rating fields")
                else:
                    safe_log("error", f"❌ Chunk {chunk_num}: Failed to upload even without rating fields")
            
            # Small delay between chunks to be respectful to the database
            time.sleep(0.5)
            
        except Exception as e:
            safe_log("error", f"❌ Chunk {chunk_num}: Failed to upload: {e}")
            
    safe_log("info", f"🎯 Upload complete: {success_count}/{total_etfs} ETFs uploaded successfully")
    return success_count == total_etfs

def load_batch_file(batch_path: str) -> List[Dict[str, Any]]:
    """Load and validate a batch JSON file"""
    try:
        with open(batch_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if not isinstance(data, list):
            safe_log("error", f"❌ Invalid batch file format: {batch_path}")
            return []
            
        safe_log("info", f"📂 Loaded {len(data)} ETFs from {batch_path}")
        return data
        
    except Exception as e:
        safe_log("error", f"❌ Failed to load batch file {batch_path}: {e}")
        return []

def main():
    """Main uploader function"""
    checkpoints_dir = "/Users/tomaskostrhoun/Documents/ETF/Scraper/justetf_complete_production/checkpoints"
    
    if not os.path.exists(checkpoints_dir):
        safe_log("error", f"❌ Checkpoints directory not found: {checkpoints_dir}")
        sys.exit(1)
    
    # Get all batch files
    batch_files = sorted([f for f in os.listdir(checkpoints_dir) if f.startswith('batch_') and f.endswith('.json')])
    
    if not batch_files:
        safe_log("error", "❌ No batch files found")
        sys.exit(1)
    
    safe_log("info", f"🚀 Starting upload of {len(batch_files)} batch files")
    safe_log("info", f"📁 Batch files: {batch_files[:5]}..." + (f" (+{len(batch_files)-5} more)" if len(batch_files) > 5 else ""))
    
    total_etfs = 0
    uploaded_etfs = 0
    failed_batches = []
    
    start_time = datetime.now()
    
    for i, batch_file in enumerate(batch_files, 1):
        batch_path = os.path.join(checkpoints_dir, batch_file)
        safe_log("info", f"\n📋 Processing batch {i}/{len(batch_files)}: {batch_file}")
        
        # Load batch data
        etfs = load_batch_file(batch_path)
        if not etfs:
            failed_batches.append(batch_file)
            continue
        
        total_etfs += len(etfs)
        
        # Upload batch with small chunk size to avoid timeouts
        success = upload_chunk_to_database(etfs, chunk_size=5)
        
        if success:
            uploaded_etfs += len(etfs)
            safe_log("info", f"✅ Batch {i} completed successfully")
        else:
            failed_batches.append(batch_file)
            safe_log("error", f"❌ Batch {i} failed")
    
    # Final summary
    end_time = datetime.now()
    duration = end_time - start_time
    
    safe_log("info", f"\n🎯 UPLOAD SUMMARY:")
    safe_log("info", f"📊 Total ETFs processed: {total_etfs}")
    safe_log("info", f"✅ Successfully uploaded: {uploaded_etfs}")
    safe_log("info", f"❌ Failed ETFs: {total_etfs - uploaded_etfs}")
    safe_log("info", f"📁 Failed batches: {len(failed_batches)}")
    safe_log("info", f"⏱️ Total duration: {duration}")
    safe_log("info", f"📈 Success rate: {(uploaded_etfs/total_etfs*100):.1f}%")
    
    if failed_batches:
        safe_log("warning", f"⚠️ Failed batch files: {failed_batches}")
    
    if uploaded_etfs == total_etfs:
        safe_log("info", "🎉 ALL ETFs uploaded successfully!")
        return 0
    else:
        safe_log("error", "❌ Some ETFs failed to upload")
        return 1

if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        safe_log("info", "\n⏹️ Upload interrupted by user")
        sys.exit(1)
    except Exception as e:
        safe_log("error", f"❌ Unexpected error: {e}")
        sys.exit(1)