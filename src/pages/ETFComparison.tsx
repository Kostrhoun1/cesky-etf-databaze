
import React from 'react';
import Layout from '@/components/Layout';
import ETFTable from '@/components/ETFTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useETFData } from '@/hooks/useETFData';
import { ETFListItem } from '@/types/etf';

const ETFComparison: React.FC = () => {
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);
  const { fetchETFs, isLoading } = useETFData();

  useEffect(() => {
    document.title = 'Srovnání ETF fondů - ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Detailní srovnání ETF fondů. Filtrujte podle kategorií, poplatků a výkonnosti. Porovnejte až 3 fondy současně.'
    );

    const loadETFs = async () => {
      const data = await fetchETFs(); // Load all ETFs for comparison page
      setEtfs(data || []);
    };
    loadETFs();
  }, [fetchETFs]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Srovnání ETF fondů
          </h1>
          <p className="text-lg text-gray-600">
            Detailní srovnání a analýza ETF fondů s možností filtrování podle různých kritérií
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg">Načítání ETF fondů...</p>
          </div>
        ) : (
          <ETFTable etfs={etfs} />
        )}
      </div>
    </Layout>
  );
};

export default ETFComparison;
