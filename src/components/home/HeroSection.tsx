
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          <Logo size={70} className="mb-6 drop-shadow-lg animate-fade-in" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-playfair tracking-tight animate-fade-in">
            ETF průvodce.cz
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
            Komplexní průvodce světem ETF fondů pro české investory
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="hover-scale">
              <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 hover-scale">
              <Link to="/co-jsou-etf">Co jsou ETF?</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
