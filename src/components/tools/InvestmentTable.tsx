
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CalculationData {
  year: number;
  totalInvested: number;
  grossValue: number;
  netValue: number;
  grossGain: number;
  netGain: number;
  tax: number;
}

interface InvestmentTableProps {
  data: CalculationData[];
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({ data }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('cs-CZ').format(num);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailní přehled po letech</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rok</TableHead>
                <TableHead className="text-right">Investováno (Kč)</TableHead>
                <TableHead className="text-right">Hrubá hodnota (Kč)</TableHead>
                <TableHead className="text-right">Daň (Kč)</TableHead>
                <TableHead className="text-right">Čistá hodnota (Kč)</TableHead>
                <TableHead className="text-right">Hrubý zisk (Kč)</TableHead>
                <TableHead className="text-right">Čistý zisk (Kč)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.year}>
                  <TableCell className="font-medium">{row.year}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.totalInvested)}</TableCell>
                  <TableCell className="text-right text-green-600 font-medium">
                    {formatNumber(row.grossValue)}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    {formatNumber(row.tax)}
                  </TableCell>
                  <TableCell className="text-right text-purple-600 font-medium">
                    {formatNumber(row.netValue)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatNumber(row.grossGain)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600 font-medium">
                    {formatNumber(row.netGain)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentTable;
