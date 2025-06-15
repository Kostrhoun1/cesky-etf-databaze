
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ETFListItem } from '@/types/etf';
import { formatPercentage, formatNumber } from '@/utils/csvParser';
import { Loader2 } from 'lucide-react';

interface ETFTableRowProps {
  etf: ETFListItem;
  onSelect?: () => void;
  isSelected: boolean;
  canAddMore: boolean;
  isLoading?: boolean;
}

const ETFTableRow: React.FC<ETFTableRowProps> = ({
  etf,
  onSelect,
  isSelected,
  canAddMore,
  isLoading = false,
}) => {
  const formatFundSize = (sizeInMillions: number | null) => {
    if (!sizeInMillions) return 'N/A';
    return formatNumber(sizeInMillions);
  };

  const getReturnColor = (value: number | null) => {
    if (!value) return '';
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return '';
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{etf.name}</div>
            <div className="text-sm text-gray-500">{etf.isin}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{etf.fund_provider}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {etf.ter_numeric ? formatPercentage(etf.ter_numeric) : 'N/A'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {formatFundSize(etf.fund_size_numeric)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`text-sm font-medium ${getReturnColor(etf.return_1y)}`}>
          {etf.return_1y ? formatPercentage(etf.return_1y) : 'N/A'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {onSelect && (
          <Button
            variant={isSelected ? "secondary" : "outline"}
            size="sm"
            onClick={onSelect}
            disabled={isSelected || (!canAddMore && !isSelected) || isLoading}
            className="ml-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSelected ? (
              'Vybráno'
            ) : (
              'Porovnat'
            )}
          </Button>
        )}
        {!onSelect && (
          <Badge variant="outline">Detail</Badge>
        )}
      </td>
    </tr>
  );
};

export default ETFTableRow;
