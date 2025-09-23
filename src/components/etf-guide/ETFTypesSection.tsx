import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const ETFTypesSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-6 hover:bg-violet-200 transition-colors hover-scale">
          <Shield className="w-8 h-8 text-violet-700" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Typy ETF fondů - který vybrat?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Průvodce nejlepšími ETF fondy pro začátečníky</p>
      </div>

      <div className="space-y-8">
        {/* Main Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 card-hover animate-fade-in [animation-delay:0.2s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center rounded-full bg-violet-100 w-10 h-10 group-hover:bg-violet-200 transition-colors hover-scale">
                <span className="text-xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-800 transition-colors">Akciové ETF</h3>
            </div>
            <p className="text-gray-700 mb-3">Investují do akcií společností. Nejvyšší potenciál růstu, ale i vyšší riziko.</p>
            <p className="text-sm text-violet-600 font-medium">Nejpopulárnější pro dlouhodobé investování</p>
          </div>
          
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 card-hover animate-fade-in [animation-delay:0.3s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center rounded-full bg-emerald-100 w-10 h-10 group-hover:bg-emerald-200 transition-colors hover-scale">
                <span className="text-xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">Dluhopisové ETF</h3>
            </div>
            <p className="text-gray-700 mb-3">Investují do státních a firemních dluhopisů. Nižší riziko, stabilnější výnosy.</p>
            <p className="text-sm text-emerald-600 font-medium">Ideální pro konzervativní investory</p>
          </div>
          
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 card-hover animate-fade-in [animation-delay:0.4s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center rounded-full bg-amber-100 w-10 h-10 group-hover:bg-amber-200 transition-colors hover-scale">
                <span className="text-xl">🥇</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors">Komoditní ETF</h3>
            </div>
            <p className="text-gray-700 mb-3">Investují do zlata, stříbra, ropy nebo jiných komodit. Ochrana proti inflaci.</p>
            <p className="text-sm text-amber-600 font-medium">Doplněk portfolia (5-10%)</p>
          </div>
        </div>

        {/* Best ETF Examples */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.5s]">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-violet-800 transition-colors">Nejlepší ETF fondy pro začátečníky</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg text-violet-900 mb-4">🌍 Celosvětové akciové ETF</h4>
              <div className="space-y-3">
                <Link to="/etf/vwce" className="flex justify-between items-center p-3 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors block">
                  <span className="font-medium">VWCE (Vanguard FTSE All-World)</span>
                  <span className="text-sm text-violet-600">TER: 0,22%</span>
                </Link>
                <Link to="/etf/swda" className="flex justify-between items-center p-3 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors block">
                  <span className="font-medium">SWDA (iShares Core MSCI World)</span>
                  <span className="text-sm text-violet-600">TER: 0,20%</span>
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg text-emerald-900 mb-4">🇺🇸 Americké akciové ETF</h4>
              <div className="space-y-3">
                <Link to="/etf/cspx" className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors block">
                  <span className="font-medium">CSPX (iShares Core S&P 500)</span>
                  <span className="text-sm text-emerald-600">TER: 0,07%</span>
                </Link>
                <Link to="/etf/vuaa" className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors block">
                  <span className="font-medium">VUAA (Vanguard S&P 500)</span>
                  <span className="text-sm text-emerald-600">TER: 0,07%</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
            <p className="text-gray-700">
              <strong>Tip pro začátečníky:</strong> Začněte s jedním celosvětovým ETF jako <Link to="/etf/vwce" className="text-violet-600 hover:text-violet-800 hover:underline">VWCE</Link> nebo <Link to="/etf/swda" className="text-violet-600 hover:text-violet-800 hover:underline">SWDA</Link>. 
              Poskytují okamžitou diverzifikaci do tisíců firem z celého světa. Porovnejte všechny fondy v našem <Link to="/srovnani-etf" className="text-violet-600 hover:text-violet-800 hover:underline">srovnávači ETF</Link>.
            </p>
          </div>
        </div>

        {/* Regional Breakdown */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.6s]">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-emerald-800 transition-colors">ETF podle regionů</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">🌍</div>
              <h4 className="font-bold text-emerald-900 mb-1">Svět</h4>
              <p className="text-sm text-gray-600">VWCE, SWDA</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">🇺🇸</div>
              <h4 className="font-bold text-emerald-900 mb-1">USA</h4>
              <p className="text-sm text-gray-600">CSPX, VUAA</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">🇪🇺</div>
              <h4 className="font-bold text-emerald-900 mb-1">Evropa</h4>
              <p className="text-sm text-gray-600">CSPZ, VEUR</p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl mb-2">🌏</div>
              <h4 className="font-bold text-emerald-900 mb-1">Emerging markets</h4>
              <p className="text-sm text-gray-600">VFEM, IEEM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETFTypesSection;