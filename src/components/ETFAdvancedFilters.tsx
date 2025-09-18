
import React from 'react';
import { ETFListItem } from '@/types/etf';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, X } from 'lucide-react';
import { AdvancedFiltersState, AdvancedFilterValue } from '@/hooks/useETFTableLogic';

interface ETFAdvancedFiltersProps {
  etfs: ETFListItem[];
  filters: AdvancedFiltersState;
  onFilterChange: (key: keyof AdvancedFiltersState, value: AdvancedFilterValue) => void;
  ranges: {
    ter: { min: number; max: number };
    fundSize: { min: number; max: number };
    dividendYield: { min: number; max: number };
  };
}

const ETFAdvancedFilters: React.FC<ETFAdvancedFiltersProps> = ({ etfs, filters, onFilterChange, ranges }) => {
  const uniqueIndexes = [...new Set(etfs.map(etf => etf.index_name).filter(Boolean))].sort();
  const uniqueCurrencies = [...new Set(etfs.map(etf => etf.fund_currency).filter(Boolean))].sort();
  const uniqueReplications = [...new Set(etfs.map(etf => etf.replication).filter(Boolean))].sort();
  const uniqueRegions = [...new Set(etfs.map(etf => etf.region).filter(Boolean))].sort();
  

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.distributionPolicy !== 'all') count++;
    if (filters.replicationMethod !== 'all') count++;
    if (filters.fundSizeRange !== 'all') count++;
    if (filters.region !== 'all') count++;
    if (filters.indexName !== 'all') count++;
    if (filters.fundCurrency !== 'all') count++;
    if (filters.minRating > 0) count++;
    if (filters.maxTer < ranges.ter.max) count++;
    if (filters.terRange[0] > ranges.ter.min || filters.terRange[1] < ranges.ter.max) count++;
    if (filters.fundSizeRangeValues[0] > ranges.fundSize.min || filters.fundSizeRangeValues[1] < ranges.fundSize.max) count++;
    if (filters.dividendYieldRange[0] > ranges.dividendYield.min || filters.dividendYieldRange[1] < ranges.dividendYield.max) count++;
    if (filters.includeLeveragedETFs) count++;
    return count;
  };

  const clearAllFilters = () => {
    onFilterChange('distributionPolicy', 'all');
    onFilterChange('replicationMethod', 'all');
    onFilterChange('fundSizeRange', 'all');
    onFilterChange('region', 'all');
    onFilterChange('indexName', 'all');
    onFilterChange('fundCurrency', 'all');
    onFilterChange('minRating', 0);
    onFilterChange('maxTer', ranges.ter.max);
    onFilterChange('terRange', [ranges.ter.min, ranges.ter.max]);
    onFilterChange('fundSizeRangeValues', [ranges.fundSize.min, ranges.fundSize.max]);
    onFilterChange('dividendYieldRange', [ranges.dividendYield.min, ranges.dividendYield.max]);
    onFilterChange('includeLeveragedETFs', false);
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Accordion type="single" collapsible defaultValue="advanced-filters" className="w-full bg-white rounded-lg border shadow-sm p-4">
      <AccordionItem value="advanced-filters" className="border-b-0">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline py-2">
          <div className="flex items-center justify-between w-full mr-2">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span>Pokročilé filtry</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="bg-violet-100 text-violet-700">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAllFilters();
                }}
                className="h-6 px-2 text-xs hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3 w-3 mr-1" />
                Vymazat vše
              </Button>
            )}
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
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="leveraged-etf-toggle" className="font-semibold">Zobrazit páková ETF</Label>
                  <div className="text-sm text-gray-500">
                    Páková ETF jsou rizikovější produkty s násobnou expozicí
                  </div>
                </div>
                <Switch
                  id="leveraged-etf-toggle"
                  checked={filters.includeLeveragedETFs}
                  onCheckedChange={(checked) => onFilterChange('includeLeveragedETFs', checked)}
                />
              </div>
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
              <Label htmlFor="region-filter-adv" className="font-semibold">Region</Label>
              <Select
                value={filters.region}
                onValueChange={(value) => onFilterChange('region', value)}
              >
                <SelectTrigger id="region-filter-adv" className="mt-2">
                  <SelectValue placeholder="Všechny regiony" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všechny regiony</SelectItem>
                  {uniqueRegions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
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
              <Label htmlFor="rating-filter-adv" className="font-semibold">Minimální hodnocení</Label>
              <Select
                value={filters.minRating.toString()}
                onValueChange={(value) => onFilterChange('minRating', parseInt(value))}
              >
                <SelectTrigger id="rating-filter-adv" className="mt-2">
                  <SelectValue placeholder="Všechna hodnocení" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Všechna hodnocení</SelectItem>
                  <SelectItem value="1">⭐ 1+ hvězdičky</SelectItem>
                  <SelectItem value="2">⭐⭐ 2+ hvězdičky</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ 3+ hvězdičky</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ 4+ hvězdičky</SelectItem>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ 5 hvězdiček</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-semibold flex items-center gap-2">
                TER rozsah (%)
                <span className="text-sm font-normal text-gray-500">
                  {filters.terRange[0] > ranges.ter.min || filters.terRange[1] < ranges.ter.max ? (
                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                      {filters.terRange[0].toFixed(2)}% - {filters.terRange[1].toFixed(2)}%
                    </Badge>
                  ) : (
                    'Bez omezení'
                  )}
                </span>
              </Label>
              <DualRangeSlider
                min={ranges.ter.min}
                max={ranges.ter.max}
                step={0.01}
                value={filters.terRange}
                onValueChange={(value) => onFilterChange('terRange', value)}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{ranges.ter.min}%</span>
                <span>{ranges.ter.max.toFixed(2)}%</span>
              </div>
            </div>

            <div>
              <Label className="font-semibold flex items-center gap-2">
                Velikost fondu (mil. €)
                <span className="text-sm font-normal text-gray-500">
                  {filters.fundSizeRangeValues[0] > ranges.fundSize.min || filters.fundSizeRangeValues[1] < ranges.fundSize.max ? (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {filters.fundSizeRangeValues[0].toLocaleString()} - {filters.fundSizeRangeValues[1].toLocaleString()} mil.
                    </Badge>
                  ) : (
                    'Bez omezení'
                  )}
                </span>
              </Label>
              <DualRangeSlider
                min={ranges.fundSize.min}
                max={ranges.fundSize.max}
                step={10}
                value={filters.fundSizeRangeValues}
                onValueChange={(value) => onFilterChange('fundSizeRangeValues', value)}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{ranges.fundSize.min} mil.</span>
                <span>{Math.round(ranges.fundSize.max).toLocaleString()} mil.</span>
              </div>
            </div>

            <div>
              <Label className="font-semibold flex items-center gap-2">
                Dividendový výnos (%)
                <span className="text-sm font-normal text-gray-500">
                  {filters.dividendYieldRange[0] > ranges.dividendYield.min || filters.dividendYieldRange[1] < ranges.dividendYield.max ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {filters.dividendYieldRange[0].toFixed(1)}% - {filters.dividendYieldRange[1].toFixed(1)}%
                    </Badge>
                  ) : (
                    'Bez omezení'
                  )}
                </span>
              </Label>
              <DualRangeSlider
                min={ranges.dividendYield.min}
                max={ranges.dividendYield.max}
                step={0.1}
                value={filters.dividendYieldRange}
                onValueChange={(value) => onFilterChange('dividendYieldRange', value)}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{ranges.dividendYield.min}%</span>
                <span>{ranges.dividendYield.max.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ETFAdvancedFilters;
