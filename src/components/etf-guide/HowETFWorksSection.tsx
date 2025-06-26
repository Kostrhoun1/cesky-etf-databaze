
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Zap, Shield, CheckCircle } from 'lucide-react';

const HowETFWorksSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl mb-6 shadow-lg">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Jak ETF fungují?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Mechanismus jednoduchý jako nákup akcií</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Nákup ETF</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              ETF jednoduše koupíte přes svého brokera, stejně jako třeba akcii Applu. Za jednu cenu tak získáte "vstupenku" do celého trhu (např. do stovky či tisícovky firem najednou).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Když cena firem v koši roste, roste i hodnota ETF.</strong> Pokud firmy zlevní, i vaše ETF může krátkodobě ztratit na hodnotě.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Správa fondu</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>Správu koše</strong> řeší automaticky fond – vy jen držíte ETF a nemusíte sledovat jednotlivé akcie.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>Obchoduje se na burze</strong> – ETF můžete nakupovat a prodávat téměř kdykoliv během dne, stejně jako akcii.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-lg text-emerald-800 font-medium">
            Výhodou ETF je právě jednoduchost: stačí si vybrat správný "koš" a během chvilky investujete do stovek společností najednou.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowETFWorksSection;
