import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Calendar, DollarSign, BarChart3, PieChart, Shield, Lightbulb } from 'lucide-react';
import BlogArticleLayout from "./_BlogArticleLayout";
import ETFTicker from "../../components/ETFTicker";

const TydeniETFPrehled20250920: React.FC = () => {
  const indexData = [
    { name: "S&P 500", value: "6,664.36", change: "+0.74%", changeValue: "+49.08", trend: "up" },
    { name: "NASDAQ", value: "22,631.48", change: "+1.27%", changeValue: "+282.73", trend: "up" },
    { name: "EURO STOXX 50", value: "5,458.42", change: "+0.33%", changeValue: "+18.02", trend: "up" },
    { name: "VIX (volatilita)", value: "15.45", change: "-1.53%", changeValue: "-0.24", trend: "down" },
    { name: "10Y Treasury", value: "4.14%", change: "+2.60%", changeValue: "+0.11", trend: "up" }
  ];

  const topPerformingETFs = {
    equity: [
      { name: "iShares Gold Producers UCITS ETF", ticker: "SPGP", ytd: "+77.18%", provider: "iShares", rank: 1 },
      { name: "iShares EURO STOXX Banks 30-15", ticker: "EXX1", ytd: "+64.57%", provider: "iShares", rank: 2 },
      { name: "Amundi Euro Stoxx Banks UCITS ETF", ticker: "BNKE", ytd: "+64.39%", provider: "Amundi", rank: 3 }
    ],
    bonds: [
      { name: "SPDR FTSE Global Convertible Bond EUR Hedged", ticker: "SPF1", ytd: "+16.77%", provider: "SPDR", rank: 1 },
      { name: "SPDR FTSE Global Convertible Bond CHF Hedged", ticker: "GCVC", ytd: "+14.87%", provider: "SPDR", rank: 2 },
      { name: "iShares Asia Property Yield UCITS ETF", ticker: "IASP", ytd: "+14.60%", provider: "iShares", rank: 3 }
    ],
    crypto: [
      { name: "Global X Blockchain UCITS ETF", ticker: "BLCH", ytd: "+46.03%", provider: "Global X", rank: 1 },
      { name: "iShares Blockchain Technology UCITS ETF", ticker: "CBUT", ytd: "+40.77%", provider: "iShares", rank: 2 },
      { name: "Invesco CoinShares Global Blockchain", ticker: "BCHS", ytd: "+39.46%", provider: "Invesco", rank: 3 }
    ],
    commodities: [
      { name: "L&G Gold Mining UCITS ETF", ticker: "ETLX", ytd: "+91.48%", provider: "L&G", rank: 1 },
      { name: "UBS Solactive Global Pure Gold Miners", ticker: "UBUD", ytd: "+83.96%", provider: "UBS", rank: 2 },
      { name: "HANetf AuAg ESG Gold Mining", ticker: "ZSG0", ytd: "+80.48%", provider: "HANetf", rank: 3 }
    ],
    realestate: [
      { name: "Global X European Infrastructure Development", ticker: "B41J", ytd: "+24.44%", provider: "Global X", rank: 1 },
      { name: "WisdomTree New Economy Real Estate USD Acc", ticker: "WTRE", ytd: "+18.03%", provider: "WisdomTree", rank: 2 },
      { name: "WisdomTree New Economy Real Estate USD Dist", ticker: "WTER", ytd: "+18.01%", provider: "WisdomTree", rank: 3 }
    ]
  };

  const cheapestETFs = [
    { name: "Scalable MSCI AC World Xtrackers", ticker: "SCWX", ter: "0.00%", category: "Akcie", provider: "Xtrackers" },
    { name: "boerse.de Gold ETC", ticker: "TMGD", ter: "0.00%", category: "Komodity", provider: "-" },
    { name: "CoinShares Physical Staked Solana", ticker: "SLNC", ter: "0.00%", category: "Krypto", provider: "CoinShares" },
    { name: "EUWAX Gold II", ticker: "EWG2", ter: "0.00%", category: "Komodity", provider: "-" },
    { name: "CoinShares Physical Smart Contract Platform", ticker: "CSSC", ter: "0.00%", category: "Akcie", provider: "CoinShares" }
  ];

  const upcomingEvents = [
    { date: "23.9.", event: "Německý PMI", impact: "🇪🇺 Evropské akciové ETF" },
    { date: "24.9.", event: "US Consumer Confidence", impact: "🇺🇸 Americké akciové ETF" },
    { date: "25.9.", event: "ECB Minutes", impact: "🛡️ Dluhopisové ETF" },
    { date: "26.9.", event: "US GDP Data", impact: "📈 Broad market ETF" },
    { date: "27.9.", event: "Core PCE Inflation", impact: "💎 Komoditní ETF" }
  ];

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <div className="flex items-center text-green-600">
        <span className="mr-1">🟢</span>
        <TrendingUp className="w-4 h-4" />
      </div>
    ) : (
      <div className="flex items-center text-red-600">
        <span className="mr-1">🔴</span>
        <TrendingDown className="w-4 h-4" />
      </div>
    );
  };

  return (
    <BlogArticleLayout
      title="📊 Týdenní ETF přehled: 16. - 20. září 2025"
      perex="Kompletní analýza ETF trhů za týden 16.-20. září 2025. Fed snížil sazby o 0.25%, zlato a banky vedou performance, VIX klesá na 15.45. Detailní přehled nejlepších ETF fondů a výhled na příští týden."
      seoDescription="Týdenní ETF přehled 20.9.2025: Fed rate cuts, analýza S&P 500, NASDAQ, nejlepší ETF fondy, gold mining ETF +91%, bankovní sektor +64%. Reálná data, technická analýza, portfolio doporučení."
      readTime="8 min"
      difficulty="Začátečník"
      category="Týdenní analýza"
    >
      {/* Header info */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-violet-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-600 italic text-center">
          Aktualizováno: 20.09.2025 11:37 | Data v reálném čase z Yahoo Finance
        </p>
      </div>

      {/* Quick overview */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <Target className="w-8 h-8 text-violet-600" />
        Rychlý přehled týdne
      </h2>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-semibold">Index</th>
                  <th className="text-center py-3 font-semibold">Hodnota</th>
                  <th className="text-center py-3 font-semibold">Týdenní změna</th>
                  <th className="text-center py-3 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {indexData.map((index, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-25" : "bg-white"}>
                    <td className="py-3 font-medium">{index.name}</td>
                    <td className="text-center py-3">{index.value}</td>
                    <td className="text-center py-3">
                      <span className={index.trend === "up" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {index.change}
                      </span>
                      <span className="text-gray-500 ml-1">({index.changeValue})</span>
                    </td>
                    <td className="text-center py-3">
                      {getTrendIcon(index.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weekly analysis */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-violet-600" />
        Analýza týdne: Trhy rostou po Fed rozhodnutí
      </h2>

      <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <DollarSign className="w-6 h-6" />
            Klíčová událost: Fed snížil sazby o 0.25%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            <strong>17. září 2025</strong> - Federální rezerva provedla <strong>první snížení úrokových sazeb v roce 2025</strong>, 
            čímž signalizovala obrat v měnové politice. Rozhodnutí bylo očekávané a trhy na něj reagovaly pozitivně.
          </p>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="text-center mb-2">📊 DOPAD NA TRHY:</div>
            <div className="border border-green-400 p-3">
              <div>│ ✅ Akcie: Růst všech hlavních indexů │</div>
              <div>│ ✅ Volatilita: Pokles VIX na 15.45   │</div>
              <div>│ ✅ Dluhopisy: Stabilní výnosy        │</div>
              <div>│ ✅ Dolar: Mírné oslabení             │</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            🇪🇺 Evropa: ECB drží kurz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            <strong>ECB ponechala sazby na 2%</strong>, inflace se pohybuje kolem cíle 2%. 
            Evropské trhy reagovaly pozitivně, EURO STOXX 50 vzrostl o 0.33%.
          </p>
        </CardContent>
      </Card>

      {/* Top performing ETFs */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <TrendingUp className="w-8 h-8 text-violet-600" />
        TOP výkonnost ETF fondů (YTD)
      </h2>

      {/* Equity ETFs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 AKCIE - Banky a zlato vedou
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Pořadí</th>
                  <th className="border border-gray-200 p-3 text-left">ETF</th>
                  <th className="border border-gray-200 p-3 text-center">Ticker</th>
                  <th className="border border-gray-200 p-3 text-center">YTD výnos</th>
                  <th className="border border-gray-200 p-3 text-center">Poskytovatel</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingETFs.equity.map((etf, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                    <td className="border border-gray-200 p-3 font-bold">
                      {getRankEmoji(etf.rank)}
                    </td>
                    <td className="border border-gray-200 p-3">{etf.name}</td>
                    <td className="border border-gray-200 p-3 text-center">
                      <ETFTicker ticker={etf.ticker} />
                    </td>
                    <td className="border border-gray-200 p-3 text-center font-bold text-green-600">
                      {etf.ytd}
                    </td>
                    <td className="border border-gray-200 p-3 text-center">{etf.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="text-center mb-2">📊 SEKTOROVÁ ANALÝZA:</div>
            <div>🏦 Banky: +60-65% YTD</div>
            <div>⚡ Dominují díky očekávání vyšších marží</div>
            <div>💰 Gold Miners: +77% YTD</div>
            <div>⚡ Těží z vysokých cen zlata a inflačních obav</div>
          </div>
        </CardContent>
      </Card>

      {/* Bonds ETFs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛡️ DLUHOPISY - Konvertibilní bondy září
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Pořadí</th>
                  <th className="border border-gray-200 p-3 text-left">ETF</th>
                  <th className="border border-gray-200 p-3 text-center">Ticker</th>
                  <th className="border border-gray-200 p-3 text-center">YTD výnos</th>
                  <th className="border border-gray-200 p-3 text-center">Poskytovatel</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingETFs.bonds.map((etf, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                    <td className="border border-gray-200 p-3 font-bold">
                      {getRankEmoji(etf.rank)}
                    </td>
                    <td className="border border-gray-200 p-3">{etf.name}</td>
                    <td className="border border-gray-200 p-3 text-center">
                      <ETFTicker ticker={etf.ticker} />
                    </td>
                    <td className="border border-gray-200 p-3 text-center font-bold text-green-600">
                      {etf.ytd}
                    </td>
                    <td className="border border-gray-200 p-3 text-center">{etf.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Crypto ETFs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ₿ KRYPTO - Blockchain technologie v popředí
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Pořadí</th>
                  <th className="border border-gray-200 p-3 text-left">ETF</th>
                  <th className="border border-gray-200 p-3 text-center">Ticker</th>
                  <th className="border border-gray-200 p-3 text-center">YTD výnos</th>
                  <th className="border border-gray-200 p-3 text-center">Poskytovatel</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingETFs.crypto.map((etf, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                    <td className="border border-gray-200 p-3 font-bold">
                      {getRankEmoji(etf.rank)}
                    </td>
                    <td className="border border-gray-200 p-3">{etf.name}</td>
                    <td className="border border-gray-200 p-3 text-center">
                      <ETFTicker ticker={etf.ticker} />
                    </td>
                    <td className="border border-gray-200 p-3 text-center font-bold text-green-600">
                      {etf.ytd}
                    </td>
                    <td className="border border-gray-200 p-3 text-center">{etf.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Commodities ETFs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💎 KOMODITY - Zlato dominuje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Pořadí</th>
                  <th className="border border-gray-200 p-3 text-left">ETF</th>
                  <th className="border border-gray-200 p-3 text-center">Ticker</th>
                  <th className="border border-gray-200 p-3 text-center">YTD výnos</th>
                  <th className="border border-gray-200 p-3 text-center">Poskytovatel</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingETFs.commodities.map((etf, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                    <td className="border border-gray-200 p-3 font-bold">
                      {getRankEmoji(etf.rank)}
                    </td>
                    <td className="border border-gray-200 p-3">{etf.name}</td>
                    <td className="border border-gray-200 p-3 text-center">
                      <ETFTicker ticker={etf.ticker} />
                    </td>
                    <td className="border border-gray-200 p-3 text-center font-bold text-green-600">
                      {etf.ytd}
                    </td>
                    <td className="border border-gray-200 p-3 text-center">{etf.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm">
            <div className="text-center mb-2">💰 ZLATÁ HOREČKA 2025:</div>
            <div className="border border-yellow-400 p-3">
              <div>│ 🏆 Gold Mining ETF: +80-90%  │</div>
              <div>│ 📈 Cena zlata: Historická max│</div>
              <div>│ 💡 Důvody: Inflace + Fed cuts│</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real Estate ETFs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏢 NEMOVITOSTI - Infrastruktura vede
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Pořadí</th>
                  <th className="border border-gray-200 p-3 text-left">ETF</th>
                  <th className="border border-gray-200 p-3 text-center">Ticker</th>
                  <th className="border border-gray-200 p-3 text-center">YTD výnos</th>
                  <th className="border border-gray-200 p-3 text-center">Poskytovatel</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingETFs.realestate.map((etf, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                    <td className="border border-gray-200 p-3 font-bold">
                      {getRankEmoji(etf.rank)}
                    </td>
                    <td className="border border-gray-200 p-3">{etf.name}</td>
                    <td className="border border-gray-200 p-3 text-center">
                      <ETFTicker ticker={etf.ticker} />
                    </td>
                    <td className="border border-gray-200 p-3 text-center font-bold text-green-600">
                      {etf.ytd}
                    </td>
                    <td className="border border-gray-200 p-3 text-center">{etf.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cheapest ETFs */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <DollarSign className="w-8 h-8 text-violet-600" />
        Nejlevnější ETF možnosti
      </h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏅 TOP 5 podle TER (0.00% poplatky!)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">ETF</th>
                  <th className="border border-gray-200 p-3 text-center">Ticker</th>
                  <th className="border border-gray-200 p-3 text-center">TER</th>
                  <th className="border border-gray-200 p-3 text-center">Kategorie</th>
                  <th className="border border-gray-200 p-3 text-center">Poskytovatel</th>
                </tr>
              </thead>
              <tbody>
                {cheapestETFs.map((etf, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                    <td className="border border-gray-200 p-3">{etf.name}</td>
                    <td className="border border-gray-200 p-3 text-center">
                      <ETFTicker ticker={etf.ticker} />
                    </td>
                    <td className="border border-gray-200 p-3 text-center font-bold text-green-600">
                      {etf.ter}
                    </td>
                    <td className="border border-gray-200 p-3 text-center">{etf.category}</td>
                    <td className="border border-gray-200 p-3 text-center">{etf.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm">
            <div className="text-center mb-2">💡 TIP PRO INVESTORY:</div>
            <div className="border border-blue-400 p-3">
              <div>│ ⚡ 0% TER = Více peněz zůstává investorovi│</div>
              <div>│ 📊 Dlouhodobě významná úspora nákladů    │</div>
              <div>│ 🎯 Ideální pro core holdings             │</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Statistics */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-violet-600" />
        Statistiky podle kategorií
      </h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>📈 Přehled výkonnosti (průměrný YTD výnos)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm space-y-1">
            <div>📈 AKCIE         │████████████████████████████████████████ 6.76%  │ 1,000 fondů</div>
            <div>🛡️ DLUHOPISY     │████████████████████ -0.79%                    │ 980 fondů</div>
            <div>₿ KRYPTO         │████████████████████████████████ 4.25%         │ 91 fondů</div>
            <div>💎 KOMODITY      │██████████████████████████████████████████████ 12.57% │ 149 fondů</div>
            <div>🏢 NEMOVITOSTI   │██████████████████████ 2.00%                  │ 51 fondů</div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-bold text-gray-800 mb-2">🎯 Klíčové pozorování:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• <strong>Komodity</strong> vedou s průměrným výnosem <strong>12.57%</strong> YTD</li>
              <li>• <strong>Akcie</strong> stabilně rostou průměrně o <strong>6.76%</strong></li>
              <li>• <strong>Dluhopisy</strong> lehce v mínusu <strong>-0.79%</strong> kvůli rostoucím sazbám</li>
              <li>• <strong>Krypto</strong> ETF v pozitivním pásmu <strong>+4.25%</strong></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Weekly outlook */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <Calendar className="w-8 h-8 text-violet-600" />
        Výhled na příští týden (23.-27. září)
      </h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>📅 Klíčové události</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Datum</th>
                  <th className="border border-gray-200 p-3 text-left">Událost</th>
                  <th className="border border-gray-200 p-3 text-left">Dopad na ETF</th>
                </tr>
              </thead>
              <tbody>
                {upcomingEvents.map((event, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                    <td className="border border-gray-200 p-3 font-bold">{event.date}</td>
                    <td className="border border-gray-200 p-3">{event.event}</td>
                    <td className="border border-gray-200 p-3">{event.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>🎯 Co sledovat:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="mb-4">
              <div className="text-blue-400 mb-2">🏦 BANKOVNÍ SEKTOR:</div>
              <div>├─ Pokračování rally po Fed cuts?</div>
              <div>├─ Pozor na guidance bank</div>
              <div>└─ NIM (Net Interest Margin) trendy</div>
            </div>
            
            <div className="mb-4">
              <div className="text-yellow-400 mb-2">💰 ZLATO & KOMODITY:</div>
              <div>├─ Reakce na dollor strength</div>
              <div>├─ Inflační očekávání</div>
              <div>└─ Geopolitické napětí</div>
            </div>
            
            <div>
              <div className="text-purple-400 mb-2">📈 TECH & GROWTH:</div>
              <div>├─ Beneficienti nižších sazeb</div>
              <div>├─ AI/Cloud investice</div>
              <div>└─ Valuace po rallye</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risks and opportunities */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <AlertTriangle className="w-8 h-8 text-violet-600" />
        Rizika a příležitosti
      </h2>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">🚨 RIZIKA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-red-400 p-4 rounded-lg font-mono text-sm">
              <div className="text-center mb-2">⚠️ POZOR NA:</div>
              <div className="border border-red-400 p-3">
                <div>│ 📊 Vysoké valuace tech akcií         │</div>
                <div>│ 🏦 Přehřátí bankovního sektoru       │</div>
                <div>│ 💰 Korekce zlata při DXY růstu       │</div>
                <div>│ 🇨🇳 Čínské ekonomické zpomalení      │</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">✅ PŘÍLEŽITOSTI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="text-center mb-2">💡 ZAJÍMAVÉ SECTORY:</div>
              <div className="border border-green-400 p-3">
                <div>│ 🏗️ Infrastruktura (fiscal spending) │</div>
                <div>│ 🌱 Clean Energy (government support) │</div>
                <div>│ 🏥 Healthcare (demographic trends)   │</div>
                <div>│ 🛡️ Defensive sectors při volatilitě │</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio recommendations */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <PieChart className="w-8 h-8 text-violet-600" />
        Doporučení pro portfolio
      </h2>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">🎯 Konzervativní investor (nižší riziko)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm mb-4">
              <div className="text-center mb-2">📊 ALOKACE DOPORUČENÍ:</div>
              <div className="border border-blue-400 p-3">
                <div>│ 60% │ ████████████ │ Akciové ETF    │</div>
                <div>│ 30% │ ██████       │ Dluhopisové ETF│</div>
                <div>│ 10% │ ██           │ Komodity/REIT  │</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-blue-800 mb-2">🎯 TOP PICKS:</h4>
              <ul className="space-y-1 text-sm">
                <li>• <ETFTicker ticker="SCWX" /> (World Equity, 0% TER)</li>
                <li>• Dluhopisové ETF s krátkým duration</li>
                <li>• Gold ETF jako hedge</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">⚡ Dynamický investor (vyšší riziko)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm mb-4">
              <div className="text-center mb-2">📊 ALOKACE DOPORUČENÍ:</div>
              <div className="border border-purple-400 p-3">
                <div>│ 80% │ ████████████████ │ Akciové ETF │</div>
                <div>│ 15% │ ███              │ Komodity    │</div>
                <div>│ 5%  │ █                │ Krypto ETF  │</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-purple-800 mb-2">🎯 TOP PICKS:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Tech/Growth ETF (beneficienti Fed cuts)</li>
                <li>• Bankovní sektor ETF</li>
                <li>• Gold mining ETF</li>
                <li>• Blockchain/Krypto ETF (malá alokace)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical analysis */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-violet-600" />
        Technická analýza indexů
      </h2>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>S&P 500 - Bullish momentum pokračuje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="text-center mb-2">📊 S&P 500 TECHNICAL:</div>
              <div className="border border-green-400 p-3">
                <div>│ Current: 6,664 ⬆️                   │</div>
                <div>│ Resistance: 6,700 (psychological)   │</div>
                <div>│ Support: 6,600 (recent breakout)    │</div>
                <div>│ RSI: 65 (still room to run)        │</div>
                <div>│ MA(50): Bullish crossover           │</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>VIX - Complacency alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm">
              <div className="text-center mb-2">⚠️ VIX WATCH:</div>
              <div className="border border-yellow-400 p-3">
                <div>│ Current: 15.45 (low volatility)    │</div>
                <div>│ Support: 15.0 (extreme complacency) │</div>
                <div>│ Resistance: 18.0 (normal vol)      │</div>
                <div>│ ⚠️ Risk: Volatility spike možný    │</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ETF tip of the week */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <Lightbulb className="w-8 h-8 text-violet-600" />
        ETF tip týdne
      </h2>

      <Card className="mb-8 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
        <CardHeader>
          <CardTitle className="text-violet-800">💡 Sectoral Rotation Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Po Fed rate cuts historicky dochází k rotaci ze <strong>defensivních do cyklických sektorů</strong>:
          </p>
          
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm mb-4">
            <div className="text-green-400 mb-3">📈 BENEFICIENTI (rate cuts):</div>
            <div className="space-y-1 mb-4">
              <div>✅ Financial ETF (banky, pojišťovny)</div>
              <div>✅ Real Estate ETF (REITs)</div>
              <div>✅ Small Cap ETF (vyšší zadlužení)</div>
              <div>✅ Growth Tech ETF (valuace boost)</div>
            </div>
            
            <div className="text-red-400 mb-3">📉 ZTRÁCÍ (rate cuts):</div>
            <div className="space-y-1">
              <div>❌ Utilities ETF (bond substitutes)</div>
              <div>❌ Consumer Staples ETF (defensive)</div>
              <div>❌ High Dividend ETF (konkurence bonds)</div>
            </div>
          </div>
          
          <p className="text-gray-700">
            <strong>🎯 Akce:</strong> Zvážit <strong>rebalancing</strong> z defensivních do cyklických sektorů, 
            ale postupně a s risk managementem.
          </p>
        </CardContent>
      </Card>

      {/* Contact and sources */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">📞 Kontakt a zdroje</h2>

      <Card className="mb-8 bg-gray-50">
        <CardContent className="p-6">
          <div className="space-y-2 text-gray-700">
            <p><strong>📧 Newsletter:</strong> Přihlaste se k odběru týdenních ETF analýz</p>
            <p><strong>🌐 Web:</strong> <Link to="/" className="text-violet-600 hover:underline">etfpruvodce.cz</Link></p>
            <p><strong>📊 Data:</strong> Yahoo Finance API + ETF Průvodce databáze</p>
            <p><strong>⏰ Aktualizace:</strong> Každý pátek večer</p>
          </div>
        </CardContent>
      </Card>

      {/* Legal disclaimer */}
      <Card className="mb-8 bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">⚠️ Právní upozornění</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-700">
          <p className="mb-2">
            Tento report je generován automaticky a slouží pouze pro <strong>informační účely</strong>. 
            Není investičním doporučením. Veškeré investiční rozhodnutí činíte na vlastní odpovědnost. 
            Data jsou aktualizována v čase generování reportu.
          </p>
          <p className="italic">
            Past performance is not indicative of future results. ETF investice nesou riziko ztráty kapitálu.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 space-y-1">
        <p>📅 Zpracováno: 20.09.2025 11:37 | 🔄 Příští report: 27.09.2025</p>
        <p>📊 Zdroj: Yahoo Finance + ETF Průvodce databáze | ⚡ Real-time data</p>
      </div>

      {/* Related articles */}
      <Card className="mt-8 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle>🔗 Související články</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link to="/tipy/nejlepsi-etf-2025" className="block hover:underline">
              • Nejlepší ETF pro začátečníky 2025
            </Link>
            <Link to="/tipy/rebalancing-portfolia" className="block hover:underline">
              • Jak postavit diverzifikované portfolio
            </Link>
            <Link to="/tipy/etf-vs-aktivni-fondy" className="block hover:underline">
              • ETF vs aktivní fondy - srovnání
            </Link>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default TydeniETFPrehled20250920;