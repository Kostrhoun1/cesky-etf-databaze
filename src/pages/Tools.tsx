import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, BarChart } from 'lucide-react';
import InvestmentCalculator from '@/components/tools/InvestmentCalculator';
import FeeCalculator from '@/components/tools/FeeCalculator';
import MonteCarloSimulator from '@/components/tools/MonteCarloSimulator';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';
import BreadcrumbNav from '@/components/SEO/BreadcrumbNav';
import InternalLinking from '@/components/SEO/InternalLinking';

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'feeCalculator' | 'monteCarlo'>('overview');

  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Investiční nástroje a kalkulačky 2025",
    "description": "Bezplatné investiční kalkulačky a nástroje pro ETF investory. DCA kalkulačka, analýza poplatků, Monte Carlo simulace.",
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
      "DCA strategie kalkulátor"
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
      title: 'Investiční kalkulačka',
      description: 'Spočítejte si růst vašich investic s pravidelným investováním (DCA)',
      icon: <Calculator className="h-8 w-8 text-blue-600" />,
      features: ['Compound interest výpočty', 'DCA simulace', 'Daňové zohlednění', 'Grafické znázornění'],
      status: 'Dostupné',
      available: true,
      tabName: 'calculator'
    },
    {
      title: 'Kalkulačka poplatků',
      description: 'Analyzujte dopad různých poplatků na váš dlouhodobý výnos',
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      features: ['TER porovnání', 'Brokerské poplatky', 'Dlouhodobý dopad', 'Srovnání fondů'],
      status: 'Dostupné',
      available: true,
      tabName: 'feeCalculator'
    },
    {
      title: 'Monte Carlo simulátor',
      description: 'Simulace možných výsledků vašeho portfolia na základě historických dat',
      icon: <BarChart className="h-8 w-8 text-blue-600" />,
      features: ['Portfolio alokace', 'Rizikové scénáře', 'Historická data', 'Korelace aktiv'],
      status: 'Dostupné',
      available: true,
      tabName: 'monteCarlo'
    }
  ];

  if (activeTab === 'calculator') {
    return (
      <Layout>
        <SEOHead
          title="Investiční kalkulačka DCA 2025 - Spočítejte si výnosy | ETF průvodce.cz"
          description="Bezplatná investiční kalkulačka s compound interest. Spočítejte si výnosy z pravidelného investování (DCA) do ETF fondů. Včetně daní a inflace."
          canonical="https://etfpruvodce.cz/nastroje/investicni-kalkulacka"
          keywords="investiční kalkulačka, DCA kalkulačka, compound interest, výpočet výnosů, pravidelné investování, ETF kalkulačka 2025"
          schema={toolsSchema}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNav />
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('overview')}
              className="mb-4"
            >
              ← Zpět na přehled nástrojů
            </Button>
          </div>
          <InvestmentCalculator />
          <InternalLinking 
            relatedLinks={[
              { title: "Kalkulačka poplatků ETF", href: "/nastroje", description: "Spočítejte si dopad poplatků na výnosy" },
              { title: "Monte Carlo simulátor", href: "/nastroje", description: "Simulace možných výsledků portfolia" },
              { title: "Srovnání ETF fondů", href: "/srovnani-etf", description: "Najděte si nejlepší ETF pro investování" }
            ]}
          />
        </div>
      </Layout>
    );
  }

  if (activeTab === 'feeCalculator') {
    return (
      <Layout>
        <SEOHead
          title="Kalkulačka poplatků ETF 2025 - TER a dopad na výnosy | ETF průvodce.cz"
          description="Spočítejte si dopad poplatků ETF na dlouhodobé výnosy. Srovnání TER, transakčních poplatků a jejich vliv na investice."
          canonical="https://etfpruvodce.cz/nastroje/kalkulacka-poplatku"
          keywords="kalkulačka poplatků ETF, TER kalkulačka, poplatky ETF fondů, dopad poplatků na výnosy, srovnání poplatků 2025"
          schema={toolsSchema}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNav />
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('overview')}
              className="mb-4"
            >
              ← Zpět na přehled nástrojů
            </Button>
          </div>
          <FeeCalculator />
          <InternalLinking 
            relatedLinks={[
              { title: "Investiční kalkulačka", href: "/nastroje", description: "Spočítejte si výnosy z pravidelného investování" },
              { title: "Srovnání ETF fondů", href: "/srovnani-etf", description: "Porovnejte poplatky různých ETF fondů" },
              { title: "Nejlepší ETF 2025", href: "/tipy/nejlepsi-etf-2025", description: "ETF s nejnižšími poplatky" }
            ]}
          />
        </div>
      </Layout>
    );
  }

  if (activeTab === 'monteCarlo') {
    return (
      <Layout>
        <SEOHead
          title="Monte Carlo simulátor portfolia 2025 - Analýza rizik | ETF průvodce.cz"
          description="Monte Carlo simulace výsledků vašeho ETF portfolia. Analýza rizik, historická data a pravděpodobnostní scénáře pro investory."
          canonical="https://etfpruvodce.cz/nastroje/monte-carlo"
          keywords="Monte Carlo simulátor, analýza rizik portfolia, simulace ETF, pravděpodobnostní analýza, backtesting 2025"
          schema={toolsSchema}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNav />
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('overview')}
              className="mb-4"
            >
              ← Zpět na přehled nástrojů
            </Button>
          </div>
          <MonteCarloSimulator />
          <InternalLinking 
            relatedLinks={[
              { title: "Investiční kalkulačka", href: "/nastroje", description: "Základní výpočty pro investování" },
              { title: "Srovnání ETF fondů", href: "/srovnani-etf", description: "Najděte si ETF pro vaše portfolio" },
              { title: "All Weather Portfolio", href: "/tipy/all-weather-portfolio", description: "Diverzifikovaná strategie" }
            ]}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Investiční nástroje a kalkulačky 2025 - Bezplatné ETF nástroje | ETF průvodce.cz"
        description="Bezplatné investiční kalkulačky a nástroje pro ETF investory. DCA kalkulačka, analýza poplatků, Monte Carlo simulace. Všechny nástroje zdarma."
        canonical="https://etfpruvodce.cz/nastroje"
        keywords="investiční nástroje, ETF kalkulačky, DCA kalkulačka, Monte Carlo simulátor, kalkulačka poplatků, bezplatné nástroje 2025"
        schema={toolsSchema}
      />
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav />
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Investiční nástroje a kalkulačky 2025
          </h1>
          <p className="text-lg text-gray-600">
            Bezplatné nástroje pro analýzu a plánování vašich ETF investic
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {tool.icon}
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      tool.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  disabled={!tool.available}
                  onClick={() => tool.available && tool.tabName && setActiveTab(tool.tabName as any)}
                >
                  {tool.available ? 'Spustit nástroj' : 'Připravujeme'}
                </Button>
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
                <a href="/srovnani-etf">Prozkoumat ETF fondy</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/co-jsou-etf">Vzdělávací články</a>
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
