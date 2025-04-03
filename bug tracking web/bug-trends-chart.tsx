"use client"

import {
  Chart,
  ChartArea,
  type ChartAxisOptions,
  ChartBar,
  ChartBarSeries,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

export function BugTrendsChart() {
  const data = [
    { name: "Mon", value: 3 },
    { name: "Tue", value: 5 },
    { name: "Wed", value: 2 },
    { name: "Thu", value: 7 },
    { name: "Fri", value: 4 },
    { name: "Sat", value: 1 },
    { name: "Sun", value: 0 },
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
        <ChartBar>
          <ChartArea />
          <ChartBarSeries data={data} />
          <ChartTooltip />
        </ChartBar>
      </Chart>
    </ChartContainer>
  )
}

