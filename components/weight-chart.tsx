"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useAppData } from "@/context/app-context"
import { format } from "date-fns"

export function WeightChart() {
  const { weightEntries } = useAppData()

  // Format data for the chart
  const chartData = weightEntries.map((entry) => ({
    date: format(new Date(entry.date), "MMM d"),
    weight: entry.weight,
  }))

  return (
    <ChartContainer
      config={{
        weight: {
          label: "Weight (kg)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={30}
            tickFormatter={(value) => value}
          />
          <YAxis
            dataKey="weight"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={["dataMin - 1", "dataMax + 1"]}
            tickFormatter={(value) => `${value}kg`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="weight"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-weight)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-weight)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

