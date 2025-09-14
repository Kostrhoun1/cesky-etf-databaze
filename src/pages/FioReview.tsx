import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertTriangle, Star, Shield, TrendingUp, ArrowLeft, Globe, Users, Zap, Target, Award, MapPin, Building } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';

const FioReview = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": "Fio e-Broker",
      "description": "Český broker s bankovním zázemím a plnou lokalizací"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "3.9",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz"
    },
    "reviewBody": "Hodnocení tradičního českého brokera Fio e-Broker pro české investory"
  };

  return (
    <Layout>
      <SEOHead
        title="Fio e-Broker recenze 2025: Hodnocení českého brokera | ETF průvodce.cz"
        description="Detailní recenze Fio e-Broker - český broker s bankovním zázemím. Poplatky, výhody pro české akcie, podpora v češtině. Hodnocení 3.9/5."
        canonical="https://etfpruvodce.cz/fio-ebroker-recenze"
        keywords="Fio e-Broker recenze, Fio broker zkušenosti, Fio poplatky, český broker, Fio banka investování"
        schema={reviewSchema}
        ogImage="https://etfpruvodce.cz/og-fio-review.jpg"
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
            Detailní Recenze Fio e-Broker
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Tradiční český broker s bankovním zázemím
          </p>
          <div className="flex justify-center items-center mt-6 gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-5 w-5 mr-2 fill-current text-yellow-500" />
              3.9/5
            </Badge>
            <Badge className="bg-blue-600 text-lg px-4 py-2">
              Česká banka
            </Badge>
          </div>
        </div>

        {/* Úvod */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Úvod: Fio e-Broker pro České Investory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Fio e-Broker je online investiční platforma od Fio banky, jednoho z největších českých retailových brokerů. 
              Fio banka vstoupila na trh obchodování s cennými papíry už v 90. letech a e-Broker provozuje od roku 1997.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Jde tedy o tradičního českého brokera s dlouhou historií a plnou regulací ČNB. 
              Velkou výhodou je, že jako česká banka poskytuje kompletní servis v češtině a pobočkovou síť – 
              investiční účet lze zřídit na ~90 pobočkách Fio po celé ČR.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Klíčová výhoda:</strong> Jako jediný regulovaný broker v ČR umožňuje retail investorům 
                koupit americká ETF (SPY, QQQ, Vanguard ETF atd.).
              </p>
            </div>
          </CardContent>
        </Card>

        {/* České zázemí */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-green-600" />
              České bankovní zázemí
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Pobočková síť:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    ~90 poboček po celé ČR
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Osobní konzultace s investičními specialisty
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Řešení dědictví a složitějších situací
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Propojení s bankovními službami
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Regulace a bezpečnost:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Regulace ČNB (Česká národní banka)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Pojištění vkladů do 100 000 EUR
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Součást Fio banky (od 1993)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Dlouhá historie (od 1997)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nabídka instrumentů */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 mr-2 text-purple-600" />
              Nabídka investičních instrumentů
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-green-700">Dostupné instrumenty:</h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• České akcie (BCPP, RM-SYSTÉM)</li>
                  <li>• Americké akcie (NYSE, NASDAQ, OTC)</li>
                  <li>• Evropské akcie (Xetra, FWB, GPW)</li>
                  <li>• ETF včetně amerických (800+ fondů)</li>
                  <li>• České a zahraniční dluhopisy</li>
                  <li>• Podílové fondy</li>
                  <li>• Investiční certifikáty a warranty</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-red-700">Nenabízí:</h4>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• Opce a futures</li>
                  <li>• CFD obchodování</li>
                  <li>• Forex trading</li>
                  <li>• Kryptoměny</li>
                  <li>• Intradenní margin trading</li>
                  <li>• Automatické investiční plány</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">Unikátní výhoda:</h4>
              <p className="text-purple-800 text-sm">
                Fio jako jeden z mála umožňuje českému retail investorovi nakoupit přímo americká ETF 
                (SPY, QQQ, všechny ETF od Vanguardu) - na vlastní zodpovědnost investora po odsouhlasení varování.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Poplatky */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Přehled klíčových poplatků</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Burza/Instrument</TableHead>
                  <TableHead>Poplatek</TableHead>
                  <TableHead>Poznámky</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">České akcie (BCPP)</TableCell>
                  <TableCell className="text-red-600">0,35% (min. 40 Kč, max. 1190 Kč)</TableCell>
                  <TableCell className="text-sm">Vysoké pro malé obchody</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">US akcie</TableCell>
                  <TableCell className="text-red-600">$7,95-9,95 za obchod</TableCell>
                  <TableCell className="text-sm">Podle počtu akcií (100ks hranice)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Německé akcie (Xetra)</TableCell>
                  <TableCell className="text-red-600">0,15% (min. €9,95)</TableCell>
                  <TableCell className="text-sm">Plus €10 pro XFRA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ETF (všechny burzy)</TableCell>
                  <TableCell className="text-red-600">Stejné jako akcie</TableCell>
                  <TableCell className="text-sm">Žádné speciální sazby</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dluhopisy</TableCell>
                  <TableCell className="text-yellow-600">0,1% (min. 40 Kč)</TableCell>
                  <TableCell className="text-sm">Fio dluhopisy zdarma</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Podílové fondy</TableCell>
                  <TableCell className="text-green-600">Zdarma*</TableCell>
                  <TableCell className="text-sm">*Při dodržení podmínek (3 roky)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Měnové konverze</TableCell>
                  <TableCell className="text-red-600">~1-2% skrytě</TableCell>
                  <TableCell className="text-sm">Kurzová marže Fio banky</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vedení účtu</TableCell>
                  <TableCell className="text-green-600 font-medium">Zdarma</TableCell>
                  <TableCell className="text-sm">Žádné měsíční poplatky</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Realtime data</TableCell>
                  <TableCell className="text-red-600">780 Kč/měsíc</TableCell>
                  <TableCell className="text-sm">Fio Streamer aplikace</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Upozornění:</strong> Každý poplatek platí za nákup i prodej zvlášť. 
                Kompletní round-trip (nákup + prodej) stojí dvojnásobek uvedených částek.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Platforma */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-6 w-6 mr-2 text-orange-600" />
              Platforma a uživatelská přívětivost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-700 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Hlavní nevýhoda: Zastaralá platforma
              </h4>
              <p className="text-yellow-800 text-sm">
                E-Broker funguje od roku 1997 a na vzhledu to je znát. Rozhraní tvoří hlavně tabulky 
                s údaji a textové nabídky - žádné moderní vizualizace nebo interaktivní prvky.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Webová aplikace:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Funguje v prohlížeči
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Stabilní a rychlá
                  </li>
                  <li className="flex items-center">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    Zastaralý design
                  </li>
                  <li className="flex items-center">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    Neintuitivní navigace
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Mobilní aplikace:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Smartbroker pro Android/iOS
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Základní funkce dostupné
                  </li>
                  <li className="flex items-center">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    Také zastaralá
                  </li>
                  <li className="flex items-center">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    Pomalá a občas padá
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Analýzy a grafy:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Velmi základní kurzové grafy bez pokročilých indikátorů</li>
                <li>• Fundamentální data o společnostech dostupná (ale skrytá)</li>
                <li>• Žádné screening nástroje v reálném čase</li>
                <li>• Nutné ruční nastavení "Plného zobrazení" pro všechny funkce</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Hodnocení Finex.cz:</h4>
              <p className="text-blue-800 text-sm">
                "Uživatelské rozhraní je neintuitivní a zastaralé" - platforma působí jako z 90. let, 
                ale je stabilní a "má vše, co je potřeba, bez zbytečností".
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
                  Největší výhoda: České dividendy
                </h4>
                <p className="text-green-800 text-sm">
                  Fio jako český subjekt strhává pouze 15% daň z českých dividend a tato srážka je konečná - 
                  nemusíte nic uvádět do daňového přiznání.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Výhoda: Americké dividendy
                </h4>
                <p className="text-green-800 text-sm">
                  Fio vyžaduje vyplnění W-8BEN při zřízení účtu, takže americké dividendy jsou zdaněny pouze 15% 
                  (místo 30%). Tuto daň si lze započíst v českém přiznání.
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zdroj dividend</TableHead>
                    <TableHead>Srážková daň u Fio</TableHead>
                    <TableHead>Srovnání se zahraničními</TableHead>
                    <TableHead>Výhoda</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>České akcie</TableCell>
                    <TableCell className="text-green-600">15% (konečná)</TableCell>
                    <TableCell className="text-red-600">35% (XTB, DEGIRO)</TableCell>
                    <TableCell className="text-green-600">Velká</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Americké akcie</TableCell>
                    <TableCell className="text-green-600">15%</TableCell>
                    <TableCell className="text-green-600">15% (standardně)</TableCell>
                    <TableCell className="text-gray-600">Stejné</TableCell>
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
                <h4 className="font-semibold text-blue-700 mb-2">Kapitálové zisky a reporty:</h4>
                <p className="text-blue-800 text-sm">
                  Fio poskytuje výpisy v Kč s přepočtem podle kurzů ČNB, což usnadňuje daňové přiznání. 
                  Roční soupisky obchodů obsahují zisky/ztráty v Kč.
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
              <h4 className="font-semibold text-green-700 mb-2">Tady Fio exceluje:</h4>
              <p className="text-green-800 text-sm">
                Jako česká banka nabízí podporu plně v češtině a mnoha kanály. Můžete využít telefonickou infolinku, 
                e-mail, a hlavně můžete zajít osobně na pobočku a tam s vámi investiční specialista probere, co potřebujete.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Dostupné kanály:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    ~90 poboček po celé ČR
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Telefonická infolinka
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    E-mailová podpora
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Chat v internetovém bankovnictví
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Kvalita podpory:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Rychlé a profesionální odpovědi
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Dealing centrum s odborníky
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Pomoc s daňovými otázkami
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    Jen v pracovní dny 8-18h
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">100% lokalizace:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Celá platforma e-Broker v češtině</li>
                <li>• Smlouvy a dokumentace v češtině</li>
                <li>• Daňové výpisy a reporty v Kč</li>
                <li>• Osobní konzultace na pobočkách</li>
                <li>• Podpora také slovensky</li>
              </ul>
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
                  <TableHead>Fio e-Broker</TableHead>
                  <TableHead>XTB</TableHead>
                  <TableHead>Interactive Brokers</TableHead>
                  <TableHead>Trading 212</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Poplatky za akcie/ETF</TableCell>
                  <TableCell className="text-red-600">Vysoké (0,35%, $8-10)</TableCell>
                  <TableCell className="text-green-600">0% do 100k EUR</TableCell>
                  <TableCell className="text-yellow-600">Velmi nízké</TableCell>
                  <TableCell className="text-green-600">0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">České akcie (daň)</TableCell>
                  <TableCell className="text-green-600">15% (optimální)</TableCell>
                  <TableCell className="text-red-600">35%</TableCell>
                  <TableCell className="text-green-600">15%</TableCell>
                  <TableCell className="text-red-600">Nenabízí</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Americká ETF</TableCell>
                  <TableCell className="text-green-600">Ano (unikátní)</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-red-600">Ne (retail)</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Česká podpora</TableCell>
                  <TableCell className="text-green-600">Nejlepší + pobočky</TableCell>
                  <TableCell className="text-green-600">Ano 24/7</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                  <TableCell className="text-red-600">Ne</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Platforma</TableCell>
                  <TableCell className="text-red-600">Zastaralá</TableCell>
                  <TableCell className="text-green-600">Moderní</TableCell>
                  <TableCell className="text-yellow-600">Komplexní</TableCell>
                  <TableCell className="text-green-600">Jednoduchá</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vhodnost pro</TableCell>
                  <TableCell className="text-blue-600">České akcie, větší objemy</TableCell>
                  <TableCell className="text-blue-600">Začátečníci, malé objemy</TableCell>
                  <TableCell className="text-blue-600">Pokročilí, velké objemy</TableCell>
                  <TableCell className="text-blue-600">Začátečníci, auto-invest</TableCell>
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
                  <li>• "Spolehlivost a důvěryhodnost české banky"</li>
                  <li>• Transparentní ceník (vysoké, ale jasné poplatky)</li>
                  <li>• Stabilita platformy i v krizích</li>
                  <li>• Výborná podpora s lidským přístupem</li>
                  <li>• Osobní jednání na pobočkách</li>
                  <li>• Jednoduché propojení s bankovnictvím</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-700 mb-3">Kritické připomínky:</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• "Jedny z nejvyšších poplatků na trhu"</li>
                  <li>• Platforma "jak z minulého století"</li>
                  <li>• Nevhodné pro pravidelné malé investice</li>
                  <li>• Pomalá a padající mobilní aplikace</li>
                  <li>• Absurdní cena za realtime data (780 Kč)</li>
                  <li>• Chybí moderní funkce (auto-invest)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Typické využití:</h4>
              <p className="text-blue-800 text-sm">
                Mnoho investorů používá Fio kombinačně - české akcie kvůli 15% dani u Fio, 
                zahraniční portfolio u levnějších brokerů. "Fio jen na české akcie, jinak raději DEGIRO/XTB."
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">Hodnocení od Finex.cz:</h4>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Celkové hodnocení: 78% (Favorit redakce 2025)</li>
                <li>• "Jedny z nejvyšších poplatků na trhu"</li>
                <li>• "Nemá smysl pro pravidelné investování malých částek"</li>
                <li>• Doporučeno pro specifické potřeby</li>
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
                    <span className="text-sm">České bankovní zázemí a důvěryhodnost</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Optimální zdanění českých dividend (15%)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Pobočková síť a osobní konzultace</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">100% lokalizace do češtiny</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Americká ETF pro retail (unikátní)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Žádné poplatky za vedení účtu</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Hlavní nevýhody:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Jedny z nejvyšších poplatků na trhu</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Zastaralá platforma a mobilní aplikace</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Nevhodné pro pravidelné malé investice</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Vysoké poplatky za měnové konverze</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Chybí moderní funkce (auto-invest, pokročilé grafy)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                    <span className="text-sm">Omezená nabídka derivátů</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho je Fio e-Broker nejvhodnější:</h4>
              <p className="text-blue-700 text-sm mb-4">
                Fio e-Broker je ideální pro konzervativní české investory, kteří upřednostňují bezpečí a podporu 
                domácí banky před nejnižšími cenami. Zejména pro investice do českých akcií (kvůli 15% dani), 
                větší jednorázové investice a ty, kdo chtějí americká ETF.
              </p>
              <h4 className="font-semibold text-blue-800 mb-3">Pro koho Fio není vhodné:</h4>
              <p className="text-blue-700 text-sm">
                Nevhodné pro pravidelné investory s malými částkami (DCA strategie), mladé investory preferující 
                moderní UI, aktivní tradery a ty, kdo chtějí minimalizovat poplatky za každou cenu.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Závěrečné doporučení:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Fio e-Broker je specifický nástroj - není pro každého, ale své místo na trhu má. 
                Je to nejlepší volba pro investory, kteří chtějí zůstat "doma" v českém prostředí s českou podporou. 
                Jeho síla je v jednoduchosti propojení s bankou a v tom, že nabízí to, co mezinárodní brokeři ne 
                (české akcie s 15% daní, americká ETF pro retail). Za tuto lokalitu se ale platí vyššími poplatky 
                a zastaralou platformou. Ideální pro kombinační použití - české akcie u Fio, zbytek jinde.
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
                Porovnejte Fio e-Broker s ostatními brokery dostupnými v České republice
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
              <h3 className="font-semibold mb-3">Levnější alternativy</h3>
              <p className="text-sm text-gray-600 mb-4">
                Pokud jsou poplatky Fio příliš vysoké, podívejte se na levnější možnosti
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

export default FioReview;