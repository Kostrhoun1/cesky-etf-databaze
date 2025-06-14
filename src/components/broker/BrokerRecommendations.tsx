
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText } from 'lucide-react';

const BrokerRecommendations: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Doporučení podle profilu investora
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">💰 Pasivní investoři s menším kapitálem</h3>
            <p className="text-gray-700 mb-3">
              Pro investory s pravidelnými menšími vklady (DCA strategie) jsou klíčové nízké poplatky a podpora frakčních ETF.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                <strong>Trading 212</strong> - 0% poplatky, frakční ETF
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">2. volba</Badge>
                <strong>XTB</strong> - 0% do 100k EUR/měsíc, česká podpora
              </div>
            </div>
          </div>

          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">💎 Investoři s větším kapitálem</h3>
            <p className="text-gray-700 mb-3">
              Pro větší investice jsou důležité nízké procentuální poplatky a široká nabídka ETF.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                <strong>DEGIRO</strong> - velmi nízké poplatky, široká nabídka
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">2. volba</Badge>
                <strong>Interactive Brokers</strong> - nejširší nabídka, pokročilé nástroje
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">🇨🇿 Preferující české dividendy</h3>
            <p className="text-gray-700 mb-3">
              Pro investory do českých akcií je klíčové optimální zdanění dividend.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                <strong>Fio e-Broker</strong> - 15% zdanění CZ dividend
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">2. volba</Badge>
                <strong>Interactive Brokers</strong> - 15% zdanění CZ dividend
              </div>
            </div>
          </div>

          <div className="p-6 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">📈 Pokročilí investoři a tradeři</h3>
            <p className="text-gray-700 mb-3">
              Pro zkušené uživatele jsou důležité pokročilé nástroje a široká nabídka trhů.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">1. volba</Badge>
                <strong>Interactive Brokers</strong> - TWS platforma, široká nabídka
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">2. volba</Badge>
                <strong>XTB</strong> - xStation 5, vzdělávací materiály
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <FileText className="w-6 h-6" />
            Důležité upozornění
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-800">
            Při finálním rozhodování si pečlivě prostudujte aktuální sazebníky poplatků a podmínky vybraného brokera. 
            Daňové implikace konzultujte s daňovým poradcem pro zajištění správného plnění daňových povinností v České republice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrokerRecommendations;
