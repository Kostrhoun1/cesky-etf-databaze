import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { ETFListItem } from '@/types/etf';
import { formatPercentage, formatTER } from '@/utils/csvParser';

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
    if (!value) return 'N/A';
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('cs-CZ').format(value);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('cs-CZ');
    } catch {
      return dateStr;
    }
  };

  const getDistributionPolicyLabel = (policy: string) => {
    if (policy === 'Accumulating') return 'Akumulační';
    if (policy === 'Distributing') return 'Distribuční';
    return policy || '-';
  };

  const getDistributionFrequencyLabel = (frequency: string) => {
    if (frequency === 'Quarterly') return 'Čtvrtletní';
    if (frequency === 'Annual') return 'Roční';
    if (frequency === 'Semi-Annual') return 'Půlroční';
    if (frequency === 'Monthly') return 'Měsíční';
    return frequency || '-';
  };

  const getReplicationLabel = (replication: string) => {
    if (replication === 'Physical') return 'Fyzická';
    if (replication === 'Synthetic') return 'Syntetická';
    if (replication === 'Optimized') return 'Optimalizovaná';
    return replication || '-';
  };

  const ComparisonTable = ({ title, data }: { title: string; data: Array<{ label: string; key: string; format?: (value: any, etf?: ETFListItem) => string; className?: string }> }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
              {data.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium">{row.label}</td>
                  {selectedETFs.map((etf) => {
                    const value = etf[row.key as keyof ETFListItem];
                    const formattedValue = row.format ? row.format(value, etf) : (value || '-');
                    return (
                      <td key={etf.isin} className={`p-3 ${row.className || ''}`}>
                        {formattedValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const basicInfoData = [
    { label: 'Poskytovatel', key: 'fund_provider' },
    { label: 'Kategorie', key: 'category' },
    { label: 'Sledovaný index', key: 'index_name' },
    { label: 'Typ fondu', key: 'distribution_policy', format: (value: string) => getDistributionPolicyLabel(value) },
    { label: 'Měna fondu', key: 'fund_currency' },
    { label: 'Ticker', key: 'primary_ticker', format: (value: string) => value ? value : '-' },
    { label: 'DEGIRO Free', key: 'degiro_free', format: (value: boolean) => value ? 'Ano' : 'Ne' },
  ];

  const feesAndSizeData = [
    { label: 'TER (roční poplatek)', key: 'ter_numeric', format: (value: number) => formatTER(value), className: 'font-mono' },
    { label: 'Velikost fondu', key: 'fund_size_numeric', format: (value: number, etf: ETFListItem) => formatCurrency(value, etf?.fund_currency), className: 'font-mono' },
  ];

  const performanceData = [
    { label: 'YTD výnos', key: 'return_ytd', format: (value: number) => formatPercentage(value), className: 'font-mono' },
    { label: 'Výnos 1 rok', key: 'return_1y', format: (value: number) => formatPercentage(value), className: 'font-mono' },
    { label: 'Výnos 3 roky', key: 'return_3y', format: (value: number) => formatPercentage(value), className: 'font-mono' },
    { label: 'Výnos 5 let', key: 'return_5y', format: (value: number) => formatPercentage(value), className: 'font-mono' },
  ];

  // For the full ETF data, we need to cast to access all properties
  const extendedETFs = selectedETFs as any[];

  const PerformanceMetricsTable = () => (
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
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.volatility_1y ? formatPercentage(etf.volatility_1y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Volatilita 3 roky</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.volatility_3y ? formatPercentage(etf.volatility_3y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Volatilita 5 let</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.volatility_5y ? formatPercentage(etf.volatility_5y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Max. pokles 1 rok</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.max_drawdown_1y)}`}>
                    {etf.max_drawdown_1y ? formatPercentage(etf.max_drawdown_1y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Max. pokles 3 roky</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.max_drawdown_3y)}`}>
                    {etf.max_drawdown_3y ? formatPercentage(etf.max_drawdown_3y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Max. pokles 5 let</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className={`p-3 font-mono ${getReturnColor(etf.max_drawdown_5y)}`}>
                    {etf.max_drawdown_5y ? formatPercentage(etf.max_drawdown_5y) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Beta</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.beta ? etf.beta.toFixed(2) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Korelace</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.correlation ? etf.correlation.toFixed(2) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Tracking Error</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3 font-mono">
                    {etf.tracking_error ? formatPercentage(etf.tracking_error) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Information Ratio</td>
                {extendedETFs.map((etf) => (
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

  const FundDetailsTable = () => (
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
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {etf.inception_date ? formatDate(etf.inception_date) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Domicil fondu</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.fund_domicile || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Frekvence dividend</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {getDistributionFrequencyLabel(etf.distribution_frequency)}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Typ replikace</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {getReplicationLabel(etf.replication)}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Právní struktura</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.legal_structure || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Investiční zaměření</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.investment_focus || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Udržitelnost</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.sustainability || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Celkem pozic</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">
                    {etf.total_holdings ? formatNumber(etf.total_holdings) : '-'}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Primární burza</td>
                {extendedETFs.map((etf) => (
                  <td key={etf.isin} className="p-3">{etf.primary_exchange || '-'}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Celkem burz</td>
                {extendedETFs.map((etf) => (
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

  const HoldingsTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 pozic v portfoliu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Pozice</th>
                {selectedETFs.map((etf) => (
                  <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                    {etf.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-medium">#{i}</td>
                  {extendedETFs.map((etf) => {
                    const holdingName = etf[`holding_${i}_name`];
                    const holdingWeight = etf[`holding_${i}_weight`];
                    return (
                      <td key={etf.isin} className="p-3">
                        {holdingName ? (
                          <div>
                            <div className="text-sm font-medium">{holdingName}</div>
                            {holdingWeight && (
                              <div className="text-xs text-gray-500">
                                {formatPercentage(holdingWeight)}
                              </div>
                            )}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const CountriesTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 zemí</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Pozice</th>
                {selectedETFs.map((etf) => (
                  <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                    {etf.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-medium">#{i}</td>
                  {extendedETFs.map((etf) => {
                    const countryName = etf[`country_${i}_name`];
                    const countryWeight = etf[`country_${i}_weight`];
                    return (
                      <td key={etf.isin} className="p-3">
                        {countryName ? (
                          <div>
                            <div className="text-sm font-medium">{countryName}</div>
                            {countryWeight && (
                              <div className="text-xs text-gray-500">
                                {formatPercentage(countryWeight)}
                              </div>
                            )}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const SectorsTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 sektorů</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Pozice</th>
                {selectedETFs.map((etf) => (
                  <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                    {etf.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-medium">#{i}</td>
                  {extendedETFs.map((etf) => {
                    const sectorName = etf[`sector_${i}_name`];
                    const sectorWeight = etf[`sector_${i}_weight`];
                    return (
                      <td key={etf.isin} className="p-3">
                        {sectorName ? (
                          <div>
                            <div className="text-sm font-medium">{sectorName}</div>
                            {sectorWeight && (
                              <div className="text-xs text-gray-500">
                                {formatPercentage(sectorWeight)}
                              </div>
                            )}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const ExchangesTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Obchodované burzy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Burza</th>
                {selectedETFs.map((etf) => (
                  <th key={etf.isin} className="text-left p-3 font-medium min-w-[200px]">
                    {etf.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-medium">Burza #{i}</td>
                  {extendedETFs.map((etf) => {
                    const exchangeName = etf[`exchange_${i}_name`];
                    const exchangeCurrency = etf[`exchange_${i}_currency`];
                    const exchangeTicker = etf[`exchange_${i}_ticker`];
                    const exchangeBloomberg = etf[`exchange_${i}_bloomberg`];
                    const exchangeReuters = etf[`exchange_${i}_reuters`];
                    
                    return (
                      <td key={etf.isin} className="p-3">
                        {exchangeName ? (
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{exchangeName}</div>
                            {exchangeCurrency && (
                              <div className="text-xs text-gray-500">Měna: {exchangeCurrency}</div>
                            )}
                            {exchangeTicker && (
                              <div className="text-xs text-blue-600">Ticker: {exchangeTicker}</div>
                            )}
                            {exchangeBloomberg && (
                              <div className="text-xs text-gray-500">Bloomberg: {exchangeBloomberg}</div>
                            )}
                            {exchangeReuters && (
                              <div className="text-xs text-gray-500">Reuters: {exchangeReuters}</div>
                            )}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

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
          Kompletní srovnání všech dostupných parametrů vybraných fondů
        </p>
      </div>

      <div className="space-y-6">
        <ComparisonTable title="Základní informace" data={basicInfoData} />
        <ComparisonTable title="Poplatky a velikost fondu" data={feesAndSizeData} />
        <ComparisonTable title="Výkonnost" data={performanceData} />
        <PerformanceMetricsTable />
        <FundDetailsTable />
        <HoldingsTable />
        <CountriesTable />
        <SectorsTable />
        <ExchangesTable />
      </div>
    </div>
  );
};

export default ETFDetailedComparison;
