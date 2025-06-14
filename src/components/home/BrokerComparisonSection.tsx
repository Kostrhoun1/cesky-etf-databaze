
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Srovnání brokerů
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Vyberte si nejlepšího brokera pro vaše investice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brokers.map((broker) => (
            <Card key={broker.name} className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{broker.logo}</span>
                  <div>
                    <CardTitle className="text-xl">{broker.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.round(broker.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({broker.rating})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-6 pt-0">
                <p className="text-gray-600 mb-4 flex-grow">{broker.description}</p>
                <ul className="space-y-2 mb-6">
                  {broker.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-auto">
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
