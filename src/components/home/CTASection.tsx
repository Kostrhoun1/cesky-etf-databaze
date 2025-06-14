
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Začněte investovat ještě dnes
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Využijte naše nástroje a analýzy k vytvoření vašeho investičního portfolia
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/nastroje">Investiční kalkulačka</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/co-jsou-etf">Vzdělávací články</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
