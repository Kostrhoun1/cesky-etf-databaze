import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  title = "Často kladené otázky",
  faqs,
  className = ""
}) => {
  // Group FAQs by category if categories exist
  const groupedFAQs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'Obecné';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
          <div key={category} className="mb-8 last:mb-0">
            {Object.keys(groupedFAQs).length > 1 && (
              <h3 className="text-lg font-semibold mb-4 text-gray-800">{category}</h3>
            )}
            
            <Accordion type="single" collapsible className="w-full">
              {categoryFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div 
                      className="prose prose-sm max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {/* Hidden structured data for AI consumption */}
        <div className="hidden" data-ai-faq="true">
          {faqs.map((faq, index) => (
            <div key={index} data-faq-item="true">
              <h3 data-faq-question="true">{faq.question}</h3>
              <p data-faq-answer="true" dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Predefined FAQ sets for different pages
export const ETFFAQs: FAQItem[] = [
  {
    id: 'co-jsou-etf',
    question: 'Co jsou ETF fondy?',
    answer: 'ETF (Exchange Traded Funds) jsou investiční fondy obchodované na burze, které sledují výkonnost indexu, komodity nebo jiného aktiva. Umožňují investorům koupit podíl ve velkém portfoliu akcií nebo dluhopisů jednou transakcí.',
    category: 'Základy ETF'
  },
  {
    id: 'nejlepsi-etf-2025',
    question: 'Jaké jsou nejlepší ETF fondy pro rok 2025?',
    answer: 'Pro rok 2025 doporučujeme: <strong>Vanguard FTSE All-World (VWCE)</strong> pro globální diverzifikaci, <strong>iShares Core MSCI World (IWDA)</strong> pro rozvinuté trhy, <strong>iShares Core S&P 500 (CSPX)</strong> pro americký trh. Všechny mají nízké poplatky pod 0,25% TER.',
    category: 'Doporučení 2025'
  },
  {
    id: 'kde-koupit-etf',
    question: 'Kde koupit ETF fondy v Česku?',
    answer: 'Nejlepší brokeři pro Čechy v roce 2025: <strong>XTB</strong> (0% poplatky na ETF), <strong>DEGIRO</strong> (nízké poplatky), <strong>Trading 212</strong> (0% poplatky), <strong>Interactive Brokers</strong> (pro větší investory). Všichni jsou regulovaní v EU.',
    category: 'Brokeři'
  },
  {
    id: 'kolik-investovat',
    question: 'Kolik peněz potřebuji na začátek?',
    answer: 'Můžete začít už s 500-1000 Kč měsíčně. Důležité je mít nejdříve nouzovou rezervu (3-6 měsíčních výdajů) a investovat pouze peníze, které nebudete 5+ let potřebovat.',
    category: 'Začátečníci'
  },
  {
    id: 'ter-poplatky',
    question: 'Co je TER a jaký by měl být?',
    answer: 'TER (Total Expense Ratio) je roční poplatek za správu fondu. Pro ETF by měl být pod 0,5%, ideálně pod 0,25%. Například Vanguard FTSE All-World má TER 0,22%.',
    category: 'Poplatky'
  },
  {
    id: 'dane-etf',
    question: 'Jak se daní výnosy z ETF?',
    answer: 'V Česku se daní příjmy z kapitálových výnosů 15% sazbou. Pokud držíte ETF déle než 3 roky, je prodej osvobozen od daně. Dividendy se daní podle typu fondu (akumulační vs. distribuční).',
    category: 'Daně'
  }
];

export const BrokerFAQs: FAQItem[] = [
  {
    id: 'nejlepsi-broker-2025',
    question: 'Který broker je nejlepší pro ETF v roce 2025?',
    answer: 'Pro začátečníky doporučujeme <strong>XTB</strong> (skvělá podpora, 0% poplatky na ETF). Pro zkušené investory <strong>DEGIRO</strong> (nejnižší poplatky). Pro mobilní investování <strong>Trading 212</strong> (intuitivní aplikace).',
    category: 'Výběr brokera'
  },
  {
    id: 'poplatky-brokeri',
    question: 'Jaké jsou poplatky u různých brokerů?',
    answer: '<strong>XTB:</strong> 0% na ETF, DEGIRO: od 1€ + 0,02%, <strong>Trading 212:</strong> 0% na akcie a ETF, <strong>Interactive Brokers:</strong> od $1 za transakci. Pozor na skryté poplatky za směnu měn.',
    category: 'Poplatky'
  },
  {
    id: 'regulace-brokeri',
    question: 'Jsou čeští brokeři bezpeční?',
    answer: 'Všichni doporučení brokeři jsou regulovaní v EU (XTB v Polsku, DEGIRO v Nizozemsku, Trading 212 v Bulharsku). Investice jsou chráněny do 20 000€ evropským fondem pojištění vkladů.',
    category: 'Bezpečnost'
  }
];

export default FAQSection;