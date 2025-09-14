
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Zap, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const ETFHowTheyWorkSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl mb-8 shadow-2xl">
              <Users className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Jak ETF fungují?</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Mechanismus jednoduchý jako nákup akcií
            </p>
          </div>

          {/* Step-by-step Process */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Krok za krokem</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Vyberte ETF</h4>
                    <p className="text-gray-600">Zvolte si "koš" - například S&P 500 (500 největších US firem)</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Kupte u brokera</h4>
                    <p className="text-gray-600">Nákup jako u akcií - zadáte ticker (např. VUSA) a množství</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Vlastníte podíl</h4>
                    <p className="text-gray-600">Automaticky vlastníte kousek všech firem v "koši"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How it Works Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Jak nakupujete ETF</h3>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ETF jednoduše koupíte přes svého brokera, <strong className="text-emerald-600">stejně jako akcii Applu</strong>. 
                    Za jednu cenu tak získáte "vstupenku" do celého trhu.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Příklad:</p>
                    <p className="text-gray-700">
                      <strong>1× VUSA ETF = podíl na 500 největších US firem</strong><br/>
                      Místo nákupu 500 akcií zvlášť → 1 kliknutí
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Správa a hodnota</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                    <span className="text-gray-700"><strong className="text-gray-900">Automatická správa</strong> - fond sleduje index a kupuje/prodává akcie za vás</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                    <span className="text-gray-700"><strong className="text-gray-900">Obchodování na burze</strong> - kupujete a prodáváte kdykoliv během dne</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                    <span className="text-gray-700"><strong className="text-gray-900">Hodnota kopíruje trh</strong> - když firmy rostou, roste i ETF</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Key Insight */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 border-0 shadow-2xl">
              <CardContent className="p-8 md:p-12 text-white">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4">Klíčová výhoda ETF</h3>
                  <p className="text-xl leading-relaxed opacity-90">
                    Stačí si vybrat správný "koš" a během chvilky investujete do <strong>stovek společností najednou</strong> - 
                    bez nutnosti sledovat jednotlivé akcie nebo platit vysoké poplatky za správu.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETFHowTheyWorkSection;
