
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useETFData } from '@/hooks/useETFData';
import HeroSection from '@/components/home/HeroSection';
import USPSection from '@/components/home/USPSection';
import ETFSearchSection from '@/components/home/ETFSearchSection';
import BrokerComparisonSection from '@/components/home/BrokerComparisonSection';
import CTASection from '@/components/home/CTASection';
import NewsletterSubscribeForm from "@/components/NewsletterSubscribeForm";
import SEOHead from '@/components/SEO/SEOHead';

const HomePage: React.FC = () => {
  const [totalCount, setTotalCount] = useState(0);
  const { getETFCount } = useETFData();

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
    <Layout>
      <SEOHead
        title="ETF průvodce.cz - Komplexní průvodce ETF fondy pro české investory"
        description="Nejlepší ETF fondy pro české investory. Srovnání, analýza a detailní informace o ETF fondech. Kalkulačky, nástroje a vzdělávací obsah o investování."
        canonical="https://etfpruvodce.cz/"
        keywords="ETF fondy, investování, srovnání ETF, české investování, DEGIRO, Trading 212, nejlepší ETF 2025"
        schema={websiteSchema}
      />
      
      {/* HERO sekce */}
      <HeroSection totalCount={totalCount} />

      {/* USP sekce */}
      <USPSection />

      {/* INTERAKTIVNÍ SROVNÁVAČ ETF */}
      <ETFSearchSection />

      {/* SROVNÁNÍ BROKERŮ */}
      <BrokerComparisonSection />

      {/* CTA sekce */}
      <CTASection totalCount={totalCount} />

      {/* Newsletter sekce */}
      <section id="newsletter" className="max-w-lg mx-auto my-10 bg-white p-8 rounded shadow" aria-labelledby="newsletter-heading">
        <h2 id="newsletter-heading" className="text-xl font-bold mb-4 text-violet-700">Přihlaste se k odběru newsletteru</h2>
        <p className="mb-4 text-gray-600">
          Buďte mezi prvními, kdo získá tipy na investování, nové články a zprávy o ETF fondech přímo na váš e-mail.
        </p>
        <NewsletterSubscribeForm />
      </section>
    </Layout>
  );
};

export default HomePage;
