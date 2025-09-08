
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
import GlobalSEO from '@/components/SEO/GlobalSEO';
import InternalLinking from '@/components/SEO/InternalLinking';
import FAQSection, { ETFFAQs } from '@/components/SEO/FAQSection';
import AIOptimized from '@/components/SEO/AIOptimized';
import AIReadableData from '@/components/SEO/AIReadableData';

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
      <GlobalSEO />
      <SEOHead
        title="ETF průvodce.cz - Komplexní průvodce ETF fondy pro české investory 2025"
        description="Nejlepší ETF fondy pro české investory 2025. Srovnání, analýza a detailní informace o ETF fondech. Kalkulačky, nástroje a vzdělávací obsah o investování."
        canonical="https://etfpruvodce.cz/"
        keywords="ETF fondy, investování, srovnání ETF, české investování, DEGIRO, Trading 212, XTB, nejlepší ETF 2025, brokeři"
        schema={websiteSchema}
      />
      
      <AIOptimized
        title="ETF průvodce.cz - Komplexní průvodce ETF fondy pro české investory 2025"
        lastUpdated="8. ledna 2025"
        quickAnswers={[
          {
            question: "Jaké jsou nejlepší ETF fondy pro české investory v roce 2025?",
            answer: "Nejlepší ETF pro rok 2025: Vanguard FTSE All-World (VWCE) s TER 0,22%, iShares Core MSCI World (IWDA) s TER 0,20%, iShares Core S&P 500 (CSPX) s TER 0,07%. Všechny jsou dostupné u českých brokerů.",
            source: "ETF průvodce.cz analýza 2025"
          },
          {
            question: "Který broker je nejlepší pro ETF v Česku?",
            answer: "Pro rok 2025: XTB (0% poplatky na ETF, skvělá podpora), DEGIRO (nejnižší poplatky), Trading 212 (0% poplatky, mobilní aplikace). Všichni regulovaní v EU.",
            source: "Srovnání brokerů 2025"
          },
          {
            question: "Kolik stojí investování do ETF?",
            answer: "TER (roční poplatky) u nejlepších ETF: 0,07-0,25% ročně. Transakční poplatky: XTB 0%, DEGIRO od 1€, Trading 212 0%. Doporučujeme začít s 500-2000 Kč měsíčně.",
            source: "Kalkulačka poplatků ETF"
          }
        ]}
        keyFacts={[
          {
            label: "ETF fondů v databázi",
            value: totalCount > 0 ? totalCount.toLocaleString() : "3500+",
            unit: "fondů"
          },
          {
            label: "Nejnižší TER",
            value: "0,07",
            unit: "%"
          },
          {
            label: "Brokerů porovnáno", 
            value: "5",
            unit: "hlavních"
          },
          {
            label: "Aktualizováno",
            value: "Denně",
            unit: ""
          }
        ]}
      >
        {/* HERO sekce */}
        <HeroSection totalCount={totalCount} />

        {/* USP sekce */}
        <USPSection />

        {/* AI-readable data pro ChatGPT */}
        <AIReadableData
          title="ETF data pro AI asistenty"
          description="Strukturovaná data o nejlepších ETF fondech pro české investory"
          lastUpdated="8. ledna 2025"
          dataPoints={[
            {
              label: "Počet ETF fondů",
              value: totalCount > 0 ? totalCount : 3500,
              unit: "fondů",
              description: "Celkový počet ETF fondů v naší databázi"
            },
            {
              label: "Průměrný TER",
              value: 0.25,
              unit: "%",
              description: "Průměrný roční poplatek za správu ETF"
            },
            {
              label: "Nejnižší TER",
              value: 0.07,
              unit: "%", 
              description: "Nejnižší dostupný TER u S&P 500 ETF"
            }
          ]}
          comparison={[
            {
              name: "Vanguard FTSE All-World (VWCE)",
              score: 95,
              recommendation: "Nejlepší pro začátečníky - globální diverzifikace",
              data: [
                { label: "TER", value: 0.22, unit: "%" },
                { label: "Velikost fondu", value: "15+ miliard", unit: "USD" },
                { label: "Počet akcií", value: "3900+", unit: "titulů" },
                { label: "Výkonnost 10 let", value: "8-10", unit: "% p.a." }
              ]
            },
            {
              name: "iShares Core MSCI World (IWDA)",
              score: 92,
              recommendation: "Skvělá alternativa k VWCE",
              data: [
                { label: "TER", value: 0.20, unit: "%" },
                { label: "Velikost fondu", value: "60+ miliard", unit: "USD" },
                { label: "Počet akcií", value: "1500+", unit: "titulů" },
                { label: "Výkonnost 10 let", value: "9-11", unit: "% p.a." }
              ]
            }
          ]}
          summary="Pro české investory doporučujeme začít s globálními ETF jako VWCE nebo IWDA. Tyto fondy poskytují okamžitou diverzifikaci do tisíců akcií s nízkými poplatky."
          methodology="Data aktualizována denně z oficiálních zdrojů. Hodnocení založeno na TER, velikosti fondu, diverzifikaci a dlouhodobé výkonnosti."
        />

        {/* INTERAKTIVNÍ SROVNÁVAČ ETF */}
        <ETFSearchSection />

        {/* SROVNÁNÍ BROKERŮ */}
        <BrokerComparisonSection />

        {/* FAQ sekce optimalizovaná pro AI */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FAQSection faqs={ETFFAQs} />
        </div>

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
      </AIOptimized>
    </Layout>
  );
};

export default HomePage;
