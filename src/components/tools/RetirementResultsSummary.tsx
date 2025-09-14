import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { RetirementData } from '@/utils/retirementCalculations';

interface RetirementResultsSummaryProps {
  results: RetirementData;
}

const RetirementResultsSummary: React.FC<RetirementResultsSummaryProps> = ({ results }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(Math.round(num));
  };

  const getSecurityStatus = () => {
    if (results.isFinanciallySecure && results.yearsMoneyWillLast >= 30) {
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: "Finančně zabezpečený",
        color: "bg-green-50 border-green-200",
        textColor: "text-green-800"
      };
    } else if (results.yearsMoneyWillLast >= 20) {
      return {
        icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
        text: "Částečně zabezpečený",
        color: "bg-yellow-50 border-yellow-200",
        textColor: "text-yellow-800"
      };
    } else {
      return {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        text: "Nedostatečné úspory",
        color: "bg-red-50 border-red-200",
        textColor: "text-red-800"
      };
    }
  };

  const securityStatus = getSecurityStatus();

  return (
    <div className="space-y-6">
      {/* Hlavní výsledek */}
      <Card className={`${securityStatus.color} border-2`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {securityStatus.icon}
            <CardTitle className={`text-xl ${securityStatus.textColor}`}>
              {securityStatus.text}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Úspory při odchodu do penze</p>
              <p className="text-2xl font-bold">{formatCurrency(results.totalSavingsAtRetirement)}</p>
              <p className="text-sm text-gray-500">
                Reálná kupní síla: {formatCurrency(results.realPurchasingPower)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Měsíční příjem v penzi</p>
              <p className="text-2xl font-bold">{formatCurrency(results.monthlyIncomeInRetirement)}</p>
              <p className="text-sm text-gray-500">
                Peníze vydrží {results.yearsMoneyWillLast} let
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailní výsledky */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Investiční růst
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Celkové příspěvky</p>
                <p className="font-semibold">{formatCurrency(results.summary.totalContributed)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Investiční zisky</p>
                <p className="font-semibold text-green-600">
                  +{formatCurrency(results.summary.investmentGains)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Výnos z investic</p>
                <p className="font-semibold">
                  {((results.summary.investmentGains / results.summary.totalContributed) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              Dopad inflace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Nominální hodnota</p>
                <p className="font-semibold">{formatCurrency(results.totalSavingsAtRetirement)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reálná hodnota</p>
                <p className="font-semibold">{formatCurrency(results.realPurchasingPower)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ztráta inflací</p>
                <p className="font-semibold text-red-600">
                  -{formatCurrency(results.summary.inflationImpact)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Pravděpodobnost úspěchu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Úspěšnost strategie</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{results.summary.successProbability.toFixed(0)}%</p>
                  <Badge variant={results.summary.successProbability > 80 ? "default" : results.summary.successProbability > 60 ? "secondary" : "destructive"}>
                    {results.summary.successProbability > 80 ? "Vysoká" : results.summary.successProbability > 60 ? "Střední" : "Nízká"}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vydrží peníze</p>
                <p className="font-semibold">{results.yearsMoneyWillLast} let</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doporučení */}
      {!results.isFinanciallySecure && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">💡 Doporučení pro zlepšení</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-blue-800">Doporučené měsíční spoření:</p>
                <p className="text-xl font-bold text-blue-900">
                  {formatCurrency(results.recommendedMonthlySavings)}
                </p>
                <p className="text-sm text-blue-600">
                  Pro dosažení finančního zabezpečení v penzi
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Možnosti zvýšení úspor:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Zvýšit měsíční spoření</li>
                    <li>• Prodloužit období spoření</li>
                    <li>• Optimalizovat investiční strategii</li>
                    <li>• Snížit výdaje v penzi</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Alternativní strategie:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Odložit odchod do penze o 2-5 let</li>
                    <li>• Kombinovat s I. nebo II. pilířem</li>
                    <li>• Uvažovat o příjmu z nemovitostí</li>
                    <li>• Částečné pokračování v práci</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Úspěšný plán */}
      {results.isFinanciallySecure && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">🎉 Gratulujeme! Váš penzijní plán je na dobré cestě</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              Při současném spoření a investiční strategii budete mít dostatečné prostředky na pohodlnou penzi. 
              Nezapomeňte pravidelně revidovat a upravovat svůj plán podle změn v životě.
            </p>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Další optimalizace:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Pravidelně rebalancovat portfolio</li>
                  <li>• Sledovat změny v daňové legislativě</li>
                  <li>• Zvažovat inflaci a úrokové sazby</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Bezpečnostní rezerva:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Máte {results.yearsMoneyWillLast} let pokrytí</li>
                  <li>• Pravděpodobnost úspěchu: {results.summary.successProbability.toFixed(0)}%</li>
                  <li>• Možnost snížit spoření nebo zvýšit výdaje</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RetirementResultsSummary;