"use client";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendarView } from "@/hooks/use-calendar-view";
import type { TEvent } from "@/libs/types";

dayjs.locale("id");

interface CalendarSidebarProps {
  events: TEvent[];
}

// Helper untuk warna background event di kalender (versi mini)
const getTypeColor = (type: string | null) => {
  switch (type?.toLowerCase()) {
    case "rapat":
    case "meeting":
      return "bg-blue-200 text-blue-800";
    case "pelatihan":
    case "training":
      return "bg-green-200 text-green-800";
    case "workshop":
      return "bg-purple-200 text-purple-800";
    case "seminar":
      return "bg-orange-200 text-orange-800";
    default:
      return "bg-slate-200 text-slate-800";
  }
};

export default function CalendarSidebar({ events }: CalendarSidebarProps) {
  const { currentDate, handleNextMonth, handlePreviousMonth } =
    useCalendarView();
  const currentMonth = dayjs(currentDate);

  const startDay = currentMonth.startOf("month").startOf("week");
  const endDay = currentMonth.endOf("month").endOf("week");

  const days: dayjs.Dayjs[] = [];
  let temp = startDay.clone();

  while (temp.isBefore(endDay)) {
    days.push(temp.clone());
    temp = temp.add(1, "day");
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full sticky top-8">
      {/* Header Navigasi */}
      <div className="flex items-center justify-between mb-4">
        <Button
          type="button"
          onClick={handlePreviousMonth}
          variant={"link"}
          size={"icon"}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <h2 className="font-semibold text-slate-800 capitalize">
          {currentMonth.format("MMMM YYYY")}
        </h2>

        <Button
          type="button"
          onClick={handleNextMonth}
          variant={"link"}
          size={"icon"}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Header Hari */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 border-b pb-2 mb-2">
        <div>MIN</div>
        <div>SEN</div>
        <div>SEL</div>
        <div>RAB</div>
        <div>KAM</div>
        <div>JUM</div>
        <div>SAB</div>
      </div>

      {/* Grid Kalender */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = day.month() === currentMonth.month();
          const isToday = day.isSame(dayjs(), "day");

          // FILTER LOGIC:
          // Mencocokkan tanggal penuh menggunakan dayjs
          const eventsToday = events.filter((e) =>
            dayjs(e.start_datetime).isSame(day, "day"),
          );

          return (
            <div
              key={index}
              className={`min-h-20 border border-transparent hover:border-slate-100 rounded p-1 flex flex-col items-center transition-all ${!isCurrentMonth ? "opacity-40" : ""}`}
            >
              {/* Tanggal Angka */}
              <div
                className={`flex items-center justify-center rounded-full w-7 h-7 text-sm mb-1 font-medium
                ${isToday ? "bg-blue-500 text-white shadow-md" : "text-slate-700"}
              `}
              >
                {day.date()}
              </div>

              {/* List Event (Dots/Text) */}
              <div className="flex flex-col gap-1 w-full">
                {eventsToday.map((event) => (
                  <div
                    key={event.id}
                    className={`${getTypeColor(event.category)} text-[9px] px-1.5 py-0.5 rounded truncate w-full text-center font-medium capitalize`}
                    title={event.name} // Tooltip native saat hover
                  >
                    {/* Menampilkan Judul Singkat di Kalender */}
                    {event.category || "Event"}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
