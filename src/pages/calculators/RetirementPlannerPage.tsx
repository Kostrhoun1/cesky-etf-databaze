import React from 'react';
import Layout from '@/components/Layout';
import RetirementPlanner from '@/components/tools/RetirementPlanner';
import SEOHead from '@/components/SEO/SEOHead';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { PiggyBank, Target, TrendingUp, AlertTriangle } from 'lucide-react';

const RetirementPlannerPage: React.FC = () => {
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
        "name": "Penzijní plánovač 2025",
        "item": "https://etfpruvodce.cz/kalkulacky/penzijni-planovac"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Penzijní plánovač 2025 - FIRE kalkulačka",
    "description": "Spočítejte si, kolik potřebujete na penzi. 4% withdrawal rule, analýza inflace, výběrové strategie a dlouhodobé plánování finanční nezávislosti.",
    "url": "https://etfpruvodce.cz/kalkulacky/penzijni-planovac",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Výpočet potřebné částky na penzi",
      "4% withdrawal rule kalkulace",
      "Analýza vlivu inflace na penzi",
      "FIRE (Financial Independence Retire Early) plánování",
      "Různé výběrové strategie",
      "Optimalizace spoření na penzi"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Penzijní plánovač 2025 - FIRE kalkulačka | ETF průvodce.cz"
        description="✅ Spočítejte si, kolik potřebujete na penzi. 4% withdrawal rule, FIRE plánování, analýza inflace a výběrové strategie. Finanční nezávislost 2025."
        canonical="https://etfpruvodce.cz/kalkulacky/penzijni-planovac"
        keywords="penzijní plánovač, kalkulačka pro penzi, 4% rule, retirement planning, finanční nezávislost, FIRE 2025, early retirement"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-penzijni-planovac.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <PiggyBank className="w-4 h-4" />
            Penzijní plánovač 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Penzijní plánovač 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Spočítejte si, kolik potřebujete na penzi podle 4% withdrawal rule. 
            Naplánujte si cestu k finanční nezávislosti a předčasnému důchodu (FIRE).
          </p>
        </div>

        {/* Co je FIRE a 4% rule */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Co je FIRE a 4% withdrawal rule?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">FIRE (Financial Independence, Retire Early)</h3>
              <p className="text-gray-700 mb-4">
                FIRE je hnutí zaměřené na dosažení finanční nezávislosti a možnost předčasného odchodu do důchodu. 
                Cílem je nashromáždit dostatek peněz, aby výnosy z investic pokryly životní náklady.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Lean FIRE:</strong> Minimalistický přístup, 1-2 mil. Kč</li>
                <li>• <strong>Regular FIRE:</strong> Standardní životní styl, 5-10 mil. Kč</li>
                <li>• <strong>Fat FIRE:</strong> Luxusní život, 20+ mil. Kč</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">4% withdrawal rule</h3>
              <p className="text-gray-700 mb-4">
                Pravidlo říká, že můžete bezpečně vybírat 4% z investovaného portfolia ročně, 
                aniž byste vyčerpali kapitál. Vychází z historické analýzy 30-letých období.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Příklad:</strong> 5 mil. Kč → 200k Kč/rok výběru</li>
                <li>• <strong>Bezpečnost:</strong> 96% úspěšnost v historii</li>
                <li>• <strong>Flexibilita:</strong> Můžete upravit podle trhu</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Různé strategie odchodu do důchodu */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Státní důchod (65 let)</h3>
              <p className="text-gray-600 text-sm">
                <strong>Standardní cesta</strong><br/>
                Státní + druhý pilíř + vlastní spoření
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">FIRE (40-50 let)</h3>
              <p className="text-gray-600 text-sm">
                <strong>Předčasný důchod</strong><br/>
                Vysoké spoření + investice do ETF
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <PiggyBank className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Kombinované řešení</h3>
              <p className="text-gray-600 text-sm">
                <strong>Hybridní přístup</strong><br/>
                Částečná FI + práce na zkrácený úvazek
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Problém s inflací */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Pozor na inflaci!</h3>
              <p className="text-amber-700">
                Inflace znehodnocuje peníze v čase. Co stojí dnes 50 000 Kč, bude za 30 let při 3% inflaci stát 121 000 Kč! 
                <strong>Počítejte s reálnými částkami</strong> - kolik budete potřebovat v budoucích cenách, 
                ne v dnešních. 4% rule částečně inflaci zohledňuje, ale vaše výdaje porostou.
              </p>
            </div>
          </div>
        </div>

        {/* Strategie výběru z portfolia */}
        <div className="bg-white rounded-2xl border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Strategie výběru z portfolia</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-800">Bezpečné strategie</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">4% Fixed Rule</h4>
                  <p className="text-sm text-gray-600">Pevných 4% z počáteční částky, upraveno o inflaci ročně</p>
                </div>
                <div>
                  <h4 className="font-semibold">3.5% Conservative</h4>
                  <p className="text-sm text-gray-600">Konzervativnější přístup pro delší důchod (40+ let)</p>
                </div>
                <div>
                  <h4 className="font-semibold">Bond Tent</h4>
                  <p className="text-sm text-gray-600">Postupné navyšování dluhopisů s věkem</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Flexibilní strategie</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Dynamic Withdrawal</h4>
                  <p className="text-sm text-gray-600">Upravování výběru podle výkonnosti portfolia</p>
                </div>
                <div>
                  <h4 className="font-semibold">Bucket Strategy</h4>
                  <p className="text-sm text-gray-600">Rozdělení na krátkodobé, střednědobé a dlouhodobé investice</p>
                </div>
                <div>
                  <h4 className="font-semibold">Glide Path</h4>
                  <p className="text-sm text-gray-600">Postupné snižování rizika s blížícím se důchodem</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Samotná kalkulačka */}
        <RetirementPlanner />

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o penzijním plánování"
          faqs={[
            {
              question: "Co je 4% withdrawal rule a jak funguje?",
              answer: "4% withdrawal rule říká, že můžete bezpečně vybírat 4% z investovaného portfolia ročně bez vyčerpání kapitálu. Vychází z historické analýzy, která ukázala, že při 50/50 akcie/dluhopisy portfoliu vydrželo 96% 30-letých období. Příklad: s 5 mil. Kč můžete vybírat 200 000 Kč ročně."
            },
            {
              question: "Kolik peněz potřebujem na FIRE (předčasný důchod)?",
              answer: "Závisí na vašich výdajích. Podle 4% rule potřebujete 25x roční výdaje. Pokud potřebujete 500k Kč/rok, musíte mít 12,5 mil. Kč. Lean FIRE (1-3 mil.), Regular FIRE (5-15 mil.), Fat FIRE (20+ mil.). Nezapomeňte na inflaci - částky jsou v budoucích cenách!"
            },
            {
              question: "Je 4% rule bezpečné pro 40+ let důchodu?",
              answer: "Pro velmi dlouhé důchody (40+ let) je konzervativnější použít 3-3,5% rule. Původní studie se zaměřovala na 30 let. Také závisí na portfoliu - 100% akcie historicky vydržely i vyšší výběry, ale s větší volatilitou. Flexibilní strategie (úpravy podle trhu) zvyšují bezpečnost."
            },
            {
              question: "Jak zohlednit inflaci v penzijním plánování?",
              answer: "Inflace je kritická! 3% inflace zdvojnásobí ceny za 23 let. Počítejte s reálnými (inflací upravenými) částkami. Pokud dnes potřebujete 40k Kč měsíčně, za 30 let to bude při 3% inflaci 97k Kč měsíčně. Akciová portfolia historicky inflaci překonávají, ale plánujte konzervativně."
            },
            {
              question: "Jaké portfolio je nejlepší pro penzijní spoření?",
              answer: "Historicky nejlépe fungovala diverzifikovaná portfolia: 50-80% akcie (světové ETF), 20-50% dluhopisy/hotovost. V mladém věku více akcií (80-90%), s přibližujícím se důchodem postupné snižování rizika. Nejdůležitější jsou nízké poplatky - každé 1% TER snižuje konečnou sumu o desítky procent!"
            },
            {
              question: "Mám sporit na penzi nebo splácet hypotéku předčasně?",
              answer: "Závisí na úrokové sazbě hypotéky vs očekávaných výnosech z investic. Při hypotéce 3-4% a očekávaných výnosech 6-7% se vyplatí investovat. Ale zohledněte riziko - předčasné splácení je jisté, investice nejisté. Kompromis: část na hypotéku, část do investic. Daňové výhody hypotéky také počítejte."
            },
            {
              question: "Kdy je nejlepší začít s penzijním spořením?",
              answer: "Nejlepší čas byl včera, druhý nejlepší je dnes! Compound interest funguje nejlépe s časem. Kdo začne v 25 let, potřebuje investovat 3x méně než kdo začne ve 35. Dokonce i malé částky (2-5k měsíčně) mohou za 30-40 let narůst na miliony díky složenému úročení."
            }
          ]}
          className="mt-16"
        />

        {/* Související nástroje */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Investiční kalkulačka",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Spočítejte si růst investic do ETF fondů"
            },
            {
              title: "Nouzová rezerva",
              href: "/kalkulacky/nouzova-rezerva",
              description: "Rezerva je základ před investováním na penzi"
            },
            {
              title: "Monte Carlo simulátor",
              href: "/kalkulacky/monte-carlo-simulator",
              description: "Analýza rizik penzijního portfolia"
            },
            {
              title: "All Weather Portfolio",
              href: "/tipy/all-weather-portfolio",
              description: "Diverzifikovaná strategie pro dlouhodobé spoření"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default RetirementPlannerPage;