
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useETFData } from '@/hooks/useETFData';
import { ETFListItem } from '@/types/etf';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import ETFSearchSection from '@/components/home/ETFSearchSection';
import BrokerComparisonSection from '@/components/home/BrokerComparisonSection';
import CTASection from '@/components/home/CTASection';

const HomePage: React.FC = () => {
  const [totalCount, setTotalCount] = useState(0);
  const { getETFCount } = useETFData();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get total count for display in hero and other sections
        const count = await getETFCount();
        setTotalCount(count);
        
      } catch (error) {
        console.error('HomePage: Error loading data:', error);
      }
    };
    
    loadData();
  }, [getETFCount]);

  return (
    <Layout>
      <HeroSection totalCount={totalCount} />
      <BenefitsSection totalCount={totalCount} />
      <ETFSearchSection />
      <BrokerComparisonSection />
      <CTASection totalCount={totalCount} />
    </Layout>
  );
};

export default HomePage;
