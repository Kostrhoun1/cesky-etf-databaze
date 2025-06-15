
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
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const { fetchETFs, getETFCount, isLoading } = useETFData();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingError(null);
        
        // Load top 100 ETFs for homepage to have more data to work with
        const etfData = await fetchETFs(100);
        
        if (etfData && etfData.length > 0) {
          setEtfs(etfData);
        } else {
          setLoadingError('Žádná ETF data nebyla načtena');
        }

        // Get total count separately
        const count = await getETFCount();
        setTotalCount(count);
        
      } catch (error) {
        console.error('HomePage: Error loading data:', error);
        setLoadingError(error instanceof Error ? error.message : 'Neznámá chyba');
      }
    };
    
    loadData();
  }, [fetchETFs, getETFCount]);

  return (
    <Layout>
      <HeroSection totalCount={totalCount} />
      <BenefitsSection totalCount={totalCount} />
      <ETFSearchSection 
        etfs={etfs}
        totalCount={totalCount}
        isLoading={isLoading}
        loadingError={loadingError}
      />
      <BrokerComparisonSection />
      <CTASection totalCount={totalCount} />
    </Layout>
  );
};

export default HomePage;
