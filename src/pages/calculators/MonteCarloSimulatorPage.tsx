import React from 'react';
import Layout from '@/components/Layout';
import MonteCarloSimulator from '@/components/tools/MonteCarloSimulator';
import SEOHead from '@/components/SEO/SEOHead';
import BreadcrumbNav from '@/components/SEO/BreadcrumbNav';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const MonteCarloSimulatorPage: React.FC = () => {
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
        "name": "Monte Carlo simulátor portfolia",
        "item": "https://etfpruvodce.cz/kalkulacky/monte-carlo-simulator"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Monte Carlo simulátor portfolia 2025 - Analýza rizik ETF",
    "description": "Monte Carlo simulace výsledků ETF portfolia. Analýza rizik, historická data, pravděpodobnostní scénáře a backtesting pro investory.",
    "url": "https://etfpruvodce.cz/kalkulacky/monte-carlo-simulator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Monte Carlo simulace portfolia",
      "Analýza rizik a volatility",
      "Pravděpodobnostní scénáře výnosů",
      "Backtesting historických dat",
      "Portfolio alokace optimalizace",
      "Dlouhodobé projekce výkonnosti"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Monte Carlo simulátor portfolia 2025 - Analýza rizik ETF | ETF průvodce.cz"
        description="✅ Monte Carlo simulace výsledků vašeho ETF portfolia. Analýza rizik, historická data a pravděpodobnostní scénáře pro optimální investiční strategii."
        canonical="https://etfpruvodce.cz/kalkulacky/monte-carlo-simulator"
        keywords="Monte Carlo simulátor, analýza rizik portfolia, simulace ETF, pravděpodobnostní analýza, backtesting 2025, portfolio optimalizace"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-monte-carlo-simulator.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav
          items={[
            { name: "Domů", href: "/" },
            { name: "Kalkulačky", href: "/nastroje" },
            { name: "Monte Carlo simulátor" }
          ]}
        />

        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart className="w-4 h-4" />
            Monte Carlo simulátor 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Monte Carlo simulátor portfolia 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Simulace tisíců možných scénářů vašeho ETF portfolia na základě historických dat. 
            Analyzujte rizika a optimalizujte investiční strategii.
          </p>
        </div>

        {/* Co je Monte Carlo simulace */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Co je Monte Carlo simulace?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-800">Matematická metoda</h3>
              <p className="text-gray-700 mb-4">
                Monte Carlo simulace používá náhodné vzorkování k modelování možných výsledků komplexních systémů. 
                V investování simuluje tisíce různých scénářů trhů na základě historické volatility a výnosů.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Tisíce simulací:</strong> Různé možné cesty portfolia</li>
                <li>• <strong>Historická data:</strong> Reálné volatility a korelace</li>
                <li>• <strong>Pravděpodobnosti:</strong> Šance úspěchu/neúspěchu</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-800">Praktické využití</h3>
              <p className="text-gray-700 mb-4">
                Pomáhá odpovědět na klíčové otázky: Jaká je pravděpodobnost dosažení finančního cíle? 
                Kolik můžu bezpečně vybírat z portfolia? Jak volatilní bude má investice?
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Portfolio design:</strong> Optimální alokace aktiv</li>
                <li>• <strong>Risk management:</strong> Kvantifikace rizik</li>
                <li>• <strong>Retirement planning:</strong> Udržitelnost výběrů</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Výhody Monte Carlo analýzy */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tisíce scénářů</h3>
              <p className="text-gray-600 text-sm">
                Simulace různých tržních podmínek a jejich dopadu na portfolio
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pravděpodobnosti</h3>
              <p className="text-gray-600 text-sm">
                Kvantifikace šancí dosažení finančních cílů
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Optimalizace</h3>
              <p className="text-gray-600 text-sm">
                Nalezení optimální alokace aktiv pro vaše cíle
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Risk management</h3>
              <p className="text-gray-600 text-sm">
                Identifikace a kvantifikace portfoliových rizik
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Limitace a upozornění */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Limitace Monte Carlo simulací</h3>
              <p className="text-amber-700 mb-4">
                Monte Carlo simulace vycházejí z historických dat a předpokládají, že budoucnost bude podobná minulosti. 
                <strong>To nemusí být vždy pravda!</strong> Nové technologie, regulace nebo ekonomické změny mohou změnit tržní dynamiku.
              </p>
              <ul className="space-y-2 text-amber-700">
                <li>• <strong>Black swan events:</strong> Simulace nepředvídá extrémní události</li>
                <li>• <strong>Změny korelací:</strong> Aktiva se mohou chovat jinak než v minulosti</li>
                <li>• <strong>Inflace a režimy:</strong> Dlouhodobé strukturální změny</li>
                <li>• <strong>Lidský faktor:</strong> Emoce a iracionální chování nejsou modelovány</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jak interpretovat výsledky */}
        <div className="bg-white rounded-2xl border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Jak interpretovat výsledky Monte Carlo simulace</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-800">Klíčové metriky</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Success Rate (úspěšnost)</h4>
                  <p className="text-sm text-gray-600">% simulací, které dosáhly cíle. 80%+ je dobré, 95%+ konzervativní</p>
                </div>
                <div>
                  <h4 className="font-semibold">Percentily (P10, P50, P90)</h4>
                  <p className="text-sm text-gray-600">P10 = nejhorší 10% scénářů, P50 = medián, P90 = nejlepší 10%</p>
                </div>
                <div>
                  <h4 className="font-semibold">Maximum Drawdown</h4>
                  <p className="text-sm text-gray-600">Největší pokles portfolia od vrcholu. Ukazuje worst-case scénář</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Praktické použití</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Portfolio alokace</h4>
                  <p className="text-sm text-gray-600">Testujte různé kombinace akcií/dluhopisů pro optimální risk/return</p>
                </div>
                <div>
                  <h4 className="font-semibold">Withdrawal rate</h4>
                  <p className="text-sm text-gray-600">Najděte bezpečnou míru výběru z portfolia na penzi</p>
                </div>
                <div>
                  <h4 className="font-semibold">Časový horizont</h4>
                  <p className="text-sm text-gray-600">Delší investiční horizon obvykle snižuje riziko neúspěchu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Samotný simulátor */}
        <MonteCarloSimulator />

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o Monte Carlo simulacích"
          faqs={[
            {
              question: "Co je Monte Carlo simulace v investování?",
              answer: "Monte Carlo simulace je matematická metoda, která generuje tisíce možných scénářů vývoje portfolia na základě historických dat o výnosech a volatilitě. Pomáhá kvantifikovat rizika a pravděpodobnosti dosažení finančních cílů. Například simuluje 10 000 různých cest, kterými se může vaše portfolio vydat za 20 let."
            },
            {
              question: "Jak spolehlivé jsou Monte Carlo simulace?",
              answer: "Simulace jsou užitečný nástroj, ale mají limitace. Vycházejí z historických dat a předpokládají, že budoucnost bude podobná minulosti. Nemohou předvídat 'black swan' události, změny v tržní struktuře nebo nové technologie. Použijte je jako jeden z nástrojů rozhodování, ne jako jediný zdroj pravdy."
            },
            {
              question: "Co znamená 'success rate' 80% v simulaci?",
              answer: "Success rate 80% znamená, že z tisíců simulovaných scénářů jich 80% dosáhlo stanoveného finančního cíle. Je to dobrý výsledek, ale 20% scénářů neuspělo. Pro konzervativnější přístup hledejte success rate 90%+. Můžete ji zvýšit snížením cíle, prodloužením času nebo změnou alokace."
            },
            {
              question: "Jaká je optimální alokace portfolia podle Monte Carlo?",
              answer: "Optimální alokace závisí na vašich cílech, časovém horizontu a toleranci k riziku. Obecně: mladí investoři 80-90% akcie, starší 50-70%. Monte Carlo simulace vám pomůže najít sweet spot mezi rizikem a výnosem. Testujte různé kombinace a sledujte success rate vs maximum drawdown."
            },
            {
              question: "Co je maximum drawdown a proč je důležitý?",
              answer: "Maximum drawdown je největší pokles portfolia od vrcholu k údolí během simulace. Například -40% drawdown znamená, že v nejhorším scénáři by vaše portfolio kleslo o 40%. Je důležitý pro psychologickou pripravenost - zvládnete sledovat, jak vaše investice klesá o třetinu nebo polovinu?"
            },
            {
              question: "Jak často mám aktualizovat Monte Carlo analýzu?",
              answer: "Doporučuje se přehodnocení ročně nebo při větších životních změnách (změna cílů, příjmů, životní situace). Tržní podmínky se mění, nové historická data ovlivňují projekce. Také když se vaše portfolio výrazně změní nebo dosáhnete mezicíle, je dobré simulaci aktualizovat."
            },
            {
              question: "Může Monte Carlo simulace předpovědět finanční krize?",
              answer: "Ne, Monte Carlo simulace NEMOHOU předpovědět konkrétní události jako finanční krize, pandemie nebo války. Modelují pouze 'normální' tržní volatilitu na základě historie. Proto je důležité mít nouzovou rezervu a být připraven na to, že realita může být jiná než simulace. Použijte ji pro plánování, ne predikci."
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
              description: "Základní výpočty compound interest"
            },
            {
              title: "Penzijní plánovač",
              href: "/kalkulacky/penzijni-planovac",
              description: "4% withdrawal rule s Monte Carlo analýzou"
            },
            {
              title: "Srovnání ETF fondů",
              href: "/srovnani-etf",
              description: "Najděte si ETF pro optimální portfolio"
            },
            {
              title: "All Weather Portfolio",
              href: "/tipy/all-weather-portfolio",
              description: "Diverzifikovaná strategie pro různé tržní režimy"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default MonteCarloSimulatorPage;