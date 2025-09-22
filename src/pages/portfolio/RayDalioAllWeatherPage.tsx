import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import PortfolioStrategyDetail from '@/components/portfolio/PortfolioStrategyDetail';
import InternalLinking from '@/components/SEO/InternalLinking';
import SocialSharing from '@/components/SocialSharing';

const RayDalioAllWeatherPage: React.FC = () => {
  const strategyData = {
    id: 'allweather',
    name: 'Ray Dalio All-Weather Portfolio',
    description: 'Stabilní strategie navržená pro všechna ekonomická období a tržní podmínky',
    riskLevel: 'Konzervativní',
    expectedReturn: '5-8% ročně',
    allocations: [
      { asset: 'Dlouhodobé dluhopisy', percentage: 40, isin: 'IE00B4WXJJ64' },
      { asset: 'Akcie', percentage: 30, isin: 'IE00BK5BQT80' },
      { asset: 'Střednědobé dluhopisy', percentage: 15, isin: 'IE00B3DKXQ41' },
      { asset: 'Komodity', percentage: 7.5, isin: 'IE00BDFL4P12' },
      { asset: 'Zlato', percentage: 7.5, isin: 'IE00B4ND3602' },
    ],
    philosophy: `All-Weather portfolio bylo vytvořeno Rayem Daliem, zakladatelem největšího hedgeového fondu Bridgewater Associates. 
    Strategie je navržena tak, aby dobře fungovala ve všech ekonomických režimech - růst, pokles, inflace i deflace. 
    Klíčem je risk-parity přístup, kde každá třída aktiv přispívá stejným dílem k celkovému riziku portfolia.`,
    advantages: [
      'Stabilní výkonnost ve všech tržních podmínkách',
      'Ochrana proti inflaci prostřednictvím zlata a komodit',
      'Nízká korelace mezi aktivními třídami',
      'Založeno na vědeckém přístupu risk-parity',
      'Ověřeno během různých ekonomických cyklů'
    ],
    disadvantages: [
      'Nižší výnos v bull trzích',
      'Složitější rebalancování kvůli 5 komponentům',
      'Vyšší náklady kvůli komoditám a zlatu',
      'Může zaostávat za akciovými portfolii dlouhodobě',
      'Citlivost na změny úrokových sazeb'
    ],
    suitableFor: [
      'Konzervativní investoři hledající stabilitu',
      'Investoři blížící se důchodu',
      'Portfolio s důrazem na ochranu kapitálu',
      'Investoři očekávající ekonomickou nejistotu',
      'Diverzifikace od tradičních 60/40 portfolií'
    ],
    implementation: {
      rebalancing: 'Kvůli vyšší složitosti doporučujeme čtvrtletní rebalancování. Sledujte zejména poměr dluhopisů různých splatností.',
      monthlyInvesting: 'Při malých částkách začněte s hlavními komponentami (akcie, dlouhodobé dluhopisy) a postupně přidávejte komodity a zlato.',
      taxOptimization: 'Zlato ETF může být v ČR daňově výhodnější než fyzické zlato. Pozor na TER náklady u komoditních fondů.'
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Ray Dalio All-Weather Portfolio - Stabilní ETF Strategie pro Všechna Období"
        description="Kompletní průvodce Ray Dalio All-Weather portfolio strategií. Risk-parity přístup, historická performance a implementace pro české investory."
        keywords="Ray Dalio All Weather, risk parity, stabilní portfolio, diverzifikace, komodity, zlato, Bridgewater Associates"
        canonical="https://etfpruvodce.cz/portfolio-strategie/ray-dalio-all-weather"
        schema={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Ray Dalio All-Weather Portfolio",
          "description": "Stabilní investiční strategie pro všechna ekonomická období založená na risk-parity principech",
          "provider": {
            "@type": "Organization",
            "name": "ETF průvodce.cz"
          },
          "category": "Investment Strategy",
          "riskLevel": "Low"
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
            title: "All-Weather Portfolio článek",
            href: "/tipy/all-weather-portfolio",
            description: "Detailní článek o All-Weather strategii"
          },
          {
            title: "Permanentní Portfolio",
            href: "/portfolio-strategie/permanentni-portfolio",
            description: "Podobně konzervativní 4-fondová strategie"
          },
          {
            title: "Bogleheads Three-Fund",
            href: "/portfolio-strategie/bogleheads-three-fund",
            description: "Jednodušší alternativa s 3 fondy"
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
        url="https://etfpruvodce.cz/portfolio-strategie/ray-dalio-all-weather"
        title="Ray Dalio All-Weather Portfolio - Stabilní ETF Strategie pro Všechna Období"
        description="Objevte Ray Dalio's All-Weather strategii s risk-parity přístupem. Stabilní výkonnost ve všech ekonomických podmínkách."
        shareTitle="Sdílejte All-Weather strategii"
        shareText="Stabilní portfolio pro všechna období od Ray Dalia!"
        className="mt-8"
      />
    </Layout>
  );
};

export default RayDalioAllWeatherPage;