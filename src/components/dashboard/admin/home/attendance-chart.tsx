/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { useRouter } from "next/navigation";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/libs/utils";

interface AbsenceData {
  dinas: number;
  dik: number;
  izin: number;
  cuti: number;
  sakit: number;
  hamil: number;
  bko: number;
  tk: number;
  terlambat: number;
  dinasPercentage: number;
  dikPercentage: number;
  izinPercentage: number;
  cutiPercentage: number;
  sakitPercentage: number;
  hamilPercentage: number;
  bkoPercentage: number;
  tkPercentage: number;
  terlambatPercentage: number;
}

interface AttendanceData {
  total: number;
  hadir: number;
  hadirPercentage: number;
  Kurang: AbsenceData;
  period: {
    start: string;
    end: string;
    month: string;
  };
}

interface AttendanceChartProps {
  attendanceData?: AttendanceData;
}

const COLORS: Record<string, string> = {
  hadir: "#10b981", // emerald-500
  kurang: "#f43f5e", // rose-500
  izin: "#f59e0b", // amber-500
  sakit: "#ef4444", // red-500
  tk: "#6b7280", // gray-500
  cuti: "#3b82f6", // blue-500
  dinas: "#8b5cf6", // violet-500
  dik: "#6366f1", // indigo-500
  hamil: "#ec4899", // pink-500
  bko: "#06b6d4", // cyan-500
  terlambat: "#eab308", // yellow-500
};

const LABELS: Record<string, string> = {
  hadir: "Hadir",
  kurang: "Tidak Hadir",
  izin: "Izin",
  sakit: "Sakit",
  tk: "Tanpa Keterangan",
  cuti: "Cuti",
  dinas: "Dinas",
  dik: "Pendidikan",
  hamil: "Hamil",
  bko: "BKO",
  terlambat: "Terlambat",
};

export default function AttendanceChart({
  attendanceData,
}: AttendanceChartProps) {
  const period = attendanceData?.period?.start ?? "N/A";
  const total = attendanceData?.total ?? 0;
  const hadir = attendanceData?.hadir ?? 0;
  const kurangData = attendanceData?.Kurang;

  // Calculate total absences
  const totalKurang = kurangData
    ? kurangData.dinas +
    kurangData.dik +
    kurangData.izin +
    kurangData.cuti +
    kurangData.sakit +
    kurangData.hamil +
    kurangData.bko +
    kurangData.tk +
    kurangData.terlambat
    : 0;

  const GRAY_COLOR = "#9ca3af";

  // Data for Overview Legend (Always show all categories)
  const overviewData = [
    {
      name: "Hadir",
      value: hadir,
      percentage: attendanceData?.hadirPercentage ?? 0,
      color: COLORS.hadir,
      key: "hadir",
    },
    {
      name: "Tidak Hadir",
      value: totalKurang,
      percentage:
        total > 0 ? Number(((totalKurang / total) * 100).toFixed(1)) : 0,
      color: COLORS.kurang,
      key: "kurang",
    },
  ];

  // Data for Breakdown Legend (Always show all categories)
  const breakdownData: any[] = [];
  const categories = [
    "dinas",
    "dik",
    "izin",
    "cuti",
    "sakit",
    "hamil",
    "bko",
    "tk",
    "terlambat",
  ] as const;

  categories.forEach((key) => {
    const value = kurangData ? kurangData[key] : 0;
    const percentage = kurangData
      ? (kurangData[`${key}Percentage` as keyof AbsenceData] ?? 0)
      : 0;

    breakdownData.push({
      name: LABELS[key],
      value: value,
      percentage: percentage,
      color: COLORS[key],
      key: key,
    });
  });

  // Data for Charts (Handle empty state for visual presentation)
  const chartOverviewData =
    total === 0
      ? [
        {
          name: "Tidak ada data",
          value: 1,
          color: GRAY_COLOR,
          key: "empty",
        },
      ]
      : overviewData.filter((d) => d.value > 0);

  const chartBreakdownData =
    totalKurang === 0
      ? [
        {
          name: "Tidak ada absen",
          value: 1,
          color: GRAY_COLOR,
          key: "empty",
        },
      ]
      : breakdownData.filter((d) => d.value > 0);

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const renderChart = (data: any[], centerLabel: string, subLabel: string) => (
    <div className="flex justify-center relative">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={data.some((d: any) => d.key === "empty") ? 0 : 2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="cursor-pointer"
                onClick={() => handleLegendClick(entry.key)}
              />
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
                        {centerLabel}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 15}
                        className="fill-gray-500 text-sm"
                      >
                        {subLabel}
                      </tspan>
                    </text>
                  );
                }
              }}
              position="center"
            />
          </Pie>
          {!data.some((d: any) => d.key === "empty") && (
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} Orang`,
                name,
              ]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#374151", fontWeight: 500 }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const router = useRouter();

  const handleLegendClick = (key: string) => {
    if (key === "empty") return;

    const mapping: Record<string, string> = {
      hadir: "Hadir",
      kurang: "Kurang", // Note: The filter dropdown might not list "Kurang", but we pass it anyway.
      dinas: "Dinas",
      dik: "DIK",
      izin: "Izin",
      cuti: "Cuti",
      sakit: "Sakit",
      hamil: "Hamil",
      bko: "BKO",
      tk: "TK",
      terlambat: "Terlambat",
    };

    const status = mapping[key];
    if (status) {
      router.push(`/admin/absensi?status=${status}`);
    }
  };

  const renderLegend = (data: any[]) => (
    <div className="flex flex-col gap-3 pr-2">
      {data.map((item: any) => (
        <Button
          key={item.key}
          variant="outline"
          className="flex items-center justify-between rounded-lg bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100 cursor-pointer"
          onClick={() => handleLegendClick(item.key)}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm font-medium text-gray-700">
              {item.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">
              {item.value}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({item.percentage}%)
            </span>
          </div>
        </Button>
      ))}

      <div className="pt-3 mt-auto border-t-2 border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-700">
            Total Personel
          </span>
          <span
            className={`text-lg font-bold ${total === 0 ? "text-gray-600" : "text-blue-600"}`}
          >
            {total}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-white h-full flex flex-col">
        <div className="mb-4 flex items-center justify-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Statistik Kehadiran
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Periode: {formatDateTime(period, "LONG_DATE")}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            {renderChart(
              chartOverviewData,
              `${attendanceData?.hadirPercentage ?? 0}%`,
              "Kehadiran",
            )}
            {renderLegend(overviewData)}
          </div>
        </div>
        <div className="mb-4 flex items-center justify-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Statistik Ketidakhadiran
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          {renderChart(
            chartBreakdownData,
            `${total > 0 ? ((totalKurang / total) * 100).toFixed(1) : 0}%`,
            "Ketidakhadiran",
          )}
          {renderLegend(breakdownData)}
        </div>
      </Card>
    </div>
  );
}
