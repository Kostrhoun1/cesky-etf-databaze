import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Calculator, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';

const RebalancingPortfolia: React.FC = () => {
  const rebalancingStrategies = [
    {
      name: "Časové rebalancování",
      frequency: "Každých 6-12 měsíců",
      complexity: "Jednoduché",
      cost: "Nízké",
      description: "Pravidelné rebalancování bez ohledu na výši odchylek",
      pros: ["Jednoduché na implementaci", "Automatizovatelné", "Disciplinované"],
      cons: ["Může ignorovat velké pohyby", "Fixní náklady"]
    },
    {
      name: "Prahové rebalancování",
      frequency: "Při odchylce 5-10%",
      complexity: "Střední",
      cost: "Střední",
      description: "Rebalancování pouze při překročení stanové odchylky",
      pros: ["Reaguje na volatilitu", "Menší transakční náklady", "Flexibilní"],
      cons: ["Vyžaduje monitoring", "Složitější pravidla"]
    },
    {
      name: "Kombinovaný přístup",
      frequency: "Čas + práh",
      complexity: "Pokročilé",
      cost: "Optimální",
      description: "Kombinace časového a prahového rebalancování",
      pros: ["Nejlepší poměr výkon/náklady", "Univerzální", "Profesionální"],
      cons: ["Komplexnější nastavení"]
    }
  ];

  const rebalancingSteps = [
    {
      step: 1,
      title: "Analýza aktuálního portfolia",
      description: "Zjistěte skutečnou alokaci vašich ETF fondů"
    },
    {
      step: 2,
      title: "Porovnání s cílovou alokací",
      description: "Identifikujte odchylky od původního plánu"
    },
    {
      step: 3,
      title: "Výpočet potřebných transakcí",
      description: "Stanovte, kolik musíte koupit/prodat"
    },
    {
      step: 4,
      title: "Provedení transakcí",
      description: "Realizujte nákupy a prodeje v správném pořadí"
    },
    {
      step: 5,
      title: "Dokumentace a plán",
      description: "Zaznamenejte změny a naplánujte další rebalancování"
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Rebalancing portfolia - Kompletní návod pro optimální výnosy",
    "description": "Kdy a jak rebalancovat portfolio ETF fondů. Praktické strategie, náklady, daňové dopady a automatizace rebalancingu pro optimální dlouhodobé výnosy.",
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
    "mainEntityOfPage": "https://etfpruvodce.cz/tipy/rebalancing-portfolia",
    "image": "https://etfpruvodce.cz/og-rebalancing.jpg",
    "articleSection": "Strategie",
    "keywords": "rebalancing portfolia, ETF rebalancování, portfolio strategie, investiční disciplína, dlouhodobé investování"
  };

  return (
    <Layout>
      <SEOHead
        title="Rebalancing portfolia - Kdy a jak rebalancovat ETF portfolio | ETF průvodce.cz"
        description="Kdy a jak rebalancovat portfolio ETF fondů. Praktické strategie, náklady, daňové dopady a automatizace rebalancingu pro optimální dlouhodobé výnosy."
        canonical="https://etfpruvodce.cz/tipy/rebalancing-portfolia"
        keywords="rebalancing portfolia, ETF rebalancování, portfolio strategie, investiční disciplína, dlouhodobé investování, časové rebalancování, prahové rebalancování"
        ogImage="https://etfpruvodce.cz/og-rebalancing.jpg"
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
            <Badge className="bg-violet-100 text-violet-800">Strategie</Badge>
            <Badge className="bg-red-100 text-red-800">Pokročilé</Badge>
            <span className="text-gray-500 text-sm">13 min čtení</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Rebalancing portfolia
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kdy a jak rebalancovat portfolio ETF fondů. Praktické strategie, náklady, daňové dopady a automatizace rebalancingu pro optimální dlouhodobé výnosy.
          </p>
        </div>

        {/* Co je rebalancování */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Co je rebalancování portfolia?</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Rebalancování je proces obnovení původní alokace aktiv ve vašem portfoliu. Časem se kvůli různým výnosům jednotlivých ETF fondů změní poměry investic, což může ovlivnit rizikový profil portfolia.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h3 className="font-semibold mb-2 text-blue-900">Příklad rebalancování</h3>
                <p className="text-blue-800">
                  Vaše původní alokace: 70% akcie (IWDA) + 30% dluhopisy (IEAG)<br/>
                  Po roce: 80% akcie + 20% dluhopisy (akcie rostly rychleji)<br/>
                  Rebalancování: Prodáte část akcií a dokoupíte dluhopisy na původních 70:30
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategie rebalancování */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Strategie rebalancování</h2>
            <div className="grid md:grid-cols-1 gap-6">
              {rebalancingStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{strategy.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{strategy.complexity}</Badge>
                      <Badge variant="outline">{strategy.cost} náklady</Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  <div className="text-sm text-violet-600 font-medium mb-3">
                    Frekvence: {strategy.frequency}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Výhody:</h4>
                      <ul className="text-sm space-y-1">
                        {strategy.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Nevýhody:</h4>
                      <ul className="text-sm space-y-1">
                        {strategy.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Praktický postup */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Jak na rebalancování krok za krokem</h2>
            </div>
            <div className="space-y-6">
              {rebalancingSteps.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Náklady a daně */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Náklady a daňové dopady</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Transakční náklady</h3>
                <ul className="space-y-2 text-sm">
                  <li>• DEGIRO: 0-2 EUR na transakci</li>
                  <li>• XTB: 0 EUR (pro ETF na seznamu)</li>
                  <li>• Trading212: 0 EUR</li>
                  <li>• Interactive Brokers: 1.25-4 EUR</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Daňové dopady v ČR</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Prodej = daňová událost</li>
                  <li>• Test časový: držba &gt;3 roky</li>
                  <li>• Test částkový: prodej &lt;100k Kč/rok</li>
                  <li>• Daň 15% z rozdílu mezi prodejem a nákupem</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Tip pro minimalizaci daní</h4>
              <p className="text-yellow-700 text-sm">
                Raději rebalancujte novými příspěvky než prodeji. Místo prodeje přehodnotěné části kupujte více podhodnocené části.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Automatizace */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Automatizace rebalancování</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Portfolio Management aplikace</h3>
                <p className="text-gray-600 text-sm mb-2">Personal Capital, Betterment (USA), Nutmeg (UK)</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Broker funkce</h3>
                <p className="text-gray-600 text-sm mb-2">Interactive Brokers má funkce pro automatické rebalancování</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Target-date fondy</h3>
                <p className="text-gray-600 text-sm">Automaticky mění alokaci podle věku investora</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA sekce */}
        <Card className="mb-8 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Chcete se dozvědět více?</h2>
            <p className="text-gray-600 mb-6">
              Prozkoumejte naše další návody a kalkulačky pro optimalizaci vašeho portfolia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-violet-600 hover:bg-violet-700">
                <Link to="/kalkulacky/investicni-kalkulacka">
                  Investiční kalkulačka
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

export default RebalancingPortfolia;