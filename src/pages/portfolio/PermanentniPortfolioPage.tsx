import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import PortfolioStrategyDetail from '@/components/portfolio/PortfolioStrategyDetail';
import InternalLinking from '@/components/SEO/InternalLinking';
import SocialSharing from '@/components/SocialSharing';

const PermanentniPortfolioPage: React.FC = () => {
  const strategyData = {
    id: 'permanent',
    name: 'Permanentní Portfolio',
    description: 'Klasická 25/25/25/25 strategie navržená pro dlouhodobou stabilitu a ochranu kapitálu',
    riskLevel: 'Konzervativní',
    expectedReturn: '4-6% ročně',
    allocations: [
      { asset: 'Akcie (růst)', percentage: 25, isin: 'IE00BK5BQT80', etfName: 'Vanguard FTSE All-World' },
      { asset: 'Dlouhodobé dluhopisy (deflace)', percentage: 25, isin: 'IE00B3DKXQ41', etfName: 'iShares Core Global Aggregate Bond' },
      { asset: 'Komodity (inflace)', percentage: 25, isin: 'IE00BDFL4P12', etfName: 'iShares Diversified Commodity Swap' },
      { asset: 'Zlato (krize)', percentage: 25, isin: 'IE00B4ND3602', etfName: 'iShares Physical Gold ETC' },
    ],
    philosophy: `Permanentní Portfolio je investiční strategie vytvořená Harrym Brownem v 70. letech 20. století. 
    Je založena na teorii, že ekonomika prochází čtyřmi základními fázemi: prosperita (akcie), recese (dluhopisy), 
    inflace (komodity) a deflace/krize (zlato). Portfolio je navrženo tak, aby jedna čtvrtina byla vždy v zisku, 
    bez ohledu na to, jaká ekonomická situace právě panuje. Cílem není maximalizovat zisky, ale minimalizovat riziko 
    velkých ztrát a poskytovat stabilní výkonnost během desetiletí.`,
    advantages: [
      'Maximální jednoduchost - rovnoměrné rozdělení 25/25/25/25',
      'Ochrana proti všem ekonomickým scénářům',
      'Velmi nízká volatilita a stabilní výkonnost',
      'Psychicky snadné držení během krizí',
      'Historicky ověřená strategie (50+ let)',
      'Minimální potřeba sledování trhů'
    ],
    disadvantages: [
      'Nižší výnosy během bull trhů',
      'Vysoké náklady na komodity a zlato',
      'Může významně zaostávat za akciovými portfolii',
      'Složitější nákup fyzického zlata v ČR',
      'Daňové komplikace u komodit',
      'Nerespektuje měnící se ekonomické podmínky'
    ],
    suitableFor: [
      'Velmi konzervativní investoři',
      'Investoři blížící se nebo v důchodu',
      'Lidé hledající "fire-and-forget" řešení',
      'Portfolio jako hedge proti nejistotě',
      'Investoři s averzi k velkým výkyvům',
      'Doplněk k agresivnějším portfoliím'
    ],
    implementation: {
      rebalancing: 'Rebalancování pouze jednou ročně nebo když některá složka vybočí o více než 10% od cílové alokace. Harry Browne doporučoval minimální zásahy.',
      monthlyInvesting: 'Při pravidelném investování dodržujte přesně 25% alokaci na každou složku. Při malých částkách můžete rotovat mezi složkami měsíčně.',
      taxOptimization: 'V ČR může být problematické držení komodit a zlata. Zvažte ETF alternativy nebo držení v zahraničních brokerech s lepšími daňovými podmínkami.'
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Permanentní Portfolio - Stabilní 25/25/25/25 ETF Strategie 2025"
        description="Kompletní průvodce Permanentním Portfoliem podle Harryho Browna. Historická performance, implementace a praktické tipy pro české investory."
        keywords="permanentní portfolio, Harry Browne, 25/25/25/25 strategie, stabilní investování, zlato ETF, komodity, konzervativní portfolio"
        canonical="https://etfpruvodce.cz/portfolio-strategie/permanentni-portfolio"
        schema={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Permanentní Portfolio",
          "description": "Klasická investiční strategie s rovnoměrným rozdělením mezi akcie, dluhopisy, komodity a zlato",
          "provider": {
            "@type": "Organization",
            "name": "ETF průvodce.cz"
          },
          "category": "Investment Strategy",
          "riskLevel": "Low",
          "creator": {
            "@type": "Person",
            "name": "Harry Browne"
          }
        }}
      />
      
      <PortfolioStrategyDetail strategy={strategyData} />

      {/* Additional Educational Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Historie a filozofie Permanentního Portfolia</h2>
          
          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">📚 Harry Browne a vznik strategie</h3>
            <p className="text-blue-800 mb-4">
              Harry Browne (1933-2006) byl americký spisovatel, investiční poradce a politik. Permanentní Portfolio 
              poprvé představil v knize "Fail-Safe Investing" v roce 1999, ale koncept vyvíjel již od 70. let.
            </p>
            <p className="text-blue-800">
              Browne byl ovlivněn hyperinflací 70. let a hledal způsob, jak ochránit bohatství před nepředvídatelnými 
              ekonomickými změnami. Jeho cílem nebylo "porazit trh", ale vytvořit portfolio, které bude stabilně 
              růst bez ohledu na ekonomické podmínky.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Čtyři ekonomické sezóny</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-green-900 mb-3">🌱 Prosperita (Růst)</h4>
              <p className="text-green-800 text-sm mb-2"><strong>Charakteristika:</strong> Rostoucí HDP, nízká nezaměstnanost, optimismus</p>
              <p className="text-green-800 text-sm mb-2"><strong>Výherci:</strong> Akcie - firmy rostou a zvyšují zisky</p>
              <p className="text-green-800 text-sm"><strong>Příklad:</strong> 90. léta, 2003-2007, 2009-2020</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-red-900 mb-3">📉 Recese (Pokles)</h4>
              <p className="text-red-800 text-sm mb-2"><strong>Charakteristika:</strong> Klesající HDP, rostoucí nezaměstnanost</p>
              <p className="text-red-800 text-sm mb-2"><strong>Výherci:</strong> Dlouhodobé dluhopisy - útěk do bezpečí</p>
              <p className="text-red-800 text-sm"><strong>Příklad:</strong> 2000-2002, 2008-2009, 2020 (krátce)</p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-orange-900 mb-3">🔥 Inflace</h4>
              <p className="text-orange-800 text-sm mb-2"><strong>Charakteristika:</strong> Rostoucí ceny, znehodnocení měny</p>
              <p className="text-orange-800 text-sm mb-2"><strong>Výherci:</strong> Komodity - jejich cena roste s inflací</p>
              <p className="text-orange-800 text-sm"><strong>Příklad:</strong> 70. léta, 2021-2022</p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">🥇 Deflace/Krize</h4>
              <p className="text-yellow-800 text-sm mb-2"><strong>Charakteristika:</strong> Klesající ceny, finanční paniky</p>
              <p className="text-yellow-800 text-sm mb-2"><strong>Výherci:</strong> Zlato - historický "safe haven"</p>
              <p className="text-yellow-800 text-sm"><strong>Příklad:</strong> 1930s, finanční krize, geopolitické konflikty</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Historická performance</h3>
          
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <p className="text-gray-700 mb-4">
              <strong>1972-2019 (47 let):</strong> Průměrný roční výnos 8.65% s volatilitou pouze 7.9%
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Nejhorší rok:</strong> -4.1% (2008) vs. -37% pro S&P 500
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Maximální pokles:</strong> -10.9% vs. -50.9% pro S&P 500
            </p>
            <p className="text-gray-700">
              <strong>Pozitivní roky:</strong> 38 z 47 let (81%)
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Kritika a alternativy</h3>
          
          <div className="bg-amber-50 p-6 rounded-xl mb-8">
            <h4 className="text-lg font-semibold text-amber-900 mb-3">⚠️ Hlavní výtky</h4>
            <ul className="list-disc pl-6 text-amber-800 space-y-2">
              <li>Příliš statické - nerespektuje změny v ekonomice od 70. let</li>
              <li>Vysoké náklady na komodity a zlato (často 0.5%+ TER)</li>
              <li>Zaostává za akciovými portfolii v dlouhodobém horizontu</li>
              <li>25% alokace do zlata je možná příliš konzervativní</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">🔄 Moderní adaptace</h4>
            <ul className="list-disc pl-6 text-blue-800 space-y-2">
              <li><strong>Golden Butterfly:</strong> 20% akcie, 20% malé akcie, 20% dlouhé dluhopisy, 20% krátké dluhopisy, 20% zlato</li>
              <li><strong>Permanent Portfolio+:</strong> Přidání REITs nebo mezinárodních akcií</li>
              <li><strong>Ray Dalio All-Weather:</strong> Risk-parity varianta s podobnými principy</li>
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
            title: "Ray Dalio All-Weather",
            href: "/portfolio-strategie/ray-dalio-all-weather",
            description: "Podobná konzervativní strategie s risk-parity přístupem"
          },
          {
            title: "Nobel Portfolio",
            href: "/portfolio-strategie/nobel-portfolio",
            description: "Vědecky podložená moderní alternativa"
          },
          {
            title: "Nejlevnejší ETF fondy",
            href: "/tipy/nejlevnejsi-etf-fondy",
            description: "Snižte náklady na implementaci portfolia"
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
        url="https://etfpruvodce.cz/portfolio-strategie/permanentni-portfolio"
        title="Permanentní Portfolio - Stabilní 25/25/25/25 ETF Strategie 2025"
        description="Kompletní průvodce klasickou Permanentní Portfolio strategií podle Harryho Browna. Historická data a praktické tipy."
        shareTitle="Sdílejte Permanentní Portfolio"
        shareText="Objevte stabilní investiční strategii, která funguje ve všech ekonomických podmínkách!"
        className="mt-8"
      />
    </Layout>
  );
};

export default PermanentniPortfolioPage;