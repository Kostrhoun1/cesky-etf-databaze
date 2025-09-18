import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import PortfolioStrategyDetail from '@/components/portfolio/PortfolioStrategyDetail';
import InternalLinking from '@/components/SEO/InternalLinking';
import SocialSharing from '@/components/SocialSharing';

const AkciovePage: React.FC = () => {
  const strategyData = {
    id: 'stock',
    name: 'Akciové Portfolio',
    description: 'Růstově orientovaná strategie pro investory s dlouhodobým horizontem a vyšší tolerancí rizika',
    riskLevel: 'Agresivní',
    expectedReturn: '8-12% ročně',
    allocations: [
      { asset: 'USA (S&P 500)', percentage: 50, isin: 'IE00B5BMR087' },
      { asset: 'Evropa', percentage: 25, isin: 'IE00B4K48X80' },
      { asset: 'Asie a rozvojové trhy', percentage: 20, isin: 'IE00BK5BR626' },
      { asset: 'Technologické akcie', percentage: 5, isin: 'IE00B53SZB19' },
    ],
    philosophy: `Akciové portfolio je navrženo pro investory, kteří chtějí maximalizovat dlouhodobý růst svého kapitálu. 
    S 95% alokací do akcií nabízí nejvyšší růstový potenciál, ale také nejvyšší volatilitu. Strategie kombinuje 
    geografickou diverzifikaci s mírným overweight na americký trh a technologický sektor.`,
    advantages: [
      'Nejvyšší dlouhodobý růstový potenciál',
      'Geografická diverzifikace snižuje riziko',
      'Technologická expozice pro budoucí růst',
      'Vhodné pro mladé investory s dlouhým horizontem',
      'Historicky překonává inflaci s velkým odstupem'
    ],
    disadvantages: [
      'Vysoká volatilita (možné poklesy 20-40%)',
      'Žádná ochrana v krizích',
      'Psychicky náročné při dlouhých poklesech',
      'Nevhodné pro kratší investiční horizont',
      'Korelace mezi regiony roste v krizích'
    ],
    suitableFor: [
      'Investoři ve věku 20-40 let',
      'Dlouhodobý horizont 15+ let',
      'Vysoká tolerance k riziku',
      'Pravidelný příjem a stabilní situace',
      'Snaha o maximální růst kapitálu'
    ],
    implementation: {
      rebalancing: 'Doporučuje se roční rebalancování nebo při vybočení alokace o více než 10%. V krizích může být výhodné rebalancovat častěji.',
      monthlyInvesting: 'Při pravidelném investování dodržujte cílové alokace. V prvních letech můžete začít jen s širokým světovým ETF a postupně přidávat regionální.',
      taxOptimization: 'Preferujte akumulační ETF fondy. V ČR je dlouhodobé držení akcií daňově zvýhodněno díky testu držby.'
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Akciové Portfolio - Růstová ETF Strategie pro Vysoké Výnosy 2025"
        description="Komplexní průvodce akciovou portfolio strategií s 95% alokací do akcií. Historická performance, implementace a tipy pro české investory."
        keywords="akciové portfolio, růstová strategie, ETF akcie, vysoké výnosy, investování do akcií, portfolio management"
        canonical="https://etfpruvodce.cz/portfolio-strategie/akciove-portfolio"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Akciové Portfolio",
          "description": "Růstově orientovaná investiční strategie s vysokou alokací do akcií pro maximální dlouhodobý růst",
          "provider": {
            "@type": "Organization",
            "name": "ETF průvodce.cz"
          },
          "category": "Investment Strategy",
          "riskLevel": "High"
        }}
      />
      
      <PortfolioStrategyDetail strategy={strategyData} />

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
            description: "Jednodušší a konzervativnější přístup"
          },
          {
            title: "Ray Dalio All-Weather",
            href: "/portfolio-strategie/ray-dalio-all-weather",
            description: "Více diverzifikovaná defensivní strategie"
          },
          {
            title: "Nejlepší ETF na americké akcie",
            href: "/tipy/nejlepsi-etf-na-americke-akcie",
            description: "Detailní srovnání ETF fondů na USA"
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
        url="https://etfpruvodce.cz/portfolio-strategie/akciove-portfolio"
        title="Akciové Portfolio - Růstová ETF Strategie pro Vysoké Výnosy 2025"
        description="Objevte růstovou strategii s 95% alokací do akcií. Historická performance a praktické tipy pro implementaci."
        shareTitle="Sdílejte akciovou strategii"
        shareText="Maximalizujte svůj dlouhodobý růst s akciovou portfolio strategií!"
        className="mt-8"
      />
    </Layout>
  );
};

export default AkciovePage;