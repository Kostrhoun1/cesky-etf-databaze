import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, DollarSign, Cloud, Building, BarChart3, Star, ArrowRight, AlertTriangle, PieChart, Target, Umbrella, TrendingDown } from 'lucide-react';
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

const ALL_WEATHER_ETF_RECOMMENDATIONS = [
  {
    name: "iShares Core Euro Government Bond UCITS ETF",
    ticker: "IEAG",
    isin: "IE00B4WXJJ64",
    ter: "0.09%",
    size: "7.8B €",
    category: "Dlouhodobé dluhopisy",
    allocation: "40%",
    type: "Government Bonds",
    rating: 5,
    purpose: "Stabilita a ochrana kapitálu",
    reason: "Dlouhodobé vládní dluhopisy eurozóny jako základ dluhopisové části portfolia.",
    pros: ["Nízké poplatky", "Vysoká likvidita", "EUR denominace", "Government grade"],
    cons: ["Úrokové riziko", "Nízké výnosy", "Inflační eroze"],
    weatherScenarios: ["Pokles ekonomiky ✓", "Klesající inflace ✓"]
  },
  {
    name: "iShares MSCI World UCITS ETF",
    ticker: "IWDA", 
    isin: "IE00B4L5Y983",
    ter: "0.20%",
    size: "61.2B €",
    category: "Globální akcie",
    allocation: "30%",
    type: "Global Equities",
    rating: 5,
    purpose: "Růst a inflační ochrana",
    reason: "Široký globální akciový trh jako růstová složka portfolia.",
    pros: ["Globální diverzifikace", "Kvalitní firmy", "Dlouhodobý růst", "Největší likvidita"],
    cons: ["Vysoká volatilita", "Cyklická povaha", "USA koncentrace"],
    weatherScenarios: ["Růst ekonomiky ✓", "Rostoucí inflace ✓"]
  },
  {
    name: "Xtrackers II iBoxx Sovereigns Eurozone 1-3 UCITS ETF",
    ticker: "X13E",
    isin: "LU0290355717", 
    ter: "0.15%",
    size: "1.4B €",
    category: "Krátkodobé dluhopisy",
    allocation: "15%",
    type: "Short-Term Bonds",
    rating: 4,
    purpose: "Likvidita a stabilita",
    reason: "Krátkodobé vládní dluhopisy pro stabilitu a nižší citlivost na úroky.",
    pros: ["Nízká durace", "Stabilní hodnota", "EUR denominace", "Rychlá likvidita"],
    cons: ["Velmi nízké výnosy", "Inflační riziko", "Omezený růst"],
    weatherScenarios: ["Všechna prostředí (stabilizátor)"]
  },
  {
    name: "iShares Diversified Commodity Swap UCITS ETF",
    ticker: "ICOM",
    isin: "IE00BDFL4P12",
    ter: "0.19%", 
    size: "1.1B €",
    category: "Komodity",
    allocation: "7.5%",
    type: "Commodities",
    rating: 4,
    purpose: "Inflační ochrana",
    reason: "Široký koš komodit pro ochranu před inflací a diverzifikaci.",
    pros: ["Inflační hedge", "Široká komoditní expozice", "Uncorrelated returns", "Crisis protection"],
    cons: ["Vysoká volatilita", "Komplexní struktura", "Contango risk"],
    weatherScenarios: ["Rostoucí inflace ✓", "Geopolitické krize ✓"]
  },
  {
    name: "Xtrackers Physical Gold ETC",
    ticker: "4GLD",
    isin: "DE000A1E0HR8",
    ter: "0.19%",
    size: "3.2B €", 
    category: "Zlato",
    allocation: "7.5%",
    type: "Precious Metals",
    rating: 4,
    purpose: "Krize a inflace",
    reason: "Fyzické zlato jako tradiční ochrana před inflací a krizemi.",
    pros: ["Krizový hedge", "Fyzické zlato", "Tisíce let historie", "Měnová ochrana"],
    cons: ["Žádné dividendy", "Volatilita", "Storage costs", "No productive asset"],
    weatherScenarios: ["Krize ✓", "Měnová devalvace ✓", "Geopolitické napětí ✓"]
  }
];

// Filtry pro různé složky All-Weather portfolia
const BONDS_ETF_FILTER = {
  top: 8,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  category: "Dluhopisy",
};

const COMMODITIES_ETF_FILTER = {
  top: 6,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  nameKeywords: ["Gold", "Commodity", "Commodities", "Zlato", "Physical", "Energy"],
};

const GLOBAL_STOCKS_FILTER = {
  top: 8,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  indexNameKeywords: ["msci world", "ftse all-world"],
};

const AllWeatherPortfolio: React.FC = () => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Government Bonds': 'bg-blue-100 text-blue-800',
      'Global Equities': 'bg-green-100 text-green-800', 
      'Short-Term Bonds': 'bg-indigo-100 text-indigo-800',
      'Commodities': 'bg-orange-100 text-orange-800',
      'Precious Metals': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getWeatherIcon = (scenarios: string) => {
    if (scenarios.includes('Růst ekonomiky')) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (scenarios.includes('Pokles ekonomiky')) return <TrendingDown className="w-4 h-4 text-red-600" />;
    if (scenarios.includes('Krize')) return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    return <Shield className="w-4 h-4 text-blue-600" />;
  };

  return (
    <BlogArticleLayout
      title="All-Weather Portfolio podle Raya Dalia"
      perex="Objevte investiční strategii, která má fungovat za každého ekonomického počasí. Kompletní průvodce All-Weather portfoliem od zakladatele Bridgewater Associates s praktickými ETF doporučeními."
      seoDescription="All-Weather Portfolio Ray Dalio – jak sestavit diverzifikované portfolio pomocí ETF. Alokace aktiv, konkrétní fondy a strategie pro každé ekonomické prostředí."
      readTime="15 min"
      difficulty="Pokročilý"
      category="Strategické"
    >
      {/* Úvod */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          All-Weather Portfolio je legendární investiční strategie Raya Dalia, navržená tak, aby fungovala 
          ve všech ekonomických podmínkách. Kombinuje akcie, dluhopisy, komodity a zlato v promyšlených poměrech.
        </p>
      </div>

      {/* Co je All-Weather */}
      <Card className="mb-8 bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">🌦️ Co je All-Weather Portfolio?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-slate-800">Ekonomická prostředí:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Růst ekonomiky → akcie prosperují</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Pokles ekonomiky → dluhopisy chrání</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Rostoucí inflace → komodity a zlato</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Klesající inflace → dluhopisy a akcie</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-slate-800">Ray Dalio principy:</h3>
              <ul className="space-y-2 text-sm">
                <li>🎯 <strong>Risk Parity:</strong> Vyrovnané rizikové příspěvky</li>
                <li>📊 <strong>Diversifikace:</strong> Napříč ekonomickými cykly</li>
                <li>⚖️ <strong>Balance:</strong> Nevyrovnaná alokace = vyrovnané riziko</li>
                <li>🛡️ <strong>Ochrana:</strong> Před neočekávanými šoky</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alokace */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">📊 Klasická All-Weather alokace</h2>
      
      <Card className="mb-12 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <PieChart className="w-16 h-16 mx-auto text-violet-600 mb-4" />
            <h3 className="text-2xl font-bold text-violet-900">Ray Dalio Formula</h3>
            <p className="text-violet-700">Risk Parity Portfolio Allocation</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-blue-600">40%</div>
              <div className="text-sm text-gray-600 mt-1">Dlouhodobé</div>
              <div className="font-semibold">Dluhopisy</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-green-600">30%</div>
              <div className="text-sm text-gray-600 mt-1">Globální</div>
              <div className="font-semibold">Akcie</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-indigo-600">15%</div>
              <div className="text-sm text-gray-600 mt-1">Krátkodobé</div>
              <div className="font-semibold">Dluhopisy</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-orange-600">7.5%</div>
              <div className="text-sm text-gray-600 mt-1">Široké</div>
              <div className="font-semibold">Komodity</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-yellow-600">7.5%</div>
              <div className="text-sm text-gray-600 mt-1">Fyzické</div>
              <div className="font-semibold">Zlato</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Praktická implementace */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">🛠️ Praktická implementace pomocí ETF</h2>
      
      <div className="space-y-6 mb-12">
        {ALL_WEATHER_ETF_RECOMMENDATIONS.map((etf) => (
          <Card key={etf.isin} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getCategoryColor(etf.type)}>
                      {etf.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getRatingStars(etf.rating)}
                    </div>
                    <Badge variant="outline" className="text-lg font-bold text-violet-600">
                      {etf.allocation}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{etf.name}</h3>
                  <div className="text-lg font-semibold text-slate-600 mb-2">{etf.ticker} • {etf.isin}</div>
                  
                  <p className="text-gray-700 mb-3">{etf.reason}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">{etf.purpose}</span>
                  </div>
                </div>
                
                <div className="lg:ml-6 mt-4 lg:mt-0">
                  <Link to={`/etf/${etf.isin}`} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-slate-600 hover:bg-slate-700">
                      Detail fondu
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">TER</span>
                  <div className="font-semibold">{etf.ter}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Velikost</span>
                  <div className="font-semibold">{etf.size}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Alokace</span>
                  <div className="font-semibold text-violet-600">{etf.allocation}</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ Výhody:</h4>
                  <ul className="text-sm space-y-1">
                    {etf.pros.map((pro, idx) => (
                      <li key={idx}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">⚠️ Nevýhody:</h4>
                  <ul className="text-sm space-y-1">
                    {etf.cons.map((con, idx) => (
                      <li key={idx}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-slate-600" />
                  Ekonomická prostředí:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {etf.weatherScenarios.map((scenario, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs flex items-center gap-1">
                      {getWeatherIcon(scenario)}
                      {scenario}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Proč to funguje */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-900">🎯 Proč nevyrovnaná alokace funguje?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Risk Parity</h3>
                  <p className="text-sm text-gray-700">Dluhopisy mají nižší volatilitu, proto vyšší alokace vyrovnává riziko</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Ochrana před inflací</h3>
                  <p className="text-sm text-gray-700">Komodity a zlato chrání před znehodnocením měny</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Umbrella className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Diverzifikace napříč cykly</h3>
                  <p className="text-sm text-gray-700">Komponenty prosperují v různých ekonomických fázích</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Minimalizace korelace</h3>
                  <p className="text-sm text-gray-700">Aktiva reagují odlišně na stejné ekonomické události</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ETF tabulky */}
      <div className="space-y-12 mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">📈 Dostupné globální akciové ETF</h2>
          <p className="mb-6 text-gray-700">
            Akciová část portfolia (30%) by měla být široce diverzifikovaná. Zde najdete nejlepší globální akciové ETF:
          </p>
          <FilteredETFList filter={GLOBAL_STOCKS_FILTER} />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">🏛️ Dostupné dluhopisové ETF</h2>
          <p className="mb-6 text-gray-700">
            Dluhopisová část tvoří většinu portfolia (55%), proto je důležitý výběr kvalitních government bondů:
          </p>
          <FilteredETFList filter={BONDS_ETF_FILTER} />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">🥇 Komodity a zlato</h2>
          <p className="mb-6 text-gray-700">
            Komoditní část (15%) chrání portfolio před inflací a měnovou devalvací:
          </p>
          <FilteredETFList filter={COMMODITIES_ETF_FILTER} />
        </div>
      </div>

      {/* Upozornění */}
      <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Důležité upozornění</h3>
              <p className="text-sm text-gray-700">
                All-Weather portfolio není zárukou zisku. Je navrženo pro stabilitu, ne maximální výnosy. 
                V bull trzích může zaostávat za čistě akciovými portfolii.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jak postavit */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">📋 Jak postavit All-Weather portfolio</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Určete celkovou částku</strong> pro All-Weather strategii</li>
            <li><strong>Spočítejte alokace</strong> podle doporučených procent</li>
            <li><strong>Ověřte dostupnost</strong> u vašeho brokera (DEGIRO, XTB, Trading212)</li>
            <li><strong>Postupně nakupte</strong> jednotlivá ETF během několika měsíců (DCA)</li>
            <li><strong>Nastavte rebalancing</strong> každých 6-12 měsíců</li>
            <li><strong>Zvažte pravidelné</strong> měsíční investování pro budování pozic</li>
          </ol>
        </CardContent>
      </Card>

      {/* FAQ */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">❓ Časté otázky</h2>
      
      <div className="space-y-4 mb-12">
        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-slate-600">
            Jaký je očekávaný výnos All-Weather portfolia?
          </summary>
          <div className="mt-3 text-gray-700">
            Historicky dosahuje All-Weather portfolio průměrného ročního výnosu 7-9% s nižší volatilitou 
            než tradiční akciové portfolio. Důraz je na stabilitu, ne maximální výnos.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-slate-600">
            Musím dodržet přesně tuto alokaci?
          </summary>
          <div className="mt-3 text-gray-700">
            Můžete si strategii přizpůsobit - mladší investoři často zvyšují podíl akcií, 
            starší naopak dluhopisů. Klíčové je zachovat diverzifikaci napříč třídami aktiv.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-slate-600">
            Jak často rebalancovat All-Weather portfolio?
          </summary>
          <div className="mt-3 text-gray-700">
            Doporučuje se rebalancing každých 6-12 měsíců nebo když se alokace vychýlí o více než 5% 
            od cílových hodnot. Příliš časté rebalancování zvyšuje transakční náklady.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-slate-600">
            Je All-Weather portfolio vhodné pro začátečníky?
          </summary>
          <div className="mt-3 text-gray-700">
            Ano, je to vynikající strategie pro začátečníky díky své jednoduchosti a důrazu na diverzifikaci. 
            Vyžaduje méně aktivního řízení než jiné strategie.
          </div>
        </details>
      </div>

      {/* Závěr */}
      <Card className="bg-gradient-to-r from-slate-500 to-gray-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🌦️ All-Weather - time-tested strategie</h2>
          <p className="mb-6 opacity-90">
            All-Weather Portfolio představuje ověřený přístup k dlouhodobému investování s důrazem 
            na stabilitu a diverzifikaci napříč všemi ekonomickými prostředími.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/srovnani-etf">
              <Button variant="secondary" className="bg-white text-slate-600 hover:bg-gray-100">
                Prozkoumat ETF
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/tipy/nejlepsi-etf-2025" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-600">
                Nejlepší ETF 2025
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default AllWeatherPortfolio;