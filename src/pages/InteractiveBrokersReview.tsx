import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Star, Shield, TrendingUp, Globe, Users, DollarSign, Award, ArrowRight, Clock, Target, Zap } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import { generateBrokerSchema, generateBreadcrumbSchema } from '@/components/SEO/BrokerSEO';

const IBKRReview = () => {
  const currentYear = new Date().getFullYear();
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateBrokerSchema("Interactive Brokers"),
      generateBreadcrumbSchema("Interactive Brokers")
    ]
  };

  return (
    <Layout>
      <SEOHead
        title={`Interactive Brokers recenze ${currentYear}: Profesionální broker pro pokročilé | ETF průvodce.cz`}
        description={`Detailní Interactive Brokers recenze ${currentYear} - nejnižší poplatky, globální trhy, profesionální nástroje. Výhody a nevýhody IBKR pro ČR. Hodnocení 4.3/5.`}
        canonical="https://etfpruvodce.cz/interactive-brokers-recenze"
        keywords={`Interactive Brokers recenze ${currentYear}, IBKR hodnocení, IBKR zkušenosti, Interactive Brokers poplatky, profesionální broker, TWS platforma`}
        schema={combinedSchema}
        publishedTime={`${currentYear}-01-01`}
        modifiedTime={new Date().toISOString()}
        author="ETF průvodce.cz"
        ogImage="https://etfpruvodce.cz/og-interactive-brokers-review.jpg"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Compact Hero */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/ibkr-logo.png" 
                alt="Interactive Brokers logo"
                className="w-12 h-12 rounded-lg bg-white p-2"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Interactive Brokers Recenze {currentYear}</h1>
                <p className="text-purple-100">Profesionální broker pro pokročilé investory</p>
              </div>
              <div className="ml-auto text-right hidden md:block">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 font-semibold">4.3/5</span>
                </div>
                <p className="text-sm text-purple-200">1,892 hodnocení</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">~0.02%</div>
                <div className="text-xs text-purple-200">Konverze měn</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">100+</div>
                <div className="text-xs text-purple-200">Burzy světa</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">TWS</div>
                <div className="text-xs text-purple-200">Pro platforma</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">40+ let</div>
                <div className="text-xs text-purple-200">Zkušenosti</div>
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
                  Nejnižší poplatky pro velké objemy
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Přístup k 100+ burzám světa
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Nejlepší měnové konverze (~0.02%)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Profesionální TWS platforma
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
                  Složité TWS rozhraní
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Poplatky za živá data
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Není pro úplné začátečníky
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Globální reach</h3>
              <p className="text-sm text-gray-600">Přístup k 100+ burzám ve 30 zemích světa</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Direct market access</h3>
              <p className="text-sm text-gray-600">Přímé směrování pokynů na trh bez konfliktu zájmů</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Maximální bezpečnost</h3>
              <p className="text-sm text-gray-600">40+ let zkušeností, regulace SEC a EU</p>
            </div>
          </div>

          {/* Poplatky - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              Struktura poplatků (IBKR Pro vs Lite)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>US akcie (IBKR Pro):</span>
                  <span className="font-semibold text-green-600">$0.0005-0.0035/akcie</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>US akcie (IBKR Lite):</span>
                  <span className="font-semibold text-green-600">$0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>EU akcie/ETF:</span>
                  <span className="font-semibold text-green-600">0.05% (min. €3)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vedení účtu:</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Konverze měn:</span>
                  <span className="font-semibold text-green-600">~0.02%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Opce:</span>
                  <span className="font-semibold text-green-600">$0.65/kontrakt</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Market data:</span>
                  <span className="font-semibold text-orange-600">$10-15/měs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Min. vklad:</span>
                  <span className="font-semibold text-green-600">0 €</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700">
                <strong>Výhoda:</strong> Nejlepší měnové konverze na trhu (~0.02%) + multi-měnový účet.
              </p>
            </div>
          </div>

          {/* Srovnání s konkurencí - kompaktní tabulka */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Porovnání s konkurencí
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Funkce</th>
                    <th className="text-center py-2 font-medium text-purple-600">IBKR</th>
                    <th className="text-center py-2 text-gray-600">XTB</th>
                    <th className="text-center py-2 text-gray-600">DEGIRO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Celkové náklady</td>
                    <td className="text-center text-green-600 font-semibold">Nejnižší*</td>
                    <td className="text-center text-green-600">Dobré</td>
                    <td className="text-center text-orange-600">Střední</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Konverze měn</td>
                    <td className="text-center text-green-600 font-semibold">~0.02%</td>
                    <td className="text-center text-orange-600">0.5%</td>
                    <td className="text-center text-orange-600">0.25%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Česká podpora</td>
                    <td className="text-center text-red-600">✗</td>
                    <td className="text-center text-green-600">✓ 24/5</td>
                    <td className="text-center text-green-600">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Pokročilé nástroje</td>
                    <td className="text-center text-green-600 font-semibold">✓ TWS</td>
                    <td className="text-center text-green-600">✓ xStation</td>
                    <td className="text-center text-orange-600">Základní</td>
                  </tr>
                  <tr>
                    <td className="py-2">Nabídka instrumentů</td>
                    <td className="text-center text-green-600 font-semibold">Nejširší</td>
                    <td className="text-center text-orange-600">Střední</td>
                    <td className="text-center text-orange-600">Střední</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              * Pro objemy nad 10k EUR měsíčně
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
                <div className="text-xl font-bold text-green-600">9.8/10</div>
                <div className="text-xs text-green-700">Poplatky</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">9.5/10</div>
                <div className="text-xs text-blue-700">Funkce</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-xl font-bold text-red-600">3.0/10</div>
                <div className="text-xs text-red-700">CZ podpora</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">8.6/10</div>
                <div className="text-xs text-purple-700">Celkem</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Ideální pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Pokročilé investory (50k+ EUR)</li>
                  <li>• Globální diverzifikaci portfolia</li>
                  <li>• Trading opcí a futures</li>
                  <li>• Minimální náklady na investování</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠️ Nevhodné pro:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Začátečníky bez angličtiny</li>
                  <li>• Malé měsíční investice</li>
                  <li>• Jednoduché ETF strategie</li>
                  <li>• Požadavek na CZ podporu</li>
                </ul>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">Broker pro profesionály</span>
              </div>
              <p className="text-sm text-gray-600">"Nejlepší broker na světě... pokud víte, jak ho používat"</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <Link to="/kde-koupit-etf">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold">
                Porovnat s ostatními brokery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Nebo začněte s naší <Link to="/kalkulacky/investicni-kalkulacka" className="text-purple-600 hover:underline">investiční kalkulačkou</Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default IBKRReview;