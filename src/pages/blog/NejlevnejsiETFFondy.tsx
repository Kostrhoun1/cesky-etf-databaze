import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingDown, Calculator, Award, AlertCircle, BarChart3, Zap, Target, Crown, Star, Sparkles, TrendingUp, Eye, Filter } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import ETFTicker from '@/components/ETFTicker';
import { useETFSearchData } from '@/hooks/useETFSearchData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import BlogArticleLayout from "./_BlogArticleLayout";

const NejlevnejsiETFFondy: React.FC = () => {
  const { etfs, isLoading, isLoadingComplete } = useETFSearchData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [investmentYears, setInvestmentYears] = useState<number>(20);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);

  const formatCurrency = (amount: number, currency: 'EUR' | 'CZK' = 'EUR') => {
    if (currency === 'CZK') {
      // Převod EUR na CZK (kurzem cca 25)
      const czk = amount * 25;
      if (czk >= 1000000000) {
        return `${(czk / 1000000000).toFixed(1)} mld Kč`;
      } else if (czk >= 1000000) {
        return `${(czk / 1000000).toFixed(1)} mil Kč`;
      } else if (czk >= 1000) {
        return `${(czk / 1000).toFixed(0)} tis Kč`;
      }
      return `${Math.round(czk).toLocaleString()} Kč`;
    }
    
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B €`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M €`;
    }
    return `${amount.toLocaleString()} €`;
  };

  // Automaticky získané nejlevnější ETF z databáze
  const cheapestETFs = useMemo(() => {
    console.log('🔍 Processing ETFs:', etfs?.length || 0);
    
    if (!etfs || etfs.length === 0) {
      console.log('❌ No ETFs available');
      return [];
    }
    
    // Debug: Podívej se na strukturu prvního ETF
    console.log('🔍 Sample ETF structure:', etfs[0]);
    
    // Použít mírnější kritéria - pouze TER (TER jsou v databázi jako 0.03 = 3%)
    const validETFs = etfs.filter(etf => {
      const hasValidTER = etf.ter_numeric && etf.ter_numeric > 0 && etf.ter_numeric < 2;  // pod 2.0 = 200%
      
      // Debug log pro první 3 ETFs
      if (etfs.indexOf(etf) < 3) {
        console.log(`ETF ${etf.ticker || etf.name}: TER=${etf.ter_numeric}, Size=${etf.fund_size_numeric}, Valid TER=${hasValidTER}`);
      }
      
      return hasValidTER;
    });

    console.log('✅ Valid ETFs found:', validETFs.length);

    // Seřadit podle TER a vzít top 30
    const sortedByTER = validETFs
      .sort((a, b) => a.ter_numeric - b.ter_numeric)
      .slice(0, 30);

    console.log('📊 Top 30 cheapest ETFs:', sortedByTER.slice(0, 5).map(etf => ({ 
      ticker: etf.ticker, 
      ter: etf.ter_numeric, 
      category: etf.category 
    })));

    // Použít existující kategorie z dat
    const categorized = sortedByTER.map(etf => {
      return {
        ...etf,
        ter_percent: etf.ter_numeric.toFixed(2) + "%",  // 0.03 v DB = 0.03%
        fund_size_formatted: formatCurrency(etf.fund_size_numeric || 0),
        annual_cost_per_100k: Math.round(etf.ter_numeric * 100000)
      };
    });

    return categorized;
  }, [etfs]);

  // Filtrace podle kategorie
  const filteredETFs = useMemo(() => {
    if (selectedCategory === "all") return cheapestETFs;
    return cheapestETFs.filter(etf => etf.category === selectedCategory);
  }, [cheapestETFs, selectedCategory]);

  // Získání kategorií pro filter - použít z hooku
  const { categories: allCategories } = useETFSearchData();
  const categories = useMemo(() => {
    // Filtrovat pouze kategorie, které jsou v cheapestETFs
    const availableCategories = [...new Set(cheapestETFs.map(etf => etf.category).filter(Boolean))];
    console.log('🏷️ Available categories in cheapest ETFs:', availableCategories);
    return availableCategories.sort();
  }, [cheapestETFs]);

  // Graf dat pro srovnání nákladů
  const costComparisonData = useMemo(() => {
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1/12) - 1;
    const months = investmentYears * 12;
    
    const scenarios = [
      { name: "0.05%", fullName: "Ultra nízké TER (0.05%)", ter: 0.0005, color: "#10B981" },
      { name: "0.20%", fullName: "Nízké TER (0.20%)", ter: 0.002, color: "#3B82F6" },
      { name: "0.50%", fullName: "Střední TER (0.50%)", ter: 0.005, color: "#F59E0B" },
      { name: "1.00%", fullName: "Vysoké TER (1.00%)", ter: 0.01, color: "#EF4444" },
      { name: "1.50%", fullName: "Aktivní fond (1.50%)", ter: 0.015, color: "#DC2626" }
    ];

    return scenarios.map(scenario => {
      let totalValue = investmentAmount;
      let totalInvested = investmentAmount;
      let totalFees = 0;

      for (let month = 1; month <= months; month++) {
        totalValue += monthlyContribution;
        totalInvested += monthlyContribution;
        
        // Růst
        totalValue *= (1 + monthlyReturn);
        
        // TER poplatek
        const monthlyFee = totalValue * (scenario.ter / 12);
        totalValue -= monthlyFee;
        totalFees += monthlyFee;
      }

      return {
        ...scenario,
        finalValue: Math.round(totalValue),
        totalFees: Math.round(totalFees),
        totalInvested: Math.round(totalInvested),
        netGain: Math.round(totalValue - totalInvested)
      };
    });
  }, [investmentAmount, investmentYears, monthlyContribution, annualReturn]);

  // Data pro graf TER distribuce
  const terDistributionData = useMemo(() => {
    console.log('🔍 TER Distribution - cheapestETFs:', cheapestETFs.length);
    if (cheapestETFs.length === 0) return [];
    
    const ranges = [
      { range: "0.00-0.10%", min: 0, max: 0.1, count: 0, color: "#10B981" },       // 0-0.1 v DB = 0-0.10%
      { range: "0.10-0.20%", min: 0.1, max: 0.2, count: 0, color: "#3B82F6" },     // 0.1-0.2 v DB = 0.10-0.20%
      { range: "0.20-0.30%", min: 0.2, max: 0.3, count: 0, color: "#6366F1" },     // 0.2-0.3 v DB = 0.20-0.30%
      { range: "0.30-0.50%", min: 0.3, max: 0.5, count: 0, color: "#F59E0B" },     // 0.3-0.5 v DB = 0.30-0.50%
      { range: "0.50%+", min: 0.5, max: 10, count: 0, color: "#EF4444" }           // 0.5+ v DB = 0.50%+
    ];

    cheapestETFs.forEach(etf => {
      const ter = etf.ter_numeric;
      console.log(`TER for ${etf.ticker}: ${ter}`);
      const range = ranges.find(r => ter >= r.min && ter < r.max);
      if (range) {
        range.count++;
        console.log(`Added to range ${range.range}, new count: ${range.count}`);
      } else {
        console.log(`No range found for TER: ${ter}`);
      }
    });

    console.log('📊 Final ranges:', ranges);
    const filteredRanges = ranges.filter(r => r.count > 0);
    console.log('📊 Filtered ranges (with data):', filteredRanges);
    return filteredRanges;
  }, [cheapestETFs]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-lg mb-2">{data.fullName}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Konečná hodnota: <span className="font-semibold text-green-600">{formatCurrency(data.finalValue, 'CZK')}</span>
            </p>
            <p className="text-sm text-gray-600">
              Celkové poplatky: <span className="font-semibold text-red-600">{formatCurrency(data.totalFees, 'CZK')}</span>
            </p>
            <p className="text-sm text-gray-600">
              Čistý zisk: <span className="font-semibold text-blue-600">{formatCurrency(data.netGain, 'CZK')}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <BlogArticleLayout
      title="Nejlevnější ETF fondy 2025 💰 - Automatické srovnání TER"
      perex="★ Interaktivní analýza nejlevnějších ETF fondů ★ Živé data z naší databáze 3,600+ ETF. Kalkulačka dopadu poplatků, grafy TER distribuce a automatické doporučení podle kategorie."
      seoDescription="Nejlevnější ETF fondy 2025: Interaktivní srovnání TER poplatků z databáze 3,600+ ETF. Kalkulačka nákladů, grafy, automatické doporučení. Ultra nízké TER od 0.03%."
      readTime="12 min"
      difficulty="Střední"
      category="Optimalizace"
    >
      {/* Hero sekce s hlavními benefity */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 mb-8 text-white overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-7 h-7 text-yellow-300" />
            <h1 className="text-2xl md:text-3xl font-bold">Najděte nejlevnější ETF za pár sekund</h1>
          </div>
          <p className="text-lg text-emerald-100 mb-6">
            Živá data z 3,600+ ETF. Ušetřete tisíce korun ročně díky správné volbě TER poplatků.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 card-hover">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-yellow-300" />
                <span className="font-semibold text-sm">Živé srovnání</span>
              </div>
              <p className="text-xs text-emerald-100">Aktuální data přímo z databáze</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 card-hover">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-yellow-300" />
                <span className="font-semibold text-sm">Kalkulačka úspor</span>
              </div>
              <p className="text-xs text-emerald-100">Spočítejte si dopad TER na portfolio</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 card-hover">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-yellow-300" />
                <span className="font-semibold text-sm">Smart filtry</span>
              </div>
              <p className="text-xs text-emerald-100">Najděte ETF podle regionu a stylu</p>
            </div>
          </div>
        </div>
      </div>
      {/* Klíčové metriky */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Klíčové metriky trhu
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 card-hover animate-fade-in [animation-delay:0.1s]">
            <Star className="w-6 h-6 mb-3 text-yellow-300" />
            <div className="text-2xl font-bold mb-1">
              {cheapestETFs[0]?.ter_percent || "0.03%"}
            </div>
            <div className="text-emerald-100 text-sm font-medium">Nejnižší TER</div>
            <div className="text-emerald-200 text-xs mt-1">
              {cheapestETFs[0]?.ticker || "Načítá..."}
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 card-hover animate-fade-in [animation-delay:0.2s]">
            <BarChart3 className="w-6 h-6 mb-3 text-cyan-200" />
            <div className="text-2xl font-bold mb-1">
              3,600+
            </div>
            <div className="text-cyan-100 text-sm font-medium">ETF v databázi</div>
            <div className="text-cyan-200 text-xs mt-1">
              Neustále aktualizováno
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 p-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 card-hover animate-fade-in [animation-delay:0.3s]">
            <Target className="w-6 h-6 mb-3 text-teal-200" />
            <div className="text-2xl font-bold mb-1">
              {cheapestETFs.filter(etf => etf.ter_numeric <= 0.2).length}
            </div>
            <div className="text-teal-100 text-sm font-medium">Fondů pod 0.2%</div>
            <div className="text-teal-200 text-xs mt-1">
              Ultra levné TER
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 p-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 card-hover animate-fade-in [animation-delay:0.4s]">
            <Zap className="w-6 h-6 mb-3 text-green-200" />
            <div className="text-2xl font-bold mb-1">
              {cheapestETFs[0] ? Math.round((1.5 - cheapestETFs[0].ter_numeric) * 25000).toLocaleString() : '36,000'}
            </div>
            <div className="text-emerald-100 text-sm font-medium">Kč ročně</div>
            <div className="text-emerald-200 text-xs mt-1">
              úspora vs aktivní fond
            </div>
          </div>
        </div>
      </div>

      {/* Kompaktní kalkulačka */}
      <div className="mb-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200 animate-fade-in [animation-delay:0.5s]">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 pb-3">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              Kalkulačka dopadu TER poplatků
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Změňte parametry a uvidíte dopad různých TER na portfolio za {investmentYears} let
            </p>
          </CardHeader>
          <CardContent className="p-4">
          
            {/* Kompaktní ovládací panel */}
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Počáteční</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(investmentAmount, 'CZK')}</span>
                  </div>
                  <Slider
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={[investmentAmount]}
                    onValueChange={(value) => setInvestmentAmount(value[0])}
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Měsíčně</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(monthlyContribution, 'CZK')}</span>
                  </div>
                  <Slider
                    min={0}
                    max={10000}
                    step={500}
                    value={[monthlyContribution]}
                    onValueChange={(value) => setMonthlyContribution(value[0])}
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Doba</span>
                    <span className="font-semibold text-blue-600">{investmentYears} let</span>
                  </div>
                  <Slider
                    min={5}
                    max={40}
                    step={1}
                    value={[investmentYears]}
                    onValueChange={(value) => setInvestmentYears(value[0])}
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Výnos</span>
                    <span className="font-semibold text-blue-600">{annualReturn}%</span>
                  </div>
                  <Slider
                    min={3}
                    max={12}
                    step={0.5}
                    value={[annualReturn]}
                    onValueChange={(value) => setAnnualReturn(value[0])}
                    className="h-2"
                  />
                </div>
              </div>
            </div>

            {/* Kompaktní výsledky */}
            <div className="space-y-3">
              {costComparisonData.map((scenario, index) => (
                <div key={index} className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
                  index === 0 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          index === 0 ? 'ring-2 ring-green-300' : ''
                        }`}
                        style={{ backgroundColor: scenario.color }}
                      >
                        {index === 0 ? '👑' : index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{scenario.fullName}</div>
                        <div className="text-xs text-gray-600">
                          {formatCurrency(scenario.totalFees, 'CZK')} poplatky
                          {index > 0 && (
                            <span className="text-red-600 ml-2">
                              (+{formatCurrency(scenario.totalFees - costComparisonData[0].totalFees, 'CZK')})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        index === 0 ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {formatCurrency(scenario.finalValue, 'CZK')}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-red-600">
                          -{formatCurrency(costComparisonData[0].finalValue - scenario.finalValue, 'CZK')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Shrnutí výsledků */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Klíčové pozorování
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/60 rounded-lg p-4">
                <div className="font-semibold text-blue-900 mb-2">💰 Celková úspora</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(costComparisonData[4]?.totalFees - costComparisonData[0]?.totalFees, 'CZK')}
                </div>
                <div className="text-blue-700">za {investmentYears} let (nejlevnější vs aktivní fond)</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="font-semibold text-blue-900 mb-2">📈 Dopad na výnos</div>
                <div className="text-2xl font-bold text-orange-600">
                  {((costComparisonData[0]?.finalValue - costComparisonData[4]?.finalValue) / costComparisonData[4]?.finalValue * 100).toFixed(1)}%
                </div>
                <div className="text-blue-700">více peněz s levným ETF</div>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>

      {/* Živé srovnání nejlevnějších ETF */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Award className="w-6 h-6 text-gold-600" />
            🏆 Nejlevnější ETF fondy (živá data)
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Vyberte kategorii" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny kategorie</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-green-600">
              {filteredETFs.length} ETF nalezeno
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && etfs.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Načítám nejlevnější ETF fondy...</p>
            </div>
          ) : filteredETFs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Žádné ETF fondy nenalezeny pro vybranou kategorii.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredETFs.slice(0, 10).map((etf, index) => (
              <Card key={etf.isin} className={`relative overflow-hidden transition-all hover:shadow-md ${index === 0 ? 'ring-2 ring-gold-400 bg-gradient-to-r from-yellow-50 to-amber-50' : ''}`}>
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 text-xs font-bold">
                    #1 NEJLEVNĚJŠÍ
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                        <ETFTicker ticker={etf.ticker} isin={etf.isin} size="lg" />
                        <Badge variant="outline" className="text-xs">{etf.category}</Badge>
                      </div>
                      <h3 className="font-medium text-sm text-gray-700 line-clamp-2">
                        {etf.name}
                      </h3>
                    </div>

                    <div className="text-center">
                      <div className={`text-xl font-bold ${index === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {etf.ter_percent}
                      </div>
                      <div className="text-xs text-gray-500">TER</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {etf.fund_size_formatted}
                      </div>
                      <div className="text-xs text-gray-500">Velikost fondu (EUR)</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-green-600">
                        {Math.round(etf.ter_numeric * 25000).toLocaleString()} Kč
                      </div>
                      <div className="text-xs text-gray-500">Roční náklad/2,5 mil Kč</div>
                    </div>

                    <div className="text-center">
                      <Link to={`/etf/${etf.isin}`}>
                        <Button size="sm" variant={index === 0 ? "default" : "outline"}>
                          Detail
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grafy a analýzy */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Kde koupit nejlevnější ETF */}
        <Card>
          <CardHeader>
            <CardTitle>🏦 Kde koupit nejlevnější ETF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-green-900">DEGIRO</span>
                  <Badge className="bg-green-100 text-green-800">DOPORUČENO</Badge>
                </div>
                <p className="text-sm text-green-700 mb-2">
                  Nejlevnější brokerage pro ETF. Stovky ETF zdarma.
                </p>
                <div className="text-xs text-green-600">
                  📊 Core Selection: 0 € • Ostatní ETF: 2 € + 0.03%
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-blue-900">XTB</span>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">ALTERNATIVA</Badge>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  ETF do 100k € měsíčně zdarma. Český zákaznický servis.
                </p>
                <div className="text-xs text-blue-600">
                  📊 ETF zdarma do 100k € • Nad limit: 0.2% (min 10 €)
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">Interactive Brokers</span>
                  <Badge variant="outline" className="border-gray-300 text-gray-700">PRO</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Pro pokročilé investory. Nejširší výběr ETF.
                </p>
                <div className="text-xs text-gray-600">
                  📊 0.05% (min 1 USD) • Měsíční minimum: 10 USD
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Úspory oproti aktivním fondům */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Úspory oproti aktivním fondům</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[50000, 100000, 250000, 500000].map(amount => {
                const lowCostTER = 0.0015; // 0.15%
                const activeFundTER = 0.015; // 1.5%
                const annualSaving = amount * (activeFundTER - lowCostTER);
                const savingOver20Years = annualSaving * 20;
                
                return (
                  <div key={amount} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{formatCurrency(amount, 'CZK')} investice</div>
                      <div className="text-sm text-gray-600">Ročně: {formatCurrency(annualSaving, 'CZK')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {formatCurrency(savingOver20Years, 'CZK')}
                      </div>
                      <div className="text-xs text-gray-500">za 20 let</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doporučení podle kategorií */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>🎯 Nejlepší volby podle kategorie</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="global">Globální</TabsTrigger>
              <TabsTrigger value="usa">USA</TabsTrigger>
              <TabsTrigger value="europe">Evropa</TabsTrigger>
              <TabsTrigger value="emerging">Emerging</TabsTrigger>
            </TabsList>
            
            {["global", "usa", "europe", "emerging"].map(tabValue => {
              console.log(`🔍 Processing tab: ${tabValue}`);
              console.log('🏷️ All available categories:', categories);
              console.log('🏷️ First 10 cheapest ETFs categories:', cheapestETFs.slice(0, 10).map(etf => `${etf.ticker}: "${etf.category}"`));
              
              const categoryETFs = cheapestETFs
                .filter(etf => {
                  const etfName = etf.name?.toLowerCase() || "";
                  const etfCategory = etf.category?.toLowerCase() || "";
                  
                  let match = false;
                  if (tabValue === "global") {
                    match = etfName.includes("world") || 
                           etfName.includes("global") || 
                           etfName.includes("msci world") ||
                           etfName.includes("developed") ||
                           etfName.includes("all cap") ||
                           etfName.includes("acwi") ||
                           etfName.includes("prime global") ||
                           etfCategory.includes("ostatní");  // "Prime Global" je v kategorii Ostatní
                  } else if (tabValue === "usa") {
                    match = etfName.includes("s&p") || 
                           etfName.includes("usa") || 
                           etfName.includes("america") ||
                           etfName.includes("us ") ||
                           etfName.includes("nasdaq") ||
                           etfName.includes("russell") ||
                           etfName.includes("united states") ||
                           etfName.includes("us equity") ||
                           etfName.includes("betabuilders us") ||
                           etfName.includes("core s&p") ||
                           etfName.includes("msci usa");
                  } else if (tabValue === "europe") {
                    match = etfName.includes("europe") || 
                           etfName.includes("euro") ||
                           etfName.includes("stoxx") ||
                           etfName.includes("european") ||
                           etfName.includes("uk equity") ||
                           etfName.includes("msci europe");
                  } else if (tabValue === "emerging") {
                    match = etfName.includes("emerging") || 
                           etfName.includes("em ") ||
                           etfName.includes("developing") ||
                           etfName.includes("frontier") ||
                           etfName.includes("msci emerging");
                  }
                  
                  return match;
                })
                .slice(0, 3);
              
              console.log(`📊 Found ${categoryETFs.length} ETFs for tab ${tabValue}:`, categoryETFs.map(etf => `${etf.ticker} (${etf.category})`));

              return (
                <TabsContent key={tabValue} value={tabValue} className="mt-6">
                  <div className="grid gap-4">
                    {categoryETFs.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>Žádné ETF v této kategorii nebyly nalezeny v top 30 nejlevnějších.</p>
                        <p className="text-sm mt-2">Zkuste kategorie s větším počtem ETF.</p>
                      </div>
                    ) : (
                      categoryETFs.map((etf, index) => (
                        <div key={etf.isin} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">#{index + 1}</Badge>
                            <div>
                              <div className="font-semibold">
                                <ETFTicker ticker={etf.ticker} isin={etf.isin} />
                              </div>
                              <div className="text-sm text-gray-600 line-clamp-1">
                                {etf.name}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{etf.ter_percent}</div>
                            <div className="text-xs text-gray-500">{etf.fund_size_formatted}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Praktické tipy */}
      <Card className="mb-12 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
        <CardHeader>
          <CardTitle className="text-violet-900">💡 Praktické tipy pro minimalizaci nákladů</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3">✅ Doporučujeme</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>TER pod 0.25%</strong> pro broad market ETF</li>
                <li>• <strong>Velikost fondu 500M€+</strong> pro lepší likviditu</li>
                <li>• <strong>Pravidelné investování</strong> místo timing trhu</li>
                <li>• <strong>Akumulační ETF</strong> jsou daňově výhodnější</li>
                <li>• <strong>Core-Satellite přístup</strong> s 80% v levných core ETF</li>
                <li>• <strong>Dlouhodobé držení</strong> (10+ let)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-3">❌ Vyhýbejte se</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Aktivně řízené ETF</strong> s TER 0.75%+</li>
                <li>• <strong>Malé fondy</strong> pod 100M€</li>
                <li>• <strong>Časté rebalancování</strong> portfolia</li>
                <li>• <strong>Tematické ETF</strong> s vysokými poplatky</li>
                <li>• <strong>Hedged ETF</strong> bez skutečné potřeby</li>
                <li>• <strong>Spekulativní trading</strong> místo investování</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA sekce */}
      <Card className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Začněte investovat s nejnižšími náklady</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Použijte naše nástroje k nalezení nejlevnějších ETF a optimalizaci vašeho portfolia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link to="/srovnani-etf">
                <BarChart3 className="w-5 h-5 mr-2" />
                Porovnat všechny ETF
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/etf-poplatky-srovnani">
                <Calculator className="w-5 h-5 mr-2" />
                Kalkulačka poplatků
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </BlogArticleLayout>
  );
};

export default NejlevnejsiETFFondy;