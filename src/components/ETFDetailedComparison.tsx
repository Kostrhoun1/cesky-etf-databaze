
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { ETFListItem } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';

interface ETFDetailedComparisonProps {
  selectedETFs: ETFListItem[];
  onBack: () => void;
}

const ETFDetailedComparison: React.FC<ETFDetailedComparisonProps> = ({
  selectedETFs,
  onBack,
}) => {
  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return '';
  };

  const formatCurrency = (value: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('cs-CZ').format(value);
  };

  const getDistributionPolicyLabel = (policy: string) => {
    if (policy === 'Accumulating') return 'Akumulační';
    if (policy === 'Distributing') return 'Distribuční';
    return policy || '-';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zpět na seznam
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          Detailní porovnání ETF fondů
        </h1>
        <p className="text-gray-600 mt-2">
          Srovnání všech klíčových parametrů vybraných fondů
        </p>
      </div>

      <div className="space-y-6">
        {/* Základní informace */}
        <Card>
          <CardHeader>
            <CardTitle>Základní informace</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Parametr</th>
                    {selectedETFs.map((etf) => (
                      <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{etf.name}</div>
                          <div className="text-xs text-gray-500">{etf.isin}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Poskytovatel</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">{etf.fund_provider}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Kategorie</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">{etf.category}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Sledovaný index</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">{etf.index_name || '-'}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Typ fondu</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">
                        <Badge variant="outline">
                          {getDistributionPolicyLabel(etf.distribution_policy)}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Měna fondu</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">{etf.fund_currency}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Ticker</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">
                        {etf.primary_ticker && (
                          <Badge variant="outline" className="text-blue-600">
                            {etf.primary_ticker}
                          </Badge>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">DEGIRO Free</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">
                        {etf.degiro_free ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Ano
                          </Badge>
                        ) : (
                          <Badge variant="outline">Ne</Badge>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Poplatky a velikost */}
        <Card>
          <CardHeader>
            <CardTitle>Poplatky a velikost fondu</CardTitle>
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
                    <td className="p-3 font-medium">TER (roční poplatek)</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3 font-mono">
                        {formatPercentage(etf.ter_numeric)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Velikost fondu</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className="p-3">
                        {etf.fund_size_numeric ? formatCurrency(etf.fund_size_numeric, etf.fund_currency) : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Výkonnost */}
        <Card>
          <CardHeader>
            <CardTitle>Výkonnost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Období</th>
                    {selectedETFs.map((etf) => (
                      <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                        {etf.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">YTD výnos</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.return_ytd)}`}>
                        {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Výnos 1 rok</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.return_1y)}`}>
                        {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Výnos 3 roky</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.return_3y)}`}>
                        {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Výnos 5 let</td>
                    {selectedETFs.map((etf) => (
                      <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.return_5y)}`}>
                        {etf.return_5y ? formatPercentage(etf.return_5y) : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ETFDetailedComparison;
