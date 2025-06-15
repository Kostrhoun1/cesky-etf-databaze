
import React from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { ETFListItem } from '@/types/etf';
import { formatPercentage, formatTER } from '@/utils/csvParser';

interface ETFTableRowProps {
  etf: ETFListItem;
  onSelectETF?: (etf: ETFListItem) => boolean;
  isETFSelected?: (isin: string) => boolean;
  canAddMore?: boolean;
}

const ETFTableRow: React.FC<ETFTableRowProps> = ({ 
  etf,
  onSelectETF,
  isETFSelected,
  canAddMore = true
}) => {
  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return '';
  };

  const getDistributionPolicyLabel = (policy: string) => {
    if (policy === 'Accumulating') return 'Akumulační';
    if (policy === 'Distributing') return 'Distribuční';
    return policy || '-';
  };

  const handleSelectETF = () => {
    if (onSelectETF) {
      onSelectETF(etf);
    }
  };

  return (
    <TableRow className="hover:bg-gray-50">
      {onSelectETF && (
        <TableCell className="w-12">
          <div className="flex items-center">
            {isETFSelected && isETFSelected(etf.isin) ? (
              <Checkbox checked={true} disabled />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectETF}
                disabled={!canAddMore}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TableCell>
      )}
      <TableCell>
        <div>
          <div className="font-medium">
            <Link 
              to={`/etf/${etf.isin}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {etf.name}
            </Link>
          </div>
          <div className="text-sm text-gray-500">{etf.isin}</div>
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
        {formatTER(etf.ter_numeric)}
      </TableCell>
      <TableCell className={`text-right ${getReturnColor(etf.return_ytd)}`}>
        {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
      </TableCell>
      <TableCell className={`text-right ${getReturnColor(etf.return_1y)}`}>
        {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {getDistributionPolicyLabel(etf.distribution_policy)}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-gray-600">
        {etf.index_name || '-'}
      </TableCell>
    </TableRow>
  );
};

export default ETFTableRow;
