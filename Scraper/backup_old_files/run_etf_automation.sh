#!/bin/bash
# ETF AUTOMATION MASTER SCRIPT
# Spustí kompletní automatizaci ETF scrapingu a upload

echo "🤖 ETF AUTOMATION MASTER SCRIPT"
echo "================================"

# Kontrola závislostí
echo "📋 Kontroluji závislosti..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 není nainstalován"
    exit 1
fi

if [ ! -f "final_scraper.py" ]; then
    echo "❌ final_scraper.py nenalezen"
    exit 1
fi

if [ ! -f "ISIN.csv" ]; then
    echo "❌ ISIN.csv nenalezen"
    exit 1
fi

echo "✅ Všechny závislosti OK"

# Instalace Python dependencies
echo "📦 Instaluji Python závislosti..."
pip3 install requests beautifulsoup4 pandas googletrans==4.0.0rc1 openpyxl schedule

echo "🚀 Spouštím kompletní automatizaci..."

# Spustí automatizaci
python3 complete_automation.py "$@"

echo "✅ Automatizace dokončena"