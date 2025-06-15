
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ETF } from '@/types/etf';
import { 
  formatDate, 
  formatNumber, 
  getDistributionFrequencyLabel, 
  getReplicationLabel 
} from '@/utils/etfFormatters';

interface ETFFundDetailsTableProps {
  selectedETFs: ETF[];
}

const ETFFundDetailsTable: React.FC<ETFFundDetailsTableProps> = ({
  selectedETFs,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailní informace o fondu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Parametr</th>
                {selectedETFs.map((etf) => (
                  <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                    {etf.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">Datum vzniku</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {etf.inception_date ? formatDate(etf.inception_date) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Domicil fondu</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.fund_domicile || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Frekvence dividend</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {getDistributionFrequencyLabel(etf.distribution_frequency)}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Typ replikace</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {getReplicationLabel(etf.replication)}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Právní struktura</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.legal_structure || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Investiční zaměření</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.investment_focus || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Udržitelnost</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.sustainability || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Celkem pozic</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {etf.total_holdings ? formatNumber(etf.total_holdings) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Primární burza</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.primary_exchange || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Celkem burz</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {etf.total_exchanges ? formatNumber(etf.total_exchanges) : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ETFFundDetailsTable;
