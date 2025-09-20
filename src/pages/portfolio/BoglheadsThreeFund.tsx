import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import PortfolioStrategyDetail from '@/components/portfolio/PortfolioStrategyDetail';
import InternalLinking from '@/components/SEO/InternalLinking';
import SocialSharing from '@/components/SocialSharing';

const BoglheadsThreeFundPage: React.FC = () => {
  const strategyData = {
    id: 'threefund',
    name: 'Bogleheads Three-Fund Portfolio',
    description: 'Nejjednodušší cesta k globální diverzifikaci podle filosofie Johna Boglea',
    riskLevel: 'Umírněné',
    expectedReturn: '6-9% ročně',
    allocations: [
      { asset: 'Rozvinuté světové akcie', percentage: 60, isin: 'IE00BKX55T58' },
      { asset: 'Rozvíjející se trhy', percentage: 20, isin: 'IE00BK5BR626' },
      { asset: 'Světové dluhopisy', percentage: 20, isin: 'IE00BG47KH54' },
    ],
    philosophy: `Three-Fund Portfolio je jednou z nejpopulárnějších investičních strategií mezi komunitou Bogleheads. 
    Založena na filozofii Johna Boglea, zakladatele Vanguard, která zdůrazňuje jednoduchost, nízké náklady a širokou diverzifikaci.`,
    advantages: [
      'Maximální jednoduchost - pouze 3 ETF fondy',
      'Nízké náklady na správu portfolia',
      'Široká globální diverzifikace',
      'Vhodné pro začátečníky i pokročilé',
      'Snadné rebalancování'
    ],
    disadvantages: [
      'Chybí expozice vůči komoditám',
      'Žádná ochrana proti inflaci mimo dluhopisy',
      'Může podávat horšší výkon v některých obdobích',
      'Nevyužívá taktické alokace'
    ],
    suitableFor: [
      'Začínající investoři hledající jednoduchost',
      'Investoři preferující pasivní přístup',
      'Dlouhodobý investiční horizont (10+ let)',
      'Střední tolerance k riziku'
    ],
    implementation: {
      rebalancing: 'Doporučuje se rebalancování každých 6-12 měsíců nebo když alokace vybočí o více než 5%.',
      monthlyInvesting: 'Při pravidelném měsíčním investování můžete investovat do všech tří fondů podle cílové alokace.',
      taxOptimization: 'V ČR jsou akumulační ETF daňově výhodnější než distribuční.'
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Bogleheads Three-Fund Portfolio - Jednoduchá ETF Strategie 2025"
        description="Podrobný průvodce Bogleheads Three-Fund Portfolio strategií. Reálná performance, složení, implementace a tipy pro české investory."
        keywords="Bogleheads Three-Fund, ETF portfolio, John Bogle, pasivní investování, diverzifikace, investiční strategie"
        canonical="https://etfpruvodce.cz/portfolio-strategie/bogleheads-three-fund"
        schema={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Bogleheads Three-Fund Portfolio",
          "description": "Jednoduchá investiční strategie založená na třech ETF fondech pro globální diverzifikaci",
          "provider": {
            "@type": "Organization",
            "name": "ETF průvodce.cz"
          },
          "category": "Investment Strategy",
          "riskLevel": "Moderate"
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
            title: "Akciové Portfolio",
            href: "/portfolio-strategie/akciove-portfolio",
            description: "Agresivnější růstová strategie"
          },
          {
            title: "Ray Dalio All-Weather",
            href: "/portfolio-strategie/ray-dalio-all-weather",
            description: "Stabilní strategie pro všechna období"
          },
          {
            title: "Srovnání ETF fondů",
            href: "/srovnani-etf",
            description: "Najděte nejlepší ETF pro vaše portfolio"
          },
          {
            title: "Portfolio průvodce",
            href: "/navod-pro-zacatecniky",
            description: "Kompletní PDF průvodce s detailními strategiemi"
          }
        ]}
        title="Související články a nástroje"
        className="mt-16"
      />

      {/* Social Sharing */}
      <SocialSharing 
        url="https://etfpruvodce.cz/portfolio-strategie/bogleheads-three-fund"
        title="Bogleheads Three-Fund Portfolio - Jednoduchá ETF Strategie 2025"
        description="Podrobný průvodce nejjednodušší investiční strategií pro začátečníky. Pouze 3 ETF fondy pro globální diverzifikaci."
        shareTitle="Sdílejte Three-Fund strategii"
        shareText="Objevte nejjednodušší cestu k investování s Bogleheads Three-Fund Portfolio!"
        className="mt-8"
      />
    </Layout>
  );
};

export default BoglheadsThreeFundPage;