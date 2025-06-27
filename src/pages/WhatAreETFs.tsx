
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

const WhatAreETFs: React.FC = () => {
  useEffect(() => {
    document.title = 'Co jsou ETF fondy? - Detailní průvodce | ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Vše, co potřebujete vědět o ETF. Zjistěte co jsou ETF, jak fungují, jejich výhody, nevýhody, typy a jak do nich investovat. Nejlepší průvodce pro české investory 2025.'
    );
  }, []);

  return (
    <Layout>
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
