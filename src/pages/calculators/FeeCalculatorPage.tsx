import React from 'react';
import Layout from '@/components/Layout';
import FeeCalculator from '@/components/tools/FeeCalculator';
import SEOHead from '@/components/SEO/SEOHead';
import BreadcrumbNav from '@/components/SEO/BreadcrumbNav';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, Calculator, AlertTriangle, DollarSign } from 'lucide-react';

const FeeCalculatorPage: React.FC = () => {
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
        "name": "Kalkulačka poplatků ETF",
        "item": "https://etfpruvodce.cz/kalkulacky/kalkulacka-poplatku-etf"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kalkulačka poplatků ETF 2025 - TER a dopad na výnosy",
    "description": "Spočítejte si dopad poplatků ETF na dlouhodobé výnosy. Srovnání TER, transakčních poplatků a jejich vliv na investice do ETF fondů.",
    "url": "https://etfpruvodce.cz/kalkulacky/kalkulacka-poplatku-etf",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Výpočet dopadu TER na dlouhodobé výnosy",
      "Srovnání různých ETF podle poplatků",
      "Analýza transakčních nákladů",
      "Compound efekt poplatků",
      "Optimalizace nákladů na investice",
      "Kalkulace skrytých poplatků"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Kalkulačka poplatků ETF 2025 - TER a dopad na výnosy | ETF průvodce.cz"
        description="✅ Spočítejte si dopad poplatků ETF na dlouhodobé výnosy. Srovnání TER, transakčních poplatků a jejich vliv na investice do ETF fondů. Zdarma 2025."
        canonical="https://etfpruvodce.cz/kalkulacky/kalkulacka-poplatku-etf"
        keywords="kalkulačka poplatků ETF, TER kalkulačka, poplatky ETF fondů, dopad poplatků na výnosy, srovnání poplatků 2025, náklady ETF"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-kalkulacka-poplatku.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav
          items={[
            { name: "Domů", href: "/" },
            { name: "Kalkulačky", href: "/nastroje" },
            { name: "Kalkulačka poplatků ETF" }
          ]}
        />

        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingDown className="w-4 h-4" />
            Kalkulačka poplatků ETF 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kalkulačka poplatků ETF 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Analyzujte dopad různých poplatků na váš dlouhodobý výnos z ETF investic. 
            Každé procento poplatku může stát desetitisíce korun za 20 let!
          </p>
        </div>

        {/* Proč jsou poplatky důležité */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Proč jsou poplatky ETF tak důležité?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-800">Compound efekt poplatků</h3>
              <p className="text-gray-700 mb-4">
                Poplatky se účtují každý rok z celé investice, ne jen z původní částky. 
                Díky složenému úročení malý rozdíl v poplatcích znamená obrovský rozdíl v konečné sumě.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-800">Příklad: 500k Kč na 20 let při 7% výnosu</p>
                <ul className="space-y-1 text-sm text-gray-700 mt-2">
                  <li>• <strong>TER 0,1%:</strong> 1,87 mil. Kč</li>
                  <li>• <strong>TER 0,5%:</strong> 1,73 mil. Kč</li>
                  <li>• <strong>Rozdíl:</strong> 140k Kč!</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-800">Skryté náklady</h3>
              <p className="text-gray-700 mb-4">
                TER není jediný poplatek! Existují i transakční náklady, spreadové náklady, 
                poplatky brokerů a daně. Všechny ovlivňují váš reálný výnos.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>TER:</strong> Roční správa fondu (0,1-1%)</li>
                <li>• <strong>Spread:</strong> Rozdíl bid/ask (0,01-0,5%)</li>
                <li>• <strong>Broker fee:</strong> Transakční poplatek (0-15 EUR)</li>
                <li>• <strong>FX costs:</strong> Kurzové náklady (0,1-0,5%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Typy poplatků ETF */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">TER</h3>
              <p className="text-gray-600 text-sm">
                Total Expense Ratio - roční poplatek za správu fondu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Transakční</h3>
              <p className="text-gray-600 text-sm">
                Poplatky brokera za nákup a prodej ETF
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Spread</h3>
              <p className="text-gray-600 text-sm">
                Rozdíl mezi nákupní a prodejní cenou
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Skryté</h3>
              <p className="text-gray-600 text-sm">
                FX náklady, tracking error, daně
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Srovnání populárních ETF */}
        <div className="bg-white rounded-2xl border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Srovnání TER populárních ETF (2025)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-800">✅ Nízké poplatky (TER ≤ 0,2%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">CSPX (S&P 500)</span>
                  <span className="text-green-700 font-bold">0,07%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">VWCE (World)</span>
                  <span className="text-green-700 font-bold">0,22%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">EUNL (Europe)</span>
                  <span className="text-green-700 font-bold">0,10%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">XEON (Euro bonds)</span>
                  <span className="text-green-700 font-bold">0,09%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-800">❌ Vysoké poplatky (TER > 0,5%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-semibold">Aktivní fondy</span>
                  <span className="text-red-700 font-bold">1,5-2,5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-semibold">Sektorové ETF</span>
                  <span className="text-red-700 font-bold">0,4-0,8%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-semibold">Smart beta ETF</span>
                  <span className="text-red-700 font-bold">0,3-0,6%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-semibold">Komoditní ETF</span>
                  <span className="text-red-700 font-bold">0,4-0,7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jak minimalizovat poplatky */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Jak minimalizovat poplatky ETF</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold mb-2">Vyberte ETF s nízkým TER</h3>
                <p className="text-gray-700">Pro široké indexy hledejte TER pod 0,2%. Rozdíl mezi 0,1% a 0,5% TER může být za 20 let stát stovky tisíc korun.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold mb-2">Využívejte akce brokerů</h3>
                <p className="text-gray-700">DEGIRO Free lista, XTB 0% do 100k EUR, Trading212 0% poplatky. Šetří stovky až tisíce korun ročně na transakčních poplatcích.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold mb-2">Investujte větší částky méně často</h3>
                <p className="text-gray-700">Raději 10k Kč jednou za 2 měsíce než 5k každý měsíc, pokud platíte fixní poplatek za transakci.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold mb-2">Držte dlouhodobě</h3>
                <p className="text-gray-700">Časté obchodování zvyšuje transakční náklady. Buy and hold přístup minimalizuje poplatky a maximalizuje compound interest.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Samotná kalkulačka */}
        <FeeCalculator />

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o poplatcích ETF"
          faqs={[
            {
              question: "Co je TER u ETF fondů a jak funguje?",
              answer: "TER (Total Expense Ratio) je roční poplatek za správu ETF fondu, obvykle 0,1-0,7%. Například TER 0,2% znamená, že z investice 100 000 Kč zaplatíte ročně 200 Kč. TER se odečítá automaticky z výkonnosti fondu - nevidíte ho přímo na výpisu, ale snižuje váš výnos."
            },
            {
              question: "Jaký je rozdíl mezi TER 0,1% a 0,5% za 20 let?",
              answer: "Obrovský! Při investici 500k Kč na 20 let s 7% ročním výnosem: TER 0,1% = 1,87 mil. Kč, TER 0,5% = 1,73 mil. Kč. Rozdíl 140k Kč! Každé 0,1% TER snižuje konečnou sumu o desítky tisíc korun kvůli compound efektu."
            },
            {
              question: "Které ETF mají nejnižší poplatky v roce 2025?",
              answer: "Nejnižší TER mají: CSPX (S&P 500) 0,07%, EUNL (Europe 600) 0,10%, VWCE (FTSE All-World) 0,22%, XEON (Euro govt bonds) 0,09%. Pro široké indexy vždy hledejte TER pod 0,25%. Aktivní fondy s 1,5-2% TER se dlouhodobě nevyplatí."
            },
            {
              question: "Jaké jsou další skryté poplatky kromě TER?",
              answer: "Kromě TER platíte: transakční poplatky brokera (0-15 EUR), bid/ask spread (0,01-0,5%), kurzové náklady při převodu měn (0,1-0,5%), daně z výnosů (15% v ČR). Celkové náklady mohou být 2-3x vyšší než samotný TER!"
            },
            {
              question: "Vyplatí se platit vyšší TER za aktivní management?",
              answer: "Statisticky ne. 80-90% aktivních fondů dlouhodobě nedokáže překonat index ani po odečtení poplatků. Vysoké poplatky (1,5-2,5% TER) znamenají, že fond musí dosáhnout výrazně lepšího výkonu jen pro pokrytí nákladů. Pro většinu investorů jsou levné indexové ETF lepší volba."
            },
            {
              question: "Jak minimalizovat transakční poplatky?",
              answer: "Využívejte akce brokerů: DEGIRO Free lista (300+ ETF zdarma), XTB 0% do 100k EUR, Trading212 0% poplatky. Investujte větší částky méně často místo malých pravidelných. Držte dlouhodobě - časté obchodování zvyšuje náklady. Jeden nákup za 3 měsíce je často lepší než měsíční DCA."
            },
            {
              question: "Mění se TER ETF v čase?",
              answer: "TER se může měnit, ale obvykle jen mírně a s předchozím oznámením. Může klesnout kvůli konkurenci nebo růstu fondu (úspory z rozsahu), nebo vzrůst kvůli vyšším nákladům. Sledujte TER svých ETF ročně - pokud se výrazně zvýší, zvažte přesun do levnějšího alternativního fondu."
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
              description: "Porovnejte TER různých ETF fondů"
            },
            {
              title: "Investiční kalkulačka",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Spočítejte si čisté výnosy po poplatcích"
            },
            {
              title: "Srovnání brokerů",
              href: "/srovnani-brokeru",
              description: "Najděte brokera s nejnižšími poplatky"
            },
            {
              title: "Nejlepší ETF 2025",
              href: "/tipy/nejlepsi-etf-2025",
              description: "ETF s optimálním poměrem nákladů a kvality"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default FeeCalculatorPage;