"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function AttendanceChart() {
  // Sample data for 30 days
  const data = [
    { day: 1, attendance: 75 },
    { day: 2, attendance: 78 },
    { day: 3, attendance: 72 },
    { day: 4, attendance: 88 },
    { day: 5, attendance: 85 },
    { day: 6, attendance: 92 },
    { day: 7, attendance: 88 },
    { day: 8, attendance: 95 },
    { day: 9, attendance: 91 },
    { day: 10, attendance: 87 },
    { day: 11, attendance: 82 },
    { day: 12, attendance: 85 },
    { day: 13, attendance: 79 },
    { day: 14, attendance: 84 },
    { day: 15, attendance: 90 },
    { day: 16, attendance: 88 },
    { day: 17, attendance: 93 },
    { day: 18, attendance: 89 },
    { day: 19, attendance: 86 },
    { day: 20, attendance: 91 },
    { day: 21, attendance: 94 },
    { day: 22, attendance: 89 },
    { day: 23, attendance: 87 },
    { day: 24, attendance: 92 },
    { day: 25, attendance: 90 },
    { day: 26, attendance: 85 },
    { day: 27, attendance: 88 },
    { day: 28, attendance: 95 },
    { day: 29, attendance: 93 },
    { day: 30, attendance: 97 },
  ]

  return (
    <Card className="p-6 bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Grafik Statistik Kehadiran (30 Hari Terakhir)</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">95%</span>
          <span className="text-sm text-green-600">+2.5%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" stroke="#999" style={{ fontSize: "12px" }} tick={{ fontSize: 12 }} />
          <YAxis stroke="#999" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#3b82f6"
            dot={false}
            strokeWidth={3}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
