# 🌐 Automatické nahrávání Market Heatmap dat na server

Tento guide vysvětluje jak nastavit automatické nahrávání JSON souborů s market heatmap daty na váš web server.

## 📋 Přehled

Po spuštění `final_scraper.py` se automaticky:
1. ✅ Vygenerují market heatmap data pro všechna období
2. ✅ Uloží se lokálně do `/src/data/`
3. 🌐 **NOVĚ: Automaticky se nahrají na váš server**

## ⚙️ Nastavení serveru

### Krok 1: Vytvořte konfigurační soubor
```bash
cp server_config_example.py server_config.py
```

### Krok 2: Upravte server_config.py
```python
# Vaše skutečné údaje:
FTP_SERVER = "vase-domena.cz"
FTP_USERNAME = "vas-username"
FTP_PASSWORD = "vase-heslo"
FTP_REMOTE_PATH = "/public_html/data/"
UPLOAD_METHOD = "sftp"  # nebo "ftp" nebo "scp"
```

### Krok 3: Instalujte závislosti
```bash
pip install paramiko  # pro SFTP podporu
```

## 🚀 Použití

Spusťte scraper jako obvykle:
```bash
python3 final_scraper.py --csv YOUR_FILE.csv --batch-size 50
```

Script automaticky:
- Vygeneruje market heatmap data
- Nahraje je na váš server do složky `/data/`

## 📂 Struktura na serveru

Po nahrání budete mít na serveru:
```
vase-domena.cz/
└── data/
    ├── market_heatmap_1d.json
    ├── market_heatmap_wtd.json
    ├── market_heatmap_mtd.json
    ├── market_heatmap_ytd.json
    ├── market_heatmap_1y.json
    ├── market_heatmap_3y.json
    ├── market_heatmap_5y.json
    └── market_heatmap_10y.json
```

## 🎯 Výsledek

Váš web bude nyní zobrazovat aktuální market heatmap data bez nutnosti publikovat celý web znovu!

## 🔧 Možnosti nahrávání

### SFTP (Doporučeno)
- Nejbezpečnější
- Vyžaduje SSH přístup

### FTP (Klasické)
- Jednoduché nastavení
- Méně bezpečné

### SCP (SSH Copy)
- Vyžaduje SSH klíče nebo heslo
- Velmi bezpečné

## ⚠️ Troubleshooting

### Chyba: "No module named 'paramiko'"
```bash
pip install paramiko
```

### Chyba připojení SFTP/FTP
- ✅ Ověřte údaje v `server_config.py`
- ✅ Zkontrolujte, že server podporuje SFTP/FTP
- ✅ Ověřte cestu `FTP_REMOTE_PATH`

### Upload selhal
- Script pokračuje normálně i když upload selže
- JSON soubory zůstávají uložené lokálně
- Můžete je nahrát manuálně později

## 💡 Tipy

1. **Testování**: Nejdříve vyzkoušejte s `UPLOAD_METHOD = "ftp"` (nejjednoduší)
2. **Bezpečnost**: Pro produkci použijte `UPLOAD_METHOD = "sftp"`
3. **Cesty**: Ujistěte se, že složka `/data/` existuje na serveru
4. **Oprávnění**: Server musí mít write oprávnění do cílové složky

## 🔄 Vypnutí uploadu

Pokud chcete upload dočasně vypnout:
```python
# V final_scraper.py:
UPLOAD_HEATMAP_TO_SERVER = False
```