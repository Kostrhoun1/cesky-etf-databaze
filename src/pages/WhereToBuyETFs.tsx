
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import DetailedBrokerComparison from '../components/home/DetailedBrokerComparison';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Shield, TrendingUp } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';

const WhereToBuyETFs = () => {
  const brokerSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Nejlepší brokeři pro nákup ETF v České republice",
    "description": "Srovnání brokerů pro investování do ETF fondů",
    "url": "https://etfpruvodce.cz/kde-koupit-etf",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "DEGIRO",
        "description": "Nizozemský broker s nízkými poplatky"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Interactive Brokers",
        "description": "Americký broker s širokou nabídkou"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "XTB",
        "description": "Polský broker s českým zázemím"
      }
    ]
  };

  const considerations = [
    {
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      title: 'Poplatky',
      description: 'Porovnejte transakční poplatky, správní poplatky a poplatky za vedení účtu.'
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: 'Regulace a bezpečnost',
      description: 'Vybírejte brokery regulované v EU s ochranou investorů do 20 000€.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      title: 'Výběr ETF',
      description: 'Ujistěte se, že broker nabízí ETF, které chcete koupit.'
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Kde koupit ETF? Srovnání nejlepších brokerů 2025 | ETF průvodce.cz"
        description="Srovnání nejlepších brokerů pro nákup ETF v České republice. DEGIRO, Interactive Brokers, XTB, Trading 212. Poplatky, bezpečnost a nabídka ETF."
        canonical="https://etfpruvodce.cz/kde-koupit-etf"
        keywords="kde koupit ETF, nejlepší brokeři, DEGIRO, Interactive Brokers, XTB, Trading 212, Portu, poplatky brokerů"
        schema={brokerSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero sekce */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Kde koupit ETF
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Srovnání nejlepších brokerů pro nákup ETF v České republice. 
            Najděte si platformu, která nejlépe vyhovuje vašim potřebám a investičnímu stylu.
          </p>
        </div>

        {/* Důležité faktory */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Na co se zaměřit při výběru brokera
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {considerations.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Detailní srovnání brokerů */}
      <DetailedBrokerComparison />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tipy pro začátečníky */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tipy pro začátečníky
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Začněte s demo účtem</h3>
              <p className="text-gray-600 text-sm">
                Většina brokerů nabízí demo účty, kde si můžete vyzkoušet 
                platformu bez rizika.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Porovnejte celkové náklady</h3>
              <p className="text-gray-600 text-sm">
                Nezaměřujte se jen na transakční poplatky, ale i na poplatky 
                za vedení účtu a převody.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Ověřte regulaci</h3>
              <p className="text-gray-600 text-sm">
                Vybírejte pouze brokery regulované v EU s ochranou 
                investorů.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Začněte malými částkami</h3>
              <p className="text-gray-600 text-sm">
                Prvotní investice nemusí být vysoká. Důležité je začít 
                a postupně se učit.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              to="/navod-pro-zacatecniky" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Přečtěte si náš kompletní návod pro začátečníky
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhereToBuyETFs;
