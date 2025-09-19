import React from 'react';
import { useTop5ETFsByYTD } from '@/hooks/useTop5ETFsByYTD';

const Top5ETFsDebug: React.FC = () => {
  const { topETFs, isLoading, error } = useTop5ETFsByYTD();

  if (isLoading) {
    return <div className="p-4">Loading top 5 ETFs by YTD...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top 5 akciových ETF podle YTD výnosu</h2>
      
      {topETFs.length === 0 ? (
        <p>No ETFs found</p>
      ) : (
        <div className="space-y-4">
          {topETFs.map((etf, index) => (
            <div key={etf.isin} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    #{index + 1}: {etf.name}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Ticker:</strong> {etf.primary_ticker} | 
                    <strong> ISIN:</strong> {etf.isin}
                  </p>
                  <p className="text-gray-600">
                    <strong>Provider:</strong> {etf.fund_provider} | 
                    <strong> Category:</strong> {etf.category}
                  </p>
                  <p className="text-gray-600">
                    <strong>Fund Size:</strong> {etf.fund_size_numeric}M EUR | 
                    <strong> TER:</strong> {etf.ter_numeric}%
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    +{etf.return_ytd}%
                  </div>
                  <div className="text-sm text-gray-500">YTD Return</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Top5ETFsDebug;