
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { faqItems } from '@/data/whatAreETFsData';

const FAQSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 text-white rounded-2xl mb-6 shadow-lg">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Často kladené otázky</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Odpovědi na nejčastější dotazy o ETF</p>
      </div>
      
      <Card className="bg-white border-0 shadow-xl">
        <CardContent className="p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className={index === faqItems.length - 1 ? "border-b-0" : "border-b border-gray-200"}>
                <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQSection;
