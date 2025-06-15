import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useETFData } from '@/hooks/useETFData';
import { ETFListItem } from '@/types/etf';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
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
        // Get total count for display in hero and other sections
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
      <HeroSection totalCount={totalCount} />
      <BenefitsSection totalCount={totalCount} />
      <ETFSearchSection />
      <BrokerComparisonSection />
      <CTASection totalCount={totalCount} />
      <section className="max-w-lg mx-auto my-10 bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-violet-700">Přihlaste se k odběru newsletteru</h2>
        <p className="mb-4 text-gray-600">
          Buďte mezi prvními, kdo získá tipy na investování, nové články a zprávy o ETF fondech přímo na váš e-mail.
        </p>
        <NewsletterSubscribeForm />
      </section>
    </Layout>
  );
};

export default HomePage;
