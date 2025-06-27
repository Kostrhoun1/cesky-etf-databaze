
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const ETFTypesSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl mb-6 shadow-lg">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Důležité typy ETF</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Klíčová rozhodnutí při výběru ETF fondu</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Akumulační vs. Distribuční</CardTitle>
            <p className="text-purple-100">Toto je klíčové rozhodnutí při výběru ETF</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-lg text-purple-900 mb-2">Akumulační (Acc)</h4>
                <p className="text-gray-700">Fond přijaté dividendy automaticky reinvestuje zpět. Ideální pro dlouhodobé budování majetku.</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-bold text-lg text-indigo-900 mb-2">Distribuční (Dist/Inc)</h4>
                <p className="text-gray-700">Fond dividendy pravidelně vyplácí. Získáte pasivní příjem, ale musíte řešit daně.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Fyzické vs. Syntetické</CardTitle>
            <p className="text-green-100">Způsob, jakým ETF kopíruje index</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg text-green-900 mb-2">Fyzické ETF</h4>
                <p className="text-gray-700">Fond reálně nakupuje a drží aktiva z indexu. Jsou transparentnější a jednodušší.</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="font-bold text-lg text-emerald-900 mb-2">Syntetické ETF</h4>
                <p className="text-gray-700">Fond využívá derivátovou smlouvu (swap) k dodání výkonnosti indexu. Nesou malé riziko protistrany.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ETFTypesSection;
