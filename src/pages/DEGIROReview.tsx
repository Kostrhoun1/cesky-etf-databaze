
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertTriangle, Star, Shield, TrendingUp, ArrowLeft } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import { generateBrokerSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';

const DEGIROReview = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema("DEGIRO"),
      generateBreadcrumbSchema("DEGIRO")
    ]
  };
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": "DEGIRO",
      "description": "Online broker pro investování do ETF a akcií"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz"
    },
    "reviewBody": "Komplexní hodnocení brokera DEGIRO pro české investory"
  };

  return (
    <Layout>
      <SEOHead
        title={`DEGIRO ETF ${currentYear} 📊 - Recenze, poplatky, ETF zdarma | ČR`}
        description={`★ DEGIRO ETF recenze ${currentYear} ★ 200+ ETF zdarma, poplatky 1-3€, Core Selection ETF. Kompletní průvodce pro české investory + daňové aspekty. Hodnocení 4.5/5.`}
        canonical="https://etfpruvodce.cz/degiro-recenze"
        keywords={`DEGIRO ETF, DEGIRO ETF zdarma, DEGIRO poplatky ${currentYear}, DEGIRO Core Selection, DEGIRO recenze ${currentYear}, DEGIRO Česká republika, ETF broker DEGIRO`}
        ogImage="https://etfpruvodce.cz/og-degiro-etf.jpg"
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb navigation */}
        <div className="mb-8">
          <Link 
            to="/kde-koupit-etf" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zpět na srovnání brokerů
          </Link>
        </div>

        {/* Hero sekce s gradientem */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <img 
                src="/lovable-uploads/f9bacf3b-7b11-4c31-917d-e16803dc0887.png" 
                alt="DEGIRO logo" 
                className="w-8 h-8 mr-3 rounded-lg bg-white p-1"
              />
              <span className="font-medium">DEGIRO Broker</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              DEGIRO ETF recenze {currentYear}
            </h1>
            <p className="text-xl text-orange-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Komplexní hodnocení evropského brokera s nízkými poplatky a širokou nabídkou ETF
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="flex items-center text-yellow-300 mb-2">
                  <Star className="h-6 w-6 mr-2 fill-current" />
                  <span className="text-2xl font-bold">4.5</span>
                  <span className="text-lg ml-1">/5</span>
                </div>
                <div className="text-sm text-orange-100">Celkové hodnocení</div>
              </div>
              <div className="bg-green-500/90 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-lg font-bold mb-1">Doporučeno</div>
                <div className="text-sm text-green-100">Pro investory</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-lg font-bold mb-1">3000+ ETF</div>
                <div className="text-sm text-orange-100">Široká nabídka</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rychlý přehled s ikonami */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Regulace</h3>
            <p className="text-sm text-gray-600">BaFin (DE), DNB/AFM (NL)</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">ETF poplatky</h3>
            <p className="text-sm text-gray-600">1-3 EUR za transakci</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Core Selection</h3>
            <p className="text-sm text-gray-600">200+ ETF zdarma</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Ochrana</h3>
            <p className="text-sm text-gray-600">100 000 EUR (DE)</p>
          </div>
        </div>

        {/* Úvod */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Úvod: DEGIRO pro České Investory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              DEGIRO, online broker založený v Nizozemsku v roce 2013, se rychle etabloval jako významný hráč na evropském trhu s investičními službami. Během pouhých deseti let se společnost rozrostla do 15 zemí po celé Evropě a v roce 2024 se pyšnila více než 3 miliony investorů.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Tato recenze poskytuje komplexní a objektivní hodnocení brokera DEGIRO se specifickým zaměřením na potřeby českého investora, včetně lokálních specifik jako je jazyková podpora, přístup na české trhy a zejména daňové dopady.
            </p>
          </CardContent>
        </Card>

        {/* Základní informace */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-600" />
              Regulace a Bezpečnost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Regulace:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Německý regulátor BaFin (primární)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Nizozemské DNB a AFM
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Pojištění vkladů do 100 000 EUR
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Ochrana prostředků:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Oddělení aktiv (SPV struktura)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Samostatný peněžní účet
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    Závislost na třetích stranách
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Důležité:</strong> Fúze s flatex AG v roce 2020 posílila finanční zázemí a přinesla vyšší úroveň regulace pod německým dohledem.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* DEGIRO ETF sekce */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">🎯 DEGIRO ETF - Klíčové informace</CardTitle>
            <CardDescription className="text-blue-700">Vše o investování do ETF přes DEGIRO broker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">📋 DEGIRO Core Selection ETF</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>200+ ETF zdarma</strong> (první transakce měsíčně)</li>
                  <li>• Největší světové ETF providery (iShares, Vanguard, Xtrackers)</li>
                  <li>• S&P 500, MSCI World, Emerging Markets ETF</li>
                  <li>• Aktualizovaný seznam každý měsíc</li>
                </ul>
              </div>
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">💰 DEGIRO ETF poplatky</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Core Selection:</strong> 1€ za transakci</li>
                  <li>• <strong>Ostatní ETF:</strong> 3€ za transakci</li>
                  <li>• <strong>Roční poplatek:</strong> 2,5€ za zahraniční burzu</li>
                  <li>• <strong>Konverze měn:</strong> Zdarma (CZK/EUR)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🏆 Nejpopulárnější DEGIRO ETF pro české investory:</h4>
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <div className="text-sm">
                  <strong>VWCE</strong> - Vanguard FTSE All-World<br/>
                  <span className="text-green-700">TER: 0.22% | Core Selection</span>
                </div>
                <div className="text-sm">
                  <strong>CSPX</strong> - iShares Core S&P 500<br/>
                  <span className="text-green-700">TER: 0.07% | Core Selection</span>
                </div>
                <div className="text-sm">
                  <strong>IWDA</strong> - iShares MSCI World<br/>
                  <span className="text-green-700">TER: 0.20% | Core Selection</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ DEGIRO ETF - Na co si dát pozor:</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• Core Selection ETF zdarma pouze první transakce měsíčně</li>
                <li>• Akumulační ETF jsou daňově výhodnější než distribuční</li>
                <li>• Evropské UCITS ETF preferovat před americkými (kvůli regulaci)</li>
                <li>• Roční poplatek 2,5€ za každou využitou zahraniční burzu</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Poplatky */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Přehled klíčových poplatků pro české investory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Typ aktiva/poplatku</TableHead>
                  <TableHead>Poplatek</TableHead>
                  <TableHead>Poznámky</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">České akcie</TableCell>
                  <TableCell>30 CZK</TableCell>
                  <TableCell className="text-sm">20 CZK komise + 10 CZK manipulační poplatek</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Americké akcie</TableCell>
                  <TableCell>2 EUR</TableCell>
                  <TableCell className="text-sm">1 EUR komise + 1 EUR manipulační poplatek</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Core Selection ETF</TableCell>
                  <TableCell className="text-green-600 font-bold">1 EUR</TableCell>
                  <TableCell className="text-sm">200+ vybraných ETF, jedna transakce měsíčně zdarma</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ostatní ETF</TableCell>
                  <TableCell>3 EUR</TableCell>
                  <TableCell className="text-sm">ETF mimo Core Selection seznam</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Konverze CZK/EUR</TableCell>
                  <TableCell className="text-green-600 font-medium">Zdarma</TableCell>
                  <TableCell className="text-sm">AutoFX i manuální konverze</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Roční poplatek za zahraniční burzu</TableCell>
                  <TableCell>2,5 EUR</TableCell>
                  <TableCell className="text-sm">Za každou využitou burzu (kromě pražské)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Daňové aspekty */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daňové aspekty pro české investory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                  <XCircle className="h-4 w-4 mr-2" />
                  Nevýhoda: České dividendy
                </h4>
                <p className="text-red-800 text-sm">
                  Dividendy z českých akcií jsou zdaněny 35% srážkovou daní (místo standardních 15%). 
                  Je možné požádat o vrácení 20%, ale vyžaduje to administrativní úsilí.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Výhoda: Americké dividendy
                </h4>
                <p className="text-green-800 text-sm">
                  DEGIRO umožňuje podepsání formuláře W-8BEN, což snižuje srážkovou daň z amerických dividend z 30% na 15%.
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zdroj dividend</TableHead>
                    <TableHead>Srážková daň</TableHead>
                    <TableHead>Možnost snížení</TableHead>
                    <TableHead>Efektivní daň</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>České akcie</TableCell>
                    <TableCell className="text-red-600">35%</TableCell>
                    <TableCell>Možnost žádat o vrácení 20%</TableCell>
                    <TableCell>15% (po vrácení)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Americké akcie</TableCell>
                    <TableCell className="text-green-600">15%</TableCell>
                    <TableCell>Formulář W-8BEN</TableCell>
                    <TableCell>15%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Srovnání s konkurencí */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Srovnání s konkurencí na českém trhu</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategorie</TableHead>
                  <TableHead>DEGIRO</TableHead>
                  <TableHead>XTB</TableHead>
                  <TableHead>Fio eBroker</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Demo účet</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Frakční akcie</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-green-600">Ano (od 10 EUR)</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">České dividendy</TableCell>
                  <TableCell className="text-red-600">35% (20% vratných)</TableCell>
                  <TableCell className="text-red-600">35% (20% vratných)</TableCell>
                  <TableCell className="text-green-600">15%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Konverze CZK/EUR</TableCell>
                  <TableCell className="text-green-600">Zdarma</TableCell>
                  <TableCell className="text-yellow-600">0,5%</TableCell>
                  <TableCell className="text-yellow-600">Dle kurzu banky</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Česká podpora</TableCell>
                  <TableCell className="text-yellow-600">Částečná</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Celkové hodnocení */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Celkové hodnocení a doporučení</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">Hlavní výhody:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Silná regulace a ochrana prostředků</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Široká nabídka globálních trhů</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Bezplatná konverze CZK/EUR</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Nízké poplatky za vybrané ETF</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Hlavní nevýhody:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Nevýhodné zdanění českých dividend</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Absence frakčních akcií</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Chybějící demo účet</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Inkonzistentní česká lokalizace</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho je DEGIRO nejvhodnější:</h4>
              <p className="text-blue-700 text-sm mb-4">
                DEGIRO je ideální volbou pro dlouhodobé, pasivní investory, kteří se zaměřují na globální ETF a mezinárodní akcie. 
                Ocení nízké poplatky za konverzi měn mezi CZK a EUR a široký výběr trhů pro diverzifikaci.
              </p>
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho DEGIRO není vhodné:</h4>
              <p className="text-blue-700 text-sm">
                Méně vhodné pro začínající investory, kteří potřebují demo účet a plnou českou podporu, 
                nebo pro ty, kteří chtějí primárně investovat do českých dividendových akcií.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Závěrečné doporučení:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                DEGIRO je bezpečný a transparentní broker, který nabízí silné nástroje pro diverzifikaci portfolia na globálních trzích. 
                Pro českého investora je klíčové, aby jeho investiční strategie odpovídala silným stránkám DEGIRO a aby byl ochoten 
                akceptovat jeho slabiny, zejména v oblasti zdanění českých dividend. Představuje silnou volbu pro globálně orientované, 
                dlouhodobé investory.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation to related content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Srovnání brokerů</h3>
              <p className="text-gray-600 text-sm mb-4">
                Porovnejte DEGIRO s dalšími brokery pro český trh
              </p>
              <Link 
                to="/kde-koupit-etf" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Přejít na srovnání →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Návod pro začátečníky</h3>
              <p className="text-gray-600 text-sm mb-4">
                Jak začít investovat do ETF přes brokera
              </p>
              <Link 
                to="/navod-pro-zacatecniky" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Číst návod →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DEGIROReview;
