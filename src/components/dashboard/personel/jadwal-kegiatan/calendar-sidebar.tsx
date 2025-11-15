'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { ChevronLeft, ChevronRight } from 'lucide-react';

dayjs.locale('id');

interface EventItem {
  date: string; // YYYY-MM-DD
  title: string;
  color: string;
}

const sampleEvents: EventItem[] = [
  { date: "2023-12-06", title: "Rapat Tim", color: "bg-blue-200" },
  { date: "2023-12-06", title: "Presentasi Klien", color: "bg-green-200" },
  { date: "2023-12-21", title: "Project Deadline", color: "bg-purple-200" }
];

export default function CalendarSidebar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startDay = currentMonth.startOf("month").startOf("week");
  const endDay = currentMonth.endOf("month").endOf("week");

  const days: dayjs.Dayjs[] = [];
  let temp = startDay.clone();

  while (temp.isBefore(endDay)) {
    days.push(temp.clone());
    temp = temp.add(1, "day");
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">

      {/* Header Navigasi */}
      <div className="flex items-center justify-between mb-4">
        
        <button
          type="button"
          onClick={() =>
            setCurrentMonth(currentMonth.subtract(1, "month"))
          }
          className="p-2 hover:bg-slate-200 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="font-semibold text-slate-800">
          {currentMonth.format("MMMM YYYY")}
        </h2>

        <button
          type="button"
          onClick={() =>
            setCurrentMonth(currentMonth.add(1, "month"))
          }
          className="p-2 hover:bg-slate-200 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Header Hari */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 border-b pb-2">
        <div>MIN</div>
        <div>SEN</div>
        <div>SEL</div>
        <div>RAB</div>
        <div>KAM</div>
        <div>JUM</div>
        <div>SAB</div>
      </div>

      {/* Grid Kalender */}
      <div className="grid grid-cols-7 text-center mt-2 gap-y-4">
        {days.map((day, index) => {
          const isCurrentMonth = day.month() === currentMonth.month();
          const isToday = day.isSame(dayjs(), "day");

          const eventsToday = sampleEvents.filter(
            (e) => e.date === day.format("YYYY-MM-DD")
          );

          return (
            <div key={index} className="min-h-[70px]">
              <div
                className={`mx-auto flex items-center justify-center rounded-full w-7 h-7 text-sm
                ${isToday ? "bg-blue-500 text-white" : ""}
                ${!isCurrentMonth ? "text-slate-300" : "text-slate-700"}
              `}
              >
                {day.date()}
              </div>

              {/* Event */}
              <div className="flex flex-col gap-1 mt-1">
                {eventsToday.map((event, idx) => (
                  <div
                    key={idx}
                    className={`${event.color} text-[10px] px-1 rounded`}
                  >
                    {event.title}
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
