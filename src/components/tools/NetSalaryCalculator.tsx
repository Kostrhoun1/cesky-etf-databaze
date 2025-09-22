import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Banknote, Users, GraduationCap } from 'lucide-react';
import { calculateNetSalary, NetSalaryData } from '@/utils/netSalaryCalculations';
import NetSalaryResults from './NetSalaryResults';

const NetSalaryCalculator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState<number>(45000);
  const [isPensioner, setIsPensioner] = useState<boolean>(false);
  const [hasChildren, setHasChildren] = useState<boolean>(false);
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [hasDisability, setHasDisability] = useState<boolean>(false);
  const [results, setResults] = useState<NetSalaryData | null>(null);

  const handleCalculate = () => {
    const params = {
      grossSalary,
      isPensioner,
      hasChildren,
      numberOfChildren: hasChildren ? numberOfChildren : 0,
      isStudent,
      hasDisability
    };
    
    const calculatedResults = calculateNetSalary(params);
    setResults(calculatedResults);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Kalkulačka čisté mzdy 2025</CardTitle>
              <CardDescription>
                Spočítejte si čistou mzdu podle aktuální české legislativy pro rok 2025
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Základní údaje */}
            <Card className="bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  Základní údaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="grossSalary">Hrubá mzda (Kč/měsíc)</Label>
                  <Input
                    id="grossSalary"
                    type="number"
                    value={grossSalary || ''}
                    onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                    min="1000"
                    step="1000"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Minimální mzda v roce 2025: 20 800 Kč
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Slevy na dani a pojištění */}
            <Card className="bg-green-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Slevy na dani a pojištění
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPensioner"
                    checked={isPensioner}
                    onChange={(e) => setIsPensioner(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="isPensioner">Pracující důchodce</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasChildren"
                    checked={hasChildren}
                    onChange={(e) => setHasChildren(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="hasChildren">Mám děti</Label>
                </div>
                {hasChildren && (
                  <div>
                    <Label htmlFor="numberOfChildren">Počet dětí</Label>
                    <Input
                      id="numberOfChildren"
                      type="number"
                      value={numberOfChildren || ''}
                      onChange={(e) => setNumberOfChildren(Number(e.target.value) || 0)}
                      min="0"
                      max="10"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Sleva: 1. dítě 1 267 Kč, 2. dítě 1 860 Kč, 3.+ dítě 2 320 Kč/měsíc
                    </p>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasDisability"
                    checked={hasDisability}
                    onChange={(e) => setHasDisability(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="hasDisability">Invalidita/ZTP</Label>
                </div>
              </CardContent>
            </Card>
          </div>


          <Button onClick={handleCalculate} className="w-full" size="lg">
            Vypočítat čistou mzdu
          </Button>

          {/* Rozbalovací předpoklady */}
          <details className="mt-6 border border-green-200 rounded-lg">
            <summary className="p-4 bg-green-50 cursor-pointer hover:bg-green-100 transition-colors rounded-lg">
              <span className="font-semibold text-green-900">📋 Předpoklady kalkulačky mzdy (klikněte pro rozbalení)</span>
            </summary>
            <div className="p-4 border-t border-green-200">
              <h4 className="font-semibold mb-3 text-green-900">📊 Aktuální sazby pro rok 2025</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <h5 className="font-semibold mb-2">Pojistné zaměstnance:</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Sociální pojištění: 7,1%</li>
                    <li>• Zdravotní pojištění: 4,5%</li>
                    <li>• Celkem: 11,6%</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Daň z příjmů:</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Základní sazba: 15%</li>
                    <li>• Nad 139 671 Kč/měsíc: 23%</li>
                    <li>• Sleva na poplatníka: 2 570 Kč/měsíc</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="font-semibold mb-3 text-green-900">⚙️ Předpoklady výpočtu</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Daň z příjmu:</strong> Počítá se z hrubé mzdy, progresivní zdanění od 139 671 Kč/měsíc</li>
                <li>• <strong>Důchodci:</strong> Sleva na důchodovém (6,5%), platí nemocenské (0,6%) + zdravotní (4,5%)</li>
                <li>• <strong>Slevy na děti:</strong> Progresivní - 1. dítě 1 267 Kč, 2. dítě 1 860 Kč, 3.+ dítě 2 320 Kč</li>
                <li>• <strong>Superhrubá mzda:</strong> Zrušena od roku 2021, daň se počítá z hrubé mzdy</li>
                <li>• <strong>Nezahrnuje:</strong> Stravenky, benefity, nadpracovna</li>
              </ul>
            </div>
          </details>
        </CardContent>
      </Card>

      {results && (
        <NetSalaryResults results={results} />
      )}
    </div>
  );
};

export default NetSalaryCalculator;