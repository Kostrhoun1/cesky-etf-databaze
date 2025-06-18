
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="initial">Jednorázová investice (Kč)</Label>
          <Input
            id="initial"
            type="number"
            value={initialInvestment || ''}
            onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recurring">Pravidelná investice (Kč)</Label>
          <Input
            id="recurring"
            type="number"
            value={recurringInvestment || ''}
            onChange={(e) => setRecurringInvestment(Number(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frekvence pravidelné investice</Label>
          <Select value={recurringFrequency} onValueChange={(value: 'monthly' | 'yearly') => setRecurringFrequency(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Měsíčně</SelectItem>
              <SelectItem value="yearly">Ročně</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="return">Průměrný roční výnos (%)</Label>
          <Input
            id="return"
            type="number"
            step="0.1"
            value={averageReturn || ''}
            onChange={(e) => setAverageReturn(Number(e.target.value) || 0)}
            placeholder="7"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="period">Doba investice (roky)</Label>
          <Input
            id="period"
            type="number"
            value={investmentPeriod || ''}
            onChange={(e) => setInvestmentPeriod(Number(e.target.value) || 0)}
            placeholder="20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax">Daň z kapitálových výnosů (%)</Label>
          <Select value={taxRate.toString()} onValueChange={(value) => setTaxRate(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0% (žádná daň)</SelectItem>
              <SelectItem value="15">15% (základní sazba)</SelectItem>
              <SelectItem value="23">23% (vyšší sazba)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={onCalculate} className="w-full md:w-auto">
        Spočítat investici
      </Button>
    </div>
  );
};

export default InvestmentCalculatorForm;
