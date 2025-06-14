
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calculator, BookOpen } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Proč ETF průvodce.cz?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Poskytujeme komplexní informace, nástroje a analýzy pro informovaná investiční rozhodnutí
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <BarChart className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Detailní analýzy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Komplexní informace o výkonnosti, poplatcích a složení všech ETF fondů
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Užitečné nástroje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Investiční kalkulačky, backtesting portfolia a analýza dopadů poplatků
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Vzdělávací obsah</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Průvodci, články a tipy pro začínající i pokročilé investory
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
