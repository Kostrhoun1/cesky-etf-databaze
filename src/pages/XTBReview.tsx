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

        {/* Hero sekce s gradientem */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <img 
                src="/lovable-uploads/a7162820-5478-4cd8-9bfd-fd04b80a42ff.png" 
                alt="XTB logo" 
                className="w-8 h-8 mr-3 rounded-lg bg-white p-1"
              />
              <span className="font-medium">XTB Broker</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Detailní Recenze XTB
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Kompletní hodnocení polského brokera s českou podporou a nulovými poplatky za ETF
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="flex items-center text-yellow-300 mb-2">
                  <Star className="h-6 w-6 mr-2 fill-current" />
                  <span className="text-2xl font-bold">4.7</span>
                  <span className="text-lg ml-1">/5</span>
                </div>
                <div className="text-sm text-blue-100">Celkové hodnocení</div>
              </div>
              <div className="bg-green-500/90 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-lg font-bold mb-1">Top volba</div>
                <div className="text-sm text-green-100">Pro začátečníky</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-lg font-bold mb-1">0% poplatky</div>
                <div className="text-sm text-blue-100">Do 100k EUR/měsíc</div>
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
            <p className="text-sm text-gray-600">CySEC (EU) + ČNB (CZ)</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Podpora</h3>
            <p className="text-sm text-gray-600">Čeština 24/5</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Platformy</h3>
            <p className="text-sm text-gray-600">xStation 5, Web, Mobile</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Ochrana</h3>
            <p className="text-sm text-gray-600">100 000 EUR (EU)</p>
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

        {/* Poplatky s vylepšeným designem */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center text-xl">
              💰 Přehled klíčových poplatků pro české investory
            </CardTitle>
            <CardDescription>
              Detailní rozpis všech nákladů, které můžete očekávat při investování přes XTB
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold">Typ aktiva/poplatku</TableHead>
                    <TableHead className="font-bold text-center">Poplatek</TableHead>
                    <TableHead className="font-bold">Poznámky</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-green-50 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        Akcie a ETF
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                        0 EUR
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm py-4 text-gray-600">Do měsíčního objemu 100 000 EUR</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-yellow-50 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                        Akcie a ETF nad limit
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        0,2% (min. 10 EUR)
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm py-4 text-gray-600">Při překročení 100k EUR/měsíc</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-orange-50 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                        Měnová konverze
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className="bg-orange-500 text-white text-lg px-3 py-1">
                        0,5%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm py-4 text-gray-600">Transparentní přirážka k tržnímu kurzu</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-green-50 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        Vklady/výběry
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                        Zdarma
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm py-4 text-gray-600">Bankovní převody, výběry nad 3000 Kč</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-red-50 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        Poplatek za neaktivitu
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge className="bg-red-500 text-white text-lg px-3 py-1">
                        10 EUR/měsíc
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm py-4 text-gray-600">Po 12 měsících bez obchodu/vkladu</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-blue-50 transition-colors">
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        Custody fee
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        0,2% ročně
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm py-4 text-gray-600">Pouze pro portfolia nad 250 000 EUR</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-4 mt-0.5">
                    <span className="text-white font-bold text-sm">💡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Pro tip pro zkušené investory</h4>
                    <p className="text-sm text-green-800">
                      Vedení účtu v EUR a předchozí směna korun přes Revolut (~0,1% marže) vám umožní obchodovat 
                      zcela bez poplatků za konverzi měn.
                    </p>
                  </div>
                </div>
              </div>
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

        {/* CTA sekce s vylepšeným designem */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Připraveni začít investovat?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Porovnejte XTB s ostatními brokery nebo se dozvězte více o ETF investování
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/kde-koupit-etf"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Srovnat všechny brokery
              </Link>
              <Link 
                to="/co-jsou-etf"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Star className="h-5 w-5 mr-2" />
                Průvodce ETF investováním
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation to related content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-3">Další recenze brokerů</h3>
              <p className="text-sm text-gray-600 mb-4">
                Přečtěte si detailní recenze DEGIRO, Trading 212 a dalších brokerů
              </p>
              <Link 
                to="/kde-koupit-etf" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Všechny recenze →
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-3">ETF srovnávač</h3>
              <p className="text-sm text-gray-600 mb-4">
                Najděte nejlepší ETF fondy pro vaše portfolio pomocí našich filtrů
              </p>
              <Link 
                to="/srovnani-etf" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Srovnat ETF fondy →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-3">Začátečnický průvodce</h3>
              <p className="text-sm text-gray-600 mb-4">
                Naučte se základy ETF investování od prvního nákupu po portfolio
              </p>
              <Link 
                to="/co-jsou-etf" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Průvodce pro začátečníky →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default XTBReview;