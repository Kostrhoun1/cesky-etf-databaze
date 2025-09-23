
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import DetailedBrokerComparison from '../components/home/DetailedBrokerComparison';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Shield, TrendingUp, Store, ArrowRight, Users, Award } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import InternalLinking, { BrokerGuideRelatedLinks } from '@/components/SEO/InternalLinking';
import { generateBrokerSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';

const WhereToBuyETFs = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema(),
      generateFAQSchema(),
      generateBreadcrumbSchema()
    ]
  };

  const considerations = [
    {
      icon: DollarSign,
      title: 'Poplatky a náklady',
      description: 'Porovnejte transakční poplatky, správní poplatky a poplatky za vedení účtu',
      highlight: 'Od 0€ za transakci',
      color: 'emerald'
    },
    {
      icon: Shield,
      title: 'Regulace a bezpečnost',
      description: 'Vybírejte brokery regulované v EU s ochranou investorů',
      highlight: 'Ochrana do 20 000€',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Výběr ETF',
      description: 'Ujistěte se, že broker nabízí ETF, které chcete koupit',
      highlight: '3000+ ETF fondů',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Uživatelské rozhraní',
      description: 'Intuitivní platforma je klíčová pro pohodlné investování',
      highlight: 'Mobilní aplikace',
      color: 'orange'
    }
  ];

  return (
    <Layout>
      <SEOHead
        title={`Kde koupit ETF? Srovnání nejlepších brokerů ${currentYear} | ETF průvodce.cz`}
        description={`Kompletní srovnání brokerů pro ETF investice ${currentYear}. DEGIRO, XTB, Trading 212, Interactive Brokers, Fio. Poplatky, recenze, zkušenosti českých investorů.`}
        canonical="https://etfpruvodce.cz/kde-koupit-etf"
        keywords={`kde koupit ETF ${currentYear}, nejlepší brokeři ${currentYear}, DEGIRO recenze ${currentYear}, XTB recenze ${currentYear}, Trading 212 recenze ${currentYear}, Interactive Brokers recenze ${currentYear}, srovnání brokerů ${currentYear}, poplatky brokerů, broker pro ETF Česká republika`}
        ogImage="https://etfpruvodce.cz/og-where-to-buy.jpg"
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
      />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in border border-white/20">
              <Store className="w-4 h-4 mr-2" />
              Srovnání nejlepších brokerů {currentYear}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
              Kde koupit <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ETF fondy?</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Najděte ideálního brokera pro vaše investice do ETF. 
              Srovnání poplatků, funkcí a recenze od skutečných uživatelů.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-semibold mb-2">Top 6 brokerů</h3>
                <p className="text-sm text-blue-200">Ověření a doporučení investory</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold mb-2">Aktuální poplatky</h3>
                <p className="text-sm text-blue-200">Průběžně aktualizované ceny</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🇨🇿</div>
                <h3 className="font-semibold mb-2">Pro české investory</h3>
                <p className="text-sm text-blue-200">Specifika českého trhu</p>
              </div>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-blue-200 mb-6 text-lg">
                👇 Posuňte se níže pro detailní srovnání všech brokerů
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    document.getElementById('porovnani')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  <Award className="w-5 h-5 mr-2" />
                  Srovnání brokerů
                </Button>
                <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold">
                  <Link to="/tipy/jak-zacit-investovat-do-etf">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Jak začít investovat
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Factors Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center rounded-full bg-violet-100 w-20 h-20 mx-auto mb-8 hover:bg-violet-200 transition-colors hover-scale">
              <Shield className="w-10 h-10 text-violet-700" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Na co se zaměřit při výběru brokera
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Klíčové faktory pro správnou volbu investiční platformy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {considerations.map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                emerald: 'from-emerald-500 to-teal-600 border-emerald-100',
                blue: 'from-blue-500 to-indigo-600 border-blue-100',
                purple: 'from-purple-500 to-violet-600 border-purple-100',
                orange: 'from-orange-500 to-red-600 border-orange-100'
              };
              
              const iconColorMap = {
                emerald: 'emerald-700',
                blue: 'violet-700',
                purple: 'emerald-700',
                orange: 'violet-700'
              };
              
              return (
                <div key={index} className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in text-center" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                  <div className={`flex items-center justify-center rounded-full ${item.color === 'emerald' || item.color === 'purple' ? 'bg-emerald-100 group-hover:bg-emerald-200' : 'bg-violet-100 group-hover:bg-violet-200'} w-16 h-16 mx-auto mb-6 transition-colors hover-scale`}>
                    <Icon className={`w-8 h-8 text-${iconColorMap[item.color]}`} />
                  </div>
                  <div className="mb-4">
                    <h3 className={`text-xl font-bold text-gray-900 mb-2 group-hover:${item.color === 'emerald' || item.color === 'purple' ? 'text-emerald-800' : 'text-violet-800'} transition-colors`}>{item.title}</h3>
                    <div className={`text-sm ${item.color === 'emerald' || item.color === 'purple' ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700'} px-3 py-1 rounded-full font-medium inline-block`}>
                      {item.highlight}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailní srovnání brokerů */}
      <div id="porovnani">
        <DetailedBrokerComparison />
      </div>

      {/* Tips Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center rounded-full bg-emerald-100 w-20 h-20 mx-auto mb-8 hover:bg-emerald-200 transition-colors hover-scale">
              <Users className="w-10 h-10 text-emerald-700" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tipy pro začátečníky
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Jak začít s investováním do ETF přes brokery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Začněte s demo účtem",
                description: "Většina brokerů nabízí demo účty, kde si můžete vyzkoušet platformu bez rizika a naučit se základy obchodování.",
                icon: "🎮"
              },
              {
                title: "Porovnejte celkové náklady",
                description: "Nezaměřujte se jen na transakční poplatky, ale i na poplatky za vedení účtu, převody a měnové konverze.",
                icon: "💰"
              },
              {
                title: "Ověřte regulaci",
                description: "Vybírejte pouze brokery regulované v EU s ochranou investorů do 20 000€ podle ESMA směrnic.",
                icon: "🛡️"
              },
              {
                title: "Začněte malými částkami",
                description: "Prvotní investice nemusí být vysoká. Důležité je začít a postupně se učit na vlastních zkušenostech.",
                icon: "🌱"
              }
            ].map((tip, index) => (
              <div key={index} className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-800 transition-colors">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="hover-scale bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold">
                <Link to="/tipy/jak-zacit-investovat-do-etf">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Jak začít s ETF investicemi
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hover-scale border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  document.getElementById('porovnani')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <Award className="w-5 h-5 mr-2" />
                Srovnání brokerů výše
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center rounded-full bg-violet-100 w-20 h-20 mx-auto mb-8 hover:bg-violet-200 transition-colors hover-scale">
              <span className="text-2xl">❓</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Často kladené otázky o koupi ETF
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Odpovědi na nejčastější dotazy o výběru brokera pro ETF investice
            </p>
          </div>

          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s]">
            <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Kde koupit ETF v České republice?",
                answer: "ETF můžete koupit u online brokerů jako DEGIRO, XTB, Trading 212, Interactive Brokers nebo u českých bank jako Fio e-Broker. Nejlepší volbou jsou online brokeři s nízkými poplatky a širokým výběrem ETF fondů."
              },
              {
                question: "Který broker je nejlepší pro začátečníky?",
                answer: "Pro začátečníky doporučujeme DEGIRO (snadné ovládání, ETF zdarma) nebo XTB (0% poplatky do 100 000 EUR měsíčně, česká podpora). Oba nabízejí intuitivní rozhraní a nízké náklady."
              },
              {
                question: "Kolik stojí nákup ETF u různých brokerů?",
                answer: "Poplatky se liší: DEGIRO - 0€ za vybrané ETF, jinak 2€ + 0,03%; XTB - 0€ do 100 000 EUR měsíčně; Trading 212 - 0€; Interactive Brokers - od 1,25€; Fio e-Broker - 0,4% (min. 7,90€)."
              },
              {
                question: "Jsou online brokeři bezpeční?",
                answer: "Ano, všichni doporučení brokeři jsou regulovaní v EU a nabízejí ochranu investorů do 20 000€ podle ESMA směrnic. DEGIRO, XTB, Trading 212 a Interactive Brokers jsou ověřené platformy s miliony uživatelů."
              },
              {
                question: "Mohu koupit americké ETF u evropských brokerů?",
                answer: "Ne, kvůli MiFID II regulaci nemohou evropští brokeři nabízet americké ETF retailovým investorům. Místo toho lze koupit evropské ETF (UCITS) sledující stejné indexy, např. CSPX místo SPY."
              },
              {
                question: "Jak začít s malými částkami?",
                answer: "Většina brokerů neumožňuje částečné akcie, ale nabízejí spořící plány už od 25€ měsíčně. Trading 212 umožňuje nákup frakcí akcií/ETF už od 1€."
              }
            ].map((faq, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg hover:border-violet-200 transition-colors">
                <summary className="flex justify-between items-center w-full px-6 py-4 text-left bg-gray-50 cursor-pointer hover:bg-violet-50 rounded-lg group-open:rounded-b-none transition-colors">
                  <span className="font-semibold text-lg text-gray-900 group-hover:text-violet-800">{faq.question}</span>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-violet-600 transition-all group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 py-4 text-gray-700 leading-relaxed bg-white rounded-b-lg">
                  {faq.answer}
                </div>
              </details>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s]">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 group-hover:bg-emerald-200 transition-colors hover-scale">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">Kde koupit ETF - kompletní průvodce pro české investory</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center rounded-full bg-emerald-100 w-10 h-10 group-hover:bg-emerald-200 transition-colors hover-scale">
                      <span className="text-xl">🌍</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-800 transition-colors">Online brokeři (doporučeno)</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>DEGIRO</strong> - ETF zdarma, nízké poplatky</li>
                    <li>• <strong>XTB</strong> - 0% poplatky do 100k EUR</li>
                    <li>• <strong>Trading 212</strong> - kompletně zdarma</li>
                    <li>• <strong>Interactive Brokers</strong> - profesionální platforma</li>
                  </ul>
                </div>
                
                <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-6 card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center rounded-full bg-violet-100 w-10 h-10 group-hover:bg-violet-200 transition-colors hover-scale">
                      <span className="text-xl">🏦</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-violet-800 transition-colors">České banky a instituce</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Fio e-Broker</strong> - český broker, vyšší poplatky</li>
                    <li>• <strong>Česká spořitelna</strong> - omezený výběr ETF</li>
                    <li>• <strong>Komerční banka</strong> - premium služby</li>
                    <li>• <strong>ČSOB</strong> - tradičné bankovnictví</li>
                  </ul>
                </div>
              </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Jak vybrat nejlepšího brokera pro ETF?</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Při výběru brokera pro nákup ETF v České republice je důležité zvážit několik klíčových faktorů. 
              <strong>Kde koupit ETF</strong> závisí na vašich investičních cílech, výši investic a preferencích ohledně služeb.
            </p>

              <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 card-hover mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center rounded-full bg-white/20 w-10 h-10 group-hover:bg-white/30 transition-colors hover-scale">
                    <span className="text-xl">💡</span>
                  </div>
                  <h4 className="font-semibold text-white">Tip pro začátečníky</h4>
                </div>
                <p className="text-white opacity-90">
                  Pokud si nejste jisti, kde koupit ETF, začněte s DEGIRO nebo XTB. Oba brokeři nabízejí 
                  nízké poplatky, široký výběr ETF a jsou vhodní pro české investory.
                </p>
              </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Porovnání nákladů na koupi ETF</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poplatek za nákup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Měsíční poplatek</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Výhody</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">DEGIRO</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0€ (vybrané ETF)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0€</td>
                    <td className="px-6 py-4 text-gray-600">200+ ETF zdarma</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">XTB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0€ (do 100k EUR)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0€</td>
                    <td className="px-6 py-4 text-gray-600">Česká podpora</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Trading 212</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0€</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0€</td>
                    <td className="px-6 py-4 text-gray-600">Frakční akcie</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Fio e-Broker</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0,4% (min. 7,90€)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">0€</td>
                    <td className="px-6 py-4 text-gray-600">Český broker</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Daňové aspekty při koupi ETF</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Při rozhodování <strong>kde koupit ETF</strong> nezapomeňte na daňové dopady. Evropské ETF (UCITS) 
              jsou daňově výhodnější než americké ETF kvůli smlouvám o zamezení dvojího zdanění. 
              Všichni doporučení brokeři poskytují daňové reporty pro české investory.
            </p>

            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Internal Linking */}
        <InternalLinking 
          relatedLinks={BrokerGuideRelatedLinks} 
        />
      </div>
    </Layout>
  );
};

export default WhereToBuyETFs;
