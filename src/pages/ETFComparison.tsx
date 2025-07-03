
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ETFDetailedComparison from '@/components/ETFDetailedComparison';
import ETFComparisonContainer from '@/components/comparison/ETFComparisonContainer';
import { ETF } from '@/types/etf';
import SEOHead from '@/components/SEO/SEOHead';

const ETFComparison: React.FC = () => {
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);
  const [selectedETFsForComparison, setSelectedETFsForComparison] = useState<ETF[]>([]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ETF Srovnání",
    "description": "Interaktivní nástroj pro srovnání ETF fondů podle kategorií, poplatků a výkonnosti",
    "url": "https://etfpruvodce.cz/srovnani-etf",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    }
  };

  const handleShowDetailedComparison = (selectedETFs: ETF[]) => {
    console.log('ETFComparison - handleShowDetailedComparison called with:', selectedETFs.length, 'ETFs');
    setSelectedETFsForComparison(selectedETFs);
    setShowDetailedComparison(true);
  };

  const handleBackToList = () => {
    setShowDetailedComparison(false);
  };

  if (showDetailedComparison) {
    return (
      <Layout>
        <ETFDetailedComparison
          selectedETFs={selectedETFsForComparison}
          onBack={handleBackToList}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Srovnání ETF fondů - Detailní analýza a porovnání | ETF průvodce.cz"
        description="Detailní srovnání ETF fondů. Filtrujte podle kategorií, poplatků a výkonnosti. Porovnejte až 3 fondy současně. Více než 3500 ETF fondů k dispozici."
        canonical="https://etfpruvodce.cz/srovnani-etf"
        keywords="srovnání ETF, porovnání ETF fondů, filtrování ETF, výkonnost ETF, poplatky ETF, TER porovnání"
        schema={webAppSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ETFComparisonContainer onShowDetailedComparison={handleShowDetailedComparison} />
      </div>
    </Layout>
  );
};

export default ETFComparison;
