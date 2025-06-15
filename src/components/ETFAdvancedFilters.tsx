
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdvancedFilters {
  distributionPolicy: string;
  indexName: string;
  fundCurrency: string;
  maxTer: number;
}

interface ETFAdvancedFiltersProps {
  etfs: ETFListItem[];
  filters: AdvancedFilters;
  onFilterChange: (filters: AdvancedFilters) => void;
}

const ETFAdvancedFilters: React.FC<ETFAdvancedFiltersProps> = ({ etfs, filters, onFilterChange }) => {
  const uniqueIndexes = [...new Set(etfs.map(etf => etf.index_name).filter(Boolean))].sort();
  const uniqueCurrencies = [...new Set(etfs.map(etf => etf.fund_currency).filter(Boolean))].sort();
  
  const maxTerFromData = React.useMemo(() => Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1), [etfs]);

  const handleFilterChange = (key: keyof AdvancedFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pokročilé filtry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="font-semibold">Typ fondu</Label>
          <RadioGroup
            value={filters.distributionPolicy}
            onValueChange={(value) => handleFilterChange('distributionPolicy', value)}
            className="mt-2 space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="dist-all" />
              <Label htmlFor="dist-all" className="font-normal">Všechny</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Accumulating" id="dist-acc" />
              <Label htmlFor="dist-acc" className="font-normal">Akumulační</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Distributing" id="dist-dist" />
              <Label htmlFor="dist-dist" className="font-normal">Distribuční</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="index-filter" className="font-semibold">Sledovaný index</Label>
          <Select
            value={filters.indexName}
            onValueChange={(value) => handleFilterChange('indexName', value)}
          >
            <SelectTrigger id="index-filter" className="mt-2">
              <SelectValue placeholder="Všechny indexy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny indexy</SelectItem>
              {uniqueIndexes.map(index => (
                <SelectItem key={index} value={index}>{index}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="currency-filter" className="font-semibold">Měna fondu</Label>
          <Select
            value={filters.fundCurrency}
            onValueChange={(value) => handleFilterChange('fundCurrency', value)}
          >
            <SelectTrigger id="currency-filter" className="mt-2">
              <SelectValue placeholder="Všechny měny" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny měny</SelectItem>
              {uniqueCurrencies.map(currency => (
                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ter-slider" className="font-semibold">Max. TER (%): {filters.maxTer.toFixed(2)}</Label>
          <Slider
            id="ter-slider"
            max={maxTerFromData}
            step={0.01}
            value={[filters.maxTer]}
            onValueChange={(value) => handleFilterChange('maxTer', value[0])}
            className="mt-3"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ETFAdvancedFilters;
