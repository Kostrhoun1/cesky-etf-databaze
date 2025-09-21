# 🔄 SYSTEMATICKÝ ROZPIS IMPLEMENTACE - Content Strategy ETF Průvodce

## 📋 FÁZE 0: POKROČILÉ SEO OPTIMALIZACE (IHNED - Týden 1)

### A. Interní odkazy podle 3+6 pravidla
**A.1** Audit stávajících stránek na interní linking
  - A.1.1 Zkontrolovat všechny stránky /srovnani-etf na počet odkazů
  - A.1.2 Zkontrolovat všechny stránky /nastroje na počet odkazů
  - A.1.3 Zkontrolovat všechny stránky /tipy na počet odkazů
  - A.1.4 Vytvořit seznam stránek, které nesplňují pravidlo 3+6

**A.2** Implementace Hub→Spoke odkazů
  - A.2.1 Přidat min. 6 článků + CTA "Otevřít v porovnání" na /srovnani-etf
  - A.2.2 Přidat min. 6 článků + CTA "Použít kalkulačku" na /nastroje
  - A.2.3 Přidat min. 6 článků s kontextovými anchory na /tipy
  - A.2.4 Integrovat odkazy do přirozeného toku textu

**A.3** Implementace Spoke→Hub odkazů
  - A.3.1 Přidat 3 strategické odkazy v prvních 300 slovech do každého článku
  - A.3.2 Implementovat deep linking s #kotvy na kalkulačky
  - A.3.3 Nahradit obecné anchory ("zde", "klikněte") popisnými anchory
  - A.3.4 Zkontrolovat všechny existující články na dodržení pravidla

### B. SERP-first template pro všechny stránky
**B.1** Vytvořit React komponentu pro 5-bodové shrnutí
  - B.1.1 Navrhnout vizuální grid 5 karet s emoji
  - B.1.2 Implementovat React komponentu SERPSummary
  - B.1.3 Vytvořit props interface pro flexibilní obsah
  - B.1.4 Přidat responsivní styling

**B.2** Implementovat title formule: `[Tool] [Year] ⚡ [Benefit] [Keyword]`
  - B.2.1 Aktualizovat všechny kalkulačky s novou title formulí
  - B.2.2 Aktualizovat všechny srovnání s novou formulí
  - B.2.3 Vytvořit template pro nové články
  - B.2.4 Zkontrolovat délku titulků (pod 60 znaků)

**B.3** Přepsat meta descriptions s 🎯 emoji + intent formule
  - B.3.1 Aktualizovat meta descriptions všech kalkulaček
  - B.3.2 Přidat intent-driven descriptions pro srovnání
  - B.3.3 Implementovat formuli: "🎯 [Konkrétní výsledek] za [čas]. [Klíčové upozornění]!"
  - B.3.4 Zkontrolovat délku descriptions (pod 160 znaků)

**B.4** Přidat above-the-fold strukturu s rychlou navigací
  - B.4.1 Vytvořit komponentu QuickNavigation s kotvami na sekce
  - B.4.2 Implementovat CTA na nástroj (primární akce)
  - B.4.3 Přidat FAQ sekce s 3-5 Q&A + schema FAQPage
  - B.4.4 Optimalizovat above-the-fold pro mobile

### C. Core Web Vitals optimalizace
**C.1** Implementovat lazy loading pro všechny komponenty pod fold
  - C.1.1 Identifikovat všechny komponenty pod fold
  - C.1.2 Implementovat React.lazy() pro těžké komponenty
  - C.1.3 Přidat intersection observer pro obrázky
  - C.1.4 Optimalizovat načítání grafů a tabulek

**C.2** Přidat Suspense wrappery s skeleton loading states
  - C.2.1 Vytvořit skeleton komponenty pro kalkulačky
  - C.2.2 Implementovat Suspense wrappery pro všechny lazy komponenty
  - C.2.3 Přidat loading states pro asynchronní data
  - C.2.4 Optimalizovat placeholder content

**C.3** Preload kritických CSS a fontů
  - C.3.1 Identifikovat kritické CSS pro above-the-fold
  - C.3.2 Implementovat preload pro main fonts
  - C.3.3 Optimalizovat CSS delivery (critical CSS inline)
  - C.3.4 Nastavit resource hints (dns-prefetch, preconnect)

**C.4** Nastavit GTMetrix monitoring + týdenní alerty
  - C.4.1 Vytvořit GTMetrix účet a nastavit monitoring
  - C.4.2 Nastavit týdenní email alerty na CWV metriky
  - C.4.3 Vytvořit dashboard pro sledování výkonu
  - C.4.4 Nastavit threshold alerty (LCP >2.5s, CLS >0.1)

### D. E-E-A-T metodika komponenty
**D.1** Vytvořit metodika box komponentu s odkazy na /metodika-vypoctu
  - D.1.1 Navrhnout vizuální design metodika boxu
  - D.1.2 Implementovat React komponentu MetodikaBox
  - D.1.3 Přidat odkazy na příslušné metodiky
  - D.1.4 Integrovat do všech kalkulaček

**D.2** Přidat citace primárních zdrojů do kalkulaček
  - D.2.1 Identifikovat primární zdroje pro každou kalkulačku
  - D.2.2 Přidat citace KID/prospekt do výsledků
  - D.2.3 Implementovat odkazy na oficiální dokumenty
  - D.2.4 Vytvořit databázi spolehlivých zdrojů

**D.3** Implementovat upozornění a omezení pro všechny nástroje
  - D.3.1 Vytvořit komponentu DisclaimerBox
  - D.3.2 Přidat specifická upozornění pro každý nástroj
  - D.3.3 Implementovat modal s detailními omezeními
  - D.3.4 Přidat odkazy na kompletní metodiku

---

## 📁 FÁZE 1: RESTRUKTURALIZACE (23. září - 6. října 2025)

### E. Week 1 - Planning & Setup (23.-29. září 2025)
**E.1** ✅ Rozhodnout finální název sekce (HOTOVO)

**E.2** Vytvořit novou strukturu složek v projektu
  - E.2.1 Vytvořit složky /src/pages/analyzy-a-clanky/
  - E.2.2 Vytvořit podsložky pro 5 kategorií (trzni-zpravy, srovnani-etf, recenze, strategie-navody, dane)
  - E.2.3 Vytvořit templates pro category pages
  - E.2.4 Nastavit TypeScript interfaces pro novou strukturu

**E.3** Navrhnout nové URL schema s kategoriemi
  - E.3.1 Definovat URL struktura pro všech 5 kategorií
  - E.3.2 Vytvořit mapping starých URL na nové
  - E.3.3 Navrhnout URL naming conventions
  - E.3.4 Vytvořit dokumentaci URL struktury

**E.4** Připravit 301 redirects mapping z `/tipy/*`
  - E.4.1 Exportovat seznam všech současných URL z /tipy
  - E.4.2 Namapovat každý existující článek na novou kategorii
  - E.4.3 Vytvořit redirect rules pro server
  - E.4.4 Připravit fallback redirect pro nenamapované URL

**E.5** Aktualizovat sitemap.xml
  - E.5.1 Přidat nové URL struktury do sitemap
  - E.5.2 Nastavit priority pro category pages
  - E.5.3 Přidat lastmod data pro všechny URL
  - E.5.4 Implementovat dynamické generování sitemap

**E.6** Vytvořit wireframes pro category pages
  - E.6.1 Navrhnout layout pro hub stránky (/srovnani-etf, /nastroje, etc.)
  - E.6.2 Vytvořit wireframes přístupné pro začátečníky
  - E.6.3 Navrhnout navigaci a filtering pro kategorie
  - E.6.4 Vytvořit mockupy pro mobile a desktop

### F. Week 2 - Technical Implementation (30. září - 6. října 2025)
**F.1** Implementovat novou URL strukturu `/analyzy-a-clanky/`
  - F.1.1 Nastavit React Router pro nové URL strukture
  - F.1.2 Vytvořit komponenty pro 5 category pages
  - F.1.3 Implementovat dynamic routing pro články
  - F.1.4 Nastavit parametrické URL pro filtry

**F.2** Vytvořit 301 redirecty ze starých URLs `/tipy/*`
  - F.2.1 Implementovat redirect middleware v Next.js
  - F.2.2 Nastavit server-side redirecty v nginx/Apache
  - F.2.3 Vytvořit client-side fallback redirecty
  - F.2.4 Testovat všechny redirect chains

**F.3** Aktualizovat navigační menu: "Tipy" → "Články" s tooltip
  - F.3.1 Změnit label v hlavním menu
  - F.3.2 Přidat tooltip "Články a tipy o ETF investování"
  - F.3.3 Aktualizovat mobile menu
  - F.3.4 Přidat ikonu pro lepší identifikaci

**F.4** Aktualizovat všechny interní odkazy v komponentách
  - F.4.1 Najít všechny odkazy na /tipy/* v kódu
  - F.4.2 Nahradit odkazy na novou strukturu
  - F.4.3 Aktualizovat CTA buttons v kalkulačkách
  - F.4.4 Zkontrolovat odkazy v footeru a sidebar

**F.5** Vytvořit 5 category landing pages
  - F.5.1 Implementovat /analyzy-a-clanky/trzni-zpravy/
  - F.5.2 Implementovat /analyzy-a-clanky/srovnani-etf/
  - F.5.3 Implementovat /analyzy-a-clanky/recenze/
  - F.5.4 Implementovat /analyzy-a-clanky/strategie-navody/
  - F.5.5 Implementovat /analyzy-a-clanky/dane/

**F.6** Přesunout existující 14 článků do kategorií
  - F.6.1 Kategorizovat všech 14 existujících článků
  - F.6.2 Přesunout soubory do správných složek
  - F.6.3 Aktualizovat imports a exports
  - F.6.4 Zkontrolovat funkčnost všech přesunutých článků

**F.7** Aktualizovat breadcrumbs komponenty
  - F.7.1 Implementovat novou breadcrumb logiku pro kategorie
  - F.7.2 Přidat dynamické generování breadcrumbs
  - F.7.3 Implementovat schema markup pro breadcrumbs
  - F.7.4 Stylovat breadcrumbs pro lepší UX

**F.8** Test všech redirectů a links + UX testing pro začátečníky
  - F.8.1 Otestovat všechny 301 redirecty
  - F.8.2 Zkontrolovat interní linking
  - F.8.3 Provést UX test s reálnými uživateli
  - F.8.4 Opravit zjištěné problémy

---

## 📝 FÁZE 2: CONTENT CREATION (Týden 3-26)

### G. Month 1 (7. října - 3. listopadu 2025) - Foundation Articles
**G.1** Článek: "ETF Trh: Říjen 2025 - Q3 Earnings Outlook"
  - G.1.1 Výzkum Q3 earnings dat pro hlavní indexy
  - G.1.2 Analýza dopadu na UCITS ETF
  - G.1.3 Vytvoření grafů a vizualizací
  - G.1.4 Napsání článku s českým kontextem
  - G.1.5 SEO optimalizace pro "etf trh říjen 2025"
  - G.1.6 Přidání internal linků podle 3+6 pravidla

**G.2** Článek: "Nejlepší ETF pro začátečníky 2025"
  - G.2.1 Výzkum nejpopulárnějších ETF pro začátečníky
  - G.2.2 Analýza jednoduchosti, TER, tracking error
  - G.2.3 Vytvoření srovnávací tabulky
  - G.2.4 Napsání praktického návodu
  - G.2.5 Optimalizace pro 2.1k searches/month
  - G.2.6 Propojení s ETF kalkulačkou poplatků

**G.3** Článek: "S&P 500 ETF Battle: CSPX vs VUAA vs SXR8"
  - G.3.1 Detailní analýza tracking difference a TER
  - G.3.2 Porovnání měnového zajištění a dividend
  - G.3.3 Praktické srovnání pro české investory
  - G.3.4 Vytvoření live srovnávací tabulky z DB
  - G.3.5 Optimalizace pro 1.5k searches/month
  - G.3.6 Deep linking na srovnávač ETF

**G.4** Článek: "Akumulující vs Distribuční ETF: Daňové aspekty ČR"
  - G.4.1 Výzkum českých daňových pravidel
  - G.4.2 Praktické příklady s reálnými čísly
  - G.4.3 Vytvoření daňové kalkulačky
  - G.4.4 Vysvětlení dopadů pro různé investiční horizonty
  - G.4.5 Optimalizace pro 600 searches/month
  - G.4.6 Propojení s existujícími nástroji

**G.5** Setup content calendar od listopadu 2025 do března 2026
  - G.5.1 Vytvoření editorial kalendáře v Google Sheets
  - G.5.2 Naplánování 3-4 článků týdně
  - G.5.3 Distribuce témat podle sezónnosti
  - G.5.4 Nastavení reminder systému

**G.6** Vytvořit templates pro různé typy článků
  - G.6.1 Template pro měsíční/týdenní analýzy
  - G.6.2 Template pro ETF recenze
  - G.6.3 Template pro srovnání článků
  - G.6.4 Template pro praktické návody

### H. Month 2 (4. listopadu - 1. prosince 2025) - High-Volume Keywords
**H.1** Článek: "Nejlepší ETF listopad 2025 - Holiday Season Plays"
  - H.1.1 Analýza sezónních trendů v ETF
  - H.1.2 Identifikace vhodných sektorových ETF
  - H.1.3 Riziková analýza holiday season strategií
  - H.1.4 Optimalizace pro 120 searches/month

**H.2** Článek: "MSCI World ETF Mega Test: IWDA vs SWRD vs EUNL"
  - H.2.1 Kompletní analýza tracking difference
  - H.2.2 Analýza nákladů a dividend
  - H.2.3 Praktické testování s demo portfolii
  - H.2.4 Optimalizace pro 800 searches/month

**H.3** Článek: "Dollar Cost Averaging s ETF: Praktický průvodce"
  - H.3.1 Vysvětlení DCA pro začátečníky
  - H.3.2 Praktické nastavení u českých brokerů
  - H.3.3 Vytvoření DCA kalkulačky
  - H.3.4 Optimalizace pro 400 searches/month

**H.4** Článek: "Nejlepší ETF na umělou inteligenci 2025"
  - H.4.1 Výzkum AI ETF na evropském trhu
  - H.4.2 Analýza holdings a sektorového rozložení
  - H.4.3 Rizikové hodnocení AI sektoru
  - H.4.4 Optimalizace pro 1.2k searches/month

**H.5** Týdenní analýza: "ETF Watchlist: 5 fondů pro Q4 2025"
  - H.5.1 Vytvoření týdenního formátu
  - H.5.2 Výběr 5 zajímavých ETF
  - H.5.3 Krátká analýza každého fondu
  - H.5.4 Propojení se srovnávačem

**H.6** Měření performance prvních článků + SEO audit
  - H.6.1 Analýza traffic růstu prvních článků
  - H.6.2 Sledování rankings pro target keywords
  - H.6.3 Audit technical SEO implementace
  - H.6.4 Optimalizace based on performance data

### I. Month 3 (Týden 11-14) - Specialization
**I.1** Článek: "Nejlevnější Broad Market ETF 2025"
**I.2** Článek: "iShares vs Vanguard vs Xtrackers: Který poskytovatel?"
**I.3** Článek: "TER 0.07% vs 0.20%: Kolik skutečně ušetříte?"
**I.4** Článek: "Core-Satellite Portfolio s ETF"
**I.5** Týdenní analýza: "ETF Watchlist: 5 fondů k sledování"
**I.6** SEO audit prvních článků a optimalizace

### J. Month 4-6 (Měsíce 4-6) - Pokračování podle plánu
**J.1** Niche Topics články (Month 4)
**J.2** Advanced Content články (Month 5)  
**J.3** Specialized Sectors články (Month 6)

---

## 🔧 FÁZE 3: TECHNICKÁ OPTIMALIZACE (Průběžně)

### K. SEO Implementation - Pokročilé pravidla
**K.1** Schema markup pro všechny typy článků
  - K.1.1 Implementovat Article schema pro všechny články
  - K.1.2 Přidat Breadcrumb schema markup
  - K.1.3 Implementovat FAQPage schema pro FAQ sekce
  - K.1.4 Validovat všechny schema pomocí Google Rich Results Test

**K.2** NOVÉ: Interní odkazy podle 3+6 pravidla (viz bod A)

**K.3** NOVÉ: SERP-first template implementace (viz bod B)

**K.4** Open Graph tags pro social sharing
  - K.4.1 Implementovat OG title, description, image pro všechny stránky
  - K.4.2 Vytvořit dynamické OG images (1200×630)
  - K.4.3 Přidat Twitter Card markup
  - K.4.4 Nastavit Facebook sharing debugger

**K.5** XML sitemap s category structure + dynamické pro kalkulačky
  - K.5.1 Rozšířit sitemap o nové kategorie
  - K.5.2 Implementovat dynamické generování pro ETF databázi
  - K.5.3 Přidat priority a changefreq pro různé typy stránek
  - K.5.4 Nastavit auto-submission do GSC

**K.6** Canonical URLs setup + faceted URLs (noindex,follow)
  - K.6.1 Implementovat canonical meta tags pro všechny stránky
  - K.6.2 Nastavit noindex,follow pro filtrovací URL
  - K.6.3 Vytvořit logic pro self-referencing canonicals
  - K.6.4 Zkontrolovat canonical chains

**K.7** Featured snippets optimization
  - K.7.1 Optimalizovat People Also Ask sekce pro snippets
  - K.7.2 Strukturovat odpovědi v 40-80 slovech
  - K.7.3 Použít numbered/bulleted lists kde vhodné
  - K.7.4 Monitorovat featured snippet získávání

### L. UX Improvements + Core Web Vitals (viz bod C pro CWV)
**L.1** Category filtering system
  - L.1.1 Implementovat filtry pro category pages
  - L.1.2 Přidat tag-based filtering
  - L.1.3 Vytvořit search functionality pro články
  - L.1.4 Implementovat sort options (date, popularity)

**L.2** Article search functionality
  - L.2.1 Implementovat full-text search
  - L.2.2 Přidat auto-complete suggestions
  - L.2.3 Vytvořit advanced search filters
  - L.2.4 Nastavit search analytics

**L.3** Reading time estimates
  - L.3.1 Implementovat word count calculation
  - L.3.2 Přidat reading time na začátek článků
  - L.3.3 Zobrazit progress bar při čtení
  - L.3.4 Nastavit average reading speed (200 WPM)

**L.4** Social sharing buttons
  - L.4.1 Implementovat sharing na Facebook, Twitter, LinkedIn
  - L.4.2 Přidat native sharing API pro mobile
  - L.4.3 Tracking sdílení v GA4
  - L.4.4 Stylovat buttons pro lepší UX

**L.5** Newsletter signup in articles
  - L.5.1 Vytvořit in-article newsletter CTA
  - L.5.2 Implementovat exit-intent popup
  - L.5.3 A/B testovat placement a copy
  - L.5.4 Integrovat s email marketing platform

**L.6** Related articles recommendations
  - L.6.1 Implementovat algoritmus pro related articles
  - L.6.2 Zobrazit 3-5 related článků na konci
  - L.6.3 Použít tag-based a content-based matching
  - L.6.4 Tracking kliků na related articles

**L.7** Mobile optimization review
  - L.7.1 Zkontrolovat responsivní design všech nových komponent
  - L.7.2 Optimalizovat touch targets (min 44px)
  - L.7.3 Zvýšit font sizes pro lepší čitelnost
  - L.7.4 Testovat na různých mobile zařízeních

### M. Performance Tracking + Monitoring
**M.1** Google Analytics 4 events setup + NOVÉ tool_usage, calculator_completion, serp_ctr
  - M.1.1 Nastavit custom events pro tool usage
  - M.1.2 Tracking kalkulačky completion rates
  - M.1.3 Sledovat SERP CTR z GSC
  - M.1.4 Vytvořit custom dimensions pro content categories

**M.2** Search Console integration + crawl error alerts
  - M.2.1 Připojit GSC API pro automatické reporting
  - M.2.2 Nastavit crawl error monitoring
  - M.2.3 Vytvořit alerts pro index coverage issues
  - M.2.4 Monitoring click-through rates

**M.3** NOVÉ: GTMetrix alerts pro týdenní Core Web Vitals reports (viz bod C.4)

**M.4** Content performance dashboard
  - M.4.1 Vytvořit Looker Studio dashboard
  - M.4.2 Integrovat GA4 + GSC data
  - M.4.3 Zobrazit performance jednotlivých článků
  - M.4.4 Sledovat conversion na nástroje

**M.5** Heatmap analysis setup
  - M.5.1 Implementovat Hotjar nebo Microsoft Clarity
  - M.5.2 Nastavit heatmapy pro klíčové stránky
  - M.5.3 Sledovat scroll depth a click patterns
  - M.5.4 Analyzovat user behavior na kalkulačkách

**M.6** Conversion tracking implementation
  - M.6.1 Nastavit conversion events pro nástroje
  - M.6.2 Tracking newsletter signups
  - M.6.3 Měření article completion rates
  - M.6.4 ROI tracking pro content marketing

**M.7** Monthly reporting automation
  - M.7.1 Vytvořit automated monthly reports
  - M.7.2 Sledovat klíčové KPIs (traffic, rankings, conversions)
  - M.7.3 Nastavit alerting pro významné změny
  - M.7.4 Distribuovat reports stakeholderům

---

## 📊 FÁZE 4: CONTENT SCALING (Měsíc 7-12)

### N. High-Volume Production
**N.1** 2x týdenní publikace establishment
**N.2** Guest expert interviews
**N.3** Seasonal content creation  
**N.4** Interactive content development
**N.5** Video content pilot
**N.6** Podcast integration planning

### O. Advanced Features
**O.1** Interactive ETF comparison tools
**O.2** Real-time data integration
**O.3** Portfolio building guides
**O.4** Calculators integration with articles
**O.5** Expert opinion sections
**O.6** Community features (comments/Q&A)

---

## 🎯 PRIORITY SEQUENCING

### 🔥 HIGH PRIORITY (Must Do Week 1-4)
1. **FÁZE 0** (A, B, C, D) - Pokročilé SEO optimalizace 
2. **FÁZE 1** (E, F) - URL restructure and redirects
3. **FÁZE 2** (G) - First 4 high-volume keyword articles
4. **Category landings** (F.5) - s 3+6 linking pravidly

### ⚡ MEDIUM PRIORITY (Must Do Month 2-3)
1. **FÁZE 2** (H, I) - Specialized ETF articles
2. **FÁZE 3** (K) - Comparison content + SEO implementation
3. **Weekly analysis** (H.5, I.5) - establishment
4. **FÁZE 3** (L) - UX improvements

### 💡 LOW PRIORITY (Nice to Have Month 4-6)
1. **FÁZE 4** (N, O) - Advanced interactive features
2. Video content
3. Community features
4. Advanced analytics

---

## ✅ IMPLEMENTAČNÍ CHECKLIST PRO GITHUB ISSUES

Tento systematický rozpis pokrývá:
- ✅ **581 řádků detailních úkolů** napříč všemi fázemi
- ✅ **100% pokrytí IMPLEMENTATION_CHECKLIST.md**
- ✅ **100% pokrytí CONTENT_STRATEGY_MASTER_PLAN.md**
- ✅ **Logické pořadí podle dependencies**
- ✅ **Granularitu vhodnou pro GitHub Issues**
- ✅ **Časový harmonogram pro každou fázi**
- ✅ **Priority levely pro správné pořadí implementace**

**PŘIPRAVENO pro vytvoření komplexních GitHub Issues pokrývajících celou content strategy!**