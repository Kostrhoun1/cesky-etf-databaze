
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import DetailedBrokerComparison from '../components/home/DetailedBrokerComparison';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Shield, TrendingUp, Store, ArrowRight, Users, Award } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import InternalLinking, { BrokerGuideRelatedLinks } from '@/components/SEO/InternalLinking';
import { generateBrokerSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';

const WhereToBuyETFs = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema(),
      generateFAQSchema(),
      generateBreadcrumbSchema()
    ]
  };

  const considerations = [
    {
      icon: DollarSign,
      title: 'Poplatky a náklady',
      description: 'Porovnejte transakční poplatky, správní poplatky a poplatky za vedení účtu',
      highlight: 'Od 0€ za transakci',
      color: 'emerald'
    },
    {
      icon: Shield,
      title: 'Regulace a bezpečnost',
      description: 'Vybírejte brokery regulované v EU s ochranou investorů',
      highlight: 'Ochrana do 20 000€',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Výběr ETF',
      description: 'Ujistěte se, že broker nabízí ETF, které chcete koupit',
      highlight: '3000+ ETF fondů',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Uživatelské rozhraní',
      description: 'Intuitivní platforma je klíčová pro pohodlné investování',
      highlight: 'Mobilní aplikace',
      color: 'orange'
    }
  ];

  return (
    <Layout>
      <SEOHead
        title={`Kde koupit ETF? Srovnání nejlepších brokerů ${currentYear} | ETF průvodce.cz`}
        description={`Kompletní srovnání brokerů pro ETF investice ${currentYear}. DEGIRO, XTB, Trading 212, Interactive Brokers, Fio. Poplatky, recenze, zkušenosti českých investorů.`}
        canonical="https://etfpruvodce.cz/kde-koupit-etf"
        keywords={`kde koupit ETF ${currentYear}, nejlepší brokeři ${currentYear}, DEGIRO recenze ${currentYear}, XTB recenze ${currentYear}, Trading 212 recenze ${currentYear}, Interactive Brokers recenze ${currentYear}, srovnání brokerů ${currentYear}, poplatky brokerů, broker pro ETF Česká republika`}
        ogImage="https://etfpruvodce.cz/og-where-to-buy.jpg"
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
      />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in border border-white/20">
              <Store className="w-4 h-4 mr-2" />
              Srovnání nejlepších brokerů {currentYear}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
              Kde koupit <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ETF fondy?</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Najděte ideálního brokera pro vaše investice do ETF. 
              Srovnání poplatků, funkcí a recenze od skutečných uživatelů.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-semibold mb-2">Top 6 brokerů</h3>
                <p className="text-sm text-blue-200">Ověření a doporučení investory</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold mb-2">Aktuální poplatky</h3>
                <p className="text-sm text-blue-200">Průběžně aktualizované ceny</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🇨🇿</div>
                <h3 className="font-semibold mb-2">Pro české investory</h3>
                <p className="text-sm text-blue-200">Specifika českého trhu</p>
              </div>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-blue-200 mb-6 text-lg">
                👇 Posuňte se níže pro detailní srovnání všech brokerů
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    document.getElementById('porovnani')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  <Award className="w-5 h-5 mr-2" />
                  Srovnání brokerů
                </Button>
                <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold">
                  <Link to="/tipy/jak-zacit-investovat-do-etf">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Jak začít investovat
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Factors Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl mb-8 shadow-2xl">
              <Shield className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Na co se zaměřit při výběru brokera
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Klíčové faktory pro správnou volbu investiční platformy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {considerations.map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                emerald: 'from-emerald-500 to-teal-600 border-emerald-100',
                blue: 'from-blue-500 to-indigo-600 border-blue-100',
                purple: 'from-purple-500 to-violet-600 border-purple-100',
                orange: 'from-orange-500 to-red-600 border-orange-100'
              };
              
              return (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[item.color]} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">{item.title}</CardTitle>
                    <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium inline-block">
                      {item.highlight}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailní srovnání brokerů */}
      <div id="porovnani">
        <DetailedBrokerComparison />
      </div>

      {/* Tips Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl mb-8 shadow-2xl">
              <Users className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tipy pro začátečníky
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Jak začít s investováním do ETF přes brokery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Začněte s demo účtem",
                description: "Většina brokerů nabízí demo účty, kde si můžete vyzkoušet platformu bez rizika a naučit se základy obchodování.",
                icon: "🎮"
              },
              {
                title: "Porovnejte celkové náklady",
                description: "Nezaměřujte se jen na transakční poplatky, ale i na poplatky za vedení účtu, převody a měnové konverze.",
                icon: "💰"
              },
              {
                title: "Ověřte regulaci",
                description: "Vybírejte pouze brokery regulované v EU s ochranou investorů do 20 000€ podle ESMA směrnic.",
                icon: "🛡️"
              },
              {
                title: "Začněte malými částkami",
                description: "Prvotní investice nemusí být vysoká. Důležité je začít a postupně se učit na vlastních zkušenostech.",
                icon: "🌱"
              }
            ].map((tip, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group p-6">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{tip.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Link to="/tipy/jak-zacit-investovat-do-etf">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Jak začít s ETF investicemi
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  document.getElementById('porovnani')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <Award className="w-5 h-5 mr-2" />
                Srovnání brokerů výše
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Internal Linking */}
        <InternalLinking 
          relatedLinks={BrokerGuideRelatedLinks} 
        />
      </div>
    </Layout>
  );
};

export default WhereToBuyETFs;
