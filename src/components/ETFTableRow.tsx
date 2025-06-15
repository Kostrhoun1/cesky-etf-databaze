
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ETFListItem } from '@/types/etf';
import { formatPercentage } from '@/utils/csvParser';

interface ETFTableRowProps {
  etf: ETFListItem;
}

const ETFTableRow: React.FC<ETFTableRowProps> = ({ etf }) => {
  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return '';
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div>
          <div className="font-medium">{etf.name}</div>
          <div className="text-sm text-muted-foreground">{etf.isin}</div>
          {etf.primary_ticker && (
            <div className="text-xs text-blue-600">{etf.primary_ticker}</div>
          )}
          {etf.degiro_free && (
            <div className="mt-1">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                DEGIRO Free
              </Badge>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right">
        {formatPercentage(etf.ter_numeric)}
      </TableCell>
      <TableCell className={`text-right ${getReturnColor(etf.return_ytd)}`}>
        {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
      </TableCell>
      <TableCell className={`text-right ${getReturnColor(etf.return_1y)}`}>
        {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
      </TableCell>
      <TableCell className={`text-right ${getReturnColor(etf.return_3y)}`}>
        {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
      </TableCell>
      <TableCell className={`text-right ${getReturnColor(etf.return_5y)}`}>
        {etf.return_5y ? formatPercentage(etf.return_5y) : '-'}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {etf.category}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {etf.index_name || '-'}
      </TableCell>
    </TableRow>
  );
};

export default ETFTableRow;
