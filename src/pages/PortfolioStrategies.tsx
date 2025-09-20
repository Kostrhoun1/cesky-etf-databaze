import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import PortfolioStrategies from '@/components/portfolio/PortfolioStrategies';
import PortfolioWizard from '@/components/onboarding/PortfolioWizard';
import InternalLinking from '@/components/SEO/InternalLinking';
import SocialSharing from '@/components/SocialSharing';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, BarChart3, Users, TrendingUp } from 'lucide-react';

const PortfolioStrategiesPage: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <Layout>
      <SEOHead 
        title="5 Osvědčených Portfolio Strategií pro ETF Investory 2025"
        description="Porovnejte reálnou performance 5 investičních strategií: Permanentní Portfolio, Ray Dalio All-Weather, Bogleheads Three-Fund a další. Včetně aktuálních dat z databáze ETF."
        keywords="portfolio strategie, ETF strategie, investiční portfolio, Ray Dalio All Weather, Bogleheads, permanentní portfolio, performance ETF, asset allocation"
        schema={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Portfolio Strategie pro ETF Investory",
          "description": "5 osvědčených portfolio strategií s reálnou performance z databáze ETF fondů",
          "provider": {
            "@type": "Organization",
            "name": "ETF průvodce.cz",
            "url": "https://etfpruvodce.cz"
          },
          "category": "Investment Strategy",
          "audience": {
            "@type": "Audience",
            "audienceType": "investors"
          }
        }}
      />
      
      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-violet-50 to-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Vyberte si Portfolio Strategii
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Porovnejte reálnou performance 5 osvědčených investičních strategií vypočítanou z aktuálních dat více než 3000 ETF fondů v naší databázi.
            </p>
          </div>
        </div>

        {/* Wizard Modal */}
        {showWizard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              <PortfolioWizard onClose={() => setShowWizard(false)} />
            </div>
          </div>
        )}

        {/* Strategy Selection CTA */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-gradient-to-r from-blue-50 to-violet-50 border-violet-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Nejste si jisti kterou strategii vybrat?</h3>
                  <p className="text-gray-600 text-sm">Nechte si vytvořit personalizované portfolio na míru vašemu profilu</p>
                </div>
              </div>
              <Button
                onClick={() => setShowWizard(true)}
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Použít průvodce
              </Button>
            </div>
          </Card>
        </div>
        
        <PortfolioStrategies />

        {/* Educational Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Jak vybrat správnou strategii</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">📊 Podle tolerance k riziku</h3>
                <ul className="space-y-2 text-blue-800">
                  <li><strong>Konzervativní:</strong> Permanentní 4% nebo All-Weather</li>
                  <li><strong>Umírněné:</strong> Nobel 6% nebo Three-Fund</li>
                  <li><strong>Agresivní:</strong> Akciové 8% portfolio</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-900 mb-4">⏰ Podle investičního horizontu</h3>
                <ul className="space-y-2 text-green-800">
                  <li><strong>5-10 let:</strong> Více dluhopisů (40-60%)</li>
                  <li><strong>10-20 let:</strong> Vyvážené portfolio (60/40)</li>
                  <li><strong>20+ let:</strong> Akciově orientované (80-100%)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Praktické tipy pro implementaci</h2>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-4">🔄 Rebalancing portfolia</h3>
              <p className="mb-4">
                Pravidelně přebalancujte portfolio, aby se udržely cílové alokace:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Čtvrtletně:</strong> Pro aktivní investory</li>
                <li><strong>Pololetně:</strong> Doporučeno pro většinu investorů</li>
                <li><strong>Ročně:</strong> Minimální frekvence</li>
                <li><strong>Po větších pohybech:</strong> Když alokace vybočí o více než 5%</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-4">💰 Pravidelné investování (DCA)</h3>
              <p className="mb-4">
                Dollar Cost Averaging snižuje riziko špatného časování trhu:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Investujte stejnou částku každý měsíc</li>
                <li>Nekupujte najednou, rozložte nákupy v čase</li>
                <li>Ignorujte krátkodobé výkyvy trhu</li>
                <li>Zaměřte se na dlouhodobý růst</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <InternalLinking
          relatedLinks={[
            {
              title: "Průvodce investováním do ETF",
              href: "/navod-pro-zacatecniky",
              description: "Kompletní PDF průvodce s detailním popisem strategií"
            },
            {
              title: "Srovnání ETF fondů",
              href: "/srovnani-etf",
              description: "Najděte nejlepší ETF pro vaše portfolio"
            },
            {
              title: "Investiční kalkulačka",
              href: "/kalkulacky/investicni-kalkulacka",
              description: "Simulujte růst vašeho portfolia"
            },
            {
              title: "Monte Carlo simulátor",
              href: "/kalkulacky/monte-carlo-simulator",
              description: "Analýza rizik a pravděpodobnosti úspěchu"
            },
            {
              title: "Nejlepší ETF 2025",
              href: "/tipy/nejlepsi-etf-2025",
              description: "Doporučené ETF fondy pro jednotlivé strategie"
            }
          ]}
          title="Související nástroje a články"
          className="mt-16"
        />

        {/* Social Sharing */}
        <SocialSharing 
          url="https://etfpruvodce.cz/portfolio-strategie"
          title="5 Osvědčených Portfolio Strategií pro ETF Investory 2025"
          description="Porovnejte reálnou performance investičních strategií s aktuálními daty z databáze ETF fondů."
          shareTitle="Sdílejte portfolio strategie"
          shareText="Objevte nejlepší investiční strategie pro ETF s reálnou performance!"
          className="mt-8"
        />
      </div>
    </Layout>
  );
};

export default PortfolioStrategiesPage;