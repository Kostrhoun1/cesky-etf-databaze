
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, XCircle, BarChart, Users, Scale, Shield, ShoppingCart, HelpCircle } from 'lucide-react';

const WhatAreETFs: React.FC = () => {
  useEffect(() => {
    document.title = 'Co jsou ETF fondy? - Detailní průvodce | ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Vše, co potřebujete vědět o ETF. Zjistěte co jsou ETF, jak fungují, jejich výhody, nevýhody, typy a jak do nich investovat. Nejlepší průvodce pro české investory 2025.'
    );
  }, []);

  const SectionCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <Card className="mb-8 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-violet-100 text-violet-600 p-2 rounded-lg">{icon}</div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="prose prose-lg max-w-none text-gray-700">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="text-center py-16 px-4 sm:px-6 lg:px-8 bg-white border-b">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Co jsou ETF fondy?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Váš detailní a srozumitelný průvodce světem burzovně obchodovaných fondů (ETF) pro české investory.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <SectionCard icon={<Scale className="w-6 h-6" />} title="Co je to ETF? Stručná definice">
            <p>
              ETF je zkratka pro <strong>Exchange Traded Fund</strong>, což v češtině znamená <strong>burzovně obchodovaný fond</strong>. Představte si ho jako investiční koš, který obsahuje desítky, stovky nebo i tisíce různých aktiv – nejčastěji akcií nebo dluhopisů.
            </p>
            <p>
              Na rozdíl od tradičních podílových fondů se ETF obchodují na burze stejně snadno jako jednotlivé akcie. Můžete je kdykoliv během obchodních hodin nakoupit nebo prodat za aktuální tržní cenu.
            </p>
            <blockquote>
              Klíčovou vlastností většiny ETF je, že <strong>pasivně kopírují</strong> výkonnost určitého tržního indexu, jako je například S&P 500 (500 největších amerických firem) nebo MSCI World (velké firmy z celého světa).
            </blockquote>
          </SectionCard>

          <SectionCard icon={<Users className="w-6 h-6" />} title="Jak ETF fungují?">
            <p>
              Mechanismus fungování ETF je postaven na dvou klíčových procesech: <strong>tvorba (creation)</strong> a <strong>odkup (redemption)</strong>. Tyto operace probíhají na tzv. primárním trhu a starají se o ně velcí institucionální investoři, známí jako <strong>autorizovaní participanti (AP)</strong>.
            </p>
            <ol>
              <li><strong>Tvorba nových podílů:</strong> Když je po ETF poptávka, AP nakoupí na trhu všechna aktiva (např. akcie) přesně v takovém poměru, v jakém jsou v daném indexu. Tento koš aktiv pak smění s emitentem ETF za nové "balíčky" ETF podílů.</li>
              <li><strong>Prodej na burze:</strong> AP tyto nově vytvořené ETF podíly prodává na burze běžným investorům, jako jste vy. Tím se zajišťuje, že cena ETF na burze velmi přesně odpovídá hodnotě aktiv, která fond drží.</li>
              <li><strong>Odkup podílů:</strong> Proces funguje i opačně. Když poptávka klesá, AP skoupí na burze větší množství ETF podílů, smění je s emitentem zpět za podkladová aktiva a ta pak prodá na trhu.</li>
            </ol>
            <p>
              Tento mechanismus udržuje cenu ETF velmi blízko jeho reálné vnitřní hodnotě (tzv. NAV - Net Asset Value).
            </p>
          </SectionCard>

          <SectionCard icon={<BarChart className="w-6 h-6" />} title="Výhody a nevýhody ETF">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" /> Výhody
                </h4>
                <ul className="space-y-3">
                  <li><strong>Nízké náklady:</strong> Díky pasivní správě mají ETF výrazně nižší roční poplatky (TER) než aktivně řízené fondy, typicky mezi 0.05% a 0.5%.</li>
                  <li><strong>Okamžitá diverzifikace:</strong> Jedním nákupem získáte podíl v desítkách až tisících firem, což snižuje riziko spojené s investicí do jedné společnosti.</li>
                  <li><strong>Vysoká likvidita:</strong> ETF můžete nakoupit a prodat kdykoliv během obchodních hodin na burze za aktuální kurz.</li>
                  <li><strong>Transparentnost:</strong> Emitenti ETF denně zveřejňují přesné složení fondu. Vždy víte, do čeho investujete.</li>
                  <li><strong>Daňová efektivita:</strong> V ČR platí pro cenné papíry (včetně ETF) časový test 3 roky. Po této době je zisk z prodeje osvobozen od daně z příjmu.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-red-600">
                  <XCircle className="w-5 h-5" /> Nevýhody
                </h4>
                <ul className="space-y-3">
                  <li><strong>Tržní riziko:</strong> Hodnota ETF kopíruje trh. Pokud trh klesá, klesá i hodnota vaší investice.</li>
                  <li><strong>Spread (rozpětí):</strong> Při nákupu a prodeji existuje malý rozdíl mezi nákupní (ask) a prodejní (bid) cenou.</li>
                  <li><strong>Tracking Error (Chyba sledování):</strong> Může dojít k nepatrné odchylce ve výkonnosti ETF oproti indexu, který sleduje.</li>
                  <li><strong>Riziko protistrany:</strong> U syntetických ETF existuje malé riziko spojené s derivátovou smlouvou (swapem).</li>
                </ul>
              </div>
            </div>
          </SectionCard>
          
          <SectionCard icon={<Shield className="w-6 h-6" />} title="Důležité typy ETF">
            <h4 className="font-semibold text-lg mb-3">Akumulační vs. Distribuční</h4>
            <p>Toto je klíčové rozhodnutí při výběru ETF:</p>
            <ul className="list-disc pl-5 mb-6">
                <li><strong>Akumulační (Acc):</strong> Fond přijaté dividendy automaticky reinvestuje zpět do fondu. Tím se zvyšuje hodnota vašich podílů a vy využíváte sílu složeného úročení. Nemusíte řešit zdanění dividend. Ideální pro dlouhodobé budování majetku.</li>
                <li><strong>Distribuční (Dist/Inc):</strong> Fond dividendy pravidelně (např. čtvrtletně) vyplácí investorům na účet. Musíte řešit jejich zdanění, ale získáte pasivní příjem.</li>
            </ul>

            <h4 className="font-semibold text-lg mb-3">Fyzické vs. Syntetické</h4>
            <p>Toto se týká způsobu, jakým ETF kopíruje index:</p>
            <ul className="list-disc pl-5">
                <li><strong>Fyzické ETF:</strong> Fond reálně nakupuje a drží akcie nebo jiná aktiva, která jsou součástí indexu. Jsou transparentnější a jednodušší na pochopení. Většina ETF pro běžné investory je fyzických.</li>
                <li><strong>Syntetické ETF:</strong> Fond nenakupuje aktiva přímo, ale uzavírá s finanční institucí (typicky velkou bankou) smlouvu o výměně, tzv. swap. Banka se zavazuje, že fondu dodá výkonnost daného indexu. Syntetická ETF mohou lépe sledovat některé exotické trhy, ale nesou s sebou riziko protistrany.</li>
            </ul>
          </SectionCard>

          <SectionCard icon={<ShoppingCart className="w-6 h-6" />} title="Jak začít investovat do ETF?">
            <ol className="space-y-4">
              <li>
                <strong>1. Stanovte si cíl a strategii:</strong> Určete si, na jak dlouho chcete investovat (investiční horizont) a jaké riziko jste ochotni podstoupit. To vám pomůže vybrat správný typ ETF.
              </li>
              <li>
                <strong>2. Vyberte si brokera:</strong> Založte si účet u brokera, který nabízí obchodování s ETF. Mezi populární v ČR patří DEGIRO, XTB, Trading 212 nebo Portu. Srovnejte poplatky a podmínky.
              </li>
              <li>
                <strong>3. Vyberte konkrétní ETF:</strong> Použijte náš <Link to="/srovnani-etf" className="text-violet-600 hover:underline">srovnávač ETF</Link> k nalezení fondu, který odpovídá vaší strategii. Sledujte klíčové parametry jako TER, domicil (ideálně Irsko pro daňové výhody), velikost fondu a metodu replikace.
              </li>
              <li>
                <strong>4. Proveďte nákup:</strong> Pošlete peníze na svůj brokerský účet a zadejte pokyn k nákupu vybraného ETF. Můžete investovat jednorázově nebo si nastavit pravidelné měsíční nákupy (DCA - Dollar Cost Averaging).
              </li>
              <li>
                <strong>5. Držte a kontrolujte:</strong> Investování do ETF je maraton, ne sprint. Pravidelně kontrolujte své portfolio (např. 1-2x ročně) a držte se své strategie i během tržních výkyvů.
              </li>
            </ol>
          </SectionCard>
          
          <SectionCard icon={<HelpCircle className="w-6 h-6" />} title="Často kladené otázky (FAQ)">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Co znamená zkratka UCITS?</AccordionTrigger>
                <AccordionContent>
                  UCITS (Undertakings for Collective Investment in Transferable Securities) je regulační rámec Evropské unie, který zajišťuje vysokou úroveň ochrany investorů. Pokud má ETF v názvu "UCITS", znamená to, že splňuje přísné standardy týkající se diverzifikace, likvidity a správy rizik. Pro evropské investory je doporučeno vybírat právě UCITS ETF.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Jaký je rozdíl mezi ETF a akcií?</AccordionTrigger>
                <AccordionContent>
                  Akcie představuje podíl v jedné jediné společnosti. ETF je koš mnoha akcií (nebo jiných aktiv). Nákupem jedné akcie sázíte na úspěch jedné firmy. Nákupem ETF sázíte na úspěch celého trhu nebo sektoru, což je mnohem méně rizikové.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Jaký je rozdíl mezi ETF a podílovým fondem?</AccordionTrigger>
                <AccordionContent>
                  Hlavní rozdíly jsou v nákladech a způsobu obchodování. ETF jsou typicky pasivně spravované s nízkými poplatky a obchodují se na burze jako akcie. Klasické podílové fondy jsou často aktivně spravované s vyššími poplatky a nakupujete a prodáváte je za cenu platnou jednou denně přímo od fondové společnosti.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Kolik peněz potřebuji, abych mohl začít?</AccordionTrigger>
                <AccordionContent>
                  Díky moderním brokerům můžete začít investovat do ETF i s velmi malými částkami, často již od několika stovek korun. Někteří brokeři umožňují nákup tzv. frakčních podílů, takže můžete koupit i jen část jednoho ETF.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Je investování do ETF bezpečné?</AccordionTrigger>
                <AccordionContent>
                  Každá investice s sebou nese riziko. Hodnota ETF může klesat i stoupat. Bezpečnost ETF však spočívá v jejich silné regulaci (zejména UCITS ETF) a široké diverzifikaci. Majetek fondu je navíc oddělen od majetku emitenta (správcovské společnosti), takže i v případě jejího krachu jsou vaše investice v bezpečí.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionCard>


          {/* CTA Section */}
          <Card className="bg-violet-50 border-violet-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Připraveni vybrat své první ETF?
              </h3>
              <p className="text-gray-600 mb-6">
                Použijte náš podrobný srovnávač a filtrujte ETF podle vašich kritérií.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/nastroje">Investiční kalkulačka</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
