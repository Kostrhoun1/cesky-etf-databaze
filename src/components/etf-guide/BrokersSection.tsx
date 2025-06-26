
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { brokers } from '@/data/whatAreETFsData';

const BrokersSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl mb-6 shadow-lg">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Kde koupit ETF?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Ověření brokeři pro české investory</p>
      </div>
      
      <Card className="bg-white border-0 shadow-xl">
        <CardContent className="p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            <strong>ETF fondy může dnes nakupovat téměř každý — stačí si založit účet u ověřeného brokera, který ETF nabízí.</strong> V Česku a v Evropě široce používají tyto platformy:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {brokers.map((broker, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${broker.color}`}>
                <h5 className="font-bold text-lg mb-2">{broker.name}</h5>
                <p className="text-gray-700">{broker.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <div className="bg-green-500 text-white rounded-lg p-2 mr-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-2">TIP</h4>
                <p className="text-green-800">
                  Porovnejte si nabídku brokerů podle poplatků a nabízených ETF v našem&nbsp;
                  <Link to="/srovnani-etf" className="text-green-700 hover:underline font-medium">srovnávači ETF i brokerů</Link>.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Je nákup ETF bezpečný?</h4>
              <p className="text-gray-700">
                Pokud používáte ověřeného a regulovaného brokera, vaše investice v ETF jsou vedeny na samostatném majetkovém účtu a zákon je chrání proti krachu brokera. Doporučujeme vybírat z výše uvedených možností.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Jaký broker je nejlepší?</h4>
              <p className="text-gray-700">
                Záleží na vašich preferencích (poplatky, nabídka ETF, čeština, uživatelské rozhraní). Většině začátečníků bude vyhovovat XTB, DEGIRO nebo Trading 212.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all">
          <Link to="/srovnani-etf">Porovnat ETF a brokery</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 font-bold transition-all">
          <Link to="/navod-pro-zacatecniky">Návod pro začátečníky</Link>
        </Button>
      </div>
    </div>
  );
};

export default BrokersSection;
