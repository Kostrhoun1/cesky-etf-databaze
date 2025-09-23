
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, CheckCircle, XCircle, Scale } from 'lucide-react';
import ChartFeeImpact from "@/components/ChartFeeImpact";

const ETFAdvantagesDisadvantagesSection: React.FC = () => {
  return (
    <section>
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-8 hover:bg-violet-200 transition-colors hover-scale">
              <Scale className="w-8 h-8 text-violet-700" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Výhody a nevýhody ETF fondů</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Proč jsou ETF ideální pro pasivní investování a kdy se jim vyhnout
            </p>
          </div>
      
          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s]">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 group-hover:bg-emerald-200 transition-colors hover-scale">
                  <CheckCircle className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">ETF výhody</h3>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    title: "Nízké náklady", 
                    desc: "Většina ETF má poplatky pod 0,5% ročně - výrazně méně než aktivní fondy",
                    highlight: "0,03% - 0,5% ročně"
                  },
                  { 
                    title: "Okamžitá diverzifikace", 
                    desc: "Jedním nákupem investujete do stovek nebo tisíců firem po celém světě",
                    highlight: "1 nákup = 500+ firem"
                  },
                  { 
                    title: "Vysoká likvidita", 
                    desc: "Snadný nákup a prodej na burze kdykoliv během obchodních hodin",
                    highlight: "Obchodování 9:00-17:30"
                  },
                  { 
                    title: "Transparentnost", 
                    desc: "Přesné složení fondu a všechny informace jsou denně veřejné",
                    highlight: "100% transparentnost"
                  },
                  { 
                    title: "Daňová efektivita", 
                    desc: "V ČR je po 3 letech držení zisk z prodeje osvobozen od daně z příjmu",
                    highlight: "Po 3 letech bez daně"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-emerald-100 hover:bg-emerald-50 transition-colors">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-emerald-900">{item.title}</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">{item.highlight}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.4s]">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center rounded-full bg-violet-100 w-12 h-12 group-hover:bg-violet-200 transition-colors hover-scale">
                  <XCircle className="w-6 h-6 text-violet-700" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-violet-800 transition-colors">ETF nevýhody</h3>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    title: "Tržní riziko", 
                    desc: "Hodnota investice se hýbe s celým trhem - nelze se vyhnout krátkodobým poklesům",
                    severity: "Střední riziko"
                  },
                  { 
                    title: "Spread (rozpětí)", 
                    desc: "Malý rozdíl mezi nákupní a prodejní cenou, zejména u menších ETF",
                    severity: "Nízký dopad"
                  },
                  { 
                    title: "Tracking Error", 
                    desc: "Drobná odchylka od výkonnosti sledovaného indexu kvůli poplatkům",
                    severity: "Minimální dopad"
                  },
                  { 
                    title: "Měnové riziko", 
                    desc: "U zahraničních ETF může kolísání kurzu ovlivnit výnosnost",
                    severity: "Závisí na ETF"
                  },
                  { 
                    title: "Omezená kontrola", 
                    desc: "Nemůžete ovlivnit, které konkrétní akcie fond drží",
                    severity: "Věc osobních preferencí"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-violet-100 hover:bg-violet-50 transition-colors">
                    <XCircle className="w-5 h-5 text-violet-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-violet-900">{item.title}</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full font-medium">{item.severity}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.6s] text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-full bg-white/20 w-12 h-12 group-hover:bg-white/30 transition-colors hover-scale">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold">Shrnutí</h3>
            </div>
            <p className="text-xl leading-relaxed opacity-90 max-w-4xl mx-auto">
              <strong>ETF vs akcie:</strong> ETF fondy jsou pro začátečníky lepší volba než jednotlivé akcie díky okamžité diverzifikaci a nízkým poplatkům. 
              ETF jsou ideální, pokud chcete pasivně investovat a nemáte čas na analýzu jednotlivých firem. 
              Spočítejte si poplatky v naší <Link to="/kalkulacky/fee-calculator" className="text-white hover:underline font-medium">kalkulačce ETF</Link> nebo porovnejte fondy v <Link to="/srovnani-etf" className="text-white hover:underline font-medium">našem srovnávači</Link>.
            </p>
          </div>
          
          {/* GRAF: Srovnání dopadu poplatků */}
          <ChartFeeImpact />
        </div>
    </section>
  );
};

export default ETFAdvantagesDisadvantagesSection;
