"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Users, Wrench, FileText } from "lucide-react"

interface Activity {
  id: number
  title: string
  date: string
  time: string
  icon: React.ReactNode
}

export function UpcomingActivities() {
  const activities: Activity[] = [
    {
      id: 1,
      title: "Rapat Koordinasi Bulanan",
      date: "25 Des 2023",
      time: "10:00 WIB",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 2,
      title: "Pemeliharaan Server",
      date: "28 Des 2023",
      time: "08:00 WIB",
      icon: <Wrench className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 3,
      title: "Audit Inventaris Tahunan",
      date: "30 Des 2023",
      time: "09:00 WIB",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
  ]

  return (
    <Card className="p-6 bg-white">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Kegiatan Terdekat</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-4 last:pb-0">
            <div className="mt-1 rounded-lg bg-blue-50 p-2">{activity.icon}</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-600">
                {activity.date}, {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
