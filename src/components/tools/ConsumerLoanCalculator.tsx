import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign, Calendar, Info, BarChart3 } from 'lucide-react';
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
      
      remainingDebt = remainingDebt - principalPayment;
      // Handle rounding errors in final payment
      if (remainingDebt < 0.01) remainingDebt = 0;
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
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-violet-600" />
            <CardTitle className="text-lg">
              Kalkulačka spotřebitelského úvěru
            </CardTitle>
          </div>
          <p className="text-sm text-gray-600">
            Spočítejte si měsíční splátky a celkové náklady úvěru
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Input Section */}
            <div className="border rounded-lg p-4 bg-violet-25">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-4 w-4 text-violet-600" />
                <h3 className="font-semibold text-sm">Parametry úvěru</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Výše úvěru: {loanAmount?.toLocaleString()} Kč
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={loanAmount || 0}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50 000 Kč</span>
                    <span>2 000 000 Kč</span>
                  </div>
                  <input
                    type="number"
                    value={loanAmount || ''}
                    onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                    className="mt-2 w-full px-3 py-1 border border-gray-300 rounded-md text-center h-9 text-sm"
                    placeholder="Zadejte výši úvěru"
                    min="50000"
                    max="2000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Úroková sazba: {interestRate}% p.a.
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="0.1"
                    value={interestRate || 0}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3%</span>
                    <span>25%</span>
                  </div>
                  <input
                    type="number"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="mt-2 w-full px-3 py-1 border border-gray-300 rounded-md text-center h-9 text-sm"
                    placeholder="Zadejte úrokovou sazbu"
                    min="3"
                    max="25"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doba splatnosti: {loanPeriod} let
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={loanPeriod || 0}
                    onChange={(e) => setLoanPeriod(Number(e.target.value))}
                    className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 rok</span>
                    <span>10 let</span>
                  </div>
                  <input
                    type="number"
                    value={loanPeriod || ''}
                    onChange={(e) => setLoanPeriod(Math.min(10, Math.max(1, Number(e.target.value) || 0)))}
                    className="mt-2 w-full px-3 py-1 border border-gray-300 rounded-md text-center h-9 text-sm"
                    placeholder="Zadejte dobu splatnosti"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            {summary && (
              <div className="border rounded-lg p-4 bg-gray-25">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-violet-600" />
                  <h3 className="font-semibold text-sm">Výsledky výpočtu</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 font-medium">Měsíční splátka</div>
                    <div className="text-lg font-bold text-blue-900">
                      {Math.round(summary.monthlyPayment).toLocaleString()} Kč
                    </div>
                    <div className="text-xs text-blue-700 mt-1">Konstantní splátka každý měsíc</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 font-medium">Celkem zaplatíte</div>
                    <div className="text-lg font-bold text-gray-900">
                      {Math.round(summary.totalPayments).toLocaleString()} Kč
                    </div>
                    <div className="text-xs text-gray-700 mt-1">Součet všech měsíčních splátek</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="text-xs text-red-600 font-medium">Přeplatek úvěru</div>
                    <div className="text-lg font-bold text-red-900">
                      {Math.round(summary.totalInterest).toLocaleString()} Kč
                    </div>
                    <div className="text-xs text-red-700 mt-1">Kolik zaplatíte bance navíc</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 font-medium">Poměr přeplatku</div>
                    <div className="text-lg font-bold text-orange-900">
                      {summary.interestPercentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-orange-700 mt-1">% z výše úvěru navíc</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Rozbalovací předpoklady */}
          <details className="mt-4 border border-gray-200 rounded-lg">
            <summary className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg">
              <span className="font-semibold text-gray-900 text-sm">📋 Předpoklady kalkulačky úvěru</span>
            </summary>
            <div className="p-3 border-t border-gray-200">
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>Anuitní splácení:</strong> Konstantní měsíční splátka po celou dobu úvěru</li>
                <li>• <strong>Úroky:</strong> Počítány z aktuálního zůstatku dluhu každý měsíc</li>
                <li>• <strong>Úmor jistiny:</strong> Postupně roste, zatímco úroky klesají</li>
                <li>• <strong>Poplatky:</strong> Nejsou v kalkulaci zahrnuty (jednorázové i průběžné)</li>
                <li>• <strong>Předčasné splacení:</strong> Není uvažováno v tomto výpočtu</li>
                <li>• <strong>Bonita klienta:</strong> Ovlivňuje skutečnou úrokovou sazbu u bank</li>
              </ul>
            </div>
          </details>
          
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
                <BarChart3 className="h-5 w-5 text-purple-600" />
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

          {/* Umořovací tabulka */}
          <details className="border border-gray-200 rounded-lg bg-white shadow-lg">
            <summary className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg">
              <span className="font-semibold text-gray-900">📊 Detailní umořovací tabulka (klikněte pro rozbalení)</span>
            </summary>
            <div className="p-4 border-t border-gray-200 max-h-96 overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2 text-left font-semibold">Měsíc</th>
                      <th className="p-2 text-right font-semibold">Splátka</th>
                      <th className="p-2 text-right font-semibold">Úrok</th>
                      <th className="p-2 text-right font-semibold">Jistina</th>
                      <th className="p-2 text-right font-semibold">Zůstatek</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanData.map((item, index) => (
                      <tr key={index} className={index % 12 === 0 ? "bg-blue-50" : "hover:bg-gray-50"}>
                        <td className="p-2 font-medium">
                          {index % 12 === 0 && <span className="text-blue-600 font-bold">Rok {Math.floor(index / 12) + 1}</span>}
                          <div className="text-xs text-gray-500">Měsíc {item.month}</div>
                        </td>
                        <td className="p-2 text-right font-medium">
                          {Math.round(item.monthlyPayment).toLocaleString()} Kč
                        </td>
                        <td className="p-2 text-right text-red-600">
                          {Math.round(item.interestPayment).toLocaleString()} Kč
                        </td>
                        <td className="p-2 text-right text-green-600">
                          {Math.round(item.principalPayment).toLocaleString()} Kč
                        </td>
                        <td className="p-2 text-right font-medium">
                          {Math.round(item.remainingDebt).toLocaleString()} Kč
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                <p className="text-blue-800">
                  <strong>💡 Jak číst tabulku:</strong> Modře označené řádky jsou začátky nových roků. 
                  Vidíte jak se postupně snižuje podíl úroků (červeně) a zvyšuje úmor jistiny (zeleně) při konstantní splátce.
                </p>
              </div>
            </div>
          </details>
        </>
      )}
    </div>
  );
};

export default ConsumerLoanCalculator;