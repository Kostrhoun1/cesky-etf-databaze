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


        {/* Samotná kalkulačka */}
        <MortgageCalculator />


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
              answer: "Úrokové sazby hypotéky se průběžně mění podle situace na trhu. Závisí na bance, výši vlastního kapitálu a době fixace. Kratší fixace (3-5 let) mívají obvykle nižší sazby než dlouhé fixace (15-20 let). Pro aktuální sazby doporučujeme oslovit více bank."
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
              answer: "Hypotéku můžete předčasně doplatit kdykoliv v průběhu trvání úvěru. Předčasné splacení je bez poplatku na konci fixačního období úrokové sazby nebo v případě vážných životních situací (úmrtí, invalidita, ztráta práce). V ostatních případech banka může účtovat sankci za předčasné splacení, obvykle 0,5-2% z předčasně splacené částky. Před předčasným splacením si spočítejte celkové náklady včetně poplatků."
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

        {/* Social sharing */}
        <SocialSharing
          url="https://etfpruvodce.cz/kalkulacky/hypotecni-kalkulacka"
          title="Hypoteční kalkulačka 2025 - Výpočet hypotéky"
          description="Bezplatná hypoteční kalkulačka pro výpočet měsíčních splátek. Spočítejte si celkové náklady na bydlení s aktuálními sazbami 2025."
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default MortgageCalculatorPage;