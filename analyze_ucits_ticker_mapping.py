#!/usr/bin/env python3
"""
Analýza ticker mappingu v UCITS ETF databázi a vytvoření strategii pro opravu
"""

import os
from supabase import create_client, Client
import json
import pandas as pd
import re

# Supabase konfigurace
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    """Vytvoří Supabase klienta"""
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def analyze_ticker_patterns():
    """Analyzuje vzory tickerů v databázi"""
    print("🔍 ANALÝZA TICKER VZORŮ V UCITS ETF DATABÁZI")
    print("=" * 60)
    
    supabase = get_supabase_client()
    
    # Získáme všechny ETF s tickery
    response = supabase.table('etf_funds').select(
        'isin,name,fund_provider,primary_ticker,exchange_1_ticker,exchange_2_ticker,exchange_3_ticker,exchange_4_ticker,exchange_5_ticker,exchange_1_name,exchange_2_name,exchange_3_name'
    ).execute()
    
    etfs = response.data
    print(f"📊 Celkem ETF v databázi: {len(etfs)}")
    
    # Analýza ticker vzorů
    ticker_patterns = {}
    exchange_analysis = {}
    all_tickers = []
    
    for etf in etfs:
        # Projdeme všechny ticker pole
        for field in ['primary_ticker', 'exchange_1_ticker', 'exchange_2_ticker', 'exchange_3_ticker', 'exchange_4_ticker', 'exchange_5_ticker']:
            ticker = etf.get(field)
            if ticker and ticker.strip():
                ticker = ticker.strip()
                all_tickers.append(ticker)
                
                # Analyzuj vzor tickeru
                if '.' in ticker:
                    # Evropský ticker s příponou
                    base, suffix = ticker.split('.', 1)
                    pattern = f"*.{suffix}"
                else:
                    # Bez přípony
                    pattern = "no_suffix"
                
                if pattern not in ticker_patterns:
                    ticker_patterns[pattern] = []
                ticker_patterns[pattern].append(ticker)
        
        # Analýza burz
        for field in ['exchange_1_name', 'exchange_2_name', 'exchange_3_name']:
            exchange = etf.get(field)
            if exchange and exchange.strip():
                exchange = exchange.strip()
                if exchange not in exchange_analysis:
                    exchange_analysis[exchange] = 0
                exchange_analysis[exchange] += 1
    
    print(f"📈 Celkem unikátních tickerů: {len(set(all_tickers))}")
    
    # Vzory tickerů
    print(f"\n📋 VZORY TICKERŮ:")
    for pattern, tickers in sorted(ticker_patterns.items(), key=lambda x: len(x[1]), reverse=True):
        unique_tickers = len(set(tickers))
        print(f"   {pattern:>12}: {unique_tickers:>4} unikátních tickerů")
        
        # Ukázkové tickery
        samples = list(set(tickers))[:5]
        print(f"                  Ukázky: {', '.join(samples)}")
    
    # Analýza burz
    print(f"\n🏢 TOP BURZY:")
    for exchange, count in sorted(exchange_analysis.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"   {exchange[:30]:30}: {count:>4}")
    
    return {
        'ticker_patterns': ticker_patterns,
        'exchange_analysis': exchange_analysis,
        'total_etfs': len(etfs),
        'total_unique_tickers': len(set(all_tickers))
    }

def find_popular_etfs_with_tickers():
    """Najde populární ETF a jejich tickery pro testování"""
    print(f"\n🎯 POPULÁRNÍ UCITS ETF A JEJICH TICKERY")
    print("=" * 50)
    
    supabase = get_supabase_client()
    
    # Známé populární UCITS ETF podle ISIN
    popular_isins = [
        'IE00BK5BQT80',  # Vanguard FTSE All-World
        'IE00B4L5Y983',  # iShares Core MSCI World
        'IE00B5BMR087',  # iShares Core S&P 500
        'IE00B3XXRP09',  # Vanguard S&P 500
        'IE00BK5BR626',  # Vanguard FTSE Emerging Markets
        'IE00BFY0GT14',  # SPDR MSCI World
        'IE00B0M62Q58',  # iShares MSCI World
        'IE00BKM4GZ66',  # iShares Core MSCI Emerging Markets
        'IE00B53SZB19',  # iShares NASDAQ 100
        'IE00BGHQ1289',  # Invesco NASDAQ-100 Swap
        'LU0274208692',  # Xtrackers MSCI World
        'LU0392494562',  # Xtrackers MSCI Emerging Markets
        'IE00B4L5YX21',  # iShares Core EURO STOXX 50
        'IE0008471009',  # iShares EURO STOXX 50
        'FR0010315770',  # Amundi MSCI World
        'LU1681043599',  # Amundi Prime Global
    ]
    
    popular_etfs = []
    
    for isin in popular_isins:
        response = supabase.table('etf_funds').select(
            'isin,name,fund_provider,primary_ticker,exchange_1_ticker,exchange_2_ticker,exchange_3_ticker,exchange_1_name,exchange_2_name,exchange_3_name'
        ).eq('isin', isin).execute()
        
        if response.data:
            etf = response.data[0]
            
            # Sesbírej všechny tickery
            tickers = []
            exchanges = []
            
            for i in range(1, 4):
                ticker = etf.get(f'exchange_{i}_ticker')
                exchange = etf.get(f'exchange_{i}_name')
                if ticker and ticker.strip():
                    tickers.append(ticker.strip())
                    exchanges.append(exchange or 'Unknown')
            
            if etf.get('primary_ticker'):
                tickers.insert(0, etf['primary_ticker'].strip())
                exchanges.insert(0, 'Primary')
            
            popular_etfs.append({
                'isin': isin,
                'name': etf['name'],
                'provider': etf['fund_provider'],
                'tickers': tickers,
                'exchanges': exchanges
            })
            
            print(f"\n📊 {etf['name'][:40]:40}")
            print(f"    ISIN: {isin}")
            print(f"    Provider: {etf['fund_provider']}")
            print(f"    Tickery:")
            for ticker, exchange in zip(tickers, exchanges):
                print(f"      {ticker:>10} | {exchange}")
        else:
            print(f"❌ Nenalezen v databázi: {isin}")
    
    return popular_etfs

def create_ticker_correction_strategy():
    """Vytvoří strategii pro opravu tickerů"""
    print(f"\n🔧 STRATEGIE OPRAVY TICKERŮ")
    print("=" * 40)
    
    # Známé mapping pravidla pro Yahoo Finance
    exchange_mappings = {
        'Xetra': '.DE',
        'London Stock Exchange': '.L',
        'LSE': '.L', 
        'Borsa Italiana': '.MI',
        'Milan': '.MI',
        'Euronext Paris': '.PA',
        'Paris': '.PA',
        'Euronext Amsterdam': '.AS',
        'Amsterdam': '.AS',
        'SIX Swiss Exchange': '.SW',
        'Swiss': '.SW',
        'Vienna Stock Exchange': '.VI',
        'Nasdaq Stockholm': '.ST',
        'Oslo Bors': '.OL'
    }
    
    # Priorita burz pro Yahoo Finance (podle testů)
    exchange_priority = [
        '.L',   # LSE - nejvyšší úspěšnost
        '.DE',  # Xetra - střední úspěšnost
        '.MI',  # Milan - nižší úspěšnost
        '.PA',  # Paris
        '.AS',  # Amsterdam
        '.SW',  # Swiss
        '.VI',  # Vienna
        '.ST',  # Stockholm
        '.OL'   # Oslo
    ]
    
    print("🎯 EXCHANGE MAPPING:")
    for exchange, suffix in exchange_mappings.items():
        print(f"   {exchange:25} → {suffix}")
    
    print(f"\n📈 PRIORITA PRO YAHOO FINANCE:")
    for i, suffix in enumerate(exchange_priority, 1):
        print(f"   {i}. {suffix:4} (podle testované úspěšnosti)")
    
    return {
        'exchange_mappings': exchange_mappings,
        'exchange_priority': exchange_priority,
        'correction_rules': {
            'prefer_lse': True,
            'fallback_to_xetra': True,
            'test_multiple_variants': True,
            'clean_ticker_format': True
        }
    }

def create_ticker_correction_script():
    """Vytvoří script pro automatickou opravu tickerů"""
    print(f"\n⚙️  GENEROVÁNÍ CORRECTION SCRIPTU")
    print("=" * 40)
    
    script_content = '''#!/usr/bin/env python3
"""
Automatická oprava tickerů pro Yahoo Finance kompatibilitu
Generováno z analýzy UCITS ETF databáze
"""

import yfinance as yf
import time
from supabase import create_client

# Supabase konfigurace
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_ticker_variants(base_ticker, exchanges):
    """Generuje varianty tickerů pro testování"""
    variants = []
    
    # Exchange mappings
    exchange_suffixes = {
        'Xetra': '.DE',
        'London Stock Exchange': '.L',
        'LSE': '.L',
        'Borsa Italiana': '.MI', 
        'Euronext Paris': '.PA',
        'Euronext Amsterdam': '.AS'
    }
    
    # Přidej ticker s příponou podle burzy
    for exchange in exchanges:
        suffix = exchange_suffixes.get(exchange)
        if suffix:
            variants.append(f"{base_ticker}{suffix}")
    
    # Přidej bez přípony
    variants.append(base_ticker)
    
    # Priorita: LSE > Xetra > ostatní
    priority_order = ['.L', '.DE', '.MI', '.PA', '.AS']
    sorted_variants = []
    
    for priority in priority_order:
        for variant in variants:
            if variant.endswith(priority) and variant not in sorted_variants:
                sorted_variants.append(variant)
    
    # Přidej zbývající
    for variant in variants:
        if variant not in sorted_variants:
            sorted_variants.append(variant)
    
    return sorted_variants

def test_ticker_with_yahoo(ticker):
    """Testuje ticker s Yahoo Finance"""
    try:
        etf = yf.Ticker(ticker)
        hist = etf.history(period="5d")
        
        if len(hist) > 0:
            info = etf.info
            return {
                'working': True,
                'days': len(hist),
                'price': info.get('regularMarketPrice'),
                'currency': info.get('currency'),
                'exchange': info.get('exchange')
            }
        else:
            return {'working': False, 'error': 'No historical data'}
            
    except Exception as e:
        return {'working': False, 'error': str(e)}

def find_working_ticker_for_etf(isin, name, tickers, exchanges):
    """Najde funkční ticker pro ETF"""
    print(f"🔍 Testování {name[:30]:30} ({isin})")
    
    # Generuj varianty
    if tickers:
        base_ticker = tickers[0]  # První ticker jako základ
        variants = generate_ticker_variants(base_ticker, exchanges)
        
        # Přidej původní tickery
        for ticker in tickers:
            if ticker not in variants:
                variants.append(ticker)
    else:
        print(f"   ❌ Žádné tickery k dispozici")
        return None
    
    # Testuj varianty
    for ticker in variants[:5]:  # Omez na 5 variant
        print(f"   🧪 {ticker:>10}", end="")
        
        result = test_ticker_with_yahoo(ticker)
        
        if result['working']:
            print(f" ✅ FUNGUJE | ${result['price']} | {result['currency']}")
            return {
                'working_ticker': ticker,
                'original_tickers': tickers,
                'test_result': result
            }
        else:
            print(f" ❌ {result['error'][:20]}")
        
        time.sleep(1)  # Rate limiting
    
    print(f"   ❌ Žádný funkční ticker nenalezen")
    return None

def main():
    print("🚀 AUTOMATIC TICKER CORRECTION FOR UCITS ETF")
    print("=" * 60)
    
    # TODO: Implementace hlavní logiky
    pass

if __name__ == "__main__":
    main()
'''
    
    script_file = "/Users/tomaskostrhoun/Documents/ETF/fix_ucits_tickers.py"
    with open(script_file, 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    print(f"💾 Correction script vytvořen: {script_file}")
    
    return script_file

def main():
    print("🚀 ANALÝZA UCITS ETF TICKER MAPPINGU")
    print("=" * 60)
    
    # 1. Analýza vzorů tickerů
    analysis = analyze_ticker_patterns()
    
    # 2. Populární ETF a jejich tickery
    popular_etfs = find_popular_etfs_with_tickers()
    
    # 3. Strategie opravy
    strategy = create_ticker_correction_strategy()
    
    # 4. Generování correction scriptu
    script_file = create_ticker_correction_script()
    
    # 5. Souhrnný report
    print(f"\n📊 SOUHRNNÝ REPORT")
    print("=" * 30)
    
    print(f"📈 Databáze:")
    print(f"   Celkem ETF: {analysis['total_etfs']:,}")
    print(f"   Unikátní tickery: {analysis['total_unique_tickers']:,}")
    
    no_suffix_count = len(analysis['ticker_patterns'].get('no_suffix', []))
    with_suffix_count = analysis['total_unique_tickers'] - no_suffix_count
    
    print(f"   Bez přípony: {no_suffix_count:,} ({no_suffix_count/analysis['total_unique_tickers']*100:.1f}%)")
    print(f"   S příponou: {with_suffix_count:,} ({with_suffix_count/analysis['total_unique_tickers']*100:.1f}%)")
    
    print(f"\n🎯 Populární ETF s tickery: {len(popular_etfs)}")
    
    # Analýza ticker suffixů
    suffix_analysis = {}
    for pattern, tickers in analysis['ticker_patterns'].items():
        if pattern.startswith('*.'):
            suffix = pattern[1:]
            suffix_analysis[suffix] = len(set(tickers))
    
    print(f"\n📋 TOP TICKER PŘÍPONY:")
    for suffix, count in sorted(suffix_analysis.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"   {suffix:>5}: {count:>4} tickerů")
    
    # Uložení analýzy
    output = {
        'timestamp': pd.Timestamp.now().isoformat(),
        'database_analysis': analysis,
        'popular_etfs': popular_etfs,
        'correction_strategy': strategy,
        'recommendations': {
            'priority_1': 'Opravit tickery na .L (LSE) format',
            'priority_2': 'Fallback na .DE (Xetra) format', 
            'priority_3': 'Testovat multiple variants pro každý ETF',
            'implementation': 'Použít generated correction script'
        }
    }
    
    output_file = "/Users/tomaskostrhoun/Documents/ETF/ucits_ticker_analysis.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, default=str, ensure_ascii=False)
    
    print(f"\n💾 Analýza uložena: {output_file}")
    print(f"⚙️  Correction script: {script_file}")
    
    print(f"\n🚀 DALŠÍ KROKY:")
    print(f"1. Spustit ticker correction script")
    print(f"2. Testovat top 50 populárních ETF")
    print(f"3. Aktualizovat databázi s funkčními tickery")
    print(f"4. Znovu spustit historical data download")
    
    return output

if __name__ == "__main__":
    main()