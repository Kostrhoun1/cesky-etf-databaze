import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useETFSearchData } from '@/hooks/useETFSearchData';
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
import PortfolioStrategiesTeaser from '@/components/home/PortfolioStrategiesTeaser';

const HomePage: React.FC = () => {
  const { totalETFCount, lastUpdated } = useETFSearchData();

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
      <HeroSection totalCount={totalETFCount} />

      {/* USP sekce - kompaktní */}
      <USPSection />

      {/* PŘEHLED ETF FONDŮ - HLAVNÍ OBSAH */}
      <ETFSearchSection />

      {/* SROVNÁNÍ BROKERŮ */}
      <BrokerComparisonSection />

      {/* CTA sekce */}
      <CTASection totalCount={totalETFCount} />

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

      {/* Portfolio Strategies Teaser */}
      <PortfolioStrategiesTeaser />

      {/* ETF Guide CTA */}
      <div className="mt-16 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">📚 Stáhněte si náš komplexní průvodce investováním</h2>
            <p className="text-xl text-blue-100 mb-6">
              25+ stránek praktických rad o investování do ETF fondů • 5 ověřených portfolio strategií • Pro české investory
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/navod-pro-zacatecniky"
                className="bg-white text-violet-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                🔍 Zobrazit průvodce
              </Link>
              <span className="text-blue-200 text-sm">Zdarma • PDF ke stažení • Aktualizováno pro 2025</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500 rounded-full opacity-20 -ml-24 -mb-24"></div>
      </div>

      {/* Related Content Links */}
      <InternalLinking 
        relatedLinks={[
          { title: "Srovnání ETF fondů", href: "/srovnani-etf", description: "Porovnejte více než 3500 ETF fondů" },
          { title: "Portfolio Strategie", href: "/portfolio-strategie", description: "5 ověřených investičních strategií" },
          { title: "Kde koupit ETF", href: "/kde-koupit-etf", description: "Nejlepší brokeři pro české investory" },
          { title: "Investiční kalkulačky", href: "/kalkulacky", description: "Bezplatné kalkulačky a nástroje" },
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