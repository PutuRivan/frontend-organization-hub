"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface InventoryData {
  totalItems: number;
  totalQuantity: number;
  baik: number;
  rusak: number;
  hilang: number;
  baikPercentage: number;
  rusakPercentage: number;
  hilangPercentage: number;
}

interface InventorySummaryProps {
  inventoryData?: InventoryData;
}

const chartConfig = {
  baik: {
    label: "Baik",
    color: "#10b981",
  },
  rusak: {
    label: "Rusak",
    color: "#ef4444",
  },
  hilang: {
    label: "Hilang",
    color: "#6b7280",
  },
} satisfies ChartConfig

export default function InventorySummary({ inventoryData }: InventorySummaryProps) {
  const total = inventoryData?.totalItems ?? 0;
  const baik = inventoryData?.baik ?? 0;
  const rusak = inventoryData?.rusak ?? 0;
  const hilang = inventoryData?.hilang ?? 0;

  const chartData = [
    {
      category: "inventory",
      baik: baik,
      rusak: rusak,
      hilang: hilang,
    },
  ];

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
                        Total Items
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="baik"
            stackId="a"
            cornerRadius={5}
            fill="#10b981"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="rusak"
            stackId="a"
            cornerRadius={5}
            fill="#ef4444"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="hilang"
            stackId="a"
            cornerRadius={5}
            fill="#6b7280"
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">Baik</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{baik}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700">Rusak</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{rusak}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-500"></div>
            <span className="text-sm text-gray-700">Hilang</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{hilang}</span>
        </div>
      </div>
    </Card>
  )
}
