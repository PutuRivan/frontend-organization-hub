"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Users, Calendar, Package, Clock } from "lucide-react"

interface StatCard {
  title: string
  value: number
  icon: React.ReactNode
  subtext?: string
}

export function DashboardStats() {
  const stats: StatCard[] = [
    {
      title: "Total Personal",
      value: 125,
      icon: <Users className="h-6 w-6 text-blue-500" />,
      subtext: "Active employees",
    },
    {
      title: "Kehadiran Hari Ini",
      value: 95,
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      subtext: "%",
    },
    {
      title: "Jumlah Barang",
      value: 842,
      icon: <Package className="h-6 w-6 text-blue-500" />,
      subtext: "Inventory items",
    },
    {
      title: "Kegiatan Mendatang",
      value: 5,
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      subtext: "Upcoming activities",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</h3>
              {stat.subtext && <p className="mt-1 text-xs text-gray-500">{stat.subtext}</p>}
            </div>
            <div className="rounded-lg bg-blue-50 p-3">{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
