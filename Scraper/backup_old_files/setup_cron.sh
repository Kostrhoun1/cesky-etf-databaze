#!/bin/bash
# NASTAVENÍ CRON JOB PRO ETF AUTOMATIZACI

echo "⏰ NASTAVENÍ CRON JOB PRO ETF"
echo "============================"

# Zjisti aktuální cestu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "📁 Scraper složka: $SCRIPT_DIR"

# Připrav cron job s caffeinate
CRON_JOB="0 2 * * * cd $SCRIPT_DIR && python3 cron_with_caffeinate.py"

echo "📋 Cron job který se přidá:"
echo "$CRON_JOB"
echo ""

# Zkontroluj existující cron
echo "🔍 Kontroluji existující cron job..."
if crontab -l 2>/dev/null | grep -q "complete_automation.py"; then
    echo "⚠️  ETF cron job už existuje!"
    echo "📋 Současné cron jobs:"
    crontab -l 2>/dev/null | grep -n "complete_automation.py" || echo "Žádné nenalezeny"
    echo ""
    read -p "Chcete ho přepsat? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Ukončuji bez změn"
        exit 1
    fi
    
    # Odstraň starý cron job
    crontab -l 2>/dev/null | grep -v "complete_automation.py" | crontab -
    echo "🗑️  Starý cron job odstraněn"
fi

# Přidej nový cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Cron job přidán úspěšně!"
echo ""
echo "📅 PLÁN:"
echo "  - Každý den v 02:00"
echo "  - Spustí ETF scraping"
echo "  - Připraví CSV pro upload"
echo "  - Log: $SCRIPT_DIR/cron_etf.log"
echo ""
echo "📋 POUŽITÍ:"
echo "  - Každé ráno zkontrolujte: ready_for_upload/"
echo "  - Nahrajte CSV na: http://localhost:8083/admin?password=Omitac116"
echo ""
echo "🔍 MONITORING:"
echo "  tail -f $SCRIPT_DIR/cron_etf.log"
echo ""
echo "❌ ODEBRÁNÍ CRON JOB:"
echo "  crontab -e (a smažte řádek s complete_automation.py)"