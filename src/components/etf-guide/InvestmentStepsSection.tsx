
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { investmentSteps } from '@/data/whatAreETFsData';

const InvestmentStepsSection: React.FC = () => {
  return (
    <div id="jak-zacit" className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl mb-6 shadow-lg">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Jak začít investovat do ETF?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Krok za krokem k vašemu prvnímu ETF</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-purple-600 hidden lg:block"></div>
        <ol className="space-y-8">
          {investmentSteps.map((step, index) => (
            <li key={index} className="relative flex items-start gap-6 lg:pl-16">
              <div className={`flex-shrink-0 w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg lg:absolute lg:left-0 lg:transform lg:-translate-x-1/2`}>
                <step.icon className="w-8 h-8" />
              </div>
              <Card className="flex-1 bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <h4 className="font-bold text-xl text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{step.description} Najděte ten pravý fond pomocí našeho <Link to="/srovnani-etf" className="text-violet-600 hover:underline font-medium">srovnávače</Link>.</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default InvestmentStepsSection;
