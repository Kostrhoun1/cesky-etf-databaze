
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

// Výchozí data pro ilustraci: počáteční investice 100 000 Kč, zhodnocení 7 % ročně, ETF TER 0,2 % vs. fond 2 % ročně, horizont 20 let.
const data = [
  {
    name: "ETF (poplatek 0,2 %)",
    zisk: 271000,
    barColor: "#7c3aed",
  },
  {
    name: "Klasický fond (poplatek 2 %)",
    zisk: 172000,
    barColor: "#e11d48",
  }
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow text-gray-700 border border-violet-200">
        <p className="mb-1 font-semibold">{label}</p>
        <p>
          Konečný výnos: <span className="font-mono font-bold">{payload[0].value.toLocaleString()} Kč</span>
        </p>
      </div>
    );
  }
  return null;
};

const ChartFeeImpact: React.FC = () => (
  <div className="my-12">
    <Card className="bg-white border-violet-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <ChartBar className="w-7 h-7 text-violet-600" />
          <CardTitle className="text-xl">Kolik ubírají poplatky za 20 let?</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-gray-700">
          <strong>Srovnání konečného výnosu při 100&nbsp;000&nbsp;Kč investici na 20 let (při stejném zhodnocení, různé roční poplatky):</strong>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
            barCategoryGap={40}
          >
            <XAxis
              type="number"
              tickFormatter={(v) => `${v / 1000}k`}
              axisLine={false}
              tickLine={false}
              fontSize={14}
              tick={{ fill: "#64748b" }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={170}
              axisLine={false}
              tickLine={false}
              fontSize={14}
              tick={{ fill: "#334155" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ede9fe" }} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar dataKey="zisk" isAnimationActive radius={[10, 10, 10, 10]} >
              <LabelList
                dataKey="zisk"
                position="right"
                formatter={v => v.toLocaleString() + " Kč"}
                style={{ fill: "#334155", fontWeight: 600, fontSize: 14 }}
              />
              {
                data.map((entry, idx) => (
                  <Cell key={idx} fill={entry.barColor} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-5 text-sm text-gray-500">
          <span className="inline-block rounded-full w-3 h-3 bg-violet-600 align-middle mr-2"></span>
          ETF (0,2 % roční poplatek) &nbsp;&nbsp;
          <span className="inline-block rounded-full w-3 h-3 bg-rose-600 align-middle mr-2"></span>
          Klasický fond (2 % roční poplatek)
          <div className="mt-3">
            <span className="font-semibold text-rose-600">Rozdíl téměř 100&nbsp;000&nbsp;Kč! </span>
            Nižší poplatky u ETF znamenají při dlouhodobém investování obrovský rozdíl ve výnosu.
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ChartFeeImpact;
