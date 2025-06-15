
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ETF } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';
import { getReturnColor } from '@/utils/etfFormatters';

interface ETFPerformanceMetricsTableProps {
  selectedETFs: ETF[];
}

const ETFPerformanceMetricsTable: React.FC<ETFPerformanceMetricsTableProps> = ({
  selectedETFs,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pokročilé metriky výkonnosti</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Metrika</th>
                {selectedETFs.map((etf) => (
                  <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                    {etf.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">Volatilita 1 rok</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.volatility_1y ? formatPercentage(etf.volatility_1y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Volatilita 3 roky</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.volatility_3y ? formatPercentage(etf.volatility_3y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Volatilita 5 let</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.volatility_5y ? formatPercentage(etf.volatility_5y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Max. pokles 1 rok</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.max_drawdown_1y)}`}>
                    {etf.max_drawdown_1y ? formatPercentage(etf.max_drawdown_1y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Max. pokles 3 roky</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.max_drawdown_3y)}`}>
                    {etf.max_drawdown_3y ? formatPercentage(etf.max_drawdown_3y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Max. pokles 5 let</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.max_drawdown_5y)}`}>
                    {etf.max_drawdown_5y ? formatPercentage(etf.max_drawdown_5y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Beta</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.beta ? etf.beta.toFixed(2) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Korelace</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.correlation ? etf.correlation.toFixed(2) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Tracking Error</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.tracking_error ? formatPercentage(etf.tracking_error) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Information Ratio</td>
                {selectedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.information_ratio ? etf.information_ratio.toFixed(2) : '-'}
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

export default ETFPerformanceMetricsTable;
