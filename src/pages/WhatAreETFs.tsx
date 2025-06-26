import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, XCircle, BarChart, Users, Scale, Shield, ShoppingCart, HelpCircle, TrendingUp, DollarSign, Target, Zap } from 'lucide-react';
import ChartFeeImpact from "@/components/ChartFeeImpact";
import YouTubeVideosSection from '@/components/YouTubeVideosSection';

const WhatAreETFs: React.FC = () => {
  useEffect(() => {
    document.title = 'Co jsou ETF fondy? - Detailní průvodce | ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Vše, co potřebujete vědět o ETF. Zjistěte co jsou ETF, jak fungují, jejich výhody, nevýhody, typy a jak do nich investovat. Nejlepší průvodce pro české investory 2025.'
    );
  }, []);

  const recommendedVideos = [
    {
      title: "Warren Buffett vysvětluje indexové fondy",
      description: "Legendární investor Warren Buffett vysvětluje, proč doporučuje indexové fondy běžným investorům a jak mohou být lepší volbou než aktivně spravované fondy.",
      videoUrl: "https://youtu.be/ZXISzZlVeLg",
      author: "Warren Buffett"
    },
    {
      title: "Buffettova rada pro začínající investory",
      description: "Warren Buffett sdílí své nejlepší rady pro začínající investory, včetně důležitosti dlouhodobého investování a diverzifikace prostřednictvím indexových fondů.",
      videoUrl: "https://youtu.be/paruIsAkK-0",
      author: "Warren Buffett"
    }
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-violet-50 via-white to-green-50 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative text-center py-24 px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <TrendingUp className="w-4 h-4 mr-2" />
              Komplexní průvodce investováním
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight animate-fade-in">
              Co jsou <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">ETF fondy?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Váš detailní a srozumitelný průvodce světem burzovně obchodovaných fondů (ETF) pro české investory.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-violet-200 text-violet-700 hover:bg-violet-50 px-8 py-4 text-lg font-semibold">
                <Link to="/navod-pro-zacatecniky">Jak začít investovat</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
            
            {/* Section 1: Co je to ETF? */}
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl mb-6 shadow-lg">
                  <Scale className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Co je to ETF?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Jednoduché vysvětlení pro každého</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <p className="text-lg leading-relaxed mb-6">
                        Představte si ETF jako <strong className="text-violet-600">velký koš plný různých akcií firem</strong> (nebo dalších investic). Když si koupíte ETF, automaticky tím vlastníte malý kousek <u>mnoha</u> společností najednou – místo toho, abyste vybírali a kupovali každou akcii zvlášť.
                      </p>
                      <p className="text-lg leading-relaxed">
                        ETF funguje na burze úplně stejně jako běžná akcie. Stačí pár kliknutí u brokera a celý koš společností máte během pár vteřin ve svém portfoliu.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Klíčová výhoda</h3>
                  </div>
                  <blockquote className="text-lg leading-relaxed">
                    Jedním ETF můžete najednou investovat například do všech velkých firem v Evropě, v USA nebo na celém světě – jednoduše, levně a bez složitého vybírání konkrétních akcií.
                  </blockquote>
                </div>
              </div>
            </div>
            
            {/* Section 2: Jak fungují? */}
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl mb-6 shadow-lg">
                  <Users className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Jak ETF fungují?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Mechanismus jednoduchý jako nákup akcií</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4">
                        <Zap className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Nákup ETF</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      ETF jednoduše koupíte přes svého brokera, stejně jako třeba akcii Applu. Za jednu cenu tak získáte "vstupenku" do celého trhu (např. do stovky či tisícovky firem najednou).
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Když cena firem v koši roste, roste i hodnota ETF.</strong> Pokud firmy zlevní, i vaše ETF může krátkodobě ztratit na hodnotě.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Správa fondu</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span><strong>Správu koše</strong> řeší automaticky fond – vy jen držíte ETF a nemusíte sledovat jednotlivé akcie.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span><strong>Obchoduje se na burze</strong> – ETF můžete nakupovat a prodávat téměř kdykoliv během dne, stejně jako akcii.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 max-w-2xl mx-auto">
                  <p className="text-lg text-emerald-800 font-medium">
                    Výhodou ETF je právě jednoduchost: stačí si vybrat správný "koš" a během chvilky investujete do stovek společností najednou.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section 3: Výhody a nevýhody */}
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl mb-6 shadow-lg">
                  <BarChart className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Výhody a nevýhody ETF</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Objektivní pohled na investování do ETF fondů</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl text-green-800">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      Výhody
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Nízké náklady", desc: "Výrazně nižší poplatky (TER) díky pasivní správě." },
                      { title: "Okamžitá diverzifikace", desc: "Jedním nákupem investujete do stovek firem." },
                      { title: "Vysoká likvidita", desc: "Snadný nákup a prodej na burze kdykoliv během dne." },
                      { title: "Transparentnost", desc: "Přesné složení fondu je denně veřejné." },
                      { title: "Daňová efektivita", desc: "Po 3 letech držení je zisk osvobozen od daně." }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-green-900">{item.title}:</span>
                          <span className="text-green-800 ml-1">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl text-red-800">
                      <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center">
                        <XCircle className="w-6 h-6" />
                      </div>
                      Nevýhody
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Tržní riziko", desc: "Hodnota investice se hýbe s celým trhem." },
                      { title: "Spread (rozpětí)", desc: "Malý rozdíl mezi nákupní a prodejní cenou." },
                      { title: "Tracking Error", desc: "Drobná odchylka od výkonnosti indexu." },
                      { title: "Riziko protistrany", desc: "Malé riziko u syntetických ETF (swap)." }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-red-900">{item.title}:</span>
                          <span className="text-red-800 ml-1">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* GRAF: Srovnání dopadu poplatků */}
              <ChartFeeImpact />
            </div>

            {/* Section 4: Typy ETF */}
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl mb-6 shadow-lg">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Důležité typy ETF</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Klíčová rozhodnutí při výběru ETF fondu</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl">Akumulační vs. Distribuční</CardTitle>
                    <p className="text-purple-100">Toto je klíčové rozhodnutí při výběru ETF</p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-bold text-lg text-purple-900 mb-2">Akumulační (Acc)</h4>
                        <p className="text-gray-700">Fond přijaté dividendy automaticky reinvestuje zpět. Ideální pro dlouhodobé budování majetku.</p>
                      </div>
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Distribuční (Dist/Inc)</h4>
                        <p className="text-gray-700">Fond dividendy pravidelně vyplácí. Získáte pasivní příjem, ale musíte řešit daně.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl">Fyzické vs. Syntetické</CardTitle>
                    <p className="text-green-100">Způsob, jakým ETF kopíruje index</p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-bold text-lg text-green-900 mb-2">Fyzické ETF</h4>
                        <p className="text-gray-700">Fond reálně nakupuje a drží aktiva z indexu. Jsou transparentnější a jednodušší.</p>
                      </div>
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h4 className="font-bold text-lg text-emerald-900 mb-2">Syntetické ETF</h4>
                        <p className="text-gray-700">Fond využívá derivátovou smlouvu (swap) k dodání výkonnosti indexu. Nesou malé riziko protistrany.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 5: Doporučená videa */}
            <YouTubeVideosSection
              title="Doporučená videa o ETF"
              description="Poslechněte si rady od legendárního investora Warrena Buffetta"
              videos={recommendedVideos}
            />

            {/* Section 6: Jak začít? */}
            <div id="jak-zacit" className="animate-fade-in">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl mb-6 shadow-lg">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Jak začít investovat do ETF?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Krok za krokem k vašemu prvnímu ETF</p>
              </div>
              
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-purple-600 hidden lg:block"></div>
                <ol className="space-y-8">
                  {[
                    { 
                      title: "Stanovte si cíl a strategii", 
                      description: "Určete si, na jak dlouho chcete investovat (investiční horizont) a jaké riziko jste ochotni podstoupit.",
                      icon: Target,
                      color: "bg-blue-500"
                    },
                    { 
                      title: "Vyberte si brokera", 
                      description: "Založte si účet u brokera jako XTB, Trading 212 nebo Portu. Srovnejte poplatky.",
                      icon: Users,
                      color: "bg-green-500"
                    },
                    { 
                      title: "Vyberte konkrétní ETF", 
                      description: "Použijte náš srovnávač k nalezení fondu, který odpovídá vaší strategii. Sledujte TER, domicil a velikost fondu.",
                      icon: BarChart,
                      color: "bg-purple-500"
                    },
                    { 
                      title: "Proveďte nákup", 
                      description: "Pošlete peníze na brokerský účet a zadejte pokyn k nákupu. Investujte jednorázově nebo pravidelně (DCA).",
                      icon: DollarSign,
                      color: "bg-orange-500"
                    },
                    { 
                      title: "Držte a kontrolujte", 
                      description: "Investování do ETF je maraton. Kontrolujte portfolio 1-2x ročně a držte se své strategie.",
                      icon: TrendingUp,
                      color: "bg-red-500"
                    }
                  ].map((step, index) => (
                    <li key={index} className="relative flex items-start gap-6 lg:pl-16">
                      <div className={`flex-shrink-0 w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg lg:absolute lg:left-0 lg:transform lg:-translate-x-1/2`}>
                        <step.icon className="w-8 h-8" />
                      </div>
                      <Card className="flex-1 bg-white border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-xl text-gray-900 mb-3">{step.title}</h4>
                          <p className="text-gray-700 leading-relaxed">{step.description} Najděte ten pravý fond pomocí našeho <Link to="/srovnani-etf" className="text-violet-600 hover:underline font-medium">srovnávače</Link>.</p>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Section 7: Kde koupit ETF */}
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl mb-6 shadow-lg">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Kde koupit ETF?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Ověření brokeři pro české investory</p>
              </div>
              
              <Card className="bg-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    <strong>ETF fondy může dnes nakupovat téměř každý — stačí si založit účet u ověřeného brokera, který ETF nabízí.</strong> V Česku a v Evropě široce používají tyto platformy:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {[
                      { name: "XTB", desc: "česká pobočka, snadné ověření totožnosti, nákup ETF bez poplatků (na hlavní evropské burzy), jednoduché rozhraní.", color: "border-blue-200 bg-blue-50" },
                      { name: "Trading 212", desc: "intuitivní aplikace, široká nabídka evropských ETF, možnost nakoupit i frakční podíly.", color: "border-green-200 bg-green-50" },
                      { name: "DEGIRO", desc: "dlouhodobě populární volba v Evropě, velmi nízké poplatky, široká nabídka ETF (i některé bez poplatků).", color: "border-purple-200 bg-purple-50" },
                      { name: "Portu", desc: "vhodné pro úplné začátečníky, nabízí automatizované portfolia složená z ETF.", color: "border-orange-200 bg-orange-50" },
                      { name: "Interactive Brokers", desc: "vhodné pro pokročilejší investory a spravování větších portfolií.", color: "border-red-200 bg-red-50" }
                    ].map((broker, index) => (
                      <div key={index} className={`p-4 rounded-lg border-2 ${broker.color}`}>
                        <h5 className="font-bold text-lg mb-2">{broker.name}</h5>
                        <p className="text-gray-700">{broker.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start">
                      <div className="bg-green-500 text-white rounded-lg p-2 mr-4">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-900 mb-2">TIP</h4>
                        <p className="text-green-800">
                          Porovnejte si nabídku brokerů podle poplatků a nabízených ETF v našem&nbsp;
                          <Link to="/srovnani-etf" className="text-green-700 hover:underline font-medium">srovnávači ETF i brokerů</Link>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Je nákup ETF bezpečný?</h4>
                      <p className="text-gray-700">
                        Pokud používáte ověřeného a regulovaného brokera, vaše investice v ETF jsou vedeny na samostatném majetkovém účtu a zákon je chrání proti krachu brokera. Doporučujeme vybírat z výše uvedených možností.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">Jaký broker je nejlepší?</h4>
                      <p className="text-gray-700">
                        Záleží na vašich preferencích (poplatky, nabídka ETF, čeština, uživatelské rozhraní). Většině začátečníků bude vyhovovat XTB, DEGIRO nebo Trading 212.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all">
                  <Link to="/srovnani-etf">Porovnat ETF a brokery</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 font-bold transition-all">
                  <Link to="/navod-pro-zacatecniky">Návod pro začátečníky</Link>
                </Button>
              </div>
            </div>

            {/* Section 8: FAQ */}
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

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl text-white shadow-2xl animate-fade-in overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative p-12 text-center">
                <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Začněte investovat ještě dnes
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  Připraveni vybrat své první ETF?
                </h3>
                <p className="text-violet-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  Použijte náš podrobný srovnávač a filtrujte ETF podle vašich kritérií. Najděte ten pravý fond pro vaši investiční strategii během několika minut.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-violet-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold px-8 py-4 text-lg transition-all hover:scale-105">
                    <Link to="/navod-pro-zacatecniky">Návod pro začátečníky</Link>
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
