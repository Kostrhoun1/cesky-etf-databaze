
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BrokerComparisonSection: React.FC = () => {
  const brokers = [
    {
      name: 'DEGIRO',
      logo: '🟠',
      description: 'Nejpopulárnější broker v Evropě s nízkými poplatky',
      pros: ['Bezplatné ETF obchody', 'Široká nabídka produktů', 'Regulace DNB'],
      rating: 4.5
    },
    {
      name: 'Interactive Brokers',
      logo: '🔵',
      description: 'Profesionální platforma s nejširší nabídkou trhů',
      pros: ['Nejširší nabídka trhů', 'Nízké úrokové sazby', 'Pokročilé nástroje'],
      rating: 4.7
    },
    {
      name: 'XTB',
      logo: '🟡',
      description: 'Polský broker s českou podporou',
      pros: ['Česká podpora', 'Bezplatné ETF obchody', 'Vzdělávací materiály'],
      rating: 4.3
    },
    {
      name: 'Trading 212',
      logo: '🟢',
      description: 'Jednoduché rozhraní a investování do zlomků akcií',
      pros: ['Zlomkové investování', 'Intuitivní aplikace', 'Bezplatné obchody'],
      rating: 4.2
    },
    {
      name: 'Portu',
      logo: '🟣',
      description: 'Český broker s lokální podporou',
      pros: ['Česká společnost', 'Osobní přístup', 'Lokální podpora'],
      rating: 4.0
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Srovnání brokerů
          </h2>
          <p className="text-lg text-gray-600">
            Vyberte si nejlepšího brokera pro vaše investice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <Card key={broker.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{broker.logo}</span>
                  <div>
                    <CardTitle className="text-lg">{broker.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(broker.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({broker.rating})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{broker.description}</p>
                <ul className="space-y-1 mb-4">
                  {broker.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Detailní recenze
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrokerComparisonSection;
