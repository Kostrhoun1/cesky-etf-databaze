import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Zap, Shield, CheckCircle, ArrowRight, BarChart } from 'lucide-react';

const ETFHowTheyWorkSection: React.FC = () => {
  return (
    <section>
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-6 hover:bg-violet-200 transition-colors hover-scale">
            <BarChart className="w-8 h-8 text-violet-700" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Jak ETF fondy fungují?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mechanismus pasivního sledování indexů - jednoduše a transparentně
          </p>
        </div>

        {/* Základní princip */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s] mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-violet-800 transition-colors">Základní princip ETF</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 mx-auto mb-4 hover:bg-emerald-200 transition-colors hover-scale">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">ETF sleduje index</h4>
              <p className="text-gray-600 text-sm">Např. S&P 500 index obsahuje 500 největších US firem</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-4 hover:bg-violet-200 transition-colors hover-scale">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Správce nakupuje akcie</h4>
              <p className="text-gray-600 text-sm">ETF fond nakoupí všechny akcie z indexu podle váhy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 mx-auto mb-4 hover:bg-emerald-200 transition-colors hover-scale">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Vy kupujete podíl</h4>
              <p className="text-gray-600 text-sm">Jeden podíl ETF = malý kousek všech 500 firem</p>
            </div>
          </div>
        </div>

        {/* Srovnání s alternativami */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.4s] mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-emerald-800 transition-colors">ETF vs jiné investice</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Kritérium</th>
                  <th className="text-center py-3 px-4 font-semibold text-emerald-700">ETF fondy</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Jednotlivé akcie</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Aktivní fondy</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Diverzifikace</td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">
                      ✅ Automatická (stovky firem)
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      ❌ Musíte si vytvořit
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      ⚠️ Závisí na manažerovi
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Poplatky</td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">
                      ✅ 0,05-0,5% ročně
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">
                      ✅ Jen broker poplatek
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      ❌ 1-3% ročně
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Časová náročnost</td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">
                      ✅ Minimální
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      ❌ Vysoká (analýzy)
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      ⚠️ Střední
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Vhodné pro začátečníky</td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">
                      ✅ Ideální
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      ❌ Rizikovné
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      ⚠️ Drahé
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Jak se ETF kupují */}
        <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.6s]">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-emerald-800 transition-colors">Jak se ETF kupují a prodávají?</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center rounded-full bg-emerald-100 w-8 h-8 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jako akcie na burze</h4>
                    <p className="text-gray-600 text-sm">ETF se obchodují během obchodních hodin (9:00-17:30)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center rounded-full bg-emerald-100 w-8 h-8 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Přes online brokera</h4>
                    <p className="text-gray-600 text-sm"><Link to="/brokers/degiro" className="text-emerald-600 hover:text-emerald-800 hover:underline">DEGIRO</Link>, <Link to="/brokers/xtb" className="text-emerald-600 hover:text-emerald-800 hover:underline">XTB</Link>, <Link to="/brokers/trading212" className="text-emerald-600 hover:text-emerald-800 hover:underline">Trading 212</Link> - nákup za pár kliků</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center rounded-full bg-emerald-100 w-8 h-8 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Okamžitě likvidní</h4>
                    <p className="text-gray-600 text-sm">Můžete prodat kdykoliv během obchodních hodin</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-emerald-500">
              <h4 className="font-bold text-gray-900 mb-4">💡 Praktický příklad nákupu:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">1. Otevřete účet u brokera</span>
                  <span className="text-emerald-600 font-semibold">5 minut</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2. Vložíte peníze</span>
                  <span className="text-emerald-600 font-semibold">1-2 dny</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">3. Zadáte pokyn koupit <Link to="/etf/vwce" className="text-emerald-600 hover:text-emerald-800 hover:underline">VWCE</Link></span>
                  <span className="text-emerald-600 font-semibold">5 sekund</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">4. Vlastníte 3800+ světových firem</span>
                  <span className="text-emerald-600 font-semibold">Okamžitě</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETFHowTheyWorkSection;