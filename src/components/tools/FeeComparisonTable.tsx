
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface FeeScenario {
  name: string;
  totalExpenseRatio: number;
  brokerFee: number;
  color: string;
}

interface FeeCalculationResult {
  scenario: FeeScenario;
  year: number;
  grossValue: number;
  netValue: number;
  totalFees: number;
  feeImpact: number;
}

interface FeeComparisonTableProps {
  data: FeeCalculationResult[];
  investmentPeriod: number;
}

const FeeComparisonTable: React.FC<FeeComparisonTableProps> = ({ data, investmentPeriod }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(num);
  };

  // Získej finální výsledky pro každý scénář
  const finalResults = data.filter(result => result.year === investmentPeriod);

  // Najdi nejlepší scénář (s nejvyšší konečnou hodnotou)
  const bestScenario = finalResults.reduce((best, current) => 
    current.netValue > best.netValue ? current : best
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Srovnání dopadů poplatků po {investmentPeriod} letech</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scénář</TableHead>
                <TableHead className="text-right">TER (%)</TableHead>
                <TableHead className="text-right">Konečná hodnota (Kč)</TableHead>
                <TableHead className="text-right">Celkové poplatky (Kč)</TableHead>
                <TableHead className="text-right">Ztráta oproti nejlepšímu (Kč)</TableHead>
                <TableHead className="text-right">Ztráta oproti nejlepšímu (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalResults.map((result) => {
                const lossVsBest = bestScenario.netValue - result.netValue;
                const lossPercentage = (lossVsBest / bestScenario.netValue) * 100;
                
                return (
                  <TableRow key={result.scenario.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: result.scenario.color }}
                        />
                        {result.scenario.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {result.scenario.totalExpenseRatio}%
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatNumber(result.netValue)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatNumber(result.totalFees)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {lossVsBest > 0 ? formatNumber(lossVsBest) : '-'}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {lossVsBest > 0 ? `${lossPercentage.toFixed(1)}%` : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Klíčové pozorování:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Rozdíl pouhých několika desetin procenta v TER může znamenat tisíce korun během let</li>
            <li>• Compound effect zpomaluje váš růst každý rok</li>
            <li>• Při výběru investic vždy zohledněte poplatky vedle výkonnosti</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeComparisonTable;
