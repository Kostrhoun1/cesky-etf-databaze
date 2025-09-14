
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, CheckCircle, XCircle, Scale } from 'lucide-react';
import ChartFeeImpact from "@/components/ChartFeeImpact";

const ETFAdvantagesDisadvantagesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-3xl mb-8 shadow-2xl">
              <Scale className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Výhody a nevýhody ETF</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Objektivní pohled na investování do ETF fondů
            </p>
          </div>
      
          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-bl-full"></div>
              <CardHeader className="pb-6 relative">
                <CardTitle className="flex items-center gap-4 text-2xl md:text-3xl text-emerald-900">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  Výhody ETF
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100 hover:bg-white/80 transition-colors">
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
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-bl-full"></div>
              <CardHeader className="pb-6 relative">
                <CardTitle className="flex items-center gap-4 text-2xl md:text-3xl text-orange-900">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <XCircle className="w-6 h-6" />
                  </div>
                  Nevýhody ETF
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100 hover:bg-white/80 transition-colors">
                    <XCircle className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-orange-900">{item.title}</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">{item.severity}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-2xl">
              <CardContent className="p-8 md:p-12 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Shrnutí</h3>
                <p className="text-xl leading-relaxed opacity-90 max-w-4xl mx-auto">
                  <strong>ETF jsou ideální pro dlouhodobé investování</strong> díky nízkým poplatkům a snadné diverzifikaci. 
                  Nevýhody jsou většinou marginální a pro běžného investora nepředstavují zásadní problém.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* GRAF: Srovnání dopadu poplatků */}
          <ChartFeeImpact />
        </div>
      </div>
    </section>
  );
};

export default ETFAdvantagesDisadvantagesSection;
