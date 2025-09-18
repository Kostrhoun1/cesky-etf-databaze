
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ETFDetailedComparison from '@/components/ETFDetailedComparison';
import ETFComparisonContainer from '@/components/comparison/ETFComparisonContainer';
import { ETF } from '@/types/etf';
import SEOHead from '@/components/SEO/SEOHead';

const ETFComparison: React.FC = () => {
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);
  const [selectedETFsForComparison, setSelectedETFsForComparison] = useState<ETF[]>([]);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ETF srovnání 2025 - Nejlepší nástroj pro porovnání ETF fondů",
    "description": "Porovnejte více než 3500 ETF fondů podle TER poplatků, výkonnosti a rizika. ETF srovnání zdarma pro české investory s DEGIRO ETF filtery.",
    "url": "https://etfpruvodce.cz/srovnani-etf",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "featureList": [
      "Srovnání více než 3500 ETF fondů",
      "Filtrování podle TER poplatků",
      "Analýza historické výkonnosti", 
      "DEGIRO zdarma ETF filtr",
      "Porovnání amerických a evropských ETF",
      "Detailní rizikové metriky"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "provider": {
      "@type": "Organization",
      "name": "ETF průvodce.cz",
      "url": "https://etfpruvodce.cz"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Čeští investoři"
    }
  };

  const handleShowDetailedComparison = (selectedETFs: ETF[]) => {
    console.log('ETFComparison - handleShowDetailedComparison called with:', selectedETFs.length, 'ETFs');
    setSelectedETFsForComparison(selectedETFs);
    setShowDetailedComparison(true);
  };

  const handleBackToList = () => {
    setShowDetailedComparison(false);
  };

  if (showDetailedComparison) {
    return (
      <Layout>
        <ETFDetailedComparison
          selectedETFs={selectedETFsForComparison}
          onBack={handleBackToList}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="ETF srovnání 2025 - Nejlepší nástroj pro porovnání ETF fondů České republiky"
        description="★ ETF srovnání ZDARMA ★ Porovnejte více než 3500 ETF fondů 2025. Filtrování podle TER poplatků, výkonnosti, rizika. Americké ETF, evropské ETF, DEGIRO zdarma ETF. Nejlepší ETF srovnání pro české investory."
        canonical="https://etfpruvodce.cz/srovnani-etf"
        keywords="ETF srovnání, srovnání ETF fondů, ETF porovnání, nejlepší ETF 2025, ETF filtr, ETF search, DEGIRO ETF zdarma, americké ETF, evropské ETF, TER poplatky ETF, výkonnost ETF, ETF databáze česky"
        ogImage="https://etfpruvodce.cz/og-etf-comparison.jpg"
        schema={webAppSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ETFComparisonContainer onShowDetailedComparison={handleShowDetailedComparison} />
        
        {/* SEO optimalizovaný obsah */}
        <div className="mt-16 space-y-12">
          {/* Co je ETF srovnání */}
          <section className="bg-white rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Co je ETF srovnání a proč je důležité?</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>ETF srovnání</strong> je klíčový nástroj pro každého českého investora, který chce najít <strong>nejlepší ETF fondy</strong> pro své portfolio. 
                Náš pokročilý nástroj pro <strong>porovnání ETF fondů</strong> umožňuje filtrovat a analyzovat více než <strong>3500 ETF fondů</strong> podle kritérií, 
                které jsou nejdůležitější pro vaše investiční cíle.
              </p>
              <p className="text-gray-700 mb-4">
                Při <strong>srovnání ETF</strong> je důležité porovnávat nejen <strong>TER poplatky</strong>, ale také výkonnost, riziko, velikost fondu 
                a dostupnost u českých brokerů jako je <strong>DEGIRO</strong>, <strong>XTB</strong> nebo <strong>Interactive Brokers</strong>.
              </p>
            </div>
          </section>

          {/* Jak používat ETF srovnání */}
          <section className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Jak používat náš ETF srovnání nástroj</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Filtrace podle kategorií</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Americké ETF</strong> - S&P 500, NASDAQ, Russell fondy</li>
                  <li>• <strong>Evropské ETF</strong> - STOXX 600, FTSE Europe fondy</li>
                  <li>• <strong>Světové ETF</strong> - MSCI World, FTSE All-World</li>
                  <li>• <strong>Dluhopisové ETF</strong> - Government a corporate bonds</li>
                  <li>• <strong>Komoditní ETF</strong> - Zlato, ropu, broad commodities</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Pokročilé filtry</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>TER poplatky</strong> - Najděte nejlevnější ETF</li>
                  <li>• <strong>Výkonnost</strong> - 1Y, 3Y, 5Y historické výnosy</li>
                  <li>• <strong>Velikost fondu</strong> - Minimální assets under management</li>
                  <li>• <strong>DEGIRO dostupnost</strong> - ETF zdarma bez poplatků</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Výhody našeho ETF srovnání */}
          <section className="bg-white rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Proč používat náš ETF srovnání nástroj?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🇨🇿</div>
                <h3 className="text-lg font-semibold mb-2">Česky lokalizováno</h3>
                <p className="text-gray-600">Speciálně připraveno pro české investory s českými brokery a daňovými aspekty</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Rychlé a přesné</h3>
                <p className="text-gray-600">Okamžité filtrování a srovnání tisíců ETF fondů v reálném čase</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Detailní analýza</h3>
                <p className="text-gray-600">Porovnání výkonnosti, rizika, poplatků a dalších klíčových metrik</p>
              </div>
            </div>
          </section>

          {/* Nejoblíbenější ETF kategorie */}
          <section className="bg-violet-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nejoblíbenější ETF kategorie pro srovnání</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-violet-900 mb-4">Top americké ETF pro srovnání</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded">
                    <span className="font-medium">S&P 500 ETF (CSPX, VOO)</span>
                    <span className="text-sm text-gray-600">TER od 0.03%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded">
                    <span className="font-medium">NASDAQ ETF (QQQ, EQQQ)</span>
                    <span className="text-sm text-gray-600">TER od 0.30%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded">
                    <span className="font-medium">US Total Market (VTI, ITOT)</span>
                    <span className="text-sm text-gray-600">TER od 0.03%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-900 mb-4">Top světové ETF pro srovnání</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded">
                    <span className="font-medium">MSCI World (IWDA, SWDA)</span>
                    <span className="text-sm text-gray-600">TER od 0.20%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded">
                    <span className="font-medium">FTSE All-World (VWCE)</span>
                    <span className="text-sm text-gray-600">TER 0.22%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded">
                    <span className="font-medium">MSCI ACWI (SSAC, SPYI)</span>
                    <span className="text-sm text-gray-600">TER od 0.20%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ sekce */}
          <section className="bg-white rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Často kladené otázky o ETF srovnání</h2>
            <div className="space-y-6">
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold text-lg cursor-pointer text-gray-900 hover:text-violet-600">
                  Jak najít nejlevnější ETF pomocí srovnání?
                </summary>
                <div className="mt-3 text-gray-700">
                  V našem ETF srovnání nástroji použijte filtr "TER poplatky" a seřaďte podle nejnižší hodnoty. 
                  Nejlevnější ETF mají TER pod 0.10% ročně. Pozor však na to, že nejlevnější nemusí být vždy nejlepší volba.
                </div>
              </details>

              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold text-lg cursor-pointer text-gray-900 hover:text-violet-600">
                  Které ETF jsou dostupné zdarma na DEGIRO?
                </summary>
                <div className="mt-3 text-gray-700">
                  DEGIRO nabízí více než 200 ETF bez transakčních poplatků. V našem srovnání najdete filtr "DEGIRO zdarma", 
                  který zobrazí pouze tyto fondy. Populární volby zahrnují IWDA, VWCE, CSPX a mnohé další.
                </div>
              </details>

              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold text-lg cursor-pointer text-gray-900 hover:text-violet-600">
                  Jak porovnat výkonnost ETF za různá období?
                </summary>
                <div className="mt-3 text-gray-700">
                  Náš ETF srovnání nástroj zobrazuje historické výnosy za 1, 3 a 5 let. Můžete řadit podle jakéhokoli období. 
                  Důležité je porovnávat ETF ze stejné kategorie a zohlednit i riziko (volatilitu).
                </div>
              </details>

              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold text-lg cursor-pointer text-gray-900 hover:text-violet-600">
                  Kolik ETF mohu porovnat současně?
                </summary>
                <div className="mt-3 text-gray-700">
                  V našem nástroji můžete vybrat až 3 ETF fondy pro detailní side-by-side porovnání. 
                  To je optimální počet pro důkladnou analýzu a rozhodování mezi konkrétními možnostmi.
                </div>
              </details>

              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold text-lg cursor-pointer text-gray-900 hover:text-violet-600">
                  Jsou americké ETF lepší než evropské ETF?
                </summary>
                <div className="mt-3 text-gray-700">
                  Záleží na vaších cílech. Americké ETF často mají nižší TER a větší likviditu, ale evropské ETF 
                  jsou daňově výhodnější pro české investory (UCITS struktura). Použijte náš srovnání pro konkrétní analýzu.
                </div>
              </details>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Začněte s ETF srovnáním ještě dnes</h2>
            <p className="text-xl mb-6 opacity-90">
              Najděte nejlepší ETF fondy pro vaše investiční cíle pomocí našeho pokročilého srovnání nástroje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/tipy/nejlepsi-etf-2025" className="bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Nejlepší ETF 2025
              </a>
              <a href="/kde-koupit-etf" className="bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-800 transition-colors">
                Kde koupit ETF
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ETFComparison;
