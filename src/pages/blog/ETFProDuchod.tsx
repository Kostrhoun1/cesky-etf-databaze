import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PiggyBank, TrendingUp, Calendar, Shield, Target, Calculator } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import ETFTickerList from '@/components/ETFTickerList';
import ETFTicker from '@/components/ETFTicker';
import { getETFIsin } from '@/utils/etfTickerMapping';

const ETFProDuchod: React.FC = () => {
  const ageBasedStrategies = [
    {
      age: "20-30 let",
      allocation: "90% akcie, 10% dluhopisy",
      focus: "Růst kapitálu",
      etfs: ["VWCE", "CSPX", "VFEM"],
      risk: "Vysoké",
      timeHorizon: "35-45 let",
      strategy: "Agresivní růstová strategie s maximální expozicí akcií"
    },
    {
      age: "30-40 let",
      allocation: "80% akcie, 20% dluhopisy",
      focus: "Růst s první diverzifikací",
      etfs: ["IWDA", "EIMI", "IEAG"],
      risk: "Vysoké-střední",
      timeHorizon: "25-35 let",
      strategy: "Stále růstově orientované s mírnou ochranou"
    },
    {
      age: "40-50 let",
      allocation: "70% akcie, 30% dluhopisy",
      focus: "Vyvážený růst a ochrana",
      etfs: ["CSPX", "EUNL", "AGGG"],
      risk: "Střední",
      timeHorizon: "15-25 let",
      strategy: "Začátek konzervativnější strategie"
    },
    {
      age: "50-60 let",
      allocation: "50% akcie, 50% dluhopisy",
      focus: "Ochrana kapitálu",
      etfs: ["IWDA", "AGGG", "IGLH"],
      risk: "Střední-nízké",
      timeHorizon: "5-15 let",
      strategy: "Příprava na důchod s důrazem na stabilitu"
    },
    {
      age: "60+ let",
      allocation: "30% akcie, 70% dluhopisy",
      focus: "Konzervativní příjem",
      etfs: ["VHYL", "AGGG", "CORP"],
      risk: "Nízké",
      timeHorizon: "0-10 let",
      strategy: "Maximální ochrana s pravidelným příjmem"
    }
  ];

  const retirementTips = [
    {
      title: "Začněte co nejdříve",
      description: "Čas je nejsilnější faktor díky složenému úročení",
      icon: Calendar
    },
    {
      title: "Pravidelně investujte",
      description: "DCA strategie snižuje riziko časování trhu",
      icon: TrendingUp
    },
    {
      title: "Využijte daňové výhody",
      description: "Penzijní spoření + státní příspěvky",
      icon: PiggyBank
    },
    {
      title: "Diversifikujte globálně",
      description: "Nespotějte se pouze na český nebo evropský trh",
      icon: Shield
    }
  ];

  const withdrawalStrategies = [
    {
      name: "4% pravidlo",
      description: "Každý rok vyberte 4% z počáteční hodnoty portfolia",
      pros: ["Jednoduchá aplikace", "Historicky úspěšná"],
      cons: ["Neflexibilní", "Nereaguje na trh"]
    },
    {
      name: "Bucket strategie",
      description: "Rozdělte portfolio na 3 koše podle času výběru",
      pros: ["Flexibilní", "Chráná před volatilitou"],
      cons: ["Komplexnější správa", "Vyžaduje rebalancování"]
    },
    {
      name: "Bond ladder",
      description: "Postupně splatné dluhopisy pro pravidelný příjem",
      pros: ["Předvídatelný příjem", "Nulové reinvestiční riziko"],
      cons: ["Nižší výnosy", "Inflační riziko"]
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ETF pro důchod - Kompletní průvodce důchodovým spořením",
    "description": "Jak sestavit ETF portfolio pro důchodové spoření. Strategie podle věku, optimalizace daní, výběr akumulačních vs. distribučních fondů a plánování výběru.",
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ETF průvodce.cz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://etfpruvodce.cz/og-image.jpg"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01",
    "mainEntityOfPage": "https://etfpruvodce.cz/tipy/etf-pro-duchod",
    "image": "https://etfpruvodce.cz/og-retirement.jpg",
    "articleSection": "Životní situace",
    "keywords": "ETF důchod, důchodové spoření, penzijní ETF, investování na stáří, dlouhodobé investování"
  };

  return (
    <Layout>
      <SEOHead
        title="ETF pro důchod - Jak stavět portfolio pro důchodové spoření | ETF průvodce.cz"
        description="Jak sestavit ETF portfolio pro důchodové spoření. Strategie podle věku, optimalizace daní, výběr akumulačních vs. distribučních fondů a plánování výběru."
        canonical="https://etfpruvodce.cz/tipy/etf-pro-duchod"
        keywords="ETF důchod, důchodové spoření, penzijní ETF, investování na stáří, dlouhodobé investování, retirement planning, penze ETF"
        ogImage="https://etfpruvodce.cz/og-retirement.jpg"
        schema={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link to="/tipy" className="text-violet-600 font-semibold hover:underline">
            ← Zpět na Tipy pro investory
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-pink-100 text-pink-800">Životní situace</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">Mírně pokročilé</Badge>
            <span className="text-gray-500 text-sm">16 min čtení</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            ETF pro důchod
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Jak sestavit ETF portfolio pro důchodové spoření. Strategie podle věku, optimalizace daní, výběr akumulačních vs. distribučních fondů a plánování výběru.
          </p>
        </div>

        {/* Úvod */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <PiggyBank className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Proč investovat do ETF na důchod?</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Státní důchod v ČR kryje pouze základní potřeby. Pro zachování životní úrovně potřebujete vlastní spoření. ETF fondy nabízejí ideální kombinaci nízkých nákladů, diverzifikace a dlouhodobého růstu.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Výhody ETF pro důchod</h3>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Nízké poplatky (TER 0.1-0.5%)</li>
                    <li>• Široká diverzifikace</li>
                    <li>• Likvidita kdykoliv</li>
                    <li>• Transparentnost</li>
                    <li>• Daňová efektivita</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">Síla složeného úročení</h3>
                  <div className="text-blue-700 text-sm space-y-2">
                    <div>25 let, 5000 Kč/měsíc, 7% ročně:</div>
                    <div className="font-bold text-lg">3.8 mil. Kč</div>
                    <div className="text-xs">z toho vlastní vklady: 1.5 mil. Kč</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategie podle věku */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Strategie podle věku</h2>
            </div>
            <div className="space-y-6">
              {ageBasedStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{strategy.age}</h3>
                      <p className="text-gray-600">{strategy.strategy}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Badge variant="secondary">{strategy.risk} riziko</Badge>
                      <Badge variant="outline">{strategy.timeHorizon}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Alokace</h4>
                      <p className="text-sm text-violet-600 font-medium">{strategy.allocation}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Fokus</h4>
                      <p className="text-sm text-gray-600">{strategy.focus}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Doporučené ETF</h4>
                      <div className="flex gap-1">
                        {strategy.etfs.map((etf, i) => (
                          <ETFTicker key={i} ticker={etf} isin={getETFIsin(etf)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Praktické tipy */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Klíčové principy úspěšného spoření</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {retirementTips.map((tip, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <tip.icon className="w-8 h-8 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Akumulační vs Distribuční */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Akumulační vs. Distribuční ETF</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 text-green-600">Akumulační ETF (fáze spoření)</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Reinvestují dividendy automaticky</li>
                  <li>• Vyšší složené úročení</li>
                  <li>• Bez daní z dividend</li>
                  <li>• Ideální pro spoření</li>
                </ul>
                <div className="mt-4 text-xs text-green-600 font-medium">
                  Doporučeno: <ETFTickerList tickers={['VWCE', 'IWDA', 'CSPX']} />
                </div>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 text-blue-600">Distribuční ETF (fáze výběru)</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Vyplácejí dividendy pravidelně</li>
                  <li>• Pravidelný příjem</li>
                  <li>• Daň z dividend každý rok</li>
                  <li>• Ideální pro důchod</li>
                </ul>
                <div className="mt-4 text-xs text-blue-600 font-medium">
                  Doporučeno: <ETFTickerList tickers={['VHYL', 'IUSN', 'WDIV']} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Výběrové strategie */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Strategie výběru v důchodu</h2>
            </div>
            <div className="space-y-6">
              {withdrawalStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">{strategy.name}</h3>
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Výhody:</h4>
                      <ul className="text-sm space-y-1">
                        {strategy.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Nevýhody:</h4>
                      <ul className="text-sm space-y-1">
                        {strategy.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daňová optimalizace */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Daňová optimalizace v ČR</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Fáze spoření</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Akumulační ETF = žádná daň z dividend</li>
                  <li>• Držba &gt;3 roky = osvobození</li>
                  <li>• Prodej &lt;100k Kč/rok = osvobození</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Kombinace s penzijním spořením</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Státní příspěvky až 2.760 Kč/rok</li>
                  <li>• Daňový odpočet až 12k Kč</li>
                  <li>• ETF jako doplněk k penzijce</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA sekce */}
        <Card className="mb-8 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Začněte plánovat svůj důchod již dnes</h2>
            <p className="text-gray-600 mb-6">
              Použijte naše kalkulačky k naplánování důchodového spoření a výběru vhodných ETF.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-violet-600 hover:bg-violet-700">
                <Link to="/kalkulacky/penzijni-planovac">
                  Důchodová kalkulačka
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
                <Link to="/tipy/nejlepsi-etf-2025">
                  Nejlepší ETF 2025
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default ETFProDuchod;