import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import PortfolioStrategyDetail from '@/components/portfolio/PortfolioStrategyDetail';
import InternalLinking from '@/components/SEO/InternalLinking';
import SocialSharing from '@/components/SocialSharing';

const NobelPortfolioPage: React.FC = () => {
  const strategyData = {
    id: 'nobel',
    name: 'Nobel Portfolio',
    description: 'Vědecky podložená strategie založená na výzkumech laureátů Nobelovy ceny za ekonomii',
    riskLevel: 'Umírněné',
    expectedReturn: '6-9% ročně',
    allocations: [
      { asset: 'Světové akcie', percentage: 60, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
      { asset: 'Dluhopisy', percentage: 20, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
      { asset: 'Small Cap akcie', percentage: 10, isin: 'IE00BF4RFH31', etfName: 'iShares MSCI World Small Cap' },
      { asset: 'Emerging Markets', percentage: 10, isin: 'IE00B4L5YC18', etfName: 'iShares Core MSCI Emerging Markets' },
    ],
    philosophy: `Nobel Portfolio kombinuje poznatky z akademického výzkumu oceněného Nobelovou cenou za ekonomii. 
    Strategie vychází z moderní teorie portfolia (Harry Markowitz, 1990), efektivní tržní hypotézy (Eugene Fama, 2013) 
    a behaviorální ekonomie (Richard Thaler, 2017). Klíčové principy zahrnují diversifikaci, faktory hodnoty a velikosti, 
    a minimalizaci behaviorálních chyb prostřednictvím disciplinovaného investování.`,
    advantages: [
      'Založeno na vědeckém výzkumu oceněném Nobelovou cenou',
      'Využívá faktory hodnoty a velikosti pro vyšší výnosy',
      'Optimální poměr rizika a výnosu podle moderní teorie portfolia',
      'Mezinárodní diverzifikace snižuje specifická rizika',
      'Historicky prokázaná nadprůměrná performance',
      'Pravidelné rebalancování využívá kontraritánský přístup'
    ],
    disadvantages: [
      'Složitější než základní portfolio strategie',
      'Vyšší náklady kvůli 4 různým fondům',
      'Small Cap složka může být volatilnější',
      'Emerging Markets přidávají další riziko',
      'Vyžaduje pravidelnější sledování a rebalancování',
      'Může krátkodobě zaostávat za jednoduchými strategiemi'
    ],
    suitableFor: [
      'Vzdělané investory zajímající se o akademický přístup',
      'Investory s delším investičním horizontem (10+ let)',
      'Ty, kteří chtějí využít faktory hodnoty a velikosti',
      'Investory hledající optimalizované rizikově-výnosové profily',
      'Pokročilé investory schopné pravidelnějšího rebalancování',
      'Portfolio s důrazem na mezinárodní diverzifikaci'
    ],
    implementation: {
      rebalancing: 'Doporučuje se čtvrtletní nebo pololetní rebalancování. Při odchylce větší než 5% od cílové alokace proveďte korekci. Využijte příležitosti k nákupu podhodnocených segmentů.',
      monthlyInvesting: 'Při DCA investování dodržujte přesné alokace. Při malých částkách můžete střídavě kupovat hlavní komponenty (světové akcie, dluhopisy) a doplňkové (small cap, EM).',
      taxOptimization: 'Zvažte držení v daňově výhodných účtech. Dluhopisy a dividendové fondy umístěte do PILÍŘ III. V ČR sledujte změny daňového režimu pro zahraniční fondy.'
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Nobel Portfolio - Vědecky Podložená ETF Strategie podle Laureátů Nobelovy Ceny"
        description="Kompletní průvodce Nobel Portfolio strategií založené na výzkumu laureátů Nobelovy ceny. Moderní teorie portfolia, faktory hodnoty a praktická implementace."
        keywords="Nobel portfolio, moderní teorie portfolia, Harry Markowitz, Eugene Fama, value investing, small cap premium, faktory rizika"
        canonical="https://etfpruvodce.cz/portfolio-strategie/nobel-portfolio"
        schema={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Nobel Portfolio",
          "description": "Investiční strategie založená na akademickém výzkumu oceněném Nobelovou cenou za ekonomii",
          "provider": {
            "@type": "Organization",
            "name": "ETF průvodce.cz"
          },
          "category": "Investment Strategy",
          "riskLevel": "Medium",
          "creator": [
            {
              "@type": "Person",
              "name": "Harry Markowitz"
            },
            {
              "@type": "Person", 
              "name": "Eugene Fama"
            },
            {
              "@type": "Person",
              "name": "Richard Thaler"
            }
          ]
        }}
      />
      
      <PortfolioStrategyDetail strategy={strategyData} />

      {/* Additional Educational Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Vědecké základy Nobel Portfolio</h2>
          
          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">🏆 Nobelovi laureáti a jejich přínosy</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-800">Harry Markowitz (1990)</h4>
                <p className="text-blue-700 text-sm">Moderní teorie portfolia - optimalizace poměru rizika a výnosu prostřednictvím diverzifikace</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800">Eugene Fama (2013)</h4>
                <p className="text-blue-700 text-sm">Efektivní tržní hypotéza a trojfaktorový model (trh, velikost, hodnota)</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800">Richard Thaler (2017)</h4>
                <p className="text-blue-700 text-sm">Behaviorální ekonomie - jak se vyvarovat investičních chyb a emotivních rozhodnutí</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Faktory rizika a výnosu</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-green-900 mb-3">📈 Size Premium (Small Cap)</h4>
              <p className="text-green-800 text-sm mb-2"><strong>Teorie:</strong> Malé společnosti mají vyšší dlouhodobé výnosy</p>
              <p className="text-green-800 text-sm mb-2"><strong>Důvod:</strong> Vyšší riziko = vyšší očekávaný výnos</p>
              <p className="text-green-800 text-sm"><strong>Historicky:</strong> +2-3% ročně nad large cap akciemi</p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-orange-900 mb-3">💰 Value Premium</h4>
              <p className="text-orange-800 text-sm mb-2"><strong>Teorie:</strong> Levné akcie překonávají drahé</p>
              <p className="text-orange-800 text-sm mb-2"><strong>Měření:</strong> P/E, P/B, P/S ratio</p>
              <p className="text-orange-800 text-sm"><strong>Historicky:</strong> +3-5% ročně nad growth akciemi</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-purple-900 mb-3">🌍 Emerging Markets</h4>
              <p className="text-purple-800 text-sm mb-2"><strong>Teorie:</strong> Rozvíjející se trhy mají vyšší růstový potenciál</p>
              <p className="text-purple-800 text-sm mb-2"><strong>Riziko:</strong> Politické a měnové volatility</p>
              <p className="text-purple-800 text-sm"><strong>Diverzifikace:</strong> Nízká korelace s vyspělými trhy</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">🛡️ Dluhopisy</h4>
              <p className="text-gray-800 text-sm mb-2"><strong>Role:</strong> Stabilizace portfolia a ochrana kapitálu</p>
              <p className="text-gray-800 text-sm mb-2"><strong>Korelace:</strong> Často negativní s akciemi</p>
              <p className="text-gray-800 text-sm"><strong>Rebalancování:</strong> Zdroj likvidita pro nákup akcií</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Akademické studie a výzkum</h3>
          
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">📊 Klíčové výzkumy</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Fama-French (1992):</strong> Size a value faktory vysvětlují 90%+ variability výnosů</li>
              <li><strong>DeBondt & Thaler (1985):</strong> Contrarian strategie překonávají trh o 25% za 3 roky</li>
              <li><strong>Jegadeesh & Titman (1993):</strong> Momentum efekt v krátkodobém horizontu</li>
              <li><strong>Dimson, Marsh & Staunton (2021):</strong> Globální equity premium 3.7% nad dluhopisy</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Praktické tipy pro implementaci</h3>
          
          <div className="bg-amber-50 p-6 rounded-xl mb-8">
            <h4 className="text-lg font-semibold text-amber-900 mb-3">💡 Pokročilé strategie</h4>
            <ul className="list-disc pl-6 text-amber-800 space-y-2">
              <li><strong>Rebalancování:</strong> Využijte kalendářní nebo toleranční metodu (5% odchylka)</li>
              <li><strong>Tax Loss Harvesting:</strong> Realizujte ztráty pro daňovou optimalizaci</li>
              <li><strong>Factor Timing:</strong> Nepokoušejte se o timing, držte dlouhodobě</li>
              <li><strong>Nákladová optimalizace:</strong> Vybírejte nejlevnější ETF v každé kategorii</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-red-900 mb-3">⚠️ Časté chyby</h4>
            <ul className="list-disc pl-6 text-red-800 space-y-2">
              <li>Příliš časté rebalancování (zvyšuje náklady)</li>
              <li>Emotivní rozhodování během volatilních období</li>
              <li>Home bias - příliš velká koncentrace na domácí trh</li>
              <li>Zanedbání daňových dopadů při rebalancování</li>
              <li>Očekávání okamžitých výsledků od faktorových prémií</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Links */}
      <InternalLinking
        relatedLinks={[
          {
            title: "Přehled všech portfolio strategií",
            href: "/portfolio-strategie",
            description: "Porovnejte všech 5 osvědčených strategií"
          },
          {
            title: "Bogleheads Three-Fund",
            href: "/portfolio-strategie/bogleheads-three-fund",
            description: "Jednodušší alternativa se 3 fondy"
          },
          {
            title: "Akciové Portfolio",
            href: "/portfolio-strategie/akciove-portfolio",
            description: "100% akciová strategie pro agresivní investory"
          },
          {
            title: "ETF vs aktivní fondy",
            href: "/tipy/etf-vs-aktivni-fondy",
            description: "Proč volit pasivní indexové fondy"
          },
          {
            title: "Srovnání ETF fondů",
            href: "/srovnani-etf",
            description: "Najděte nejlepší ETF pro vaše portfolio"
          }
        ]}
        title="Související články a nástroje"
        className="mt-16"
      />

      {/* Social Sharing */}
      <SocialSharing 
        url="https://etfpruvodce.cz/portfolio-strategie/nobel-portfolio"
        title="Nobel Portfolio - Vědecky Podložená ETF Strategie podle Laureátů Nobelovy Ceny"
        description="Objevte investiční strategii založenou na výzkumu laureátů Nobelovy ceny. Moderní teorie portfolia v praxi."
        shareTitle="Sdílejte Nobel Portfolio"
        shareText="Vědecky podložená investiční strategie podle Nobelových laureátů!"
        className="mt-8"
      />
    </Layout>
  );
};

export default NobelPortfolioPage;