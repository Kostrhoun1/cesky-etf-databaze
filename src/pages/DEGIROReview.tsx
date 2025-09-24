
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Star, Shield, TrendingUp, Globe, Users, DollarSign, Award, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
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
      "@type": "Service",
      "name": "DEGIRO",
      "description": "Online broker pro investování do ETF a akcií",
      "category": "Financial Service",
      "serviceType": "Investment Broker"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewCount": 1247,
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz",
      "url": "https://etfpruvodce.cz"
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
      
      <div className="min-h-screen bg-gray-50">
        {/* Compact Hero */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/f9bacf3b-7b11-4c31-917d-e16803dc0887.png" 
                alt="DEGIRO logo"
                className="w-12 h-12 rounded-lg bg-white p-2"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">DEGIRO Recenze {currentYear}</h1>
                <p className="text-emerald-100">Evropský broker s nízkými poplatky</p>
              </div>
              <div className="ml-auto text-right hidden md:block">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-semibold">4.5/5</span>
                </div>
                <p className="text-sm text-emerald-200">2,158 hodnocení</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">200+</div>
                <div className="text-xs text-emerald-200">ETF zdarma</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">1-3€</div>
                <div className="text-xs text-emerald-200">ETF poplatky</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">0€</div>
                <div className="text-xs text-emerald-200">Konverze CZK</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">100k EUR</div>
                <div className="text-xs text-emerald-200">Ochrana</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          
          {/* Rychlý přehled - kompaktní verze */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Hlavní výhody
              </h3>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  200+ ETF zdarma v Core Selection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Bezplatná konverze CZK/EUR
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Silná evropská regulace
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Široká nabídka trhů
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Hlavní nevýhody
              </h3>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Nevýhodné zdanění CZ dividend
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Bez frakčních akcií
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Chybí demo účet
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Částečná česká podpora
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Evropský broker</h3>
              <p className="text-sm text-gray-600">Holandsko-německá regulace s ochranou do 100k EUR</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nízké poplatky</h3>
              <p className="text-sm text-gray-600">Core Selection ETF od 1€, bezplatná konverze měn</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Široká nabídka</h3>
              <p className="text-sm text-gray-600">3000+ ETF a akcie z celosvětových trhů</p>
            </div>
          </div>

          {/* ETF Core Selection - zvýrazněná sekce */}
          <div className="bg-white rounded-lg p-4 mb-6 border border-emerald-200">
            <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-emerald-600" />
              DEGIRO Core Selection ETF
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Počet ETF zdarma:</span>
                  <span className="font-semibold text-emerald-600">200+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frekvence zdarma:</span>
                  <span className="font-semibold text-emerald-600">1× měsíčně</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Poplatek dalších transakcí:</span>
                  <span className="font-semibold text-orange-600">1€</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Nejpopulárnější:</span>
                  <span className="font-semibold text-gray-900">VWCE, CSPX</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Aktualizace seznamu:</span>
                  <span className="font-semibold text-blue-600">Měsíčně</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Roční poplatek burza:</span>
                  <span className="font-semibold text-orange-600">2,5€</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700">
                <strong>Tip:</strong> Core Selection pokrývá všechny hlavní světové indexy a je ideální pro diverzifikované portfolio.
              </p>
            </div>
          </div>

          {/* Poplatky - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Struktura poplatků
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Core Selection ETF:</span>
                  <span className="font-semibold text-emerald-600">1€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ostatní ETF:</span>
                  <span className="font-semibold text-orange-600">3€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>České akcie:</span>
                  <span className="font-semibold text-orange-600">30 CZK</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Konverze CZK/EUR:</span>
                  <span className="font-semibold text-emerald-600">0€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vedení účtu:</span>
                  <span className="font-semibold text-emerald-600">0€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Roční poplatek burza:</span>
                  <span className="font-semibold text-orange-600">2,5€</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-700">
                <strong>Pozor:</strong> České dividendy jsou zdaněny 35% místo 15% - vratných je 20% po podání žádosti.
              </p>
            </div>
          </div>

          {/* Srovnání s konkurencí - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Porovnání s konkurencí
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Funkce</th>
                    <th className="text-center py-2 font-medium text-emerald-600">DEGIRO</th>
                    <th className="text-center py-2 text-gray-600">XTB</th>
                    <th className="text-center py-2 text-gray-600">Trading 212</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">ETF poplatky</td>
                    <td className="text-center text-emerald-600 font-semibold">1-3€</td>
                    <td className="text-center text-green-600">0%*</td>
                    <td className="text-center text-green-600">0%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Konverze CZK/EUR</td>
                    <td className="text-center text-emerald-600 font-semibold">0%</td>
                    <td className="text-center text-orange-600">0,5%</td>
                    <td className="text-center text-orange-600">0,15%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Česká podpora</td>
                    <td className="text-center text-orange-600">Částečná</td>
                    <td className="text-center text-green-600">✓ 24/5</td>
                    <td className="text-center text-red-600">✗</td>
                  </tr>
                  <tr>
                    <td className="py-2">Frakční akcie</td>
                    <td className="text-center text-red-600">✗</td>
                    <td className="text-center text-green-600">✓</td>
                    <td className="text-center text-green-600">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Závěrečné hodnocení - kompaktní */}
          <div className="bg-white rounded-lg p-6 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Hodnocení pro české investory
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">8.0/10</div>
                <div className="text-xs text-green-700">Poplatky</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">7.5/10</div>
                <div className="text-xs text-blue-700">Platforma</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">6.5/10</div>
                <div className="text-xs text-orange-700">Podpora</div>
              </div>
              <div className="text-center p-3 bg-emerald-50 rounded-lg">
                <div className="text-xl font-bold text-emerald-600">7.5/10</div>
                <div className="text-xs text-emerald-700">Celkem</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Ideální pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Globální ETF investování</li>
                  <li>• Dlouhodobé pasivní investory</li>
                  <li>• Diverzifikaci portfolia</li>
                  <li>• Nízké poplatky za konverzi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Nevhodné pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• České dividendové akcie</li>
                  <li>• Začátečníky bez zkušeností</li>
                  <li>• Potřebu demo účtu</li>
                  <li>• Plnou českou podporu</li>
                </ul>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">Doporučený broker pro globální investování</span>
              </div>
              <p className="text-sm text-gray-600">Solidní volba pro dlouhodobé investory preferující nízké poplatky</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <Link to="/kde-koupit-etf">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold">
                Porovnat s ostatními brokery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Nebo začněte s naší <Link to="/kalkulacky/investicni-kalkulacka" className="text-emerald-600 hover:underline">investiční kalkulačkou</Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default DEGIROReview;
