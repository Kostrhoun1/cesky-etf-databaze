#!/usr/bin/env python3
"""
Kompletní systém pro opravu UCITS ETF tickerů pro Yahoo Finance
Testuje různé varianty tickerů a najde funkční
"""

import yfinance as yf
import time
from supabase import create_client
import json
import pandas as pd
from datetime import datetime

# Supabase konfigurace
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_ticker_variants(base_ticker, exchanges):
    """Generuje varianty tickerů pro testování"""
    
    # Exchange mapping na Yahoo Finance přípony
    exchange_mappings = {
        'London Stock Exchange': '.L',
        'LSE': '.L',
        'XETRA': '.DE',
        'Xetra': '.DE',
        'gettex': '.DE',  # Německá burza, často funguje s .DE
        'Borsa Italiana': '.MI',
        'Milan': '.MI',
        'Euronext Paris': '.PA',
        'Paris': '.PA',
        'Euronext Amsterdam': '.AS',
        'Amsterdam': '.AS',
        'SIX Swiss Exchange': '.SW',
        'Swiss': '.SW',
        'Stuttgart Stock Exchange': '.DE',  # Také německá
        'Frankfurt Stock Exchange': '.DE'
    }
    
    variants = set()
    
    # Přidej varianty podle burz
    for exchange in exchanges:
        if exchange and exchange.strip():
            suffix = exchange_mappings.get(exchange.strip())
            if suffix:
                variants.add(f"{base_ticker}{suffix}")
    
    # Přidej bez přípony (může fungovat pro některé)
    variants.add(base_ticker)
    
    # Přidej standardní evropské přípony jako fallback
    standard_suffixes = ['.L', '.DE', '.MI', '.PA', '.AS']
    for suffix in standard_suffixes:
        variants.add(f"{base_ticker}{suffix}")
    
    # Priorita podle testované úspěšnosti
    priority_order = ['.L', '.DE', '.MI', '.PA', '.AS', '.SW']
    sorted_variants = []
    
    # Nejdřív podle priority
    for priority in priority_order:
        for variant in variants:
            if variant.endswith(priority) and variant not in sorted_variants:
                sorted_variants.append(variant)
    
    # Pak bez přípony
    if base_ticker not in sorted_variants:
        sorted_variants.append(base_ticker)
    
    # Pak zbývající
    for variant in variants:
        if variant not in sorted_variants:
            sorted_variants.append(variant)
    
    return sorted_variants

def test_ticker_with_yahoo(ticker, quick_test=True):
    """Testuje ticker s Yahoo Finance"""
    try:
        etf = yf.Ticker(ticker)
        
        # Rychlý test nebo detailní
        period = "5d" if quick_test else "1y"
        hist = etf.history(period=period)
        
        if len(hist) > 0:
            info = etf.info
            
            return {
                'working': True,
                'days': len(hist),
                'start_date': hist.index[0].strftime('%Y-%m-%d'),
                'end_date': hist.index[-1].strftime('%Y-%m-%d'),
                'current_price': info.get('regularMarketPrice'),
                'currency': info.get('currency'),
                'exchange': info.get('exchange'),
                'volume': info.get('volume'),
                'long_name': info.get('longName'),
                'short_name': info.get('shortName')
            }
        else:
            return {'working': False, 'error': 'No historical data'}
            
    except Exception as e:
        return {'working': False, 'error': str(e)[:100]}

def find_working_ticker_for_etf(etf_data, max_attempts=6):
    """Najde funkční ticker pro ETF"""
    
    isin = etf_data['isin']
    name = etf_data['name'][:40]
    
    # Sesbírej všechny dostupné tickery a burzy
    tickers = []
    exchanges = []
    
    if etf_data.get('primary_ticker'):
        tickers.append(etf_data['primary_ticker'].strip())
        exchanges.append('Primary')
    
    for i in range(1, 6):
        ticker = etf_data.get(f'exchange_{i}_ticker')
        exchange = etf_data.get(f'exchange_{i}_name')
        if ticker and ticker.strip():
            tickers.append(ticker.strip())
            exchanges.append(exchange or 'Unknown')
    
    if not tickers:
        return None
    
    print(f"🔍 {name:40} ({isin})")
    
    # Vygeneruj varianty pro testování
    base_ticker = tickers[0]  # Použij první ticker jako základ
    variants = generate_ticker_variants(base_ticker, exchanges)
    
    # Testuj varianty (omez počet pokusů)
    for i, variant in enumerate(variants[:max_attempts]):
        print(f"   🧪 {variant:>12}", end="", flush=True)
        
        result = test_ticker_with_yahoo(variant)
        
        if result['working']:
            print(f" ✅ FUNGUJE | ${result['current_price']} | {result['currency']} | {result['exchange']}")
            return {
                'isin': isin,
                'name': etf_data['name'],
                'original_tickers': tickers,
                'original_exchanges': exchanges,
                'working_ticker': variant,
                'yahoo_data': result,
                'test_timestamp': datetime.now().isoformat()
            }
        else:
            error_short = result['error'][:20] if result.get('error') else 'Failed'
            print(f" ❌ {error_short}")
        
        # Rate limiting
        time.sleep(1.5)
    
    print(f"   ❌ Žádný funkční ticker nenalezen z {len(variants)} variant")
    return None

def process_etf_batch(limit=50):
    """Zpracuje batch ETF a najde funkční tickery"""
    print(f"🚀 ZPRACOVÁNÍ BATCH UCITS ETF ({limit} ETF)")
    print("=" * 80)
    
    supabase = get_supabase_client()
    
    # Získej ETF podle velikosti fondu
    response = supabase.table('etf_funds').select(
        'isin,name,fund_provider,fund_size_numeric,primary_ticker,exchange_1_ticker,exchange_2_ticker,exchange_3_ticker,exchange_1_name,exchange_2_name,exchange_3_name'
    ).not_.is_('fund_size_numeric', 'null').order('fund_size_numeric', desc=True).limit(limit).execute()
    
    etfs = response.data
    print(f"📊 Načteno {len(etfs)} ETF pro testování")
    
    working_tickers = []
    failed_etfs = []
    
    for i, etf in enumerate(etfs, 1):
        print(f"\n[{i:3d}/{len(etfs)}]", end=" ")
        
        result = find_working_ticker_for_etf(etf)
        
        if result:
            working_tickers.append(result)
        else:
            failed_etfs.append({
                'isin': etf['isin'],
                'name': etf['name'],
                'provider': etf['fund_provider']
            })
    
    return working_tickers, failed_etfs

def save_results(working_tickers, failed_etfs):
    """Uloží výsledky testování"""
    
    # Statistiky
    total_tested = len(working_tickers) + len(failed_etfs)
    success_rate = len(working_tickers) / total_tested * 100 if total_tested > 0 else 0
    
    # Analýza úspěšných tickerů
    suffix_stats = {}
    exchange_stats = {}
    currency_stats = {}
    
    for ticker_data in working_tickers:
        working_ticker = ticker_data['working_ticker']
        yahoo_data = ticker_data['yahoo_data']
        
        # Analýza přípony
        if '.' in working_ticker:
            suffix = '.' + working_ticker.split('.', 1)[1]
        else:
            suffix = 'no_suffix'
        
        suffix_stats[suffix] = suffix_stats.get(suffix, 0) + 1
        
        # Analýza burzy a měny
        exchange = yahoo_data.get('exchange', 'Unknown')
        currency = yahoo_data.get('currency', 'Unknown')
        
        exchange_stats[exchange] = exchange_stats.get(exchange, 0) + 1
        currency_stats[currency] = currency_stats.get(currency, 0) + 1
    
    # Hlavní výsledky
    results = {
        'timestamp': datetime.now().isoformat(),
        'summary': {
            'total_tested': total_tested,
            'successful': len(working_tickers),
            'failed': len(failed_etfs),
            'success_rate_percent': success_rate
        },
        'working_tickers': working_tickers,
        'failed_etfs': failed_etfs,
        'analysis': {
            'suffix_distribution': dict(sorted(suffix_stats.items(), key=lambda x: x[1], reverse=True)),
            'exchange_distribution': dict(sorted(exchange_stats.items(), key=lambda x: x[1], reverse=True)),
            'currency_distribution': dict(sorted(currency_stats.items(), key=lambda x: x[1], reverse=True))
        }
    }
    
    # Uložení JSON
    json_file = "/Users/tomaskostrhoun/Documents/ETF/working_ucits_tickers.json"
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, default=str, ensure_ascii=False)
    
    # CSV pro lidskou čitelnost
    csv_data = []
    for ticker_data in working_tickers:
        yahoo_data = ticker_data['yahoo_data']
        csv_data.append({
            'isin': ticker_data['isin'],
            'name': ticker_data['name'][:50],
            'original_ticker': ticker_data['original_tickers'][0] if ticker_data['original_tickers'] else '',
            'working_ticker': ticker_data['working_ticker'],
            'current_price': yahoo_data.get('current_price'),
            'currency': yahoo_data.get('currency'),
            'exchange': yahoo_data.get('exchange'),
            'days_available': yahoo_data.get('days'),
            'long_name': yahoo_data.get('long_name', '')[:50]
        })
    
    csv_file = "/Users/tomaskostrhoun/Documents/ETF/working_ucits_tickers.csv"
    pd.DataFrame(csv_data).to_csv(csv_file, index=False)
    
    print(f"\n💾 Výsledky uloženy:")
    print(f"   📄 JSON: {json_file}")
    print(f"   📄 CSV: {csv_file}")
    
    return results

def print_summary_stats(results):
    """Vytiskne souhrnné statistiky"""
    summary = results['summary']
    analysis = results['analysis']
    
    print(f"\n📊 SOUHRNNÉ STATISTIKY")
    print("=" * 40)
    print(f"🎯 Testováno ETF: {summary['total_tested']}")
    print(f"✅ Úspěšných: {summary['successful']}")
    print(f"❌ Neúspěšných: {summary['failed']}")
    print(f"📈 Úspěšnost: {summary['success_rate_percent']:.1f}%")
    
    print(f"\n📋 NEJÚSPĚŠNĚJŠÍ PŘÍPONY:")
    for suffix, count in list(analysis['suffix_distribution'].items())[:5]:
        percentage = count / summary['successful'] * 100
        print(f"   {suffix:>6}: {count:>3} ETF ({percentage:>5.1f}%)")
    
    print(f"\n🏢 NEJÚSPĚŠNĚJŠÍ BURZY:")
    for exchange, count in list(analysis['exchange_distribution'].items())[:5]:
        percentage = count / summary['successful'] * 100
        print(f"   {exchange[:20]:20}: {count:>3} ETF ({percentage:>5.1f}%)")
    
    print(f"\n💱 MĚNY:")
    for currency, count in list(analysis['currency_distribution'].items())[:5]:
        percentage = count / summary['successful'] * 100
        print(f"   {currency:>4}: {count:>3} ETF ({percentage:>5.1f}%)")

def main():
    print("🚀 UCITS ETF TICKER CORRECTION SYSTEM")
    print("=" * 60)
    
    # Konfigurace
    batch_size = 100  # Kolik ETF testovat
    
    print(f"⚙️  Konfigurace:")
    print(f"   Batch size: {batch_size} ETF")
    print(f"   Rate limit: 1.5s mezi testy")
    print(f"   Max variants per ETF: 6")
    print(f"   Priorita: .L > .DE > .MI > .PA > .AS")
    
    # Zpracování
    working_tickers, failed_etfs = process_etf_batch(batch_size)
    
    # Uložení výsledků
    results = save_results(working_tickers, failed_etfs)
    
    # Statistiky
    print_summary_stats(results)
    
    # Doporučení
    print(f"\n💡 DOPORUČENÍ:")
    if results['summary']['success_rate_percent'] >= 60:
        print(f"✅ Úspěšnost {results['summary']['success_rate_percent']:.1f}% je dobrá")
        print(f"✅ Pokračujte s historical data download")
        print(f"✅ Použijte working_tickers jako vstup")
    else:
        print(f"⚠️  Úspěšnost {results['summary']['success_rate_percent']:.1f}% je nízká")
        print(f"⚠️  Zvažte úpravu strategy nebo focus na top ETF")
    
    print(f"\n🎯 DALŠÍ KROKY:")
    print(f"1. Zkontrolujte working_ucits_tickers.csv")
    print(f"2. Spusťte historical data download s funkčními tickery")
    print(f"3. Aktualizujte databázi s yahoo_ticker polem")
    
    return results

if __name__ == "__main__":
    main()