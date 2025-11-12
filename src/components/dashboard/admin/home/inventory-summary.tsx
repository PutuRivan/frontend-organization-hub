"use client"

import { Card } from "@/components/ui/card"

export function InventorySummary() {
  const total = 842
  const available = 612 // ~72.7%
  const borrowed = 180 // ~21.4%
  const repair = 50 // ~5.9%

  const availablePercent = (available / total) * 100
  const borrowedPercent = (borrowed / total) * 100
  const repairPercent = (repair / total) * 100

  return (
    <Card className="p-6 bg-white">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Ringkasan Inventaris</h3>

      {/* Circular Progress */}
      <div className="flex justify-center">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            {/* Available (Green) */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray={`${(availablePercent / 100) * 565.48} 565.48`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            {/* Borrowed (Yellow) */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="12"
              strokeDasharray={`${(borrowedPercent / 100) * 565.48} 565.48`}
              strokeDashoffset={`-${(availablePercent / 100) * 565.48}`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            {/* Repair (Red) */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              strokeDasharray={`${(repairPercent / 100) * 565.48} 565.48`}
              strokeDashoffset={`-${((availablePercent + borrowedPercent) / 100) * 565.48}`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-900">{total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>
      </div>

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
