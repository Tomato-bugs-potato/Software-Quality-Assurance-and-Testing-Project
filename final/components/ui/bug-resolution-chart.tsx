// components/bug-resolution-chart.tsx
"use client";

import {
  Chart,
  PieChart,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/charts";

export function BugResolutionChart() {
  const data = [
    { name: "Resolved", value: 45 },
    { name: "Pending", value: 30 },
    { name: "Reopened", value: 15 },
    { name: "Won't Fix", value: 10 },
  ];

  return (
    <Chart>
      <PieChart data={data}>
        <ChartTooltip />
        <ChartLegend />
      </PieChart>
    </Chart>
  );
}
