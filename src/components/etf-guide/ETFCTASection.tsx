
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const ETFCTASection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl text-white shadow-2xl animate-fade-in overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative p-12 text-center">
        <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <TrendingUp className="w-4 h-4 mr-2" />
          Začněte investovat ještě dnes
        </div>
        <h3 className="text-4xl font-bold mb-6">
          Připraveni vybrat své první ETF?
        </h3>
        <p className="text-violet-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          Použijte náš podrobný srovnávač a filtrujte ETF podle vašich kritérií. Najděte ten pravý fond pro vaši investiční strategii během několika minut.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-violet-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold px-8 py-4 text-lg transition-all hover:scale-105">
            <Link to="/navod-pro-zacatecniky">Návod pro začátečníky</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ETFCTASection;
