import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Target, Users, BarChart, DollarSign, TrendingUp } from 'lucide-react';

const ETFHowToStartSection: React.FC = () => {
  return (
    <div id="jak-zacit" className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 mx-auto mb-6 hover:bg-emerald-200 transition-colors hover-scale">
          <ShoppingCart className="w-8 h-8 text-emerald-700" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Jak začít investovat do ETF?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Jednoduchý průvodce ETF pro začátečníky - jak investovat do ETF</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-emerald-500 hidden lg:block"></div>
        <ol className="space-y-6">
          {[
            { 
              title: "1. Určete investiční cíl", 
              description: "Rozhodněte se, zda investujete na důchod (20+ let), koupi nemovitosti (5-10 let) nebo jiný cíl. Dlouhodobý horizont = vyšší podíl akciových ETF.",
              icon: Target,
              colorClass: "emerald"
            },
            { 
              title: "2. Vyberte si brokera pro ETF", 
              description: "Nejlepší brokerové pro ETF: DEGIRO (nízké poplatky), XTB (bez poplatků do 100k EUR), Trading 212 (frakční podíly).",
              icon: Users,
              colorClass: "violet"
            },
            { 
              title: "3. Vyberte svůj první ETF fond", 
              description: "Začátečníkům doporučujeme celosvětový ETF jako VWCE nebo SWDA. Obsahují tisíce firem z celého světa.",
              icon: BarChart,
              colorClass: "emerald"
            },
            { 
              title: "4. Proveďte první nákup ETF", 
              description: "Převeďte peníze na brokerský účet a kupte ETF. Začněte malým obnosem (5-10k Kč) a postupně přidejte pravidelné investice.",
              icon: DollarSign,
              colorClass: "violet"
            },
            { 
              title: "5. Nastavte pravidelné investování", 
              description: "Nejlepší strategie je investovat pravidelně (DCA) - každý měsíc stejnou částku. Nekontrolujte ceny denně, myslěte dlouhodobě.",
              icon: TrendingUp,
              colorClass: "emerald"
            }
          ].map((step, index) => (
            <li key={index} className="relative flex items-start gap-6 lg:pl-16">
              <div className={`flex-shrink-0 w-16 h-16 ${step.colorClass === 'emerald' ? 'bg-emerald-100 hover:bg-emerald-200' : 'bg-violet-100 hover:bg-violet-200'} transition-colors hover-scale rounded-full flex items-center justify-center font-bold text-xl lg:absolute lg:left-0 lg:transform lg:-translate-x-1/2`}>
                <step.icon className={`w-8 h-8 ${step.colorClass === 'emerald' ? 'text-emerald-700' : 'text-violet-700'}`} />
              </div>
              <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in flex-1" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                <h4 className={`font-bold text-xl text-gray-900 mb-3 group-hover:${step.colorClass === 'emerald' ? 'text-emerald-800' : 'text-violet-800'} transition-colors`}>{step.title}</h4>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                  {index === 2 && (
                    <>
                      {' '}Pomocí našeho <Link to="/srovnani-etf" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">srovnávače ETF</Link> najdete ten nejlepší fond.
                    </>
                  )}
                  {index === 1 && (
                    <>
                      {' '}Více informací v našem průvodci <Link to="/kde-koupit-etf" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">kde koupit ETF</Link>. Recenze brokerů: <Link to="/brokers/degiro" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">DEGIRO</Link>, <Link to="/brokers/xtb" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">XTB</Link>, <Link to="/brokers/trading212" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">Trading 212</Link>.
                    </>
                  )}
                  {index === 2 && (
                    <>
                      {' '}Spočítejte si poplatky v <Link to="/kalkulacky/fee-calculator" className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors">kalkulaci poplatků ETF</Link>.
                    </>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ETFHowToStartSection;