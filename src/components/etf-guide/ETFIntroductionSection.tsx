import React from 'react';
import { Scale, Target, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const ETFIntroductionSection: React.FC = () => {
  return (
    <section>
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 mx-auto mb-6 hover:bg-emerald-200 transition-colors hover-scale">
            <Scale className="w-8 h-8 text-emerald-700" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Co jsou ETF fondy?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ETF = Exchange Traded Fund = Investiční nástroj pro pasivní investování
          </p>
        </div>

        {/* Jednoduchá definice */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s] mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-emerald-800 transition-colors">ETF jednoduše vysvětleno</h3>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                <strong className="text-emerald-600">ETF fond je jako nákupní košík</strong> plný akcií nebo dluhopisů. 
                Místo kupování jednotlivých akcií (Apple, Microsoft, Google...) koupíte celý "košík" najednou.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Jedním nákupem tak automaticky investujete do <strong>stovek společností současně</strong>. 
                To je podstata pasivního investování.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
                <p className="text-sm text-gray-600 font-medium">💡 Příklad:</p>
                <p className="text-gray-700">Koupíte 1 ETF za 10.000 Kč → automaticky vlastníte kousky Apple, Microsoft, Google a 497 dalších firem</p>
              </div>
            </div>
            
            <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Nejpopulárnější ETF:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Link to="/etf/vwce" className="text-gray-700 hover:text-emerald-600 transition-colors"><strong>VWCE</strong> - Celý svět</Link>
                  <span className="text-emerald-600 text-sm font-semibold">3800+ firem</span>
                </div>
                <div className="flex items-center justify-between">
                  <Link to="/etf/cspx" className="text-gray-700 hover:text-emerald-600 transition-colors"><strong>CSPX</strong> - S&P 500</Link>
                  <span className="text-emerald-600 text-sm font-semibold">500 US firem</span>
                </div>
                <div className="flex items-center justify-between">
                  <Link to="/etf/iwda" className="text-gray-700 hover:text-emerald-600 transition-colors"><strong>IWDA</strong> - Vyspělé země</Link>
                  <span className="text-emerald-600 text-sm font-semibold">1600+ firem</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link to="/srovnani-etf" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                  → Porovnat všechny ETF fondy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Pasivní vs Aktivní investování */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.4s] mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-violet-800 transition-colors">ETF = Pasivní investování</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-emerald-600" />
                <h4 className="text-lg font-bold text-emerald-800">Pasivní investování (ETF)</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Sleduje index (např. S&P 500)</li>
                <li>✅ Nízké poplatky (0,05-0,5% ročně)</li>
                <li>✅ Automatická diverzifikace</li>
                <li>✅ Žádné rozhodování o jednotlivých akciích</li>
                <li>✅ Dlouhodobě lepší výsledky</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-red-600" />
                <h4 className="text-lg font-bold text-red-800">Aktivní investování</h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>❌ Snaha "porazit" trh</li>
                <li>❌ Vysoké poplatky (1-3% ročně)</li>
                <li>❌ Nutnost výběru akcií</li>
                <li>❌ Časově náročné</li>
                <li>❌ 90% aktivních fondů prohrává s indexem</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">
              <strong className="text-emerald-600">ETF fondy jsou ideální pro pasivní investory</strong> - 
              nastavíte a necháte běžet dlouhodobě.
            </p>
          </div>
        </div>

        {/* Klíčové výhody pro začátečníky */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in [animation-delay:0.5s] text-center">
            <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 group-hover:bg-emerald-200 transition-colors hover-scale mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-emerald-700" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors mb-3">Jednoduché na pochopení</h4>
            <p className="text-gray-600 text-sm">
              ETF pro začátečníky - žádná složitá analýza akcií, stačí vybrat jeden fond
            </p>
          </div>

          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in [animation-delay:0.6s] text-center">
            <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 group-hover:bg-violet-200 transition-colors hover-scale mx-auto mb-4">
              <Target className="w-8 h-8 text-violet-700" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-violet-800 transition-colors mb-3">Nízké poplatky</h4>
            <p className="text-gray-600 text-sm">
              Většina ETF má poplatky pod 0,3% ročně - výrazně méně než aktivní fondy
            </p>
          </div>

          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in [animation-delay:0.7s] text-center">
            <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 group-hover:bg-emerald-200 transition-colors hover-scale mx-auto mb-4">
              <Shield className="w-8 h-8 text-emerald-700" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors mb-3">Bezpečná diverzifikace</h4>
            <p className="text-gray-600 text-sm">
              Investice rozložená do stovek firem snižuje riziko krachu jednotlivých akcií
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETFIntroductionSection;