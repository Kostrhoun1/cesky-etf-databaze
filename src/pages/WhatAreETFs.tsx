
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
        schema={articleSchema}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
