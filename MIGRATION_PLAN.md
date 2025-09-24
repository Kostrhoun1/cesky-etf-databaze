# ETF průvodce.cz - Migration Plan: SPA → SSR

## 🎯 CÍLE MIGRACE
- **Hlavní problém:** Google nevidí interní odkazy v React SPA (0 `<a href>` tagů)
- **Řešení:** Přepis na Next.js SSR pro perfektní SEO
- **Benefit:** Z 27 indexovaných stránek na 3600+ ETF stránek

## 📊 SOUČASNÝ STAV (Updated 2025-09-24)
- **Hosting:** ✅ Vercel Free Plan (migrace z Lovable dokončena)
- **Tech stack:** React + Vite + Supabase + Tailwind
- **Traffic:** Desítky uživatelů denně (~1K-3K requests/měsíc)
- **Stránky:** 3618 ETF + 27 statických = 3645 celkem
- **Záloha:** `backup-before-ssr-migration` branch vytvořena ✅

### ✅ FÁZE 1 DOKONČENA (2025-09-24) - VERIFIED:
- **Vercel deployment:** etfpruvodce-artjlvdma-tomas-projects-43fd2658.vercel.app ✅
- **Domény:** etfpruvodce.cz + www.etfpruvodce.cz (obě FUNKČNÍ s SSL) ✅
- **DNS:** český-hosting.cz (A record: 216.198.79.1, CNAME: www→etfpruvodce.cz) ✅
- **Performance:** Rychlejší než Lovable ✅
- **SEO:** WWW canonical problémy VYŘEŠENÉ, 3645 URL sitemap ✅
- **Status:** PRODUCTION READY - Current SPA running stable

## 🚀 3-FÁZOVÁ MIGRACE STRATEGIE

### FÁZE 1: SPA → Vercel Deploy (1 den)
**Cíl:** Přesun současné SPA aplikace na Vercel bez změn

**Kroky:**
1. ✅ Vercel account setup (Free plan stačí)
2. ⏳ GitHub repo připojení k Vercel  
3. ⏳ Build settings konfigurace
4. ⏳ Environment variables (Supabase credentials)
5. ⏳ Testování na `xyz.vercel.app`
6. ⏳ Custom domain setup `etfpruvodce.cz`
7. ⏳ DNS přesměrování z český-hosting

**Výstup:** Funkční web na Vercel, stejná funkcionalita jako Lovable

### FÁZE 2: Paralelní Next.js SSR (1-2 týdny) - READY TO START
**Cíl:** Vybudovat novou SSR verzi PARALELNĚ (oddělený projekt)

**Development Strategy:**
- **Současný web:** etfpruvodce.cz (SPA - zůstává v provozu)
- **Nová verze:** Samostatný Next.js projekt 
- **Test doména:** beta.etfpruvodce.cz nebo podobná
- **Přístup:** Oddělený development, paralelní vývoj

**Kroky:**
1. ⏳ Nový Next.js projekt vytvoření (separátní folder/repo)
2. ⏳ Komponenty migrace (postupně z existujícího kódu)
   - Layout systém
   - Homepage 
   - ETF detail stránky
   - Kalkulačky
   - Blog stránky
   - Broker recenze
3. ⏳ Supabase integrace (SSR data loading)
4. ⏳ Routing setup (/etf/[isin], /kalkulacky/*)
5. ⏳ Meta tags & SEO optimalizace
6. ⏳ Styling (Tailwind + responsive)
7. ⏳ Deploy na `beta.etfpruvodce.cz`
8. ⏳ Testování & debugging paralelně s produkční SPA

**Technické detaily:**
- **Framework:** Next.js 14+ (App Router)
- **Data loading:** Server Components + ISR pro ETF
- **Supabase:** Server-side queries
- **SEO:** Automatic meta tags, sitemap.xml
- **Hosting:** Vercel Free (upgrade při růstu)

### FÁZE 3: Produkční přepnutí (1 den)  
**Cíl:** Přepnutí hlavní domény na Next.js

**Kroky:**
1. ⏳ Finální testování beta verze
2. ⏳ SEO audit (meta tags, structured data)
3. ⏳ Performance audit (Core Web Vitals)
4. ⏳ DNS switch: etfpruvodce.cz → Next.js
5. ⏳ SPA backup na `old.etfpruvodce.cz`
6. ⏳ Google Search Console update
7. ⏳ Sitemap.xml submission
8. ⏳ Monitoring & performance tracking

## 🔧 TECHNICKÉ DETAILY

### Současná architektura:
```
React SPA (Vite) → Lovable Static Hosting
├── Supabase (3618 ETF records)
├── Tailwind CSS
├── React Router  
└── Client-side rendering
```

### Cílová architektura:
```
Next.js SSR → Vercel Hosting  
├── Supabase (same data)
├── Tailwind CSS (preserved)
├── Next.js App Router
├── Server Components
├── ISR pro ETF stránky
└── Perfect SEO
```

### Rizika & Mitigation:
- **Deployment issues:** Záloha na starém hostingu
- **Performance:** ISR + Edge caching
- **Supabase RLS:** Test server-side queries
- **Styling:** Zachovat současný design
- **Rollback:** DNS rychle přepnout zpět

## 📈 OČEKÁVANÉ VÝSLEDKY

### SEO zlepšení:
- **Před:** 0 HTML odkazy → 27 indexovaných stránek
- **Po:** Tisíce HTML odkazů → 3600+ indexovaných stránek
- **Google crawl:** Plné propojení mezi stránkami
- **Page Authority:** Správné předávání "link juice"

### Performance:
- **SSR:** Rychlejší initial load
- **ISR:** Cache pro statický obsah  
- **CDN:** Vercel Edge network
- **SEO:** Core Web Vitals optimalizace

## 💰 NÁKLADY
- **Vercel Free:** $0/měsíc (dostatečný pro současný traffic)
- **Scraping:** GitHub Actions (FREE) nebo Railway ($5/měsíc)
- **Celkem:** $0-5/měsíc vs současné Lovable náklady

## 📋 CHECKLIST PRO KAŽDOU FÁZI

### Fáze 1 Checklist:
- [ ] Vercel account
- [ ] GitHub integration  
- [ ] Build successful
- [ ] Environment variables
- [ ] Domain working
- [ ] All functionality tested

### Fáze 2 Checklist:
- [ ] Next.js projekt setup
- [ ] Komponenty migrace (90%+)
- [ ] Data loading works
- [ ] All routes functional  
- [ ] SEO meta tags
- [ ] Mobile responsive
- [ ] Beta testing complete

### Fáze 3 Checklist:
- [ ] Performance audit passed
- [ ] SEO audit passed
- [ ] DNS switched
- [ ] Google Search Console updated
- [ ] Monitoring active
- [ ] Rollback plan ready

## 🚨 KRITICKÉ BODY
1. **Environment variables** - Supabase klíče
2. **Routing** - všechny URL musí fungovat  
3. **SEO** - meta tags pro každou stránku
4. **Performance** - ISR pro 3600 ETF stránek
5. **Rollback** - možnost rychlého návratu

## 📞 KONTAKTY & ODKAZY
- **Vercel Dashboard:** TBD
- **GitHub Repo:** cesky-etf-databaze  
- **Backup Branch:** backup-before-ssr-migration
- **Supabase:** nbhwnatadyubiuadfakx.supabase.co
- **Domain:** český-hosting.cz

---

**Posledný update:** 2025-09-24  
**Status:** Fáze 1 připravena k realizaci  
**Next step:** Vercel deployment současné SPA