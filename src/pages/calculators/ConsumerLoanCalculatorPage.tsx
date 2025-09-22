import React from 'react';
import Layout from '@/components/Layout';
import ConsumerLoanCalculator from '@/components/tools/ConsumerLoanCalculator';
import SEOHead from '@/components/SEO/SEOHead';
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

        {/* Samotná kalkulačka - HLAVNÍ OBSAH */}
        <ConsumerLoanCalculator />

        {/* Varování před nebankovními společnostmi */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12 mt-8">
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
              answer: "Předčasné splacení se vyplatí téměř vždy, pokud nemáte lepší investiční příležitost s vyšším výnosem než je úroková sazba úvěru. Dnes je již ve většině bank předčasné splacení zdarma, ale některé mohou stále účtovat sankční poplatky 0,5-1% z předčasně splacené částky. Vždy si ověřte podmínky u vaší banky."
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