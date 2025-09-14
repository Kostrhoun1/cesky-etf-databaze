
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const ETFFAQSection: React.FC = () => {
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
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 py-6">Co znamená zkratka UCITS?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
                UCITS je regulační rámec EU, který zajišťuje vysokou ochranu investorů. ETF s označením UCITS splňují přísné standardy, a proto jsou pro evropské investory doporučenou volbou.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 py-6">Jaký je rozdíl mezi ETF a akcií?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
                Akcie je podíl v jedné firmě. ETF je koš mnoha akcií (nebo jiných aktiv). Nákupem ETF sázíte na úspěch celého trhu nebo sektoru, což je méně rizikové.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 py-6">Jaký je rozdíl mezi ETF a podílovým fondem?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
                ETF mají typicky nižší poplatky a obchodují se na burze jako akcie. Klasické podílové fondy jsou často dražší a méně flexibilní při obchodování.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 py-6">Kolik peněz potřebuji, abych mohl začít?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
                Díky moderním brokerům můžete začít investovat do ETF i s velmi malými částkami, často již od několika stovek korun, díky možnosti nákupu frakčních podílů.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-b-0">
              <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 py-6">Je investování do ETF bezpečné?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
                Každá investice nese riziko. Bezpečnost ETF spočívá v jejich silné regulaci (zejména UCITS) a široké diverzifikaci. Váš majetek je navíc oddělen od majetku emitenta.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ETFFAQSection;
