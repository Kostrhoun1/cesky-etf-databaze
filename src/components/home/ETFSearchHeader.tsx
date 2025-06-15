
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ETFSearchHeaderProps {
  filteredCount: number;
  totalCount: number;
}

const ETFSearchHeader: React.FC<ETFSearchHeaderProps> = ({ filteredCount, totalCount }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Najděte nejlepší ETF fondy
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Prozkoumejte naši databázi ETF fondů s pokročilými filtry a detailními informacemi o výkonnosti
      </p>
    </div>
  );
};

export default ETFSearchHeader;
