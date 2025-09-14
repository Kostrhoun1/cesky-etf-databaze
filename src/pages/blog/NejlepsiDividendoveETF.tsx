import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, DollarSign, Coins, PiggyBank, BarChart3, Star, ArrowRight, AlertTriangle, Calendar, Target, Banknote } from 'lucide-react';
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";
import { useETFArticleData } from "@/hooks/useETFArticleData";

const RECOMMENDED_DIVIDEND_ETFS_TEMPLATE = [
  {
    name: "SPDR S&P U.S. Dividend Aristocrats UCITS ETF",
    ticker: "UDVD",
    isin: "IE00B6YX5D40",
    companies: "65",
    dividendYield: "1.8%",
    frequency: "Kvartálně",
    region: "USA",
    reason: "Nejslavnější evropský ETF na dividendové aristokraty z USA. 25+ let nepřerušeného růstu dividend.",
    type: "Dividend Aristocrats",
    rating: 5,
    category: "dividend-aristocrats",
    pros: ["25+ let růstu dividend", "Kvalitní americké firmy", "Pravidelné kvartální výplaty", "Stabilní výkonnost"],
    cons: ["Vyšší TER", "Pouze USA", "Sektor bias", "Pomalý růst"],
    topHoldings: ["Walmart (6.8%)", "Johnson & Johnson (5.2%)", "Coca-Cola (4.9%)", "Procter & Gamble (4.1%)", "PepsiCo (3.8%)"]
  },
  {
    name: "Vanguard FTSE All-World High Dividend Yield UCITS ETF",
    ticker: "VHYL",
    isin: "IE00B8GKDB10",
    companies: "1,700+",
    dividendYield: "2.9%",
    frequency: "Kvartálně",
    region: "Globální",
    reason: "Oblíbené globální dividendové ETF s nízkým TER a širokou diverzifikací.",
    type: "High Dividend Yield",
    rating: 5,
    category: "global-dividend",
    pros: ["Globální diverzifikace", "Nízký TER", "Vanguard kvalita", "Vysoký dividend yield"],
    cons: ["Mladší fond", "Sektor koncentrace", "Emerging markets risk"],
    topHoldings: ["Taiwan Semiconductor (2.1%)", "ASML (1.8%)", "Samsung (1.6%)", "TSMC (1.4%)", "Nestlé (1.3%)"]
  },
  {
    name: "iShares STOXX Global Select Dividend 100 UCITS ETF",
    ticker: "TDIV",
    isin: "DE000A0F5UH1",
    companies: "100",
    dividendYield: "4.2%", 
    frequency: "Kvartálně",
    region: "Globální",
    reason: "Globální rozložení dividendově silných firem s nejvyšším výnosem.",
    type: "High Dividend",
    rating: 4,
    category: "high-dividend",
    pros: ["Nejvyšší dividend yield", "Globální expozice", "100 nejlepších", "Pravidelné výplaty"],
    cons: ["Vysoký TER", "Value bias", "Koncentrace do utilities", "Lower growth"],
    topHoldings: ["Suncorp Group (1.8%)", "Engie (1.6%)", "Orange (1.5%)", "Enagas (1.4%)", "Realty Income (1.3%)"]
  },
  {
    name: "iShares Euro Dividend UCITS ETF",
    ticker: "TDVY",
    isin: "IE00B0M62S72",
    companies: "30",
    dividendYield: "3.1%",
    frequency: "Pololetně",
    region: "Eurozóna",
    reason: "Pro investory hledající příjem v EUR. Nejlepší dividendové firmy eurozóny.",
    type: "Euro Dividend",
    rating: 4,
    category: "euro-dividend",
    pros: ["EUR měna", "Stabilní firmy", "Dlouhá historie", "Známé značky"],
    cons: ["Pouze 30 firem", "Nižší růst", "Sektor concentrace", "Regulatorní riziko"],
    topHoldings: ["ASML (8.9%)", "LVMH (8.1%)", "Nestlé (7.2%)", "Novartis (6.8%)", "SAP (5.9%)"]
  },
  {
    name: "Xtrackers Stoxx Global Select Dividend 100 Swap UCITS ETF",
    ticker: "XGSD",
    isin: "LU0292096186",
    companies: "100",
    dividendYield: "4.0%",
    frequency: "Čtvrtletně",
    region: "Globální",
    reason: "Efektivní swapová replikace s globální diverzifikací a tradicí dividend.",
    type: "Global Dividend",
    rating: 3,
    category: "swap-dividend",
    pros: ["Swap replikace", "Globální pokrytí", "Deutsche Bank", "Tax efficiency"],
    cons: ["Nejvyšší TER", "Swap risk", "Malá velikost", "Complex structure"],
    topHoldings: ["Identické s indexem", "100 nejvyšších dividend", "Globální diverzifikace", "Quarterly rebalancing"]
  }
];

// Filtr pro dividendové ETF
const DIVIDEND_ETF_TABLE_FILTER = {
  top: 12,
  sortBy: "current_dividend_yield_numeric" as const,
  sortOrder: "desc" as const,
  hasDividendYield: true,
};

const NejlepsiDividendoveETF: React.FC = () => {
  const { etfsWithData, isLoading } = useETFArticleData(RECOMMENDED_DIVIDEND_ETFS_TEMPLATE);
  const RECOMMENDED_DIVIDEND_ETFS = etfsWithData;
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'dividend-aristocrats': 'bg-green-100 text-green-800',
      'global-dividend': 'bg-blue-100 text-blue-800',
      'high-dividend': 'bg-orange-100 text-orange-800',
      'euro-dividend': 'bg-indigo-100 text-indigo-800',
      'swap-dividend': 'bg-purple-100 text-purple-800'
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

  const topETFs = RECOMMENDED_DIVIDEND_ETFS.filter(etf => etf.rating === 5);
  const otherETFs = RECOMMENDED_DIVIDEND_ETFS.filter(etf => etf.rating < 5);

  return (
    <BlogArticleLayout
      title="Nejlepší dividendové ETF"
      perex="Chcete pravidelný pasivní příjem? Objevte výběr nejlépe hodnocených dividendových ETF vhodných pro dlouhodobé investory, včetně konkrétních doporučení, kritérií výběru i často kladených otázek."
      seoDescription="Srovnání a doporučení nejlepších dividendových ETF. Výhody, poplatky, výnosy, způsob výběru, konkrétní fondy a rady pro investory na rok 2025."
      readTime="12 min"
      difficulty="Začátečník"
      category="Strategické"
    >
      {/* Úvod */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Dividendové ETF jsou ideální volbou pro investory, kteří hledají pravidelný pasivní příjem kombinovaný 
          s dlouhodobým růstem kapitálu. Zaměřují se na firmy s tradicí stabilních a rostoucích dividend.
        </p>
      </div>

      {/* Proč dividendové ETF */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-900">💰 Proč investovat do dividendových ETF?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-800">Pravidelný příjem:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Kvartální nebo měsíční výplaty</span>
                </li>
                <li className="flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Ideální pro rentiérské strategie</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Růst dividend v čase</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Nižší volatilita</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-green-800">Klíčové výhody:</h3>
              <ul className="space-y-2 text-sm">
                <li>🌍 <strong>Diverzifikace:</strong> Různé regiony a sektory</li>
                <li>🔄 <strong>Flexibilita:</strong> Reinvestice nebo výplata</li>
                <li>🛡️ <strong>Stabilita:</strong> Kvalitní zralé firmy</li>
                <li>💡 <strong>Inflace:</strong> Ochrana proti růstu cen</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOP 2 ETF showcase */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">🏆 TOP dividendové ETF fondy</h2>
      
      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {topETFs.map((etf, index) => (
          <Card key={etf.isin} className={`relative overflow-hidden ${
            index === 0 ? 'ring-2 ring-green-500 bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-white'
          }`}>
            {index === 0 && (
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm font-semibold">
                #1 DOPORUČENÍ
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className={getCategoryColor(etf.category)}>
                  {etf.type}
                </Badge>
                <div className="flex items-center gap-1">
                  {getRatingStars(etf.rating)}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{etf.name}</h3>
              <div className="text-2xl font-bold text-green-600 mb-1">{etf.ticker}</div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">TER:</span>
                  <div className="font-semibold">{isLoading ? "Načítání..." : (etf.ter || "N/A")}</div>
                </div>
                <div>
                  <span className="text-gray-600">Velikost:</span>
                  <div className="font-semibold">{isLoading ? "Načítání..." : (etf.size || "N/A")}</div>
                </div>
                <div>
                  <span className="text-gray-600">Dividend yield:</span>
                  <div className="font-semibold text-green-600">{etf.dividendYield}</div>
                </div>
                <div>
                  <span className="text-gray-600">Frekvence:</span>
                  <div className="font-semibold">{etf.frequency}</div>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{etf.reason}</p>
              
              <Link to={`/etf/${etf.isin}`} className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Detail fondu
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Všechny doporučené ETF */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Kompletní přehled dividendových ETF</h2>
      
      <div className="space-y-6 mb-12">
        {RECOMMENDED_DIVIDEND_ETFS.map((etf) => (
          <Card key={etf.isin} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getCategoryColor(etf.category)}>
                      {etf.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getRatingStars(etf.rating)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {etf.region}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{etf.name}</h3>
                  <div className="text-lg font-semibold text-green-600 mb-2">{etf.ticker} • {etf.isin}</div>
                  
                  <p className="text-gray-700 mb-4">{etf.reason}</p>
                </div>
                
                <div className="lg:ml-6">
                  <Link to={`/etf/${etf.isin}`}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Detail fondu
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid md:grid-cols-5 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">TER</span>
                  <div className="font-semibold">{isLoading ? "Načítání..." : (etf.ter || "N/A")}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Velikost</span>
                  <div className="font-semibold">{isLoading ? "Načítání..." : (etf.size || "N/A")}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Firmy</span>
                  <div className="font-semibold">{etf.companies}</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Dividend yield</span>
                  <div className="font-semibold text-green-600">{etf.dividendYield}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Frekvence</span>
                  <div className="font-semibold">{etf.frequency}</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
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
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-2">🏢 Největší pozice:</h4>
                <div className="flex flex-wrap gap-2">
                  {etf.topHoldings.map((holding, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {holding}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Výběrová kritéria */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">🎯 Jak vybíráme nejlepší dividendové ETF</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">Nízké celkové náklady</h3>
                  <p className="text-sm text-gray-700">Preferujeme ETF s TER do 0,4% ročně</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">Historie a velikost</h3>
                  <p className="text-sm text-gray-700">Likvidní fondy s tradicí výplat dividend</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">Diverzifikace</h3>
                  <p className="text-sm text-gray-700">Různé sektory a regiony pro nižší riziko</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">Kvalitní správce</h3>
                  <p className="text-sm text-gray-700">iShares, Vanguard, SPDR - transparentnost a kvalita</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Banknote className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">Dostupnost v ČR</h3>
                  <p className="text-sm text-gray-700">Všechny ETF dostupné u českých brokerů</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Další ETF tabulka */}
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Další dividendové ETF fondy</h2>
      <p className="mb-6 text-gray-700">
        V tabulce najdete další kvalitní dividendové ETF seřazené podle výše dividend yield.
      </p>
      <FilteredETFList filter={DIVIDEND_ETF_TABLE_FILTER} showDividendYield={true} />

      {/* Upozornění */}
      <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Důležité upozornění</h3>
              <p className="text-sm text-gray-700">
                Výše dividend ani jejich růst nejsou nikdy zaručeny a závisí na výsledcích firem. 
                Investování do ETF vždy zahrnuje riziko kolísání hodnoty.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jak začít */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">📋 Jak začít investovat do dividendových ETF</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Definujte cíle</strong> - pravidelný příjem, míra rizika, časový horizont</li>
            <li><strong>Vyberte ETF</strong> podle regionu, měny výplaty a frekvence dividend</li>
            <li><strong>Zkontrolujte parametry</strong> - TER, velikost fondu, typ distribuce</li>
            <li><strong>Ověřte dostupnost</strong> u vašeho brokera (DEGIRO, XTB, Trading212)</li>
            <li><strong>Zvažte DCA</strong> - pravidelné investování a reinvestici dividend</li>
          </ol>
        </CardContent>
      </Card>

      {/* FAQ */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">❓ Časté otázky</h2>
      
      <div className="space-y-4 mb-12">
        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-green-600">
            Které dividendové ETF vyplácejí nejčastěji?
          </summary>
          <div className="mt-3 text-gray-700">
            <strong>SPDR S&P U.S. Dividend Aristocrats</strong> vyplácí kvartálně, některé ETF 
            (např. iShares MSCI World Quality Dividend) i měsíčně. Vždy sledujte konkrétní podmínky fondu.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-green-600">
            Mám zvolit akumulační nebo distribuční variantu ETF?
          </summary>
          <div className="mt-3 text-gray-700">
            Záleží na vaší strategii - akumulační třída reinvestuje dividendy automaticky (ideální na dlouhý horizont), 
            distribuční je vyplácí přímo na účet (vhodné pro rentiérský příjem).
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-green-600">
            Jak jsou dividendy z ETF zdaňovány?
          </summary>
          <div className="mt-3 text-gray-700">
            Většina evropských dividendových ETF automaticky odvádí část daně v zemi fondu. 
            Další zdanění závisí na vaší rezidenci. Doporučujeme konzultaci s daňovým poradcem.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-green-600">
            Mají dividendová ETF menší riziko než růstové fondy?
          </summary>
          <div className="mt-3 text-gray-700">
            Volatilita je často nižší, ale záleží na složení fondu. Dividendové ETF bývají stabilnější 
            během poklesů trhu, stále však podléhají vývoji firemních zisků.
          </div>
        </details>
      </div>

      {/* Závěr */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">💰 Dividendové ETF - stabilní pilíř příjmu</h2>
          <p className="mb-6 opacity-90">
            Dividendové ETF jsou ideální volbou pro každého investora, kdo chce kombinovat růst akcií 
            s pravidelným příjmem a stabilním vývojem portfolia.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/srovnani-etf">
              <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Prozkoumat ETF
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/tipy/nejlepsi-etf-2025">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Nejlepší ETF 2025
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default NejlepsiDividendoveETF;