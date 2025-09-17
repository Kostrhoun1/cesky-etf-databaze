#!/bin/bash
# ETF MAC DAEMON STARTER - Spustí ETF scheduler jako daemon na macOS

echo "🤖 ETF MAC SCHEDULER DAEMON STARTER"
echo "===================================="

# Kontrola macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ Tento skript je pouze pro macOS"
    exit 1
fi

# Kontrola Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 není nainstalován"
    exit 1
fi

# Kontrola souborů
if [ ! -f "mac_scheduler_daemon.py" ]; then
    echo "❌ mac_scheduler_daemon.py nenalezen"
    exit 1
fi

if [ ! -f "complete_automation.py" ]; then
    echo "❌ complete_automation.py nenalezen"
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

echo "✅ Všechny soubory OK"

# Instalace závislostí
echo "📦 Instaluji Python závislosti..."
pip3 install schedule requests beautifulsoup4 pandas googletrans==4.0.0rc1 openpyxl

# Kontrola běžícího procesu
EXISTING_PID=$(pgrep -f "mac_scheduler_daemon.py" | head -1)
if [ ! -z "$EXISTING_PID" ]; then
    echo "⚠️  ETF scheduler daemon už běží (PID: $EXISTING_PID)"
    read -p "Chcete ho ukončit a spustit nový? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🛑 Ukončuji existující daemon..."
        kill $EXISTING_PID
        sleep 2
    else
        echo "❌ Ukončuji - daemon už běží"
        exit 1
    fi
fi

# Spustí daemon
if [ "$1" == "--test" ]; then
    echo "🧪 Spouštím test mode..."
    python3 mac_scheduler_daemon.py --test
elif [ "$1" == "--foreground" ]; then
    echo "🖥️  Spouštím ve foreground mode..."
    python3 mac_scheduler_daemon.py
else
    echo "🌙 Spouštím ETF scheduler daemon na pozadí..."
    nohup python3 mac_scheduler_daemon.py > mac_daemon.out 2>&1 &
    DAEMON_PID=$!
    echo "✅ ETF Scheduler daemon spuštěn (PID: $DAEMON_PID)"
    echo "📄 Logy: mac_etf_scheduler.log"
    echo "📄 Output: mac_daemon.out"
    echo ""
    echo "Plánovaná aktualizace: každý den v 02:00"
    echo ""
    echo "Pro ukončení daemon použijte:"
    echo "kill $DAEMON_PID"
    echo ""
    echo "Pro monitoring logů:"
    echo "tail -f mac_etf_scheduler.log"
fi