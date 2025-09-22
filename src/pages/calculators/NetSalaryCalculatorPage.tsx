import React from 'react';
import Layout from '@/components/Layout';
import NetSalaryCalculator from '@/components/tools/NetSalaryCalculator';
import SEOHead from '@/components/SEO/SEOHead';
import FAQSection from '@/components/SEO/FAQSection';
import InternalLinking from '@/components/SEO/InternalLinking';
import StructuredData from '@/components/SEO/StructuredData';
import SocialSharing from '@/components/SocialSharing';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, TrendingUp, Shield, Users } from 'lucide-react';

const NetSalaryCalculatorPage: React.FC = () => {
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
        "name": "Kalkulačky",
        "item": "https://etfpruvodce.cz/nastroje"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Kalkulačka čisté mzdy 2025",
        "item": "https://etfpruvodce.cz/kalkulacky/cisty-plat-2025"
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kalkulačka čisté mzdy 2025 - Výpočet čisté mzdy ČR",
    "description": "Bezplatná kalkulačka čisté mzdy podle aktuální české legislativy 2025. Výpočet pojistného, daní, slev na dani pro zaměstnance i důchodce.",
    "url": "https://etfpruvodce.cz/kalkulacky/cisty-plat-2025",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Výpočet čisté mzdy podle legislativy 2025",
      "Sociální a zdravotní pojištění",
      "Daň z příjmů a slevy na dani",
      "Kalkulace pro pracující důchodce",
      "Náklady zaměstnavatele",
      "Srovnání hrubé a čisté mzdy"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Kalkulačka čisté mzdy 2025 - Výpočet čistého platu online | ETF průvodce.cz"
        description="✅ Kalkulačka čisté mzdy 2025 podle aktuální české legislativy. Spočítejte si čistý plat, daně, pojistné a slevy na dani. Zdarma a aktuální sazby."
        canonical="https://etfpruvodce.cz/kalkulacky/cisty-plat-2025"
        keywords="kalkulačka čisté mzdy, výpočet čisté mzdy 2025, čistý plat, daň z příjmů, sociální pojištění, zdravotní pojištění, slevy na dani, hrubá mzda"
        schema={calculatorSchema}
        ogImage="https://etfpruvodce.cz/og-kalkulacka-ciste-mzdy.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero sekce */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Kalkulačka čisté mzdy 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kalkulačka čisté mzdy 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Spočítejte si čistou mzdu podle aktuální české legislativy pro rok 2025.
          </p>
        </div>

        {/* Samotná kalkulačka */}
        <NetSalaryCalculator />

        {/* Jak funguje výpočet mzdy */}
        <div className="bg-white rounded-2xl border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Jak se počítá čistá mzda v ČR</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold mb-2">Hrubá mzda</h3>
                <p className="text-gray-600">Výchozí částka před všemi odpočty podle pracovní smlouvy.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold mb-2">Pojistné na sociální zabezpečení (7,1%)</h3>
                <p className="text-gray-600">Odvod na důchodové (6,5%), nemocenské (0,6%) a státní politiku zaměstnanosti.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold mb-2">Pojistné na zdravotní pojištění (4,5%)</h3>
                <p className="text-gray-600">Odvod na veřejné zdravotní pojištění.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold mb-2">Daň z příjmů (15%)</h3>
                <p className="text-gray-600">Daň z příjmů fyzických osob přímo z hrubé mzdy (od roku 2021).</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div>
                <h3 className="font-semibold mb-2">Slevy na dani</h3>
                <p className="text-gray-600">Sleva na poplatníka (2 570 Kč měsíčně) a další slevy podle situace.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social sharing */}
        <SocialSharing
          url="https://etfpruvodce.cz/kalkulacky/cisty-plat-2025"
          title="Kalkulačka čisté mzdy 2025 - Výpočet čisté mzdy ČR"
          description="Spočítejte si čistou mzdu podle aktuální české legislativy 2025. Pojistné, daň z příjmů, slevy na dani. Přesný výpočet take-home platu."
          className="mt-12"
        />

        {/* FAQ sekce */}
        <FAQSection
          title="Často kladené otázky o výpočtu čisté mzdy"
          faqs={[
            {
              question: "Jak se počítá čistá mzda v České republice?",
              answer: "Čistá mzda = Hrubá mzda - pojistné na sociální zabezpečení (7,1%) - pojistné na zdravotní pojištění (4,5%) - daň z příjmů (15% z hrubé mzdy) + slevy na dani. Od roku 2021 se daň počítá přímo z hrubé mzdy, superhrubá mzda byla zrušena."
            },
            {
              question: "Jaké jsou aktuální sazby pojistného a daní pro rok 2025?",
              answer: "Pro rok 2025: sociální pojištění zaměstnanec 7,1% (6,5% důchodové + 0,6% nemocenské), zdravotní pojištění zaměstnanec 4,5%, daň z příjmů 15%. Zaměstnavatel platí navíc 24,8% na sociální + 9% na zdravotní pojištění. Sleva na poplatníka je 30 840 Kč ročně (2 570 Kč měsíčně)."
            },
            {
              question: "Jak funguje sleva na dani na poplatníka?",
              answer: "Sleva na poplatníka je 30 840 Kč ročně (2 570 Kč měsíčně). Tato sleva se odečítá přímo z vypočtené daně, ne ze základu daně. Pokud je sleva vyšší než daň, dostanete daň nula, ale nevracejí se žádné peníze zpět."
            },
            {
              question: "Jak se liší výpočet mzdy u pracujících důchodců?",
              answer: "Pracující důchodci mají od roku 2025 slevu na důchodovém pojištění (6,5%), platí pouze nemocenské pojištění (0,6%) a zdravotní pojištění (4,5%). Celkem tedy 5,1% místo standardních 11,6%. Daň z příjmů a slevy na dani zůstávají stejné."
            },
            {
              question: "Co je to superhrubá mzda?",
              answer: "Superhrubá mzda byla zrušena k 1.1.2021. Dříve se z ní počítala daň z příjmů. Od roku 2021 se daň počítá přímo z hrubé mzdy sazbou 15% (místo 15% ze superhrubé). Díky tomu mají zaměstnanci vyšší čistou mzdu než v minulosti."
            },
            {
              question: "Jaké další slevy na dani mohu uplatnit?",
              answer: "Kromě základní slevy na poplatníka můžete uplatnit: slevu na manžela/manželku (24 840 Kč), slevu na invaliditu (I./II. stupeň 2 520 Kč, III. stupeň 5 040 Kč ročně), slevu pro držitele ZTP/P (16 140 Kč), daňové zvýhodnění na děti (progresivní: 1. dítě 15 204 Kč, 2. dítě 22 320 Kč, 3.+ dítě 27 840 Kč ročně)."
            },
            {
              question: "Kolik stojí zaměstnavatele můj plat?",
              answer: "Celkové náklady zaměstnavatele = hrubá mzda + 33,8% (pojistné zaměstnavatele). Z toho 24,8% jde na sociální pojištění a 9% na zdravotní pojištění. Při hrubé mzdě 50 tis. Kč platí zaměstnavatel celkem 66,9 tis. Kč."
            }
          ]}
          className="mt-16"
        />

        {/* Související nástroje */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Investiční kalkulačka",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Investujte přebytky po základních výdajích"
            },
            {
              title: "Nouzová rezerva",
              href: "/kalkulacky/nouzova-rezerva",
              description: "Spočítejte si optimální velikost rezervy"
            },
            {
              title: "Hypoteční kalkulačka",
              href: "/kalkulacky/hypotecni-kalkulacka",
              description: "Zjistěte si dostupnost hypotéky podle příjmu"
            },
            {
              title: "Penzijní plánovač",
              href: "/kalkulacky/penzijni-planovac",
              description: "Plánování dlouhodobých úspor na penzi"
            }
          ]}
          title="Související kalkulačky a nástroje"
          className="mt-16"
        />
      </div>
    </Layout>
  );
};

export default NetSalaryCalculatorPage;