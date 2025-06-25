
import React from 'react';
import { Button } from '@/components/ui/button';

interface ETFComparisonHeaderProps {
  selectedCount: number;
  onShowDetailedComparison: () => void;
  onClearAll: () => void;
}

const ETFComparisonHeader: React.FC<ETFComparisonHeaderProps> = ({ 
  selectedCount, 
  onShowDetailedComparison, 
  onClearAll 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Srovnání ETF fondů
        </h1>
        <p className="text-gray-600 mt-1">
          Vyberte až 3 fondy pro detailní porovnání
        </p>
      </div>
      
      <div className="flex gap-3">
        {selectedCount > 0 && (
          <>
            <Button variant="outline" onClick={onClearAll}>
              Vymazat výběr ({selectedCount})
            </Button>
            {selectedCount >= 2 && (
              <Button onClick={onShowDetailedComparison}>
                Porovnat vybrané fondy
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ETFComparisonHeader;
