import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, TrendingDown, AlertTriangle, Info, ArrowRight, Loader2 } from 'lucide-react';
import InternalLinking from '@/components/SEO/InternalLinking';
import FAQSection from '@/components/SEO/FAQSection';
import ETFTicker from '@/components/ETFTicker';
import { useETFSearchData } from '@/hooks/useETFSearchData';

const FeeCalculatorPage: React.FC = () => {
  const { etfs, isLoading } = useETFSearchData();
  
  // Společné parametry investice
  const [investedAmount, setInvestedAmount] = useState<number>(250000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(12500);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(20);
  
  // TER pro oba typy fondů
  const [etfTER, setEtfTER] = useState<number>(0.2);
  const [activeTER, setActiveTER] = useState<number>(1.8);
  
  // Výsledky pro ETF
  const [etfFinalValue, setEtfFinalValue] = useState<number>(0);
  const [etfTotalFees, setEtfTotalFees] = useState<number>(0);
  const [etfTotalInvested, setEtfTotalInvested] = useState<number>(0);
  
  // Výsledky pro aktivní fond
  const [activeFinalValue, setActiveFinalValue] = useState<number>(0);
  const [activeTotalFees, setActiveTotalFees] = useState<number>(0);
  const [activeTotalInvested, setActiveTotalInvested] = useState<number>(0);
  
  // Rozdíl mezi nimi
  const [valueDifference, setValueDifference] = useState<number>(0);
  const [feeDifference, setFeeDifference] = useState<number>(0);

  const calculateComparison = () => {
    const annualReturn = 0.07; // 7% roční výnos
    const months = investmentPeriod * 12;
    const monthlyReturn = (1 + annualReturn) ** (1/12) - 1;
    
    // Výpočet pro ETF
    const monthlyETFTER = etfTER / 100 / 12;
    let etfTotalInvestedCalc = investedAmount;
    let etfPortfolioValue = investedAmount;
    let etfTotalFeesCalc = 0;

    for (let month = 1; month <= months; month++) {
      etfPortfolioValue += monthlyContribution;
      etfTotalInvestedCalc += monthlyContribution;
      etfPortfolioValue *= (1 + monthlyReturn);
      const monthlyFee = etfPortfolioValue * monthlyETFTER;
      etfPortfolioValue -= monthlyFee;
      etfTotalFeesCalc += monthlyFee;
    }

    // Výpočet pro aktivní fond
    const monthlyActiveTER = activeTER / 100 / 12;
    let activeTotalInvestedCalc = investedAmount;
    let activePortfolioValue = investedAmount;
    let activeTotalFeesCalc = 0;

    for (let month = 1; month <= months; month++) {
      activePortfolioValue += monthlyContribution;
      activeTotalInvestedCalc += monthlyContribution;
      activePortfolioValue *= (1 + monthlyReturn);
      const monthlyFee = activePortfolioValue * monthlyActiveTER;
      activePortfolioValue -= monthlyFee;
      activeTotalFeesCalc += monthlyFee;
    }

    // Nastavení výsledků
    setEtfTotalInvested(etfTotalInvestedCalc);
    setEtfFinalValue(etfPortfolioValue);
    setEtfTotalFees(etfTotalFeesCalc);
    
    setActiveTotalInvested(activeTotalInvestedCalc);
    setActiveFinalValue(activePortfolioValue);
    setActiveTotalFees(activeTotalFeesCalc);
    
    // Rozdíly
    setValueDifference(etfPortfolioValue - activePortfolioValue);
    setFeeDifference(activeTotalFeesCalc - etfTotalFeesCalc);
  };

  useEffect(() => {
    calculateComparison();
  }, [investedAmount, monthlyContribution, investmentPeriod, etfTER, activeTER]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Dynamické nejlevnější ETF z databáze
  const cheapestETFs = useMemo(() => {
    if (!etfs || etfs.length === 0) {
      return [];
    }
    
    // Filtruj ETF s validním TER a seřaď podle TER
    const validETFs = etfs.filter(etf => {
      return etf.ter_numeric && etf.ter_numeric > 0 && etf.ter_numeric < 2; // pod 2%
    });

    // Seřaď podle TER a vezmi top 20
    return validETFs
      .sort((a, b) => a.ter_numeric - b.ter_numeric)
      .slice(0, 20)
      .map(etf => ({
        name: etf.name,
        ticker: etf.ticker,
        isin: etf.isin,
        ter: etf.ter_numeric,
        ter_percent: (etf.ter_numeric).toFixed(2) + "%",
        category: etf.ter_numeric <= 0.15 ? "Ultra nízké" : 
                 etf.ter_numeric <= 0.35 ? "Nízké" : 
                 etf.ter_numeric <= 0.75 ? "Střední" : "Vysoké",
        color: etf.ter_numeric <= 0.15 ? "green" : 
               etf.ter_numeric <= 0.35 ? "green" : 
               etf.ter_numeric <= 0.75 ? "yellow" : "red"
      }));
  }, [etfs]);


  const brokerFees = [
    { broker: "DEGIRO", buyFee: "24 Kč", custody: "61 Kč/rok", notes: "Core Selection ETF, 2,5€/zahraniční burza", highlight: true },
    { broker: "XTB", buyFee: "0 Kč*", custody: "0 Kč", notes: "Do 2,4M Kč měsíčně", highlight: true },
    { broker: "Trading 212", buyFee: "0 Kč", custody: "0 Kč", notes: "Všechny ETF zdarma", highlight: true },
    { broker: "Interactive Brokers", buyFee: "0,05%", custody: "0 Kč", notes: "Min. 73 Kč za transakci", highlight: false },
    { broker: "Fio e-Broker", buyFee: "200-250 Kč", custody: "0 Kč", notes: "Podle burzy a objemu", highlight: false },
    { broker: "Česká spořitelna", buyFee: "0,6%", custody: "1500 Kč/rok", notes: "Min. 242 Kč za transakci", highlight: false }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kalkulačka poplatků ETF 2025 - TER a dopad na výnosy",
    "description": "Spočítejte si dopad poplatků ETF na dlouhodobé výnosy. Srovnání TER, transakčních poplatků a jejich vliv na investice do ETF fondů.",
    "url": "https://etfpruvodce.cz/kalkulacky/kalkulacka-poplatku-etf",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK"
    },
    "featureList": [
      "Výpočet dopadu TER na dlouhodobé výnosy",
      "Srovnání různých ETF podle poplatků",
      "Analýza transakčních nákladů",
      "Compound efekt poplatků",
      "Optimalizace nákladů na investice",
      "Kalkulace skrytých poplatků"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Kalkulačka poplatků ETF 2025 - TER a dopad na výnosy | ETF průvodce.cz"
        description="✅ Spočítejte si dopad poplatků ETF na dlouhodobé výnosy. Srovnání TER, transakčních poplatků a jejich vliv na investice do ETF fondů. Zdarma 2025."
        canonical="https://etfpruvodce.cz/kalkulacky/kalkulacka-poplatku-etf"
        keywords="kalkulačka poplatků ETF, TER kalkulačka, poplatky ETF fondů, dopad poplatků na výnosy, srovnání poplatků 2025, náklady ETF"
        schema={schema}
        ogImage="https://etfpruvodce.cz/og-kalkulacka-poplatku.jpg"
      />

      {/* Hero sekce */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
              <Calculator className="w-4 h-4 mr-2" />
              Kalkulačka ETF poplatků 2025
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              ETF <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">poplatky</span> kalkulačka
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              Spočítejte si skutečné náklady investování do ETF v českých korunách. Porovnejte TER poplatky, broker fees a najděte nejlevnější způsob investování.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">TER kalkulačka</h3>
                <p className="text-sm text-blue-200">Spočítejte dopad poplatků</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold mb-2">Srovnání brokerů</h3>
                <p className="text-sm text-blue-200">Najděte nejlevnější cestu</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold mb-2">Skryté náklady</h3>
                <p className="text-sm text-blue-200">Na co si dát pozor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Rychlé intro */}
        <section className="text-center mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ETF vs. bankovní fond: Porovnejte náklady
            </h2>
            <p className="text-lg text-gray-600">
              Zjistěte, kolik peněz vám ušetří levný ETF oproti drahému bankovnímu fondu za {investmentPeriod} let investování.
            </p>
          </div>
        </section>

        {/* Srovnávací kalkulačka */}
        <section className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4 mr-2" />
              Srovnání ETF vs. Bankovní fond
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🆚 Porovnání nákladů investování
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zadejte parametry investice a porovnejte dopad poplatků na váš majetek
            </p>
          </div>

          {/* Společné parametry */}
          <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Parametry investice
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="initial">Počáteční investice (Kč)</Label>
                <Input
                  id="initial"
                  type="number"
                  value={investedAmount}
                  onChange={(e) => setInvestedAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="monthly">Měsíční příspěvek (Kč)</Label>
                <Input
                  id="monthly"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="period">Doba investování (roky)</Label>
                <Input
                  id="period"
                  type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* ETF fond */}
            <Card className="border-green-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <TrendingDown className="w-5 h-5" />
                  💚 Levný ETF fond
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="etf-ter">TER poplatek (%)</Label>
                  <Input
                    id="etf-ter"
                    type="number"
                    step="0.01"
                    value={etfTER}
                    onChange={(e) => setEtfTER(Number(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Typicky 0.1% - 0.3%</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Finální hodnota</p>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(etfFinalValue)}</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Celkové poplatky</p>
                    <p className="text-xl font-bold text-red-900">{formatCurrency(etfTotalFees)}</p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Investováno celkem: {formatCurrency(etfTotalInvested)}</p>
                  <p>• Výnos: {formatCurrency(etfFinalValue - etfTotalInvested)}</p>
                  <p>• Poplatky: {((etfTotalFees / etfTotalInvested) * 100).toFixed(2)}% z investice</p>
                </div>
              </CardContent>
            </Card>

            {/* Aktivní fond */}
            <Card className="border-red-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <DollarSign className="w-5 h-5" />
                  💸 Bankovní/aktivní fond
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="active-ter">TER poplatek (%)</Label>
                  <Input
                    id="active-ter"
                    type="number"
                    step="0.01"
                    value={activeTER}
                    onChange={(e) => setActiveTER(Number(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Typicky 1.5% - 2.5%</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Finální hodnota</p>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(activeFinalValue)}</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Celkové poplatky</p>
                    <p className="text-xl font-bold text-red-900">{formatCurrency(activeTotalFees)}</p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Investováno celkem: {formatCurrency(activeTotalInvested)}</p>
                  <p>• Výnos: {formatCurrency(activeFinalValue - activeTotalInvested)}</p>
                  <p>• Poplatky: {((activeTotalFees / activeTotalInvested) * 100).toFixed(2)}% z investice</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Velký srovnávací výsledek */}
          <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                💰 Rozdíl za {investmentPeriod} let
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div className="bg-green-100 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Více peněz v kapse</h4>
                  <p className="text-3xl font-bold text-green-900">{formatCurrency(valueDifference)}</p>
                  <p className="text-sm text-green-700 mt-1">S ETF budete mít více o tolik</p>
                </div>
                
                <div className="bg-red-100 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-800 mb-2">Ušetřené poplatky</h4>
                  <p className="text-3xl font-bold text-red-900">{formatCurrency(feeDifference)}</p>
                  <p className="text-sm text-red-700 mt-1">Méně zaplatíte na poplatcích</p>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-lg text-gray-700">
                  ETF vám za <strong>{investmentPeriod} let</strong> ušetří <strong className="text-orange-600">{formatCurrency(feeDifference)}</strong> na poplatcích 
                  a vaše portfolio bude větší o <strong className="text-green-600">{formatCurrency(valueDifference)}</strong>!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nejlevnější ETF z databáze */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              📋 Aktuální nejlevnější ETF
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top 20 nejlevnějších ETF z naší databáze
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aktuální seznam nejlevnějších ETF fondů seřazených podle TER poplatků
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Načítám aktuální data ETF...</span>
            </div>
          ) : cheapestETFs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Data ETF se nenačetla. Zkuste obnovit stránku.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-4 text-left font-semibold">ETF</th>
                    <th className="border border-gray-200 p-4 text-center font-semibold">Ticker</th>
                    <th className="border border-gray-200 p-4 text-center font-semibold">TER</th>
                    <th className="border border-gray-200 p-4 text-center font-semibold">Kategorie</th>
                    <th className="border border-gray-200 p-4 text-center font-semibold">Akce</th>
                  </tr>
                </thead>
                <tbody>
                  {cheapestETFs.map((etf, index) => (
                    <tr key={etf.isin} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                      <td className="border border-gray-200 p-4 font-medium">
                        <ETFTicker ticker={etf.ticker} isin={etf.isin} />
                        <div className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {etf.name}
                        </div>
                      </td>
                      <td className="border border-gray-200 p-4 text-center">
                        <code className="bg-gray-100 px-2 py-1 rounded">{etf.ticker}</code>
                      </td>
                      <td className="border border-gray-200 p-4 text-center">
                        <span className={etf.ter <= 0.15 ? "text-green-600 font-semibold" : etf.ter <= 0.35 ? "text-yellow-600" : "text-red-600"}>
                          {etf.ter_percent}
                        </span>
                      </td>
                      <td className="border border-gray-200 p-4 text-center">
                        <Badge 
                          className={
                            etf.color === 'green' ? 'bg-green-100 text-green-800' :
                            etf.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {etf.category}
                        </Badge>
                      </td>
                      <td className="border border-gray-200 p-4 text-center">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEtfTER(etf.ter)}
                        >
                          Použít
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Srovnání broker poplatků */}
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🏦 Broker poplatky
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Poplatky brokerů za nákup ETF
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Správný výběr brokera vám může ušetřit stovky eur ročně na poplatcích
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brokerFees.map((broker, index) => (
              <Card key={index} className={broker.highlight ? "ring-2 ring-blue-500" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {broker.broker}
                    {broker.highlight && (
                      <Badge className="bg-blue-100 text-blue-800">Doporučeno</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Poplatek za nákup:</span>
                      <span className="font-semibold">{broker.buyFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Poplatek za držení:</span>
                      <span className="font-semibold">{broker.custody}</span>
                    </div>
                    <div className="text-sm text-gray-500 pt-2 border-t">
                      {broker.notes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ sekce */}
        <FAQSection 
          title="Často kladené otázky o ETF poplatcích"
          faqs={[
            {
              question: "Co je TER poplatek u ETF?",
              answer: "TER (Total Expense Ratio) je roční poplatek ETF fondu vyjádřený v procentech z hodnoty investice. Zahrnuje všechny náklady na správu fondu. TER 0.2% znamená, že ročně zaplatíte 500 Kč z každých 250 000 Kč investice."
            },
            {
              question: "Kde najdu nejlevnější ETF s nejnižším TER?",
              answer: "Nejlevnější ETF mají TER pod 0.15%. Nejlepší volby: CSPX (0.07%), SX5E (0.10%), SPY5 (0.09%). Použijte naše srovnání ETF pro nalezení fondů s nejnižšími poplatky."
            },
            {
              question: "Který broker má nejnižší poplatky za ETF?",
              answer: "Trading 212 má všechny ETF zcela zdarma. XTB nabízí 0% poplatky do 2,4M Kč měsíčně. DEGIRO účtuje 24 Kč za Core Selection ETF (200+ fondů) + 61 Kč ročně za zahraniční burzu."
            },
            {
              question: "Jak moc ovlivňují poplatky dlouhodobé výnosy?",
              answer: "Poplatky významně ovlivňují výnosy. Rozdíl mezi 0.1% a 0.5% TER může za 20 let představovat ztrátu 10-15% celkových výnosů. Proto je důležité vybírat ETF s nízkými poplatky."
            }
          ]}
          className="mt-16"
        />

        {/* Internal Linking */}
        <InternalLinking 
          relatedLinks={[
            { title: "Srovnání ETF fondů", href: "/srovnani-etf", description: "Najděte ETF s nejnižšími poplatky" },
            { title: "Kde koupit ETF", href: "/kde-koupit-etf", description: "Brokeři s nejlevnějšími poplatky" },
            { title: "Nejlepší ETF 2025", href: "/tipy/nejlepsi-etf-2025", description: "Top ETF s nízkými náklady" },
            { title: "Investiční kalkulačky", href: "/kalkulacky", description: "Další kalkulačky a nástroje" }
          ]}
          title="Související stránky"
          className="mt-16"
        />

      </div>
    </Layout>
  );
};

export default FeeCalculatorPage;