
import React from 'react';
import Layout from '@/components/Layout';
import ETFGuideHeroSection from '@/components/etf-guide/ETFGuideHeroSection';
import WhatIsETFSection from '@/components/etf-guide/WhatIsETFSection';
import ETFTypesSection from '@/components/etf-guide/ETFTypesSection';
import HowETFWorksSection from '@/components/etf-guide/HowETFWorksSection';
import ETFProsAndConsSection from '@/components/etf-guide/ETFProsAndConsSection';
import InvestmentStepsSection from '@/components/etf-guide/InvestmentStepsSection';
import BrokersSection from '@/components/etf-guide/BrokersSection';
import FAQSection from '@/components/etf-guide/FAQSection';
import CTASection from '@/components/etf-guide/CTASection';

const WhatAreETFs: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          <ETFGuideHeroSection />
          <WhatIsETFSection />
          <ETFTypesSection />  
          <HowETFWorksSection />
          <ETFProsAndConsSection />
          <InvestmentStepsSection />
          <BrokersSection />
          <FAQSection />
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
