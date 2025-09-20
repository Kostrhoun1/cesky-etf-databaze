import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import InvestmentCalculator from '@/components/tools/InvestmentCalculator';
import SEOHead from '@/components/SEO/SEOHead';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calculator, PiggyBank, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestmentCalculatorPage: React.FC = () => {
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
        "name": "Investiční kalkulačka 2025",
        "item": "https://etfpruvodce.cz/kalkulacky/investicni-kalkulacka"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Investiční kalkulačka 2025 - Pravidelné investování",
    "description": "Bezplatná investiční kalkulačka pro výpočet výnosů z pravidelného měsíčního investování do ETF fondů. Včetně daní, inflace a složeného úročení.",
    "url": "https://etfpruvodce.cz/kalkulacky/investicni-kalkulacka",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Compound interest výpočty",
      "Simulace pravidelného měsíčního investování", 
      "Zohlednění daní z výnosů",
      "Analýza vlivu inflace",
      "Grafické znázornění růstu investice",
      "Porovnání různých scénářů"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Investiční kalkulačka 2025 - Pravidelné investování | ETF průvodce.cz"
        description="✅ Bezplatná investiční kalkulačka pro pravidelné investování. Spočítejte si výnosy z měsíčního investování do ETF fondů. Včetně daní, inflace a složeného úročení. Zdarma 2025."
        canonical="https://etfpruvodce.cz/kalkulacky/investicni-kalkulacka"
        keywords="investiční kalkulačka, pravidelné investování, měsíční investice, složené úročení, výpočet výnosů, ETF kalkulačka 2025, složené úročení"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-investicni-kalkulacka.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Investiční kalkulačka 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Investiční kalkulačka 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Spočítejte si výnosy z pravidelného měsíčního investování s efektem složeného úročení. 
            Simulace růstu vašich investic do ETF fondů včetně daní a inflace.
          </p>
        </div>

        {/* Výhody pravidelného investování */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 text-violet-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Compound Interest</h3>
              <p className="text-gray-600 text-sm">
                Složené úročení - nejsilnější síla v investování
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <PiggyBank className="w-12 h-12 text-violet-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pravidelné investování</h3>
              <p className="text-gray-600 text-sm">
                Dollar Cost Averaging - snížení rizika časování trhu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-violet-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Cílové plánování</h3>
              <p className="text-gray-600 text-sm">
                Naplánujte si cestu k finanční nezávislosti
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-violet-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reálné výnosy</h3>
              <p className="text-gray-600 text-sm">
                Výpočty včetně daní a inflace pro ČR
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Co je pravidelné investování a složené úročení */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Co je pravidelné investování a složené úročení?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-violet-800">Pravidelné měsíční investování</h3>
              <p className="text-gray-700 mb-4">
                Pravidelné investování je strategie, kdy investujete stejnou částku každý měsíc bez ohledu na aktuální cenu trhu. 
                Například každý měsíc nakoupíte ETF za 5000 Kč.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Snižuje riziko:</strong> Nekupujete vše najednou v špatné čas</li>
                <li>• <strong>Jednoduchost:</strong> Nevyžaduje timing trhu</li>
                <li>• <strong>Disciplína:</strong> Automatické investování bez emocí</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-violet-800">Compound Interest (Složené úročení)</h3>
              <p className="text-gray-700 mb-4">
                Compound interest znamená, že dostáváte výnosy nejen z původní investice, 
                ale i z dříve získaných výnosů. Čím déle investujete, tím silnější je efekt.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Exponenciální růst:</strong> Výnosy z výnosů</li>
                <li>• <strong>Čas je klíčový:</strong> Efekt se zesiluje s časem</li>
                <li>• <strong>Magie investování:</strong> "8. div světa" podle Einsteina</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Samotná kalkulačka */}
        <InvestmentCalculator />

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o investiční kalkulačce"
          faqs={[
            {
              question: "Co je strategie pravidelného investování?",
              answer: "Pravidelné investování (angl. Dollar Cost Averaging) je strategie, kdy každý měsíc investujete stejnou částku bez ohledu na cenu trhu. Například každý měsíc 5000 Kč do ETF. Výhodou je snížení rizika špatného timingu a lepší průměrná nákupní cena."
            },
            {
              question: "Jak funguje složené úročení (složené úročení)?",
              answer: "Compound interest znamená, že získáváte výnosy nejen z původní investice, ale i z předchozích výnosů. Například: investice 100K s 7% ročním výnosem po roce = 107K. Druhý rok se počítá 7% z 107K = 114,5K. Efekt se zesiluje s časem."
            },
            {
              question: "Jaký je realistický výnos z ETF investic?",
              answer: "Historicky dosáhly globální akciové indexy (S&P 500, MSCI World) průměrně 7-10% ročně před inflací. Po zdanění a inflaci lze očekávat reálný výnos 4-7% ročně. Konkrétní výnosy se liší podle období a složení portfolia."
            },
            {
              question: "Jak se zdaňují výnosy z ETF v České republice?",
              answer: "Zisky z prodeje ETF se zdaňují 15% daní z příjmů. Dividendy podléhají srážkové dani podle smlouvy o zamezení dvojího zdanění (obvykle 15%). ETF s akumulací dividend jsou daňově výhodnější - daň až při prodeji."
            },
            {
              question: "Kolik bych měl investovat měsíčně?",
              answer: "Doporučuje se investovat 10-20% čistého příjmu po vytvoření nouzové rezervy. Začněte s částkou, kterou můžete bezpečně postrádat. Důležitější je pravidelnost než výše - i 1000 Kč měsíčně může za 20 let narůst na značnou sumu."
            },
            {
              question: "Kdy začít s pravidelným investováním?",
              answer: "Nejlepší čas začít bylo včera, druhý nejlepší je dnes. Čím dříve začnete, tím více využijete sílu složeného úročení. Nepřemýšlejte o ideálním okamžiku - u pravidelného investování jde právě o to, že timing není důležitý."
            },
            {
              question: "Jaké ETF jsou vhodné pro pravidelné investování strategii?",
              answer: "Pro pravidelné investování jsou ideální široce diverzifikované ETF s nízkými poplatky: VWCE (celý svět), CSPX (S&P 500), EUNL (Evropa), VFEM (rozvíjející se trhy). Vybírejte ETF s vysokým objemem obchodování a nízkou TER (pod 0,5%)."
            }
          ]}
          className="mt-16"
        />

        {/* ETF Investment Guide CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">💡 Chcete se dozvědět více o investování?</h3>
            <p className="text-green-100 mb-4">
              Stáhněte si náš komplexní průvodce s 5 ověřenými portfolio strategiami a praktickými radami pro začátečníky i pokročilé.
            </p>
            <Link 
              to="/navod-pro-zacatecniky"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
            >
              📚 Stáhnout průvodce zdarma
            </Link>
          </div>
        </div>

        {/* Související nástroje */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Průvodce investováním",
              href: "/navod-pro-zacatecniky",
              description: "Kompletní návod s 5 portfolio strategiemi"
            },
            {
              title: "Srovnání ETF fondů",
              href: "/srovnani-etf",
              description: "Najděte si nejlepší ETF pro pravidelné investování investování"
            },
            {
              title: "Penzijní plánovač",
              href: "/kalkulacky/penzijni-planovac",
              description: "Naplánujte si dlouhodobé spoření na penzi"
            },
            {
              title: "Monte Carlo simulátor",
              href: "/kalkulacky/monte-carlo-simulator",
              description: "Analýza rizik vašeho portfolia"
            },
            {
              title: "Nejlepší ETF 2025",
              href: "/tipy/nejlepsi-etf-2025",
              description: "Doporučené ETF fondy pro pravidelné investování"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default InvestmentCalculatorPage;