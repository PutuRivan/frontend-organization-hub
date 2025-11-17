'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { ChevronLeft, ChevronRight } from 'lucide-react';

dayjs.locale('id');

// Samakan tipe data dengan yang ada di parent (Home)
interface Event {
  id: string;
  date: number;
  month: string;
  time: string;
  type: 'Rapat' | 'Pelatihan' | 'Workshop';
  title: string;
  description: string;
}

interface CalendarSidebarProps {
  events: Event[];
}

// Helper untuk warna background event di kalender (versi mini)
const getTypeColor = (type: string) => {
  switch (type) {
    case 'Rapat': return 'bg-blue-200 text-blue-800';
    case 'Pelatihan': return 'bg-green-200 text-green-800';
    case 'Workshop': return 'bg-purple-200 text-purple-800';
    default: return 'bg-slate-200 text-slate-800';
  }
};

export default function CalendarSidebar({ events }: CalendarSidebarProps) {
  // Set default start date ke Juli 2024 agar sesuai dengan data dummy Anda untuk demo ini
  // Jika ingin default bulan sekarang, ganti dayjs('2024-07-01') menjadi dayjs()
  const [currentMonth, setCurrentMonth] = useState(dayjs('2024-07-01'));

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
        <button
          type="button"
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="font-semibold text-slate-800 capitalize">
          {currentMonth.format("MMMM YYYY")}
        </h2>

        <button
          type="button"
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
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
          // Mencocokkan tanggal (number) dan nama bulan (string) dari data events
          // Note: day.date() return 1-31, day.format('MMMM') return "Juli", "Agustus", dst (karena locale id)
          const eventsToday = events.filter(
            (e) => e.date === day.date() && e.month === day.format('MMMM')
          );

          return (
            <div key={index} className={`min-h-[80px] border border-transparent hover:border-slate-100 rounded p-1 flex flex-col items-center transition-all ${!isCurrentMonth ? 'opacity-40' : ''}`}>
              
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
                    className={`${getTypeColor(event.type)} text-[9px] px-1.5 py-0.5 rounded truncate w-full text-center font-medium`}
                    title={event.title} // Tooltip native saat hover
                  >
                    {/* Menampilkan Judul Singkat di Kalender */}
                    {event.type}
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