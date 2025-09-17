#!/usr/bin/env python3
"""
Detailní test Yahoo Finance API - zkouším všechna dostupná pole
"""

import yfinance as yf
import json
import pprint

def explore_etf_fields(ticker):
    """Prozkoumá všechna dostupná pole pro daný ETF"""
    print(f"\n🔍 Zkoumání všech polí pro {ticker}")
    print("=" * 60)
    
    etf = yf.Ticker(ticker)
    
    # Hlavní info objekt
    info = etf.info
    print(f"📋 Celkem polí v info: {len(info)}")
    
    # Expense ratio alternativy
    expense_fields = [
        'expenseRatio', 'annualReportExpenseRatio', 'totalExpenseRatio', 
        'netExpenseRatio', 'grossExpenseRatio', 'managementFee'
    ]
    
    print("\n💰 Expense Ratio pole:")
    for field in expense_fields:
        value = info.get(field)
        if value is not None:
            print(f"   ✅ {field}: {value}")
            if isinstance(value, float) and value < 1:
                print(f"      → {value * 100:.2f}%")
        else:
            print(f"   ❌ {field}: None")
    
    # Holdings související pole
    holdings_fields = [
        'holdings', 'top10Holdings', 'majorHolders', 'institutionalHolders',
        'equityHoldings', 'bondHoldings', 'sectorWeightings', 'bondRatings',
        'stockHoldings', 'cashHoldings'
    ]
    
    print("\n📈 Holdings pole:")
    for field in holdings_fields:
        value = info.get(field)
        if value is not None:
            print(f"   ✅ {field}: {type(value)} - {str(value)[:100]}...")
        else:
            print(f"   ❌ {field}: None")
    
    # Zkusím alternativní metody
    print("\n🔧 Alternativní metody:")
    
    # Institutional holders
    try:
        institutional = etf.institutional_holders
        if institutional is not None and not institutional.empty:
            print(f"   ✅ institutional_holders: {len(institutional)} řádků")
            print(f"      První záznam: {institutional.iloc[0].to_dict()}")
        else:
            print("   ❌ institutional_holders: prázdné")
    except Exception as e:
        print(f"   ❌ institutional_holders: chyba - {e}")
    
    # Major holders
    try:
        major = etf.major_holders
        if major is not None and not major.empty:
            print(f"   ✅ major_holders: {len(major)} řádků")
            print(f"      Data: {major.to_dict()}")
        else:
            print("   ❌ major_holders: prázdné")
    except Exception as e:
        print(f"   ❌ major_holders: chyba - {e}")
    
    # Quarterly financials
    try:
        financials = etf.quarterly_financials
        if financials is not None and not financials.empty:
            print(f"   ✅ quarterly_financials: {financials.shape}")
        else:
            print("   ❌ quarterly_financials: prázdné")
    except Exception as e:
        print(f"   ❌ quarterly_financials: chyba - {e}")
    
    # Všechna pole s 'expense' nebo 'fee' nebo 'ratio'
    print(f"\n🔎 Pole obsahující 'expense', 'fee', 'ratio':")
    relevant_fields = [k for k in info.keys() if any(word in k.lower() for word in ['expense', 'fee', 'ratio', 'cost'])]
    for field in relevant_fields:
        value = info.get(field)
        print(f"   {field}: {value}")
    
    # Všechna pole s 'hold'
    print(f"\n🔎 Pole obsahující 'hold':")
    hold_fields = [k for k in info.keys() if 'hold' in k.lower()]
    for field in hold_fields:
        value = info.get(field)
        print(f"   {field}: {value}")
    
    return info

def main():
    # Test několika různých ETF typů
    test_etfs = ["SPY", "VTI", "QQQ"]  # Různé typy ETF
    
    all_fields = set()
    
    for ticker in test_etfs:
        info = explore_etf_fields(ticker)
        all_fields.update(info.keys())
        
        # Malá pauza mezi requesty
        import time
        time.sleep(1)
    
    print(f"\n📊 SOUHRN:")
    print(f"Celkem unikátních polí napříč všemi ETF: {len(all_fields)}")
    
    # Uložím všechna pole do souboru
    with open("/Users/tomaskostrhoun/Documents/ETF/yahoo_all_fields.txt", "w") as f:
        for field in sorted(all_fields):
            f.write(f"{field}\n")
    
    print("💾 Seznam všech polí uložen do yahoo_all_fields.txt")

if __name__ == "__main__":
    main()