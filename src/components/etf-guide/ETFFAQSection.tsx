import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const ETFFAQSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-6 hover:bg-violet-200 transition-colors hover-scale">
          <HelpCircle className="w-8 h-8 text-violet-700" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Často kladené otázky o ETF</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Odpovědi na nejčastější dotazy začátečníků o ETF fondech</p>
      </div>
      
      <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-gray-200">
            <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 hover:text-violet-700 py-6 transition-colors">Co jsou ETF fondy?</AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
              ETF (Exchange Traded Fund) je investiční fond, který sleduje konkrétní index (např. S&P 500) a obchoduje se na burze jako akcie. 
              Jedním nákupem ETF získáte podíl ve stovkách nebo tisících firem. Je to nejjednodušší způsob, jak diverzifikovaně investovat.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-200">
            <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 hover:text-violet-700 py-6 transition-colors">Jak fungují ETF?</AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
              ETF automaticky kopíruje výkonnost konkrétního indexu (např. FTSE All-World). Když se index zvýší o 10%, zvýší se i hodnota vašeho ETF o podobnou částku. 
              ETF se nakupuje a prodává na burze kdykoliv během obchodních hodin, stejně jako akcie.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-gray-200">
            <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 hover:text-violet-700 py-6 transition-colors">ETF vs akcie rozdíl?</AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
              <strong>Akcie</strong> = podíl v jedné konkrétní firmě (např. Apple). Vysoké riziko, pokud se firmě nedaří.
              <br/><strong>ETF</strong> = podíl ve stovkách firem najednou. Nižší riziko díky diverzifikaci. 
              Pro začátečníky jsou ETF bezpečnější volba než jednotlivé akcie.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b border-gray-200">
            <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 hover:text-violet-700 py-6 transition-colors">Nejlepší ETF pro začátečníky?</AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
              <strong><Link to="/etf/vwce" className="text-violet-600 hover:text-violet-800 hover:underline">VWCE (Vanguard FTSE All-World)</Link></strong> nebo <strong><Link to="/etf/swda" className="text-violet-600 hover:text-violet-800 hover:underline">SWDA (iShares Core MSCI World)</Link></strong> - oba obsahují tisíce firem z celého světa. 
              Jsou to ideální první ETF pro začátečníky, protože poskytují maximální diverzifikaci a nízké poplatky (0,20-0,22% ročně). Více v našem <Link to="/srovnani-etf" className="text-violet-600 hover:text-violet-800 hover:underline">srovnání ETF</Link>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-b border-gray-200">
            <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 hover:text-violet-700 py-6 transition-colors">S kolika penězi začít investovat do ETF?</AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
              Můžete začít už s <strong>1000-5000 Kč</strong>. Moderní brokeři (<Link to="/brokers/trading212" className="text-violet-600 hover:text-violet-800 hover:underline">Trading 212</Link>, <Link to="/brokers/xtb" className="text-violet-600 hover:text-violet-800 hover:underline">XTB</Link>) umožňují nákup frakčních podílů, 
              takže nemusíte kupovat celý podíl ETF. Důležitější než velikost počáteční investice je pravidelnost - 
              investujte raději menší částky každý měsíc. Více v <Link to="/kde-koupit-etf" className="text-violet-600 hover:text-violet-800 hover:underline">průvodci kde koupit ETF</Link>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="border-b border-gray-200">
            <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 hover:text-violet-700 py-6 transition-colors">Jsou ETF bezpečné?</AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
              ETF s označením <strong>UCITS</strong> (většina evropských ETF) jsou velmi bezpečné díky přísné regulaci EU. 
              Vaše peníze jsou odděleny od majetku správce fondu. I kdyby správce ETF zbankrotoval, 
              vaše investice zůstávají chráněny. Tržní riziko ale zůstává - hodnota ETF kolísá s trhem. 
              Více o bezpečnosti v našem <Link to="/kde-koupit-etf" className="text-violet-600 hover:text-violet-800 hover:underline">průvodci bezpečností</Link>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7" className="border-b-0">
            <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800 hover:text-violet-700 py-6 transition-colors">Jak dlouho držet ETF investice?</AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 pb-6">
              ETF jsou určené pro <strong>dlouhodobé investování (5+ let)</strong>. Čím déle držíte, tím více se vyrovnají krátkodobé výkyvy. 
              Historicky akciové trhy rostly dlouhodobě průměrně 7-10% ročně. V Česku jsou navíc zisky po 3 letech držení osvobozeny od daně.
              Vypočítejte si výnosy v naší <Link to="/kalkulacky/investment-calculator" className="text-violet-600 hover:text-violet-800 hover:underline">investiční kalkulačce</Link>.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ETFFAQSection;