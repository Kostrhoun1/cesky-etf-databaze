import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, AlertTriangle, DollarSign, TrendingUp, Shield, Clock, Users, Star, Banknote, Target, Building, Smartphone } from 'lucide-react';
import BlogArticleLayout from './_BlogArticleLayout';
import { Link } from 'react-router-dom';

const JakZacitInvestovatDoETF = () => {
  const steps = [
    {
      title: "1. Definujte své cíle",
      description: "Stanovte si jasné investiční cíle a časový horizont",
      details: [
        "Důchod (15+ let) - agresivní růstové portfolio",
        "Koupě nemovitosti (3-7 let) - vyvážené portfolio", 
        "Rezerva (1-3 roky) - konzervativní portfolio",
        "Určete měsíční částku pro investování"
      ],
      icon: Target,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      title: "2. Vyberte si brokera",
      description: "Zvolte spolehlivého brokera s nízkými poplatky",
      details: [
        "DEGIRO - některé ETF zdarma, vhodné pro začátečníky",
        "XTB - 0% poplatky do 100k EUR měsíčně",
        "Trading212 - 0% poplatky, jednoduchá aplikace",
        "Interactive Brokers - největší výběr, pokročilé funkce"
      ],
      icon: Building,
      color: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
      title: "3. Otevřete účet",
      description: "Projděte procesem registrace a verifikace",
      details: [
        "Připravte si občanský průkaz a doklad o příjmech",
        "Vyplňte registrační formulář online",
        "Projděte procesem KYC (Know Your Customer)",
        "Aktivujte účet a proveďte první vklad"
      ],
      icon: CheckCircle,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      title: "4. Sestavte portfolio",
      description: "Vyberte správnou kombinaci ETF fondů",
      details: [
        "80-90% akcie pro mladé investory (VWCE, CSPX)",
        "10-20% dluhopisy pro stabilitu (VGEA, IEAA)",
        "Zvažte geografickou diverzifikaci",
        "Začněte s 2-3 ETF fondy maximum"
      ],
      icon: TrendingUp,
      color: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      title: "5. Investujte pravidelně",
      description: "Nastavte si automatické investování",
      details: [
        "DCA (Dollar Cost Averaging) - investujte stejnou částku měsíčně",
        "Ignorujte krátkodobé výkyvy trhu",
        "Rebalancujte portfolio jednou ročně",
        "Neprodávejte v panické náladě"
      ],
      icon: Clock,
      color: "bg-gradient-to-br from-teal-500 to-cyan-600"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Časování trhu",
      solution: "Investujte pravidelně bez ohledu na tržní podmínky"
    },
    {
      mistake: "Přílišná diverzifikace",
      solution: "Začněte s 2-3 kvalitními ETF, ne s 10+"
    },
    {
      mistake: "Honění výkonnosti",
      solution: "Držte se dlouhodobé strategie, ne krátkodobých trendů"
    },
    {
      mistake: "Vysoké poplatky",
      solution: "Vybírejte ETF s TER pod 0,5% a levného brokera"
    },
    {
      mistake: "Emocionální rozhodování",
      solution: "Mějte plán a držte se ho i v krizích"
    }
  ];

  const brokerComparison = [
    {
      name: "DEGIRO",
      icon: Star,
      pros: ["Zdarma vybrané ETF", "Nízké poplatky", "Česká podpora"],
      cons: ["Limitovaný výběr zdarma ETF", "Složitější rozhraní"],
      bestFor: "Začátečníci s malými částkami",
      color: "from-emerald-500 to-teal-600",
      rating: "Nejlepší pro začátečníky"
    },
    {
      name: "XTB",
      icon: Building,
      pros: ["0% do 100k EUR/měsíc", "Česká pobočka", "Jednoduché rozhraní"],
      cons: ["Poplatky nad limit", "Menší výběr"],
      bestFor: "Střední investoři",
      color: "from-violet-500 to-purple-600",
      rating: "Česká spolehlivost"
    },
    {
      name: "Trading212",
      icon: Smartphone,
      pros: ["Kompletně zdarma", "Skvělá aplikace", "Investiční plány"],
      cons: ["Pouze aplikace", "Čekací lista"],
      bestFor: "Mobilní investoři",
      color: "from-blue-500 to-indigo-600",
      rating: "Nejlepší aplikace"
    },
    {
      name: "Interactive Brokers",
      icon: TrendingUp,
      pros: ["Největší výběr", "Nízké poplatky", "Pokročilé funkce"],
      cons: ["Složitější", "Vyšší minimální vklad"],
      bestFor: "Pokročilí investoři",
      color: "from-orange-500 to-red-500",
      rating: "Pro profesionály"
    }
  ];

  return (
    <BlogArticleLayout
      title="Jak začít investovat do ETF"
      perex="Kompletní průvodce pro úplné začátečníky. Od otevření účtu u brokera až po první nákup ETF. Včetně chyb, kterým se vyhnout a praktických tipů pro dlouhodobý úspěch."
      seoDescription="Jak začít investovat do ETF: kompletní návod pro začátečníky 2025. Výběr brokera, první nákup, portfolio strategie a časté chyby. Praktický průvodce krok za krokem."
      readTime="20 min"
      difficulty="Začátečník"
      category="Začátečníci"
    >
      {/* Úvod */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Investování do ETF je jedna z nejjednodušších a nejefektivnějších cest k budování dlouhodobého bohatství. 
          Tento průvodce vás provede celým procesem od úplného začátku až po vaši první investici.
        </p>
      </div>

      {/* Proč ETF */}
      <Card className="mb-8 border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Proč investovat do ETF?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Výhody ETF fondů
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Nízké poplatky (0,1-0,5% ročně)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Široká diverzifikace</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Transparentnost</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <ArrowRight className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Vysoká likvidita</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-teal-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                Historické výnosy
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900">Světové akcie (VWCE)</span>
                    <Badge className="bg-teal-100 text-teal-800">~7-8%</Badge>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900">S&P 500 (CSPX)</span>
                    <Badge className="bg-teal-100 text-teal-800">~9-10%</Badge>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900">Evropské akcie (EUNL)</span>
                    <Badge className="bg-teal-100 text-teal-800">~6-7%</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic mt-3">
                  *Historické výnosy nejsou zárukou budoucích výsledků
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Krok za krokem návod */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
          Jak začít: Krok za krokem
        </h2>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className={`${step.color} p-6 flex items-center justify-center md:w-24 group-hover:scale-105 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-700 transition-colors">{step.title}</h3>
                    <p className="text-gray-600 mb-4 font-medium">{step.description}</p>
                    <div className="grid gap-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors group-hover:bg-emerald-50">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm font-medium text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Srovnání brokerů */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          Srovnání nejlepších brokerů
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {brokerComparison.map((broker, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${broker.color} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <broker.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{broker.name}</CardTitle>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {broker.rating}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Výhody
                    </h4>
                    <div className="space-y-2">
                      {broker.pros.map((pro, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Nevýhody
                    </h4>
                    <div className="space-y-2">
                      {broker.cons.map((con, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-700">Vhodné pro:</span>
                      <span className="text-sm text-gray-700">{broker.bestFor}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Časté chyby */}
      <Card className="mb-8 border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Časté chyby začátečníků</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-orange-50 p-5 rounded-xl border border-orange-100 hover:border-orange-200 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="font-semibold text-red-800">{item.mistake}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium text-emerald-800">{item.solution}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio příklady */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          Příklady portfolií pro začátečníky
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                <CardTitle className="text-lg font-bold">Konzervativní (věk 50+)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="font-medium text-gray-700">VWCE (Svět)</span>
                  <Badge className="bg-emerald-100 text-emerald-800 font-bold">50%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="font-medium text-gray-700">VGEA (Dluhopisy)</span>
                  <Badge className="bg-emerald-100 text-emerald-800 font-bold">40%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="font-medium text-gray-700">SGLN (Zlato)</span>
                  <Badge className="bg-emerald-100 text-emerald-800 font-bold">10%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center p-3 bg-green-100 rounded-lg">
                <Badge className="bg-green-200 text-green-800 text-sm font-semibold">Riziko: Nízké</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                <CardTitle className="text-lg font-bold">Vyvážené (věk 30-50)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">VWCE (Svět)</span>
                  <Badge className="bg-blue-100 text-blue-800 font-bold">70%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">VGEA (Dluhopisy)</span>
                  <Badge className="bg-blue-100 text-blue-800 font-bold">20%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">EUNL (Evropa)</span>
                  <Badge className="bg-blue-100 text-blue-800 font-bold">10%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center p-3 bg-blue-100 rounded-lg">
                <Badge className="bg-blue-200 text-blue-800 text-sm font-semibold">Riziko: Střední</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6" />
                <CardTitle className="text-lg font-bold">Agresivní (věk 20-30)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                  <span className="font-medium text-gray-700">VWCE (Svět)</span>
                  <Badge className="bg-violet-100 text-violet-800 font-bold">60%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                  <span className="font-medium text-gray-700">CSPX (S&P 500)</span>
                  <Badge className="bg-violet-100 text-violet-800 font-bold">30%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                  <span className="font-medium text-gray-700">VFEM (Rozvíjející se)</span>
                  <Badge className="bg-violet-100 text-violet-800 font-bold">10%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center p-3 bg-violet-100 rounded-lg">
                <Badge className="bg-violet-200 text-violet-800 text-sm font-semibold">Riziko: Vysoké</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to action */}
      <Card className="border-0 shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold mb-4">Začněte ještě dnes!</CardTitle>
          <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            Nejlepší čas pro investování byl před 20 lety. Druhý nejlepší čas je dnes. 
            Každý den čekání vás stojí potenciální výnosy.
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/srovnani-brokeru" className="flex-1 max-w-xs">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Building className="w-5 h-5 mr-2" />
                Vybrat brokera
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/srovnani-etf" className="flex-1 max-w-xs">
              <Button variant="outline" className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-semibold py-4 px-6 text-lg transition-all duration-300">
                <TrendingUp className="w-5 h-5 mr-2" />
                Prozkoumat ETF
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-800">Rychlý začátek za 3 kroky</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-sm font-medium text-gray-700">Vyberte brokera</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-sm font-medium text-gray-700">Otevřete účet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-sm font-medium text-gray-700">Kupte první ETF</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default JakZacitInvestovatDoETF;