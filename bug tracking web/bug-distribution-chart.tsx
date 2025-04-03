"use client"

import { Chart, ChartContainer, ChartLegend, ChartPie, ChartPieSeries, ChartTooltip } from "@/components/ui/chart"

export function BugDistributionChart() {
  const data = [
    { name: "Critical", value: 2, fill: "#ef4444" },
    { name: "High", value: 3, fill: "#f97316" },
    { name: "Medium", value: 4, fill: "#eab308" },
    { name: "Low", value: 3, fill: "#22c55e" },
  ]

  return (
    <ChartContainer className="h-[200px]">
      <Chart>
        <ChartPie>
          <ChartPieSeries data={data} />
          <ChartTooltip />
          <ChartLegend position="bottom" />
        </ChartPie>
      </Chart>
    </ChartContainer>
  )
}

