import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Zap } from 'lucide-react';
import BlogArticleLayout from './_BlogArticleLayout';

const ETFVsAktivniFondy = () => {
  const comparisonData = [
    {
      category: "Poplatky (TER)",
      etf: "0,1 - 0,5% ročně",
      aktivni: "1,5 - 3% ročně",
      winner: "etf",
      impact: "Na 30 let rozdíl až 40% celkového výnosu"
    },
    {
      category: "Výkonnost vs. index",
      etf: "Kopíruje index (-TER)",
      aktivni: "85% nedokáže porazit index",
      winner: "etf",
      impact: "Konzistentní průměrné výnosy"
    },
    {
      category: "Transparentnost",
      etf: "Známé složení denně",
      aktivni: "Složení quarterly/ročně",
      winner: "etf",
      impact: "Víte přesně, do čeho investujete"
    },
    {
      category: "Diverzifikace",
      etf: "Automatická dle indexu",
      aktivni: "Závisí na manažerovi",
      winner: "etf",
      impact: "Menší závislost na lidském faktoru"
    },
    {
      category: "Likvidita",
      etf: "Obchodování během dne",
      aktivni: "1x denně po uzávěrce",
      winner: "etf",
      impact: "Flexibilnější vstup/výstup"
    },
    {
      category: "Daňová efektivita",
      etf: "Vyšší (méně obchodování)",
      aktivni: "Nižší (časté obchody)",
      winner: "etf",
      impact: "Méně zdanitelných událostí"
    },
    {
      category: "Minimální investice",
      etf: "Cena 1 podílu (~50-500€)",
      aktivni: "Často 500-5000€",
      winner: "etf",
      impact: "Dostupnější pro malé investory"
    },
    {
      category: "Aktivní řízení",
      etf: "Pasivní sledování",
      aktivni: "Aktivní výběr akcií",
      winner: "aktivni",
      impact: "Možnost překonat trh (15% šance)"
    }
  ];

  const myths = [
    {
      myth: "Aktivní fondy jsou bezpečnější",
      reality: "ETF mají stejné nebo lepší diverzifikaci",
      explanation: "Aktivní fondy mocha být více koncentrované do několika pozic, zatímco ETF automaticky diverzifikují podle indexu."
    },
    {
      myth: "Manažeři dokáží časovat trh",
      reality: "85% manažerů dlouhodobě nedokáže porazit index",
      explanation: "Akademické studie opakovaně potvrzují, že většina aktivních manažerů nedokáže konzistentně překonávat trh."
    },
    {
      myth: "Vyšší poplatky = lepší výsledky",
      reality: "Nízké poplatky jsou jeden z nejlepších prediktorů výnosu",
      explanation: "Morningstar studie ukázaly, že fondy s nejnižšími poplatky dosahují nejlepších dlouhodobých výsledků."
    },
    {
      myth: "ETF jsou jen pro pokročilé investory",
      reality: "ETF jsou naopak ideální pro začátečníky",
      explanation: "Jednoduchost, transparentnost a nízké náklady dělají z ETF perfektní volbu pro první kroky v investování."
    }
  ];

  const scenarioAnalysis = [
    {
      scenario: "Mladý investor (25 let, 30 let investování)",
      amount: "5 000 Kč měsíčně",
      etfResult: "4.2M Kč (TER 0,2%, 7% výnos)",
      aktivniResult: "3.1M Kč (TER 2%, 6% výnos)",
      difference: "1.1M Kč méně",
      etfColor: "text-green-600",
      aktivniColor: "text-red-600"
    },
    {
      scenario: "Střední věk (40 let, 15 let investování)",
      amount: "15 000 Kč měsíčně",
      etfResult: "4.8M Kč (TER 0,2%, 7% výnos)",
      aktivniResult: "4.2M Kč (TER 2%, 6% výnos)",
      difference: "600k Kč méně",
      etfColor: "text-green-600",
      aktivniColor: "text-red-600"
    },
    {
      scenario: "Před důchodem (55 let, 10 let investování)",
      amount: "25 000 Kč měsíčně",
      etfResult: "4.2M Kč (TER 0,2%, 6% výnos)",
      aktivniResult: "3.8M Kč (TER 2%, 5% výnos)",
      difference: "400k Kč méně",
      etfColor: "text-green-600",
      aktivniColor: "text-red-600"
    }
  ];

  return (
    <BlogArticleLayout
      title="ETF vs. aktivní fondy"
      perex="Objektivní srovnání ETF a aktivně řízených fondů. Analýza nákladů, výkonnosti, daní a rizik s konkrétními příklady a doporučeními pro různé typy investorů."
      seoDescription="ETF vs aktivní fondy 2025: komplexní srovnání poplatků, výkonnosti a rizik. Která investice je lepší? Analýza s konkrétními příklady a kalkulacemi pro české investory."
      readTime="11 min"
      difficulty="Mírně pokročilé"
      category="Vzdělávání"
    >
      {/* Úvod */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Debata mezi ETF a aktivně řízenými fondy je jednou z nejdůležitějších otázek moderního investování. 
          Podívejme se na objektivní data a zjistěte, která možnost je lepší pro váš profil investora.
        </p>
      </div>

      {/* Rychlé srovnání */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Rychlé srovnání</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-4 bg-white rounded-lg border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-800">ETF fondy</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>✅ Nízké poplatky (0,1-0,5%)</li>
                <li>✅ Transparentní</li>
                <li>✅ Daňově efektivní</li>
                <li>✅ Široká diverzifikace</li>
                <li>✅ Konzistentní výnosy</li>
                <li>❌ Pouze průměrné výnosy trhu</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg border-2 border-orange-200">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-orange-600" />
                <h3 className="font-bold text-orange-800">Aktivní fondy</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>✅ Možnost překonat trh</li>
                <li>✅ Aktivní řízení rizik</li>
                <li>✅ Flexibilita strategie</li>
                <li>❌ Vysoké poplatky (1,5-3%)</li>
                <li>❌ 85% nedokáže porazit index</li>
                <li>❌ Méně transparentní</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailní srovnání */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Detailní srovnání klíčových faktů</h2>
      
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-4 text-left font-semibold">Kategorie</th>
              <th className="border border-gray-200 p-4 text-center font-semibold text-green-700">ETF fondy</th>
              <th className="border border-gray-200 p-4 text-center font-semibold text-orange-700">Aktivní fondy</th>
              <th className="border border-gray-200 p-4 text-center font-semibold">Dopad</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                <td className="border border-gray-200 p-4 font-medium">{row.category}</td>
                <td className={`border border-gray-200 p-4 text-center ${row.winner === 'etf' ? 'bg-green-50 font-semibold' : ''}`}>
                  {row.etf}
                  {row.winner === 'etf' && <span className="ml-2 text-green-600">✓</span>}
                </td>
                <td className={`border border-gray-200 p-4 text-center ${row.winner === 'aktivni' ? 'bg-orange-50 font-semibold' : ''}`}>
                  {row.aktivni}
                  {row.winner === 'aktivni' && <span className="ml-2 text-orange-600">✓</span>}
                </td>
                <td className="border border-gray-200 p-4 text-sm text-gray-600">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scénáře s kalkulacemi */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Reálné scénáře: Kolik vás stojí vysoké poplatky?</h2>
      
      <div className="space-y-6 mb-12">
        {scenarioAnalysis.map((scenario, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">{scenario.scenario}</h3>
              <p className="text-gray-600 mb-4">Měsíční investice: <strong>{scenario.amount}</strong></p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">ETF portfolio</h4>
                  <p className={`text-2xl font-bold ${scenario.etfColor} mb-2`}>{scenario.etfResult}</p>
                  <p className="text-sm text-gray-600">Při průměrném ETF s nízkými poplatky</p>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Aktivní fondy</h4>
                  <p className={`text-2xl font-bold ${scenario.aktivniColor} mb-2`}>{scenario.aktivniResult}</p>
                  <p className="text-sm text-gray-600">Při průměrném aktivním fondu</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <p className="text-red-800 font-semibold">
                  <TrendingDown className="w-4 h-4 inline mr-2" />
                  Ztráta kvůli vysokým poplatkům: {scenario.difference}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mýty a realita */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Časté mýty o aktivních fondech</h2>
      
      <div className="space-y-6 mb-12">
        {myths.map((myth, index) => (
          <Card key={index} className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-800 mb-2">❌ Mýtus: {myth.myth}</h3>
                  <p className="font-semibold text-green-800 mb-3">✅ Realita: {myth.reality}</p>
                  <p className="text-sm text-gray-700">{myth.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kdy zvolit aktivní fondy */}
      <Card className="mb-8 bg-orange-50 border-orange-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-orange-900">Kdy má smysl zvolit aktivní fondy?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Velmi specifické sektory/trhy</h3>
                <p className="text-sm text-gray-700">Např. biotech, rozvíjející se trhy, kde není dobrý ETF nebo expert může přidat hodnotu.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Krátkodobé taktické alokace</h3>
                <p className="text-sm text-gray-700">Malá část portfolia (5-10%) pro aktivní strategie jako hedge proti krizím.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Výjimeční manažeři s dlouhým trackem</h3>
                <p className="text-sm text-gray-700">Méně než 5% manažerů, kteří dokázali dlouhodobě (10+ let) porazit svůj benchmark.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doporučení */}
      <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Naše doporučení</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Pro většinu investorů: ETF</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>✓ 90-95% portfolia v levných ETF</li>
                <li>✓ Široká diverzifikace (VWCE, CSPX)</li>
                <li>✓ Dlouhodobé držení (10+ let)</li>
                <li>✓ Pravidelné investování (DCA)</li>
                <li>✓ Minimální rebalancing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-4">Pro pokročilé: Hybridní přístup</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>✓ 80-90% v ETF (jádro portfolia)</li>
                <li>✓ 10-20% v aktivních fondech</li>
                <li>✓ Pouze prověření manažeři</li>
                <li>✓ Specifické sektory/regiony</li>
                <li>✓ Pravidelné hodnocení výkonnosti</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-white bg-opacity-20 rounded-lg">
            <p className="text-center font-semibold">
              💡 Klíčové: Nízké náklady jsou jeden z mála faktorů, které můžete kontrolovat. 
              Každé procento ušetřené na poplatcích je procento navíc ve vašem portfoliu.
            </p>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default ETFVsAktivniFondy;