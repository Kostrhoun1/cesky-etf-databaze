import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Target, Users, Calculator, TrendingUp, AlertTriangle, Lightbulb, DollarSign, Shield, BarChart } from 'lucide-react';

const BeginnerGuide: React.FC = () => {
  useEffect(() => {
    document.title = 'Návod pro začátečníky - Jak začít investovat do ETF | ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Kompletní návod pro začátečníky, jak začít investovat do ETF fondů. Krok za krokem od otevření účtu po první nákup. Praktické tipy pro české investory 2025.'
    );
  }, []);

  const steps = [
    {
      icon: Target,
      title: "1. Stanovte si investiční cíl",
      description: "Určete si, proč chcete investovat a na jak dlouho",
      details: [
        "Spoření na důchod (20+ let)",
        "Nákup nemovitosti (5-10 let)", 
        "Vytvoření rezervy (1-3 roky)",
        "Pasivní příjem z dividend"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Calculator,
      title: "2. Spočítejte si rozpočet",
      description: "Kolik můžete měsíčně investovat bez ohrožení financí",
      details: [
        "Mějte nejdříve nouzovou rezervu (3-6 měsíčních výdajů)",
        "Investujte pouze přebytečné peníze",
        "Začněte s malými částkami (500-2000 Kč měsíčně)",
        "Postupně můžete částky navyšovat"
      ],
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "3. Vyberte si brokera",
      description: "Založte si účet u spolehlivého brokera",
      details: [
        "XTB - dobrá volba pro začátečníky",
        "DEGIRO - nízké poplatky",
        "Trading 212 - intuitivní aplikace",
        "Ověřte si regulaci a pojištění vkladů"
      ],
      color: "bg-purple-500"
    },
    {
      icon: BarChart,
      title: "4. Vyberte své první ETF",
      description: "Začněte s širokým světovým indexem",
      details: [
        "MSCI World nebo FTSE Developed World",
        "Vanguard FTSE All-World",
        "iShares Core MSCI World",
        "Sledujte nízké poplatky (TER pod 0,5%)"
      ],
      color: "bg-orange-500"
    },
    {
      icon: DollarSign,
      title: "5. Proveďte první nákup",
      description: "Zadejte svůj první pokyn k nákupu ETF",
      details: [
        "Pošlete peníze na brokerský účet",
        "Najděte ETF podle ISIN kódu",
        "Zadejte částku nebo počet kusů",
        "Potvrďte nákup"
      ],
      color: "bg-red-500"
    },
    {
      icon: TrendingUp,
      title: "6. Investujte pravidelně",
      description: "Nastavte si pravidelné investování (DCA)",
      details: [
        "Investujte každý měsíc stejnou částku",
        "Nevěnujte pozornost krátkodobým výkyvům",
        "Držte se své strategie dlouhodobě",
        "Kontrolujte portfolio 1-2x ročně"
      ],
      color: "bg-indigo-500"
    }
  ];

  const commonMistakes = [
    {
      title: "Snaha o market timing",
      description: "Pokus o načasování trhu většinou nevyjde. Lepší je investovat pravidelně."
    },
    {
      title: "Příliš složité portfolio",
      description: "Začátečníci často kupují mnoho různých ETF. Začněte s 1-2 fondy."
    },
    {
      title: "Panika při poklesu",
      description: "Krátkodobé poklesy jsou normální. Důležité je držet se dlouhodobé strategie."
    },
    {
      title: "Zanedbání poplatků",
      description: "Vysoké poplatky mojí výrazně snížit výnosy. Sledujte TER i transakční poplatky."
    }
  ];

  const tips = [
    {
      icon: Shield,
      title: "Diverzifikace je klíčová",
      description: "ETF vám automaticky poskytuje diverzifikaci. Jeden světový ETF obsahuje tisíce akcií."
    },
    {
      icon: Lightbulb,
      title: "Vzdělávejte se průběžně",
      description: "Čtěte o investování, sledujte naše články a postupně rozšiřujte znalosti."
    },
    {
      icon: TrendingUp,
      title: "Trpělivost se vyplácí",
      description: "Investování je maraton, ne sprint. Dlouhodobě trhy rostou, i přes krátkodobé výkyvy."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative text-center py-24 px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Lightbulb className="w-4 h-4 mr-2" />
            Krok za krokem k úspěšnému investování
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight animate-fade-in">
            Návod pro <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">začátečníky</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Kompletní průvodce, jak začít investovat do ETF fondů. Od prvního kroku až po vytvoření vašeho portfolia.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <Link to="/srovnani-etf">Vybrat první ETF</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
              <Link to="/nastroje">Investiční kalkulačka</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          
          {/* Úvod */}
          <div className="animate-fade-in">
            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Proč začít investovat do ETF?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Dlouhodobý růst</h3>
                    <p className="text-gray-600">Akciové trhy dlouhodobě rostou rychleji než inflace</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Nízké riziko</h3>
                    <p className="text-gray-600">ETF automaticky diverzifikuje vaše investice</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Nízké náklady</h3>
                    <p className="text-gray-600">Minimální poplatky díky pasivní správě</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kroky */}
          <div className="animate-fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">6 kroků k úspěšnému investování</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Postupujte krok za krokem a během několika týdnů budete mít své první ETF</p>
            </div>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`flex-shrink-0 w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                        <step.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-lg text-gray-700 mb-6">{step.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                              <span className="text-gray-700">{detail}</span>
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

          {/* Časté chyby */}
          <div className="animate-fade-in">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl mb-6 shadow-lg">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Časté chyby začátečníků</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Vyvarujte se těmto nejčastějším chybám</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {commonMistakes.map((mistake, index) => (
                <Card key={index} className="bg-red-50 border-red-200 border-2 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-red-900 mb-2">{mistake.title}</h4>
                        <p className="text-red-800">{mistake.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tipy */}
          <div className="animate-fade-in">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Užitečné tipy</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Rady, které vám pomohou být úspěšnějším investorem</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {tips.map((tip, index) => (
                <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <tip.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg mb-3">{tip.title}</h4>
                    <p className="text-gray-700">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl text-white shadow-2xl animate-fade-in overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative p-12 text-center">
              <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4 mr-2" />
                Začněte investovat ještě dnes
              </div>
              <h3 className="text-4xl font-bold mb-6">
                Připraveni na první investici?
              </h3>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Použijte náš srovnávač a najděte své první ETF. Začněte s malými částkami a postupně budujte své portfolio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <Link to="/srovnani-etf">Najít první ETF</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 bg-transparent font-bold px-8 py-4 text-lg transition-all hover:scale-105">
                  <Link to="/kde-koupit-etf">Vybrat brokera</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginnerGuide;
