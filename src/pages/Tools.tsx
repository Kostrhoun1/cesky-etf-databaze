import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, BarChart, PiggyBank, Shield, DollarSign, CreditCard, Home, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';
import BreadcrumbNav from '@/components/SEO/BreadcrumbNav';
import InternalLinking from '@/components/SEO/InternalLinking';
import { Link } from 'react-router-dom';

const Tools: React.FC = () => {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Investiční nástroje a kalkulačky 2025",
    "description": "Bezplatné investiční kalkulačky a nástroje pro ETF investory. Kalkulačka pravidelného investování, analýza poplatků, Monte Carlo simulace.",
    "url": "https://etfpruvodce.cz/nastroje",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Investiční kalkulačka s compound interest",
      "Kalkulačka poplatků ETF fondů",
      "Monte Carlo simulátor portfolia",
      "Kalkulátor pravidelného investování",
      "Penzijní plánovač a retirement kalkulačka",
      "Kalkulačka nouzové rezervy a emergency fund",
      "Analýza kurzového dopadu a currency hedging",
      "Kalkulačka čisté mzdy 2025",
      "Úvěrová kalkulačka - spotřebitelský úvěr",
      "Hypoteční kalkulačka 2025"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Domů",
        "item": "https://etfpruvodce.cz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Investiční nástroje",
        "item": "https://etfpruvodce.cz/nastroje"
      }
    ]
  };

  const tools = [
    {
      title: 'Hypoteční kalkulačka',
      description: 'Spočítejte si hypoteční splátky a celkové náklady na bydlení',
      icon: <Home className="h-8 w-8 text-blue-600" />,
      features: ['Max. doba 30 let', 'Vlastní kapitál', 'Celkové náklady', 'Struktura splátek'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/hypotecni-kalkulacka',
      searchVolume: '80k/měsíc',
      popular: true
    },
    {
      title: 'Kalkulačka čisté mzdy',
      description: 'Spočítejte si čistou mzdu podle aktuální české legislativy pro rok 2025',
      icon: <Calculator className="h-8 w-8 text-green-600" />,
      features: ['Aktuální sazby 2025', 'Slevy na dani', 'Pracující důchodci', 'Náklady zaměstnavatele'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/cisty-plat-2025',
      searchVolume: '15k/měsíc',
      popular: true
    },
    {
      title: 'Úvěrová kalkulačka',
      description: 'Spočítejte si splátky spotřebitelského úvěru a celkové náklady na financování',
      icon: <CreditCard className="h-8 w-8 text-orange-600" />,
      features: ['Max. doba 10 let', 'Úrokové náklady', 'Struktura splátek', 'Srovnání nabídek'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/uverova-kalkulacka',
      searchVolume: '25k/měsíc',
      popular: true
    },
    {
      title: 'Investiční kalkulačka',
      description: 'Spočítejte si růst vašich investic s pravidelným měsíčním investováním',
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      features: ['Výpočty složeného úročení', 'Simulace pravidelného investování', 'Daňové zohlednění', 'Grafické znázornění'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/investicni-kalkulacka',
      searchVolume: '1.2k/měsíc'
    },
    {
      title: 'Kalkulačka poplatků',
      description: 'Analyzujte dopad různých poplatků na váš dlouhodobý výnos',
      icon: <Calculator className="h-8 w-8 text-red-600" />,
      features: ['TER porovnání', 'Brokerské poplatky', 'Dlouhodobý dopad', 'Srovnání fondů'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/kalkulacka-poplatku-etf',
      searchVolume: '400/měsíc'
    },
    {
      title: 'Monte Carlo simulátor',
      description: 'Simulace možných výsledků vašeho portfolia na základě historických dat',
      icon: <BarChart className="h-8 w-8 text-violet-600" />,
      features: ['Portfolio alokace', 'Rizikové scénáře', 'Historická data', 'Korelace aktiv'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/monte-carlo-simulator',
      searchVolume: '200/měsíc'
    },
    {
      title: 'Penzijní plánovač',
      description: 'Spočítejte si, kolik potřebujete na penzi a zda vaše úspory stačí',
      icon: <PiggyBank className="h-8 w-8 text-indigo-600" />,
      features: ['4% withdrawal rule', 'Inflace zohlednění', 'Výběrové strategie', 'Dlouhodobé plánování'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/penzijni-planovac',
      searchVolume: '800/měsíc'
    },
    {
      title: 'Nouzová rezerva',
      description: 'Spočítejte si optimální velikost nouzové rezervy podle vaší situace',
      icon: <Shield className="h-8 w-8 text-cyan-600" />,
      features: ['Rizikový profil', 'Optimální velikost', 'Kde držet peníze', 'Strategie spoření'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/nouzova-rezerva',
      searchVolume: '500/měsíc'
    },
    {
      title: 'Kurzový dopad',
      description: 'Analyzujte vliv kurzových změn na vaše ETF portfolio a optimalizujte měnové riziko',
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      features: ['Měnová expozice', 'Hedging strategie', 'Scénářová analýza', 'ETF doporučení'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/kurzovy-dopad-etf',
      searchVolume: '150/měsíc'
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Investiční nástroje a kalkulačky 2025 - Bezplatné ETF nástroje | ETF průvodce.cz"
        description="Bezplatné investiční kalkulačky a nástroje pro ETF investory. Kalkulačka pravidelného investování, analýza poplatků, Monte Carlo simulace. Všechny nástroje zdarma."
        canonical="https://etfpruvodce.cz/nastroje"
        keywords="investiční nástroje, ETF kalkulačky, pravidelné investování, měsíční investice, Monte Carlo simulátor, kalkulačka poplatků, bezplatné nástroje 2025"
        schema={toolsSchema}
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav
          items={[
            { name: "Domů", href: "/" },
            { name: "Nástroje" }
          ]}
        />

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Investiční nástroje a kalkulačky 2025
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Bezplatné nástroje pro analýzu a plánování vašich ETF investic
          </p>
          
          {/* Odkaz na kompletní přehled */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-blue-700">
              <Calculator className="w-5 h-5" />
              <span className="font-medium">Nově: Kompletní přehled všech kalkulaček</span>
            </div>
            <p className="text-blue-600 text-sm mt-1">
              Prozkoumejte všechny finanční nástroje na jednom místě
            </p>
            <Link to="/kalkulacky">
              <Button className="mt-3 bg-blue-600 hover:bg-blue-700">
                Zobrazit všechny kalkulačky
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {tool.icon}
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        tool.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {tool.status}
                      </span>
                      {tool.popular && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                          🔥 Populární
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {tool.searchVolume && (
                  <div className="text-xs text-gray-500 mb-4">
                    📊 {tool.searchVolume} vyhledávání
                  </div>
                )}
                
                <Link to={tool.href}>
                  <Button 
                    className="w-full" 
                    disabled={!tool.available}
                  >
                    {tool.available ? 'Spustit nástroj' : 'Připravujeme'}
                    {tool.available && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Další nástroje jsou v přípravě
            </h3>
            <p className="text-gray-600 mb-6">
              Pracujeme na vytvoření pokročilých nástrojů pro analýzu a plánování vašich investic. 
              Mezitím můžete použít naši investiční kalkulačku nebo prozkoumat databázi ETF fondů.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/srovnani-etf">Prozkoumat ETF fondy</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/co-jsou-etf">Vzdělávací články</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Content */}
        <InternalLinking 
          relatedLinks={[
            { title: "Srovnání ETF fondů", href: "/srovnani-etf", description: "Najděte si nejlepší ETF pro investování" },
            { title: "Návod pro začátečníky", href: "/navod-pro-zacatecniky", description: "Jak začít investovat do ETF" },
            { title: "Nejlepší brokeři 2025", href: "/srovnani-brokeru", description: "Kde koupit ETF fondy" },
            { title: "Nejlepší ETF 2025", href: "/tipy/nejlepsi-etf-2025", description: "Doporučené ETF fondy pro rok 2025" }
          ]}
        />
      </div>
    </Layout>
  );
};

export default Tools;