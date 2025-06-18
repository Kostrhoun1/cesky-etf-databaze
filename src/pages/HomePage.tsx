
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useETFData } from '@/hooks/useETFData';
import HeroSection from '@/components/home/HeroSection';
import USPSection from '@/components/home/USPSection';
import ETFSearchSection from '@/components/home/ETFSearchSection';
import BrokerComparisonSection from '@/components/home/BrokerComparisonSection';
import CTASection from '@/components/home/CTASection';
import NewsletterSubscribeForm from "@/components/NewsletterSubscribeForm";

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

  return (
    <Layout>
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
