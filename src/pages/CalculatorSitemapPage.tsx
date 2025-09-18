import React from 'react';
import Layout from '@/components/Layout';
import CalculatorHub from '@/components/CalculatorHub';
import SEOHead from '@/components/SEO/SEOHead';
import BreadcrumbNav from '@/components/SEO/BreadcrumbNav';
import StructuredData from '@/components/SEO/StructuredData';
import InternalLinking from '@/components/SEO/InternalLinking';
import SocialSharing from '@/components/SocialSharing';

const CalculatorSitemapPage: React.FC = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Domů",
        "item": "https://etfpruvodce.cz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Finanční kalkulačky 2025",
        "item": "https://etfpruvodce.cz/kalkulacky"
      }
    ]
  };

  const sitemapSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Finanční kalkulačky 2025 - Kompletní přehled",
    "description": "Kompletní přehled všech finančních kalkulaček. Hypotéka, úvěry, čistá mzda, investice, penzi. Bezplatné nástroje s aktuálními daty 2025.",
    "url": "https://etfpruvodce.cz/kalkulacky",
    "breadcrumb": breadcrumbSchema,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Finanční kalkulačky",
      "numberOfItems": "9",
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "position": 1,
          "name": "Hypoteční kalkulačka 2025",
          "url": "https://etfpruvodce.cz/kalkulacky/hypotecni-kalkulacka",
          "applicationCategory": "FinanceApplication"
        },
        {
          "@type": "SoftwareApplication",
          "position": 2,
          "name": "Kalkulačka čisté mzdy 2025",
          "url": "https://etfpruvodce.cz/kalkulacky/cisty-plat-2025",
          "applicationCategory": "FinanceApplication"
        },
        {
          "@type": "SoftwareApplication",
          "position": 3,
          "name": "Úvěrová kalkulačka - spotřebitelský úvěr",
          "url": "https://etfpruvodce.cz/kalkulacky/spotrebitelsky-uver",
          "applicationCategory": "FinanceApplication"
        }
      ]
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Finanční kalkulačky 2025 - Hypotéka, úvěry, mzda | ETF průvodce.cz"
        description="✅ Kompletní přehled finančních kalkulaček 2025. Hypoteční kalkulačka, čistá mzda, spotřebitelské úvěry, investiční nástroje. Vše zdarma s aktuálními daty."
        canonical="https://etfpruvodce.cz/kalkulacky"
        keywords="finanční kalkulačky 2025, hypoteční kalkulačka, kalkulačka čisté mzdy, úvěrová kalkulačka, investiční kalkulačky, bezplatné nástroje"
        schema={sitemapSchema}
        ogImage="https://etfpruvodce.cz/og-kalkulacky.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero sekce */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            📊 Aktualizováno pro rok 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Finanční kalkulačky 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Kompletní sada bezplatných finančních nástrojů s nejnovějšími daty pro rok 2025. 
            Od hypotéky přes investice až po pokročilé analýzy portfolia.
          </p>
        </div>

        {/* Proč naše kalkulačky */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Proč jsou naše kalkulačky nejlepší?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">✓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Aktuální data 2025</h3>
              <p className="text-gray-700">
                Všechny sazby, daňové změny a legislativa aktualizovaná pro rok 2025. 
                Žádná zastaralá data.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Přesné výpočty</h3>
              <p className="text-gray-700">
                Matematicky správné algoritmy ověřené finančními experty. 
                Stejná přesnost jako používají banky.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🆓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Zdarma navždy</h3>
              <p className="text-gray-700">
                Všechny nástroje jsou a zůstanou zdarma. Žádné skryté poplatky, 
                registrace nebo omezení.
              </p>
            </div>
          </div>
        </div>

        {/* Samotný hub s kalkulačkami */}
        <CalculatorHub />

        {/* Social sharing */}
        <SocialSharing
          url="https://etfpruvodce.cz/kalkulacky"
          title="Finanční kalkulačky 2025 - Hypotéka, úvěry, mzda"
          description="Kompletní přehled finančních kalkulaček 2025. Hypoteční kalkulačka, čistá mzda, spotřebitelské úvěry, investiční nástroje. Vše zdarma s aktuálními daty."
          className="mt-16"
        />

        {/* Často kladené otázky */}
        <div className="bg-white rounded-2xl border p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Často kladené otázky</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Jsou kalkulačky aktuální pro rok 2025?</h3>
                <p className="text-gray-600 text-sm">
                  Ano, všechny nástroje jsou pravidelně aktualizovány s nejnovějšími sazbami, 
                  daňovými změnami a legislativními úpravami pro rok 2025.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Je používání kalkulaček zdarma?</h3>
                <p className="text-gray-600 text-sm">
                  Všechny kalkulačky jsou zcela zdarma bez jakýchkoli omezení. 
                  Nepotřebujete registraci ani předplatné.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Jak přesné jsou výpočty?</h3>
                <p className="text-gray-600 text-sm">
                  Používáme stejné matematické vzorce jako banky a finanční instituce. 
                  Výsledky jsou kontrolovány finančními experty.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Lze kalkulačky používat na mobilu?</h3>
                <p className="text-gray-600 text-sm">
                  Ano, všechny nástroje jsou plně responzivní a fungují perfektně 
                  na mobilních telefonech a tabletech.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ukládáte naše data?</h3>
                <p className="text-gray-600 text-sm">
                  Ne, všechny výpočty probíhají přímo ve vašem prohlížeči. 
                  Žádná data se neukládají ani neodesílají.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Máte i pokročilé nástroje?</h3>
                <p className="text-gray-600 text-sm">
                  Ano, nabízíme i Monte Carlo simulace, analýzu měnových rizik 
                  a další pokročilé nástroje pro zkušené investory.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Související stránky */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Srovnání ETF fondů",
              href: "/srovnani-etf",
              description: "Najděte nejlepší ETF pro investice"
            },
            {
              title: "Nejlepší brokeři 2025",
              href: "/srovnani-brokeru",
              description: "Kde nejlépe investovat a obchodovat"
            },
            {
              title: "Návod pro začátečníky",
              href: "/navod-pro-zacatecniky",
              description: "Jak začít s investováním do ETF"
            },
            {
              title: "Investiční tipy 2025",
              href: "/tipy",
              description: "Aktuální investiční strategie a rady"
            }
          ]}
          title="Další užitečné stránky"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default CalculatorSitemapPage;