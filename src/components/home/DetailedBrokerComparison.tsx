import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, X, Star, Shield, TrendingUp, Users, Calculator, FileText, CreditCard, Globe, Award, Info } from 'lucide-react';

const DetailedBrokerComparison: React.FC = () => {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);

  const brokers = [
    {
      id: 'degiro',
      name: 'DEGIRO',
      logo: '🟠',
      description: 'Populární broker s nízkými poplatky a širokou nabídkou ETF',
      rating: 4.5,
      regulation: 'BaFin (DE), DNB/AFM (NL)',
      protection: '100 000 EUR (DE), 20 000 EUR (investice)',
      etfFee: '1 EUR (Core), 3 EUR (ostatní)',
      managementFee: '0 EUR (roční popl. za burzy 2,5 EUR)',
      fxFee: 'CZK/EUR zdarma, ostatní 0,25%',
      fractional: false,
      czSupport: true,
      czDividends: '35% (možnost vratky 20%)',
      minDeposit: '0 EUR',
      platforms: ['Web', 'Android', 'iOS'],
      markets: ['EU', 'US', 'Asia'],
      etfCount: '3000+',
      languages: ['čeština', 'angličtina', 'němčina'],
      customerSupport: '9-17 (pracovní dny)',
      specialFeatures: ['Core ETF selection', 'Dividend reinvestment', 'Tax reports'],
      pros: [
        'Velmi nízké poplatky na ETF',
        'Bezplatná konverze CZK/EUR',
        'Široká nabídka UCITS ETF',
        'Česká zákaznická podpora'
      ],
      cons: [
        'Omezení kvůli PRIIPS dokumentaci',
        'Nepodporuje frakční ETF',
        'Vyšší zdanění českých dividend'
      ]
    },
    {
      id: 'xtb',
      name: 'XTB',
      logo: '🟡',
      description: 'Polský broker s výbornou českou podporou a vzdělávacími materiály',
      rating: 4.7,
      regulation: 'CySEC (EU), ČNB (CZ)',
      protection: '100 000 EUR (EU)',
      etfFee: '0% (do 100k EUR/měs.), pak 0,2%',
      managementFee: '0 EUR (možná 10 EUR/měs. za neaktivitu)',
      fxFee: '0,5%',
      fractional: true,
      czSupport: true,
      czDividends: '35%',
      minDeposit: '0 EUR',
      platforms: ['xStation 5', 'Web', 'Android', 'iOS'],
      markets: ['EU', 'US', 'UK'],
      etfCount: '400+',
      languages: ['čeština', 'polština', 'angličtina'],
      customerSupport: '24/5',
      specialFeatures: ['Fractional shares', 'Educational content', 'Real time data'],
      pros: [
        'Bezplatné ETF obchody do 100k EUR',
        'Frakční investování',
        'Výborná česká podpora',
        'Rozsáhlé vzdělávací materiály'
      ],
      cons: [
        'Vyšší poplatek za konverzi měn',
        'Vyšší zdanění českých dividend',
        'Poplatek za neaktivitu'
      ]
    },
    {
      id: 'fio',
      name: 'Fio e-Broker',
      logo: '🔵',
      description: 'Český broker s lokální podporou a standardním zdaněním českých dividend',
      rating: 4.0,
      regulation: 'ČNB (CZ)',
      protection: '100 000 EUR (CZ)',
      etfFee: '0,29-0,35% (CZ), 7,95-9,95 USD (US)',
      managementFee: '0 Kč',
      fxFee: 'Zdarma (dle kurzu banky)',
      fractional: false,
      czSupport: true,
      czDividends: '15%',
      minDeposit: '0 Kč',
      platforms: ['Web', 'Android', 'iOS'],
      markets: ['CZ', 'EU', 'US'],
      etfCount: '200+',
      languages: ['čeština'],
      customerSupport: '8-18 (pracovní dny)',
      specialFeatures: ['Czech dividend optimization', 'Free currency exchange', 'Local support'],
      pros: [
        'Česká společnost s lokální podporou',
        'Standardní 15% zdanění českých dividend',
        'Bezplatná konverze měn',
        'KID dokumentace v češtině'
      ],
      cons: [
        'Vyšší poplatky za ETF',
        'Technické problémy platformy',
        'Nepodporuje frakční ETF'
      ]
    },
    {
      id: 'trading212',
      name: 'Trading 212',
      logo: '🟢',
      description: 'Bezpoplatkový broker s intuitivní aplikací a frakčním investováním',
      rating: 4.2,
      regulation: 'FCA (UK), CySEC (EU), BaFin (DE)',
      protection: '85 000 £ (UK)',
      etfFee: '0%',
      managementFee: '0 EUR',
      fxFee: '0,15% (v aplikaci)',
      fractional: true,
      czSupport: false,
      czDividends: 'Standard (dle typu fondu)',
      minDeposit: '1 EUR',
      platforms: ['Web', 'Android', 'iOS'],
      markets: ['EU', 'US', 'UK'],
      etfCount: '1500+',
      languages: ['angličtina'],
      customerSupport: '24/7 (chat)',
      specialFeatures: ['Pie charts investing', 'Commission-free', 'AutoInvest'],
      pros: [
        'Zcela bezplatné obchodování',
        'Frakční investování od 1 £',
        'Intuitivní mobilní aplikace',
        'Automatizované investování (Pies)'
      ],
      cons: [
        'Omezená česká podpora',
        'Méně pokročilých analytických nástrojů',
        'Závislost na mobilní aplikaci'
      ]
    },
    {
      id: 'ibkr',
      name: 'Interactive Brokers',
      logo: '🟣',
      description: 'Globální broker s nejširší nabídkou a pokročilými nástroji',
      rating: 4.8,
      regulation: 'CBI (IE), SEC (US), FCA (UK), ČNB (CZ)',
      protection: '100 000 EUR (IE)',
      etfFee: '0 USD (US Lite), 0,0005-0,0035 USD/akcii (US Pro)',
      managementFee: '0 EUR',
      fxFee: '0,2% (min. 2 EUR)',
      fractional: true,
      czSupport: false,
      czDividends: '15%',
      minDeposit: '0 USD (2000 USD pro margin)',
      platforms: ['TWS', 'Web', 'Android', 'iOS', 'Desktop'],
      markets: ['Global - 150+ trhů'],
      etfCount: '7000+',
      languages: ['angličtina', 'němčina', 'francouzština'],
      customerSupport: '24/7',
      specialFeatures: ['Advanced analytics', 'Global markets', 'Professional tools'],
      pros: [
        'Nejširší nabídka trhů a ETF',
        'Velmi nízké poplatky',
        'Pokročilé analytické nástroje',
        'Standardní zdanění českých dividend'
      ],
      cons: [
        'Pouze anglická podpora',
        'Složitá platforma pro začátečníky',
        'Vyžaduje vyšší minimální vklad'
      ]
    }
  ];

  // ... keep existing code (comparisonData array)
  const comparisonData = [
    { feature: 'Regulace (hlavní)', degiro: 'BaFin (DE), DNB/AFM (NL)', xtb: 'CySEC (EU), ČNB (CZ)', fio: 'ČNB (CZ)', trading212: 'FCA (UK), CySEC (EU)', ibkr: 'CBI (IE), SEC (US)' },
    { feature: 'Ochrana hotovosti', degiro: '100 000 EUR (DE)', xtb: '100 000 EUR (EU)', fio: '100 000 EUR (CZ)', trading212: '85 000 £ (UK)', ibkr: '100 000 EUR (IE)' },
    { feature: 'Poplatek nákup ETF', degiro: '1 EUR (Core), 3 EUR (ostatní)', xtb: '0% (do 100k EUR/měs.)', fio: '0,29-0,35% (CZ)', trading212: '0%', ibkr: '0 USD (US Lite)' },
    { feature: 'Konverze měn', degiro: 'CZK/EUR zdarma, ostatní 0,25%', xtb: '0,5%', fio: 'Zdarma', trading212: '0,15%', ibkr: '0,2%' },
    { feature: 'Frakční ETF', degiro: 'Ne', xtb: 'Ano', fio: 'Ne', trading212: 'Ano', ibkr: 'Ano' },
    { feature: 'Česká podpora', degiro: 'Ano', xtb: 'Ano', fio: 'Ano', trading212: 'Omezená', ibkr: 'Ne' },
    { feature: 'Zdanění CZ dividend', degiro: '35%', xtb: '35%', fio: '15%', trading212: 'Standard', ibkr: '15%' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Detailní srovnání brokerů pro ETF investory
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Komplexní analýza pěti předních brokerských platforem z pohledu českého investora do ETF fondů
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Přehled</TabsTrigger>
            <TabsTrigger value="comparison">Srovnání</TabsTrigger>
            <TabsTrigger value="details">Detaily</TabsTrigger>
            <TabsTrigger value="recommendations">Doporučení</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokers.map((broker) => (
                <Card key={broker.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBroker(selectedBroker === broker.id ? null : broker.id)}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{broker.logo}</span>
                      <div className="flex-1">
                        <CardTitle className="text-xl flex items-center gap-2">
                          {broker.name}
                          {broker.czSupport && <Badge variant="outline" className="text-xs">CZ</Badge>}
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.round(broker.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">({broker.rating})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{broker.description}</p>
                    
                    {/* Key metrics */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{broker.etfFee.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500">ETF poplatek</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{broker.etfCount}</div>
                        <div className="text-xs text-gray-500">ETF nabídka</div>
                      </div>
                    </div>

                    {/* Quick info */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          Minimální vklad:
                        </span>
                        <span className="font-medium">{broker.minDeposit}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Platformy:
                        </span>
                        <span className="font-medium text-xs">{broker.platforms.join(', ')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Frakční ETF:
                        </span>
                        <span className="flex items-center">
                          {broker.fractional ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Regulace:
                        </span>
                        <span className="font-medium text-xs">{broker.regulation.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Special features */}
                    <div className="flex flex-wrap gap-1">
                      {broker.specialFeatures.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {broker.specialFeatures.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{broker.specialFeatures.length - 2}
                        </Badge>
                      )}
                    </div>

                    {selectedBroker === broker.id && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        {/* Detailed info when expanded */}
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <h5 className="font-semibold text-sm mb-2 flex items-center gap-1">
                              <Info className="w-4 h-4" />
                              Detailní informace
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Konverze měn:</span>
                                <span className="font-medium">{broker.fxFee}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Zákaznická podpora:</span>
                                <span className="font-medium">{broker.customerSupport}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Jazyky:</span>
                                <span className="font-medium text-xs">{broker.languages.join(', ')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Trhy:</span>
                                <span className="font-medium text-xs">{Array.isArray(broker.markets) ? broker.markets.join(', ') : broker.markets}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              Výhody
                            </h4>
                            <ul className="space-y-1">
                              {broker.pros.map((pro, index) => (
                                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 shrink-0"></div>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-1">
                              <X className="w-4 h-4" />
                              Nevýhody
                            </h4>
                            <ul className="space-y-1">
                              {broker.cons.map((con, index) => (
                                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                  <div className="w-1 h-1 bg-red-500 rounded-full mt-2 shrink-0"></div>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Click to expand hint */}
                    <div className="text-center pt-2">
                      <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                        {selectedBroker === broker.id ? 'Skrýt detaily' : 'Zobrazit detaily'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Srovnávací tabulka klíčových parametrů</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Funkce / Broker</TableHead>
                        <TableHead className="text-center">DEGIRO</TableHead>
                        <TableHead className="text-center">XTB</TableHead>
                        <TableHead className="text-center">Fio e-Broker</TableHead>
                        <TableHead className="text-center">Trading 212</TableHead>
                        <TableHead className="text-center">Interactive Brokers</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comparisonData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.feature}</TableCell>
                          <TableCell className="text-center text-sm">{row.degiro}</TableCell>
                          <TableCell className="text-center text-sm">{row.xtb}</TableCell>
                          <TableCell className="text-center text-sm">{row.fio}</TableCell>
                          <TableCell className="text-center text-sm">{row.trading212}</TableCell>
                          <TableCell className="text-center text-sm">{row.ibkr}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Accordion type="single" collapsible className="space-y-4">
              {brokers.map((broker) => (
                <AccordionItem key={broker.id} value={broker.id} className="border rounded-lg">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{broker.logo}</span>
                      <span className="font-semibold text-lg">{broker.name}</span>
                      <Badge variant="outline" className="ml-auto">
                        {broker.rating} ⭐
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold">Regulace a ochrana</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div><strong>Regulace:</strong> {broker.regulation}</div>
                          <div><strong>Ochrana:</strong> {broker.protection}</div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Calculator className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold">Poplatky</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div><strong>ETF poplatek:</strong> {broker.etfFee}</div>
                          <div><strong>Správa účtu:</strong> {broker.managementFee}</div>
                          <div><strong>Konverze měn:</strong> {broker.fxFee}</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold">Funkce a podpora</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Frakční ETF:</span>
                            {broker.fractional ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                          </div>
                          <div className="flex justify-between">
                            <span>Česká podpora:</span>
                            {broker.czSupport ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                          </div>
                          <div><strong>Zdanění CZ dividend:</strong> {broker.czDividends}</div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    Doporučení podle profilu investora
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">💰 Pasivní investoři s menším kapitálem</h3>
                    <p className="text-gray-700 mb-3">
                      Pro investory s pravidelnými menšími vklady (DCA strategie) jsou klíčové nízké poplatky a podpora frakčních ETF.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                        <strong>Trading 212</strong> - 0% poplatky, frakční ETF
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">2. volba</Badge>
                        <strong>XTB</strong> - 0% do 100k EUR/měsíc, česká podpora
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">💎 Investoři s větším kapitálem</h3>
                    <p className="text-gray-700 mb-3">
                      Pro větší investice jsou důležité nízké procentuální poplatky a široká nabídka ETF.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                        <strong>DEGIRO</strong> - velmi nízké poplatky, široká nabídka
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">2. volba</Badge>
                        <strong>Interactive Brokers</strong> - nejširší nabídka, pokročilé nástroje
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">🇨🇿 Preferující české dividendy</h3>
                    <p className="text-gray-700 mb-3">
                      Pro investory do českých akcií je klíčové optimální zdanění dividend.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                        <strong>Fio e-Broker</strong> - 15% zdanění CZ dividend
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">2. volba</Badge>
                        <strong>Interactive Brokers</strong> - 15% zdanění CZ dividend
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">📈 Pokročilí investoři a tradeři</h3>
                    <p className="text-gray-700 mb-3">
                      Pro zkušené uživatele jsou důležité pokročilé nástroje a široká nabídka trhů.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                        <strong>Interactive Brokers</strong> - TWS platforma, široká nabídka
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">2. volba</Badge>
                        <strong>XTB</strong> - xStation 5, vzdělávací materiály
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <FileText className="w-6 h-6" />
                    Důležité upozornění
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-800">
                    Při finálním rozhodování si pečlivě prostudujte aktuální sazebníky poplatků a podmínky vybraného brokera. 
                    Daňové implikace konzultujte s daňovým poradcem pro zajištění správného plnění daňových povinností v České republice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DetailedBrokerComparison;
