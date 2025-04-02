// components/bug-trends-chart.tsx
"use client";

import {
  Chart,
  LineChart,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/charts";

export function BugTrendsChart() {
  const data = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 8 },
    { name: "Apr", value: 12 },
    { name: "May", value: 20 },
    { name: "Jun", value: 18 },
  ];

  return (
    <Chart>
      <LineChart data={data}>
        <ChartTooltip />
        <ChartLegend />
      </LineChart>
    </Chart>
  );
}
