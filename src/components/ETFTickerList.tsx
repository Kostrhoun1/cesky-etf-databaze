import React from 'react';
import ETFTicker from './ETFTicker';
import { getETFIsin } from '@/utils/etfTickerMapping';

interface ETFTickerListProps {
  tickers: string[];
  separator?: string;
  className?: string;
}

const ETFTickerList: React.FC<ETFTickerListProps> = ({ 
  tickers, 
  separator = ', ', 
  className = '' 
}) => {
  return (
    <span className={className}>
      {tickers.map((ticker, index) => (
        <React.Fragment key={ticker}>
          <ETFTicker ticker={ticker} isin={getETFIsin(ticker)} />
          {index < tickers.length - 1 && separator}
        </React.Fragment>
      ))}
    </span>
  );
};

export default ETFTickerList;