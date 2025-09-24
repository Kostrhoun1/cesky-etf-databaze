import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const WhatAreETFs: React.FC = () => {
  return (
    <Layout>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero sekce */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Co jsou ETF fondy?</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Kompletní průvodce Exchange Traded Funds pro české investory. Naučte se pasivní investování, 
            porovnejte nejlepší ETF a začněte investovat ještě dnes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/srovnani-etf" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all">
              Srovnat ETF fondy
            </Link>
            <Link to="/kalkulacky/investicni-kalkulacka" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all">
              Kalkulačka výnosů
            </Link>
          </div>
        </div>

        <article className="prose prose-lg max-w-none">
          {/* 1. Definice ETF */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ETF jednoduše vysvětleno</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <p className="text-xl text-gray-800 mb-6">
                  <strong className="text-emerald-700">ETF (Exchange Traded Fund)</strong> je investiční fond, který se obchoduje na burze jako akcie. 
                  Jedním nákupem získáte podíl ve stovkách nebo tisících světových firem automaticky.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Klíčové vlastnosti ETF fondů:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-gray-700">Nízké poplatky (0,07-0,5%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-gray-700">Automatická diverzifikace</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-gray-700">Vysoká likvidita</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-gray-700">Transparentnost</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <img 
                  src="/images/etf-kosik-vs-akcie.png" 
                  alt="ETF košík vs jednotlivé akcie - srovnání investičních strategií" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* 2. Geografická diverzifikace ETF */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Světová diverzifikace ETF fondů</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <p className="text-lg text-gray-800 mb-6">
                  Jeden ETF vám umožní investovat do <strong>celého světa najednou</strong>. Například ETF VWCE obsahuje 
                  3800+ firem z desítek zemí a automaticky vás diverzifikuje napříč všemi kontinenty.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-900">🇺🇸 Severní Amerika</span>
                      <span className="text-blue-700 font-bold">64%</span>
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-emerald-900">🇪🇺 Evropa</span>
                      <span className="text-emerald-700 font-bold">15%</span>
                    </div>
                  </div>
                  <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-violet-900">🇯🇵 Japonsko</span>
                      <span className="text-violet-700 font-bold">6%</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-amber-900">🌏 Ostatní trhy</span>
                      <span className="text-amber-700 font-bold">15%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <img 
                  src="/images/vwce-svetova-diverzifikace.png" 
                  alt="Světová diverzifikace ETF VWCE - geografické rozdělení investic podle regionů" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* 3. Nejlepší ETF pro začátečníky */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nejlepší ETF fondy pro začátečníky v roce 2025</h2>
            
            <p className="text-lg text-gray-700 mb-8">
              Pro začátečníky doporučujeme začít s jedním <strong>celosvětovým ETF</strong>, který poskytuje okamžitou diverzifikaci 
              do tisíců firem z celého světa. Zde jsou nejpopulárnější volby:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Link to="/etf/IE00BK5BQT80" className="border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all group">
                <div className="text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-emerald-600">VWCE</h3>
                  <div className="text-gray-600 mb-3">Vanguard FTSE All-World</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Počet firem:</span>
                      <span className="font-semibold">3800+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TER poplatek:</span>
                      <span className="font-semibold text-emerald-600">0,22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Výkonnost 5 let:</span>
                      <span className="font-semibold">+11,2% p.a.</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/etf/IE00B5BMR087" className="border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all group">
                <div className="text-center">
                  <div className="text-4xl mb-4">🇺🇸</div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-emerald-600">CSPX</h3>
                  <div className="text-gray-600 mb-3">iShares Core S&P 500</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Počet firem:</span>
                      <span className="font-semibold">500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TER poplatek:</span>
                      <span className="font-semibold text-emerald-600">0,07%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Výkonnost 5 let:</span>
                      <span className="font-semibold">+13,1% p.a.</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/etf/IE00B4L5Y983" className="border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all group">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-emerald-600">SWDA</h3>
                  <div className="text-gray-600 mb-3">iShares Core MSCI World</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Počet firem:</span>
                      <span className="font-semibold">1600+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TER poplatek:</span>
                      <span className="font-semibold text-emerald-600">0,20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Výkonnost 5 let:</span>
                      <span className="font-semibold">+12,8% p.a.</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
              <h3 className="font-bold text-lg text-emerald-900 mb-3">💡 Tip pro začátečníky</h3>
              <p className="text-emerald-800">
                Začněte s <strong>VWCE</strong> - je to nejjednodušší způsob, jak investovat do celého světa jedním ETF. 
                Obsahuje jak vyspělé, tak rozvíjející se trhy a poskytuje maximální diverzifikaci.
              </p>
            </div>
          </section>

          {/* 4. Jak fungují ETF technicky */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Jak fungují ETF fondy? Mechanismus pasivního investování</h2>
            
            <p className="text-lg text-gray-700 mb-8">
              ETF fungují na principu <strong>pasivního sledování indexů</strong>. Správce fondu automaticky nakupuje 
              všechny akcie obsažené v daném indexu ve správných poměrech podle jejich tržní kapitalizace.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-xl font-semibold mb-4 text-emerald-800 flex items-center gap-2">
                  <span>🔄</span> Fyzická replikace
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>ETF skutečně vlastní všechny akcie z indexu</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Nejbezpečnější způsob replikace</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Používá VWCE, CSPX, SWDA</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Minimální tracking error</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                  <span>📊</span> Syntetická replikace
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Používá deriváty (swapy) místo akcií</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Umožňuje přístup k exotickým trhům</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Counterparty riziko</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Nižší transakční náklady</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. ETF vs jiné investice */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ETF vs akcie vs aktivní fondy - srovnání</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b">Kritérium</th>
                    <th className="text-center py-4 px-6 font-semibold text-emerald-700 border-b">ETF fondy</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700 border-b">Jednotlivé akcie</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700 border-b">Aktivní fondy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium">Diverzifikace</td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ✅ Automatická
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ❌ Ruční
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ⚠️ Závisí
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium">Poplatky ročně</td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ✅ 0,07-0,5%
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ✅ 0% (jen broker)
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ❌ 1-3%
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium">Časová náročnost</td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ✅ Minimální
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ❌ Vysoká
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ⚠️ Střední
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Pro začátečníky</td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ✅ Ideální
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ❌ Náročné
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ❌ Drahé
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Jak začít investovat do ETF - 3 jednoduché kroky */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Jak začít investovat do ETF - 3 jednoduché kroky</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Krok 1: Vyberte si ETF */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200 text-center flex flex-col">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-emerald-700">1</span>
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Vyberte si ETF</h3>
                <p className="text-emerald-800 mb-6 flex-grow">
                  Porovnejte ETF fondy podle poplatků, výnosů a oblastí investování. Najděte si ty nejlepší pro vaše portfolio.
                </p>
                <Link to="/srovnani-etf" className="block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all mt-auto">
                  🔍 Porovnat ETF fondy
                </Link>
              </div>
              
              {/* Krok 2: Rozhodněte se kolik investovat */}
              <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-8 border border-blue-200 text-center flex flex-col">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-700">2</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Rozhodněte se kolik investovat</h3>
                <p className="text-blue-800 mb-6 flex-grow">
                  Spočítejte si, kolik investovat měsíčně a jaké můžete očekávat výnosy při různých strategiích.
                </p>
                <Link to="/kalkulacky/investicni-kalkulacka" className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all mt-auto">
                  💰 Spočítejte výnosy
                </Link>
              </div>
              
              {/* Krok 3: Vyberte si brokera a pravidelně investujte */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-8 border border-violet-200 text-center flex flex-col">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-violet-700">3</span>
                </div>
                <h3 className="text-xl font-bold text-violet-900 mb-4">Vyberte si brokera a pravidelně investujte</h3>
                <p className="text-violet-800 mb-6 flex-grow">
                  Kde a jak koupit ETF? Porovnejte poplatky, funkce a dostupné ETF u různých brokerů.
                </p>
                <Link to="/kde-koupit-etf" className="block bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all mt-auto">
                  🏦 Srovnání brokerů
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-xl text-emerald-900 mb-3">Nejjednodušší start pro začátečníky</h3>
                <p className="text-emerald-800 mb-6">
                  Pokud se nechcete zabývat výběrem a chcete začít jednoduše, máme pro vás osvědčenou kombinaci:
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">📈 Doporučený ETF</h4>
                  <p className="text-sm text-emerald-800 mb-3">
                    <strong>VWCE</strong> - nejpopulárnější ETF pokrývající celý svět
                  </p>
                  <Link to="/etf/IE00BK5BQT80" className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg transition-all inline-block">
                    Podrobnosti o VWCE →
                  </Link>
                </div>
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">🏦 Doporučený broker</h4>
                  <p className="text-sm text-emerald-800 mb-3">
                    <strong>XTB</strong> - česká podpora a nulové poplatky
                  </p>
                  <Link to="/xtb-recenze" className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg transition-all inline-block">
                    Recenze XTB →
                  </Link>
                </div>
              </div>
              
            </div>
          </section>

          {/* 7. Často kladené otázky */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Často kladené otázky o ETF fondech</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">❓ Jsou ETF fondy bezpečné?</h3>
                <p className="text-gray-700 mb-4">
                  ETF s označením <strong>UCITS (většina evropských ETF) jsou velmi bezpečné</strong> díky přísné regulaci Evropské unie. 
                  Vaše peníze jsou odděleny od majetku správce fondu podle zákona o kolektivním investování.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Typy rizik u ETF:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li><strong>Tržní riziko:</strong> Hodnota ETF kolísá podle výkonnosti základních aktiv</li>
                  <li><strong>Měnové riziko:</strong> U zahraničních ETF může ovlivnit výnos změna kurzu</li>
                  <li><strong>Tracking error:</strong> Malé odchylky od sledovaného indexu</li>
                  <li><strong>Likvidní riziko:</strong> Minimální u velkých ETF jako VWCE nebo CSPX</li>
                </ul>
                <p className="text-gray-700">
                  I kdyby správce ETF zkrachoval, vaše investice zůstávají chráněny jako samostatný majetek. 
                  ETF jsou proto <strong>bezpečnější než jednotlivé akcie nebo aktivní fondy</strong>.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">❓ Jak dlouho držet ETF investice?</h3>
                <p className="text-gray-700 mb-4">
                  ETF jsou určené pro <strong>dlouhodobé investování (5+ let)</strong>. Čím déle držíte, tím více se vyrovnají krátkodobé výkyvy. 
                  Historická data ukazují, že při držení déle než 15 let byla pravděpodobnost ztráty téměř nulová.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Investiční horizonty podle cíle:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li><strong>3-5 let:</strong> Minimální doba pro snížení rizika volatility</li>
                  <li><strong>10+ let:</strong> Ideální pro důchodové spoření nebo dlouhodobé cíle</li>
                  <li><strong>20+ let:</strong> Maximální využití složeného úročení</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Daňová výhoda v ČR:</strong> Zisky z prodeje ETF jsou po 3 letech držení osvobozeny od daně z příjmu. 
                  To činí ETF ještě atraktivnějšími pro dlouhodobé investování. Více informací najdete v našem 
                  <Link to="/tipy/etf-pro-duchod" className="text-emerald-600 hover:text-emerald-800 underline">průvodci investování</Link>.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">❓ Jaký je rozdíl mezi VWCE a CSPX?</h3>
                <p className="text-gray-700 mb-4">
                  <strong>VWCE (Vanguard FTSE All-World)</strong> a <strong>CSPX (iShares Core S&P 500)</strong> 
                  jsou dva nejpopulárnější ETF, ale liší se geografickým zaměřením a diverzifikací.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-2">🌍 VWCE</h4>
                    <ul className="text-sm space-y-1 text-emerald-800">
                      <li>• 3800+ firem z celého světa</li>
                      <li>• Obsahuje vyspělé i rozvíjející se trhy</li>
                      <li>• TER: 0,22% ročně</li>
                      <li>• Maximální diverzifikace</li>
                      <li>• Výkonnost: +11,2% p.a. (5 let)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">🇺🇸 CSPX</h4>
                    <ul className="text-sm space-y-1 text-blue-800">
                      <li>• 500 největších US firem</li>
                      <li>• Pouze americký trh</li>
                      <li>• TER: 0,07% ročně</li>
                      <li>• Vyšší koncentrace, vyšší riziko</li>
                      <li>• Výkonnost: +13,1% p.a. (5 let)</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  <strong>Pro začátečníky doporučujeme VWCE</strong> - poskytuje větší diverzifikaci a automaticky vás chrání před 
                  koncentračním rizikem jednoho regionu. Detailní srovnání najdete v našem 
                  <Link to="/srovnani-etf" className="text-emerald-600 hover:text-emerald-800 underline">srovnávači ETF</Link>.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">❓ Jaké jsou poplatky u ETF a jak se platí?</h3>
                <p className="text-gray-700 mb-4">
                  ETF mají <strong>nejnižší poplatky ze všech investičních instrumentů</strong>. Většina kvalitních ETF má 
                  TER (Total Expense Ratio) mezi 0,07% až 0,50% ročně.
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Typy poplatků u ETF:</h4>
                  <div className="space-y-3">
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <div className="font-semibold text-emerald-900">TER (Total Expense Ratio)</div>
                      <div className="text-sm text-emerald-800">
                        Roční poplatek za správu fondu (0,07-0,5%). Automaticky stržen z hodnoty ETF.
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="font-semibold text-blue-900">Broker poplatky</div>
                      <div className="text-sm text-blue-800">
                        Za nákup/prodej ETF. <Link to="/trading212-recenze" className="underline">Trading 212</Link> a 
                        <Link to="/xtb-recenze" className="underline"> XTB</Link> nabízí 0% poplatky.
                      </div>
                    </div>
                    <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
                      <div className="font-semibold text-violet-900">Spread (rozpětí)</div>
                      <div className="text-sm text-violet-800">
                        Rozdíl mezi nákupní a prodejní cenou. U velkých ETF obvykle 0,01-0,05%.
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  Porovnání s ostatními investicemi: Aktivní fondy mají poplatky 1-3% ročně, což při 20leté investici 
                  může představovat rozdíl stovek tisíc korun. Spočítejte si dopad poplatků v naší 
                  <Link to="/kalkulacky/kalkulacka-poplatku-etf" className="text-emerald-600 hover:text-emerald-800 underline">kalkulačce poplatků</Link>.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">❓ S kolika penězi začít investovat do ETF?</h3>
                <p className="text-gray-700 mb-4">
                  Můžete začít investovat do ETF už s <strong>1000-5000 Kč</strong>. Moderní brokeři jako 
                  <Link to="/trading212-recenze" className="text-emerald-600 hover:text-emerald-800 underline">Trading 212</Link> nebo 
                  <Link to="/xtb-recenze" className="text-emerald-600 hover:text-emerald-800 underline">XTB</Link> umožňují 
                  nákup frakčních podílů, takže nemusíte kupovat celý podíl ETF.
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Doporučené částky podle situace:</h4>
                  <div className="space-y-3">
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <div className="font-semibold text-emerald-900">Student/začátečník: 1000-3000 Kč měsíčně</div>
                      <div className="text-sm text-emerald-800">
                        Ideální pro získání zkušeností a vytvoření investiční disciplíny
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="font-semibold text-blue-900">Střední třída: 5000-15000 Kč měsíčně</div>
                      <div className="text-sm text-blue-800">
                        Standardní částka pro budování dlouhodobého bohatství
                      </div>
                    </div>
                    <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
                      <div className="font-semibold text-violet-900">Vyšší příjmy: 20000+ Kč měsíčně</div>
                      <div className="text-sm text-violet-800">
                        Pro rychlejší dosažení finančních cílů a předčasný důchod
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  <strong>Důležitější než velikost počáteční investice je pravidelnost.</strong> Investování 3000 Kč měsíčně 
                  po dobu 20 let může při průměrném výnosu 7% p.a. vyrůst na více než 1,5 milionu korun.
                </p>
                
                <p className="text-gray-700">
                  Před investováním si sestavte nouzový fond na 3-6 měsíčních výdajů a splaťte drahé dluhy. 
                  Více v našem <Link to="/tipy/jak-zacit-investovat-do-etf" className="text-emerald-600 hover:text-emerald-800 underline">průvodci pro začátečníky</Link>.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">❓ Jak se platí daně z ETF v České republice?</h3>
                <p className="text-gray-700 mb-4">
                  Daňové povinnosti z ETF investic v ČR se řídí zákonem o daních z příjmu. Existuje však 
                  <strong>výrazná daňová výhoda pro dlouhodobé držení</strong>.
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Daň z prodeje ETF:</h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-red-900">Držení méně než 3 roky</div>
                      <div className="text-sm text-red-800">
                        15% daň z příjmu z realizovaného zisku. Musíte podat daňové přiznání.
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <div className="font-semibold text-emerald-900">Držení 3+ roky</div>
                      <div className="text-sm text-emerald-800">
                        <strong>0% daň!</strong> Zisk z prodeje je zcela osvobozen od daně z příjmu.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Daň z dividend:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Akumulační ETF (VWCE, CSPX):</strong> Žádné dividendy, tedy žádná daň</li>
                    <li><strong>Distribuční ETF:</strong> Srážková daň podle země původu (obvykle 15-30%)</li>
                    <li><strong>Doporučení:</strong> Vybírejte akumulační ETF pro daňovou efektivitu</li>
                  </ul>
                </div>
                
                <p className="text-gray-700 mb-4">
                  <strong>Praktický příklad:</strong> Investujete 100.000 Kč do VWCE, po 5 letech máte 200.000 Kč. 
                  Zisk 100.000 Kč je zcela osvobozen od daně, protože jste drželi ETF déle než 3 roky.
                </p>
                
                <p className="text-gray-700">
                  Podrobný návod k daním z ETF včetně příkladů výpočtů najdete v našem 
                  <Link to="/etf-poplatky-srovnani" className="text-emerald-600 hover:text-emerald-800 underline">průvodci poplatků ETF</Link>.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">❓ Jaké jsou nevýhody ETF fondů?</h3>
                <p className="text-gray-700 mb-4">
                  Ačkoli jsou ETF skvělým investičním nástrojem, mají i určité nevýhody, které by měl každý investor znát:
                </p>
                
                <div className="space-y-4 mb-4">
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2">🔄 Tržní riziko</h4>
                    <p className="text-sm text-amber-800">
                      ETF kopírují trh, takže během recesí klesají stejně jako celý trh. Nemůžete se vyhnout systémovým poklesům.
                    </p>
                  </div>
                  
                  <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                    <h4 className="font-semibold text-violet-900 mb-2">📊 Tracking Error</h4>
                    <p className="text-sm text-violet-800">
                      ETF není schopen přesně kopírovat index kvůli poplatkům a cash drag. Rozdíl je obvykle 0,1-0,3% ročně.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">💱 Měnové riziko</h4>
                    <p className="text-sm text-blue-800">
                      Zahraniční ETF jsou vystaveny riziku změny kurzu. Silná koruna může snížit výnosy z dolarových ETF.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">⚡ Spready</h4>
                    <p className="text-sm text-red-800">
                      U menších ETF může být větší rozdíl mezi nákupní a prodejní cenou, což zvyšuje transakční náklady.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 Omezená kontrola</h4>
                    <p className="text-sm text-gray-700">
                      Nemůžete ovlivnit, které konkrétní akcie ETF drží. Automaticky vlastníte i firmy, se kterými nesouhlasíte.
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  <strong>Závěr:</strong> Nevýhody ETF jsou minimální ve srovnání s výhodami. Pro většinu investorů představují 
                  ETF nejlepší způsob dlouhodobého investování. Srovnání s alternativami najdete v našem 
                  <Link to="/tipy/etf-vs-aktivni-fondy" className="text-emerald-600 hover:text-emerald-800 underline">článku ETF vs aktivní fondy</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Závěr a CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Začněte investovat do ETF fondů ještě dnes</h2>
              <p className="text-xl mb-8 opacity-90">
                ETF fondy jsou nejjednodušší způsob, jak začít s pasivním investováním. 
                Nízké poplatky, automatická diverzifikace a dlouhodobé zhodnocení.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/srovnani-etf" className="bg-white text-emerald-600 px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all">
                  Srovnat všechny ETF
                </Link>
                <Link to="/kde-koupit-etf" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white/10 transition-all">
                  Kde koupit ETF
                </Link>
              </div>
            </div>
          </section>
        </article>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;