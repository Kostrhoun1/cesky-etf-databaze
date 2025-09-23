import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, DollarSign, Cloud, Building, BarChart3, Star, ArrowRight, AlertTriangle, PieChart, Target, Umbrella, TrendingDown, Zap, Globe } from 'lucide-react';
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
    isin: "IE00B4ND3602",
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
  minFundSize: 1, // Vyloučí ETF bez údaje o velikosti fondu
};

const COMMODITIES_ETF_FILTER = {
  top: 6,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  nameKeywords: ["Gold", "Commodity", "Commodities", "Zlato", "Physical", "Energy"],
  minFundSize: 1, // Vyloučí ETF bez údaje o velikosti fondu
};

const GLOBAL_STOCKS_FILTER = {
  top: 8,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  indexNameKeywords: ["msci world", "ftse all-world"],
  minFundSize: 1, // Vyloučí ETF bez údaje o velikosti fondu
};

const AllWeatherPortfolio: React.FC = () => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Government Bonds': 'bg-blue-50 text-blue-700 border-blue-200',
      'Global Equities': 'bg-emerald-50 text-emerald-700 border-emerald-200', 
      'Short-Term Bonds': 'bg-teal-50 text-teal-700 border-teal-200',
      'Commodities': 'bg-orange-50 text-orange-700 border-orange-200',
      'Precious Metals': 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
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
      <Card className="mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-8 h-8 text-emerald-600" />
            <h2 className="text-2xl font-bold text-emerald-900">Co je All-Weather Portfolio?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-emerald-800 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Ekonomická prostředí:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Růst ekonomiky → akcie prosperují</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium">Pokles ekonomiky → dluhopisy chrání</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg">
                  <ArrowRight className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Rostoucí inflace → komodity a zlato</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Klesající inflace → dluhopisy a akcie</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-emerald-800 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Ray Dalio principy:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 bg-white/60 rounded-lg">
                  <Target className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Risk Parity</div>
                    <div className="text-xs text-gray-600">Vyrovnané rizikové příspěvky</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-white/60 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Diverzifikace</div>
                    <div className="text-xs text-gray-600">Napříč ekonomickými cykly</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-white/60 rounded-lg">
                  <Shield className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Ochrana</div>
                    <div className="text-xs text-gray-600">Před neočekávanými šoky</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alokace */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">📊 Klasická All-Weather alokace</h2>
      
      <Card className="mb-8 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <PieChart className="w-12 h-12 mx-auto text-teal-600 mb-3" />
            <h3 className="text-xl font-bold text-teal-900">Ray Dalio Formula</h3>
            <p className="text-teal-700 text-sm">Risk Parity Portfolio Allocation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="text-center p-4 bg-white/80 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-blue-600 mb-1">40%</div>
              <div className="text-xs text-gray-600 mb-1">Dlouhodobé</div>
              <div className="font-semibold text-sm">Dluhopisy</div>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-lg border border-emerald-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-emerald-600 mb-1">30%</div>
              <div className="text-xs text-gray-600 mb-1">Globální</div>
              <div className="font-semibold text-sm">Akcie</div>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-lg border border-teal-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-teal-600 mb-1">15%</div>
              <div className="text-xs text-gray-600 mb-1">Krátkodobé</div>
              <div className="font-semibold text-sm">Dluhopisy</div>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-orange-600 mb-1">7.5%</div>
              <div className="text-xs text-gray-600 mb-1">Široké</div>
              <div className="font-semibold text-sm">Komodity</div>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-yellow-600 mb-1">7.5%</div>
              <div className="text-xs text-gray-600 mb-1">Fyzické</div>
              <div className="font-semibold text-sm">Zlato</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Praktická implementace */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">🛠️ Praktická implementace pomocí ETF</h2>
      
      <div className="space-y-4 mb-8">
        {ALL_WEATHER_ETF_RECOMMENDATIONS.map((etf) => (
          <Card key={etf.isin} className="overflow-hidden hover:shadow-md transition-all duration-200">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`text-xs border ${getCategoryColor(etf.type)}`}>
                      {etf.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getRatingStars(etf.rating)}
                    </div>
                    <Badge variant="outline" className="text-sm font-bold text-teal-600 border-teal-300">
                      {etf.allocation}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{etf.name}</h3>
                  <div className="text-base font-semibold text-emerald-600 mb-2">{etf.ticker} • {etf.isin}</div>
                  
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{etf.reason}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-medium text-teal-700">{etf.purpose}</span>
                  </div>
                </div>
                
                <div className="lg:ml-4 mt-3 lg:mt-0">
                  <Link to={`/etf/${etf.isin}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Detail fondu
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-600">TER</div>
                  <div className="font-semibold text-sm">{etf.ter}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-600">Velikost</div>
                  <div className="font-semibold text-sm">{etf.size}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-xs text-gray-600">Alokace</div>
                  <div className="font-semibold text-sm text-teal-600">{etf.allocation}</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2 text-sm flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Výhody:
                  </h4>
                  <ul className="text-xs space-y-1">
                    {etf.pros.slice(0, 3).map((pro, idx) => (
                      <li key={idx} className="text-gray-700">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2 text-sm flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Nevýhody:
                  </h4>
                  <ul className="text-xs space-y-1">
                    {etf.cons.slice(0, 3).map((con, idx) => (
                      <li key={idx} className="text-gray-700">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-teal-600" />
                  Ekonomická prostředí:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {etf.weatherScenarios.map((scenario, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs flex items-center gap-1 bg-teal-50 text-teal-700">
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
      <Card className="mb-8 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-7 h-7 text-emerald-600" />
            <h2 className="text-xl font-bold text-emerald-900">Proč nevyrovnaná alokace funguje?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <BarChart3 className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 text-sm">Risk Parity</h3>
                  <p className="text-xs text-gray-700">Dluhopisy mají nižší volatilitu, proto vyšší alokace vyrovnává riziko</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 text-sm">Ochrana před inflací</h3>
                  <p className="text-xs text-gray-700">Komodity a zlato chrání před znehodnocením měny</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <Umbrella className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 text-sm">Diverzifikace napříč cykly</h3>
                  <p className="text-xs text-gray-700">Komponenty prosperují v různých ekonomických fázích</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 text-sm">Minimalizace korelace</h3>
                  <p className="text-xs text-gray-700">Aktiva reagují odlišně na stejné ekonomické události</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ETF tabulky */}
      <div className="space-y-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">📈 Dostupné globální akciové ETF</h2>
          <p className="mb-4 text-gray-700 text-sm">
            Akciová část portfolia (30%) by měla být široce diverzifikovaná. Zde najdete nejlepší globální akciové ETF:
          </p>
          <FilteredETFList filter={GLOBAL_STOCKS_FILTER} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">🏛️ Dostupné dluhopisové ETF</h2>
          <p className="mb-4 text-gray-700 text-sm">
            Dluhopisová část tvoří většinu portfolia (55%), proto je důležitý výběr kvalitních government bondů:
          </p>
          <FilteredETFList filter={BONDS_ETF_FILTER} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">🥇 Komodity a zlato</h2>
          <p className="mb-4 text-gray-700 text-sm">
            Komoditní část (15%) chrání portfolio před inflací a měnovou devalvací:
          </p>
          <FilteredETFList filter={COMMODITIES_ETF_FILTER} />
        </div>
      </div>

      {/* Upozornění */}
      <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Důležité upozornění</h3>
              <p className="text-xs text-gray-700">
                All-Weather portfolio není zárukou zisku. Je navrženo pro stabilitu, ne maximální výnosy. 
                V bull trzích může zaostávat za čistě akciovými portfolii.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jak postavit */}
      <Card className="mb-6 bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-6 h-6 text-teal-600" />
            <h2 className="text-xl font-bold text-teal-900">Jak postavit All-Weather portfolio</h2>
          </div>
          <div className="grid gap-3">
            {[
              { icon: DollarSign, text: "Určete celkovou částku pro All-Weather strategii" },
              { icon: BarChart3, text: "Spočítejte alokace podle doporučených procent" },
              { icon: Shield, text: "Ověřte dostupnost u vašeho brokera (DEGIRO, XTB, Trading212)" },
              { icon: TrendingUp, text: "Postupně nakupte jednotlivá ETF během několika měsíců (DCA)" },
              { icon: Target, text: "Nastavte rebalancing každých 6-12 měsíců" },
              { icon: Umbrella, text: "Zvažte pravidelné měsíční investování pro budování pozic" }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>
                <step.icon className="w-4 h-4 text-teal-600 mt-0.5" />
                <span className="text-sm text-gray-700">{step.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">❓ Časté otázky</h2>
      
      <div className="space-y-3 mb-8">
        <details className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-teal-200 transition-colors">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-teal-600 text-sm">
            Jaký je očekávaný výnos All-Weather portfolia?
          </summary>
          <div className="mt-2 text-xs text-gray-700 pl-4 border-l-2 border-teal-100">
            Historicky dosahuje All-Weather portfolio průměrného ročního výnosu 7-9% s nižší volatilitou 
            než tradiční akciové portfolio. Důraz je na stabilitu, ne maximální výnos.
          </div>
        </details>

        <details className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-teal-200 transition-colors">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-teal-600 text-sm">
            Musím dodržet přesně tuto alokaci?
          </summary>
          <div className="mt-2 text-xs text-gray-700 pl-4 border-l-2 border-teal-100">
            Můžete si strategii přizpůsobit - mladší investoři často zvyšují podíl akcií, 
            starší naopak dluhopisů. Klíčové je zachovat diverzifikaci napříč třídami aktiv.
          </div>
        </details>

        <details className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-teal-200 transition-colors">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-teal-600 text-sm">
            Jak často rebalancovat All-Weather portfolio?
          </summary>
          <div className="mt-2 text-xs text-gray-700 pl-4 border-l-2 border-teal-100">
            Doporučuje se rebalancing každých 6-12 měsíců nebo když se alokace vychýlí o více než 5% 
            od cílových hodnot. Příliš časté rebalancování zvyšuje transakční náklady.
          </div>
        </details>

        <details className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-teal-200 transition-colors">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-teal-600 text-sm">
            Je All-Weather portfolio vhodné pro začátečníky?
          </summary>
          <div className="mt-2 text-xs text-gray-700 pl-4 border-l-2 border-teal-100">
            Ano, je to vynikající strategie pro začátečníky díky své jednoduchosti a důrazu na diverzifikaci. 
            Vyžaduje méně aktivního řízení než jiné strategie.
          </div>
        </details>
      </div>

      {/* Závěr */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-3">
            <Cloud className="w-10 h-10 text-white/90" />
          </div>
          <h2 className="text-xl font-bold mb-3">All-Weather - time-tested strategie</h2>
          <p className="mb-4 opacity-90 text-sm">
            All-Weather Portfolio představuje ověřený přístup k dlouhodobému investování s důrazem 
            na stabilitu a diverzifikaci napříč všemi ekonomickými prostředími.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/srovnani-etf">
              <Button size="sm" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
                Prozkoumat ETF
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
            <Link to="/tipy/nejlepsi-etf-2025" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
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