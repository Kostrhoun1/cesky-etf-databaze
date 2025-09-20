# 🔒 Supabase Security Deployment Guide

## 🚨 Kritické bezpečnostní problémy k vyřešení

Lovable identifikoval tyto security issues:

### ❌ Error Level (Kritické)
- **Customer Email Addresses Could Be Stolen by Hackers**
- **Admin User Information Exposed to Public** 
- **Policy Exists RLS Disabled**
- **RLS Disabled in Public**

### ⚠️ Warning Level
- Function Search Path Mutable
- Extension in Public  
- Auth OTP long expiry
- Leaked Password Protection Disabled
- Current Postgres version has security patches available

## 🔧 Řešení - Krok za krokem

### 1. Spustit Security SQL Script

```bash
# V Supabase SQL Editor spusťte:
/Users/tomaskostrhoun/Documents/ETF/supabase_security_fixes.sql
```

### 2. Přidat Admin Uživatele

```sql
-- Nahraďte admin@example.com skutečným admin emailem
INSERT INTO app_admins (user_email, user_role) 
VALUES ('admin@example.com', 'admin');
```

### 3. Konfigurace v Supabase Dashboard

#### Authentication Settings:
- **Allow new users to sign up**: ❌ Disable (pouze admins)
- **Enable email confirmations**: ✅ Enable
- **Secure session cookie**: ✅ Enable
- **JWT expiry**: 3600 seconds (1 hodina)

#### Database Settings:
- **RLS enabled**: ✅ Verify enabled for all tables
- **Public schema access**: ✅ Limited by policies

### 4. Test Kompatibility

#### A) Frontend Test:
```bash
cd /Users/tomaskostrhoun/Documents/ETF
npm run dev
# Ověřte, že ETF data se načítají
```

#### B) Scraper Test:
```bash
cd /Users/tomaskostrhoun/Documents/ETF/Scraper
python3 final_scraper.py
# Ověřte, že scraper může zapisovat do databáze
```

#### C) Admin Test:
- Přihlaste se jako admin
- Zkontrolujte přístup k admin funkcím
- Ověřte, že non-admin nemá přístup k citlivým datům

## 🛡️ Co tento fix řeší

### ✅ RLS (Row Level Security)
- Aktivována na všech tabulkách
- ETF data: veřejné čtení, admin zápis
- Admin data: pouze admin přístup
- Newsletter: admin čtení, veřejné přidávání

### ✅ Data Protection
- Email adresy chráněny před únikem
- Admin informace nejsou veřejné
- Audit logging všech změn

### ✅ Scraper Kompatibilita
- Service role má plný přístup k zápisu
- Existující scraper funkcionality zachovány
- Žádné změny v Python kódu není třeba

### ✅ API Security
- Rate limiting pro veřejné funkce
- Bezpečné search paths
- Minimální privilegia pro anon role

## 🔍 Monitoring

### Audit Log
```sql
-- Sledování všech změn v databázi
SELECT * FROM audit_log 
ORDER BY created_at DESC 
LIMIT 100;
```

### Security Status
```sql
-- Ověření RLS statusu
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Ověření politik
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public';
```

## 🚀 Deployment Checklist

- [ ] SQL script spuštěn v Supabase
- [ ] Admin uživatel přidán
- [ ] Auth settings nakonfigurovány
- [ ] Frontend funkcionalita otestována
- [ ] Scraper funkcionalita otestována
- [ ] Admin přístup ověřen
- [ ] Security monitoring aktivní

## 📞 Support

Pokud dojde k problémům:

1. **Scraper nefunguje**: Ověřte service_role klíč
2. **Frontend neloaduje data**: Zkontrolujte public read policy
3. **Admin nemá přístup**: Ověřte záznam v app_admins tabulce
4. **Performance problémy**: Zkontrolujte indexy v audit_log

---

**⚠️ DŮLEŽITÉ**: Tento deployment **neovlivní** současnou funkcionalita scraperu ani frontendu. Všechny existující funkce zůstávají zachovány, pouze se zvyšuje bezpečnost.