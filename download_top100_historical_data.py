#!/usr/bin/env python3
"""
Bulk downloader historických dat pro top 100 ETF z Yahoo Finance
Data ukládá lokálně do CSV souborů pro testování kvality
"""

import yfinance as yf
import pandas as pd
import json
import os
import time
from datetime import datetime, timedelta
import logging

# Nastavení loggingu
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def load_etf_list():
    """Načte seznam top 100 ETF"""
    filename = "/Users/tomaskostrhoun/Documents/ETF/top100_etf_for_yahoo_test.json"
    
    with open(filename, 'r', encoding='utf-8') as f:
        etfs = json.load(f)
    
    logger.info(f"📋 Načten seznam {len(etfs)} ETF pro testování")
    return etfs

def download_etf_data(ticker, period="2y", retries=3):
    """Stáhne historická data pro jeden ETF"""
    
    for attempt in range(retries):
        try:
            etf = yf.Ticker(ticker)
            
            # Historická data (OHLCV)
            hist = etf.history(period=period)
            
            # Info data (základní informace)
            info = etf.info
            
            # Dividendy
            dividends = etf.dividends
            
            # Stock splits
            splits = etf.splits
            
            result = {
                'ticker': ticker,
                'success': True,
                'data_available': len(hist) > 0,
                'days_count': len(hist),
                'start_date': hist.index[0].strftime('%Y-%m-%d') if len(hist) > 0 else None,
                'end_date': hist.index[-1].strftime('%Y-%m-%d') if len(hist) > 0 else None,
                'has_dividends': len(dividends) > 0,
                'dividend_count': len(dividends),
                'has_splits': len(splits) > 0,
                'historical_data': hist,
                'dividends': dividends,
                'splits': splits,
                'info': info,
                'download_timestamp': datetime.now().isoformat()
            }
            
            # Základní metriky z info
            if info:
                result.update({
                    'current_price': info.get('regularMarketPrice'),
                    'market_cap': info.get('marketCap'),
                    'volume': info.get('volume'),
                    'currency': info.get('currency'),
                    'exchange': info.get('exchange'),
                    'fund_family': info.get('fundFamily'),
                    'expense_ratio': info.get('annualReportExpenseRatio') or info.get('netExpenseRatio'),
                    'nav_price': info.get('navPrice'),
                    'total_assets': info.get('totalAssets'),
                    'ytd_return': info.get('ytdReturn'),
                    'beta': info.get('beta'),
                    'yield': info.get('yield')
                })
            
            logger.info(f"✅ {ticker:>8} | {len(hist):>4} dní | {info.get('shortName', 'N/A')[:30]:30}")
            return result
            
        except Exception as e:
            if attempt < retries - 1:
                logger.warning(f"⚠️  {ticker:>8} | Pokus {attempt + 1} neúspěšný: {e}")
                time.sleep(2)  # Pauza před dalším pokusem
            else:
                logger.error(f"❌ {ticker:>8} | Selhalo po {retries} pokusech: {e}")
                return {
                    'ticker': ticker,
                    'success': False,
                    'error': str(e),
                    'download_timestamp': datetime.now().isoformat()
                }
    
    return None

def save_etf_data(etf_data, output_dir):
    """Uloží data jednoho ETF do CSV souborů"""
    
    ticker = etf_data['ticker']
    
    # Vyčistíme ticker pro název souboru (nahradíme tečky a speciální znaky)
    clean_ticker = ticker.replace('.', '_').replace('/', '_')
    
    # Hlavní historická data
    if etf_data.get('data_available') and not etf_data['historical_data'].empty:
        hist_file = os.path.join(output_dir, f"{clean_ticker}_historical.csv")
        etf_data['historical_data'].to_csv(hist_file)
    
    # Dividendy
    if etf_data.get('has_dividends') and not etf_data['dividends'].empty:
        div_file = os.path.join(output_dir, f"{clean_ticker}_dividends.csv")
        etf_data['dividends'].to_csv(div_file)
    
    # Stock splits
    if etf_data.get('has_splits') and not etf_data['splits'].empty:
        splits_file = os.path.join(output_dir, f"{clean_ticker}_splits.csv")
        etf_data['splits'].to_csv(splits_file)
    
    # Metadata
    metadata = {k: v for k, v in etf_data.items() 
                if k not in ['historical_data', 'dividends', 'splits', 'info']}
    
    # Přidáme vybraná pole z info
    if etf_data.get('info'):
        info = etf_data['info']
        metadata['info_summary'] = {
            'longName': info.get('longName'),
            'shortName': info.get('shortName'),
            'category': info.get('category'),
            'fundFamily': info.get('fundFamily'),
            'currency': info.get('currency'),
            'exchange': info.get('exchange'),
            'marketCap': info.get('marketCap'),
            'totalAssets': info.get('totalAssets'),
            'netExpenseRatio': info.get('netExpenseRatio'),
            'annualReportExpenseRatio': info.get('annualReportExpenseRatio'),
            'yield': info.get('yield'),
            'ytdReturn': info.get('ytdReturn'),
            'beta': info.get('beta'),
            'volume': info.get('volume'),
            'regularMarketPrice': info.get('regularMarketPrice'),
            'fiftyTwoWeekHigh': info.get('fiftyTwoWeekHigh'),
            'fiftyTwoWeekLow': info.get('fiftyTwoWeekLow')
        }
    
    metadata_file = os.path.join(output_dir, f"{clean_ticker}_metadata.json")
    with open(metadata_file, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, default=str, ensure_ascii=False)

def create_summary_report(all_results, output_dir):
    """Vytvoří souhrnný report o stažených datech"""
    
    logger.info("📊 Vytváření souhrnného reportu...")
    
    # Základní statistiky
    total_etfs = len(all_results)
    successful = [r for r in all_results if r.get('success')]
    failed = [r for r in all_results if not r.get('success')]
    with_data = [r for r in successful if r.get('data_available')]
    with_dividends = [r for r in successful if r.get('has_dividends')]
    with_splits = [r for r in successful if r.get('has_splits')]
    
    # Analýza dat
    if with_data:
        avg_days = sum(r['days_count'] for r in with_data) / len(with_data)
        min_days = min(r['days_count'] for r in with_data)
        max_days = max(r['days_count'] for r in with_data)
        
        oldest_date = min(r['start_date'] for r in with_data if r['start_date'])
        newest_date = max(r['end_date'] for r in with_data if r['end_date'])
    else:
        avg_days = min_days = max_days = 0
        oldest_date = newest_date = "N/A"
    
    # Analýza exchange
    exchanges = {}
    currencies = {}
    fund_families = {}
    
    for result in successful:
        if result.get('exchange'):
            exchanges[result['exchange']] = exchanges.get(result['exchange'], 0) + 1
        if result.get('currency'):
            currencies[result['currency']] = currencies.get(result['currency'], 0) + 1
        if result.get('fund_family'):
            fund_families[result['fund_family']] = fund_families.get(result['fund_family'], 0) + 1
    
    # Souhrnný report
    summary = {
        'generation_time': datetime.now().isoformat(),
        'statistics': {
            'total_etfs_tested': total_etfs,
            'successful_downloads': len(successful),
            'failed_downloads': len(failed),
            'success_rate_percent': (len(successful) / total_etfs * 100) if total_etfs > 0 else 0,
            'etfs_with_historical_data': len(with_data),
            'etfs_with_dividends': len(with_dividends),
            'etfs_with_splits': len(with_splits)
        },
        'data_coverage': {
            'average_days': avg_days,
            'min_days': min_days,
            'max_days': max_days,
            'oldest_data_from': oldest_date,
            'newest_data_to': newest_date
        },
        'exchanges': dict(sorted(exchanges.items(), key=lambda x: x[1], reverse=True)),
        'currencies': dict(sorted(currencies.items(), key=lambda x: x[1], reverse=True)),
        'fund_families': dict(sorted(fund_families.items(), key=lambda x: x[1], reverse=True)),
        'failed_tickers': [r['ticker'] for r in failed],
        'detailed_results': all_results
    }
    
    # Uložení reportu
    report_file = os.path.join(output_dir, "download_summary_report.json")
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2, default=str, ensure_ascii=False)
    
    # CSV s přehledem
    csv_data = []
    for result in all_results:
        csv_data.append({
            'ticker': result['ticker'],
            'success': result.get('success', False),
            'has_data': result.get('data_available', False),
            'days_count': result.get('days_count', 0),
            'start_date': result.get('start_date', ''),
            'end_date': result.get('end_date', ''),
            'has_dividends': result.get('has_dividends', False),
            'dividend_count': result.get('dividend_count', 0),
            'has_splits': result.get('has_splits', False),
            'currency': result.get('currency', ''),
            'exchange': result.get('exchange', ''),
            'fund_family': result.get('fund_family', ''),
            'current_price': result.get('current_price', ''),
            'expense_ratio': result.get('expense_ratio', ''),
            'error': result.get('error', '')
        })
    
    csv_file = os.path.join(output_dir, "download_summary.csv")
    pd.DataFrame(csv_data).to_csv(csv_file, index=False)
    
    logger.info(f"✅ Souhrnný report uložen: {report_file}")
    logger.info(f"✅ CSV přehled uložen: {csv_file}")
    
    return summary

def main():
    print("🚀 BULK DOWNLOAD HISTORICKÝCH DAT PRO TOP 100 ETF")
    print("=" * 60)
    
    # Vytvoření output složky
    output_dir = "/Users/tomaskostrhoun/Documents/ETF/yahoo_finance_test_data"
    os.makedirs(output_dir, exist_ok=True)
    logger.info(f"📁 Output složka: {output_dir}")
    
    # Načtení seznamu ETF
    etfs = load_etf_list()
    
    print(f"\n📊 Plán stahování:")
    print(f"   ETF k testování: {len(etfs)}")
    print(f"   Období: 2 roky")
    print(f"   Odhad času: ~{len(etfs) * 3 / 60:.0f} minut")
    print(f"   Rate limit: 1 request per 2 seconds")
    
    # Automaticky pokračujeme bez potvrzení pro automatické spuštění
    print(f"\n🚀 Automatické spuštění - pokračuji se stahováním...")
    
    # Stahování dat
    print(f"\n🚀 Zahájení stahování...")
    print("=" * 60)
    
    all_results = []
    
    for i, etf in enumerate(etfs, 1):
        ticker = etf.get('yahoo_ticker')
        if not ticker:
            logger.warning(f"⚠️  Přeskakuji ETF bez tickeru: {etf.get('name', 'Unknown')}")
            continue
        
        logger.info(f"📥 [{i:3d}/{len(etfs)}] Stahování {ticker}...")
        
        # Stáhni data
        result = download_etf_data(ticker, period="2y")
        
        if result:
            all_results.append(result)
            
            # Ulož data pokud jsou dostupná
            if result.get('success') and result.get('data_available'):
                save_etf_data(result, output_dir)
        
        # Rate limiting - pauza mezi requesty
        if i < len(etfs):  # Ne po posledním
            time.sleep(2)
    
    # Vytvoř souhrnný report
    print(f"\n📊 Vytváření souhrnného reportu...")
    summary = create_summary_report(all_results, output_dir)
    
    # Finální statistiky
    print(f"\n✅ STAHOVÁNÍ DOKONČENO")
    print("=" * 30)
    print(f"📊 Celkem testováno: {summary['statistics']['total_etfs_tested']}")
    print(f"✅ Úspěšně staženo: {summary['statistics']['successful_downloads']}")
    print(f"❌ Neúspěšných: {summary['statistics']['failed_downloads']}")
    print(f"📈 Úspěšnost: {summary['statistics']['success_rate_percent']:.1f}%")
    print(f"📅 S daty: {summary['statistics']['etfs_with_historical_data']}")
    print(f"💰 S dividendami: {summary['statistics']['etfs_with_dividends']}")
    print(f"🔄 Se splity: {summary['statistics']['etfs_with_splits']}")
    
    if summary['statistics']['etfs_with_historical_data'] > 0:
        print(f"\n📊 Pokrytí dat:")
        print(f"   Průměr dní: {summary['data_coverage']['average_days']:.0f}")
        print(f"   Nejstarší od: {summary['data_coverage']['oldest_data_from']}")
        print(f"   Nejnovější do: {summary['data_coverage']['newest_data_to']}")
    
    print(f"\n💾 Všechna data uložena v: {output_dir}")
    
    return all_results, summary

if __name__ == "__main__":
    main()