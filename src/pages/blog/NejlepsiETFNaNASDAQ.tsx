import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, DollarSign, Zap, Building2, BarChart3, Star, ArrowRight, AlertTriangle, Rocket, Target } from 'lucide-react';
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";
import { useETFArticleData } from "@/hooks/useETFArticleData";

const RECOMMENDED_NASDAQ_ETFS_TEMPLATE = [
  {
    name: "iShares NASDAQ 100 UCITS ETF",
    ticker: "CNDX",
    isin: "IE00B53SZB19",
    companies: "100",
    index: "NASDAQ 100",
    reason: "Nejpopulárnější evropská volba s výbornou likviditou a stabilitou správy.",
    type: "NASDAQ 100",
    rating: 5,
    category: "tech-growth",
    pros: ["Nejvyšší likvidita", "Nejznámější ticker", "Stabilní správa", "Široká dostupnost"],
    cons: ["Vyšší TER", "Koncentrace do top firem", "High volatility"],
    topHoldings: ["Apple (11.2%)", "Microsoft (10.8%)", "Amazon (6.1%)", "Nvidia (5.9%)", "Google (5.7%)"]
  },
  {
    name: "Invesco EQQQ NASDAQ-100 UCITS ETF",
    ticker: "EQQQ", 
    isin: "IE0032077012",
    companies: "100",
    index: "NASDAQ 100",
    reason: "Historicky první NASDAQ ETF v Evropě s nejdelší track record.",
    type: "NASDAQ 100",
    rating: 5,
    category: "tech-growth", 
    pros: ["Nejdelší historie", "Mírně nižší TER", "Established fund", "Strong performance"],
    cons: ["Menší likvidita než CNDX", "Starší struktura", "Currency hedging version"],
    topHoldings: ["Apple (11.2%)", "Microsoft (10.8%)", "Amazon (6.1%)", "Nvidia (5.9%)", "Google (5.7%)"]
  },
  {
    name: "Amundi Nasdaq-100 UCITS ETF",
    ticker: "ANX",
    isin: "LU1681038243", 
    companies: "100",
    index: "NASDAQ 100",
    reason: "Nejnižší poplatky v kategorii s kvalitní francouzskou správou.",
    type: "NASDAQ 100", 
    rating: 4,
    category: "tech-growth",
    pros: ["Nejnižší TER", "Kvalitní správa", "Good tracking", "Cost efficient"],
    cons: ["Nižší likvidita", "Mladší fond", "Menší brand recognition"],
    topHoldings: ["Apple (11.0%)", "Microsoft (10.5%)", "Amazon (6.0%)", "Nvidia (5.8%)", "Google (5.5%)"]
  },
  {
    name: "Xtrackers NASDAQ 100 UCITS ETF", 
    ticker: "XNAQ",
    isin: "IE00BLRPRQ36",
    companies: "100",
    index: "NASDAQ 100",
    reason: "Konkurenceschopné poplatky s robustní DB správou.",
    type: "NASDAQ 100",
    rating: 4,
    category: "tech-growth",
    pros: ["Velmi nízký TER", "Deutsche Bank quality", "Good liquidity", "Efficient tracking"],
    cons: ["Mladší fond", "Menší velikost", "Less known ticker"],
    topHoldings: ["Apple (11.1%)", "Microsoft (10.7%)", "Amazon (6.0%)", "Nvidia (5.8%)", "Google (5.6%)"]
  },
  {
    name: "Lyxor NASDAQ-100 UCITS ETF",
    ticker: "UST",
    isin: "LU1829221024",
    companies: "100", 
    index: "NASDAQ 100",
    reason: "Flexibilní volba s distribučními i akumulačními třídami.",
    type: "NASDAQ 100",
    rating: 3,
    category: "tech-growth", 
    pros: ["Nízký TER", "Multiple share classes", "Flexible options", "Societe Generale backing"],
    cons: ["Nejmenší velikost", "Nižší likvidita", "Newer fund", "Limited track record"],
    topHoldings: ["Apple (11.0%)", "Microsoft (10.6%)", "Amazon (5.9%)", "Nvidia (5.7%)", "Google (5.4%)"]
  }
];

const NASDAQ_ETF_TABLE_FILTER = {
  top: 10,
  sortBy: "return_5y" as const,
  sortOrder: "desc" as const,
  indexNameKeywords: ["nasdaq 100", "nasdaq"],
};

const NejlepsiETFNaNASDAQ: React.FC = () => {
  const { etfsWithData, isLoading } = useETFArticleData(RECOMMENDED_NASDAQ_ETFS_TEMPLATE);
  const RECOMMENDED_NASDAQ_ETFS = etfsWithData;
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'tech-growth': 'bg-purple-100 text-purple-800'
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

  const topETFs = RECOMMENDED_NASDAQ_ETFS.filter(etf => etf.rating === 5);
  const otherETFs = RECOMMENDED_NASDAQ_ETFS.filter(etf => etf.rating < 5);

  return (
    <BlogArticleLayout
      title="Nejlepší ETF na NASDAQ"
      perex="Přehled nejkvalitnějších ETF fondů zaměřených na akciový index NASDAQ 100. Výběr podle výnosu, velikosti a správců, včetně doporučení a praktických rad pro rok 2025."
      seoDescription="Nejlepší ETF na NASDAQ – doporučení, srovnání budoucích i historických výnosů, poplatků a rizik. Jak efektivně investovat do amerických technologických firem."
      readTime="8 min"
      difficulty="Začátečník"
      category="Indexy"
    >
      {/* Úvod */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          NASDAQ 100 index je syn nejvýznamnějších technologických a růstových společností světa. 
          Investice do NASDAQ ETF znamená podíl na budoucnosti inovací, umělé inteligence a digitální transformace.
        </p>
      </div>

      {/* Proč NASDAQ */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">🚀 Proč investovat do NASDAQ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-purple-800">Technologická dominance:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">100 nejinnovativnějších non-finančních firem</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Lídeři v AI, cloudu a biotechnologiích</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Historicky 13%+ ročních výnosů</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Růstový potenciál budoucích dekád</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-purple-800">Klíčové výhody:</h3>
              <ul className="space-y-2 text-sm">
                <li>🎯 <strong>Koncentrace:</strong> Fokus na růstové sektory</li>
                <li>💡 <strong>Inovace:</strong> R&D investice globálních lídrů</li>
                <li>🌍 <strong>Dosah:</strong> Globální technologická expanze</li>
                <li>📈 <strong>Výkonnost:</strong> Dlouhodobě překonává trh</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOP 2 ETF showcase */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">🏆 TOP NASDAQ ETF fondy</h2>
      
      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {topETFs.map((etf, index) => (
          <Card key={etf.isin} className={`relative overflow-hidden ${
            index === 0 ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50' : 'bg-white'
          }`}>
            {index === 0 && (
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-sm font-semibold">
                #1 VOLBA
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
              <div className="text-2xl font-bold text-purple-600 mb-1">{etf.ticker}</div>
              
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
                  <span className="text-gray-600">Firmy:</span>
                  <div className="font-semibold">{etf.companies}</div>
                </div>
                <div>
                  <span className="text-gray-600">Historický výnos:</span>
                  <div className="font-semibold text-green-600">{isLoading ? "Načítání..." : (etf.historicalReturn || "N/A")}</div>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{etf.reason}</p>
              
              <Link to={`/etf/${etf.isin}`} className="block" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Detail fondu
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Všechny doporučené ETF */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Kompletní přehled NASDAQ ETF</h2>
      
      <div className="space-y-6 mb-12">
        {RECOMMENDED_NASDAQ_ETFS.map((etf) => (
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
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{etf.name}</h3>
                  <div className="text-lg font-semibold text-purple-600 mb-2">{etf.ticker} • {etf.isin}</div>
                  
                  <p className="text-gray-700 mb-4">{etf.reason}</p>
                </div>
                
                <div className="lg:ml-6">
                  <Link to={`/etf/${etf.isin}`} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Detail fondu
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">TER</span>
                  <div className="font-semibold">{isLoading ? "Načítání..." : (etf.ter || "N/A")}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Velikost</span>
                  <div className="font-semibold">{isLoading ? "Načítání..." : (etf.size || "N/A")}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Počet firem</span>
                  <div className="font-semibold">{etf.companies}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-600 text-sm">Historický výnos</span>
                  <div className="font-semibold text-green-600">{isLoading ? "Načítání..." : (etf.historicalReturn || "N/A")}</div>
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
                <h4 className="font-semibold mb-2">🏢 TOP 5 pozic:</h4>
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
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-900">🎯 Jak vybíráme nejlepší NASDAQ ETF</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Nízké poplatky (TER)</h3>
                  <p className="text-sm text-gray-700">Preferujeme ETF s ročním nákladem pod 0,35%</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Likvidita a velikost</h3>
                  <p className="text-sm text-gray-700">Dostatečný objem pro snadný nákup a prodej</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Dlouhodobý výkon</h3>
                  <p className="text-sm text-gray-700">Minimálně 5letá historie sledování indexu</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Kvalitní správce</h3>
                  <p className="text-sm text-gray-700">iShares, Invesco, Amundi - prověřené instituce</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Dostupnost v ČR</h3>
                  <p className="text-sm text-gray-700">Všechny ETF dostupné u českých brokerů</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Další ETF tabulka */}
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Další NASDAQ ETF fondy</h2>
      <p className="mb-6 text-gray-700">
        V tabulce najdete další kvalitní ETF zaměřené na NASDAQ index seřazené podle výnosu za posledních 5 let.
      </p>
      <FilteredETFList filter={NASDAQ_ETF_TABLE_FILTER} />

      {/* Upozornění */}
      <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Vysoká volatilita</h3>
              <p className="text-sm text-gray-700">
                NASDAQ ETF jsou vysoce volatilní a vhodné pro dlouhodobé investory s vyšší tolerancí rizika. 
                Minulé výnosy nejsou zárukou budoucích výsledků.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jak koupit */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">📋 Jak koupit NASDAQ ETF krok za krokem</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Stanovte si cíle</strong> a poměr NASDAQ vs. S&P 500 v portfoliu</li>
            <li><strong>Vyberte konkrétní ETF</strong> s nízkým TER a dostatečnou likviditou</li>
            <li><strong>Ověřte dostupnost</strong> u vašeho brokera (DEGIRO, XTB, Trading212)</li>
            <li><strong>Zadejte pokyn</strong> přes ISIN kód pro zamezení chyb</li>
            <li><strong>Zvažte DCA</strong> - pravidelné investování snižuje volatilitu</li>
          </ol>
        </CardContent>
      </Card>

      {/* FAQ */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">❓ Časté otázky</h2>
      
      <div className="space-y-4 mb-12">
        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-purple-600">
            Je lepší investovat do NASDAQ nebo S&P 500?
          </summary>
          <div className="mt-3 text-gray-700">
            S&P 500 je diverzifikovanější a defenzivnější, NASDAQ 100 je více růstový a volatilní. 
            Doporučujeme kombinaci podle vašich cílů a tolerance rizika.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-purple-600">
            Jaké NASDAQ ETF mají nejnižší poplatky?
          </summary>
          <div className="mt-3 text-gray-700">
            K nejlevnějším patří{' '}
            <Link to="/etf/IE00BLRPRQ36" className="text-purple-600 underline hover:text-purple-800" target="_blank" rel="noopener noreferrer">
              Xtrackers NASDAQ 100 (0.20%)
            </Link>{' '}
            a{' '}
            <Link to="/etf/LU1681038243" className="text-purple-600 underline hover:text-purple-800" target="_blank" rel="noopener noreferrer">
              Amundi NASDAQ-100 (0.23%)
            </Link>.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-purple-600">
            V jaké měně nakupovat NASDAQ ETF?
          </summary>
          <div className="mt-3 text-gray-700">
            Většina evropských NASDAQ ETF je dostupná v EUR i USD. Pro dlouhodobé investování 
            není rozdíl zásadní - důležitější je TER, likvidita a správa fondu.
          </div>
        </details>

        <details className="group bg-white border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer text-gray-900 hover:text-purple-600">
            Vyplácí NASDAQ ETF dividendy?
          </summary>
          <div className="mt-3 text-gray-700">
            Najdete jak akumulační, tak distribuční třídy. Technologické firmy obvykle vyplácejí 
            nízké dividendy, protože reinvestují zisky do růstu a inovací.
          </div>
        </details>
      </div>

      {/* Závěr */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🚀 NASDAQ - budoucnost v portfoliu</h2>
          <p className="mb-6 opacity-90">
            NASDAQ ETF poskytují přístup ke špičkovým technologickým firmám a jsou ideální 
            dynamickou složkou moderního růstového portfolia.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/srovnani-etf">
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Prozkoumat ETF
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/tipy/nejlepsi-etf-na-americke-akcie">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Americké akcie
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default NejlepsiETFNaNASDAQ;