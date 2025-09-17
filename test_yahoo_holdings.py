#!/usr/bin/env python3
"""
Test holdings data pomocí yahooquery library
"""

try:
    from yahooquery import Ticker
    print("✅ yahooquery je dostupná")
except ImportError:
    print("❌ yahooquery není nainstalována")
    print("Instaluji yahooquery...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "yahooquery"])
    from yahooquery import Ticker

def test_holdings(ticker):
    """Test holdings dat z yahooquery"""
    print(f"\n📊 Testování holdings pro {ticker}")
    print("-" * 40)
    
    t = Ticker(ticker)
    
    # Fund holdings
    try:
        holdings = t.fund_holding_info
        if holdings and ticker in holdings and 'holdings' in holdings[ticker]:
            holdings_data = holdings[ticker]['holdings']
            print(f"   ✅ fund_holding_info: {len(holdings_data)} holdings")
            # Top 3 holdings
            for i, holding in enumerate(holdings_data[:3]):
                print(f"      {i+1}. {holding.get('holdingName', 'N/A')}: {holding.get('holdingPercent', 0)*100:.2f}%")
        else:
            print("   ❌ fund_holding_info: prázdné nebo neexistuje")
    except Exception as e:
        print(f"   ❌ fund_holding_info: chyba - {e}")
    
    # Sector weightings
    try:
        sectors = t.fund_sector_weightings
        if sectors and ticker in sectors:
            print(f"   ✅ fund_sector_weightings: {len(sectors[ticker])} sektorů")
            # Top 3 sektory
            for sector, weight in list(sectors[ticker].items())[:3]:
                print(f"      {sector}: {weight*100:.2f}%")
        else:
            print("   ❌ fund_sector_weightings: prázdné")
    except Exception as e:
        print(f"   ❌ fund_sector_weightings: chyba - {e}")
    
    # Profile
    try:
        profile = t.fund_profile  
        if profile and ticker in profile:
            print(f"   ✅ fund_profile: dostupný")
            prof = profile[ticker]
            if 'totalNetAssets' in prof:
                print(f"      AUM: ${prof['totalNetAssets']:,.0f}")
            if 'annualReportExpenseRatio' in prof:
                print(f"      Expense Ratio: {prof['annualReportExpenseRatio']*100:.2f}%")
        else:
            print("   ❌ fund_profile: prázdný")
    except Exception as e:
        print(f"   ❌ fund_profile: chyba - {e}")

def main():
    test_etfs = ["SPY", "VTI", "QQQ", "VXUS"]
    
    for ticker in test_etfs:
        test_holdings(ticker)

if __name__ == "__main__":
    main()