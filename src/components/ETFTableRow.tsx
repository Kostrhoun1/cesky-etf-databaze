
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { ETFListItem } from '@/types/etf';
import { formatPercentage, formatTER, formatCurrency } from '@/utils/csvParser';
import { getReturnColor, getDistributionPolicyLabel } from '@/utils/etfFormatters';
import { Link } from 'react-router-dom';

interface ETFTableRowProps {
  etf: ETFListItem;
  onSelect?: () => void;
  isSelected?: boolean;
  canAddMore?: boolean;
  isLoading?: boolean;
}

const ETFTableRow: React.FC<ETFTableRowProps> = ({
  etf,
  onSelect,
  isSelected = false,
  canAddMore = true,
  isLoading = false,
}) => {
  const handleSelectClick = (checked: boolean) => {
    if (onSelect && !isLoading && (canAddMore || isSelected)) {
      onSelect();
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-start space-x-3">
          {onSelect && (
            <div className="flex items-center pt-1">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              ) : (
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={handleSelectClick}
                  disabled={!canAddMore && !isSelected}
                />
              )}
            </div>
          )}
          <div className="flex flex-col space-y-1 flex-1">
            <Link
              to={`/etf/${etf.isin}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {etf.name}
            </Link>
            <div className="text-xs text-gray-500">{etf.isin}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="outline" className="text-xs">
                {etf.fund_provider}
              </Badge>
              {etf.degiro_free && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  DEGIRO Free
                </Badge>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {etf.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
        {formatTER(etf.ter_numeric)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatCurrency(etf.fund_size_numeric, etf.fund_currency)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${getReturnColor(etf.return_ytd)}`}>
        {etf.return_ytd ? formatPercentage(etf.return_ytd) : '-'}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${getReturnColor(etf.return_1y)}`}>
        {etf.return_1y ? formatPercentage(etf.return_1y) : '-'}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${getReturnColor(etf.return_3y)}`}>
        {etf.return_3y ? formatPercentage(etf.return_3y) : '-'}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${getReturnColor(etf.return_5y)}`}>
        {etf.return_5y ? formatPercentage(etf.return_5y) : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {getDistributionPolicyLabel(etf.distribution_policy)}
      </td>
    </tr>
  );
};

export default ETFTableRow;
