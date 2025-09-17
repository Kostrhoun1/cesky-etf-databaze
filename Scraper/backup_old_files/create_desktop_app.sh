#!/bin/bash
# VYTVOŘENÍ DESKTOP IKONY PRO ETF SCRAPER

echo "🖥️  VYTVÁŘENÍ ETF SCRAPER IKONY"
echo "==============================="

# Zjistí aktuální složku
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_PATH="$SCRIPT_DIR/ETF_Scraper_App.py"

echo "📁 Scraper složka: $SCRIPT_DIR"

# Zkontroluj existenci souboru
if [ ! -f "$APP_PATH" ]; then
    echo "❌ ETF_Scraper_App.py nenalezen!"
    exit 1
fi

# Vytvoř .app bundle
APP_NAME="ETF Scraper"
APP_BUNDLE="$HOME/Desktop/$APP_NAME.app"
CONTENTS_DIR="$APP_BUNDLE/Contents"
MACOS_DIR="$CONTENTS_DIR/MacOS"
RESOURCES_DIR="$CONTENTS_DIR/Resources"

echo "🏗️  Vytvářím aplikační bundle..."

# Vytvoř adresářovou strukturu
mkdir -p "$MACOS_DIR"
mkdir -p "$RESOURCES_DIR"

# Vytvoř spouštěcí skript
cat > "$MACOS_DIR/ETF Scraper" << EOF
#!/bin/bash
cd "$SCRIPT_DIR"
python3 "$APP_PATH"
EOF

chmod +x "$MACOS_DIR/ETF Scraper"

# Vytvoř Info.plist
cat > "$CONTENTS_DIR/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>ETF Scraper</string>
    <key>CFBundleIdentifier</key>
    <string>com.etf.scraper</string>
    <key>CFBundleName</key>
    <string>ETF Scraper</string>
    <key>CFBundleDisplayName</key>
    <string>🤖 ETF Scraper</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleSignature</key>
    <string>ETFS</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.9</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
EOF

# Vytvoř také ikonu na ploše (alternativní způsob)
DESKTOP_SCRIPT="$HOME/Desktop/🤖 ETF Scraper.command"
cat > "$DESKTOP_SCRIPT" << EOF
#!/bin/bash
cd "$SCRIPT_DIR"
python3 "$APP_PATH"
EOF

chmod +x "$DESKTOP_SCRIPT"

echo "✅ Ikony vytvořeny!"
echo ""
echo "🎯 NA PLOŠE NAJDETE:"
echo "  1. 📱 ETF Scraper.app - Plnohodnotná aplikace"
echo "  2. 🤖 ETF Scraper.command - Alternativní spouštěč"
echo ""
echo "🚀 POUŽITÍ:"
echo "  1. Dvojklik na ikonu na ploše"
echo "  2. Klikněte 'Spustit ETF Scraping'"
echo "  3. Počkejte na dokončení (4-6 hodin)"
echo "  4. Klikněte 'Otevřít Upload' pro nahrání dat"
echo ""
echo "💡 TIPY:"
echo "  - Nechte Mac zapnutý během scrapingu"
echo "  - Aplikace automaticky zabrání uspání"
echo "  - Sledujte progress v log okně"
echo "  - Po dokončení se otevře upload stránka"
echo ""
echo "❌ ODEBRAT IKONY:"
echo "  rm -f '$APP_BUNDLE'"
echo "  rm -f '$DESKTOP_SCRIPT'"