import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const ETFCTASection: React.FC = () => {
  return (
    <div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white card-hover animate-fade-in [animation-delay:0.2s] overflow-hidden relative">
      <div className="relative p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center justify-center rounded-full bg-white/20 w-12 h-12 group-hover:bg-white/30 transition-colors hover-scale">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
            Začněte investovat ještě dnes
          </div>
        </div>
        <h3 className="text-4xl font-bold mb-6">
          Začněte investovat do ETF ještě dnes
        </h3>
        <p className="text-white opacity-90 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          Máte vše potřebné znalosti o ETF fondech. Nyní si vyberte nejlepší ETF pro svou situaci 
          a začněte budovat svůj investiční portfolio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="hover-scale bg-white text-emerald-600 hover:bg-gray-50 font-bold px-8 py-4 text-lg">
            <Link to="/srovnani-etf">Srovnat nejlepší ETF fondy</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="hover-scale border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold px-8 py-4 text-lg">
            <Link to="/kalkulacky/fee-calculator">Kalkulace poplatků ETF</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="hover-scale border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold px-8 py-4 text-lg">
            <Link to="/kalkulacky">Investiční kalkulačky</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ETFCTASection;