
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrokerOverview from '../broker/BrokerOverview';
import BrokerComparison from '../broker/BrokerComparison';
import BrokerDetails from '../broker/BrokerDetails';
import BrokerRecommendations from '../broker/BrokerRecommendations';

const DetailedBrokerComparison: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Detailní srovnání brokerů pro ETF investory
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Komplexní analýza pěti předních brokerských platforem z pohledu českého investora do ETF fondů
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Přehled</TabsTrigger>
            <TabsTrigger value="comparison">Srovnání</TabsTrigger>
            <TabsTrigger value="details">Detaily</TabsTrigger>
            <TabsTrigger value="recommendations">Doporučení</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <BrokerOverview />
          </TabsContent>

          <TabsContent value="comparison">
            <BrokerComparison />
          </TabsContent>

          <TabsContent value="details">
            <BrokerDetails />
          </TabsContent>

          <TabsContent value="recommendations">
            <BrokerRecommendations />
          </TabsContent>
        </Tabs>

        {/* Link to detailed DEGIRO review */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Detailní recenze DEGIRO
          </h3>
          <p className="text-blue-800 text-sm mb-4">
            Přečtěte si kompletní hodnocení brokera DEGIRO se zaměřením na české investory, 
            včetně detailního rozboru poplatků, daňových aspektů a srovnání s konkurencí.
          </p>
          <Link 
            to="/degiro-recenze" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Přečíst detailní recenzi DEGIRO
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DetailedBrokerComparison;
