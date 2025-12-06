"use client";

import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

interface AttendanceData {
  total: number;
  hadir: number;
  izin: number;
  sakit: number;
  alfa: number;
  hadirPercentage: number;
  izinPercentage: number;
  sakitPercentage: number;
  alfaPercentage: number;
  period: {
    start: string;
    end: string;
    month: string;
  };
}

interface AttendanceChartProps {
  attendanceData?: AttendanceData;
}

const COLORS = {
  hadir: "#10b981",
  izin: "#f59e0b",
  sakit: "#ef4444",
  alfa: "#6b7280",
};

export default function AttendanceChart({ attendanceData }: AttendanceChartProps) {
  // Check if attendance data is empty
  const isEmpty = (attendanceData?.total ?? 0) === 0;

  const GRAY_COLOR = "#9ca3af";

  const data = [
    {
      name: "Hadir",
      value: isEmpty ? 1 : (attendanceData?.hadir ?? 0),
      color: isEmpty ? GRAY_COLOR : COLORS.hadir
    },
    {
      name: "Izin",
      value: isEmpty ? 0 : (attendanceData?.izin ?? 0),
      color: isEmpty ? GRAY_COLOR : COLORS.izin
    },
    {
      name: "Sakit",
      value: isEmpty ? 0 : (attendanceData?.sakit ?? 0),
      color: isEmpty ? GRAY_COLOR : COLORS.sakit
    },
    {
      name: "Alfa",
      value: isEmpty ? 0 : (attendanceData?.alfa ?? 0),
      color: isEmpty ? GRAY_COLOR : COLORS.alfa
    },
  ];

  const hadirPercentage = attendanceData?.hadirPercentage ?? 0;
  const period = attendanceData?.period?.month ?? "N/A";

  return (
    <Card className="p-6 bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Statistik Kehadiran
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Periode: {period}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Pie Chart */}
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 10}
                            className="fill-gray-900 text-3xl font-bold"
                          >
                            {hadirPercentage}%
                          </tspan>
                        </text>
                      )
                    }
                  }}
                  position="center"
                />
              </Pie>
              {!isEmpty && (
                <Tooltip
                  formatter={(value: number) => `${value} orang`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "8px 12px"
                  }}
                />
              )}

            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-3 rounded-lg ${isEmpty ? 'bg-gray-50 border border-gray-100' : 'bg-green-50 border border-green-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
              <span className="text-sm font-medium text-gray-700">Hadir</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {attendanceData?.hadir ?? 0} <span className={isEmpty ? 'text-gray-600' : 'text-green-600'}>({attendanceData?.hadirPercentage ?? 0}%)</span>
            </span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${isEmpty ? 'bg-gray-50 border border-gray-100' : 'bg-amber-50 border border-amber-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full bg-amber-500`}></div>
              <span className="text-sm font-medium text-gray-700">Izin</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {attendanceData?.izin ?? 0} <span className={isEmpty ? 'text-gray-600' : 'text-amber-600'}>({attendanceData?.izinPercentage ?? 0}%)</span>
            </span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${isEmpty ? 'bg-gray-50 border border-gray-100' : 'bg-red-50 border border-red-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full bg-red-500`}></div>
              <span className="text-sm font-medium text-gray-700">Sakit</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {attendanceData?.sakit ?? 0} <span className={isEmpty ? 'text-gray-600' : 'text-red-600'}>({attendanceData?.sakitPercentage ?? 0}%)</span>
            </span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100`}>
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full bg-gray-500`}></div>
              <span className="text-sm font-medium text-gray-700">Alfa</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {attendanceData?.alfa ?? 0} <span className="text-gray-600">({attendanceData?.alfaPercentage ?? 0}%)</span>
            </span>
          </div>
          <div className="pt-3 mt-3 border-t-2 border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-gray-700">Total Kehadiran</span>
              <span className={`text-lg font-bold ${isEmpty ? 'text-gray-600' : 'text-blue-600'}`}>
                {attendanceData?.total ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
