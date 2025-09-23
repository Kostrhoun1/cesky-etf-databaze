import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle } from 'lucide-react';

const ETFWhereToBuySection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-6 hover:bg-violet-200 transition-colors hover-scale">
          <ShoppingCart className="w-8 h-8 text-violet-700" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Kde koupit ETF fondy?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Nejlepší broker pro ETF - srovnání a doporučení pro české investory</p>
      </div>

      <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s]">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          <strong>Kde koupit ETF v Česku?</strong> Výběr správného brokera je klíčový pro úspěšné investování do ETF. 
          Tady jsou <strong>nejlepší brokeři pro ETF</strong> v Česku s nízkými poplatky a širokou nabídkou:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {[
            { name: "DEGIRO", desc: "Nejpopulárnější broker pro ETF v Evropě. Nízké poplatky, široká nabídka ETF, jednoduché rozhraní. Ideální pro začátečníky.", colorClass: "violet", highlight: "NEJPOPULÁRNĚJŠÍ", link: "/brokers/degiro" },
            { name: "XTB", desc: "Polský broker s českou pobočkou. Nákup ETF zcela zdarma (do 100 000 EUR měsíčně). Výborná česká zákaznická podpora.", colorClass: "emerald", highlight: "ZDARMA DO 100K EUR", link: "/brokers/xtb" },
            { name: "Trading 212", desc: "Moderní broker s mobilní aplikací. Zcela bezpoplatový nákup ETF, frakční podíly, automatické investování (AutoInvest).", colorClass: "violet", highlight: "100% ZDARMA", link: "/brokers/trading212" }
          ].map((broker, index) => (
            <Link key={index} to={broker.link} className={`border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group p-4 rounded-lg ${broker.colorClass === 'emerald' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100' : 'bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100'} card-hover block`} style={{animationDelay: `${0.4 + index * 0.1}s`}}>
              <div className="flex items-center gap-2 mb-2">
                <h5 className={`font-bold text-lg group-hover:${broker.colorClass === 'emerald' ? 'text-emerald-800' : 'text-violet-800'} transition-colors`}>{broker.name}</h5>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${broker.colorClass === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700'}`}>{broker.highlight}</span>
              </div>
              <p className="text-gray-700">{broker.desc}</p>
            </Link>
          ))}
        </div>

        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 card-hover mb-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-white/20 w-10 h-10 group-hover:bg-white/30 transition-colors hover-scale">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">TIP</h4>
              <p className="text-white opacity-90">
                Kompletní srovnání najdete v našem průvodci&nbsp;
                <Link to="/kde-koupit-etf" className="text-white hover:underline font-medium transition-all">kde koupit ETF</Link>&nbsp;
                a <Link to="/srovnani-etf" className="text-white hover:underline font-medium transition-all">srovnávači brokerů</Link>.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-6 card-hover">
            <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-violet-800 transition-colors">Jaký je nejlepší broker pro ETF?</h4>
            <p className="text-gray-700">
              <strong>Pro začátečníky doporučujeme <Link to="/brokers/degiro" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">DEGIRO</Link></strong> - nejpopulárnější volba v Evropě s nízkými poplatky. 
              <strong><Link to="/brokers/xtb" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">XTB</Link></strong> je ideální pro větší investory (zdarma do 100k EUR). 
              <strong><Link to="/brokers/trading212" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">Trading 212</Link></strong> je nejlepší pro malé částky a pravidelné investování.
            </p>
          </div>
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 card-hover">
            <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-800 transition-colors">Je koupit ETF bezpečné?</h4>
            <p className="text-gray-700">
              Ano, nákup ETF přes regulovaného brokera je bezpečný. Vaše ETF jsou vedeny odděleně od majetku brokera a jsou chráněny zákonem. 
              Všichni výše uvedení brokeři jsou regulováni a bezpeční.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button asChild size="lg" className="hover-scale bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold">
          <Link to="/kde-koupit-etf">Kompletní průvodce - kde koupit ETF</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="hover-scale border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-bold">
          <Link to="/srovnani-etf">Srovnání ETF a brokerů</Link>
        </Button>
      </div>
    </div>
  );
};

export default ETFWhereToBuySection;