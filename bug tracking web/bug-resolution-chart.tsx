"use client"

import {
  Chart,
  ChartArea,
  type ChartAxisOptions,
  ChartContainer,
  ChartLine,
  ChartLineSeries,
  ChartTooltip,
} from "@/components/ui/chart"

export function BugResolutionChart() {
  const data = [
    { name: "Week 1", value: 2 },
    { name: "Week 2", value: 5 },
    { name: "Week 3", value: 8 },
    { name: "Week 4", value: 12 },
    { name: "Week 5", value: 15 },
    { name: "Week 6", value: 10 },
    { name: "Week 7", value: 18 },
  ]

  const xAxisOptions: ChartAxisOptions = {
    dataKey: "name",
    axisLine: false,
    tickLine: false,
  }

  const yAxisOptions: ChartAxisOptions = {
    axisLine: false,
    tickLine: false,
    tickCount: 5,
  }

  return (
    <ChartContainer className="h-[200px]">
      <Chart xAxis={xAxisOptions} yAxis={yAxisOptions}>
        <ChartLine>
          <ChartArea />
          <ChartLineSeries data={data} />
          <ChartTooltip />
        </ChartLine>
      </Chart>
    </ChartContainer>
  )
}

