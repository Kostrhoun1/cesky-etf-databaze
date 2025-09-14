import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertTriangle, Star, Shield, TrendingUp, ArrowLeft, Globe, Users, Zap } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import { generateBrokerSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';

const XTBReview = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema("XTB"),
      generateBreadcrumbSchema("XTB")
    ]
  };
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": "XTB",
      "description": "Online broker pro investování do ETF a akcií s českým zázemím"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.7",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz"
    },
    "reviewBody": "Komplexní hodnocení brokera XTB pro české investory s plnou českou podporou"
  };

  return (
    <Layout>
      <SEOHead
        title={`XTB recenze ${currentYear}: Komplexní hodnocení pro české investory | ETF průvodce.cz`}
        description={`Detailní XTB recenze ${currentYear} - poplatky, česká podpora, xStation platforma, vzdělávání. Nejlepší broker pro začátečníky? Hodnocení 4.7/5.`}
        canonical="https://etfpruvodce.cz/xtb-recenze"
        keywords={`XTB recenze ${currentYear}, XTB hodnocení, XTB Česká republika, XTB zkušenosti, xStation platforma, broker pro začátečníky`}
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
        ogImage="https://etfpruvodce.cz/og-xtb-review.jpg"
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
            Detailní Recenze Brokera XTB
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kompletní hodnocení z pohledu českého investora
          </p>
          <div className="flex justify-center items-center mt-6 gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-5 w-5 mr-2 fill-current text-yellow-500" />
              4.7/5
            </Badge>
            <Badge className="bg-green-600 text-lg px-4 py-2">
              Top volba
            </Badge>
          </div>
        </div>

        {/* Úvod */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Úvod: XTB pro České Investory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              XTB (X-Trade Brokers) je původem polský broker, který si v Evropě vybudoval silnou pozici (působí od roku 2002) a má pobočku i v České republice. 
              Historicky se zaměřoval na CFD obchodování, ale dnes nabízí i reálné akcie a ETF k dlouhodobému investování.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Pro české investory je XTB atraktivní zejména díky kompletní lokalizaci do češtiny, kvalitní zákaznické podpoře 
              a zejména nulovým poplatkům za obchody s akciemi a ETF až do objemu 100 000 EUR měsíčně.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Hlavní výhoda:</strong> XTB nabízí přes 6 100 instrumentů a umožňuje nakupovat frakční akcie/ETF od pár set korun.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Klíčové funkce */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-6 w-6 mr-2 text-purple-600" />
              Klíčové funkce a možnosti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Investiční nástroje:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Fyzické akcie a ETF
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Frakční akcie od 10 EUR
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Investiční plány (AutoInvest)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    CFD na forex, komodity, indexy
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Podpora a lokalizace:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    100% čeština (platforma, podpora)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Česká pobočka a telefonní linka 24/7
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Demo účet s virtuálním zůstatkem
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Vzdělávací materiály v češtině
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
                    Licencovaný broker v EU
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Veřejně obchodovaná společnost (Varšava)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Pojištění vkladů do 20 000 EUR
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Ochrana prostředků:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Segregované účty
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Žádný minimální vklad
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Více měnových subúčtů
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Důležité:</strong> XTB je veřejně obchodovaná firma s transparentními financemi a dlouhou historií (od 2002).
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
                  <TableCell className="font-medium">Akcie a ETF</TableCell>
                  <TableCell className="text-green-600 font-bold">0 EUR</TableCell>
                  <TableCell className="text-sm">Do měsíčního objemu 100 000 EUR</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Akcie a ETF nad limit</TableCell>
                  <TableCell>0,2% (min. 10 EUR)</TableCell>
                  <TableCell className="text-sm">Při překročení 100k EUR/měsíc</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Měnová konverze</TableCell>
                  <TableCell className="text-yellow-600">0,5%</TableCell>
                  <TableCell className="text-sm">Transparentní přirážka k tržnímu kurzu</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vklady/výběry</TableCell>
                  <TableCell className="text-green-600 font-medium">Zdarma</TableCell>
                  <TableCell className="text-sm">Bankovní převody, výběry nad 3000 Kč</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Poplatek za neaktivitu</TableCell>
                  <TableCell>10 EUR/měsíc</TableCell>
                  <TableCell className="text-sm">Po 12 měsících bez obchodu/vkladu</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Custody fee</TableCell>
                  <TableCell>0,2% ročně</TableCell>
                  <TableCell className="text-sm">Pouze pro portfolia nad 250 000 EUR</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Tip:</strong> Zkušení investoři vedou účet v EUR a koruny smění výhodněji přes Revolut (~0,1% marže), 
                poté obchodují bez poplatků za konverzi.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Platforma a aplikace */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-6 w-6 mr-2 text-purple-600" />
              Platforma xStation 5 a mobilní aplikace
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Webová platforma:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Moderní a přehledný design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Rychlá odezva a stabilita
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Pokročilé grafy a analýzy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Fundamentální data (P/E, P/S)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Mobilní aplikace:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Intuitivní ovládání
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Stejné funkce jako web
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Push notifikace
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Kompletně v češtině
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Hodnocení Finex.cz:</strong> Obchodní platforma XTB získala 95% ze 100% - patří k nejlepším na trhu.
              </p>
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
                  Výhoda: Americké dividendy
                </h4>
                <p className="text-green-800 text-sm">
                  XTB umožňuje elektronické vyplnění formuláře W-8BEN, což snižuje srážkovou daň z amerických dividend z 30% na 15%.
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                  <XCircle className="h-4 w-4 mr-2" />
                  Nevýhoda: České dividendy
                </h4>
                <p className="text-red-800 text-sm">
                  Dividendy z českých akcií jsou zatíženy srážkovou daní 35% (místo standardních 15% u českého brokera). 
                  Důvodem je, že XTB sídlí mimo ČR.
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zdroj dividend</TableHead>
                    <TableHead>Srážková daň u XTB</TableHead>
                    <TableHead>Srážková daň u CZ brokera</TableHead>
                    <TableHead>Rozdíl</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>České akcie</TableCell>
                    <TableCell className="text-red-600">35%</TableCell>
                    <TableCell className="text-green-600">15%</TableCell>
                    <TableCell className="text-red-600">+20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Americké akcie</TableCell>
                    <TableCell className="text-green-600">15%</TableCell>
                    <TableCell className="text-green-600">15%</TableCell>
                    <TableCell className="text-gray-600">0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Německé akcie</TableCell>
                    <TableCell>26,375%</TableCell>
                    <TableCell>26,375%</TableCell>
                    <TableCell className="text-gray-600">0%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-700 mb-2">Kapitálové zisky:</h4>
                <p className="text-yellow-800 text-sm">
                  XTB nijak nezdaňuje příjmy z prodeje akcií/ETF. Daň 15% z realizovaných zisků si řeší investor sám 
                  v českém daňovém přiznání (pokud nevyužije osvobození pro cenné papíry držené 3 roky).
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
              Zákaznická podpora a lokalizace
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Excelentní lokální podpora:</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Česká pobočka a telefonní linka 24/7</li>
                <li>• Online chat v češtině</li>
                <li>• E-mailové dotazy zodpovězeny během několika hodin</li>
                <li>• Odborná pomoc s daňovými aspekty</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Kompletní lokalizace:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Web a platforma 100% česky
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Smlouvy a dokumentace v češtině
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Vzdělávací materiály v češtině
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    České webináře a semináře
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Vzdělávání:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Video návody k platformě
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Analýzy a tržní komentáře
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Webináře o základech investování
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    FAQ v češtině
                  </li>
                </ul>
              </div>
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
                  <TableHead>XTB</TableHead>
                  <TableHead>DEGIRO</TableHead>
                  <TableHead>Interactive Brokers</TableHead>
                  <TableHead>Fio eBroker</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Poplatky za akcie/ETF</TableCell>
                  <TableCell className="text-green-600">0% do 100k EUR</TableCell>
                  <TableCell className="text-yellow-600">~0,5€ + 0,04%</TableCell>
                  <TableCell className="text-yellow-600">$0,005/akcie</TableCell>
                  <TableCell className="text-red-600">0,35% (min. 40 Kč)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Frakční akcie</TableCell>
                  <TableCell className="text-green-600">Ano (od 10 EUR)</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Měnová konverze</TableCell>
                  <TableCell className="text-yellow-600">0,5%</TableCell>
                  <TableCell className="text-green-600">Zdarma CZK/EUR</TableCell>
                  <TableCell className="text-green-600">~0,02%</TableCell>
                  <TableCell className="text-red-600">Dle kurzu banky</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Česká podpora</TableCell>
                  <TableCell className="text-green-600">Ano 24/7</TableCell>
                  <TableCell className="text-yellow-600">Částečná</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Demo účet</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Investiční plány</TableCell>
                  <TableCell className="text-green-600">Ano</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
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
                  <li>• Rychlé zpracování vkladů/výběrů</li>
                  <li>• Okamžité řešení problémů přes telefon</li>
                  <li>• Stabilita platformy i při volatilních trzích</li>
                  <li>• Frakční akcie pro malé investory</li>
                  <li>• Investiční plány pro automatizaci</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-700 mb-3">Kritické připomínky:</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Dříve poplatek za malé výběry (vyřešeno)</li>
                  <li>• Chybí opce a futures</li>
                  <li>• Poplatek za neaktivitu (lze snadno vyhnout)</li>
                  <li>• Pokuta od polského regulátora (2018)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Hodnocení od Finex.cz:</h4>
              <p className="text-blue-800 text-sm">
                "Jeden z nejlepších brokerů pro moderní investování" - XTB získal redakční doporučení díky 
                kombinaci nulových poplatků, kvalitní platformy a české podpory.
              </p>
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
                    <span className="text-sm">Nulové poplatky za obchody (do 100k EUR/měsíc)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Excelentní česká podpora 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Moderní platforma xStation 5</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Frakční akcie a investiční plány</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Široká nabídka 6000+ instrumentů</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Hlavní nevýhody:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Nevýhodné zdanění českých dividend (35%)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Měnová konverze 0,5% (vyšší než konkurence)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Chybí opce a futures</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Poplatek za neaktivitu (10 EUR po roce)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Nenabízí americké ETF</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho je XTB nejvhodnější:</h4>
              <p className="text-blue-700 text-sm mb-4">
                XTB je ideální volbou pro začínající české investory, kteří chtějí levně investovat do globálních ETF a akcií 
                s možností pravidelného investování malých částek. Ocení jednoduchou platformu, českou podporu a nulové poplatky.
              </p>
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho XTB není vhodné:</h4>
              <p className="text-blue-700 text-sm">
                Méně vhodné pro investory zaměřené na české dividendové akcie (kvůli 35% dani), 
                pokročilé tradery potřebující deriváty nebo investory s velkými objemy nad 100k EUR měsíčně.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Závěrečné doporučení:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                XTB představuje vynikající volbu pro české začínající investory díky kombinaci nulových poplatků, 
                kvalitní lokalizace a spolehlivé podpory. Pro běžného českého investora do ETF a zahraničních akcií 
                je XTB pravděpodobně nejlepší startovací platformou na trhu - ušetří na poplatcích a může se soustředit 
                na budování portfolia s plnou podporou v mateřském jazyce.
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
                Porovnejte XTB s ostatními brokery dostupnými v České republice
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
              <h3 className="font-semibold mb-3">ETF průvodce</h3>
              <p className="text-sm text-gray-600 mb-4">
                Naučte se základy investování do ETF fondů
              </p>
              <Link 
                to="/co-jsou-etf" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Co jsou ETF fondy →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default XTBReview;