
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, DollarSign, Globe, BarChart3, Star, ArrowRight, Award, CheckCircle, Users, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
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
  const currentYear = new Date().getFullYear();
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'core': 'bg-emerald-100 text-emerald-800',
      'satellite': 'bg-purple-100 text-purple-800',
      'regional': 'bg-blue-100 text-blue-800',
      'income': 'bg-orange-100 text-orange-800',
      'growth': 'bg-red-100 text-red-800',
      'thematic': 'bg-teal-100 text-teal-800'
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
    <Layout>
      <SEOHead 
        title={`Nejlepší ETF ${currentYear}: Top 10 fondů pro české investory | ETF průvodce.cz`}
        description={`Objevte nejlepší ETF fondy pro rok ${currentYear}. Analýza top S&P 500, světových a evropských ETF s nejnižšími poplatky. VWCE, CSPX, IWDA průvodce pro české investory.`}
        keywords={`nejlepší ETF ${currentYear}, top ETF fondy, VWCE, CSPX, IWDA, S&P 500 ETF, světové ETF, evropské ETF, dividendové ETF, ETF doporučení`}
        canonical="https://etfpruvodce.cz/blog/nejlepsi-etf-2025"
        ogImage="https://etfpruvodce.cz/og-nejlepsi-etf-2025.jpg"
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Compact Hero */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Nejlepší ETF {currentYear}</h1>
                <p className="text-emerald-100">Top 10 fondů pro české investory</p>
              </div>
              <div className="ml-auto text-right hidden md:block">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-semibold">5.0/5</span>
                </div>
                <p className="text-sm text-emerald-200">Expert doporučení</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">0.07%</div>
                <div className="text-xs text-emerald-200">Nejnižší TER</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">10+</div>
                <div className="text-xs text-emerald-200">Top ETF</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">3800+</div>
                <div className="text-xs text-emerald-200">Max firem</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">Globální</div>
                <div className="text-xs text-emerald-200">Diverzifikace</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Úvod a rychlý přehled */}
          <div className="mb-6">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rok {currentYear} přináší ještě větší výběr kvalitních ETF fondů dostupných českým investorům. 
              Připravili jsme pro vás aktuální přehled nejlepších ETF podle různých kritérií s praktickými doporučeními.
            </p>
          </div>

          {/* Proč ETF v 2025 - kompaktní */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Proč ETF v roce {currentYear}?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-3 text-emerald-700">Klíčové výhody:</h3>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Rekordně nízké poplatky (TER od 0,07%)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Globální diverzifikace v jednom fondu
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Regulace UCITS - ochrana investorů
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Transparentnost a likvidita
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-emerald-700">{currentYear} trendy:</h3>
                <ul className="space-y-1.5 text-sm">
                  <li>🌍 <strong>Globální ETF:</strong> Stále nejpopulárnější volba</li>
                  <li>🤖 <strong>AI & Tech:</strong> Rostoucí zájem o technologie</li>
                  <li>🌱 <strong>ESG fondy:</strong> Udržitelné investování</li>
                  <li>💰 <strong>Nízké TER:</strong> Boj providerů o nejlevnější ETF</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TOP 3 ETF - kompaktní */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              🏆 TOP 3 ETF pro rok {currentYear}
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-4">
              {coreETFs.slice(0, 3).map((etf, index) => (
                <div key={etf.isin} className={`relative rounded-lg p-4 border ${index === 0 ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200'}`}>
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white px-2 py-1 text-xs font-bold rounded-bl-lg">
                      #1 VOLBA
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mb-3">
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
                  <p className="text-sm text-gray-600 mb-3">{etf.name}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">TER:</span>
                      <span className="font-semibold">{etf.ter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Velikost:</span>
                      <span className="font-semibold">{etf.size}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{etf.reason}</p>
                  
                  <Link to={`/etf/${etf.isin}`} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full" variant={index === 0 ? "default" : "outline"} size="sm">
                      Detail ETF
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Srovnávací tabulka - kompaktní */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Srovnání všech doporučených ETF
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">ETF</th>
                    <th className="text-center py-2 font-medium">Ticker</th>
                    <th className="text-center py-2 font-medium">TER</th>
                    <th className="text-center py-2 font-medium">Rating</th>
                    <th className="text-center py-2 font-medium">Kategorie</th>
                  </tr>
                </thead>
                <tbody>
                  {RECOMMENDED_ETFS.map((etf, index) => (
                    <tr key={etf.isin} className="border-b">
                      <td className="py-2">
                        <div>
                          <div className="font-medium text-sm">{etf.name}</div>
                          <div className="text-xs text-gray-600">{etf.type}</div>
                        </div>
                      </td>
                      <td className="text-center py-2">
                        <ETFTicker ticker={etf.ticker} isin={etf.isin} />
                      </td>
                      <td className="text-center py-2">
                        <span className={etf.ter <= "0.15%" ? "text-emerald-600 font-semibold" : ""}>
                          {etf.ter}
                        </span>
                      </td>
                      <td className="text-center py-2">
                        <div className="flex justify-center gap-1">
                          {getRatingStars(etf.rating)}
                        </div>
                      </td>
                      <td className="text-center py-2">
                        <Badge className={getCategoryColor(etf.category)} variant="secondary">
                          {etf.category}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Portfolio příklady - kompaktní */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Jak sestavit portfolio z těchto ETF
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
                <h3 className="font-bold text-sm mb-3 text-emerald-800">💚 Jednoduché portfolio</h3>
                <div className="space-y-2 mb-3 text-sm">
                  <div className="flex justify-between">
                    <span>VWCE (Celý svět)</span>
                    <span className="font-semibold">100%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mb-3">
                  Nejjednodušší řešení - jeden ETF, celý svět. Ideální pro začátečníky.
                </p>
                <Badge className="bg-emerald-100 text-emerald-800 text-xs">Začátečník</Badge>
              </div>

              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-sm mb-3 text-blue-800">💙 Vyvážené portfolio</h3>
                <div className="space-y-2 mb-3 text-sm">
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
                <p className="text-xs text-gray-700 mb-3">
                  Lepší kontrola geografické alokace s vyšší váhou USA.
                </p>
                <Badge className="bg-blue-100 text-blue-800 text-xs">Mírně pokročilé</Badge>
              </div>

              <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                <h3 className="font-bold text-sm mb-3 text-purple-800">💜 Pokročilé portfolio</h3>
                <div className="space-y-1 mb-3 text-xs">
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
                <p className="text-xs text-gray-700 mb-3">
                  Komplexní portfolio s taktickými alokacemi.
                </p>
                <Badge className="bg-purple-100 text-purple-800 text-xs">Pokročilé</Badge>
              </div>
            </div>
          </div>

          {/* Závěrečné hodnocení - kompaktní */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              🎯 Naše hlavní doporučení pro {currentYear}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">✅ Pro začátečníky:</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Začněte s VWCE (vše v jednom)</li>
                  <li>• Investujte pravidelně každý měsíc</li>
                  <li>• Držte minimálně 10+ let</li>
                  <li>• Ignorujte krátkodobé výkyvy</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-700 mb-2">🚀 Pro pokročilé:</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Kombinace CSPX + IWDA + XMME</li>
                  <li>• 5-10% v sektorových ETF (tech, ESG)</li>
                  <li>• Rebalancing jednou ročně</li>
                  <li>• Sledování TER a velikosti fondů</li>
                </ul>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">Nejlepší ETF pro {currentYear}</span>
              </div>
              <p className="text-sm text-gray-600">
                💡 Pamatujte: Nejlepší ETF je ten, který držíte dlouhodobě. Čas na trhu {'>'} timing trhu.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4 mb-6">
            <Link to="/srovnani-etf">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold">
                Porovnat všechny ETF
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Nebo použijte naši <Link to="/kalkulacky/investicni-kalkulacka" className="text-emerald-600 hover:underline">investiční kalkulačku</Link> pro výpočet výnosů
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default NejlepsiETF2025;
