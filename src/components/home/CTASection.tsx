
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-violet-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">
          Jste připraveni začít?
        </h2>
        <p className="text-lg text-violet-200 mb-8 max-w-2xl mx-auto">
          Využijte naše nástroje a srovnání k vytvoření vašeho ideálního investičního portfolia ještě dnes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="bg-white text-violet-700 hover:bg-violet-50 font-semibold">
            <Link to="/srovnani-etf">Srovnat ETF fondy</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white">
            <Link to="/co-jsou-etf">Zjistit více o ETF</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
