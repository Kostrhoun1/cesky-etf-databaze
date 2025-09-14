
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calculator, BookOpen } from 'lucide-react';

interface BenefitsSectionProps {
  totalCount: number;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ totalCount }) => {
  const displayCount = totalCount > 0 ? Math.floor(totalCount / 100) * 100 : 3500;
  
  const benefits = [
    {
      icon: BarChart,
      title: 'Detailní analýzy',
      description: 'Komplexní informace o výkonnosti, poplatcích a složení všech ETF fondů',
    },
    {
      icon: Calculator,
      title: 'Užitečné nástroje',
      description: 'Investiční kalkulačky, backtesting portfolia a analýza dopadů poplatků',
    },
    {
      icon: BookOpen,
      title: 'Vzdělávací obsah',
      description: 'Průvodci, články a tipy pro začínající i pokročilé investory',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Vše pro vaše investice
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Srovnáváme přes {displayCount.toLocaleString()}+ ETF a poskytujeme komplexní informace, nástroje a analýzy pro vaše investiční rozhodnutí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8">
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-violet-100 rounded-full">
                  <benefit.icon className="h-8 w-8 text-violet-600" />
                </div>
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
