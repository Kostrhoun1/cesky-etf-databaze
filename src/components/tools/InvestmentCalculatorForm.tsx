import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, Percent } from 'lucide-react';

interface InvestmentCalculatorFormProps {
  initialInvestment: number;
  setInitialInvestment: (value: number) => void;
  recurringInvestment: number;
  setRecurringInvestment: (value: number) => void;
  recurringFrequency: 'monthly' | 'yearly';
  setRecurringFrequency: (value: 'monthly' | 'yearly') => void;
  averageReturn: number;
  setAverageReturn: (value: number) => void;
  investmentPeriod: number;
  setInvestmentPeriod: (value: number) => void;
  taxRate: number;
  setTaxRate: (value: number) => void;
  onCalculate: () => void;
}

const InvestmentCalculatorForm: React.FC<InvestmentCalculatorFormProps> = ({
  initialInvestment,
  setInitialInvestment,
  recurringInvestment,
  setRecurringInvestment,
  recurringFrequency,
  setRecurringFrequency,
  averageReturn,
  setAverageReturn,
  investmentPeriod,
  setInvestmentPeriod,
  taxRate,
  setTaxRate,
  onCalculate
}) => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Investiční parametry */}
        <div className="border rounded-lg p-4 bg-violet-25">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-violet-600" />
            <h3 className="font-semibold text-sm">Investiční parametry</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="initial" className="text-sm">Jednorázová investice (Kč)</Label>
              <Input
                id="initial"
                type="number"
                value={initialInvestment || ''}
                onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                placeholder="0"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="recurring" className="text-sm">Pravidelná investice (Kč)</Label>
              <Input
                id="recurring"
                type="number"
                value={recurringInvestment || ''}
                onChange={(e) => setRecurringInvestment(Number(e.target.value) || 0)}
                placeholder="5000"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="frequency" className="text-sm">Frekvence investování</Label>
              <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                <SelectTrigger id="frequency" className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Měsíčně</SelectItem>
                  <SelectItem value="yearly">Ročně</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Parametry výnosu a času */}
        <div className="border rounded-lg p-4 bg-gray-25">
          <div className="flex items-center gap-2 mb-3">
            <Percent className="h-4 w-4 text-violet-600" />
            <h3 className="font-semibold text-sm">Parametry výnosu a času</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="return" className="text-sm">Průměrný roční výnos (%)</Label>
              <Input
                id="return"
                type="number"
                value={averageReturn || ''}
                onChange={(e) => setAverageReturn(Number(e.target.value) || 0)}
                placeholder="7"
                step="0.1"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="period" className="text-sm">Investiční horizont (roky)</Label>
              <Input
                id="period"
                type="number"
                value={investmentPeriod || ''}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value) || 0)}
                placeholder="20"
                min="1"
                max="50"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="tax" className="text-sm">Daňová sazba (%)</Label>
              <Input
                id="tax"
                type="number"
                value={taxRate || ''}
                onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                placeholder="0"
                min="0"
                max="50"
                step="0.1"
                className="h-9 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <Button onClick={onCalculate} className="w-full h-9 text-sm">
        <Calculator className="mr-2 h-4 w-4" />
        Vypočítat investiční růst
      </Button>
    </div>
  );
};

export default InvestmentCalculatorForm;