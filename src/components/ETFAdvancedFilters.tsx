
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from 'lucide-react';
import { AdvancedFiltersState } from '@/hooks/useETFTableLogic';

interface ETFAdvancedFiltersProps {
  etfs: ETFListItem[];
  filters: AdvancedFiltersState;
  onFilterChange: (key: keyof AdvancedFiltersState, value: any) => void;
}

const ETFAdvancedFilters: React.FC<ETFAdvancedFiltersProps> = ({ etfs, filters, onFilterChange }) => {
  const uniqueIndexes = [...new Set(etfs.map(etf => etf.index_name).filter(Boolean))].sort();
  const uniqueCurrencies = [...new Set(etfs.map(etf => etf.fund_currency).filter(Boolean))].sort();
  const uniqueReplications = [...new Set(etfs.map(etf => etf.replication).filter(Boolean))].sort();
  
  const maxTerFromData = React.useMemo(() => Math.max(...etfs.map(etf => etf.ter_numeric || 0), 1), [etfs]);

  return (
    <Accordion type="single" collapsible defaultValue="advanced-filters" className="w-full bg-white rounded-lg border shadow-sm p-4">
      <AccordionItem value="advanced-filters" className="border-b-0">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline py-2">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <span>Pokročilé filtry</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6 pt-4">
            <div>
              <Label className="font-semibold">Typ fondu</Label>
              <RadioGroup
                value={filters.distributionPolicy}
                onValueChange={(value) => onFilterChange('distributionPolicy', value)}
                className="mt-2 space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="dist-all-adv" />
                  <Label htmlFor="dist-all-adv" className="font-normal">Všechny</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Accumulating" id="dist-acc-adv" />
                  <Label htmlFor="dist-acc-adv" className="font-normal">Akumulační</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Distributing" id="dist-dist-adv" />
                  <Label htmlFor="dist-dist-adv" className="font-normal">Distribuční</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="replication-filter-adv" className="font-semibold">Replikační metoda</Label>
              <Select
                value={filters.replicationMethod}
                onValueChange={(value) => onFilterChange('replicationMethod', value)}
              >
                <SelectTrigger id="replication-filter-adv" className="mt-2">
                  <SelectValue placeholder="Všechny metody" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všechny metody</SelectItem>
                  {uniqueReplications.map(replication => (
                    <SelectItem key={replication} value={replication}>{replication}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fund-size-filter-adv" className="font-semibold">Velikost fondu</Label>
              <Select
                value={filters.fundSizeRange}
                onValueChange={(value) => onFilterChange('fundSizeRange', value)}
              >
                <SelectTrigger id="fund-size-filter-adv" className="mt-2">
                  <SelectValue placeholder="Všechny velikosti" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všechny velikosti</SelectItem>
                  <SelectItem value="small">Malé (&lt; 100 mil.)</SelectItem>
                  <SelectItem value="medium">Střední (100 mil. - 1 mld.)</SelectItem>
                  <SelectItem value="large">Velké (1 - 10 mld.)</SelectItem>
                  <SelectItem value="xlarge">Velmi velké (&gt; 10 mld.)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="index-filter-adv" className="font-semibold">Sledovaný index</Label>
              <Select
                value={filters.indexName}
                onValueChange={(value) => onFilterChange('indexName', value)}
              >
                <SelectTrigger id="index-filter-adv" className="mt-2">
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
              <Label htmlFor="currency-filter-adv" className="font-semibold">Měna fondu</Label>
              <Select
                value={filters.fundCurrency}
                onValueChange={(value) => onFilterChange('fundCurrency', value)}
              >
                <SelectTrigger id="currency-filter-adv" className="mt-2">
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
              <Label htmlFor="ter-slider-adv" className="font-semibold">Max. TER (%): {filters.maxTer.toFixed(2)}</Label>
              <Slider
                id="ter-slider-adv"
                max={maxTerFromData}
                step={0.01}
                value={[filters.maxTer]}
                onValueChange={(value) => onFilterChange('maxTer', value[0])}
                className="mt-3"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ETFAdvancedFilters;
