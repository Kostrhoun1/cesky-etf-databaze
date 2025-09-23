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
      "FIRE kalkulačka a plánovač finanční nezávislosti",
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
      icon: <Home className="h-6 w-6 text-violet-700" />,
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
      icon: <Calculator className="h-6 w-6 text-emerald-700" />,
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
      icon: <CreditCard className="h-6 w-6 text-violet-700" />,
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
      icon: <TrendingUp className="h-6 w-6 text-emerald-700" />,
      features: ['Výpočty složeného úročení', 'Simulace pravidelného investování', 'Daňové zohlednění', 'Grafické znázornění'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/investicni-kalkulacka',
      searchVolume: '1.2k/měsíc'
    },
    {
      title: 'Kalkulačka poplatků',
      description: 'Analyzujte dopad různých poplatků na váš dlouhodobý výnos',
      icon: <Calculator className="h-6 w-6 text-violet-700" />,
      features: ['TER porovnání', 'Brokerské poplatky', 'Dlouhodobý dopad', 'Srovnání fondů'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/kalkulacka-poplatku-etf',
      searchVolume: '400/měsíc'
    },
    {
      title: 'Monte Carlo simulátor',
      description: 'Simulace možných výsledků vašeho portfolia na základě historických dat',
      icon: <BarChart className="h-6 w-6 text-emerald-700" />,
      features: ['Portfolio alokace', 'Rizikové scénáře', 'Historická data', 'Korelace aktiv'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/monte-carlo-simulator',
      searchVolume: '200/měsíc'
    },
    {
      title: 'FIRE kalkulačka',
      description: 'Naplánujte si cestu k finanční nezávislosti a předčasnému odchodu do důchodu',
      icon: <PiggyBank className="h-6 w-6 text-violet-700" />,
      features: ['4% withdrawal rule', 'FIRE strategie', 'Finanční nezávislost', 'Předčasný důchod'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/fire-kalkulacka',
      searchVolume: '800/měsíc'
    },
    {
      title: 'Nouzová rezerva',
      description: 'Spočítejte si optimální velikost nouzové rezervy podle vaší situace',
      icon: <Shield className="h-6 w-6 text-emerald-700" />,
      features: ['Rizikový profil', 'Optimální velikost', 'Kde držet peníze', 'Strategie spoření'],
      status: 'Dostupné',
      available: true,
      href: '/kalkulacky/nouzova-rezerva',
      searchVolume: '500/měsíc'
    },
    {
      title: 'Kurzový dopad',
      description: 'Analyzujte vliv kurzových změn na vaše ETF portfolio a optimalizujte měnové riziko',
      icon: <DollarSign className="h-6 w-6 text-violet-700" />,
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
        <BreadcrumbNav />

        {/* Hero sekce */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Investiční nástroje 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Investiční nástroje a kalkulačky 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Bezplatné nástroje pro analýzu a plánování vašich ETF investic
          </p>
          
          {/* Odkaz na kompletní přehled */}
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in [animation-delay:0.2s] mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center justify-center rounded-full bg-violet-100 w-10 h-10 group-hover:bg-violet-200 transition-colors hover-scale">
                <Calculator className="h-5 w-5 text-violet-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-violet-800 transition-colors">Kompletní přehled všech kalkulaček</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Prozkoumejte všechny finanční nástroje na jednom místě
            </p>
            <Link to="/kalkulacky">
              <Button className="hover-scale bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3">
                Zobrazit všechny kalkulačky
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => (
            <div key={index} className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center rounded-full bg-violet-100 w-12 h-12 group-hover:bg-violet-200 transition-colors hover-scale">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-violet-800 transition-colors">
                    {tool.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      tool.available 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
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
              
              <p className="text-gray-600 mb-4">{tool.description}</p>
              
              <ul className="space-y-2 mb-4">
                {tool.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {tool.searchVolume && (
                <div className="text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                  📊 {tool.searchVolume} vyhledávání
                </div>
              )}
              
              <Link to={tool.href}>
                <Button 
                  className={`w-full hover-scale ${tool.available 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  disabled={!tool.available}
                >
                  {tool.available ? 'Spustit nástroj' : 'Připravujeme'}
                  {tool.available && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Coming Soon Info */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.8s] text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 group-hover:bg-emerald-200 transition-colors hover-scale">
              <TrendingUp className="h-6 w-6 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
              Další nástroje jsou v přípravě
            </h2>
          </div>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Pracujeme na vytvoření pokročilých nástrojů pro analýzu a plánování vašich investic. 
            Mezitím můžete použít naši investiční kalkulačku nebo prozkoumat databázi ETF fondů.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/srovnani-etf">
              <Button className="hover-scale bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3">
                Prozkoumat ETF fondy
              </Button>
            </Link>
            <Link to="/co-jsou-etf">
              <Button className="hover-scale border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50 font-semibold py-3" variant="outline">
                Vzdělávací články
              </Button>
            </Link>
          </div>
        </div>

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