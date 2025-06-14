
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
        <div className="flex flex-col items-center text-center">
          <Logo size={80} className="mb-6 drop-shadow-lg animate-fade-in" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight animate-fade-in [animation-delay:0.2s]">
            ETF průvodce.cz
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 animate-fade-in [animation-delay:0.4s] max-w-3xl">
            Váš moderní a komplexní průvodce světem ETF fondů pro české investory
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.6s]">
            <Button asChild size="lg" className="hover-scale bg-violet-600 hover:bg-violet-700 text-white">
              <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white hover-scale">
              <Link to="/co-jsou-etf">Co jsou ETF?</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
