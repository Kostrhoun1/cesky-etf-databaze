# 🤖 ETF SCRAPER DESKTOP APP

**Jednoduchá GUI aplikace pro manuální spuštění ETF scrapingu**

## 🎯 **INSTALACE - Jednoduché kroky:**

### **1. Vytvořte ikonu na ploše:**
```bash
cd /Users/tomaskostrhoun/Documents/ETF/Scraper
./create_desktop_app.sh
```

### **2. Na ploše najdete ikony:**
- 📱 **ETF Scraper.app** - Hlavní aplikace
- 🤖 **ETF Scraper.command** - Alternativní spouštěč

---

## 🚀 **POUŽITÍ:**

### **Večer před spaním:**
1. **Dvojklik** na ikonu na ploše
2. **Klik** na "🚀 Spustit ETF Scraping"
3. **Sledujte** progress v log okně
4. **Nechte** Mac zapnutý (aplikace zabrání uspání)

### **Ráno po probuzení:**
1. **Zkontrolujte** status v aplikaci
2. **Klik** na "📤 Otevřít Upload" (pokud úspěšné)
3. **Nahrajte** CSV soubor do databáze
4. **Zavřete** aplikację

---

## 🖥️ **FUNKCE APLIKACE:**

### **🎮 Ovládací prvky:**
- **🚀 Spustit ETF Scraping** - Začne scraping
- **🛑 Zastavit** - Přeruší běžící scraping
- **📤 Otevřít Upload** - Otevře admin stránku pro upload

### **📊 Monitorování:**
- **Real-time log** - Vidíte co se děje
- **Progress bar** - Animovaný indikátor průběhu
- **Status** - Aktuální stav procesu
- **Čas** - Timestamp všech operací

### **🔒 Automatické funkce:**
- **Caffeinate** - Zabrání uspání Macu
- **Error handling** - Zachytí a zobrazí chyby
- **Auto cleanup** - Uklidí procesy při ukončení
- **File checks** - Zkontroluje potřebné soubory

---

## ⏱️ **TYPICKÝ WORKFLOW:**

```
22:00 → Spustíte aplikaci
22:01 → Kliknete "Spustit ETF Scraping"
22:01-02:00 → Scraping běží (Mac neusne)
06:00 → Scraping dokončen ✅
06:01 → Automaticky se otevře upload stránka
06:05 → Nahrajete CSV do databáze
06:10 → Zavřete aplikaci
```

---

## 📝 **LOG ZPRÁVY - Co znamenají:**

### **🟢 Pozitivní:**
- `✅ Všechny soubory nalezeny` - Setup OK
- `🚀 Spouštím scraping...` - Začátek procesu
- `📊 Phase 1 complete: 100 ETFs loaded` - První fáze
- `✅ ETF scraping úspěšně dokončen!` - Hotovo!

### **🟡 Informační:**
- `☕ Spouštím caffeinate` - Prevence uspání
- `📁 Batch X dokončen` - Průběh scrapingu
- `🔄 Phase 2: Loading all ETFs` - Druhá fáze

### **🔴 Problémy:**
- `❌ ETF scraping selhal` - Chyba v procesu
- `⚠️ Chybí soubory:` - Neúplná instalace
- `❌ Neočekávaná chyba:` - Systémová chyba

---

## 🐛 **ŘEŠENÍ PROBLÉMŮ:**

### **Aplikace se nespustí:**
```bash
# Zkontrolujte Python
python3 --version

# Zkontrolujte tkinter
python3 -c "import tkinter; print('OK')"

# Přeinstalujte tk (pokud chybí)
brew install python-tk
```

### **Chybí soubory:**
```bash
cd /Users/tomaskostrhoun/Documents/ETF/Scraper
ls -la final_scraper.py ISIN.csv complete_automation.py
```

### **Scraping selže:**
- Zkontrolujte internetové připojení
- Ověřte, že ISIN.csv obsahuje data
- Restartujte aplikaci

### **Upload nefunguje:**
- Ověřte, že web aplikace běží na :8083
- Zkontrolujte heslo v URL
- Zkuste manuální návštěvu stránky

---

## ⚙️ **KONFIGURACE:**

### **Změna batch size:**
Editujte v `ETF_Scraper_App.py`:
```python
"--batch-size", "50"  # Změňte na požadovanou hodnotu
```

### **Změna upload URL:**
```python
url = "http://localhost:8083/admin?password=Omitac116"
```

---

## 🗑️ **ODEBRÁNÍ:**

```bash
# Odstranění ikon z plochy
rm -rf "$HOME/Desktop/ETF Scraper.app"
rm -f "$HOME/Desktop/🤖 ETF Scraper.command"
```

---

**🎯 Nyní máte jednoduchou desktop aplikaci pro ETF scraping! Stačí dvojklik a všechno ostatní se děje automaticky.**