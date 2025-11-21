"use client";

import { Calendar } from "lucide-react";
import type React from "react";
import { Card } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
}

interface UpcomingActivitiesProps {
  events: Event[];
}

export default function UpcomingActivities({ events }: UpcomingActivitiesProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { dateStr, timeStr };
  };

  return (
    <Card className="p-6 bg-white">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Kegiatan Terdekat
      </h3>
      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Tidak ada kegiatan mendatang
          </p>
        ) : (
          events.slice(0, 5).map((event) => {
            const { dateStr, timeStr } = formatDateTime(event.start_datetime);
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-b-0"
              >
                <div className="mt-1 rounded-lg bg-blue-50 p-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-600">
                    {dateStr}, {timeStr}
                  </p>
                  {event.location && (
                    <p className="text-xs text-gray-500 mt-1">📍 {event.location}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
