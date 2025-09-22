# 🔄 AKTUALIZACE SCRAPERU - INSTRUKCE

## ✅ **Databáze je připravena - 7 nových polí vytvořeno**

## 📋 **Co je potřeba udělat v scraperu:**

### 1. **Přidat 2 chybějící JustETF pole:**
```python
# V scraper kódu přidat tyto pole z JustETF:
fields_to_scrape = [
    # ... existující pole ...
    'Currency risk',      # -> currency_risk
    'Strategy risk',      # -> strategy_risk  
]
```

### 2. **Mapování polí:**
| JustETF pole | Databáze sloupec | Příklad hodnoty |
|--------------|------------------|-----------------|
| Currency risk | currency_risk | "Currency unhedged", "EUR hedged", "USD hedged" |
| Strategy risk | strategy_risk | "Low", "Medium", "High" |

### 3. **Aktualizovat CSV export:**
Scraper by měl exportovat CSV s novými sloupci:
- `currency_risk`
- `strategy_risk`

### 4. **Nová pole se parsují automaticky:**
Jakmile máš `currency_risk` v CSV, aplikace automaticky:
- ✅ Parsuje `investment_focus` do 5 nových polí
- ✅ Používá `currency_risk` pro 100% přesnou hedging detekci
- ✅ Vylepší kategorizaci a region mapping

## 🚀 **Výsledek po aktualizaci scraperu:**
1. **100% přesná hedging detekce** místo guessingu z názvů
2. **Granulární filtrování** podle sektoru, market cap, stylu
3. **Přesnější kategorizace** z strukturovaných dat
4. **Vylepšené region mapping** z investment_focus

## 📝 **Příklad očekávaných hodnot:**

### Currency Risk:
- "Currency unhedged"
- "EUR hedged" 
- "USD hedged"
- "GBP hedged"
- "CHF hedged"

### Strategy Risk:
- "Low"
- "Medium" 
- "High"

## ⚡ **Priorita:**
**Currency risk** je nejvíce kritické - umožní 100% přesnou detekci hedging místo pattern matchingu názvů.