
import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-700 rounded-lg">
          <TrendingUp className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">CzechETF</h1>
          <p className="text-blue-100">Databáze ETF fondů pro české investory</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-blue-200" />
            <h3 className="font-semibold">Kompletní databáze</h3>
          </div>
          <p className="text-blue-100 text-sm">
            Přehled všech dostupných ETF fondů s detailními informacemi
          </p>
        </div>
        
        <div className="bg-blue-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-200" />
            <h3 className="font-semibold">Výkonnostní analýzy</h3>
          </div>
          <p className="text-blue-100 text-sm">
            Porovnání výnosů, volatility a dalších klíčových metrik
          </p>
        </div>
        
        <div className="bg-blue-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-blue-200" />
            <h3 className="font-semibold">České prostředí</h3>
          </div>
          <p className="text-blue-100 text-sm">
            Specializováno pro české investory s lokalizovaným obsahem
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
