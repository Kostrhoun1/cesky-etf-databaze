import React from 'react';
import Layout from '@/components/Layout';
import MortgageCalculator from '@/components/tools/MortgageCalculator';
import SEOHead from '@/components/SEO/SEOHead';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
import SocialSharing from '@/components/SocialSharing';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calculator, TrendingUp, Shield } from 'lucide-react';

const MortgageCalculatorPage: React.FC = () => {
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
        "name": "Hypoteční kalkulačka 2025",
        "item": "https://etfpruvodce.cz/kalkulacky/hypotecni-kalkulacka"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Hypoteční kalkulačka 2025 - Výpočet hypotéky",
    "description": "Bezplatná hypoteční kalkulačka pro výpočet měsíčních splátek hypotéky. Spočítejte si celkové náklady na bydlení, vlastní kapitál a úročení.",
    "url": "https://etfpruvodce.cz/kalkulacky/hypotecni-kalkulacka",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Výpočet měsíčních splátek hypotéky",
      "Analýza celkových nákladů na úvěr",
      "Kalkulace vlastního kapitálu",
      "Srovnání různých úrokových sazeb",
      "Doba splatnosti až 30 let",
      "Struktura splátek - úroky vs jistina"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Hypoteční kalkulačka 2025 - Výpočet hypotéky online zdarma | ETF průvodce.cz"
        description="✅ Bezplatná hypoteční kalkulačka pro výpočet měsíčních splátek hypotéky 2025. Spočítejte si celkové náklady na bydlení, vlastní kapitál a úročení. Aktuální úrokové sazby."
        canonical="https://etfpruvodce.cz/kalkulacky/hypotecni-kalkulacka"
        keywords="hypoteční kalkulačka, hypotéka 2025, výpočet hypotéky, splátky hypotéky, úroková sazba hypotéky, vlastní kapitál, kalkulačka úvěru na bydlení"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-hypotecni-kalkulacka.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Home className="w-4 h-4" />
            Hypoteční kalkulačka 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hypoteční kalkulačka 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Spočítejte si měsíční splátky hypotéky, celkové náklady na bydlení a optimální vlastní kapitál. 
            Bezplatný nástroj s aktuálními úrokovými sazbami pro rok 2025.
          </p>
        </div>

        {/* Výhody kalkulačky */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Přesné výpočty</h3>
              <p className="text-gray-600">
                Výpočet měsíčních splátek podle aktuálních bankovních postupů a úrokových sazeb 2025.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Celkové náklady</h3>
              <p className="text-gray-600">
                Zjistěte si celkové náklady na hypotéku včetně úroků za celou dobu splatnosti.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Vlastní kapitál</h3>
              <p className="text-gray-600">
                Optimalizujte výši vlastního kapitálu a najděte nejlepší poměr vlastních a cizích zdrojů.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Jak použít kalkulačku */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Jak použít hypoteční kalkulačku</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">1. Zadejte základní údaje</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Výše úvěru:</strong> Kolik si chcete půjčit na hypotéku</li>
                <li>• <strong>Úroková sazba:</strong> Aktuální sazba od banky (obvykle 5-7% v roce 2025)</li>
                <li>• <strong>Doba splatnosti:</strong> Jak dlouho budete úvěr splácet (až 30 let)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">2. Analyzujte výsledky</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Měsíční splátka:</strong> Kolik budete platit každý měsíc</li>
                <li>• <strong>Celkové náklady:</strong> Součet všech splátek za celou dobu</li>
                <li>• <strong>Celkové úroky:</strong> Kolik zaplatíte bance navíc</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Samotná kalkulačka */}
        <MortgageCalculator />

        {/* Social sharing */}
        <SocialSharing
          url="https://etfpruvodce.cz/kalkulacky/hypotecni-kalkulacka"
          title="Hypoteční kalkulačka 2025 - Výpočet hypotéky"
          description="Bezplatná hypoteční kalkulačka pro výpočet měsíčních splátek. Spočítejte si celkové náklady na bydlení s aktuálními sazbami 2025."
          className="mt-12"
        />

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o hypoteční kalkulačce"
          faqs={[
            {
              question: "Jak funguje hypoteční kalkulačka?",
              answer: "Hypoteční kalkulačka vypočítává měsíční splátky pomocí anuity - rovnoměrné splátky po celou dobu úvěru. Výpočet zohledňuje výši úvěru, úrokovou sazbu a dobu splatnosti. V čase se mění poměr úroků a jistiny - na začátku platíte více na úrocích, ke konci více na jistině."
            },
            {
              question: "Jaký je optimální vlastní kapitál při koupi nemovitosti?",
              answer: "Doporučuje se mít alespoň 20% vlastního kapitálu z ceny nemovitosti. To snižuje úrokovou sazbu a eliminuje nutnost platit pojištění hypotéky. S vyšším vlastním kapitálem (30-40%) získáte ještě lepší úrokové sazby od bank."
            },
            {
              question: "Jaké jsou průměrné úrokové sazby hypotéky v roce 2025?",
              answer: "V roce 2025 se úrokové sazby hypotéky pohybují okolo 5-7% ročně, v závislosti na bance, výši vlastního kapitálu a době fixace. Kratší fixace (3-5 let) mívají nižší sazby než dlouhé fixace (15-20 let)."
            },
            {
              question: "Jak dlouho by měla být doba splatnosti hypotéky?",
              answer: "Nejčastěji se volí 25-30 let. Delší doba znamená nižší měsíční splátky, ale vyšší celkové náklady na úroky. Kratší doba (15-20 let) má vyšší splátky, ale ušetříte na úrocích. Vyberte podle svojí finanční situace."
            },
            {
              question: "Co zahrnuje měsíční splátka hypotéky?",
              answer: "Měsíční splátka hypotéky se skládá z úroků a jistiny. Na začátku tvoří úroky většinu splátky, postupně se poměr obrací. Kromě hypotéky počítejte i s pojištěním nemovitosti, daní z nemovitosti a případnými poplatky za správu úvěru."
            },
            {
              question: "Lze hypotéku předčasně splatit?",
              answer: "Ano, hypotéku lze předčasně splatit, ale banky obvykle účtují sankci za předčasné splacení (typicky 1-2% z předčasně splacené částky). Výše sankce závisí na konkrétní bance a typu hypotéky. Před předčasným splacením si spočítejte, zda se vyplatí."
            },
            {
              question: "Jaké dokumenty potřebuji k žádosti o hypotéku?",
              answer: "Obvykle potřebujete: doklady totožnosti, potvrzení o příjmech (3-6 měsíců), výpis z účtu, kupní smlouvu nebo smlouvu o budoucí smlouvě, odhad nemovitosti, a další dokumenty podle požadavků banky. Příprava dokumentů může trvat několik týdnů."
            }
          ]}
          className="mt-16"
        />

        {/* Související nástroje */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Úvěrová kalkulačka",
              href: "/kalkulacky/uverova-kalkulacka",
              description: "Spočítejte si splátky spotřebitelského úvěru"
            },
            {
              title: "Kalkulačka čisté mzdy",
              href: "/kalkulacky/cisty-plat-2025",
              description: "Zjistěte si disponibilní příjem pro hypotéku"
            },
            {
              title: "Investiční kalkulačka",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Investujte přebytky po splácení hypotéky"
            },
            {
              title: "Nouzová rezerva",
              href: "/kalkulacky/nouzova-rezerva",
              description: "Spočítejte si rezervu před koupí nemovitosti"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default MortgageCalculatorPage;