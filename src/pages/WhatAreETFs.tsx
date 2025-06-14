
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

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-violet-50 via-white to-green-50">
          <div className="text-center py-20 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight animate-fade-in">
              Co jsou ETF fondy?
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Váš detailní a srozumitelný průvodce světem burzovně obchodovaných fondů (ETF) pro české investory.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
            
            {/* Section 1: Co je to ETF? */}
            <div className="animate-fade-in">
              <div className="flex justify-center mb-6">
                  <div className="bg-violet-100 text-violet-600 p-4 rounded-xl">
                      <Scale className="w-8 h-8" />
                  </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Co je to ETF? Jednoduché vysvětlení</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Představte si ETF jako <strong>velký koš plný různých akcií firem</strong> (nebo dalších investic). Když si koupíte ETF, automaticky tím vlastníte malý kousek <u>mnoha</u> společností najednou – místo toho, abyste vybírali a kupovali každou akcii zvlášť.
                </p>
                <p>
                  ETF funguje na burze úplně stejně jako běžná akcie. Stačí pár kliknutí u brokera a celý koš společností máte během pár vteřin ve svém portfoliu.
                </p>
                <blockquote className="border-l-4 border-violet-400 bg-violet-50 p-4 rounded-r-lg text-violet-800">
                  Z jedním ETF můžete najednou investovat například do všech velkých firem v Evropě, v USA nebo na celém světě – jednoduše, levně a bez složitého vybírání konkrétních akcií.
                </blockquote>
              </div>
            </div>
            
            {/* Section 2: Jak fungují? */}
            <div className="grid md:grid-cols-3 gap-12 items-center animate-fade-in">
                <div className="md:col-span-1 flex flex-col items-center text-center">
                    <div className="bg-green-100 text-green-600 p-4 rounded-xl mb-4">
                        <Users className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Jak ETF fungují?</h2>
                </div>
                <div className="md:col-span-2 prose prose-lg max-w-none text-gray-700">
                  <p>
                    ETF jednoduše koupíte přes svého brokera, stejně jako třeba akcii Applu. Za jednu cenu tak získáte “vstupenku” do celého trhu (např. do stovky či tisícovky firem najednou).
                  </p>
                  <p>
                    <strong>Když cena firem v koši roste, roste i hodnota ETF.</strong> Pokud firmy zlevní, i vaše ETF může krátkodobě ztratit na hodnotě.
                  </p>
                  <ul className="list-disc pl-5 my-4">
                    <li>
                        <strong>Správu koše</strong> řeší automaticky fond – vy jen držíte ETF a nemusíte sledovat jednotlivé akcie.
                    </li>
                    <li>
                        <strong>Obchoduje se na burze</strong> – ETF můžete nakupovat a prodávat téměř kdykoliv během dne, stejně jako akcii.
                    </li>
                  </ul>
                  <p>
                    Výhodou ETF je právě jednoduchost: stačí si vybrat správný “koš” a během chvilky investujete do stovek společností najednou.
                  </p>
                </div>
            </div>
            
            {/* Section 3: Výhody a nevýhody */}
            <div className="animate-fade-in">
              <div className="flex justify-center mb-6">
                  <div className="bg-sky-100 text-sky-600 p-4 rounded-xl">
                      <BarChart className="w-8 h-8" />
                  </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Výhody a nevýhody ETF</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-green-50 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-green-800">
                      <CheckCircle className="w-7 h-7" /> Výhody
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-base">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-500 shrink-0" /><span><strong>Nízké náklady:</strong> Výrazně nižší poplatky (TER) díky pasivní správě.</span></li>
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-500 shrink-0" /><span><strong>Okamžitá diverzifikace:</strong> Jedním nákupem investujete do stovek firem.</span></li>
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-500 shrink-0" /><span><strong>Vysoká likvidita:</strong> Snadný nákup a prodej na burze kdykoliv během dne.</span></li>
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-500 shrink-0" /><span><strong>Transparentnost:</strong> Přesné složení fondu je denně veřejné.</span></li>
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-500 shrink-0" /><span><strong>Daňová efektivita:</strong> Po 3 letech držení je zisk osvobozen od daně.</span></li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-red-800">
                      <XCircle className="w-7 h-7" /> Nevýhody
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-base">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3"><XCircle className="w-5 h-5 mt-1 text-red-500 shrink-0" /><span><strong>Tržní riziko:</strong> Hodnota investice se hýbe s celým trhem.</span></li>
                      <li className="flex items-start gap-3"><XCircle className="w-5 h-5 mt-1 text-red-500 shrink-0" /><span><strong>Spread (rozpětí):</strong> Malý rozdíl mezi nákupní a prodejní cenou.</span></li>
                      <li className="flex items-start gap-3"><XCircle className="w-5 h-5 mt-1 text-red-500 shrink-0" /><span><strong>Tracking Error:</strong> Drobná odchylka od výkonnosti indexu.</span></li>
                      <li className="flex items-start gap-3"><XCircle className="w-5 h-5 mt-1 text-red-500 shrink-0" /><span><strong>Riziko protistrany:</strong> Malé riziko u syntetických ETF (swap).</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 4: Typy ETF */}
            <div className="grid md:grid-cols-3 gap-12 items-center animate-fade-in">
                <div className="md:col-span-1 flex flex-col items-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mb-4">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Důležité typy ETF</h2>
                </div>
                <div className="md:col-span-2 prose prose-lg max-w-none text-gray-700">
                    <h4 className="font-semibold text-xl mb-3">Akumulační vs. Distribuční</h4>
                    <p>Toto je klíčové rozhodnutí při výběru ETF:</p>
                    <ul className="list-disc pl-5 mb-6">
                        <li><strong>Akumulační (Acc):</strong> Fond přijaté dividendy automaticky reinvestuje zpět. Ideální pro dlouhodobé budování majetku.</li>
                        <li><strong>Distribuční (Dist/Inc):</strong> Fond dividendy pravidelně vyplácí. Získáte pasivní příjem, ale musíte řešit daně.</li>
                    </ul>

                    <h4 className="font-semibold text-xl mb-3">Fyzické vs. Syntetické</h4>
                    <p>Toto se týká způsobu, jakým ETF kopíruje index:</p>
                    <ul className="list-disc pl-5">
                        <li><strong>Fyzické ETF:</strong> Fond reálně nakupuje a drží aktiva z indexu. Jsou transparentnější a jednodušší.</li>
                        <li><strong>Syntetické ETF:</strong> Fond využívá derivátovou smlouvu (swap) k dodání výkonnosti indexu. Nesou malé riziko protistrany.</li>
                    </ul>
                </div>
            </div>

            {/* Section 5: Jak začít? */}
            <div className="animate-fade-in">
              <div className="flex justify-center mb-6">
                  <div className="bg-rose-100 text-rose-600 p-4 rounded-xl">
                      <ShoppingCart className="w-8 h-8" />
                  </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Jak začít investovat do ETF?</h2>
              <ol className="space-y-6">
                {[
                  { title: "Stanovte si cíl a strategii", description: "Určete si, na jak dlouho chcete investovat (investiční horizont) a jaké riziko jste ochotni podstoupit." },
                  { title: "Vyberte si brokera", description: "Založte si účet u brokera jako XTB, Trading 212 nebo Portu. Srovnejte poplatky." },
                  { title: "Vyberte konkrétní ETF", description: "Použijte náš srovnávač k nalezení fondu, který odpovídá vaší strategii. Sledujte TER, domicil a velikost fondu." },
                  { title: "Proveďte nákup", description: "Pošlete peníze na brokerský účet a zadejte pokyn k nákupu. Investujte jednorázově nebo pravidelně (DCA)." },
                  { title: "Držte a kontrolujte", description: "Investování do ETF je maraton. Kontrolujte portfolio 1-2x ročně a držte se své strategie." }
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold text-lg">{index + 1}</div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{step.title}</h4>
                        <p className="text-gray-600">{step.description} Najděte ten pravý fond pomocí našeho <Link to="/srovnani-etf" className="text-violet-600 hover:underline">srovnávače</Link>.</p>
                      </div>
                  </li>
                ))}
              </ol>
            </div>
          
            {/* Section 6: FAQ */}
            <div className="animate-fade-in">
              <div className="flex justify-center mb-6">
                  <div className="bg-gray-200 text-gray-600 p-4 rounded-xl">
                      <HelpCircle className="w-8 h-8" />
                  </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Často kladené otázky</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b">
                    <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800">Co znamená zkratka UCITS?</AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 pt-2">
                      UCITS je regulační rámec EU, který zajišťuje vysokou ochranu investorů. ETF s označením UCITS splňují přísné standardy, a proto jsou pro evropské investory doporučenou volbou.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b">
                    <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800">Jaký je rozdíl mezi ETF a akcií?</AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 pt-2">
                      Akcie je podíl v jedné firmě. ETF je koš mnoha akcií (nebo jiných aktiv). Nákupem ETF sázíte na úspěch celého trhu nebo sektoru, což je méně rizikové.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-b">
                    <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800">Jaký je rozdíl mezi ETF a podílovým fondem?</AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 pt-2">
                      ETF mají typicky nižší poplatky a obchodují se na burze jako akcie. Klasické podílové fondy jsou často dražší a méně flexibilní při obchodování.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border-b">
                    <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800">Kolik peněz potřebuji, abych mohl začít?</AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 pt-2">
                      Díky moderním brokerům můžete začít investovat do ETF i s velmi malými částkami, často již od několika stovek korun, díky možnosti nákupu frakčních podílů.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5" className="border-b-0">
                    <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold text-gray-800">Je investování do ETF bezpečné?</AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 pt-2">
                      Každá investice nese riziko. Bezpečnost ETF spočívá v jejich silné regulaci (zejména UCITS) a široké diverzifikaci. Váš majetek je navíc oddělen od majetku emitenta.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-white shadow-2xl animate-fade-in">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold mb-4">
                    Připraveni vybrat své první ETF?
                  </h3>
                  <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
                    Použijte náš podrobný srovnávač a filtrujte ETF podle vašich kritérií. Najděte ten pravý fond pro vaši investiční strategii během několika minut.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-violet-50 font-bold transition-transform hover:scale-105">
                      <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-violet-300 text-white hover:bg-white/10 hover:text-white font-bold transition-transform hover:scale-105">
                      <Link to="/nastroje">Investiční kalkulačka</Link>
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
