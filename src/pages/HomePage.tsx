import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useETFData } from '@/hooks/useETFData';
import HeroSection from '@/components/home/HeroSection';
import USPSection from '@/components/home/USPSection';
import ETFSearchSection from '@/components/home/ETFSearchSection';
import BrokerComparisonSection from '@/components/home/BrokerComparisonSection';
import CTASection from '@/components/home/CTASection';
import SEOHead from '@/components/SEO/SEOHead';
import GlobalSEO from '@/components/SEO/GlobalSEO';
import InternalLinking from '@/components/SEO/InternalLinking';
import FAQSection from '@/components/SEO/FAQSection';
import SocialSharing from '@/components/SocialSharing';

const HomePage: React.FC = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [showQuickStart, setShowQuickStart] = useState(false);
  const { getETFCount, lastUpdated } = useETFData();

  useEffect(() => {
    const loadData = async () => {
      try {
        const count = await getETFCount();
        setTotalCount(count);
      } catch (error) {
        console.error('HomePage: Error loading data:', error);
      }
    };
    loadData();
  }, [getETFCount]);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ETF průvodce.cz",
    "url": "https://etfpruvodce.cz",
    "description": "Nejlepší ETF fondy pro české investory. Srovnání, analýza a detailní informace o ETF fondech. Kalkulačky, nástroje a vzdělávací obsah o investování.",
    "publisher": {
      "@type": "Organization",
      "name": "ETF průvodce.cz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://etfpruvodce.cz/og-image.jpg"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://etfpruvodce.cz/srovnani-etf?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Layout lastUpdated={lastUpdated}>
      <GlobalSEO />
      <SEOHead
        title="ETF průvodce.cz - Komplexní průvodce ETF fondy pro české investory 2025"
        description="Nejlepší ETF fondy pro české investory 2025. Srovnání, analýza a detailní informace o ETF fondech. Kalkulačky, nástroje a vzdělávací obsah o investování."
        canonical="https://etfpruvodce.cz/"
        keywords="ETF fondy, investování, srovnání ETF, české investování, DEGIRO, Trading 212, XTB, nejlepší ETF 2025, brokeři"
        ogImage="https://etfpruvodce.cz/og-homepage.jpg"
        schema={websiteSchema}
      />
      
      {/* HERO sekce - s integrovaným Portfolio CTA */}
      <HeroSection totalCount={totalCount} onPortfolioWizardOpen={() => setShowQuickStart(true)} />

      {/* USP sekce - kompaktní */}
      <USPSection />

      {/* PŘEHLED ETF FONDŮ - HLAVNÍ OBSAH */}
      <ETFSearchSection />

      {/* SROVNÁNÍ BROKERŮ */}
      <BrokerComparisonSection />

      {/* CTA sekce */}
      <CTASection totalCount={totalCount} />

      {/* FAQ sekce */}
      <FAQSection 
        title="Často kladené otázky o ETF fondech"
        faqs={[
          {
            question: "Co jsou ETF fondy a proč investovat do ETF?",
            answer: "ETF (Exchange-Traded Fund) jsou indexové fondy obchodované na burze. Nabízejí nízké poplatky, širokou diverzifikaci a jednoduchost investování. Jsou ideální pro začátečníky i pokročilé investory."
          },
          {
            question: "Který broker je nejlepší pro nákup ETF v České republice?",
            answer: "Mezi nejlepší brokeře patří DEGIRO (bez poplatků za vybrané ETF), XTB (0% poplatky do 100 000 EUR), Trading212 (0% poplatky) a Interactive Brokers. Výběr závisí na vašich potřebách a objemu investic."
          },
          {
            question: "Jaké jsou nejlepší ETF fondy pro rok 2025?",
            answer: "Pro dlouhodobé investování doporučujeme: VWCE (celý svět), CSPX (S&P 500), EUNL (evropské akcie) a VFEM (rozvíjející se trhy). Tyto ETF nabízejí širokou diverzifikaci a nízké poplatky."
          },
          {
            question: "Kolik stojí investování do ETF fondů?",
            answer: "Náklady se skládají z poplatků brokera (0-15 EUR na transakci) a ročních poplatků fondu (TER 0,1-0,7%). U některých brokerů je nákup vybraných ETF zdarma."
          },
          {
            question: "Jak funguje zdanění ETF fondů v ČR?",
            answer: "Zisky z prodeje ETF se zdaňují 15% daní z příjmů po odpočtu testů. Dividendy podléhají srážkové dani dle smlouvy o zamezení dvojího zdanění. ETF s akumulací dividend jsou daňově výhodnější."
          },
          {
            question: "Lze investovat do ETF s malými částkami?",
            answer: "Ano, mnohé brokeři nabízejí spořící plány už od 25 EUR měsíčně. Ideální je pravidelné investování (DCA - Dollar Cost Averaging) pro snížení rizika časování trhu."
          }
        ]}
        className="mt-16 bg-gray-50"
      />

      {/* Related Content Links */}
      <InternalLinking 
        relatedLinks={[
          { title: "Srovnání ETF fondů", href: "/srovnani-etf", description: "Porovnejte více než 3500 ETF fondů" },
          { title: "Návod pro začátečníky", href: "/navod-pro-zacatecniky", description: "Jak začít investovat do ETF" },
          { title: "Nejlepší brokeři 2025", href: "/srovnani-brokeru", description: "Kde koupit ETF fondy" },
          { title: "Investiční nástroje", href: "/nastroje", description: "Bezplatné kalkulačky a nástroje" },
          { title: "Nejlepší ETF 2025", href: "/tipy/nejlepsi-etf-2025", description: "Doporučené ETF fondy pro rok 2025" }
        ]}
        title="Další užitečné stránky"
        className="mt-16"
      />

      {/* Social Sharing */}
      <SocialSharing 
        url="https://etfpruvodce.cz"
        title="ETF průvodce.cz - Komplexní průvodce ETF fondy pro české investory 2025"
        description="Nejlepší ETF fondy pro české investory 2025. Srovnání, analýza a detailní informace o ETF fondech. Kalkulačky, nástroje a vzdělávací obsah o investování."
        shareTitle="Sdílejte ETF průvodce"
        shareText="Pomozte ostatním s investováním - sdílejte tento užitečný průvodce ETF fondy"
        className="mt-8"
      />
    </Layout>
  );
};

export default HomePage;