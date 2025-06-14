
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, TrendingUp, Shield, DollarSign } from 'lucide-react';

const WhereToBuyETFs = () => {
  const brokers = [
    {
      name: 'DEGIRO',
      description: 'Jeden z nejpopulárnějších brokerů v Evropě s nízkými poplatky',
      pros: ['Velmi nízké poplatky', 'Široká nabídka ETF', 'Regulace v EU'],
      cons: ['Omezené vzdělávací materiály', 'Základní platforma'],
      fees: 'ETF od 0€, akcie od 2€',
      rating: 4.5,
      recommended: true
    },
    {
      name: 'Interactive Brokers',
      description: 'Profesionální platforma s přístupem na globální trhy',
      pros: ['Nejširší výběr trhů', 'Pokročilé nástroje', 'Nízké poplatky při vyšších objemech'],
      cons: ['Složitější pro začátečníky', 'Vyšší minimální vklad'],
      fees: 'ETF od 1.25€, měsíční poplatek 10€',
      rating: 4.3,
      recommended: false
    },
    {
      name: 'XTB',
      description: 'Český broker s lokální podporou a vzdělávacími materiály',
      pros: ['Česká podpora', 'Vzdělávací materiály', 'Uživatelsky přívětivé rozhraní'],
      cons: ['Vyšší poplatky než konkurence', 'Omezený výběr ETF'],
      fees: 'ETF od 0€ do 100k€/měsíc, pak 0.2%',
      rating: 4.0,
      recommended: false
    },
    {
      name: 'Trading 212',
      description: 'Mobilní platforma s nulovými poplatky za ETF',
      pros: ['Nulové poplatky za ETF', 'Moderní mobilní aplikace', 'Fractional shares'],
      cons: ['Omezené pokročilé funkce', 'Mladší platforma'],
      fees: 'ETF 0€, akcie 0€',
      rating: 4.1,
      recommended: true
    },
    {
      name: 'Portu',
      description: 'Český robo-advisor s automatizovaným investováním',
      pros: ['Automatizované investování', 'Česká regulace', 'Jednoduché použití'],
      cons: ['Omezený výběr ETF', 'Vyšší poplatky', 'Méně kontroly'],
      fees: 'Roční poplatek 0.75% + poplatky ETF',
      rating: 3.8,
      recommended: false
    }
  ];

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

        {/* Srovnání brokerů */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Srovnání brokerů
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {brokers.map((broker, index) => (
              <Card key={index} className="relative">
                {broker.recommended && (
                  <Badge className="absolute -top-2 left-4 bg-green-600">
                    Doporučeno
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{broker.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {broker.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {broker.rating}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Výhody:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {broker.pros.map((pro, proIndex) => (
                        <li key={proIndex}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Nevýhody:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {broker.cons.map((con, conIndex) => (
                        <li key={conIndex}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Poplatky:</h4>
                    <p className="text-sm text-gray-600">{broker.fees}</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Navštívit web
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tipy pro začátečníky */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
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
        </div>
      </div>
    </Layout>
  );
};

export default WhereToBuyETFs;
