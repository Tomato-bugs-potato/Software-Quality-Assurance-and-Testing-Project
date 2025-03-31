"use client"

import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend as RechartsLegend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  type XAxis,
  type YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

// Define chart configuration type
export type ChartConfig = {
  theme?: "light" | "dark"
  colors?: string[]
  [key: string]: any
}

// Default chart configuration
const defaultConfig: ChartConfig = {
  theme: "light",
  colors: ["#0ea5e9", "#6366f1", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"],
}

// Create chart context
type ChartContextType = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextType>({
  config: defaultConfig,
})

// Chart container component
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChartContainer({ className, children, ...props }: ChartContainerProps) {
  return (
    <div className={cn("relative h-full w-full", className)} {...props}>
      {children}
    </div>
  )
}

// Main chart component
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig
  xAxis?: React.ComponentProps<typeof XAxis>
  yAxis?: React.ComponentProps<typeof YAxis>
}

export function Chart({ config = defaultConfig, xAxis, yAxis, className, children, ...props }: ChartProps) {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  }

  return (
    <ChartContext.Provider value={{ config: mergedConfig }}>
      <div className={cn("w-full h-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

// Hook to use chart context
export function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a Chart component")
  }
  return context
}

// Chart tooltip content component
interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  itemClassName?: string
  labelClassName?: string
  valueClassName?: string
}

export function ChartTooltipContent({
  className,
  itemClassName,
  labelClassName,
  valueClassName,
  ...props
}: ChartTooltipContentProps) {
  return <div className={cn("rounded-lg border bg-background px-3 py-1.5 shadow-md", className)} {...props} />
}

// Pie chart components
interface ChartPieProps extends React.ComponentProps<typeof RechartsPieChart> {}

export function ChartPie({ children, ...props }: ChartPieProps) {
  return <RechartsPieChart {...props}>{children}</RechartsPieChart>
}

interface ChartPieSeriesProps extends Omit<React.ComponentProps<typeof Pie>, "data"> {
  data: {
    name: string
    value: number
    fill?: string
  }[]
}

export function ChartPieSeries({ data, ...props }: ChartPieSeriesProps) {
  const { config } = useChartContext()

  return (
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
      nameKey="name"
      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      {...props}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.fill || config.colors[index % config.colors.length]} />
      ))}
    </Pie>
  )
}

// Line chart components
interface ChartLineProps extends React.ComponentProps<typeof RechartsLineChart> {}

export function ChartLine({ children, ...props }: ChartLineProps) {
  return <RechartsLineChart {...props}>{children}</RechartsLineChart>
}

interface ChartLineSeriesProps extends Omit<React.ComponentProps<typeof Line>, "data"> {
  data: {
    name: string
    value: number
  }[]
}

export function ChartLineSeries({ data, ...props }: ChartLineSeriesProps) {
  const { config } = useChartContext()

  return (
    <Line
      type="monotone"
      dataKey="value"
      stroke={config.colors[0]}
      data={data}
      strokeWidth={2}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
      {...props}
    />
  )
}

// Bar chart components
interface ChartBarProps extends React.ComponentProps<typeof RechartsBarChart> {}

export function ChartBar({ children, ...props }: ChartBarProps) {
  return <RechartsBarChart {...props}>{children}</RechartsBarChart>
}

interface ChartBarSeriesProps extends Omit<React.ComponentProps<typeof Bar>, "data"> {
  data: {
    name: string
    value: number
  }[]
}

export function ChartBarSeries({ data, ...props }: ChartBarSeriesProps) {
  const { config } = useChartContext()

  return <Bar dataKey="value" fill={config.colors[0]} data={data} radius={4} barSize={30} {...props} />
}

// Chart area component (grid)
type ChartAreaProps = {}

export function ChartArea({}: ChartAreaProps) {
  return <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
}

// Chart tooltip component
interface ChartTooltipProps {
  content?: React.ReactNode
}

export function ChartTooltip({ content }: ChartTooltipProps) {
  return (
    <RechartsTooltip
      formatter={(value) => [`${value} bugs`, "Count"]}
      contentStyle={{
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
        borderRadius: "6px",
      }}
    />
  )
}

// Chart legend component
interface ChartLegendProps {
  position?: "top" | "right" | "bottom" | "left"
  content?: React.ReactNode
}

export function ChartLegend({ position = "bottom", content }: ChartLegendProps) {
  return (
    <RechartsLegend
      verticalAlign={position === "top" || position === "bottom" ? position : "middle"}
      align={position === "left" || position === "right" ? position : "center"}
      layout={position === "top" || position === "bottom" ? "horizontal" : "vertical"}
    />
  )
}

interface ChartLegendContentProps extends React.HTMLAttributes<HTMLDivElement> {
  itemClassName?: string
  iconClassName?: string
}

export function ChartLegendContent({ className, itemClassName, iconClassName, ...props }: ChartLegendContentProps) {
  return <div className={cn("flex flex-wrap items-center gap-4", className)} {...props} />
}

// Export axis options type
export type ChartAxisOptions = React.ComponentProps<typeof XAxis>

