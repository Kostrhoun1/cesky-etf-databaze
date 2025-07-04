import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Star, Smartphone, Globe, DollarSign, Shield, TrendingUp, AlertCircle } from 'lucide-react';

const Trading212Review = () => {
  return (
    <Layout>
      <SEOHead 
        title="Trading 212 recenze 2025 - Investování zdarma v moderní aplikaci"
        description="Kompletní recenze Trading 212 - britsko-bulharský broker s nulovými poplatky, frakčními akciemi a AutoInvest funkcí. Výhody, nevýhody a zkušenosti českých investorů."
        keywords="trading 212, trading212, recenze, broker, investování zdarma, ETF, akcie, frakční akcie, autoinvest"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        {/* Hero sekce */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 mb-6">
              <img 
                src="/lovable-uploads/25c6d816-7993-40c3-abe2-e21c45cc239d.png" 
                alt="Trading 212 logo"
                className="w-16 h-16 rounded-xl bg-white p-2"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Trading 212 Recenze</h1>
                <p className="text-xl opacity-90">Investování zdarma v moderní aplikaci</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">0%</div>
                <div className="text-sm opacity-80">Poplatky za ETF</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1500+</div>
                <div className="text-sm opacity-80">ETF nabídka</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1 EUR</div>
                <div className="text-sm opacity-80">Min. investice</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="text-sm opacity-80">Hodnocení 4.2/5</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Rychlý přehled */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Rychlý přehled Trading 212
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Hlavní výhody
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></div>
                      Zcela bezplatné obchodování s akciemi a ETF
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></div>
                      Frakční investování od 1 EUR
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></div>
                      Intuitivní mobilní aplikace
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></div>
                      Automatizované investování (Pies & AutoInvest)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></div>
                      Úročení volných prostředků
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Hlavní nevýhody
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></div>
                      Pouze anglická podpora (bez češtiny)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></div>
                      Nenabízí české akcie
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></div>
                      Méně pokročilých analytických nástrojů
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></div>
                      Závislost na mobilní aplikaci
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Představení platformy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Představení a jak Trading 212 funguje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Trading 212 je britsko-bulharský fintech broker, který proslul nabídkou investování do akcií a ETF bez poplatků. 
                Platforma vznikla v roce 2004, ale masivní popularitu získala okolo roku 2019–2020, kdy v Evropě jako jedni z prvních 
                nabídli komisní-free trading pro širokou veřejnost.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Trading212 se profiluje jako ideální broker pro začátečníky – láká na nulové poplatky, velmi nízký minimální vklad, 
                intuitivní mobilní aplikaci a možnost frakčních akcií. U T212 můžete začít investovat třeba s 10 € a koupit si za to 
                zlomek akcie Apple nebo ETF.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Klíčové funkce platformy:</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• <strong>Invest účet:</strong> Nákup reálných akcií a ETF</li>
                  <li>• <strong>CFD účet:</strong> Oddělený účet pro obchodování s pákou</li>
                  <li>• <strong>Demo účet:</strong> Virtuální kapitál pro nácvik</li>
                  <li>• <strong>Pies & AutoInvest:</strong> Automatizované pravidelné investování</li>
                  <li>• <strong>Frakční akcie:</strong> Investování od 1 EUR</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Poplatky */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Poplatky a měnové konverze
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Nulové poplatky</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Komisní poplatky za obchod:</span>
                      <span className="font-semibold text-green-600">0 €</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Poplatek za neaktivitu:</span>
                      <span className="font-semibold text-green-600">0 €</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Poplatek za vedení účtu:</span>
                      <span className="font-semibold text-green-600">0 €</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Bankovní převod (SEPA):</span>
                      <span className="font-semibold text-green-600">0 €</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-orange-700">Měnová konverze</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Poplatek za konverzi měn:</span>
                      <span className="font-semibold text-orange-600">0,15%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Vklad kartou (do 60k Kč/měs.):</span>
                      <span className="font-semibold text-green-600">0 €</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Vklad kartou (nad 60k Kč):</span>
                      <span className="font-semibold text-orange-600">0,7%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-amber-800">Tip pro úsporu poplatků</h5>
                    <p className="text-sm text-amber-700 mt-1">
                      Poplatek za konverzi měn 0,15% lze vyhnout volbou základní měny účtu stejné jako investice. 
                      Například EUR účet pro evropské ETF nebo USD účet pro americké akcie.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platforma a uživatelské rozhraní */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Obchodní platforma a uživatelská přívětivost
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Trading212 se pyšní jednou z nejlépe hodnocených mobilních platforem. Design je moderní, přehledný a rychlý. 
                Aplikace je navržena tak, aby i úplný začátečník rychle pochopil, jak nakoupit akcii.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-700">Výhody platformy</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Intuitivní mobilní aplikace (90% hodnocení)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Demo režim snadno přepínatelný</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Webová platforma i mobilní app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Vzdělávací sekce (Investing 101)</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-700">Omezení platformy</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>Pouze anglické rozhraní (bez češtiny)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>Omezené pokročilé analytické nástroje</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>Nepodporuje MetaTrader 4/5</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>Žádné API pro automatické obchodování</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Unikátní funkce: Pies & AutoInvest</h4>
                <p className="text-sm text-purple-700">
                  Umožňuje vytvořit "koláčové portfolio" složené z více akcií/ETF v určitých procentních vahách. 
                  Poté si nastavíte pravidelnou investici, která se automaticky rozloží podle váhy. 
                  T212 tak umí plně automatizovat pravidelné investování podobně jako robo-advisory služby, jen bez poplatku.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Zákaznická podpora */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Zákaznická podpora a bezpečnost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Zákaznická podpora</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Dostupnost:</span>
                      <span>24/7 (chat)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Jazyky:</span>
                      <span>Angličtina</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Kontakt:</span>
                      <span>Chat, e-mail</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Telefon:</span>
                      <span className="text-red-600">Není dostupný</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Regulace a ochrana</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Regulace:</span>
                      <span>FCA (UK), CySEC (EU)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Ochrana vkladů:</span>
                      <span>85 000 £ (UK)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Finanční stav:</span>
                      <span className="text-green-600">Stabilní</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Úroky z hotovosti:</span>
                      <span className="text-green-600">Ano (až 6%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daňové aspekty */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Daňové aspekty pro české investory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Výhody</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>W-8BEN formulář elektronicky (15% daň z US dividend)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Roční výpis transakcí a dividend</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Osvobození při držení nad 3 roky</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Co je třeba řešit</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <span>Přepočet na CZK dle kurzu ČNB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <span>Vlastní daňové přiznání</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                      <span>Dokumenty pouze v angličtině</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Srovnání s konkurencí */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Srovnání s ostatními brokery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Funkce</th>
                      <th className="text-center py-2">Trading 212</th>
                      <th className="text-center py-2">XTB</th>
                      <th className="text-center py-2">DEGIRO</th>
                      <th className="text-center py-2">IBKR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Poplatky ETF</td>
                      <td className="text-center text-green-600 font-semibold">0%</td>
                      <td className="text-center text-green-600">0% (limit)</td>
                      <td className="text-center text-orange-600">1-3 EUR</td>
                      <td className="text-center text-green-600">0 USD</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Konverze měn</td>
                      <td className="text-center text-green-600 font-semibold">0,15%</td>
                      <td className="text-center text-orange-600">0,5%</td>
                      <td className="text-center text-orange-600">0,25%</td>
                      <td className="text-center text-orange-600">0,2%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Frakční akcie</td>
                      <td className="text-center text-green-600 font-semibold">✓</td>
                      <td className="text-center text-green-600">✓</td>
                      <td className="text-center text-red-600">✗</td>
                      <td className="text-center text-green-600">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Česká podpora</td>
                      <td className="text-center text-red-600">✗</td>
                      <td className="text-center text-green-600 font-semibold">✓</td>
                      <td className="text-center text-green-600">✓</td>
                      <td className="text-center text-red-600">✗</td>
                    </tr>
                    <tr>
                      <td className="py-2">AutoInvest</td>
                      <td className="text-center text-green-600 font-semibold">✓ (Pies)</td>
                      <td className="text-center text-green-600">✓</td>
                      <td className="text-center text-red-600">✗</td>
                      <td className="text-center text-orange-600">Omezené</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Závěrečné hodnocení */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Závěrečné zhodnocení a doporučení</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-700 mb-2">Pro začátečníky</h4>
                  <p className="text-sm text-gray-600">
                    Ideální pro nové investory díky nulovým poplatkům a jednoduché aplikaci
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-700 mb-2">Pro pravidelné investory</h4>
                  <p className="text-sm text-gray-600">
                    AutoInvest funkce umožňuje plnou automatizaci investování
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Smartphone className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-700 mb-2">Pro mobilní uživatele</h4>
                  <p className="text-sm text-gray-600">
                    Jedna z nejlepších mobilních investičních aplikací na trhu
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4">Komu Trading 212 doporučujeme:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Začínajícím investorům</strong> s menším kapitálem (od 1 EUR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Investorům do globálních ETF a akcií</strong> bez zájmu o české tituly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Uživatelům se znalostí angličtiny</strong> na základní úrovni</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Fanouškům moderních technologií</strong> preferujícím mobilní aplikace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Pravidelným investorům</strong> využívajícím automatizované strategie</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Upozornění</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Trading 212 nemusí být vhodný pro investory vyžadující českou podporu, komplexní analytické nástroje 
                      nebo pokročilé obchodní funkce. Pro takové uživatele doporučujeme zvážit XTB nebo Interactive Brokers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hodnocení */}
          <Card>
            <CardHeader>
              <CardTitle>Celkové hodnocení Trading 212</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">9.5/10</div>
                  <div className="text-sm text-green-700 font-medium">Poplatky</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">9.0/10</div>
                  <div className="text-sm text-blue-700 font-medium">Platforma</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">6.0/10</div>
                  <div className="text-sm text-orange-700 font-medium">Podpora</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8.5/10</div>
                  <div className="text-sm text-purple-700 font-medium">Celkem</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">Doporučený broker pro začátečníky s globálním zaměřením</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default Trading212Review;