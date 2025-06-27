
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const ETFHeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-violet-50 via-white to-green-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      <div className="relative text-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <TrendingUp className="w-4 h-4 mr-2" />
          Komplexní průvodce investováním
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight animate-fade-in">
          Co jsou <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">ETF fondy?</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Váš detailní a srozumitelný průvodce světem burzovně obchodovaných fondů (ETF) pro české investory.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-violet-200 text-violet-700 hover:bg-violet-50 px-8 py-4 text-lg font-semibold">
            <Link to="/navod-pro-zacatecniky">Jak začít investovat</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ETFHeroSection;
