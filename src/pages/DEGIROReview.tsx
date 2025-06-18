
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertTriangle, Star, Shield, TrendingUp } from 'lucide-react';

const DEGIROReview = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hlavička */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Detailní Recenze Brokera DEGIRO
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Komplexní hodnocení z pohledu českého investora
          </p>
          <div className="flex justify-center items-center mt-6 gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-5 w-5 mr-2 fill-current text-yellow-500" />
              4.5/5
            </Badge>
            <Badge className="bg-green-600 text-lg px-4 py-2">
              Doporučeno
            </Badge>
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
                  <TableCell className="font-medium">Vybrané ETF</TableCell>
                  <TableCell>1 EUR</TableCell>
                  <TableCell className="text-sm">Jednou měsíčně zdarma, další transakce zdarma nad 1000 EUR</TableCell>
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
      </div>
    </Layout>
  );
};

export default DEGIROReview;
