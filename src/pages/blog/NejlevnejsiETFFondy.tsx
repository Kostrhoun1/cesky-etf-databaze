import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingDown, Calculator, Award, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import SocialSharing from '@/components/SocialSharing';

const NejlevnejsiETFFondy: React.FC = () => {
  const cheapestETFs = [
    {
      name: "iShares Core S&P 500 UCITS ETF",
      ticker: "CSPX",
      isin: "IE00B5BMR087",
      ter: "0.07%",
      size: "74.8B €",
      tracking: "MSCI World",
      description: "Nejlevnější způsob investice do amerického akciového trhu",
      savingsOn100k: "120€/rok vs aktivní fond (1.3%)",
      category: "USA akcie"
    },
    {
      name: "Vanguard FTSE Developed World UCITS ETF",
      ticker: "VEVE",
      isin: "IE00BK5BQV03",
      ter: "0.12%",
      size: "8.2B €",
      tracking: "FTSE Developed",
      description: "Nejlevnější globální ETF od Vanguard",
      savingsOn100k: "110€/rok vs aktivní fond",
      category: "Globální akcie"
    },
    {
      name: "iShares Core MSCI World UCITS ETF",
      ticker: "IWDA",
      isin: "IE00B4L5Y983",
      ter: "0.20%",
      size: "63.2B €",
      tracking: "MSCI World",
      description: "Nejpopulárnější globální ETF s nízkými náklady",
      savingsOn100k: "100€/rok vs aktivní fond",
      category: "Globální akcie"
    },
    {
      name: "Xtrackers MSCI World UCITS ETF",
      ticker: "XWKS",
      isin: "IE00BJ0KDQ92",
      ter: "0.19%",
      size: "4.1B €",
      tracking: "MSCI World",
      description: "Konkurenční alternativa s velmi nízkými náklady",
      savingsOn100k: "101€/rok vs aktivní fond",
      category: "Globální akcie"
    },
    {
      name: "iShares Core EURO STOXX 50 UCITS ETF",
      ticker: "SXR8",
      isin: "IE00B4L5YX21",
      ter: "0.10%",
      size: "7.8B €",
      tracking: "EURO STOXX 50",
      description: "Nejlevnější ETF na evropské blue chips",
      savingsOn100k: "115€/rok vs aktivní fond",
      category: "Evropa"
    },
    {
      name: "Vanguard S&P 500 UCITS ETF",
      ticker: "VUAA",
      isin: "IE00B3XXRP09",
      ter: "0.07%",
      size: "38.5B €",
      tracking: "S&P 500",
      description: "Druhá nejlevnější volba pro S&P 500",
      savingsOn100k: "120€/rok vs aktivní fond",
      category: "USA akcie"
    }
  ];

  const costComparison = [
    {
      investment: "50.000 €",
      lowCostETF: "70€ ročně (0.14% TER)",
      activeFund: "650€ ročně (1.3% TER)",
      savings: "580€ ročně",
      savingsOver20Years: "17.400€"
    },
    {
      investment: "100.000 €",
      lowCostETF: "140€ ročně (0.14% TER)",
      activeFund: "1.300€ ročně (1.3% TER)",
      savings: "1.160€ ročně",
      savingsOver20Years: "34.800€"
    },
    {
      investment: "500.000 €",
      lowCostETF: "700€ ročně (0.14% TER)",
      activeFund: "6.500€ ročně (1.3% TER)",
      savings: "5.800€ ročně",
      savingsOver20Years: "174.000€"
    }
  ];

  const hiddenCosts = [
    {
      type: "Tracking Error",
      description: "Rozdíl mezi výnosem ETF a indexu",
      typical: "0.05-0.20% ročně",
      howToCheck: "Porovnejte skutečný výnos s benchmarkem"
    },
    {
      type: "Bid-Ask Spread",
      description: "Rozdíl mezi nákupní a prodejní cenou",
      typical: "0.01-0.10%",
      howToCheck: "Sledujte spread u brokera před nákupem"
    },
    {
      type: "Premium/Discount",
      description: "ETF může obchodovat nad/pod NAV",
      typical: "±0.05%",
      howToCheck: "Porovnejte tržní cenu s NAV"
    },
    {
      type: "Měnové hedging",
      description: "Náklady na zajištění měnového rizika",
      typical: "0.20-0.50% extra",
      howToCheck: "Hedged ETF mají vyšší TER"
    }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nejlevnější ETF fondy - Fondy s nejnižšími poplatky 2025",
    "description": "Fondy s nejnižšími poplatky TER na trhu. Analýza nákladů, skrytých poplatků a jejich vliv na dlouhodobé výnosy. Tipy jak minimalizovat náklady investování.",
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
    "mainEntityOfPage": "https://etfpruvodce.cz/tipy/nejlevnejsi-etf-fondy",
    "image": "https://etfpruvodce.cz/og-low-cost-etf.jpg",
    "articleSection": "Optimalizace",
    "keywords": "nejlevnější ETF, nízké poplatky TER, náklady investování, levné ETF fondy, optimalizace nákladů"
  };

  return (
    <Layout>
      <SEOHead
        title="Nejlevnější ETF fondy - Fondy s nejnižšími poplatky TER 2025 | ETF průvodce.cz"
        description="Fondy s nejnižšími poplatky TER na trhu. Analýza nákladů, skrytých poplatků a jejich vliv na dlouhodobé výnosy. Tipy jak minimalizovat náklady investování."
        canonical="https://etfpruvodce.cz/tipy/nejlevnejsi-etf-fondy"
        keywords="nejlevnější ETF, nízké poplatky TER, náklady investování, levné ETF fondy, optimalizace nákladů, low cost ETF"
        ogImage="https://etfpruvodce.cz/og-low-cost-etf.jpg"
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
            <Badge className="bg-teal-100 text-teal-800">Optimalizace</Badge>
            <Badge className="bg-green-100 text-green-800">Začátečník</Badge>
            <span className="text-gray-500 text-sm">8 min čtení</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Nejlevnější ETF fondy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Fondy s nejnižšími poplatky TER na trhu. Analýza nákladů, skrytých poplatků a jejich vliv na dlouhodobé výnosy. Tipy jak minimalizovat náklady investování.
          </p>
        </div>

        {/* Proč jsou náklady důležité */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Proč se zaměřit na náklady?</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Poplatky jsou jediná jistá věc u investování. Zatímco výnosy nelze garantovat, náklady si fondy účtují každý rok bez ohledu na výkonnost. I zdánlivě malý rozdíl v poplatcích má obrovský dopad na dlouhodobé výnosy.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                <h3 className="font-semibold mb-2 text-red-900">Dopad poplatků na 20 let</h3>
                <p className="text-red-800 text-sm">
                  Investice 100.000€, roční výnos 7%:<br/>
                  • ETF s TER 0.1%: <strong>367.629€</strong><br/>
                  • Aktivní fond s TER 1.5%: <strong>320.714€</strong><br/>
                  • Rozdíl: <strong>46.915€</strong> méně kvůli vyšším poplatkům!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nejlevnější ETF */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">TOP nejlevnější ETF fondy 2025</h2>
            </div>
            <div className="space-y-4">
              {cheapestETFs.map((etf, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{etf.ticker}</h3>
                        <Badge variant="outline" className="text-xs">{etf.category}</Badge>
                        <Badge variant="secondary" className="text-xs font-bold text-green-700 bg-green-100">
                          TER {etf.ter}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{etf.name}</p>
                      <p className="text-gray-500 text-sm">{etf.description}</p>
                    </div>
                    <div className="text-right mt-4 lg:mt-0 lg:ml-4">
                      <div className="text-sm text-gray-500">Velikost fondu</div>
                      <div className="font-semibold">{etf.size}</div>
                      <div className="text-xs text-green-600 mt-1">
                        Úspora: {etf.savingsOn100k}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">ISIN: {etf.isin}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Srovnání nákladů */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Dopad nákladů na různé investice</h2>
            </div>
            <div className="space-y-4">
              {costComparison.map((comparison, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="font-semibold text-lg text-violet-600 mb-1">
                        {comparison.investment}
                      </div>
                      <div className="text-xs text-gray-500">Investice</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-600 mb-1">
                        {comparison.lowCostETF}
                      </div>
                      <div className="text-xs text-gray-500">Levný ETF</div>
                    </div>
                    <div>
                      <div className="font-semibold text-red-600 mb-1">
                        {comparison.activeFund}
                      </div>
                      <div className="text-xs text-gray-500">Aktivní fond</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600 mb-1">
                        {comparison.savingsOver20Years}
                      </div>
                      <div className="text-xs text-gray-500">Úspora za 20 let</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Klíčové pozorování</h4>
              <p className="text-blue-700 text-sm">
                Každé procento poplatku navíc vás stojí zhruba 20% výsledné investice za 20 let při 7% ročním výnosu.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Skryté náklady */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Skryté náklady ETF</h2>
            </div>
            <div className="space-y-4">
              {hiddenCosts.map((cost, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{cost.type}</h3>
                    <Badge variant="outline">{cost.typical}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{cost.description}</p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Jak kontrolovat:</strong> {cost.howToCheck}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tipy pro minimalizaci nákladů */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-8 h-8 text-violet-600" />
              <h2 className="text-2xl font-bold">Jak minimalizovat náklady</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 text-green-700">Co dělat ✅</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Vybírejte ETF s TER pod 0.25%</li>
                  <li>• Preferujte větší fondy (likvidnější)</li>
                  <li>• Investujte pravidelně (DCA)</li>
                  <li>• Minimalizujte počet transakcí</li>
                  <li>• Používejte brokery s nízkými poplatky</li>
                  <li>• Držte dlouhodobě (>3 roky)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-red-700">Čemu se vyhnout ❌</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Aktivně řízené ETF (vyšší TER)</li>
                  <li>• Časté rebalancování</li>
                  <li>• Malé, nové fondy</li>
                  <li>• Hedged ETF (bez nutnosti)</li>
                  <li>• Brokeři s vysokými poplatky</li>
                  <li>• Spekulativní trading</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doporučení podle kategorie */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Nejlevnější volby podle kategorie</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🌍 Globální akcie</h3>
                <p className="text-sm">VEVE (0.12%), IWDA (0.20%), VWCE (0.22%)</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🇺🇸 USA akcie</h3>
                <p className="text-sm">CSPX (0.07%), VUAA (0.07%), SWDA (0.20%)</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🇪🇺 Evropa</h3>
                <p className="text-sm">SXR8 (0.10%), XESX (0.12%), VMID (0.12%)</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🏛️ Dluhopisy</h3>
                <p className="text-sm">AGGG (0.10%), IEAG (0.12%), XGLE (0.15%)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA sekce */}
        <Card className="mb-8 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Spočítejte si dopad poplatků</h2>
            <p className="text-gray-600 mb-6">
              Použijte naši kalkulačku k výpočtu dopadu různých poplatků na vaše dlouhodobé výnosy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-violet-600 hover:bg-violet-700">
                <Link to="/kalkulacky/kalkulacka-poplatku-etf">
                  Kalkulačka poplatků
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
                <Link to="/srovnani-etf">
                  Srovnat ETF fondy
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Social Sharing */}
        <SocialSharing 
          url="https://etfpruvodce.cz/tipy/nejlevnejsi-etf-fondy"
          title="Nejlevnější ETF fondy - Fondy s nejnižšími poplatky 2025"
          description="Fondy s nejnižšími poplatky TER na trhu. Analýza nákladů, skrytých poplatků a jejich vliv na dlouhodobé výnosy."
          className="mt-8"
        />
      </div>
    </Layout>
  );
};

export default NejlevnejsiETFFondy;