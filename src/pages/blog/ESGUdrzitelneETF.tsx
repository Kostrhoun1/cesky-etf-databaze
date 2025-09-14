import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, Shield, TrendingUp, Globe, Award, AlertTriangle } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import SocialSharing from '@/components/SocialSharing';
import ETFTicker from '@/components/ETFTicker';
import { getETFIsin } from '@/utils/etfTickerMapping';

const ESGUdrzitelneETF: React.FC = () => {
  const bestESGETFs = [
    {
      name: "iShares MSCI KLD 400 Social UCITS ETF",
      ticker: "ISUS",
      isin: "IE00B57X3V84",
      ter: "0.25%",
      size: "1.8B €",
      focus: "USA socially responsible",
      esgScore: "8.2/10",
      description: "Nejstarší a nejrespektovanější ESG ETF zaměřený na USA trh",
      carbonIntensity: "-62% vs benchmark"
    },
    {
      name: "Vanguard ESG Global All Cap UCITS ETF",
      ticker: "V3AA",
      isin: "IE00BNG8L278",
      ter: "0.24%",
      size: "3.5B €",
      focus: "Globální ESG",
      esgScore: "7.8/10",
      description: "Globální ESG portfolio s velmi nízkými náklady od Vanguard",
      carbonIntensity: "-45% vs benchmark"
    },
    {
      name: "iShares MSCI World ESG Screened UCITS ETF",
      ticker: "SAWD",
      isin: "IE00BFNM3K80",
      ter: "0.20%",
      size: "5.2B €",
      focus: "Globální ESG screening",
      esgScore: "7.5/10",
      description: "Nejlevnější globální ESG ETF s negativním screeningem",
      carbonIntensity: "-38% vs benchmark"
    },
    {
      name: "Xtrackers MSCI World ESG UCITS ETF",
      ticker: "XZWO",
      isin: "IE00BZ02LR44",
      ter: "0.25%",
      size: "1.1B €",
      focus: "Globální ESG leaders",
      esgScore: "8.0/10",
      description: "Best-in-class přístup k ESG investování",
      carbonIntensity: "-52% vs benchmark"
    },
    {
      name: "Amundi Index MSCI Europe ESG Universal UCITS ETF",
      ticker: "ESG1",
      isin: "LU1861134382",
      ter: "0.18%",
      size: "880M €",
      focus: "Evropa ESG",
      esgScore: "7.4/10",
      description: "Nejlevnější evropský ESG ETF s univerzálním přístupem",
      carbonIntensity: "-41% vs benchmark"
    },
    {
      name: "iShares Global Clean Energy UCITS ETF",
      ticker: "INRG",
      isin: "IE00B1XNHC34",
      ter: "0.65%",
      size: "6.8B €",
      focus: "Čistá energie",
      esgScore: "9.1/10",
      description: "Specializovaný ETF na obnovitelné zdroje energie",
      carbonIntensity: "-95% vs benchmark"
    }
  ];

  const esgCriteria = [
    {
      category: "Environmental (E)",
      icon: Leaf,
      color: "text-green-600",
      factors: [
        "Emise CO2 a klimatická změna",
        "Efektivita využívání zdrojů",
        "Odpadové hospodářství",
        "Biodiverzita a ochrana přírody"
      ]
    },
    {
      category: "Social (S)",
      icon: Globe,
      color: "text-blue-600",
      factors: [
        "Pracovní podmínky zaměstnanců",
        "Bezpečnost a ochrana zdraví",
        "Diverzita a inkluze",
        "Vztahy s komunitou"
      ]
    },
    {
      category: "Governance (G)",
      icon: Shield,
      color: "text-purple-600",
      factors: [
        "Transparentnost řízení",
        "Nezávislost představenstva",
        "Odměňování vedení",
        "Dodržování předpisů"
      ]
    }
  ];

  const esgApproaches = [
    {
      name: "Negativní screening",
      description: "Vyloučení společností z problematických odvětví",
      examples: "Tabák, zbraně, hazard, fosilní paliva",
      pros: ["Jednoduché", "Transparentní", "Nízké náklady"],
      cons: ["Omezená diverzifikace", "Může snížit výnosy"]
    },
    {
      name: "Pozitivní screening (Best-in-class)",
      description: "Výběr nejlepších ESG společností z každého sektoru",
      examples: "Nejlepší ESG skóre v rámci sektoru",
      pros: ["Zachovává diverzifikaci", "Lepší ESG profil"],
      cons: ["Složitější", "Subjektivní hodnocení"]
    },
    {
      name: "Tematické investování",
      description: "Investice do specifických ESG témat",
      examples: "Čistá energie, vodní hospodářství, udržitelná zemědělství",
      pros: ["Jasný fokus", "Vysoký dopad", "Růstový potenciál"],
      cons: ["Vysoké riziko", "Nízká diverzifikace", "Volatilní"]
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ESG a udržitelné ETF - Investování s ohledem na životní prostředí",
    "description": "Investování s ohledem na životní prostředí a společenskou odpovědnost. Přehled nejlepších ESG ETF, jejich výkonnost a jak vybírat udržitelné investice.",
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
    "mainEntityOfPage": "https://etfpruvodce.cz/tipy/esg-udrzitelne-etf",
    "image": "https://etfpruvodce.cz/og-esg-etf.jpg",
    "articleSection": "Specializované",
    "keywords": "ESG ETF, udržitelné investování, environmentální investice, společenská odpovědnost, zelené ETF"
  };

  return (
    <Layout>
      <SEOHead
        title="ESG a udržitelné ETF - Investování s ohledem na životní prostředí | ETF průvodce.cz"
        description="Investování s ohledem na životní prostředí a společenskou odpovědnost. Přehled nejlepších ESG ETF, jejich výkonnost a jak vybírat udržitelné investice."
        canonical="https://etfpruvodce.cz/tipy/esg-udrzitelne-etf"
        keywords="ESG ETF, udržitelné investování, environmentální investice, společenská odpovědnost, zelené ETF, sustainable investing"
        ogImage="https://etfpruvodce.cz/og-esg-etf.jpg"
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
            <Badge className="bg-amber-100 text-amber-800">Specializované</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">Mírně pokročilé</Badge>
            <span className="text-gray-500 text-sm">10 min čtení</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            ESG a udržitelné ETF
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Investování s ohledem na životní prostředí a společenskou odpovědnost. Přehled nejlepších ESG ETF, jejich výkonnost a jak vybírat udržitelné investice.
          </p>
        </div>

        {/* Co je ESG */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold">Co znamená ESG?</h2>
            </div>
            <div className="prose max-w-none mb-6">
              <p className="text-lg mb-6">
                ESG je zkratka pro Environmental, Social, and Governance - tři klíčové oblasti, podle kterých se hodnotí udržitelnost a etické chování společností. ESG investování kombinuje finanční výnosy s pozitivním dopadem na společnost a životní prostředí.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {esgCriteria.map((criteria, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <criteria.icon className={`w-8 h-8 ${criteria.color}`} />
                    <h3 className="font-semibold text-lg">{criteria.category}</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {criteria.factors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nejlepší ESG ETF */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Nejlepší ESG ETF fondy 2025</h2>
            </div>
            <div className="space-y-4">
              {bestESGETFs.map((etf, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          <ETFTicker ticker={etf.ticker} isin={etf.isin} size="lg" />
                        </h3>
                        <Badge variant="outline" className="text-xs">{etf.focus}</Badge>
                        <Badge variant="secondary" className="text-xs font-bold">
                          TER {etf.ter}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          ESG {etf.esgScore}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{etf.name}</p>
                      <p className="text-gray-500 text-sm">{etf.description}</p>
                    </div>
                    <div className="text-right mt-4 lg:mt-0 lg:ml-4">
                      <div className="text-sm text-gray-500">Velikost fondu</div>
                      <div className="font-semibold">{etf.size}</div>
                      <div className="text-xs text-green-600 mt-1">
                        {etf.carbonIntensity}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">ISIN: {etf.isin}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ESG přístupy */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Různé přístupy k ESG investování</h2>
            <div className="space-y-6">
              {esgApproaches.map((approach, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h3 className="font-semibold text-xl mb-2">{approach.name}</h3>
                  <p className="text-gray-600 mb-3">{approach.description}</p>
                  <div className="text-sm text-blue-600 font-medium mb-4">
                    Příklady: {approach.examples}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Výhody:</h4>
                      <ul className="text-sm space-y-1">
                        {approach.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Nevýhody:</h4>
                      <ul className="text-sm space-y-1">
                        {approach.cons.map((con, i) => (
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

        {/* Výkonnost ESG vs tradiční */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Výkonnost ESG vs. tradiční ETF</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-4">Co říká výzkum</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• ESG společnosti často vykazují podobné nebo lepší dlouhodobé výnosy</li>
                  <li>• Nižší volatilita během krizí</li>
                  <li>• Lepší řízení rizik</li>
                  <li>• Rostoucí zájem investorů = vyšší valuace</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-4">Rizika a výzvy</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Vyšší náklady (TER 0.2-0.7%)</li>
                  <li>• Omezená diverzifikace</li>
                  <li>• "Greenwashing" - falešné ESG</li>
                  <li>• Subjektivní hodnocení kritérií</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">📊 Historická data (2015-2023)</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>MSCI World: +8.1% ročně</div>
                <div>MSCI World ESG: +8.0% ročně</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jak vybírat ESG ETF */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Jak vybrat správný ESG ETF</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">1. Definujte své priority</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Environmentální</h4>
                    <p>Klimatická změna, obnovitelné zdroje</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Sociální</h4>
                    <p>Lidská práva, pracovní podmínky</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Governance</h4>
                    <p>Transparentnost, etika</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">2. Zkontrolujte metodiku</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Jaké společnosti jsou vyloučené?</li>
                  <li>• Kdo poskytuje ESG skóre? (MSCI, Sustainalytics, FTSE Russell)</li>
                  <li>• Jak často se portfolio rebalancuje?</li>
                  <li>• Jsou data transparentní a ověřitelná?</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">3. Porovnejte náklady a výkonnost</h3>
                <ul className="space-y-2 text-sm">
                  <li>• TER by neměl být vyšší než 0.5%</li>
                  <li>• Porovnejte tracking error s benchmarkem</li>
                  <li>• Zkontrolujte velikost fondu (minimálně 100M €)</li>
                  <li>• Sledujte dlouhodobou výkonnost vs. tradiční ETF</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upozornění */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Pozor na "Greenwashing"</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Některé fondy používají ESG jako marketingový nástroj, aniž by skutečně aplikovaly přísné udržitelné kritéria. 
                  Vždy si prostudujte prospekt fondu a seznam držených akcií. Skutečně ESG orientované fondy obvykle vyloučí 
                  10-30% společností z původního indexu.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA sekce */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Chcete investovat udržitelně?</h2>
            <p className="text-gray-600 mb-6">
              Prohlédněte si naši databázi ESG ETF fondů a najděte ty, které odpovídají vašim hodnotám.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/srovnani-etf?category=ESG">
                  Prohlédnout ESG ETF
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Link to="/tipy/nejlepsi-etf-2025">
                  Nejlepší ETF 2025
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Social Sharing */}
        <SocialSharing 
          url="https://etfpruvodce.cz/tipy/esg-udrzitelne-etf"
          title="ESG a udržitelné ETF - Investování s ohledem na životní prostředí"
          description="Investování s ohledem na životní prostředí a společenskou odpovědnost. Přehled nejlepších ESG ETF a jak vybírat udržitelné investice."
          className="mt-8"
        />
      </div>
    </Layout>
  );
};

export default ESGUdrzitelneETF;