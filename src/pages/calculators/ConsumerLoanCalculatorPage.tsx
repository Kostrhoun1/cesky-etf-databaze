import React from 'react';
import Layout from '@/components/Layout';
import ConsumerLoanCalculator from '@/components/tools/ConsumerLoanCalculator';
import SEOHead from '@/components/SEO/SEOHead';
import BreadcrumbNav from '@/components/SEO/BreadcrumbNav';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Calculator, TrendingDown, AlertTriangle } from 'lucide-react';

const ConsumerLoanCalculatorPage: React.FC = () => {
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
        "name": "Úvěrová kalkulačka 2025",
        "item": "https://etfpruvodce.cz/kalkulacky/uverova-kalkulacka"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Úvěrová kalkulačka 2025 - Spotřebitelský úvěr",
    "description": "Bezplatná úvěrová kalkulačka pro výpočet splátek spotřebitelského úvěru. Spočítejte si měsíční splátky a celkové náklady na úvěr.",
    "url": "https://etfpruvodce.cz/kalkulacky/uverova-kalkulacka",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Výpočet měsíčních splátek úvěru",
      "Analýza celkových nákladů na úvěr",
      "Kalkulace úrokových nákladů",
      "Srovnání různých úrokových sazeb",
      "Doba splatnosti až 10 let",
      "Struktura splátek - úroky vs jistina"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Úvěrová kalkulačka 2025 - Spotřebitelský úvěr online | ETF průvodce.cz"
        description="✅ Bezplatná úvěrová kalkulačka pro výpočet splátek spotřebitelského úvěru 2025. Spočítejte si měsíční splátky a celkové náklady na úvěr. Aktuální úrokové sazby."
        canonical="https://etfpruvodce.cz/kalkulacky/uverova-kalkulacka"
        keywords="úvěrová kalkulačka, spotřebitelský úvěr, splátky úvěru, kalkulačka úvěru 2025, úroková sazba, nebankovní úvěr, osobní úvěr"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-uverova-kalkulacka.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav
          items={[
            { name: "Domů", href: "/" },
            { name: "Kalkulačky", href: "/nastroje" },
            { name: "Úvěrová kalkulačka" }
          ]}
        />

        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            Úvěrová kalkulačka 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Úvěrová kalkulačka 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Spočítejte si měsíční splátky spotřebitelského úvěru a celkové náklady na financování. 
            Srovnejte nabídky bank a najděte nejlepší podmínky pro rok 2025.
          </p>
        </div>

        {/* Samotná kalkulačka - HLAVNÍ OBSAH */}
        <ConsumerLoanCalculator />

        {/* Upozornění na rizika */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Důležité upozornění</h3>
              <p className="text-amber-700">
                Před uzavřením úvěru si pečlivě zvažte svou finanční situaci. Úvěry mají vysoké úroky a měly by být posledním řešením. 
                Nejprve zvažte vytvoření nouzové rezervy a snížení výdajů. <strong>Úvěr si berte pouze v případě skutečné nutnosti.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Aktuální úrokové sazby 2025 - podle Air Bank */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aktuální úrokové sazby spotřebitelských úvěrů 2025</h2>
          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Bankovní úvěry (příklad Air Bank):</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">73%</div>
                <div className="text-sm text-gray-600">klientů získalo<br/>úrok do <strong>7,9%</strong></div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">18%</div>
                <div className="text-sm text-gray-600">klientů získalo<br/>úrok <strong>8-10,9%</strong></div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">9%</div>
                <div className="text-sm text-gray-600">klientů získalo<br/>úrok vyšší než <strong>10,9%</strong></div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg text-gray-600 mb-2">Maximální doba splatnosti:</div>
            <div className="text-3xl font-bold text-blue-600">10 let</div>
          </div>
        </div>

        {/* Varování před nebankovními společnostmi */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-4">VAROVÁNÍ: Vyhněte se nebankovním společnostem!</h2>
              <div className="space-y-4 text-red-700">
                <p className="text-lg font-semibold">
                  Nebankovní společnosti nabízejí úvěry s úrokovými sazbami <strong className="text-red-800">20-70% ročně</strong>, 
                  což je extrémně nevýhodné a může vás dostat do dluhové pasti.
                </p>
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">Proč se jim vyhnout:</h3>
                  <ul className="space-y-1 text-red-700">
                    <li>• Extrémně vysoké úrokové sazby (často i přes 50%)</li>
                    <li>• Skryté poplatky a sankce</li>
                    <li>• Agresivní vymáhání dluhů</li>
                    <li>• Rychlé zadlužování klientů</li>
                  </ul>
                </div>
                <p className="text-lg font-semibold text-red-800">
                  💡 <strong>Vždy se zaměřte na RPSN (roční procentní sazbu nákladů)</strong> - 
                  zahrnuje všechny poplatky a je nejlepším ukazatelem skutečných nákladů úvěru!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Výhody kalkulačky */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Přesné výpočty</h3>
              <p className="text-gray-600">
                Výpočet měsíčních splátek podle bankovních postupů s aktuálními úrokovými sazbami 2025.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Celkové náklady</h3>
              <p className="text-gray-600">
                Zjistěte si celkové náklady na úvěr včetně všech úroků za celou dobu splatnosti.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Srovnání nabídek</h3>
              <p className="text-gray-600">
                Porovnejte různé úrokové sazby a najděte nejvýhodnější podmínky na trhu.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alternativy k úvěru */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Alternativy k úvěru - zvažte před půjčováním</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-800">Nejprve zvažte</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Nouzovou rezervu:</strong> Máte rezervu na 3-6 měsíců výdajů?</li>
                <li>• <strong>Snížení výdajů:</strong> Lze ušetřit na zbytných výdajích?</li>
                <li>• <strong>Dodatečné příjmy:</strong> Brigády, prodej věcí, vedlejší činnost</li>
                <li>• <strong>Pomoc rodiny:</strong> Lze si půjčit od příbuzných bez úroků?</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-800">Výhodnější řešení</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Kontokorent:</strong> Krátkodobé překlenutí (nižší úroky)</li>
                <li>• <strong>Refinancování:</strong> Splacení dražších úvěrů levnějším</li>
                <li>• <strong>Splátkový prodej:</strong> Nákup na splátky místo hotovostního úvěru</li>
                <li>• <strong>Odložení nákupu:</strong> Nejlepší "úvěr" je žádný úvěr</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o spotřebitelských úvěrech"
          faqs={[
            {
              question: "Jaké jsou aktuální úrokové sazby spotřebitelských úvěrů v roce 2025?",
              answer: "Podle dat Air Bank v roce 2025: 73% klientů získalo úrok do 7,9%, 18% klientů úrok 8-10,9%, pouze 9% klientů nad 10,9%. Nebankovní společnosti nabízejí extrémně vysoké sazby 20-70% ročně - těm se důrazně vyhněte! Vždy porovnávejte RPSN, ne jen základní úrokovou sazbu."
            },
            {
              question: "Jak dlouho lze splácet spotřebitelský úvěr?",
              answer: "Maximální doba splatnosti spotřebitelského úvěru je obvykle 8-10 let, v některých případech až 12 let. Kratší doba splatnosti znamená vyšší měsíční splátky, ale nižší celkové náklady na úroky. Delší doba snižuje splátky, ale zvyšuje celkové náklady."
            },
            {
              question: "Co ovlivňuje úrokovou sazbu úvěru?",
              answer: "Úroková sazba závisí na: bonitě klienta (příjmy, historie splátek), výši úvěru, době splatnosti, způsobu zajištění, aktuální situaci na trhu a politice konkrétní banky. Lepší bonita = nižší sazba. Zajištěný úvěr má nižší sazbu než nezajištěný."
            },
            {
              question: "Proč je RPSN důležitější než úroková sazba?",
              answer: "RPSN (roční procentní sazba nákladů) zahrnuje všechny poplatky: úroky, poplatek za vyřízení, vedení úvěru, pojištění, atd. Zatímco banka může inzerovat nízký úrok 8%, skutečná RPSN může být 15% kvůli poplatkům. RPSN je jediný správný ukazatel pro srovnávání nabídek!"
            },
            {
              question: "Kdy se vyplatí předčasné splacení úvěru?",
              answer: "Předčasné splacení se vyplatí téměř vždy, pokud nemáte lepší investiční příležitost s vyšším výnosem než je úroková sazba úvěru. Pozor na sankční poplatky - obvykle 0,5-1% z předčasně splacené částky. Spočítejte si, zda úspora na úrocích převýší sankci."
            },
            {
              question: "Kolik z příjmu mohu věnovat na splátky úvěrů?",
              answer: "Banky doporučují maximálně 30-40% čistého příjmu na všechny splátky úvěrů dohromady (včetně hypotéky). Pro spotřebitelské úvěry by to mělo být maximálně 15-20% čistého příjmu. Počítejte s rezervou na neočekávané výdaje."
            },
            {
              question: "Jaký je rozdíl mezi bankovním a nebankovním úvěrem?",
              answer: "ZÁSADNÍ rozdíl! Bankovní úvěry: 73% klientů dostane do 7,9% úrok, regulace ČNB, ochrana spotřebitele. Nebankovní: úroky 20-70%, minimum regulace, agresivní praktiky. Nebankovní úvěr berte jen v krajní nouzi a očekávejte vysoké náklady. Vždy preferujte banky!"
            }
          ]}
          className="mt-16"
        />

        {/* Související nástroje */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Hypoteční kalkulačka",
              href: "/kalkulacky/hypotecni-kalkulacka",
              description: "Levnější alternativa - úvěr na bydlení"
            },
            {
              title: "Kalkulačka čisté mzdy",
              href: "/kalkulacky/cisty-plat-2025",
              description: "Zjistěte si disponibilní příjem pro splátky"
            },
            {
              title: "Nouzová rezerva",
              href: "/kalkulacky/nouzova-rezerva",
              description: "Vytvořte si rezervu místo půjčování"
            },
            {
              title: "Investiční kalkulačka",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Investujte místo splácení vysokých úroků"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default ConsumerLoanCalculatorPage;