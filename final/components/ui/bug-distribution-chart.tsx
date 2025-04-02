// components/bug-distribution-chart.tsx
"use client";

import {
  Chart,
  BarChart,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/charts";

export function BugDistributionChart() {
  const data = [
    { name: "Critical", value: 12 },
    { name: "High", value: 19 },
    { name: "Medium", value: 23 },
    { name: "Low", value: 15 },
  ];

  return (
    <Chart>
      <BarChart data={data}>
        <ChartTooltip />
        <ChartLegend />
      </BarChart>
    </Chart>
  );
}
