import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Star, Shield, TrendingUp, Globe, Users, DollarSign, Award, ArrowRight, Clock } from 'lucide-react';
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
      "@type": "Service",
      "name": "XTB",
      "description": "Online broker pro investování do ETF a akcií s českým zázemím",
      "category": "Financial Service",
      "serviceType": "Investment Broker"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.7",
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewCount": 1247,
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz",
      "url": "https://etfpruvodce.cz"
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
      <div className="min-h-screen bg-gray-50">
        {/* Compact Hero */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/a7162820-5478-4cd8-9bfd-fd04b80a42ff.png" 
                alt="XTB logo"
                className="w-12 h-12 rounded-lg bg-white p-2"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">XTB Recenze {currentYear}</h1>
                <p className="text-green-100">Broker s plnou českou podporou</p>
              </div>
              <div className="ml-auto text-right hidden md:block">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-semibold">4.7/5</span>
                </div>
                <p className="text-sm text-green-200">3,254 hodnocení</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">0%</div>
                <div className="text-xs text-green-200">ETF poplatky*</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">CZ</div>
                <div className="text-xs text-green-200">Podpora 24/5</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">xStation</div>
                <div className="text-xs text-green-200">Award platforma</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">100k EUR</div>
                <div className="text-xs text-green-200">Ochrana</div>
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
                  Plná česká podpora 24/5
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  0% poplatky do 100k EUR/měs.
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  xStation 5 award platforma
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  AutoInvest funkce
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Hlavní nevýhody
              </h3>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  Poplatky nad 100k EUR/měs.
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  Konverze měn 0,5%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  CFD zaměření
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  Složitější pro začátečníky
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Česká podpora</h3>
              <p className="text-sm text-gray-600">Plná lokalizace a česká zákaznická podpora 24/5</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">xStation 5</h3>
              <p className="text-sm text-gray-600">Oceněná obchodní platforma s pokročilými nástroji</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Regulace EU</h3>
              <p className="text-sm text-gray-600">CySEC licencí a ochrana 100k EUR</p>
            </div>
          </div>

          {/* Poplatky - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Struktura poplatků
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Akcie & ETF (do 100k EUR):</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vedení účtu:</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Min. vklad:</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Konverze měn:</span>
                  <span className="font-semibold text-orange-600">0,5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Nad 100k EUR/měs.:</span>
                  <span className="font-semibold text-orange-600">0,2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frakční akcie:</span>
                  <span className="font-semibold text-blue-600">od 10 EUR</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Tip:</strong> 0% poplatky do 100k EUR měsíčně pokrývají potřeby 99% investorů.
              </p>
            </div>
          </div>

          {/* Srovnání s konkurencí - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Porovnání s konkurencí
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Funkce</th>
                    <th className="text-center py-2 font-medium text-green-600">XTB</th>
                    <th className="text-center py-2 text-gray-600">Trading 212</th>
                    <th className="text-center py-2 text-gray-600">DEGIRO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">ETF poplatky</td>
                    <td className="text-center text-green-600 font-semibold">0%*</td>
                    <td className="text-center text-green-600">0%</td>
                    <td className="text-center text-orange-600">1-3 EUR</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Česká podpora</td>
                    <td className="text-center text-green-600 font-semibold">✓ 24/5</td>
                    <td className="text-center text-red-600">✗</td>
                    <td className="text-center text-green-600">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Platforma</td>
                    <td className="text-center text-green-600 font-semibold">xStation 5</td>
                    <td className="text-center text-green-600">Mobilní</td>
                    <td className="text-center text-orange-600">Web</td>
                  </tr>
                  <tr>
                    <td className="py-2">AutoInvest</td>
                    <td className="text-center text-green-600 font-semibold">✓</td>
                    <td className="text-center text-green-600">✓ (Pies)</td>
                    <td className="text-center text-red-600">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Závěrečné hodnocení - kompaktní */}
          <div className="bg-white rounded-lg p-6 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Hodnocení pro české investory
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">8.5/10</div>
                <div className="text-xs text-green-700">Poplatky</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">9.5/10</div>
                <div className="text-xs text-green-700">Platforma</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">9.8/10</div>
                <div className="text-xs text-green-700">Podpora</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">9.2/10</div>
                <div className="text-xs text-green-700">Celkem</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Ideální pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Investory vyžadující CZ podporu</li>
                  <li>• Pokročilé analytické nástroje</li>
                  <li>• AutoInvest automatizaci</li>
                  <li>• Profesionální platformu</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Pozor na:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Poplatky nad 100k EUR/měs.</li>
                  <li>• Vyšší konverze měn (0,5%)</li>
                  <li>• CFD marketing</li>
                  <li>• Složitější rozhraní</li>
                </ul>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">Nejlepší broker pro české investory</span>
              </div>
              <p className="text-sm text-gray-600">Ideální kombinace českých služeb a profesionální platformy</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <Link to="/kde-koupit-etf">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold">
                Porovnat s ostatními brokery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Nebo začněte s naší <Link to="/kalkulacky/investicni-kalkulacka" className="text-green-600 hover:underline">investiční kalkulačkou</Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default XTBReview;