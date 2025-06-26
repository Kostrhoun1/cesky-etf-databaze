
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, CheckCircle, XCircle } from 'lucide-react';
import { etfAdvantages, etfDisadvantages } from '@/data/whatAreETFsData';
import ChartFeeImpact from "@/components/ChartFeeImpact";

const ETFProsAndConsSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl mb-6 shadow-lg">
          <BarChart className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Výhody a nevýhody ETF</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Objektivní pohled na investování do ETF fondů</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl hover:shadow-2xl transition-all">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl text-green-800">
              <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              Výhody
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {etfAdvantages.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-green-900">{item.title}:</span>
                  <span className="text-green-800 ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-xl hover:shadow-2xl transition-all">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl text-red-800">
              <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              Nevýhody
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {etfDisadvantages.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-red-900">{item.title}:</span>
                  <span className="text-red-800 ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <ChartFeeImpact />
    </div>
  );
};

export default ETFProsAndConsSection;
