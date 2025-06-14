
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
        console.log('HomePage: Starting to load ETF data...');
        setLoadingError(null);
        
        // Load top 100 ETFs for homepage to have more data to work with
        const etfData = await fetchETFs(100);
        console.log('HomePage: Received ETF data:', etfData?.length || 0, 'items');
        
        if (etfData && etfData.length > 0) {
          setEtfs(etfData);
          console.log('HomePage: ETF data set successfully');
        } else {
          console.warn('HomePage: No ETF data received');
          setLoadingError('Žádná ETF data nebyla načtena');
        }

        // Get total count separately
        const count = await getETFCount();
        console.log('HomePage: Total ETF count:', count);
        setTotalCount(count);
        
      } catch (error) {
        console.error('HomePage: Error loading data:', error);
        setLoadingError(error instanceof Error ? error.message : 'Neznámá chyba');
      }
    };
    
    loadData();
  }, [fetchETFs, getETFCount]);

  // Debug log when etfs change
  useEffect(() => {
    console.log('HomePage: ETFs state updated, length:', etfs.length);
    if (etfs.length > 0) {
      console.log('HomePage: First ETF:', etfs[0]);
    }
  }, [etfs]);

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
