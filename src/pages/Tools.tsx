import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, BarChart } from 'lucide-react';
import InvestmentCalculator from '@/components/tools/InvestmentCalculator';
import FeeCalculator from '@/components/tools/FeeCalculator';
import MonteCarloSimulator from '@/components/tools/MonteCarloSimulator';

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'feeCalculator' | 'monteCarlo'>('overview');

  useEffect(() => {
    document.title = 'Investiční nástroje a kalkulačky - ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Investiční kalkulačky, backtesting portfolia, analýza poplatků. Bezplatné nástroje pro ETF investory.'
    );
  }, []);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>
      </Layout>
    );
  }

  if (activeTab === 'feeCalculator') {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>
      </Layout>
    );
  }

  if (activeTab === 'monteCarlo') {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Investiční nástroje a kalkulačky
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
      </div>
    </Layout>
  );
};

export default Tools;
