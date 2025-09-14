import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { generateBrokerSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';
import DetailedBrokerComparison from '@/components/home/DetailedBrokerComparison';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, TrendingUp, Users, Zap } from 'lucide-react';

const BrokerComparison2025 = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema(),
      generateFAQSchema(),
      generateBreadcrumbSchema()
    ]
  };

  const topBrokers = [
    {
      name: "Trading 212",
      rating: 4.2,
      highlight: "Nulové poplatky",
      description: "Ideální pro začátečníky s AutoInvest funkcí"
    },
    {
      name: "XTB",
      rating: 4.7,
      highlight: "Česká podpora",
      description: "Nejlepší pro české investory s profesionální podporou"
    },
    {
      name: "DEGIRO",
      rating: 4.5,
      highlight: "Nízké poplatky",
      description: "Populární volba s širokou nabídkou ETF"
    },
    {
      name: "Interactive Brokers",
      rating: 4.8,
      highlight: "Globální dosah",
      description: "Pro pokročilé investory s nejširší nabídkou"
    }
  ];

  return (
    <Layout>
      <SEOHead 
        title={`Srovnání brokerů ${currentYear}: Nejlepší platformy pro ETF investice | ETF průvodce.cz`}
        description={`Kompletní srovnání brokerů ${currentYear} pro ETF investice. DEGIRO vs XTB vs Trading 212 vs Interactive Brokers. Poplatky, recenze, hodnocení pro české investory.`}
        keywords={`srovnání brokerů ${currentYear}, nejlepší broker ${currentYear}, DEGIRO vs XTB ${currentYear}, Trading 212 vs Interactive Brokers, broker pro ETF srovnání, poplatky brokerů ${currentYear}`}
        canonical="https://etfpruvodce.cz/srovnani-brokeru"
        ogImage="https://etfpruvodce.cz/og-broker-comparison.jpg"
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50/30">
        {/* Hero sekce */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Srovnání brokerů {currentYear}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Kompletní analýza nejlepších brokerů pro ETF investice v České republice. 
              Objektivní porovnání poplatků, funkcí a služeb pro vaše investiční potřeby.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">5</div>
                <div className="text-sm opacity-80">Analyzovaných brokerů</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm opacity-80">Hodnocených kritérií</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">2025</div>
                <div className="text-sm opacity-80">Aktuální data</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-80">Nezávislé hodnocení</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Top 4 brokeři v přehledu */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                🏆 Nejlepší brokeři pro ETF investice {currentYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topBrokers.map((broker, index) => (
                  <div key={broker.name} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <Badge variant="outline" className="mb-2">#{index + 1}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{broker.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(broker.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm ml-1">({broker.rating})</span>
                    </div>
                    <Badge className="mb-2 bg-blue-100 text-blue-800">{broker.highlight}</Badge>
                    <p className="text-sm text-gray-600">{broker.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rychlé srovnání klíčových metrik */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Rychlé srovnání - Klíčové metriky
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Nejnižší poplatky
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Trading 212</span>
                      <Badge className="bg-green-600">0% ETF</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">XTB</span>
                      <Badge className="bg-green-600">0% ETF (limit)</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Nejlepší podpora
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">XTB</span>
                      <Badge className="bg-blue-600">CZ 24/5</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">Fio e-Broker</span>
                      <Badge className="bg-blue-600">CZ 8-18</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-purple-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Nejlepší funkce
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium">Trading 212</span>
                      <Badge className="bg-purple-600">AutoInvest</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium">Interactive Brokers</span>
                      <Badge className="bg-purple-600">Globální trhy</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kategorie podle typu investora */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Doporučení podle typu investora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <h3 className="font-bold text-green-800 mb-3">🌱 Začátečníci</h3>
                  <p className="text-sm text-green-700 mb-4">
                    Pro první kroky do světa investic s minimálními náklady.
                  </p>
                  <div className="space-y-2">
                    <div className="font-semibold">1. Trading 212</div>
                    <div className="font-semibold">2. XTB</div>
                  </div>
                </div>

                <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                  <h3 className="font-bold text-blue-800 mb-3">🇨🇿 Česká podpora</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Pro investory preferující komunikaci v češtině.
                  </p>
                  <div className="space-y-2">
                    <div className="font-semibold">1. XTB</div>
                    <div className="font-semibold">2. Fio e-Broker</div>
                  </div>
                </div>

                <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-violet-50">
                  <h3 className="font-bold text-purple-800 mb-3">📈 Pokročilí</h3>
                  <p className="text-sm text-purple-700 mb-4">
                    Pro zkušené investory s náročnými požadavky.
                  </p>
                  <div className="space-y-2">
                    <div className="font-semibold">1. Interactive Brokers</div>
                    <div className="font-semibold">2. XTB</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailní srovnání */}
        <DetailedBrokerComparison />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Potřebujete pomoc s výběrem brokera?
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Náš kompletní průvodce vám pomůže najít ideálního brokera pro vaše investiční potřeby.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/kde-koupit-etf"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Průvodce výběrem brokera
                </a>
                <a
                  href="/navod-pro-zacatecniky"
                  className="inline-flex items-center px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Návod pro začátečníky
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BrokerComparison2025;