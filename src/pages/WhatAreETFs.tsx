
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import YouTubeVideosSection from '@/components/YouTubeVideosSection';
import ETFGuideHeroSection from '@/components/etf-guide/ETFGuideHeroSection';
import WhatIsETFSection from '@/components/etf-guide/WhatIsETFSection';
import HowETFWorksSection from '@/components/etf-guide/HowETFWorksSection';
import ETFProsAndConsSection from '@/components/etf-guide/ETFProsAndConsSection';
import ETFTypesSection from '@/components/etf-guide/ETFTypesSection';
import InvestmentStepsSection from '@/components/etf-guide/InvestmentStepsSection';
import BrokersSection from '@/components/etf-guide/BrokersSection';
import FAQSection from '@/components/etf-guide/FAQSection';
import CTASection from '@/components/etf-guide/CTASection';
import { recommendedVideos } from '@/data/whatAreETFsData';

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
        <ETFGuideHeroSection />

        <div className="bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
            <WhatIsETFSection />
            <HowETFWorksSection />
            <ETFProsAndConsSection />
            <ETFTypesSection />
            
            <YouTubeVideosSection
              title="Doporučená videa o ETF"
              description="Poslechněte si rady od legendárního investora Warrena Buffetta"
              videos={recommendedVideos}
            />
            
            <InvestmentStepsSection />
            <BrokersSection />
            <FAQSection />
            <CTASection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
