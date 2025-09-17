# ETF Scraper - Produkční verze

## 🚀 Spuštění
Dvakrát klikněte na **ETF_Direct_Scraper.command** na ploše.

## 📁 Klíčové soubory
- **`final_scraper.py`** - Hlavní scraper script
- **`ISIN.csv`** - Seznam ~3600 ISIN kódů k scrapování
- **`justetf_complete_production/`** - Výsledky scrapování
- **`ready_for_upload/`** - Data připravená pro upload
- **`backup_old_files/`** - Staré testovací soubory

## 📊 Očekávané výsledky
- **Čas**: 5-6 hodin pro všechny ETF
- **Úspěšnost**: ~95%+ ETF zpracováno
- **Data**: Exchange, dividend, performance, geographic, sector
- **Formáty**: Excel, CSV, JSON

## 🔄 Progress monitoring
Scraper ukazuje živý progress:
```
[0:1/50] IE00B4L5Y983
[0:2/50] DE0002635265
...
PROGRESS: 150/3600 (4.2%)
```

## 📋 Po dokončení
Výsledky najdete v `justetf_complete_production/results/FINAL_COMPLETE_WITH_DIVIDENDS_*.csv`