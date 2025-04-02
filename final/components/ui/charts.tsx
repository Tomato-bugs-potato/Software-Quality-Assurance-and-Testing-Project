// components/ui/charts.tsx
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
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const COLORS = {
  light: ["#0ea5e9", "#6366f1", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"],
  dark: ["#38bdf8", "#818cf8", "#34d399", "#f87171", "#fbbf24", "#a78bfa"]
}

type ChartContextType = {
  colors: string[]
}

const ChartContext = React.createContext<ChartContextType>({
  colors: COLORS.light
})

export function ChartContainer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative h-[300px] w-full", className)} {...props}>
      {children}
    </div>
  )
}

export function Chart({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { theme } = useTheme()
  const colors = theme === "dark" ? COLORS.dark : COLORS.light

  return (
    <ChartContext.Provider value={{ colors }}>
      <div className={cn("w-full h-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a Chart component")
  }
  return context
}

export function ChartTooltip({ content }: { content?: React.ReactNode }) {
  return (
    <RechartsTooltip
      contentStyle={{
        backgroundColor: "hsl(var(--background))",
        borderColor: "hsl(var(--border))",
        borderRadius: "calc(var(--radius) - 2px)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
      itemStyle={{
        color: "hsl(var(--foreground))"
      }}
      labelStyle={{
        color: "hsl(var(--foreground))",
        fontWeight: 500
      }}
    />
  )
}

export function ChartLegend() {
  return <RechartsLegend />
}

export function ChartArea() {
  return <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
}

export function BarChart({ data, ...props }: { data: any[] } & React.ComponentProps<typeof RechartsBarChart>) {
  const { colors } = useChartContext()
  return (
    <RechartsBarChart data={data} {...props}>
      <XAxis dataKey="name" />
      <YAxis />
      <ChartArea />
      <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
    </RechartsBarChart>
  )
}

export function LineChart({ data, ...props }: { data: any[] } & React.ComponentProps<typeof RechartsLineChart>) {
  const { colors } = useChartContext()
  return (
    <RechartsLineChart data={data} {...props}>
      <XAxis dataKey="name" />
      <YAxis />
      <ChartArea />
      <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} dot={{ r: 4 }} />
    </RechartsLineChart>
  )
}

export function PieChart({ data, ...props }: { data: any[] } & React.ComponentProps<typeof RechartsPieChart>) {
  const { colors } = useChartContext()
  return (
    <RechartsPieChart {...props}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </RechartsPieChart>
  )
}