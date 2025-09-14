import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign, Calendar, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface LoanData {
  month: number;
  remainingDebt: number;
  monthlyPayment: number;
  principalPayment: number;
  interestPayment: number;
  totalInterest: number;
}

const ConsumerLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanPeriod, setLoanPeriod] = useState<number>(5);

  const loanData = useMemo(() => {
    if (!loanAmount || !interestRate || !loanPeriod) return [];

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanPeriod * 12;
    
    // Calculate monthly payment using loan formula
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const data: LoanData[] = [];
    let remainingDebt = loanAmount;
    let totalInterest = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingDebt * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      remainingDebt = Math.max(0, remainingDebt - principalPayment);
      totalInterest += interestPayment;

      data.push({
        month,
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
    if (loanData.length === 0) return null;

    const monthlyPayment = loanData[0].monthlyPayment;
    const totalPayments = monthlyPayment * loanData.length;
    const totalInterest = loanData[loanData.length - 1].totalInterest;

    return {
      monthlyPayment,
      totalPayments,
      totalInterest,
      interestPercentage: (totalInterest / loanAmount) * 100
    };
  }, [loanData, loanAmount]);

  const chartData = useMemo(() => {
    return loanData
      .filter((_, index) => index % 12 === 0 || index === loanData.length - 1)
      .map(item => ({
        year: Math.ceil(item.month / 12),
        'Zbývající dluh': Math.round(item.remainingDebt),
        'Zaplacené úroky': Math.round(item.totalInterest)
      }));
  }, [loanData]);

  const pieData = useMemo(() => {
    if (!summary) return [];
    
    return [
      { name: 'Jistina', value: loanAmount, color: '#3B82F6' },
      { name: 'Úroky', value: summary.totalInterest, color: '#EF4444' }
    ];
  }, [loanAmount, summary]);

  const monthlyBreakdownData = useMemo(() => {
    if (loanData.length === 0) return [];
    
    return loanData
      .filter((_, index) => index % 12 === 0 || index === loanData.length - 1)
      .map(item => ({
        year: Math.ceil(item.month / 12),
        'Úmor jistiny': Math.round(item.principalPayment),
        'Úrok': Math.round(item.interestPayment)
      }));
  }, [loanData]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Kalkulačka spotřebitelského úvěru
          </CardTitle>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Spočítejte si měsíční splátky a celkové náklady spotřebitelského úvěru až na 10 let
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Parametry úvěru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Výše úvěru: {loanAmount?.toLocaleString()} Kč
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={loanAmount || 0}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50 000 Kč</span>
                    <span>2 000 000 Kč</span>
                  </div>
                  <input
                    type="number"
                    value={loanAmount || ''}
                    onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="Zadejte výši úvěru"
                    min="50000"
                    max="2000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Úroková sazba: {interestRate}% p.a.
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="0.1"
                    value={interestRate || 0}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3%</span>
                    <span>25%</span>
                  </div>
                  <input
                    type="number"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="Zadejte úrokovou sazbu"
                    min="3"
                    max="25"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doba splatnosti: {loanPeriod} let
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={loanPeriod || 0}
                    onChange={(e) => setLoanPeriod(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 rok</span>
                    <span>10 let</span>
                  </div>
                  <input
                    type="number"
                    value={loanPeriod || ''}
                    onChange={(e) => setLoanPeriod(Math.min(10, Math.max(1, Number(e.target.value) || 0)))}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="Zadejte dobu splatnosti"
                    min="1"
                    max="10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {summary && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Výsledky výpočtu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-sm text-blue-600 font-medium">Měsíční splátka</div>
                      <div className="text-2xl font-bold text-blue-900">
                        {Math.round(summary.monthlyPayment).toLocaleString()} Kč
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="text-sm text-gray-600 font-medium">Celkem zaplatíte</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(summary.totalPayments).toLocaleString()} Kč
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                      <div className="text-sm text-red-600 font-medium">Celkové úroky</div>
                      <div className="text-2xl font-bold text-red-900">
                        {Math.round(summary.totalInterest).toLocaleString()} Kč
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                      <div className="text-sm text-orange-600 font-medium">Poměr úroků</div>
                      <div className="text-2xl font-bold text-orange-900">
                        {summary.interestPercentage.toFixed(1)}%
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
                          <li>• Nezahrnuje poplatky za zpracování a vedení úvěru</li>
                          <li>• Doporučujeme porovnat nabídky více bank</li>
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

      {summary && (
        <>
          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Debt Progress Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Průběh splácení
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
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      width={80}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${Math.round(value).toLocaleString()} Kč`]}
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
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Složení celkové částky
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
                      formatter={(value: number) => [`${Math.round(value).toLocaleString()} Kč`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Payment Breakdown */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-purple-600" />
                Struktura měsíčních splátek
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyBreakdownData}>
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
    </div>
  );
};

export default ConsumerLoanCalculator;