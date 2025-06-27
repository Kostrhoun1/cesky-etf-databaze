
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const WhatIsETFSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl mb-6 shadow-lg">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Co jsou ETF fondy?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Jednoduchý a srozumitelný výklad základních pojmů</p>
      </div>
      
      <Card className="bg-white border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>ETF (Exchange-Traded Fund)</strong> je burzovně obchodovaný fond, který sleduje výkonnost určitého indexu, komodity, dluhopisů nebo košíku aktiv. ETF kombinuje výhody akcií a podílových fondů.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-violet-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-violet-800 mb-3">Jak fungují ETF?</h3>
                <p className="text-gray-700">
                  ETF sledují konkrétní index (např. S&P 500) a jejich cena se pohybuje podle hodnoty podkladových aktiv. Obchodují se na burze jako akcie.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Proč jsou populární?</h3>
                <p className="text-gray-700">
                  Nabízejí širokou diverzifikaci, nízké poplatky, transparentnost a flexibilitu obchodování během burzovních hodin.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatIsETFSection;
