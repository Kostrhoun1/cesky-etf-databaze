
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Target, Play, ShoppingBasket, TrendingUp, Globe } from 'lucide-react';

const ETFIntroductionSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl mb-8 shadow-2xl">
              <Scale className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Co je to ETF?</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ETF = Exchange Traded Fund<br />
              <span className="text-lg text-gray-500">Jednoduché vysvětlení za 2 minuty</span>
            </p>
          </div>
          
          {/* Analogy Section */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <ShoppingBasket className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Představte si nákupní košík</h3>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <p className="text-lg leading-relaxed mb-6">
                        ETF je jako <strong className="text-blue-600">velký nákupní košík plný různých akcií</strong>. 
                        Místo toho, abyste kupovali každou akcii zvlášť (Apple, Microsoft, Google...), 
                        koupíte si celý košík najednou.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Jedním kliknutím tak vlastníte kousek <strong>stovek nebo tisíců společností</strong>. 
                        Je to nejjednodušší způsob, jak diverzifikovat investice.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Praktický příklad:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">1 ETF = 500 největších US firem</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Cena: ~$400 (10 000 Kč)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Poplatek: 0,03% ročně</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Okamžitá diverzifikace</h3>
                <p className="text-gray-600">
                  Jedním nákupem investujete do stovek firem napříč různými sektory a regiony
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nízké poplatky</h3>
                <p className="text-gray-600">
                  Většina ETF má poplatky pod 0,5% ročně - mnohem méně než aktivní fondy
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Snadné obchodování</h3>
                <p className="text-gray-600">
                  Kupuje a prodává se jako akcie - jednoduše, rychle, během obchodních hodin
                </p>
              </CardContent>
            </Card>
          </div>

          {/* YouTube Video Section */}
          <Card className="bg-white border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl mb-6 shadow-lg">
                  <Play className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Vysvětlení ETF ve videu</h3>
                <p className="text-gray-600 text-lg">Podívejte se na praktické vysvětlení ETF fondů za 5 minut</p>
              </div>
              
              <div className="aspect-video max-w-4xl mx-auto">
                <iframe
                  className="w-full h-full rounded-xl shadow-2xl"
                  src="https://www.youtube.com/embed/-mBZSFto4Kk"
                  title="Co jsou ETF fondy?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ETFIntroductionSection;
