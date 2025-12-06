"use client";

import { Clock, Package, Users } from "lucide-react";
import type React from "react";
import { Card } from "@/components/ui/card";

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  subtext?: string;
}

interface DashboardStatsProps {
  countData?: {
    user: number;
    inventory: number;
    events: number;
  };
}

export default function DashboardStats({ countData }: DashboardStatsProps) {
  const stats: StatCard[] = [
    {
      title: "Total Personal",
      value: countData?.user ?? 0,
      icon: <Users className="h-6 w-6 text-blue-500" />,
      subtext: "Active employees",
    },
    {
      title: "Jumlah Barang",
      value: countData?.inventory ?? 0,
      icon: <Package className="h-6 w-6 text-blue-500" />,
      subtext: "Inventory items",
    },
    {
      title: "Kegiatan Mendatang",
      value: countData?.events ?? 0,
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      subtext: "Upcoming events",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">
                {stat.value}
              </h3>
              {stat.subtext && (
                <p className="mt-1 text-xs text-gray-500">{stat.subtext}</p>
              )}
            </div>
            <div className="rounded-lg bg-blue-50 p-3">{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
