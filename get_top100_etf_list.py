#!/usr/bin/env python3
"""
Script pro získání top 100 ETF z naší databáze podle velikosti fondu
"""

import os
from supabase import create_client, Client
import json
import pandas as pd

# Supabase konfigurace
SUPABASE_URL = "https://nbhwnatadyubiuadfakx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY"

def get_supabase_client():
    """Vytvoří Supabase klienta"""
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def get_top_etfs_by_size():
    """Získá top ETF podle velikosti fondu"""
    print("🔍 Získávání top 100 ETF podle velikosti fondu...")
    
    supabase = get_supabase_client()
    
    # Získáme ETF s největším AUM a s tickery
    response = supabase.table('etf_funds').select(
        'isin,name,fund_provider,fund_size_numeric,primary_ticker,exchange_1_ticker,exchange_2_ticker,exchange_3_ticker,category,fund_currency,ter_numeric'
    ).not_.is_('fund_size_numeric', 'null').order('fund_size_numeric', desc=True).limit(200).execute()
    
    etfs = response.data
    print(f"📊 Získáno {len(etfs)} ETF s údaji o velikosti")
    
    # Filtrujeme ETF s tickery
    etfs_with_tickers = []
    for etf in etfs:
        tickers = []
        
        # Zkusíme najít ticker v různých polích
        if etf.get('primary_ticker'):
            tickers.append(etf['primary_ticker'])
        if etf.get('exchange_1_ticker'):
            tickers.append(etf['exchange_1_ticker'])
        if etf.get('exchange_2_ticker'):
            tickers.append(etf['exchange_2_ticker'])
        if etf.get('exchange_3_ticker'):
            tickers.append(etf['exchange_3_ticker'])
        
        if tickers:
            etf['available_tickers'] = tickers
            etfs_with_tickers.append(etf)
    
    print(f"🎯 ETF s dostupnými tickery: {len(etfs_with_tickers)}")
    
    # Vezmeme top 100
    top_100 = etfs_with_tickers[:100]
    
    return top_100

def prepare_yahoo_tickers(etfs):
    """Připraví seznam tickerů pro Yahoo Finance"""
    print("\n🔧 Příprava tickerů pro Yahoo Finance...")
    
    yahoo_ready_etfs = []
    
    for etf in etfs:
        best_ticker = None
        
        # Priorita tickerů:
        # 1. US tickery (bez přípony)
        # 2. LSE (.L)
        # 3. Xetra (.DE)
        # 4. Ostatní evropské
        
        for ticker in etf['available_tickers']:
            if not ticker:
                continue
                
            ticker = ticker.strip()
            
            # US tickery (bez tečky)
            if '.' not in ticker and len(ticker) <= 5:
                best_ticker = ticker
                break
            # LSE tickery
            elif ticker.endswith('.L'):
                best_ticker = ticker
                if not best_ticker or not best_ticker.endswith('.L'):
                    continue
            # Xetra tickery
            elif ticker.endswith('.DE'):
                if not best_ticker:
                    best_ticker = ticker
            # Ostatní evropské (.MI, .PA, atd.)
            elif '.' in ticker:
                if not best_ticker:
                    best_ticker = ticker
        
        if best_ticker:
            etf['yahoo_ticker'] = best_ticker
            yahoo_ready_etfs.append(etf)
            
            fund_size_billions = (etf['fund_size_numeric'] or 0) / 1_000_000_000
            print(f"✅ {best_ticker:>8} | {etf['name'][:40]:40} | ${fund_size_billions:6.1f}B")
        else:
            print(f"❌ No ticker | {etf['name'][:40]:40}")
    
    print(f"\n🎯 Připraveno {len(yahoo_ready_etfs)} ETF pro testování")
    return yahoo_ready_etfs

def add_manual_popular_etfs(etfs):
    """Přidá manuálně populární ETF které možná nejsou v top 100 podle AUM"""
    
    # Populární ETF pro Evropské investory
    popular_etfs = [
        {'isin': 'IE00BK5BQT80', 'yahoo_ticker': 'VWCE.DE', 'name': 'Vanguard FTSE All-World', 'manual': True},
        {'isin': 'IE00B4L5Y983', 'yahoo_ticker': 'IWDA.L', 'name': 'iShares Core MSCI World', 'manual': True},
        {'isin': 'IE00B5BMR087', 'yahoo_ticker': 'CSPX.L', 'name': 'iShares Core S&P 500', 'manual': True},
        {'isin': 'IE00BK5BR626', 'yahoo_ticker': 'VFEM.DE', 'name': 'Vanguard FTSE Emerging Markets', 'manual': True},
        {'isin': 'IE00B3XXRP09', 'yahoo_ticker': 'VUAA.L', 'name': 'Vanguard S&P 500', 'manual': True},
    ]
    
    # Zkontrolujeme, které už nejsou v seznamu
    existing_isins = {etf.get('isin') for etf in etfs}
    
    added_count = 0
    for popular_etf in popular_etfs:
        if popular_etf['isin'] not in existing_isins:
            etfs.append(popular_etf)
            added_count += 1
            print(f"➕ Přidán populární ETF: {popular_etf['yahoo_ticker']} - {popular_etf['name']}")
    
    if added_count > 0:
        print(f"\n✅ Přidáno {added_count} populárních ETF")
    
    return etfs

def save_etf_list(etfs, filename):
    """Uloží seznam ETF do souboru"""
    
    # JSON pro programové použití
    json_filename = filename.replace('.csv', '.json')
    with open(json_filename, 'w', encoding='utf-8') as f:
        json.dump(etfs, f, indent=2, ensure_ascii=False)
    
    # CSV pro lidskou čitelnost
    df_data = []
    for etf in etfs:
        fund_size_billions = (etf.get('fund_size_numeric', 0) or 0) / 1_000_000_000
        df_data.append({
            'isin': etf.get('isin', ''),
            'yahoo_ticker': etf.get('yahoo_ticker', ''),
            'name': etf.get('name', ''),
            'fund_provider': etf.get('fund_provider', ''),
            'category': etf.get('category', ''),
            'fund_size_billions': fund_size_billions,
            'ter_percent': etf.get('ter_numeric', 0) * 100 if etf.get('ter_numeric') else 0,
            'currency': etf.get('fund_currency', ''),
            'manual_add': etf.get('manual', False)
        })
    
    df = pd.DataFrame(df_data)
    df = df.sort_values('fund_size_billions', ascending=False)
    df.to_csv(filename, index=False)
    
    print(f"\n💾 Seznam uložen:")
    print(f"   📄 CSV: {filename}")
    print(f"   📄 JSON: {json_filename}")
    
    return df

def main():
    print("🚀 PŘÍPRAVA TOP 100 ETF PRO YAHOO FINANCE TEST")
    print("=" * 60)
    
    # 1. Získáme top ETF podle velikosti
    top_etfs = get_top_etfs_by_size()
    
    # 2. Připravíme tickery pro Yahoo Finance
    yahoo_ready_etfs = prepare_yahoo_tickers(top_etfs)
    
    # 3. Přidáme manuálně populární ETF
    final_etf_list = add_manual_popular_etfs(yahoo_ready_etfs)
    
    # 4. Uložíme seznam
    filename = "/Users/tomaskostrhoun/Documents/ETF/top100_etf_for_yahoo_test.csv"
    df = save_etf_list(final_etf_list, filename)
    
    # 5. Statistiky
    print(f"\n📊 STATISTIKY:")
    print(f"   Celkem ETF: {len(final_etf_list)}")
    print(f"   S velikostí fondu: {len([e for e in final_etf_list if e.get('fund_size_numeric')])}")
    print(f"   Průměrná velikost: ${df['fund_size_billions'].mean():.1f}B")
    print(f"   Největší fond: ${df['fund_size_billions'].max():.1f}B")
    
    # Rozdělení podle měn
    currencies = df['currency'].value_counts()
    print(f"\n💱 Rozdělení podle měn:")
    for currency, count in currencies.head(5).items():
        print(f"   {currency}: {count}")
    
    # Rozdělení podle providů
    providers = df['fund_provider'].value_counts()
    print(f"\n🏢 Top 5 poskytovatelů:")
    for provider, count in providers.head(5).items():
        print(f"   {provider}: {count}")
    
    print(f"\n✅ Připraveno {len(final_etf_list)} ETF pro Yahoo Finance test")
    return final_etf_list

if __name__ == "__main__":
    main()