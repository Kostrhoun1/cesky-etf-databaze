import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, BarChart, PiggyBank, Shield, DollarSign, CreditCard, Home, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalculatorItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  difficulty: string;
  category: 'investment' | 'finance' | 'advanced';
}

const CalculatorHub: React.FC = () => {
  const calculators: CalculatorItem[] = [
    {
      title: 'Hypoteční kalkulačka',
      description: 'Spočítejte si hypoteční splátky a celkové náklady na bydlení',
      icon: <Home className="h-8 w-8 text-blue-600" />,
      href: '/kalkulacky/hypotecni-kalkulacka',
      difficulty: 'Snadná',
      category: 'finance',
    },
    {
      title: 'Spotřebitelský úvěr',
      description: 'Kalkulačka splátek spotřebitelského úvěru a celkových nákladů',
      icon: <CreditCard className="h-8 w-8 text-orange-600" />,
      href: '/kalkulacky/uverova-kalkulacka',
      difficulty: 'Snadná',
      category: 'finance',
    },
    {
      title: 'Čistý plat 2025',
      description: 'Výpočet čisté mzdy podle aktuální české legislativy',
      icon: <Calculator className="h-8 w-8 text-green-600" />,
      href: '/kalkulacky/cisty-plat-2025',
      difficulty: 'Snadná',
      category: 'finance',
    },
    {
      title: 'Investiční kalkulačka',
      description: 'DCA strategie a compound interest výpočty pro ETF investice',
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      href: '/kalkulacky/investicni-kalkulacka',
      difficulty: 'Střední',
      category: 'investment'
    },
    {
      title: 'Penzijní plánovač',
      description: '4% withdrawal rule a FIRE plánování pro předčasný důchod',
      icon: <PiggyBank className="h-8 w-8 text-indigo-600" />,
      href: '/kalkulacky/penzijni-planovac',
      difficulty: 'Střední',
      category: 'investment'
    },
    {
      title: 'Nouzová rezerva',
      description: 'Optimální velikost emergency fund podle vaší situace',
      icon: <Shield className="h-8 w-8 text-cyan-600" />,
      href: '/kalkulacky/nouzova-rezerva',
      difficulty: 'Snadná',
      category: 'finance'
    },
    {
      title: 'ETF poplatky',
      description: 'Analýza dopadu TER a dalších poplatků na dlouhodobé výnosy',
      icon: <Target className="h-8 w-8 text-red-600" />,
      href: '/kalkulacky/kalkulacka-poplatku-etf',
      difficulty: 'Střední',
      category: 'investment'
    },
    {
      title: 'Monte Carlo simulátor',
      description: 'Pokročilá simulace portfolia na základě historických dat',
      icon: <BarChart className="h-8 w-8 text-violet-600" />,
      href: '/kalkulacky/monte-carlo-simulator',
      difficulty: 'Pokročilá',
      category: 'advanced'
    },
    {
      title: 'Měnový dopad',
      description: 'Analýza kurzového rizika a hedging strategií pro ETF',
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      href: '/kalkulacky/kurzovy-dopad-etf',
      difficulty: 'Pokročilá',
      category: 'advanced'
    }
  ];

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'investment': return 'Investiční nástroje';
      case 'finance': return 'Finanční kalkulačky';
      case 'advanced': return 'Pokročilé analýzy';
      default: return 'Ostatní';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'investment': return 'Nástroje pro ETF investory a dlouhodobé spoření';
      case 'finance': return 'Základní finanční výpočty pro každodenní použití';
      case 'advanced': return 'Pokročilé analýzy pro zkušené investory';
      default: return '';
    }
  };

  const categorizedCalculators = calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, CalculatorItem[]>);

  return (
    <div className="space-y-12">
      {/* Kalkulačky podle kategorií */}
      {Object.entries(categorizedCalculators).map(([category, calcs]) => (
        <div key={category}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {getCategoryTitle(category)}
            </h2>
            <p className="text-gray-600">
              {getCategoryDescription(category)}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calcs.map((calc, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {calc.icon}
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {calc.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{calc.description}</p>
                  <div className="flex justify-end items-center text-sm text-gray-500 mb-4">
                    <span className={`px-2 py-1 rounded ${
                      calc.difficulty === 'Snadná' ? 'bg-green-100 text-green-800' :
                      calc.difficulty === 'Střední' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {calc.difficulty}
                    </span>
                  </div>
                  <Link
                    to={calc.href}
                    className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Spustit kalkulačku
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* SEO text pro kalkulačky */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Proč používat naše finanční kalkulačky?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              Aktuální data 2025
            </h3>
            <p className="text-gray-700 mb-4">
              Všechny naše kalkulačky používají nejnovější sazby, daňové změny a legislativní úpravy 
              platné pro rok 2025. Hypoteční sazby, daně z příjmů, pojistné - vše je aktuální.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Daňové sazby:</strong> Aktuální slevy a sazby daně z příjmů</li>
              <li>• <strong>Úrokové sazby:</strong> Současné sazby hypoték a úvěrů</li>
              <li>• <strong>Pojistné:</strong> Zdravotní a sociální pojištění 2025</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              Komplexní finanční plánování
            </h3>
            <p className="text-gray-700 mb-4">
              Od základních výpočtů po pokročilé investiční strategie. Naše nástroje pokrývají 
              celé spektrum finančního plánování - od hypotéky po FIRE movement.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Základní výpočty:</strong> Mzda, úvěry, hypotéky</li>
              <li>• <strong>Investiční plánování:</strong> ETF, DCA, compound interest</li>
              <li>• <strong>Pokročilé analýzy:</strong> Monte Carlo, měnová rizika</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorHub;