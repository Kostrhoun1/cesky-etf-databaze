import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertTriangle, Star, Shield, TrendingUp, ArrowLeft, Globe, Users, Zap, Target, Award } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';

const IBKRReview = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": "Interactive Brokers",
      "description": "Profesionální globální broker pro náročné investory"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.3",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz"
    },
    "reviewBody": "Komplexní hodnocení brokera Interactive Brokers pro české pokročilé investory"
  };

  return (
    <Layout>
      <SEOHead
        title="Interactive Brokers recenze 2025: Hodnocení pro české investory | ETF průvodce.cz"
        description="Detailní recenze Interactive Brokers - nejnižší poplatky, globální trhy, profesionální nástroje. Výhody a nevýhody IBKR pro ČR. Hodnocení 4.3/5."
        canonical="https://etfpruvodce.cz/interactive-brokers-recenze"
        keywords="Interactive Brokers recenze, IBKR zkušenosti, Interactive Brokers poplatky, IBKR Česká republika"
        schema={reviewSchema}
        ogImage="https://etfpruvodce.cz/og-interactive-brokers-review.jpg"
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

        {/* Hlavička */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Detailní Recenze Interactive Brokers
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Profesionální broker pro náročné investory
          </p>
          <div className="flex justify-center items-center mt-6 gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-5 w-5 mr-2 fill-current text-yellow-500" />
              4.3/5
            </Badge>
            <Badge className="bg-purple-600 text-lg px-4 py-2">
              Pro pokročilé
            </Badge>
          </div>
        </div>

        {/* Úvod */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Úvod: Interactive Brokers pro České Investory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Interactive Brokers (IB) je americký broker s více než 40letou historií (založen 1977). 
              Světově je známý jako broker pro profesionály a instituce, ale v posledních letech se otevřel i drobným investorům 
              tím, že snížil poplatky a zrušil minimální vklad i měsíční poplatky.
            </p>
            <p className="text-gray-700 leading-relaxed">
              IB nabízí bezkonkurenčně širokou paletu trhů a instrumentů – přístup na více než 100 burz ve 30 zemích. 
              Kromě akcií a ETF umožňuje obchodovat opce, futures, forex, dluhopisy, podílové fondy, CFD atd.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Klíčová výhoda:</strong> IB je "direct market access" broker – klientské pokyny odesílá přímo na trh, 
                neobchoduje proti klientům, což zaručuje nejférověji možné ceny.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Globální dosah */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-6 w-6 mr-2 text-green-600" />
              Globální dosah a nabídka
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Trhy a burzy:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    100+ burz ve 30 zemích
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    USA, Evropa, Asie, Austrálie
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Přímý přístup k likviditě
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Nejúžší spready na trhu
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Instrumenty:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Akcie a ETF globálně
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Opce a futures
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Státní dluhopisy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Forex spot a CFD
                  </li>
                </ul>
              </div>
            </div>
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
                    SEC (USA) + národní regulátoři EU
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Pobočky v Irsku a Maďarsku
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Pojištění 20k EUR (Irsko) / 100k EUR (Maďarsko)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Finanční síla:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Veřejně obchodovaná společnost (NASDAQ)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    40+ let na trhu
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Segregované účty
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    SIPC pojištění pro US aktiva
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Důležité:</strong> IB má silnou finanční pozici a přísnou regulaci. 
                Klientské prostředky jsou plně oddělené a chráněné podle nejvyšších standardů.
              </p>
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
                  <TableCell className="font-medium">US akcie/ETF</TableCell>
                  <TableCell className="text-green-600">$0.0035/akcie (min. $0.35)</TableCell>
                  <TableCell className="text-sm">Velmi levný pro větší objemy</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">EU akcie/ETF</TableCell>
                  <TableCell className="text-green-600">0.05% (min. €3)</TableCell>
                  <TableCell className="text-sm">Konkurenceschopné pro větší obchody</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">České akcie</TableCell>
                  <TableCell>0.3% (min. 300 Kč)</TableCell>
                  <TableCell className="text-sm">Lepší koupit přes Xetru</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Opce</TableCell>
                  <TableCell className="text-green-600">$0.65/kontrakt (min. $1)</TableCell>
                  <TableCell className="text-sm">Nejlevnější na trhu</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Měnová konverze</TableCell>
                  <TableCell className="text-green-600 font-bold">~0.02% (min. $2)</TableCell>
                  <TableCell className="text-sm">Prakticky mezibankovní kurz</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vklady/výběry</TableCell>
                  <TableCell className="text-green-600 font-medium">Zdarma</TableCell>
                  <TableCell className="text-sm">Bankovní převody</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Market data</TableCell>
                  <TableCell className="text-yellow-600">~$10-15/měsíc</TableCell>
                  <TableCell className="text-sm">Živé ceny podle burz</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Neaktivita</TableCell>
                  <TableCell className="text-green-600 font-medium">Zrušeno</TableCell>
                  <TableCell className="text-sm">Od roku 2021</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Výhoda:</strong> IB má nejlepší měnové konverze na trhu - prakticky bez marže. 
                Multi-měnový účet umožňuje držet více měn současně.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Platformy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 mr-2 text-purple-600" />
              Obchodní platformy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-blue-700">Trader Workstation (TWS):</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Profesionální desktopová aplikace</li>
                  <li>• Stovky funkcí a modulů</li>
                  <li>• API pro automatizaci</li>
                  <li>• Pokročilé analýzy</li>
                  <li className="text-red-600">• Složité pro začátečníky</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-green-700">Client Portal & IBKR Desktop:</h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• Webová aplikace</li>
                  <li>• Jednodušší rozhraní</li>
                  <li>• Vhodné pro začátečníky</li>
                  <li>• Mobilní aplikace IBKR</li>
                  <li>• Postupné modernizace</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-700 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Nevýhoda: Absence češtiny
              </h4>
              <p className="text-yellow-800 text-sm">
                Všechny platformy IB jsou pouze v angličtině. Pro investory bez znalosti angličtiny 
                představuje jazyková bariéra zásadní překážku.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">Speciální funkce:</h4>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• Paper Trading (demo s reálnými daty)</li>
                <li>• PortfolioAnalyst (detailní reporty)</li>
                <li>• Stock lending program</li>
                <li>• Margin trading s nízkými úroky</li>
                <li>• Algoritmické pokyny</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Daňové aspekty */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daňové aspekty pro české investory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Výhoda: Optimální zdanění
                </h4>
                <p className="text-green-800 text-sm">
                  IB umožňuje elektronické vyplnění W-8BEN (americké dividendy 15%) a dokonce zvládá 
                  i české dividendy na standardní 15% sazbě (světlá výjimka mezi zahraničními brokery).
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zdroj dividend</TableHead>
                    <TableHead>Srážková daň u IBKR</TableHead>
                    <TableHead>Srovnání s konkurencí</TableHead>
                    <TableHead>Výhoda</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>České akcie</TableCell>
                    <TableCell className="text-green-600">15%</TableCell>
                    <TableCell className="text-red-600">35% (jiní zahraniční)</TableCell>
                    <TableCell className="text-green-600">Velká</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Americké akcie</TableCell>
                    <TableCell className="text-green-600">15%</TableCell>
                    <TableCell className="text-green-600">15% (standardně)</TableCell>
                    <TableCell className="text-gray-600">Standardní</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Německé akcie</TableCell>
                    <TableCell>26,375%</TableCell>
                    <TableCell>26,375%</TableCell>
                    <TableCell className="text-gray-600">Stejné</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Daňové reporty:</h4>
                <p className="text-blue-800 text-sm">
                  IB poskytuje vynikající reporting - detailní přehledy všech obchodů a dividend 
                  s možností exportu do Excel. Bohužel pouze v angličtině a cizích měnách.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zákaznická podpora */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-600" />
              Zákaznická podpora
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                Nevýhoda: Pouze anglická podpora
              </h4>
              <p className="text-red-800 text-sm">
                Veškerá komunikace probíhá v angličtině. Call centrum v Budapešti, 
                bezplatná linka pro EU, ale žádná česká lokalizace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Dostupné kanály:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Telefon 24/7 (anglicky)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Online chat v platformě
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    E-mail podpora
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Callback služba
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Self-service:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Rozsáhlá dokumentace
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Video návody
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Komunitní fóra
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Trader Academy
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-700 mb-2">Alternativa pro češtinu:</h4>
              <p className="text-yellow-800 text-sm">
                Lynx Broker nabízí platformu IBKR s českou podporou, ale za cenu vyšších poplatků (min. €5/obchod).
              </p>
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
                  <TableHead>Interactive Brokers</TableHead>
                  <TableHead>XTB</TableHead>
                  <TableHead>DEGIRO</TableHead>
                  <TableHead>Fio eBroker</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nabídka instrumentů</TableCell>
                  <TableCell className="text-green-600">Nejširší (vše)</TableCell>
                  <TableCell className="text-yellow-600">Akcie, ETF, CFD</TableCell>
                  <TableCell className="text-yellow-600">Akcie, ETF, omezené opce</TableCell>
                  <TableCell className="text-red-600">Akcie, ETF, dluhopisy</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Poplatky (malé obchody)</TableCell>
                  <TableCell className="text-yellow-600">Nízké (ne nulové)</TableCell>
                  <TableCell className="text-green-600">0% do 100k EUR</TableCell>
                  <TableCell className="text-yellow-600">Nízké</TableCell>
                  <TableCell className="text-red-600">Vysoké (0,35%)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Poplatky (velké obchody)</TableCell>
                  <TableCell className="text-green-600">Nejnižší</TableCell>
                  <TableCell className="text-yellow-600">0,2% nad limit</TableCell>
                  <TableCell className="text-yellow-600">Procentní</TableCell>
                  <TableCell className="text-red-600">Vysoké</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Měnové konverze</TableCell>
                  <TableCell className="text-green-600">~0,02%</TableCell>
                  <TableCell className="text-red-600">0,5%</TableCell>
                  <TableCell className="text-green-600">Zdarma CZK/EUR</TableCell>
                  <TableCell className="text-red-600">Dle banky</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Česká podpora</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-green-600">Ano 24/7</TableCell>
                  <TableCell className="text-yellow-600">Částečná</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Složitost platformy</TableCell>
                  <TableCell className="text-red-600">Vysoká</TableCell>
                  <TableCell className="text-green-600">Nízká</TableCell>
                  <TableCell className="text-yellow-600">Střední</TableCell>
                  <TableCell className="text-yellow-600">Střední</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Multi-měnový účet</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-yellow-600">Omezené</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Zkušenosti uživatelů */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Zkušenosti českých investorů</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-3">Pozitivní ohlasy:</h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• "Zlatý standard" pro seriózní investování</li>
                  <li>• Nejlepší ceny a nejnižší náklady</li>
                  <li>• Maximální bezpečnost a stabilita</li>
                  <li>• Úspory na měnových konverzích</li>
                  <li>• Přístup k derivátům a dluhopisům</li>
                  <li>• Profesionální nástroje a analýzy</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-700 mb-3">Kritické připomínky:</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Složitá registrace a ověření</li>
                  <li>• Komplikované TWS rozhraní</li>
                  <li>• Absence češtiny všude</li>
                  <li>• Poplatky za živá data</li>
                  <li>• Převody do zahraničí</li>
                  <li>• Není pro úplné začátečníky</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Typický vývoj:</h4>
              <p className="text-blue-800 text-sm">
                Mnoho investorů začíná u jednoduššího brokera (XTB, Trading 212) a postupně přechází k IBKR, 
                jak roste jejich portfolio a potřeba pokročilejších funkcí. Říká se: "Začni klidně jinde, ale 
                jednou pravděpodobně skončíš u Interactive Brokers."
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">Hodnocení od Finex.cz:</h4>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Přívětivost pro Čechy: 65% (kvůli jazyku)</li>
                <li>• Platforma: 85% (výborné funkce, ale složitost)</li>
                <li>• Poplatky: 95% (nejlevnější pro větší objemy)</li>
                <li>• Bezpečnost: 98% (nejvyšší standard)</li>
              </ul>
            </div>
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
                    <span className="text-sm">Nejširší nabídka trhů a instrumentů</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Nejnižší poplatky pro velké objemy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Excelentní měnové konverze (~0,02%)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Multi-měnový účet</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Maximální bezpečnost a stabilita</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Profesionální nástroje a API</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Hlavní nevýhody:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Žádná česká lokalizace ani podpora</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Složité platformy (TWS)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Poplatky za živá data</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Není pro úplné začátečníky</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Komplikovanější registrace</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Pomalé bankovní převody do zahraničí</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho je Interactive Brokers nejvhodnější:</h4>
              <p className="text-blue-700 text-sm mb-4">
                IBKR je ideální pro vážné investory a tradery, kteří plánují investovat větší objemy peněz, 
                chtějí přístup ke všem světovým trhům a možná v budoucnu využijí pokročilé instrumenty (opce, futures). 
                Technicky zdatní jedinci, kterým nevadí angličtina a složitější software.
              </p>
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho IBKR není vhodné:</h4>
              <p className="text-blue-700 text-sm">
                Úplní nováčci s malým kapitálem, kteří se chtějí jen naučit základy investování do ETF. 
                Investoři bez znalosti angličtiny nebo ti, kteří preferují jednoduchost před šíří možností.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Závěrečné doporučení:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Interactive Brokers je nejlepší volba pro náročné investory, kteří požadují absolutní kvalitu, 
                nejnižší náklady a neomezené možnosti. Není to broker pro každého - vyžaduje určitou technickou 
                zdatnost a znalost angličtiny. Ale pro ty, kdo se chtějí investování věnovat seriózně a dlouhodobě, 
                nabízí IBKR nepřekonatelnou kombinaci bezpečnosti, funkcí a nízkých nákladů. 
                Jak říká investiční komunita: "IBKR je nejlepší broker... pokud víte, jak ho používat."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation to related content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Srovnání brokerů</h3>
              <p className="text-sm text-gray-600 mb-4">
                Porovnejte Interactive Brokers s ostatními brokery dostupnými v České republice
              </p>
              <Link 
                to="/kde-koupit-etf" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Srovnání všech brokerů →
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Alternativy pro začátečníky</h3>
              <p className="text-sm text-gray-600 mb-4">
                Pokud je IBKR příliš složité, podívejte se na uživatelsky přívětivější alternativy
              </p>
              <Link 
                to="/xtb-recenze" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Recenze XTB →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default IBKRReview;