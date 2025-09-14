import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, DollarSign, Calendar, Info, PiggyBank } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface MortgageData {
  month: number;
  year: number;
  remainingDebt: number;
  monthlyPayment: number;
  principalPayment: number;
  interestPayment: number;
  totalInterest: number;
}

const MortgageCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(4500000);
  const [downPayment, setDownPayment] = useState<number>(900000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanPeriod, setLoanPeriod] = useState<number>(25);

  const loanAmount = propertyValue - downPayment;
  const downPaymentPercentage = (downPayment / propertyValue) * 100;

  const mortgageData = useMemo(() => {
    if (!loanAmount || !interestRate || !loanPeriod || loanAmount <= 0) return [];

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanPeriod * 12;
    
    // Calculate monthly payment using mortgage formula
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const data: MortgageData[] = [];
    let remainingDebt = loanAmount;
    let totalInterest = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingDebt * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      remainingDebt = Math.max(0, remainingDebt - principalPayment);
      totalInterest += interestPayment;

      data.push({
        month,
        year: Math.ceil(month / 12),
        remainingDebt,
        monthlyPayment,
        principalPayment,
        interestPayment,
        totalInterest
      });
    }

    return data;
  }, [loanAmount, interestRate, loanPeriod]);

  const summary = useMemo(() => {
    if (mortgageData.length === 0) return null;

    const monthlyPayment = mortgageData[0].monthlyPayment;
    const totalPayments = monthlyPayment * mortgageData.length;
    const totalInterest = mortgageData[mortgageData.length - 1].totalInterest;

    return {
      monthlyPayment,
      totalPayments,
      totalInterest,
      interestPercentage: (totalInterest / loanAmount) * 100,
      totalCost: propertyValue + totalInterest
    };
  }, [mortgageData, loanAmount, propertyValue]);

  const chartData = useMemo(() => {
    return mortgageData
      .filter((_, index) => index % 12 === 0 || index === mortgageData.length - 1)
      .map(item => ({
        year: item.year,
        'Zbývající dluh': Math.round(item.remainingDebt),
        'Zaplacené úroky': Math.round(item.totalInterest)
      }));
  }, [mortgageData]);

  const pieData = useMemo(() => {
    if (!summary) return [];
    
    return [
      { name: 'Vlastní kapitál', value: downPayment, color: '#10B981' },
      { name: 'Úvěr (jistina)', value: loanAmount, color: '#3B82F6' },
      { name: 'Úroky z úvěru', value: summary.totalInterest, color: '#EF4444' }
    ];
  }, [downPayment, loanAmount, summary]);

  const yearlyData = useMemo(() => {
    if (mortgageData.length === 0) return [];
    
    const yearlyBreakdown = [];
    for (let year = 1; year <= loanPeriod; year++) {
      const yearData = mortgageData.filter(item => item.year === year);
      if (yearData.length > 0) {
        const yearlyPrincipal = yearData.reduce((sum, item) => sum + item.principalPayment, 0);
        const yearlyInterest = yearData.reduce((sum, item) => sum + item.interestPayment, 0);
        
        yearlyBreakdown.push({
          year,
          'Úmor jistiny': Math.round(yearlyPrincipal),
          'Úrok': Math.round(yearlyInterest)
        });
      }
    }
    
    return yearlyBreakdown.filter((_, index) => index % 5 === 0 || index === yearlyBreakdown.length - 1);
  }, [mortgageData, loanPeriod]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg">
              <Home className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Hypoteční kalkulačka
          </CardTitle>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Spočítejte si měsíční splátky hypotéky a celkové náklady na bydlení až na 30 let
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Home className="h-5 w-5 text-green-600" />
                  Parametry hypotéky
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hodnota nemovitosti: {propertyValue?.toLocaleString()} Kč
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="15000000"
                    step="100000"
                    value={propertyValue || 0}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setPropertyValue(newValue);
                      // Adjust down payment if it's more than 80% of property value
                      if (downPayment > newValue * 0.8) {
                        setDownPayment(Math.round(newValue * 0.2));
                      }
                    }}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 mil. Kč</span>
                    <span>15 mil. Kč</span>
                  </div>
                  <input
                    type="number"
                    value={propertyValue || ''}
                    onChange={(e) => {
                      const newValue = Number(e.target.value) || 0;
                      setPropertyValue(newValue);
                      if (downPayment > newValue * 0.8) {
                        setDownPayment(Math.round(newValue * 0.2));
                      }
                    }}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="Zadejte hodnotu nemovitosti"
                    min="1000000"
                    max="15000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vlastní kapitál: {downPayment?.toLocaleString()} Kč ({downPaymentPercentage.toFixed(1)}%)
                  </label>
                  <input
                    type="range"
                    min={Math.round(propertyValue * 0.1)}
                    max={Math.round(propertyValue * 0.8)}
                    step="50000"
                    value={downPayment || 0}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>80%</span>
                  </div>
                  <input
                    type="number"
                    value={downPayment || ''}
                    onChange={(e) => {
                      const value = Number(e.target.value) || 0;
                      const maxDown = Math.round(propertyValue * 0.8);
                      const minDown = Math.round(propertyValue * 0.1);
                      setDownPayment(Math.min(maxDown, Math.max(minDown, value)));
                    }}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="Zadejte vlastní kapitál"
                    min={Math.round(propertyValue * 0.1)}
                    max={Math.round(propertyValue * 0.8)}
                  />
                  <div className="mt-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <strong>Výše úvěru: {loanAmount.toLocaleString()} Kč</strong>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Úroková sazba: {interestRate}% p.a.
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.1"
                    value={interestRate || 0}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2%</span>
                    <span>12%</span>
                  </div>
                  <input
                    type="number"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="Zadejte úrokovou sazbu"
                    min="2"
                    max="12"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doba splatnosti: {loanPeriod} let
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanPeriod || 0}
                    onChange={(e) => setLoanPeriod(Number(e.target.value))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5 let</span>
                    <span>30 let</span>
                  </div>
                  <input
                    type="number"
                    value={loanPeriod || ''}
                    onChange={(e) => setLoanPeriod(Math.min(30, Math.max(5, Number(e.target.value) || 0)))}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="Zadejte dobu splatnosti"
                    min="5"
                    max="30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {summary && loanAmount > 0 && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Výsledky výpočtu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="text-sm text-green-600 font-medium">Měsíční splátka</div>
                      <div className="text-3xl font-bold text-green-900">
                        {Math.round(summary.monthlyPayment).toLocaleString()} Kč
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <div className="text-sm text-blue-600 font-medium">Celkem za úvěr</div>
                        <div className="text-xl font-bold text-blue-900">
                          {Math.round(summary.totalPayments).toLocaleString()} Kč
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <div className="text-sm text-purple-600 font-medium">Celková cena</div>
                        <div className="text-xl font-bold text-purple-900">
                          {Math.round(summary.totalCost).toLocaleString()} Kč
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                        <div className="text-sm text-red-600 font-medium">Celkové úroky</div>
                        <div className="text-xl font-bold text-red-900">
                          {Math.round(summary.totalInterest).toLocaleString()} Kč
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                        <div className="text-sm text-orange-600 font-medium">Poměr úroků</div>
                        <div className="text-xl font-bold text-orange-900">
                          {summary.interestPercentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800 mb-1">Důležité informace:</p>
                        <ul className="text-yellow-700 space-y-1 text-xs">
                          <li>• Výpočet je orientační, skutečné podmínky se mohou lišit</li>
                          <li>• Nezahrnuje pojištění nemovitosti a životní pojištění</li>
                          <li>• Nezahrnuje poplatky za odhad a zpracování</li>
                          <li>• Minimální vlastní kapitál je obvykle 20%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {summary && loanAmount > 0 && (
        <>
          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Debt Progress Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Průběh splácení hypotéky
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Rok', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      width={80}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${(value / 1000000).toFixed(2)} mil. Kč`]}
                      labelFormatter={(label) => `Rok ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Zbývající dluh" 
                      stroke="#3B82F6" 
                      strokeWidth={3} 
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Zaplacené úroky" 
                      stroke="#EF4444" 
                      strokeWidth={3} 
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                  Struktura celkových nákladů
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${(value / 1000000).toFixed(2)} mil. Kč`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Yearly Payment Breakdown */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-purple-600" />
                Struktura ročních splátek (každý 5. rok)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Rok', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${Math.round(value).toLocaleString()} Kč`]}
                    labelFormatter={(label) => `Rok ${label}`}
                  />
                  <Bar dataKey="Úmor jistiny" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="Úrok" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      {loanAmount <= 0 && (
        <Card className="shadow-lg border-0 bg-yellow-50">
          <CardContent className="text-center py-8">
            <div className="text-yellow-600 mb-4">
              <Info className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">
              Vlastní kapitál je příliš vysoký
            </h3>
            <p className="text-yellow-700">
              Snižte výši vlastního kapitálu nebo zvyšte hodnotu nemovitosti pro výpočet hypotéky.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MortgageCalculator;