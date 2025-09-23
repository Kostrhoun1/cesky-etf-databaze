import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { generateBrokerSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Star, Smartphone, Globe, DollarSign, Shield, TrendingUp, AlertCircle, ArrowRight, Clock, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Trading212Review = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema("Trading 212"),
      generateBreadcrumbSchema("Trading 212")
    ]
  };
  return (
    <Layout>
      <SEOHead 
        title={`Trading 212 recenze ${currentYear}: Investování zdarma v moderní aplikaci | ETF průvodce.cz`}
        description={`Kompletní Trading 212 recenze ${currentYear}: bezplatné ETF obchody, frakční akcie, AutoInvest funkce. Výhody a nevýhody pro české investory. Hodnocení 4.2/5.`}
        keywords={`Trading 212 recenze ${currentYear}, Trading212 hodnocení, Trading 212 zkušenosti, bezplatné ETF, frakční akcie, AutoInvest, broker bez poplatků`}
        canonical="https://etfpruvodce.cz/trading212-recenze"
        ogImage="https://etfpruvodce.cz/og-trading212-review.jpg"
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Compact Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/25c6d816-7993-40c3-abe2-e21c45cc239d.png" 
                alt="Trading 212 logo"
                className="w-12 h-12 rounded-lg bg-white p-2"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Trading 212 Recenze {currentYear}</h1>
                <p className="text-blue-100">Mobilní broker s nulovými poplatky</p>
              </div>
              <div className="ml-auto text-right hidden md:block">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-semibold">4.2/5</span>
                </div>
                <p className="text-sm text-blue-200">2,847 hodnocení</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">0%</div>
                <div className="text-xs text-blue-200">Poplatky ETF</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">1500+</div>
                <div className="text-xs text-blue-200">ETF nabídka</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">1 EUR</div>
                <div className="text-xs text-blue-200">Min. investice</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">AutoInvest</div>
                <div className="text-xs text-blue-200">Automatizace</div>
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
                  Nulové poplatky za ETF
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Frakční akcie od 1 EUR
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  AutoInvest automatizace
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Moderní mobilní app
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
                  Pouze anglická podpora
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Bez českých akcií
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Méně analytických nástrojů
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Závislost na mobilní app
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Globální broker</h3>
              <p className="text-sm text-gray-600">Britsko-bulharský fintech broker s evropskou regulací</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nulové poplatky</h3>
              <p className="text-sm text-gray-600">Commission-free trading pro akcie a ETF</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile-first</h3>
              <p className="text-sm text-gray-600">Moderní mobilní aplikace s AutoInvest funkcí</p>
            </div>
          </div>

          {/* Poplatky - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Struktura poplatků
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Akcie & ETF obchody:</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vedení účtu:</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>SEPA převod:</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Konverze měn:</span>
                  <span className="font-semibold text-orange-600">0,15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vklad kartou:</span>
                  <span className="font-semibold text-green-600">0 € do 60k Kč</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Úročení hotovosti:</span>
                  <span className="font-semibold text-blue-600">až 6%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-700">
                <strong>Tip:</strong> Zvolte EUR účet pro evropské ETF a vyhnete se poplatku za konverzi měn.
              </p>
            </div>
          </div>

          {/* Srovnání s konkurencí - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Porovnání s konkurencí
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Funkce</th>
                    <th className="text-center py-2 font-medium text-blue-600">Trading 212</th>
                    <th className="text-center py-2 text-gray-600">XTB</th>
                    <th className="text-center py-2 text-gray-600">DEGIRO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">ETF poplatky</td>
                    <td className="text-center text-green-600 font-semibold">0%</td>
                    <td className="text-center text-green-600">0%*</td>
                    <td className="text-center text-orange-600">1-3 EUR</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Konverze měn</td>
                    <td className="text-center text-green-600 font-semibold">0,15%</td>
                    <td className="text-center text-orange-600">0,5%</td>
                    <td className="text-center text-orange-600">0,25%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Česká podpora</td>
                    <td className="text-center text-red-600">✗</td>
                    <td className="text-center text-green-600">✓</td>
                    <td className="text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2">AutoInvest</td>
                    <td className="text-center text-green-600 font-semibold">✓ (Pies)</td>
                    <td className="text-center text-green-600">✓</td>
                    <td className="text-center text-red-600">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Závěrečné hodnocení - kompaktní */}
          <div className="bg-white rounded-lg p-6 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Hodnocení pro české investory
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">9.5/10</div>
                <div className="text-xs text-green-700">Poplatky</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">9.0/10</div>
                <div className="text-xs text-blue-700">Platforma</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">6.0/10</div>
                <div className="text-xs text-orange-700">Podpora</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">8.2/10</div>
                <div className="text-xs text-purple-700">Celkem</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Ideální pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Začátečníky s menším kapitálem</li>
                  <li>• Mobilní investování</li>
                  <li>• AutoInvest automatizaci</li>
                  <li>• Globální ETF a akcie</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Nevhodné pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Investory vyžadující CZ podporu</li>
                  <li>• Pokročilé analytické nástroje</li>
                  <li>• České akcie</li>
                  <li>• Profesionální trading</li>
                </ul>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">Doporučený broker pro globální investování</span>
              </div>
              <p className="text-sm text-gray-600">Nejlepší volba pro začátečníky preferující mobilní aplikace</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <Link to="/kde-koupit-etf">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold">
                Porovnat s ostatními brokery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Nebo se podívejte na naše <Link to="/kalkulacky/investicni-kalkulacka" className="text-blue-600 hover:underline">investiční kalkulačky</Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Trading212Review;