
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const HowETFWorksSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl mb-6 shadow-lg">
          <Settings className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Jak ETF fungují?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Mechanismus fungování burzovně obchodovaných fondů</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emerald-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vytvoření ETF</h3>
            <p className="text-gray-700">
              Správce fondu nakoupí aktiva podle sledovaného indexu a vytvoří podíly ETF, které se obchodují na burze.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Obchodování</h3>
            <p className="text-gray-700">
              Investoři kupují a prodávají podíly ETF na burze během obchodních hodin za aktuální tržní cenu.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sledování indexu</h3>
            <p className="text-gray-700">
              ETF automaticky replikuje složení a výkonnost sledovaného indexu s minimálním sledovacím rozdílem.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowETFWorksSection;
