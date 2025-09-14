
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import ETFHeroSection from '@/components/etf-guide/ETFHeroSection';
import ETFIntroductionSection from '@/components/etf-guide/ETFIntroductionSection';
import ETFHowTheyWorkSection from '@/components/etf-guide/ETFHowTheyWorkSection';
import ETFAdvantagesDisadvantagesSection from '@/components/etf-guide/ETFAdvantagesDisadvantagesSection';
import ETFTypesSection from '@/components/etf-guide/ETFTypesSection';
import ETFHowToStartSection from '@/components/etf-guide/ETFHowToStartSection';
import ETFWhereToBuySection from '@/components/etf-guide/ETFWhereToBuySection';
import ETFFAQSection from '@/components/etf-guide/ETFFAQSection';
import ETFCTASection from '@/components/etf-guide/ETFCTASection';
import SEOHead from '@/components/SEO/SEOHead';
import { FAQStructuredData, HowToStructuredData } from '@/components/SEO/StructuredData';
import InternalLinking from '@/components/SEO/InternalLinking';

const WhatAreETFs: React.FC = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Co jsou ETF fondy? - Kompletní průvodce pro české investory",
    "description": "Vše, co potřebujete vědět o ETF. Zjistěte co jsou ETF, jak fungují, jejich výhody, nevýhody, typy a jak do nich investovat.",
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ETF průvodce.cz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://etfpruvodce.cz/og-image.jpg"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-03",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://etfpruvodce.cz/co-jsou-etf"
    },
    "image": "https://etfpruvodce.cz/og-image.jpg"
  };

  return (
    <Layout>
      <SEOHead
        title="Co jsou ETF fondy? - Detailní průvodce | ETF průvodce.cz"
        description="Vše, co potřebujete vědět o ETF. Zjistěte co jsou ETF, jak fungují, jejich výhody, nevýhody, typy a jak do nich investovat. Nejlepší průvodce pro české investory 2025."
        canonical="https://etfpruvodce.cz/co-jsou-etf"
        keywords="ETF fondy, co jsou ETF, exchange traded funds, investování do ETF, typy ETF, výhody ETF, nevýhody ETF"
        ogType="article"
        ogImage="https://etfpruvodce.cz/og-what-are-etfs.jpg"
        publishedTime="2025-01-01"
        modifiedTime="2025-01-03"
        author="ETF průvodce.cz"
        schema={articleSchema}
      />
      
      <FAQStructuredData faqs={[
        {
          question: "Co jsou ETF fondy?",
          answer: "ETF (Exchange Traded Funds) jsou investiční fondy obchodované na burze podobně jako akcie. Sledují výkonnost indexu, komodity nebo jiného podkladového aktiva."
        },
        {
          question: "Jaké jsou výhody ETF?",
          answer: "ETF nabízejí diverzifikaci, nízké poplatky, likviditu, transparentnost a možnost obchodování během obchodních hodin."
        },
        {
          question: "Jak začít investovat do ETF?",
          answer: "Potřebujete si otevřít účet u brokera, vybrat vhodné ETF podle vaší investiční strategie a provést nákup through trading platformu."
        }
      ]} />
      
      <HowToStructuredData
        name="Jak investovat do ETF fondů"
        description="Kompletní návod jak začít investovat do ETF fondů pro české investory"
        steps={[
          {
            name: "Vyberte brokera",
            text: "Otevřete si účet u regulovaného brokera jako DEGIRO, XTB nebo Interactive Brokers"
          },
          {
            name: "Určete investiční strategii",
            text: "Rozhodněte se, do jakých regionů a sektorů chcete investovat podle vašich cílů"
          },
          {
            name: "Vyberte vhodné ETF",
            text: "Porovnejte poplatky, výkonnost a složení různých ETF fondů"
          },
          {
            name: "Proveďte nákup",
            text: "Zadejte objednávku through trading platformu vašeho brokera"
          }
        ]}
      />
      <div className="bg-white">
        {/* Hero Section */}
        <ETFHeroSection />

        {/* Main Content */}
        <div className="bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
            
            {/* Section 1: Co je to ETF? */}
            <ETFIntroductionSection />
            
            {/* Section 2: Jak fungují? */}
            <ETFHowTheyWorkSection />
            
            {/* Section 3: Výhody a nevýhody */}
            <ETFAdvantagesDisadvantagesSection />

            {/* Section 4: Typy ETF */}
            <ETFTypesSection />

            {/* Section 5: Jak začít? */}
            <ETFHowToStartSection />

            {/* Section 5b: Kde koupit ETF */}
            <ETFWhereToBuySection />

            {/* Section 6: FAQ */}
            <ETFFAQSection />

            {/* CTA Section */}
            <ETFCTASection />

            {/* Internal Linking */}
            <InternalLinking relatedLinks={[
              {
                title: "Srovnání ETF fondů",
                description: "Porovnejte více než 3500 ETF fondů podle kategorií, poplatků a výkonnosti",
                href: "/srovnani-etf"
              },
              {
                title: "Kde koupit ETF",
                description: "Najděte nejlepšího brokera pro investování do ETF fondů",
                href: "/kde-koupit-etf"
              },
              {
                title: "Investiční kalkulačka",
                description: "Spočítejte si výnosy z pravidelného investování",
                href: "/nastroje"
              },
              {
                title: "Návod pro začátečníky",
                description: "Kompletní průvodce jak začít investovat do ETF",
                href: "/navod-pro-zacatecniky"
              }
            ]} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
