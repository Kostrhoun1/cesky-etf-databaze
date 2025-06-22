
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ETFDetailedComparison from '@/components/ETFDetailedComparison';
import ETFComparisonContainer from '@/components/comparison/ETFComparisonContainer';

const ETFComparison: React.FC = () => {
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);

  useEffect(() => {
    document.title = 'Srovnání ETF fondů - ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Detailní srovnání ETF fondů. Filtrujte podle kategorií, poplatků a výkonnosti. Porovnejte až 3 fondy současně.'
    );
  }, []);

  const handleShowDetailedComparison = () => {
    setShowDetailedComparison(true);
  };

  const handleBackToList = () => {
    setShowDetailedComparison(false);
  };

  if (showDetailedComparison) {
    return (
      <Layout>
        <ETFDetailedComparison
          onBack={handleBackToList}
        />
      </Layout>
    );
  }

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

        <ETFComparisonContainer onShowDetailedComparison={handleShowDetailedComparison} />
      </div>
    </Layout>
  );
};

export default ETFComparison;
