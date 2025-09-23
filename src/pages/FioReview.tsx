import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Star, Shield, TrendingUp, Globe, Users, DollarSign, Award, ArrowRight, MapPin, Building, Target } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import { generateBrokerSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';

const FioReview = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema("Fio e-Broker"),
      generateBreadcrumbSchema("Fio e-Broker")
    ]
  };

  return (
    <Layout>
      <SEOHead
        title={`Fio e-Broker recenze ${currentYear}: Český broker s bankovním zázemím | ETF průvodce.cz`}
        description={`Kompletní Fio e-Broker recenze ${currentYear}: český broker s pobočkami, americká ETF, lokální podpora. Výhody a nevýhody. Hodnocení 3.9/5.`}
        canonical="https://etfpruvodce.cz/fio-ebroker-recenze"
        keywords={`Fio e-Broker recenze ${currentYear}, Fio broker hodnocení, Fio zkušenosti, český broker, americká ETF, pobočková síť`}
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
        ogImage="https://etfpruvodce.cz/og-fio-review.jpg"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Compact Hero */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/55aac89b-3834-421c-8689-34fb13fad2b1.png" 
                alt="Fio e-Broker logo"
                className="w-12 h-12 rounded-lg bg-white p-2"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Fio e-Broker Recenze {currentYear}</h1>
                <p className="text-teal-100">Český broker s bankovním zázemím</p>
              </div>
              <div className="ml-auto text-right hidden md:block">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-semibold">3.9/5</span>
                </div>
                <p className="text-sm text-teal-200">1,247 hodnocení</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">15%</div>
                <div className="text-xs text-teal-200">CZ dividend daň</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">90+</div>
                <div className="text-xs text-teal-200">Poboček v ČR</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">US ETF</div>
                <div className="text-xs text-teal-200">Pro retail</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">ČNB</div>
                <div className="text-xs text-teal-200">Regulace</div>
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
                  České bankovní zázemí
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  15% daň z CZ dividend
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Americká ETF pro retail
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  90+ poboček v ČR
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
                  Vysoké poplatky
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Zastaralá platforma
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Drahé konverze měn
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Bez moderních funkcí
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Česká banka</h3>
              <p className="text-sm text-gray-600">Tradičního brokera s ČNB regulací a pobočkovou sítí</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">US ETF přístup</h3>
              <p className="text-sm text-gray-600">Jedinečný přístup k americkým ETF pro retail investory</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lokální podpora</h3>
              <p className="text-sm text-gray-600">100% podpora v češtině a osobní konzultace</p>
            </div>
          </div>

          {/* Poplatky - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-600" />
              Struktura poplatků
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>České akcie (BCPP):</span>
                  <span className="font-semibold text-red-600">0,35% (min. 40 Kč)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>US akcie:</span>
                  <span className="font-semibold text-red-600">$7,95-9,95</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Německé akcie:</span>
                  <span className="font-semibold text-red-600">0,15% (min. €9,95)</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Konverze měn:</span>
                  <span className="font-semibold text-red-600">~1-2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vedení účtu:</span>
                  <span className="font-semibold text-green-600">0 Kč</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Realtime data:</span>
                  <span className="font-semibold text-red-600">780 Kč/měs</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Upozornění:</strong> Každý poplatek platí za nákup i prodej zvlášť. Round-trip stojí dvojnásobek.
              </p>
            </div>
          </div>

          {/* Srovnání s konkurencí - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              Porovnání s konkurencí
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Funkce</th>
                    <th className="text-center py-2 font-medium text-teal-600">Fio e-Broker</th>
                    <th className="text-center py-2 text-gray-600">XTB</th>
                    <th className="text-center py-2 text-gray-600">Trading 212</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">ETF poplatky</td>
                    <td className="text-center text-red-600 font-semibold">Vysoké</td>
                    <td className="text-center text-green-600">0%*</td>
                    <td className="text-center text-green-600">0%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">České dividendy</td>
                    <td className="text-center text-green-600 font-semibold">15%</td>
                    <td className="text-center text-red-600">35%</td>
                    <td className="text-center text-red-600">Nenabízí</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">US ETF retail</td>
                    <td className="text-center text-green-600 font-semibold">✓ Unikátní</td>
                    <td className="text-center text-red-600">✗</td>
                    <td className="text-center text-red-600">✗</td>
                  </tr>
                  <tr>
                    <td className="py-2">Pobočky v ČR</td>
                    <td className="text-center text-green-600 font-semibold">90+</td>
                    <td className="text-center text-red-600">✗</td>
                    <td className="text-center text-red-600">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Závěrečné hodnocení - kompaktní */}
          <div className="bg-white rounded-lg p-6 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Hodnocení pro české investory
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-xl font-bold text-red-600">4.0/10</div>
                <div className="text-xs text-red-700">Poplatky</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">3.0/10</div>
                <div className="text-xs text-orange-700">Platforma</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">9.5/10</div>
                <div className="text-xs text-green-700">Podpora</div>
              </div>
              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <div className="text-xl font-bold text-teal-600">6.5/10</div>
                <div className="text-xs text-teal-700">Celkem</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Ideální pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• České akcie (15% daň)</li>
                  <li>• Americká ETF pro retail</li>
                  <li>• Konzervativní investory</li>
                  <li>• Větší jednorázové investice</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Nevhodné pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Pravidelné malé investice</li>
                  <li>• Minimalizaci poplatků</li>
                  <li>• Moderní platformu</li>
                  <li>• Aktivní trading</li>
                </ul>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">Specifický nástroj pro české prostředí</span>
              </div>
              <p className="text-sm text-gray-600">Ideální pro kombinační využití - CZ akcie u Fio, zbytek jinde</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <Link to="/kde-koupit-etf">
              <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold">
                Porovnat s ostatními brokery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Nebo začněte s naší <Link to="/kalkulacky/investicni-kalkulacka" className="text-teal-600 hover:underline">investiční kalkulačkou</Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default FioReview;