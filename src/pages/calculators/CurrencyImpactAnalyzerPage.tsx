import React, { Suspense, lazy } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';

// Lazy loading pro méně kritické komponenty (CWV optimalizace)
const CurrencyImpactAnalyzer = lazy(() => import('@/components/tools/CurrencyImpactAnalyzer'));
const HedgedVsUnhedgedComparison = lazy(() => import('@/components/tools/HedgedVsUnhedgedComparison'));
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

        {/* Nová sekce: Analýza hedging nákladů */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-orange-800 mb-4">💰 Skutečné náklady hedged ETF</h2>
              <p className="text-orange-700 mb-4">
                <strong>Hedging není zadarmo!</strong> U EUR-hedged fondů nejde jen o vyšší TER. 
                Celkové náklady = <strong>TER + Carry Cost + Rollování forwardů</strong>
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-orange-800 mb-3">Carry Cost vysvětlení:</h3>
                <div className="text-sm text-orange-700 space-y-2">
                  <p><strong>Carry = rozdíl krátkých úrokových sazeb</strong></p>
                  <p>• Když USD sazby &gt; EUR sazby → negativní carry (náklad)</p>
                  <p>• Když EUR sazby &gt; USD sazby → pozitivní carry (příjem)</p>
                  <p>• Aktuálně (2024/25): USD Fed ~5.5%, EUR ECB ~4.5% = -1% carry ročně</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">CSPX (Unhedged)</h4>
                  <p className="text-orange-700">• TER: 0.07% ročně</p>
                  <p className="text-orange-700">• Carry cost: 0%</p>
                  <p className="text-orange-700">• <strong>Celkem: 0.07%</strong></p>
                  <p className="text-orange-700">• Měnové riziko: plné USD/EUR</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">CSHG (EUR Hedged)</h4>
                  <p className="text-orange-700">• TER: 0.10% ročně</p>
                  <p className="text-orange-700">• Carry cost: ~-1.0% ročně*</p>
                  <p className="text-orange-700">• <strong>Celkem: ~1.10%</strong></p>
                  <p className="text-orange-700">• Měnové riziko: jen EUR/CZK</p>
                </div>
              </div>

              <p className="text-xs text-orange-600 mt-3">
                *Carry cost se mění s úrokovými sazbami. Při zúžení spreadu USD-EUR se snižuje.
              </p>
            </div>
          </div>
        </div>

        {/* Live srovnání hedged vs unhedged ETF z databáze */}
        <Suspense 
          fallback={
            <div className="bg-white rounded-2xl border p-8 mb-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-100 rounded"></div>
                <div className="h-32 bg-gray-100 rounded"></div>
              </div>
            </div>
          }
        >
          <HedgedVsUnhedgedComparison />
        </Suspense>

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
              answer: "Ano, a je to dražší než jen rozdíl v TER! CSPX má TER 0,07%, CSHG má 0,10%. ALE skutečné náklady hedgingu zahrnují i carry cost = rozdíl úrokových sazeb. Aktuálně USD sazby ~5.5%, EUR ~4.5% = další -1% ročně. Celkové náklady CSHG: ~1.10% vs 0.07% u CSPX."
            },
            {
              question: "Co je to carry cost u hedged ETF?",
              answer: "Carry cost = implicitní náklad/příjem z rozdílu úrokových sazeb měn. Hedged ETF používají forwardy, kde je automaticky zabudován rozdíl sazeb. Když USD sazby > EUR sazby (jako nyní), carry je negativní = dodatečný náklad ~1% ročně. Když se sazby obrátí, může být carry pozitivní."
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