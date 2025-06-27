
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const brokers = [
  {
    name: 'DEGIRO',
    description: 'Oblíbený evropský broker s nízkými poplatky',
    features: ['Nízké poplatky', 'Široká nabídka ETF', 'Regulace v EU']
  },
  {
    name: 'Interactive Brokers',
    description: 'Profesionální platforma s globálním přístupem',
    features: ['Globální trhy', 'Pokročilé nástroje', 'Konkurenční poplatky']
  },
  {
    name: 'Trading 212',
    description: 'Moderní aplikace s bezplatnými investicemi',
    features: ['Bez poplatků za obchody', 'Jednoduché rozhraní', 'Mobilní aplikace']
  }
];

const BrokersSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl mb-6 shadow-lg">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Kde koupit ETF?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Přehled nejlepších brokerů pro české investory</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {brokers.map((broker, index) => (
          <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{broker.name}</h3>
              <p className="text-gray-600 mb-4">{broker.description}</p>
              <ul className="space-y-2">
                {broker.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold">
          <Link to="/kde-koupit-etf">Detailní srovnání brokerů</Link>
        </Button>
      </div>
    </div>
  );
};

export default BrokersSection;
