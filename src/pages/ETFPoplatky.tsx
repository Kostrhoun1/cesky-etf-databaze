import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

      {/* Hero sekce */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
              <Calculator className="w-4 h-4 mr-2" />
              Kalkulačka ETF poplatků 2025
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              ETF <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">poplatky</span> srovnání
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              Spočítejte si skutečné náklady investování do ETF. Porovnejte TER poplatky, broker fees a najděte nejlevnější způsob investování.
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
                <p className="text-sm text-blue-200">Najděte nejlevnější cestů</p>
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
              Spočítejte si dopad poplatků na vaše investice
            </h2>
            <p className="text-lg text-gray-600">
              Poplatky můžou za 20 let "sníst" až 15% vašich výnosů. Použijte kalkulačku a zjistěte, kolik skutečně zaplatíte.
            </p>
          </div>
        </section>

        {/* TER Kalkulačka */}
        <section className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4 mr-2" />
              Kalkulačka ETF poplatků
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🧮 Vypočítejte si náklady investování
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zadejte parametry vaší investice a uvidíte přesný dopad TER poplatků na vaše portfolio
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vstupní parametry */}
            <Card className="border-violet-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50">
                <CardTitle className="flex items-center gap-2 text-violet-800">
                  <Calculator className="w-5 h-5" />
                  Parametry investice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 mt-6">
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
              </CardContent>
            </Card>

            {/* Výsledky */}
            <Card className="border-blue-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <TrendingDown className="w-5 h-5" />
                  Výsledky výpočtu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 mt-6">
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
                  <Link to="/srovnani-etf">
                    <Button className="w-full bg-violet-600 hover:bg-violet-700">
                      Najít ETF s nejnižšími poplatky
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Srovnání TER poplatků */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              📋 Srovnání poplatků
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              TER poplatky populárních ETF
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Porovnejte poplatky nejoblíbenějších ETF fondů a najděte ty nejlevnější
            </p>
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

        {/* Skryté náklady */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🔍 Skryté náklady při investování do ETF
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">⚠️ Pozor na tyto náklady</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Měnové konverze</h4>
                  <p className="text-sm text-gray-600">0.1% - 0.5% při převodu CZK na EUR/USD</p>
                </div>
                <div>
                  <h4 className="font-semibold">Bid-ask spread</h4>
                  <p className="text-sm text-gray-600">Rozdíl mezi nákupní a prodejní cenou</p>
                </div>
                <div>
                  <h4 className="font-semibold">Tracking error</h4>
                  <p className="text-sm text-gray-600">Odchylka ETF od sledovaného indexu</p>
                </div>
                <div>
                  <h4 className="font-semibold">Daně u dividendových ETF</h4>
                  <p className="text-sm text-gray-600">Srážkové daně snižují výnosy</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">💡 Jak minimalizovat náklady</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Vyberte ETF s nízkým TER</h4>
                  <p className="text-sm text-gray-600">Pod 0.25% pro broad market ETF</p>
                </div>
                <div>
                  <h4 className="font-semibold">Použijte brokers s ETF zdarma</h4>
                  <p className="text-sm text-gray-600">DEGIRO, XTB, Trading 212</p>
                </div>
                <div>
                  <h4 className="font-semibold">Akumulační ETF</h4>
                  <p className="text-sm text-gray-600">Bez dividend fees a daňově výhodnější</p>
                </div>
                <div>
                  <h4 className="font-semibold">Pravidelné investování</h4>
                  <p className="text-sm text-gray-600">DCA snižuje dopad timing risk</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

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