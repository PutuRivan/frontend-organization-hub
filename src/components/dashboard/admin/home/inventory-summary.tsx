"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  {
    category: "inventory",
    tersedia: 612,
    dipinjam: 180,
    perbaikan: 50,
  },
]

const chartConfig = {
  tersedia: {
    label: "Tersedia",
    color: "#10b981",
  },
  dipinjam: {
    label: "Dipinjam",
    color: "#f59e0b",
  },
  perbaikan: {
    label: "Perbaikan",
    color: "#ef4444",
  },
} satisfies ChartConfig

export default function InventorySummary() {
  const total = 842
  const available = 612
  const borrowed = 180
  const repair = 50

  return (
    <Card className="flex flex-col p-6 bg-white">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Ringkasan Inventaris</h3>

      <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
        <RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-gray-900 text-2xl font-bold">
                        {total}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-gray-600 text-sm">
                        Total
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="tersedia"
            stackId="a"
            cornerRadius={5}
            fill="#10b981"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="dipinjam"
            stackId="a"
            cornerRadius={5}
            fill="#f59e0b"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="perbaikan"
            stackId="a"
            cornerRadius={5}
            fill="#ef4444"
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-700">Tersedia: {available}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-gray-700">Dipinjam: {borrowed}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-700">Perbaikan: {repair}</span>
        </div>
      </div>
    </Card>
  )
}
