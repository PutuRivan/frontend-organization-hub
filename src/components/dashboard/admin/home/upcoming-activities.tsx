"use client";

import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TEvent } from "@/libs/types";
import { formatDateTime } from "@/libs/utils";

interface UpcomingActivitiesProps {
  events: TEvent[];
}

export default function UpcomingActivities({
  events,
}: UpcomingActivitiesProps) {
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
            const dateStr = formatDateTime(event.start_datetime.toLocaleString(), "LONG_DATE_TIME");
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-b-0"
              >
                <div className="mt-1 rounded-lg bg-blue-50 p-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.name}</p>
                  <p className="text-xs text-gray-600">
                    {dateStr}
                  </p>
                  {event.place && (
                    <p className="text-xs text-gray-500 mt-1">
                      📍 {event.place}
                    </p>
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
