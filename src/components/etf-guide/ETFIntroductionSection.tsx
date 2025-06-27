
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Target, Play } from 'lucide-react';

const ETFIntroductionSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl mb-6 shadow-lg">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Co je to ETF?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Jednoduché vysvětlení pro každého</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
        <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Představte si ETF jako <strong className="text-violet-600">velký koš plný různých akcií firem</strong> (nebo dalších investic). Když si koupíte ETF, automaticky tím vlastníte malý kousek <u>mnoha</u> společností najednou – místo toho, abyste vybírali a kupovali každou akcii zvlášť.
              </p>
              <p className="text-lg leading-relaxed">
                ETF funguje na burze úplně stejně jako běžná akcie. Stačí pár kliknutí u brokera a celý koš společností máte během pár vteřin ve svém portfoliu.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Klíčová výhoda</h3>
          </div>
          <blockquote className="text-lg leading-relaxed">
            Jedním ETF můžete najednou investovat například do všech velkých firem v Evropě, v USA nebo na celém světě – jednoduše, levně a bez složitého vybírání konkrétních akcií.
          </blockquote>
        </div>
      </div>

      {/* YouTube Video Section */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-xl mb-4">
            <Play className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Vysvětlení ETF ve videu</h3>
          <p className="text-gray-600">Podívejte se na praktické vysvětlení ETF fondů</p>
        </div>
        
        <div className="aspect-video max-w-4xl mx-auto">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/-mBZSFto4Kk"
            title="Co jsou ETF fondy?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ETFIntroductionSection;
