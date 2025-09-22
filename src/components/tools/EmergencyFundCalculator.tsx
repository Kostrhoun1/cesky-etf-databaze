import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, AlertTriangle, TrendingDown, Banknote, CheckCircle, XCircle } from 'lucide-react';
import { calculateEmergencyFund, EmergencyFundData } from '@/utils/emergencyFundCalculations';
import EmergencyFundResults from './EmergencyFundResults';

const EmergencyFundCalculator: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(40000);
  const [jobStability, setJobStability] = useState<'stable' | 'moderate' | 'unstable'>('stable');
  const [familySize, setFamilySize] = useState<number>(2);
  const [hasSecondIncome, setHasSecondIncome] = useState<boolean>(false);
  const [hasDebt, setHasDebt] = useState<boolean>(false);
  
  // Rizikové faktory - nyní povinné s rozumnými defaulty
  const [contractType, setContractType] = useState<'permanent' | 'fixed_term' | 'freelance'>('permanent');
  const [ageGroup, setAgeGroup] = useState<'young' | 'middle' | 'senior'>('middle');
  const [education, setEducation] = useState<'basic' | 'high_school' | 'university'>('high_school');
  const [region, setRegion] = useState<'prague_brno' | 'industrial' | 'rural'>('industrial');
  const [currentSavings, setCurrentSavings] = useState<number>(100000);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);
  const [monthlySavingCapacity, setMonthlySavingCapacity] = useState<number>(5000);
  const [results, setResults] = useState<EmergencyFundData | null>(null);

  const handleCalculate = () => {
    const params = {
      monthlyExpenses,
      jobStability,
      familySize,
      hasSecondIncome,
      hasDebt,
      currentSavings,
      monthlySavingCapacity,
      contractType,
      ageGroup,
      education,
      region
    };
    
    const calculatedResults = calculateEmergencyFund(params);
    setResults(calculatedResults);
    setSavingsGoal(calculatedResults.recommendedAmount);
  };

  const riskFactors = [
    { 
      factor: 'Stabilita zaměstnání', 
      impact: jobStability === 'stable' ? '🟢 Nízké riziko' : jobStability === 'moderate' ? '🟡 Střední riziko' : '🔴 Vysoké riziko',
      color: jobStability === 'stable' ? 'text-green-600' : jobStability === 'moderate' ? 'text-yellow-600' : 'text-red-600'
    },
    { 
      factor: 'Typ smlouvy', 
      impact: contractType === 'permanent' ? '✅ Trvalá smlouva' : contractType === 'fixed_term' ? '⏰ Na dobu určitou' : '📝 Dohody/OSVČ',
      color: contractType === 'permanent' ? 'text-green-600' : contractType === 'fixed_term' ? 'text-yellow-600' : 'text-red-600'
    },
    { 
      factor: 'Věková skupina', 
      impact: ageGroup === 'young' ? '👶 Snadnější hledání práce' : ageGroup === 'middle' ? '👨 Standardní pozice' : '👴 Může trvat déle najít práci',
      color: ageGroup === 'young' ? 'text-green-600' : ageGroup === 'middle' ? 'text-blue-600' : 'text-yellow-600'
    },
    { 
      factor: 'Vzdělání', 
      impact: education === 'university' ? '🎓 Lepší uplatnitelnost' : education === 'high_school' ? '📚 Standardní' : '📝 Horší pozice na trhu',
      color: education === 'university' ? 'text-green-600' : education === 'high_school' ? 'text-blue-600' : 'text-yellow-600'
    },
    { 
      factor: 'Druhý příjem', 
      impact: hasSecondIncome ? '💰 Máte druhý příjem' : '⚠️ Jediný zdroj příjmu',
      color: hasSecondIncome ? 'text-green-600' : 'text-red-600'
    },
    { 
      factor: 'Dluhy', 
      impact: hasDebt ? '🏠 Máte dluhy' : '✅ Bez dluhů',
      color: hasDebt ? 'text-red-600' : 'text-green-600'
    },
    { 
      factor: 'Počet závislých', 
      impact: familySize <= 2 ? '👥 Malá domácnost' : familySize <= 4 ? '👨‍👩‍👧‍👦 Střední domácnost' : '👨‍👩‍👧‍👦👶 Velká domácnost',
      color: familySize <= 2 ? 'text-green-600' : familySize <= 4 ? 'text-yellow-600' : 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-violet-600" />
            <CardTitle className="text-lg">
              Kalkulačka nouzové rezervy
            </CardTitle>
          </div>
          <CardDescription className="text-sm">
            Spočítejte si optimální velikost nouzové rezervy podle vaší situace
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Základní finanční údaje */}
          <div className="border rounded-lg p-4 bg-violet-25 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Banknote className="h-4 w-4 text-violet-600" />
              <h3 className="font-semibold text-sm">Finanční situace</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <Label htmlFor="monthlyExpenses" className="text-sm">Měsíční výdaje (Kč)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={monthlyExpenses || ''}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)}
                  min="10000"
                  step="5000"
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label htmlFor="familySize" className="text-sm">Počet závislých</Label>
                <Input
                  id="familySize"
                  type="number"
                  value={familySize || ''}
                  onChange={(e) => setFamilySize(Number(e.target.value) || 0)}
                  min="1"
                  max="10"
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label htmlFor="currentSavings" className="text-sm">Současné úspory (Kč)</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={currentSavings || ''}
                  onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                  min="0"
                  step="10000"
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label htmlFor="monthlySavingCapacity" className="text-sm">Měsíční spoření (Kč)</Label>
                <Input
                  id="monthlySavingCapacity"
                  type="number"
                  value={monthlySavingCapacity || ''}
                  onChange={(e) => setMonthlySavingCapacity(Number(e.target.value) || 0)}
                  min="0"
                  step="1000"
                  className="mt-1 h-9"
                />
              </div>
            </div>
          </div>

          {/* Rizikové faktory */}
          <div className="border rounded-lg p-4 bg-gray-25 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-violet-600" />
              <h3 className="font-semibold text-sm">Riziková situace</h3>
            </div>
            <div className="space-y-3">
              {/* Základní faktory v řadě */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <Label htmlFor="jobStability" className="text-sm">Stabilita zaměstnání</Label>
                  <Select value={jobStability} onValueChange={(value: 'stable' | 'moderate' | 'unstable') => setJobStability(value)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stable">🟢 Stabilní</SelectItem>
                      <SelectItem value="moderate">🟡 Střední</SelectItem>
                      <SelectItem value="unstable">🔴 Rizikové</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Typ smlouvy</Label>
                  <Select value={contractType} onValueChange={(value) => setContractType(value as any)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">✅ Neurčitou</SelectItem>
                      <SelectItem value="fixed_term">⏰ Určitou</SelectItem>
                      <SelectItem value="freelance">📝 Dohody</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Věk</Label>
                  <Select value={ageGroup} onValueChange={(value) => setAgeGroup(value as any)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="young">👶 20-35</SelectItem>
                      <SelectItem value="middle">👨 36-50</SelectItem>
                      <SelectItem value="senior">👴 50+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Vzdělání</Label>
                  <Select value={education} onValueChange={(value) => setEducation(value as any)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">🎓 VŠ</SelectItem>
                      <SelectItem value="high_school">📚 SŠ</SelectItem>
                      <SelectItem value="basic">📝 ZŠ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Checkboxy */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasSecondIncome"
                    checked={hasSecondIncome}
                    onChange={(e) => setHasSecondIncome(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="hasSecondIncome" className="text-sm">💰 Druhý příjem</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasDebt"
                    checked={hasDebt}
                    onChange={(e) => setHasDebt(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="hasDebt" className="text-sm">🏠 Mám dluhy</Label>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleCalculate} 
            className="w-full mb-4" 
            size="sm"
          >
            <Shield className="mr-2 h-4 w-4" />
            Vypočítat nouzovou rezervu
          </Button>

          {/* VÝSLEDEK: Analýza rizika */}
          {results && (
            <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Analýza vašeho rizikového profilu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{risk.factor}</span>
                        <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                          risk.color.includes('green') ? 'bg-green-100 text-green-700' :
                          risk.color.includes('yellow') ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {risk.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                      <span className="text-lg font-bold text-gray-800">Celkové hodnocení rizika</span>
                    </div>
                    <div className="text-right">
                      {(() => {
                        // Stejná logika jako v backend výpočtu
                        let riskPoints = 0;
                        
                        if (jobStability === 'moderate') riskPoints += 1;
                        if (jobStability === 'unstable') riskPoints += 2;
                        if (contractType === 'fixed_term') riskPoints += 1;
                        if (contractType === 'freelance') riskPoints += 2;
                        if (ageGroup === 'senior') riskPoints += 1;
                        if (ageGroup === 'young') riskPoints -= 1;
                        if (education === 'basic') riskPoints += 1;
                        if (education === 'university') riskPoints -= 1;
                        if (!hasSecondIncome) riskPoints += 1;
                        if (hasDebt) riskPoints += 1;
                        if (familySize > 2) riskPoints += (familySize - 2);
                        
                        if (riskPoints <= 1) return (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-green-600">Nízké riziko</span>
                          </div>
                        );
                        if (riskPoints <= 4) return (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                              <AlertTriangle className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-yellow-600">Střední riziko</span>
                          </div>
                        );
                        return (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-red-600">Vysoké riziko</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rozbalovací předpoklady */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg">
              <span className="font-semibold text-gray-900 text-sm">📋 Předpoklady kalkulačky nouzové rezervy</span>
            </summary>
            <div className="p-3 border-t border-gray-200">
              <h4 className="font-semibold mb-2 text-gray-900 text-sm">📊 Výpočet velikosti rezervy</h4>
              <div className="grid md:grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <h5 className="font-semibold mb-1">Základní velikost podle stability:</h5>
                  <ul className="space-y-0.5 text-gray-700">
                    <li>• Stabilní zaměstnání: 3 měsíce</li>
                    <li>• Středně stabilní: 6 měsíců</li>
                    <li>• Nestabilní (OSVČ, startup): 9 měsíců</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Rizikové úpravy:</h5>
                  <ul className="space-y-0.5 text-gray-700">
                    <li>• Bez druhého příjmu: +50%</li>
                    <li>• Bez zdravotního pojištění: +100%</li>
                    <li>• Dluhy (hypotéka): +50%</li>
                    <li>• Velká rodina: +25% za osobu nad 2</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2 text-gray-900 text-sm">💰 Doporučené umístění rezervy (2025)</h4>
              <div className="grid md:grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <h5 className="font-semibold mb-1">Spořicí účty CZK (70%):</h5>
                  <ul className="space-y-0.5 text-gray-700">
                    <li>• Výnos: ~3,8% p.a. (mBank 4,01%)</li>
                    <li>• Okamžitá dostupnost</li>
                    <li>• Pojištěno do 100k€</li>
                    <li>• Žádné měnové riziko</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Termínované vklady CZK (30%):</h5>
                  <ul className="space-y-0.5 text-gray-700">
                    <li>• Výnos: ~2,8% p.a. (Fio 3M 2,70%)</li>
                    <li>• Splatnost 3-6 měsíců</li>
                    <li>• Garance + pojištění</li>
                    <li>• Nízká likvidita</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2 text-gray-900 text-sm">⚙️ Zjednodušení a omezení</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>Maximální rezerva:</strong> Omezeno na 12 měsíců (i když výpočet dává více)</li>
                <li>• <strong>Minimální rezerva:</strong> Minimálně 3 měsíce ve všech případech</li>
                <li>• <strong>Výnosy:</strong> Aktuální sazby k roku 2025, mohou se měnit</li>
                <li>• <strong>Nezahrnuje:</strong> Inflaci, daně z výnosů, specifické životní situace</li>
                <li>• <strong>Měsíční výdaje:</strong> Pouze nezbytné výdaje, ne luxus nebo spoření</li>
              </ul>
            </div>
          </details>
        </CardContent>
      </Card>

      {results && (
        <EmergencyFundResults results={results} />
      )}
    </div>
  );
};

export default EmergencyFundCalculator;