import React, { Suspense, lazy } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';

// Lazy loading pro méně kritické komponenty (CWV optimalizace)
const CurrencyImpactAnalyzer = lazy(() => import('@/components/tools/CurrencyImpactAnalyzer'));
const FAQSection = lazy(() => import('@/components/SEO/FAQSection'));
const InternalLinking = lazy(() => import('@/components/SEO/InternalLinking'));
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, Shield, AlertTriangle } from 'lucide-react';

const CurrencyImpactAnalyzerPage: React.FC = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Domů",
        "item": "https://etfpruvodce.cz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kalkulačky",
        "item": "https://etfpruvodce.cz/nastroje"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Analýza kurzového dopadu ETF",
        "item": "https://etfpruvodce.cz/kalkulacky/kurzovy-dopad-etf"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Analýza kurzového dopadu ETF 2025 - Currency Hedging",
    "description": "Analyzujte vliv kurzových změn na ETF portfolio. Měnové riziko, hedging strategie a optimalizace pro české investory.",
    "url": "https://etfpruvodce.cz/kalkulacky/kurzovy-dopad-etf",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Analýza měnové expozice portfolia",
      "Srovnání hedged vs unhedged ETF",
      "Scénářová analýza kurzových změn",
      "Doporučení pro české investory",
      "Historická analýza kurzů CZK/USD/EUR",
      "Optimalizace měnového rizika"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Kalkulačka kurzového dopadu ETF 2025 ⚡ Měnové riziko USD/EUR/CZK | ETF průvodce.cz"
        description="🎯 Spočítejte kurzový dopad ETF za 2 min. CSPX má 100% USD riziko! EUR hedged ≠ CZK hedged. Monte Carlo analýza + 5 reálných scénářů. Optimalizace pro ČR."
        canonical="https://etfpruvodce.cz/kalkulacky/kurzovy-dopad-etf"
        keywords="kalkulačka kurzový dopad ETF, měnové riziko CSPX VWCE, USD CZK kurz ETF, EUR hedged vs unhedged, currency hedging CZK 2025, ETF expozice USD EUR"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-kurzovy-dopad-etf.jpg"
      />
      
      {/* CWV optimalizace - preload kritických zdrojů */}
      <link rel="preload" as="style" href="/css/critical.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* SERP-first shrnutí s intent formulemi */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Analýza kurzového dopadu ETF 2025 🎯
            </h1>
            <div className="bg-white p-4 rounded-lg border mb-4">
              <h2 className="text-lg font-semibold text-green-800 mb-3">📊 5-bodové shrnutí pro rychlé rozhodnutí:</h2>
              <div className="grid md:grid-cols-5 gap-3 text-sm">
                <div className="bg-red-50 p-3 rounded text-center">
                  <div className="font-bold text-red-700">⚠️ Klíčové</div>
                  <div className="text-red-600">Měna fondu ≠ měna expozice</div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="font-bold text-blue-700">💰 USD ETF</div>
                  <div className="text-blue-600">CSPX má 100% USD riziko</div>
                </div>
                <div className="bg-orange-50 p-3 rounded text-center">
                  <div className="font-bold text-orange-700">🛡️ Hedging</div>
                  <div className="text-orange-600">EUR hedged ≠ CZK hedged</div>
                </div>
                <div className="bg-purple-50 p-3 rounded text-center">
                  <div className="font-bold text-purple-700">📈 Dopad</div>
                  <div className="text-purple-600">20% kurz = 20% portfolio</div>
                </div>
                <div className="bg-green-50 p-3 rounded text-center">
                  <div className="font-bold text-green-700">🔧 Řešení</div>
                  <div className="text-green-600">Analýza + optimalizace</div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 text-center mb-6">
              <strong>Výsledek za 2 minuty:</strong> Spočítejte kurzový dopad ETF portfolia a optimalizujte 
              <a href="/srovnani-etf" className="text-blue-600 hover:underline font-semibold"> výběr nejlepších ETF fondů</a> podle měnové expozice.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <p className="text-blue-800 mb-3">
                <strong>Před analýzou doporučujeme:</strong> Seznamte se s <a href="/nastroje" className="text-blue-600 hover:underline font-semibold">kompletním portfoliem investičních nástrojů</a> a prostudujte si <a href="/tipy/nejlepsi-etf-na-americke-akcie" className="text-blue-600 hover:underline font-semibold">příručku pro výběr amerických ETF</a> s hedging strategiemi.
              </p>
            </div>
          </div>
        </div>

        {/* Samotný analyzátor - hned na začátku s Suspense (CWV optimalizace) */}
        <Suspense 
          fallback={
            <div className="bg-white rounded-2xl border p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-48 bg-gray-100 rounded"></div>
                <div className="h-48 bg-gray-100 rounded"></div>
              </div>
              <div className="h-12 bg-blue-100 rounded mt-6"></div>
            </div>
          }
        >
          <CurrencyImpactAnalyzer />
        </Suspense>

        {/* Klíčová informace o měnové expozici */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-12 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-red-800 mb-2">⚠️ Klíčové: Měna fondu ≠ Měna expozice!</h2>
              <p className="text-red-700 mb-3">
                <strong>CSPX je EUR fond, ale má 100% USD expozici!</strong> Kupuje americké akcie, takže vaše výnosy závisí na USD/CZK kurzu, ne EUR/CZK.
              </p>
              <p className="text-red-700 mb-3">
                <strong>VWCE je EUR fond s globální expozicí!</strong> ~60% USA (USD), ~30% Evropa (EUR), ~10% Asie (mix měn).
              </p>
              <p className="text-red-700">
                <strong>Pouze EUR hedged verze</strong> (např. CSHG) eliminují EUR/USD riziko. EUR/CZK riziko zůstává!
              </p>
            </div>
          </div>
        </div>

        {/* Praktické příklady měnové expozice */}
        <div className="bg-white rounded-2xl border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Praktické příklady měnové expozice ETF</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Populární ETF a jejich skutečná expozice</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold"><a href="/etf/cspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CSPX</a> (iShares S&P 500 EUR)</p>
                  <p className="text-sm text-blue-700">Měna fondu: EUR | Expozice: 100% USD</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="font-semibold"><a href="/etf/vwce" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">VWCE</a> (Vanguard All-World EUR)</p>
                  <p className="text-sm text-purple-700">Měna fondu: EUR | Expozice: ~60% USD, ~30% EUR, ~10% ostatní</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold"><a href="/etf/eunl" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">EUNL</a> (Amundi MSCI Europe EUR)</p>
                  <p className="text-sm text-green-700">Měna fondu: EUR | Expozice: 100% EUR</p>
                </div>
                <div className="mt-4 text-center">
                  <a 
                    href="/srovnani-etf" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Otevřít v porovnání ETF
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-800">EUR Hedged varianty</h3>
              <div className="space-y-3">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="font-semibold"><a href="/etf/cshg" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">CSHG</a> (S&P 500 EUR Hedged)</p>
                  <p className="text-sm text-orange-700">Eliminuje EUR/USD riziko, zůstává EUR/CZK</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="font-semibold text-red-800">⚠️ CZK hedged ETF</p>
                  <p className="text-sm text-red-700">NEEXISTUJÍ! Žádný ETF není zajištěn proti CZK</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pokročilé zajištění proti CZK */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Pokročilé metody zajištění proti CZK</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Institucionální nástroje</h4>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-slate-800">Currency Forward/SWAP kontrakty</p>
                  <p>Dostupnost: Prime Brokerage (IBKR Pro, Saxo Capital Markets)</p>
                  <p>Minimální objem: obvykle 50 000+ EUR/USD</p>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-slate-800">OTC deriváty na CZK</p>
                  <p>Poskytovatelé: velké investiční banky (DB, JPM, CS)</p>
                  <p>Přístup: institucionální a HNWI klienti</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Retail alternativy</h4>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-slate-800">Forex short CZK pozice</p>
                  <p>Platformy: MetaTrader, cTrader, TradingView</p>
                  <p>Páry: EUR/CZK short, USD/CZK short</p>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-slate-800">CFD na měnové páry</p>
                  <p>Brokeři: XTB, Plus500, eToro</p>
                  <p>Leverage: 1:30 (retail), nákladnější než hedging</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-amber-600 text-lg">⚠️</span>
              <div>
                <p className="font-semibold text-amber-800 mb-1">Upozornění pro pokročilé investory</p>
                <p className="text-sm text-amber-700">
                  Měnové zajištění vyžaduje aktivní správu pozic, pochopení derivátových nástrojů a řízení rizika. 
                  Nepřesné zajištění může vyvolat dodatečné ztráty. Vhodné pouze pro sofistikované investory 
                  s dostatečným kapitálem a odbornými znalostmi.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* FAQ sekce s lazy loading */}
        <Suspense 
          fallback={
            <div className="bg-white rounded-2xl border p-8 animate-pulse mt-16">
              <div className="h-6 bg-gray-200 rounded mb-6 w-1/3"></div>
              <div className="space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          }
        >
          <FAQSection
          title="Často kladené otázky o kurzovém dopadu ETF"
          faqs={[
            {
              question: "Proč měna fondu není to samé jako měnová expozice?",
              answer: "Měna fondu je jen technická záležitost - můžete koupit CSPX za eura, ale stále kupujete americké akcie. Vaše výnosy závisí na USD/CZK kurzu, ne EUR/CZK! Měnová expozice vzniká z podkladových aktiv - kam fond investuje peníze."
            },
            {
              question: "Jak fungují EUR hedged ETF verze?",
              answer: "EUR hedged ETF (např. CSHG) používají deriváty k eliminaci rizika mezi EUR a USD. Pokud kupuje americké akcie, zajistí si, že změny USD/EUR kurzu neovlivní výnosy v eurech. ALE pro české investory stále zůstává EUR/CZK riziko!"
            },
            {
              question: "Existují ETF zajištěné proti CZK?",
              answer: "NE! ETF zajištěné proti CZK neexistují. Dostupné jsou pouze EUR zajištěné ETF, které eliminují EUR/USD riziko. Pro zajištění proti CZK musíte použít currency SWAP kontrakty, forex pozice nebo futures - což vyžaduje pokročilé znalosti."
            },
            {
              question: "Jsou EUR zajištěné ETF dražší?",
              answer: "Ano, mají mírně vyšší TER kvůli nákladům na hedging. Například CSPX (nezajištěný) má TER 0,07%, zatímco CSHG (EUR zajištěný) má TER 0,10%. Rozdíl ~0,03% ročně za eliminaci EUR/USD volatility."
            },
            {
              question: "Jak velký dopad má kurz na výnosy z ETF?",
              answer: "Kurzový dopad může být obrovský! Při změně kurzu o 20% se vaše výnosy změní o stejných 20%. Příklad: CSPX rostl o 10% v USD, ale CZK posílila o 15% vůči USD - váš výnos v korunách je -5%! Proto je klíčové chápat skutečnou měnovou expozici."
            },
            {
              question: "Jak se můžu zajistit proti CZK?",
              answer: "1) Currency SWAP kontrakty u pokročilých brokerů (IBKR, XTB), 2) Krátké CZK pozice přes forex, 3) CZK futures (omezená dostupnost). Varování: Vyžaduje pokročilé znalosti derivátů a správu rizika. Není vhodné pro začátečníky."
            },
            {
              question: "Jak se orientovat v měnové expozici ETF?",
              answer: "1) Nesledujte měnu fondu, ale podkladová aktiva. 2) US akcie = USD expozice bez ohledu na to, že fond je v EUR. 3) EUR hedged verze eliminují jen EUR/USD riziko, ne EUR/CZK. 4) Pro Čechy je každý zahraniční ETF kurzově rizikový."
            }
          ]}
          className="mt-16"
        />
        </Suspense>

        {/* Související nástroje s rozšířenými hub odkazy a lazy loading */}
        <Suspense 
          fallback={
            <div className="bg-white rounded-2xl border p-8 animate-pulse mt-16">
              <div className="h-6 bg-gray-200 rounded mb-6 w-1/4"></div>
              <div className="grid md:grid-cols-2 gap-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-20 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          }
        >
          <InternalLinking
          relatedLinks={[
            {
              title: "Srovnání ETF fondů - Hedged vs Unhedged",
              href: "/srovnani-etf",
              description: "Najděte hedged a unhedged varianty ETF s detailní analýzou TER a tracking error"
            },
            {
              title: "Investiční kalkulačka s kurzovými dopady",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Spočítejte si celkové výnosy včetně kurzových změn a inflace"
            },
            {
              title: "Monte Carlo simulátor portfoliových rizik",
              href: "/kalkulacky/monte-carlo-simulator",
              description: "Pokročilá analýza portfoliových rizik včetně měnových fluktuací"
            },
            {
              title: "Nejlepší ETF na americké akcie 2025",
              href: "/tipy/nejlepsi-etf-na-americke-akcie",
              description: "USD ETF a jejich hedging varianty - CSPX vs CSHG analýza"
            },
            {
              title: "Kompletní přehled investičních nástrojů",
              href: "/nastroje",
              description: "Všechny kalkulačky, simulátory a analytické nástroje na jednom místě"
            },
            {
              title: "ETF strategie pro české investory",
              href: "/tipy",
              description: "Praktické rady pro měnové zajištění a optimalizaci portfolia"
            },
            {
              title: "Kalkulačka ETF poplatků a nákladů",
              href: "/kalkulacky/etf-poplatky",
              description: "Spočítejte si skutečné náklady ETF včetně skrytých poplatků"
            },
            {
              title: "Portfolio rebalancing kalkulačka",
              href: "/kalkulacky/portfolio-rebalancing",
              description: "Optimalizujte rozložení portfolia s ohledem na měnové riziko"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
        </Suspense>
      </div>
    </Layout>
  );
};

export default CurrencyImpactAnalyzerPage;