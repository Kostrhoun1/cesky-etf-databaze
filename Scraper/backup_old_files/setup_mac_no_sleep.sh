#!/bin/bash
# NASTAVENÍ MACU PRO ETF AUTOMATIZACI
# Nastaví Mac aby se neuspával v noci

echo "🖥️  KONFIGURACE MAC PRO ETF AUTOMATIZACI"
echo "========================================"

echo "📋 Aktuální nastavení uspání:"
pmset -g | grep -E "(sleep|displaysleep|disksleep)"
echo ""

echo "⚙️  DOPORUČENÉ NASTAVENÍ PRO ETF:"
echo "1. Displej se může uspat (šetří energii)"
echo "2. Systém se NIKDY neuspí (umožní cron job)"
echo "3. Disk se může uspat po dlouhé době"
echo ""

read -p "Chcete aplikovat toto nastavení? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔧 Aplikuji nastavení..."
    
    # Nastavení pro AC power (napájení ze sítě)
    sudo pmset -c sleep 0           # Nikdy neuspat systém na AC
    sudo pmset -c displaysleep 10   # Displej po 10 minutách
    sudo pmset -c disksleep 30      # Disk po 30 minutách
    
    # Nastavení pro baterii (pokud je MacBook)
    sudo pmset -b sleep 15          # Na baterii uspat po 15 minutách
    sudo pmset -b displaysleep 5    # Displej po 5 minutách na baterii
    sudo pmset -b disksleep 10      # Disk po 10 minutách na baterii
    
    echo "✅ Nastavení aplikováno!"
    echo ""
    echo "📋 Nové nastavení:"
    pmset -g | grep -E "(sleep|displaysleep|disksleep)"
    echo ""
    echo "🎯 VÝSLEDEK:"
    echo "  ✅ Mac na napájení se NIKDY neuspí"
    echo "  ✅ Cron job se spustí v 02:00"
    echo "  ✅ ETF scraping proběhne úspěšně"
    echo "  ⚡ Na baterii se Mac uspí normálně (šetří baterii)"
    
else
    echo "❌ Nastavení nezměněno"
    echo ""
    echo "⚠️  VAROVÁNÍ:"
    echo "Pokud se Mac uspí před 02:00, cron job se nespustí!"
    echo ""
    echo "🔄 ALTERNATIVY:"
    echo "1. Spusťte setup_mac_no_sleep.sh pro automatické nastavení"
    echo "2. Nebo použijte Mac daemon místo cron job"
    echo "3. Nebo manuálně v System Settings → Energy Saver:"
    echo "   - Vypněte 'Put hard disks to sleep when possible'"  
    echo "   - Nastavte 'Prevent automatic sleeping on power adapter when the display is off'"
fi

echo ""
echo "🔍 PRO KONTROLU NASTAVENÍ:"
echo "pmset -g"