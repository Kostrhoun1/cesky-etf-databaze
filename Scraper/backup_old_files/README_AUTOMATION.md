# ETF AUTOMATIZACE - KOMPLETNÍ NÁVOD

## 🎯 Přehled
Kompletní automatizační systém pro ETF scraping a upload do databáze.

## 📁 Soubory automatizace
```
├── complete_automation.py    # Hlavní automatizační skript
├── schedule_etf_updates.py   # Scheduler pro pravidelné aktualizace
├── run_etf_automation.sh     # Master spouštěcí skript
├── final_scraper.py          # ETF scraper (hlavní)
└── ISIN.csv                  # Seznam ISIN kódů
```

## 🚀 Použití

### 1. Jednorázová automatizace
```bash
# Spustí scraping + připraví data pro upload
python3 complete_automation.py

# S vlastním batch size
python3 complete_automation.py --batch-size 25

# Bez resume (od začátku)
python3 complete_automation.py --no-resume
```

### 2. Master skript (doporučeno)
```bash
# Nastaví závislosti a spustí automatizaci
chmod +x run_etf_automation.sh
./run_etf_automation.sh
```

### 3. Pravidelné aktualizace
```bash
# Spustí scheduler (2x denně: 6:00 a 18:00)
python3 schedule_etf_updates.py

# Test scheduleru (spustí ihned)
python3 schedule_etf_updates.py --test
```

## 📤 Upload do databáze

### Metoda 1: Web rozhraní (doporučeno)
1. Automatizace připraví CSV soubor ve složce `ready_for_upload/`
2. Otevřete: `http://localhost:8083/admin?password=Omitac116`
3. Nahrajte připravený CSV soubor
4. Počkejte na úspěšné zpracování

### Metoda 2: Programatické API (future)
```bash
# Experimentální automatický upload
python3 complete_automation.py --auto-upload
```

## ⏰ Naplánované spuštění

### macOS - Doporučený způsob (s prevencí uspání)
```bash
# Spustí Mac daemon s caffeinate (zabrání uspání)
./start_mac_daemon.sh

# Test mode (spustí ihned)
./start_mac_daemon.sh --test

# Foreground mode (pro debugging)
./start_mac_daemon.sh --foreground
```

### macOS/Linux - Cron (základní)
```bash
# Edituj crontab
crontab -e

# Přidej řádek (upravte cestu) - 1x denně v 02:00
0 2 * * * cd /path/to/scraper && python3 complete_automation.py
```

### Windows - Task Scheduler
1. Otevřete Task Scheduler
2. Create Task → Triggers → Daily at 02:00
3. Actions → Start Program → python3 complete_automation.py

### Python Scheduler (cross-platform)
```bash
# Spustí na pozadí, kontroluje 1x denně v 02:00
nohup python3 schedule_etf_updates.py &
```

## 📊 Monitoring & Logy

### Log soubory
```
automation_YYYYMMDD_HHMMSS.log  # Automation log
etf_scheduler.log                # Scheduler log
scraping_YYYYMMDD_HHMMSS.log    # Scraper log (z justetf_complete_production/logs/)
```

### Monitoring výstupů
```bash
# Sleduj real-time automation log
tail -f automation_*.log

# Sleduj scheduler
tail -f etf_scheduler.log

# Kontrola posledních výsledků
ls -la ready_for_upload/
ls -la justetf_complete_production/results/
```

## 🔧 Konfigurace

### complete_automation.py
- `batch_size`: Velikost dávky pro scraping (default: 50)
- `resume`: Pokračování v přerušeném scrapingu (default: True)
- `ready_for_upload_dir`: Složka pro připravené CSV (default: "ready_for_upload")

### schedule_etf_updates.py
- Časy spuštění: 06:00 a 18:00 denně
- Upravte v kódu: `schedule.every().day.at("06:00")`

## 🐛 Troubleshooting

### Časté problémy
1. **Import error**: `pip3 install -r requirements.txt`
2. **Permission denied**: `chmod +x run_etf_automation.sh`
3. **ISIN.csv missing**: Zkontrolujte přítomnost souboru
4. **Web upload fails**: Zkontrolujte URL a heslo v admin rozhraní

### Debug módy
```bash
# Verbose logging
python3 complete_automation.py --verbose

# Test pouze upload části
python3 complete_automation.py --test-upload-only

# Test scheduleru
python3 schedule_etf_updates.py --test
```

## 📈 Workflow automatizace

```
1. Scheduler aktivace (6:00/18:00)
        ↓
2. Spuštění final_scraper.py
        ↓
3. Zpracování všех ETF (batch po 50)
        ↓
4. Vytvoření CSV s výsledky
        ↓
5. Kopie do ready_for_upload/
        ↓
6. Zobrazení instrukcí pro upload
        ↓
7. Manuální upload přes web rozhraní
        ↓
8. Úspěšná aktualizace databáze
```

## ⚙️ Produkční nasazení

### Server konfigurace
1. Naklonujte ETF projekt na server
2. Nastavte environment variables pro Supabase
3. Konfigurujte web server (nginx + PM2/systemd)
4. Upravte URL v automatizaci z localhost na produkční doménu
5. Nastavte SSL certifikáty
6. Konfigurujte cron job nebo systemd timer

### Environment proměnné
```bash
export SUPABASE_URL="your-production-url"
export SUPABASE_ANON_KEY="your-anon-key"
export ETF_ADMIN_PASSWORD="your-secure-password"
```

---
**Created:** $(date)
**Version:** 1.0
**Status:** Ready for production