import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, AlertTriangle, DollarSign, TrendingUp, Shield, Clock } from 'lucide-react';
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
      icon: TrendingUp,
      color: "bg-blue-500"
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
      icon: Shield,
      color: "bg-green-500"
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
      color: "bg-purple-500"
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
      icon: DollarSign,
      color: "bg-violet-500"
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
      color: "bg-orange-500"
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
      pros: ["Zdarma vybrané ETF", "Nízké poplatky", "Česká podpora"],
      cons: ["Limitovaný výběr zdarma ETF", "Složitější rozhraní"],
      bestFor: "Začátečníci s malými částkami"
    },
    {
      name: "XTB",
      pros: ["0% do 100k EUR/měsíc", "Česká pobočka", "Jednoduché rozhraní"],
      cons: ["Poplatky nad limit", "Menší výběr"],
      bestFor: "Střední investoři"
    },
    {
      name: "Trading212",
      pros: ["Kompletně zdarma", "Skvělá aplikace", "Investiční plány"],
      cons: ["Pouze aplikace", "Čekací lista"],
      bestFor: "Mobilní investoři"
    },
    {
      name: "Interactive Brokers",
      pros: ["Největší výběr", "Nízké poplatky", "Pokročilé funkce"],
      cons: ["Složitější", "Vyšší minimální vklad"],
      bestFor: "Pokročilí investoři"
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
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Investování do ETF je jedna z nejjednodušších a nejefektivnějších cest k budování dlouhodobého bohatství. 
          Tento průvodce vás provede celým procesem od úplného začátku až po vaši první investici.
        </p>
      </div>

      {/* Proč ETF */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Proč investovat do ETF?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-blue-800">Výhody ETF fondů:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Nízké poplatky (0,1-0,5% ročně)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Široká diverzifikace</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Transparentnost</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Likvidita</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-800">Historické výnosy:</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Světové akcie (VWCE):</strong> ~7-8% ročně</li>
                <li><strong>S&P 500 (CSPX):</strong> ~9-10% ročně</li>
                <li><strong>Evropské akcie (EUNL):</strong> ~6-7% ročně</li>
                <li className="text-xs text-gray-600 italic">*Historické výnosy nejsou zárukou budoucích výsledků</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Krok za krokem návod */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Jak začít: Krok za krokem</h2>
      
      <div className="space-y-8 mb-12">
        {steps.map((step, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`${step.color} p-6 flex items-center justify-center`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Srovnání brokerů */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Srovnání nejlepších brokerů</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {brokerComparison.map((broker, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-4">{broker.name}</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2">✅ Výhody:</h4>
                <ul className="text-sm space-y-1">
                  {broker.pros.map((pro, idx) => (
                    <li key={idx}>• {pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-red-700 mb-2">⚠️ Nevýhody:</h4>
                <ul className="text-sm space-y-1">
                  {broker.cons.map((con, idx) => (
                    <li key={idx}>• {con}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto">
                <Badge variant="secondary" className="mb-3">
                  Vhodné pro: {broker.bestFor}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Časté chyby */}
      <Card className="mb-8 bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-red-900">Časté chyby začátečníků</h2>
          </div>
          
          <div className="space-y-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-800 mb-2">❌ {item.mistake}</h4>
                  <p className="text-sm text-gray-700">✅ {item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio příklady */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Příklady portfolií pro začátečníky</h2>
      
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-green-800">Konzervativní (věk 50+)</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>VWCE (Svět)</span>
                <span className="font-semibold">50%</span>
              </div>
              <div className="flex justify-between">
                <span>VGEA (Dluhopisy)</span>
                <span className="font-semibold">40%</span>
              </div>
              <div className="flex justify-between">
                <span>SGLN (Zlato)</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Riziko: Nízké</Badge>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-blue-800">Vyvážené (věk 30-50)</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>VWCE (Svět)</span>
                <span className="font-semibold">70%</span>
              </div>
              <div className="flex justify-between">
                <span>VGEA (Dluhopisy)</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>EUNL (Evropa)</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Riziko: Střední</Badge>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-violet-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-violet-800">Agresivní (věk 20-30)</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>VWCE (Svět)</span>
                <span className="font-semibold">60%</span>
              </div>
              <div className="flex justify-between">
                <span>CSPX (S&P 500)</span>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex justify-between">
                <span>VFEM (Rozvíjející se)</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
            <Badge className="bg-violet-100 text-violet-800">Riziko: Vysoké</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Call to action */}
      <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Začněte ještě dnes!</h2>
          <p className="mb-6 opacity-90">
            Nejlepší čas pro investování byl před 20 lety. Druhý nejlepší čas je dnes.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/srovnani-brokeru">
              <Button variant="secondary" className="bg-white text-violet-600 hover:bg-gray-100">
                Vybrat brokera
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/srovnani-etf">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
                Prozkoumat ETF
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default JakZacitInvestovatDoETF;