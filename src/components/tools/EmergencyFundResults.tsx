import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, Clock, Shield, Banknote, TrendingUp } from 'lucide-react';
import { EmergencyFundData } from '@/utils/emergencyFundCalculations';

interface EmergencyFundResultsProps {
  results: EmergencyFundData;
}

const EmergencyFundResults: React.FC<EmergencyFundResultsProps> = ({ results }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityStatus = () => {
    switch (results.recommendations.priorityLevel) {
      case 'critical':
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          text: "Kritická priorita",
          color: "bg-red-50 border-red-200",
          textColor: "text-red-800",
          description: "Nouzová rezerva je kriticky nízká. Okamžitě začněte spořit!"
        };
      case 'high':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
          text: "Vysoká priorita",
          color: "bg-orange-50 border-orange-200",
          textColor: "text-orange-800",
          description: "Vaše rezerva pokryje základní potřeby, ale měla by být vyšší."
        };
      case 'moderate':
        return {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          text: "Střední priorita",
          color: "bg-yellow-50 border-yellow-200",
          textColor: "text-yellow-800",
          description: "Jste na dobré cestě. Dokončete budování optimální rezervy."
        };
      case 'sufficient':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          text: "Dostatečná rezerva",
          color: "bg-green-50 border-green-200",
          textColor: "text-green-800",
          description: "Gratulujeme! Máte dobře budovanou nouzovou rezervu."
        };
    }
  };

  const priorityStatus = getPriorityStatus();
  const progressPercentage = Math.min(100, (results.currentCoverage / results.recommendedMonths) * 100);

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hlavní výsledek */}
      <Card className={`${priorityStatus.color} border-2`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {priorityStatus.icon}
            <div>
              <CardTitle className={`text-xl ${priorityStatus.textColor}`}>
                {priorityStatus.text}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{priorityStatus.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Doporučená rezerva</p>
              <p className="text-3xl font-bold">{formatCurrency(results.recommendedAmount)}</p>
              <p className="text-sm text-gray-500">
                {results.recommendedMonths.toFixed(1)} měsíců výdajů
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Současné pokrytí</p>
              <div className="flex items-center gap-3 mb-2">
                <Progress value={progressPercentage} className="flex-1" />
                <span className="text-sm font-medium">{progressPercentage.toFixed(0)}%</span>
              </div>
              <p className="text-lg font-semibold">
                {results.currentCoverage.toFixed(1)} měsíců pokryto
              </p>
              {results.shortfall > 0 && (
                <p className="text-sm text-red-600">
                  Chybí: {formatCurrency(results.shortfall)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailní rozpis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Rozpis doporučení
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.breakdown.baseAmount)}</p>
              <p className="text-xs text-gray-600">Základní částka</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">+{formatCurrency(results.breakdown.riskAdjustment)}</p>
              <p className="text-xs text-gray-600">Rizikové úpravy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">+{formatCurrency(results.breakdown.familyAdjustment)}</p>
              <p className="text-xs text-gray-600">Rodinná úprava</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(results.breakdown.finalAmount)}</p>
              <p className="text-xs text-gray-600">Celková rezerva</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={getRiskBadgeVariant(results.riskLevel)}>
              Rizikový profil: {results.riskLevel === 'low' ? 'Nízký' : results.riskLevel === 'medium' ? 'Střední' : 'Vysoký'}
            </Badge>
            {results.monthsToTarget > 0 && (
              <p className="text-sm text-gray-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Dosažení cíle za {results.monthsToTarget} měsíců
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Strategie spoření */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Strategie budování rezervy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <h4 className="font-semibold">Nouzová základna</h4>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  {formatCurrency(results.recommendations.savingStrategy.phase1.target)}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  {results.recommendations.savingStrategy.phase1.description}
                </p>
                <p className="text-xs text-gray-600">
                  ⏱️ {results.recommendations.savingStrategy.phase1.timeline}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <h4 className="font-semibold">Základní rezerva</h4>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  {formatCurrency(results.recommendations.savingStrategy.phase2.target)}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  {results.recommendations.savingStrategy.phase2.description}
                </p>
                <p className="text-xs text-gray-600">
                  ⏱️ {results.recommendations.savingStrategy.phase2.timeline}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  <h4 className="font-semibold">Plná rezerva</h4>
                </div>
                <p className="text-2xl font-bold text-purple-600 mb-2">
                  {formatCurrency(results.recommendations.savingStrategy.phase3.target)}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  {results.recommendations.savingStrategy.phase3.description}
                </p>
                <p className="text-xs text-gray-600">
                  ⏱️ {results.recommendations.savingStrategy.phase3.timeline}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Kde držet peníze */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Kde držet nouzovou rezervu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.recommendations.whereToKeep.map((option, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{option.option}</h4>
                      <Badge variant="outline">{option.percentage}% alokace</Badge>
                      <Badge variant={option.liquidity === 'immediate' ? 'default' : 'secondary'}>
                        {option.liquidity === 'immediate' ? 'Okamžitě' : 
                         option.liquidity === 'within_days' ? 'Během dnů' : 'Během týdne'}
                      </Badge>
                    </div>
                    <p className="font-semibold text-green-600">{option.expectedReturn}% p.a.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-green-700 mb-1">✅ Výhody:</h5>
                      <ul className="text-sm text-gray-700">
                        {option.pros.map((pro, idx) => (
                          <li key={idx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-red-700 mb-1">❌ Nevýhody:</h5>
                      <ul className="text-sm text-gray-700">
                        {option.cons.map((con, idx) => (
                          <li key={idx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Tip pro optimalizaci</h4>
            <p className="text-sm text-blue-700">
              Rozdělte rezervu podle doporučených procent. Většinu držte na spořicím účtu pro okamžitou dostupnost, 
              menší část můžete investovat do bezpečnějších nástrojů s vyšším výnosem.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Akční plán */}
      {results.shortfall > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">🎯 Váš akční plán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Okamžité kroky:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Otevřete si spořicí účet s nejlepším úrokem</li>
                    <li>• Nastavte si automatický převod</li>
                    <li>• Identifikujte zbytečné výdaje</li>
                    <li>• Zvažte dodatečný příjem</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Dlouhodobé cíle:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Dosáhněte nejdříve fáze 1 ({formatCurrency(results.recommendations.savingStrategy.phase1.target)})</li>
                    <li>• Postupně budujte až k plné rezervě</li>
                    <li>• Pravidelně revidujte podle změn v životě</li>
                    <li>• Po dosažení cíle začněte investovat přebytky</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-gray-800">
                  Při současné kapacitě spoření dosáhnete cíle za {results.monthsToTarget} měsíců
                </p>
                <p className="text-sm text-gray-600">
                  Zvýšením měsíční úspory můžete tento čas zkrátit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmergencyFundResults;