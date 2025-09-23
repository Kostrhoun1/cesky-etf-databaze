import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, TrendingDown, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import InternalLinking from '@/components/SEO/InternalLinking';
import FAQSection from '@/components/SEO/FAQSection';

const ETFPoplatky: React.FC = () => {
  const [investedAmount, setInvestedAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [selectedTER, setSelectedTER] = useState<number>(0.2);
  
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [finalValue, setFinalValue] = useState<number>(0);
  const [feeDifference, setFeeDifference] = useState<number>(0);

  const calculateFees = () => {
    const annualReturn = 0.07; // 7% roční výnos
    const months = investmentPeriod * 12;
    const monthlyReturn = (1 + annualReturn) ** (1/12) - 1;
    const monthlyTER = selectedTER / 100 / 12;

    let totalInvestedCalc = investedAmount;
    let portfolioValue = investedAmount;
    let totalFeesCalc = 0;

    // Výpočet pro každý měsíc
    for (let month = 1; month <= months; month++) {
      // Přidání měsíčního příspěvku
      portfolioValue += monthlyContribution;
      totalInvestedCalc += monthlyContribution;
      
      // Růst portfolia
      portfolioValue *= (1 + monthlyReturn);
      
      // Odpočet TER poplatku
      const monthlyFee = portfolioValue * monthlyTER;
      portfolioValue -= monthlyFee;
      totalFeesCalc += monthlyFee;
    }

    // Výpočet rozdílu oproti ETF s 0.05% TER
    const lowTER = 0.05 / 100 / 12;
    let lowFeePortfolio = investedAmount;
    let lowFeeTotalFees = 0;

    for (let month = 1; month <= months; month++) {
      lowFeePortfolio += monthlyContribution;
      lowFeePortfolio *= (1 + monthlyReturn);
      const monthlyFee = lowFeePortfolio * lowTER;
      lowFeePortfolio -= monthlyFee;
      lowFeeTotalFees += monthlyFee;
    }

    setTotalInvested(totalInvestedCalc);
    setTotalFees(totalFeesCalc);
    setFinalValue(portfolioValue);
    setFeeDifference(totalFeesCalc - lowFeeTotalFees);
  };

  useEffect(() => {
    calculateFees();
  }, [investedAmount, monthlyContribution, investmentPeriod, selectedTER]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const etfFeeComparison = [
    { name: "iShares Core S&P 500", ticker: "CSPX", ter: 0.07, category: "Ultra nízké", color: "green" },
    { name: "SPDR S&P 500 EUR", ticker: "SPY5", ter: 0.09, category: "Ultra nízké", color: "green" },
    { name: "iShares Core EURO STOXX 50", ticker: "SX5E", ter: 0.10, category: "Ultra nízké", color: "green" },
    { name: "Xtrackers MSCI Emerging", ticker: "XMME", ter: 0.18, category: "Nízké", color: "green" },
    { name: "iShares MSCI World", ticker: "IWDA", ter: 0.20, category: "Nízké", color: "green" },
    { name: "Vanguard FTSE All-World", ticker: "VWCE", ter: 0.22, category: "Nízké", color: "green" },
    { name: "Xtrackers MSCI World Tech", ticker: "XWT1", ter: 0.25, category: "Střední", color: "yellow" },
    { name: "SPDR S&P Dividend", ticker: "UDVD", ter: 0.35, category: "Střední", color: "yellow" },
    { name: "iShares Global Clean Energy", ticker: "INRG", ter: 0.65, category: "Vysoké", color: "red" },
    { name: "Aktivně řízené fondy", ticker: "ARF", ter: 1.5, category: "Velmi vysoké", color: "red" }
  ];

  const brokerFees = [
    { broker: "DEGIRO", buyFee: "0€", custody: "0€", notes: "200+ ETF zdarma", highlight: true },
    { broker: "XTB", buyFee: "0€*", custody: "0€", notes: "Do 100k EUR měsíčně", highlight: true },
    { broker: "Trading 212", buyFee: "0€", custody: "0€", notes: "Všechny ETF zdarma", highlight: true },
    { broker: "Interactive Brokers", buyFee: "1,25€", custody: "0€", notes: "Tiered pricing", highlight: false },
    { broker: "Fio e-Broker", buyFee: "7,90€", custody: "0€", notes: "Český broker", highlight: false },
    { broker: "Česká spořitelna", buyFee: "0,6%", custody: "60€/rok", notes: "Min. 9€ za transakci", highlight: false }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ETF poplatky srovnání 2025 - Kalkulačka nákladů investování",
    "description": "Kompletní průvodce ETF poplatky 2025. Kalkulačka TER, srovnání brokerů, skryté náklady. Jak minimalizovat náklady při investování do ETF fondů v ČR.",
    "author": {
      "@type": "Organization", 
      "name": "ETF průvodce.cz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ETF průvodce.cz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://etfpruvodce.cz/og-image.jpg"
      }
    },
    "datePublished": "2025-01-18",
    "dateModified": "2025-01-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://etfpruvodce.cz/etf-poplatky-srovnani"
    }
  };

  return (
    <Layout>
      <SEOHead
        title="ETF poplatky 2025 📊 - Kalkulačka nákladů + Srovnání TER"
        description="★ ETF poplatky srovnání 2025 ★ Kalkulačka TER nákladů, srovnání brokerů, skryté poplatky. Jak minimalizovat náklady při investování do ETF fondů. Praktické tipy pro české investory."
        canonical="https://etfpruvodce.cz/etf-poplatky-srovnani"
        keywords="ETF poplatky, TER poplatky, náklady ETF, kalkulačka poplatků, srovnání brokerů, skryté náklady, poplatky DEGIRO, XTB poplatky, investiční náklady"
        ogImage="https://etfpruvodce.cz/og-etf-fees.jpg"
        schema={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Úvodní sekce - kompaktní */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ETF poplatky srovnání 2025</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Spočítejte si skutečné náklady investování do ETF. Porovnejte TER poplatky, broker fees a najděte nejlevnější způsob investování.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/srovnani-etf" className="hover-scale bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-lg inline-block transition-all">
              Najít ETF s nejnižšími poplatky
            </Link>
            <Link to="/kde-koupit-etf" className="hover-scale border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-lg inline-block transition-all">
              Porovnat brokery
            </Link>
          </div>
        </div>

        <div className="space-y-12">
          {/* TER Kalkulačka */}
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 card-hover animate-fade-in">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-6 hover:bg-violet-200 transition-colors hover-scale">
                <Calculator className="w-8 h-8 text-violet-700" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Kalkulačka ETF poplatků</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Zadejte parametry vaší investice a uvidíte přesný dopad TER poplatků na vaše portfolio</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Vstupní parametry */}
              <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center rounded-full bg-violet-100 w-12 h-12 group-hover:bg-violet-200 transition-colors hover-scale">
                    <Calculator className="w-6 h-6 text-violet-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-violet-800 transition-colors">Parametry investice</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="initial">Počáteční investice (€)</Label>
                    <Input
                      id="initial"
                      type="number"
                      value={investedAmount}
                      onChange={(e) => setInvestedAmount(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthly">Měsíční příspěvek (€)</Label>
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
                  
                  <div>
                    <Label htmlFor="ter">TER poplatek (%)</Label>
                    <Input
                      id="ter"
                      type="number"
                      step="0.01"
                      value={selectedTER}
                      onChange={(e) => setSelectedTER(Number(e.target.value))}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">Běžné rozmezí: 0.05% - 0.70%</p>
                  </div>

                  {/* Rychlé TER volby */}
                  <div>
                    <Label>Rychlá volba TER:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[0.07, 0.15, 0.22, 0.35, 0.65, 1.0].map((ter) => (
                        <Button
                          key={ter}
                          variant={selectedTER === ter ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTER(ter)}
                        >
                          {ter}%
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Výsledky */}
              <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.4s]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 group-hover:bg-emerald-200 transition-colors hover-scale">
                    <TrendingDown className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">Výsledky výpočtu</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Celkem investováno</p>
                      <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalInvested)}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Hodnota portfolia</p>
                      <p className="text-2xl font-bold text-green-900">{formatCurrency(finalValue)}</p>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-600 font-medium">Celkové poplatky</p>
                      <p className="text-2xl font-bold text-red-900">{formatCurrency(totalFees)}</p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-orange-600 font-medium">Navíc oproti 0.05% TER</p>
                      <p className="text-2xl font-bold text-orange-900">{formatCurrency(feeDifference)}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Vliv poplatků na výnosy</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Za {investmentPeriod} let zaplatíte na poplatcích celkem <strong>{formatCurrency(totalFees)}</strong>. 
                          To představuje <strong>{((totalFees / totalInvested) * 100).toFixed(1)}%</strong> z celkové investice.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Předpokládaný roční výnos: 7% | Poplatky snižují konečný výnos</p>
                    <Link to="/srovnani-etf" className="hover-scale bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all w-full text-center inline-block">
                      Najít ETF s nejnižšími poplatky
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Srovnání TER poplatků */}
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.6s]">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 mx-auto mb-6 hover:bg-emerald-200 transition-colors hover-scale">
                <DollarSign className="w-8 h-8 text-emerald-700" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">TER poplatky populárních ETF</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Porovnejte poplatky nejoblíbenějších ETF fondů a najděte ty nejlevnější</p>
            </div>
          
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
                  {etfFeeComparison.map((etf, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                      <td className="border border-gray-200 p-4 font-medium">{etf.name}</td>
                      <td className="border border-gray-200 p-4 text-center">
                        <code className="bg-gray-100 px-2 py-1 rounded">{etf.ticker}</code>
                      </td>
                      <td className="border border-gray-200 p-4 text-center">
                        <span className={etf.ter <= 0.15 ? "text-green-600 font-semibold" : etf.ter <= 0.35 ? "text-yellow-600" : "text-red-600"}>
                          {etf.ter}%
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
                          onClick={() => setSelectedTER(etf.ter)}
                        >
                          Vyzkoušet
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Srovnání broker poplatků */}
          <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.8s]">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center rounded-full bg-emerald-100 w-16 h-16 mx-auto mb-6 hover:bg-emerald-200 transition-colors hover-scale">
                <Info className="w-8 h-8 text-emerald-700" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Poplatky brokerů za nákup ETF</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Správný výběr brokera vám může ušetřit stovky eur ročně na poplatcích</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokerFees.map((broker, index) => (
                <div key={index} className={`border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-6 card-hover ${broker.highlight ? 'ring-2 ring-emerald-500' : ''}`} style={{animationDelay: `${1.0 + index * 0.1}s`}}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">{broker.broker}</h3>
                    {broker.highlight && (
                      <Badge className="bg-emerald-100 text-emerald-800">Doporučeno</Badge>
                    )}
                  </div>
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
                </div>
              ))}
            </div>
          </div>

          {/* Skryté náklady */}
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center rounded-full bg-violet-100 w-16 h-16 mx-auto mb-6 hover:bg-violet-200 transition-colors hover-scale">
                <AlertTriangle className="w-8 h-8 text-violet-700" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Skryté náklady při investování do ETF</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Na co si dát pozor a jak minimalizovat všechny náklady</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:1.2s]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center rounded-full bg-red-100 w-12 h-12 group-hover:bg-red-200 transition-colors hover-scale">
                    <AlertTriangle className="w-6 h-6 text-red-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-800 transition-colors">Pozor na tyto náklady</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Měnové konverze</h4>
                    <p className="text-gray-600">0.1% - 0.5% při převodu CZK na EUR/USD</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bid-ask spread</h4>
                    <p className="text-gray-600">Rozdíl mezi nákupní a prodejní cenou</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tracking error</h4>
                    <p className="text-gray-600">Odchylka ETF od sledovaného indexu</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Daně u dividendových ETF</h4>
                    <p className="text-gray-600">Srážkové daně snižují výnosy</p>
                  </div>
                </div>
              </div>

              <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:1.4s]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 group-hover:bg-emerald-200 transition-colors hover-scale">
                    <Info className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">Jak minimalizovat náklady</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vyberte ETF s nízkým TER</h4>
                    <p className="text-gray-600">Pod 0.25% pro broad market ETF</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Použijte brokers s ETF zdarma</h4>
                    <p className="text-gray-600">DEGIRO, XTB, Trading 212</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Akumulační ETF</h4>
                    <p className="text-gray-600">Bez dividend fees a daňově výhodnější</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pravidelné investování</h4>
                    <p className="text-gray-600">DCA snižuje dopad timing risk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ sekce */}
        <FAQSection 
          title="Často kladené otázky o ETF poplatcích"
          faqs={[
            {
              question: "Co je TER poplatek u ETF?",
              answer: "TER (Total Expense Ratio) je roční poplatek ETF fondu vyjádřený v procentech z hodnoty investice. Zahrnuje všechny náklady na správu fondu. TER 0.2% znamená, že ročně zaplatíte 2€ z každých 1000€ investice."
            },
            {
              question: "Kde najdu nejlevnější ETF s nejnižším TER?",
              answer: "Nejlevnější ETF mají TER pod 0.15%. Nejlepší volby: CSPX (0.07%), SX5E (0.10%), SPY5 (0.09%). Použijte naše srovnání ETF pro nalezení fondů s nejnižšími poplatky."
            },
            {
              question: "Který broker má nejnižší poplatky za ETF?",
              answer: "DEGIRO, XTB a Trading 212 nabízejí nákup ETF za 0€ poplatku. DEGIRO má 200+ ETF zdarma, XTB 0% poplatky do 100k EUR měsíčně, Trading 212 všechny ETF kompletně zdarma."
            },
            {
              question: "Jak moc ovlivňují poplatky dlouhodobé výnosy?",
              answer: "Poplatky významně ovlivňují výnosy. Rozdíl mezi 0.1% a 0.5% TER může za 20 let představovat ztrátu 10-15% celkových výnosů. Proto je důležité vybírat ETF s nízkými poplatky."
            },
            {
              question: "Jsou akumulační ETF levnější než distribuční?",
              answer: "Akumulační ETF jsou často daňově výhodnější v ČR, protože se nevyplácejí dividendy (žádné srážkové daně). TER poplatky jsou stejné, ale celkové náklady jsou nižší díky efektivnějšímu zdanění."
            },
            {
              question: "Jaké jsou skryté náklady u ETF?",
              answer: "Hlavní skryté náklady: měnové konverze (0.1-0.5%), bid-ask spread při obchodování, tracking error ETF oproti indexu, a u distribučních ETF srážkové daně z dividend."
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

export default ETFPoplatky;