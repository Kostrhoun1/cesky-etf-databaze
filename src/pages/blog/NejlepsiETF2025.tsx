
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, DollarSign, Globe, BarChart3, Star, ArrowRight } from 'lucide-react';
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";
import ETFTicker from "../../components/ETFTicker";

const RECOMMENDED_ETFS = [
  {
    name: "Vanguard FTSE All-World UCITS ETF",
    ticker: "VWCE",
    isin: "IE00BK5BQT80",
    ter: "0.22%",
    size: "15.2B €",
    companies: "3,800+",
    reason: "TOP volba pro jednoduché globální portfolio. Jediný ETF pokrývající celý svět včetně rozvíjejících se trhů.",
    type: "Globální akcie",
    rating: 5,
    category: "core",
    pros: ["Vše v jednom ETF", "Vanguard kvalita", "Automatická diverzifikace"],
    cons: ["Vyšší TER než čisté indexy", "Vysoká váha USA"]
  },
  {
    name: "iShares Core S&P 500 UCITS ETF",
    ticker: "CSPX",
    isin: "IE00B5BMR087",
    ter: "0.07%",
    size: "74.8B €",
    companies: "500",
    reason: "Nejlevnější cesta k americkému trhu. Historicky nejlepší dlouhodobé výnosy.",
    type: "USA akcie",
    rating: 5,
    category: "core",
    pros: ["Nejnižší TER", "Obrovská likvidita", "Historický průměr 10% ročně"],
    cons: ["Pouze USA", "Koncentrace do tech gigantů"]
  },
  {
    name: "iShares Core MSCI World UCITS ETF",
    ticker: "IWDA",
    isin: "IE00B4L5Y983",
    ter: "0.20%",
    size: "63.2B €",
    companies: "1,500+",
    reason: "Zlatý standard globálních ETF. Pouze vyspělé trhy, ideální základ portfolia.",
    type: "Globální akcie",
    rating: 5,
    category: "core",
    pros: ["Prokázaná kvalita", "Nejvyšší likvidita", "Stabilní regiony"],
    cons: ["Bez rozvíjejících se trhů", "Vysoká váha USA (70%)"]
  },
  {
    name: "Xtrackers MSCI Emerging Markets UCITS ETF",
    ticker: "XMME",
    isin: "IE00BTJRMP35",
    ter: "0.18%",
    size: "2.1B €",
    companies: "1,400+",
    reason: "Nejlepší doplněk k vyspělým trhům. Čína, Indie, Brazílie - budoucnost růstu.",
    type: "Rozvíjející se trhy",
    rating: 4,
    category: "satellite",
    pros: ["Velmi nízký TER", "Vysoký růstový potenciál", "Geografická diverzifikace"],
    cons: ["Vyšší volatilita", "Politická rizika", "Měnová rizika"]
  },
  {
    name: "iShares Core EURO STOXX 50 UCITS ETF",
    ticker: "SX5E",
    isin: "IE0008471009",
    ter: "0.10%",
    size: "8.4B €",
    companies: "50",
    reason: "Největší evropské firmy. Nízké poplatky, vysoká likvidita, domácí region.",
    type: "Evropské akcie",
    rating: 4,
    category: "regional",
    pros: ["Velmi nízký TER", "Blue-chip firmy", "EUR denominace"],
    cons: ["Pouze 50 firem", "Bez růstových sektorů", "Nižší historické výnosy"]
  },
  {
    name: "SPDR S&P U.S. Dividend Aristocrats UCITS ETF",
    ticker: "UDVD",
    isin: "IE00B6YX5D40",
    ter: "0.35%",
    size: "1.8B €",
    companies: "65",
    reason: "Kvalitní firmy s 25+ lety růstu dividend. Pasivní příjem + ochranka proti inflaci.",
    type: "Dividendové ETF",
    rating: 4,
    category: "income",
    pros: ["Pravidelný příjem", "Kvalitní firmy", "Inflační ochrana"],
    cons: ["Vyšší TER", "Nižší růstový potenciál", "Koncentrace do utils/REITS"]
  },
  {
    name: "Xtrackers MSCI World Information Technology UCITS ETF",
    ticker: "XWT1",
    isin: "IE00BM67HM91",
    ter: "0.25%",
    size: "3.2B €",
    companies: "160+",
    reason: "Čistá expozice na technologie. Apple, Microsoft, Nvidia - motory růstu.",
    type: "Sektorové ETF",
    rating: 3,
    category: "growth",
    pros: ["Nejvyšší růstový potenciál", "Inovativní firmy", "Dlouhodobý trend"],
    cons: ["Vysoká volatilita", "Koncentrované riziko", "Valuační riziko"]
  },
  {
    name: "iShares Global Clean Energy UCITS ETF",
    ticker: "INRG",
    isin: "IE00B1XNHC34",
    ter: "0.65%",
    size: "4.1B €",
    companies: "100+",
    reason: "Investice do budoucnosti - čistá energie, solárka, vítr. ESG trend + růstový potenciál.",
    type: "ESG/Tematické",
    rating: 3,
    category: "thematic",
    pros: ["Megatrend", "ESG friendly", "Státní podpora"],
    cons: ["Velmi vysoká volatilita", "Vysoký TER", "Politická závislost"]
  }
];

const NejlepsiETF2025: React.FC = () => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'core': 'bg-blue-100 text-blue-800',
      'satellite': 'bg-purple-100 text-purple-800',
      'regional': 'bg-green-100 text-green-800',
      'income': 'bg-orange-100 text-orange-800',
      'growth': 'bg-red-100 text-red-800',
      'thematic': 'bg-yellow-100 text-yellow-800'
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

  const coreETFs = RECOMMENDED_ETFS.filter(etf => etf.category === 'core');
  const satelliteETFs = RECOMMENDED_ETFS.filter(etf => etf.category !== 'core');

  return (
    <BlogArticleLayout
      title="Nejlepší ETF 2025"
      perex="Výběr nejlepších ETF fondů pro rok 2025. Analýza podle správcovských poplatků, velikosti fondu, výkonnosti a diverzifikace s konkrétními doporučeními pro české investory."
      seoDescription="Nejlepší ETF 2025: kompletní srovnání a doporučení fondů podle velikosti, poplatků a výnosu. Analýza a tipy na globální, americké, evropské, dividendové a sektorové ETF pro české investory."
      readTime="8 min"
      difficulty="Začátečník"
      category="Doporučení"
    >
      {/* Úvod */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Rok 2025 přináší ještě větší výběr kvalitních ETF fondů dostupných českým investorům. 
          Připravili jsme pro vás aktuální přehled nejlepších ETF podle různých kritérií s praktickými doporučeními.
        </p>
      </div>

      {/* Proč ETF v 2025 */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Proč ETF v roce 2025?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-blue-800">Klíčové výhody:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Rekordně nízké poplatky (TER od 0,07%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Globální diverzifikace v jednom fondu</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Regulace UCITS - ochrana investorů</span>
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Transparentnost a likvidita</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-800">2025 trendy:</h3>
              <ul className="space-y-2 text-sm">
                <li>🌍 <strong>Globální ETF:</strong> Stále nejpopulárnější volba</li>
                <li>🤖 <strong>AI & Tech:</strong> Rostoucí zájem o technologie</li>
                <li>🌱 <strong>ESG fondy:</strong> Udržitelné investování</li>
                <li>💰 <strong>Nízké TER:</strong> Boj providerů o nejlevnější ETF</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOP 3 ETF */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">🏆 TOP 3 ETF pro rok 2025</h2>
      
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {coreETFs.slice(0, 3).map((etf, index) => (
          <Card key={etf.isin} className={`relative overflow-hidden ${index === 0 ? 'ring-2 ring-violet-500' : ''}`}>
            {index === 0 && (
              <div className="absolute top-0 right-0 bg-violet-500 text-white px-3 py-1 text-xs font-bold">
                #1 VOLBA
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={getCategoryColor(etf.category)}>
                  {etf.category.toUpperCase()}
                </Badge>
                <div className="flex gap-1">
                  {getRatingStars(etf.rating)}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">
                <ETFTicker ticker={etf.ticker} isin={etf.isin} size="lg" />
              </h3>
              <p className="text-sm text-gray-600 mb-4">{etf.name}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">TER:</span>
                  <span className="font-semibold ml-1">{etf.ter}</span>
                </div>
                <div>
                  <span className="text-gray-500">Velikost:</span>
                  <span className="font-semibold ml-1">{etf.size}</span>
                </div>
                <div>
                  <span className="text-gray-500">Firmy:</span>
                  <span className="font-semibold ml-1">{etf.companies}</span>
                </div>
                <div>
                  <span className="text-gray-500">Typ:</span>
                  <span className="font-semibold ml-1">{etf.type}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">{etf.reason}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2 text-sm">✅ Výhody:</h4>
                <ul className="text-xs space-y-1">
                  {etf.pros.map((pro, idx) => (
                    <li key={idx}>• {pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-red-700 mb-2 text-sm">⚠️ Nevýhody:</h4>
                <ul className="text-xs space-y-1">
                  {etf.cons.map((con, idx) => (
                    <li key={idx}>• {con}</li>
                  ))}
                </ul>
              </div>
              
              <Link to={`/etf/${etf.isin}`} target="_blank" rel="noopener noreferrer">
                <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                  Detail ETF
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Srovnávací tabulka */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Srovnání všech doporučených ETF</h2>
      
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-4 text-left font-semibold">ETF</th>
              <th className="border border-gray-200 p-4 text-center font-semibold">Ticker</th>
              <th className="border border-gray-200 p-4 text-center font-semibold">TER</th>
              <th className="border border-gray-200 p-4 text-center font-semibold">Velikost</th>
              <th className="border border-gray-200 p-4 text-center font-semibold">Rating</th>
              <th className="border border-gray-200 p-4 text-center font-semibold">Kategorie</th>
            </tr>
          </thead>
          <tbody>
            {RECOMMENDED_ETFS.map((etf, index) => (
              <tr key={etf.isin} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                <td className="border border-gray-200 p-4">
                  <div>
                    <div className="font-medium">{etf.name}</div>
                    <div className="text-sm text-gray-600">{etf.type}</div>
                  </div>
                </td>
                <td className="border border-gray-200 p-4 text-center">
                  <ETFTicker ticker={etf.ticker} isin={etf.isin} />
                </td>
                <td className="border border-gray-200 p-4 text-center">
                  <span className={etf.ter <= "0.15%" ? "text-green-600 font-semibold" : ""}>
                    {etf.ter}
                  </span>
                </td>
                <td className="border border-gray-200 p-4 text-center">{etf.size}</td>
                <td className="border border-gray-200 p-4 text-center">
                  <div className="flex justify-center gap-1">
                    {getRatingStars(etf.rating)}
                  </div>
                </td>
                <td className="border border-gray-200 p-4 text-center">
                  <Badge className={getCategoryColor(etf.category)}>
                    {etf.category}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Portfolio příklady */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Jak sestavit portfolio z těchto ETF</h2>
      
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-green-800">💚 Jednoduché portfolio</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>VWCE (Celý svět)</span>
                <span className="font-semibold">100%</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Nejjednodušší řešení - jeden ETF, celý svět. Ideální pro začátečníky.
            </p>
            <Badge className="bg-green-100 text-green-800">Obtížnost: Začátečník</Badge>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-blue-800">💙 Vyvážené portfolio</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>CSPX (S&P 500)</span>
                <span className="font-semibold">50%</span>
              </div>
              <div className="flex justify-between">
                <span>IWDA (Svět bez USA)</span>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex justify-between">
                <span>XMME (Rozvíjející se)</span>
                <span className="font-semibold">20%</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Lepší kontrola geografické alokace s vyšší váhou USA.
            </p>
            <Badge className="bg-blue-100 text-blue-800">Obtížnost: Mírně pokročilé</Badge>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-violet-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-violet-800">💜 Pokročilé portfolio</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>CSPX (USA)</span>
                <span className="font-semibold">40%</span>
              </div>
              <div className="flex justify-between">
                <span>SX5E (Evropa)</span>
                <span className="font-semibold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>XMME (EM)</span>
                <span className="font-semibold">15%</span>
              </div>
              <div className="flex justify-between">
                <span>UDVD (Dividendy)</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between">
                <span>XWT1 (Tech)</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Komplexní portfolio s taktickými alokacemi.
            </p>
            <Badge className="bg-violet-100 text-violet-800">Obtížnost: Pokročilé</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Závěr */}
      <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">🎯 Naše hlavní doporučení pro 2025</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Pro začátečníky:</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>✓ Začněte s VWCE (vše v jednom)</li>
                <li>✓ Investujte pravidelně každý měsíc</li>
                <li>✓ Držte minimálně 10+ let</li>
                <li>✓ Ignorujte krátkodobé výkyvy</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-4">Pro pokročilé:</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>✓ Kombinace CSPX + IWDA + XMME</li>
                <li>✓ 5-10% v sektorových ETF (tech, ESG)</li>
                <li>✓ Rebalancing jednou ročně</li>
                <li>✓ Sledování TER a velikosti fondů</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-white bg-opacity-20 rounded-lg">
            <p className="text-center font-semibold">
              💡 Pamatujte: Nejlepší ETF je ten, který držíte dlouhodobě. 
              Čas na trhu {'>'} timing trhu.
            </p>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default NejlepsiETF2025;
