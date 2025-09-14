import React from 'react';
import Layout from '@/components/Layout';
import CurrencyImpactAnalyzer from '@/components/tools/CurrencyImpactAnalyzer';
import SEOHead from '@/components/SEO/SEOHead';
import BreadcrumbNav from '@/components/SEO/BreadcrumbNav';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
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
        title="Analýza kurzového dopadu ETF 2025 - Currency Hedging | ETF průvodce.cz"
        description="✅ Analyzujte vliv kurzových změn na ETF portfolio. Měnové riziko, hedging strategie a optimalizace pro české investory. Hedged vs unhedged ETF."
        canonical="https://etfpruvodce.cz/kalkulacky/kurzovy-dopad-etf"
        keywords="kurzový dopad, currency hedging, měnové riziko, USD CZK, EUR CZK, ETF hedging 2025, hedged ETF, unhedged ETF"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-kurzovy-dopad-etf.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav
          items={[
            { name: "Domů", href: "/" },
            { name: "Kalkulačky", href: "/nastroje" },
            { name: "Kurzový dopad ETF" }
          ]}
        />

        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="w-4 h-4" />
            Analýza kurzového rizika ETF
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Analýza kurzového dopadu ETF 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Analyzujte vliv kurzových změn na vaše ETF portfolio a optimalizujte měnové riziko. 
            Srovnání hedged vs unhedged ETF pro české investory.
          </p>
        </div>

        {/* Důležité upozornění */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Měnové riziko vs výnosy</h3>
              <p className="text-amber-700">
                Kurzové změny mohou významně ovlivnit výnosy z ETF. USD/CZK kurz se pohyboval v posledních 10 letech 
                mezi 18-27 korunami. <strong>20% změna kurzu znamená 20% dopad na výnosy!</strong> 
                Hedged ETF eliminují toto riziko za cenu mírně vyšších poplatků.
              </p>
            </div>
          </div>
        </div>

        {/* Výhody analyzátoru */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Měnová expozice</h3>
              <p className="text-gray-600">
                Analyzujte kolik procent portfolia je vystaveno kurzovému riziku USD, EUR a dalších měn.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scénářová analýza</h3>
              <p className="text-gray-600">
                Simulace dopadu různých kurzových změn na hodnotu vašeho portfolia v korunách.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hedging strategie</h3>
              <p className="text-gray-600">
                Porovnání hedged a unhedged ETF včetně nákladů na zajištění proti kurzovému riziku.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hedged vs Unhedged ETF */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hedged vs Unhedged ETF - co zvolit?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-800">Hedged ETF (zajištěné proti kurzu)</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <p className="text-gray-700"><strong>Eliminuje měnové riziko</strong> - výnos nezávisí na kurzu CZK/USD</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <p className="text-gray-700"><strong>Stabilnější výnosy</strong> - fokus pouze na výkon indexu</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">✗</div>
                  <p className="text-gray-700"><strong>Vyšší poplatky</strong> - TER o 0,1-0,3% vyšší</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">✗</div>
                  <p className="text-gray-700"><strong>Ztráta měnových zisků</strong> - při oslabení koruny</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-800">Unhedged ETF (nezajištěné)</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <p className="text-gray-700"><strong>Nižší poplatky</strong> - standardní TER bez hedge nákladů</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <p className="text-gray-700"><strong>Měnové zisky</strong> - při oslabení koruny rostou výnosy</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">✗</div>
                  <p className="text-gray-700"><strong>Měnové riziko</strong> - při posílení koruny klesají výnosy</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">✗</div>
                  <p className="text-gray-700"><strong>Větší volatilita</strong> - výnosy ovlivněné kurzem</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historický kontext kurzů */}
        <div className="bg-white rounded-2xl border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Historický vývoj kurzů CZK</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">USD/CZK historicky</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>2015:</strong> 25-27 CZK/USD (slabá koruna)</li>
                <li>• <strong>2020:</strong> 22-24 CZK/USD (COVID volatilita)</li>
                <li>• <strong>2022:</strong> 20-25 CZK/USD (válka na Ukrajině)</li>
                <li>• <strong>2024:</strong> 22-24 CZK/USD (současnost)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Pozorování:</strong> Dlouhodobě se CZK pohybuje v pásmu 20-27 za USD
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Dopad na ETF výnosy</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>27→22 CZK/USD:</strong> +23% k výnosu z hedg.</li>
                <li>• <strong>22→27 CZK/USD:</strong> -18% k výnosu z hedg.</li>
                <li>• <strong>Roční volatilita:</strong> 10-15% typicky</li>
                <li>• <strong>Dlouhodobý trend:</strong> Mírné oslabování CZK</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Závěr:</strong> Měnové riziko může převážit výnosy z ETF!
              </p>
            </div>
          </div>
        </div>

        {/* Samotný analyzátor */}
        <CurrencyImpactAnalyzer />

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o kurzovém dopadu ETF"
          faqs={[
            {
              question: "Co je měnové riziko u ETF fondů?",
              answer: "Měnové riziko vzniká, když investujete do ETF denominovaných v jiné měně než je koruna. Například americké ETF jsou v USD - když dolar oslabí vůči koruně, vaše investice v korunách klesne, i když ETF v dolarech rostl. Naopak při oslabení koruny vaše investice v korunách roste."
            },
            {
              question: "Jak fungují hedged ETF?",
              answer: "Hedged ETF používají měnové deriváty (forward kontrakty) k eliminaci kurzového rizika. Fond automaticky 'zajišťuje' měnovou expozici proti domácí měně investora. Například S&P 500 hedged ETF pro evropské investory eliminuje riziko EUR/USD kurzu, takže výnos odpovídá pouze výkonu S&P 500 indexu."
            },
            {
              question: "Jsou hedged ETF dražší než unhedged?",
              answer: "Ano, hedged ETF mají obvykle o 0,1-0,3% vyšší TER kvůli nákladům na hedging. Například CSPX (unhedged) má TER 0,07%, zatímco CSHG (hedged) má 0,05%. Hedge náklady se ale promítají do výkonnosti, takže celkové náklady jsou vyšší o hedging costs."
            },
            {
              question: "Kdy se vyplatí hedged ETF pro české investory?",
              answer: "Hedged ETF se vyplatí, když očekáváte posilování koruny nebo chcete stabilnější výnosy bez kurzové volatility. Jsou vhodné pro konzervativnější investory nebo když už máte dostatečnou měnovou diverzifikaci v portfoliu. Pro dlouhodobé investory může být unhedged varianta výhodnější kvůli nižším poplatkům."
            },
            {
              question: "Jak velký dopad má kurz na výnosy z ETF?",
              answer: "Kurzový dopad může být velmi významný. Při změně kurzu o 20% se vaše výnosy změní o stejných 20% (v opačném směru). Například: ETF v USD rostl o 10%, ale CZK posílila o 15% - váš výnos v korunách bude -5%. Proto je důležité počítat s měnovým rizikem při plánování portfolia."
            },
            {
              question: "Jaká je optimální měnová alokace pro české investory?",
              answer: "Závisí na osobních preferencích a očekáváních. Konzervativní přístup: 50% CZK/EUR (hedged), 50% USD/ostatní. Agresivní: 70-80% zahraniční měny (unhedged). Většina českých investorů má přirozeně měnové riziko (příjmy v CZK), takže určitá zahraniční expozice může portfolio diversifikovat."
            },
            {
              question: "Mění se hedge poměr u hedged ETF?",
              answer: "Ano, fondy pravidelně (obvykle měsíčně) upravují hedge poměr na 100% měnového zajištění. Mezi úpravami může dojít k částečné expozici kvůli změnám hodnoty portfolia. Některé fondy používají dynamické hedging, které reaguje rychleji na tržní změny, ale za vyšší náklady."
            }
          ]}
          className="mt-16"
        />

        {/* Související nástroje */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Srovnání ETF fondů",
              href: "/srovnani-etf",
              description: "Najděte hedged a unhedged varianty ETF"
            },
            {
              title: "Investiční kalkulačka",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Spočítejte si celkové výnosy včetně kurzů"
            },
            {
              title: "Monte Carlo simulátor",
              href: "/kalkulacky/monte-carlo-simulator",
              description: "Analýza portfoliových rizik včetně měnových"
            },
            {
              title: "Nejlepší ETF na americké akcie",
              href: "/tipy/nejlepsi-etf-na-americke-akcie",
              description: "USD ETF a jejich hedging varianty"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default CurrencyImpactAnalyzerPage;