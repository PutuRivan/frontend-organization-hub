"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "dayjs/locale/id";
import CalendarSidebar from "@/components/dashboard/personel/jadwal-kegiatan/calendar-sidebar";
import EmptyState from "@/components/dashboard/personel/jadwal-kegiatan/empty-state";
import EventCard from "@/components/dashboard/personel/jadwal-kegiatan/event-card";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/libs/apis";
import type { TEvent } from "@/libs/types";
import { getAccessTokenFromCookie } from "@/libs/utils";

dayjs.locale("id");

interface Event {
  id: string;
  date: number;
  month: string;
  time: string;
  type: string;
  title: string;
  description: string;
}

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("semua"); // Changed to string to accommodate dynamic types
  const [events, setEvents] = useState<Event[]>([]);
  const [rawEvents, setRawEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = getAccessTokenFromCookie();
        if (!token) return;

        const response = await getAllEvents(token, 1, 100); // Fetch up to 100 events
        if (response?.data) {
          setRawEvents(response.data);
          const mappedEvents: Event[] = response.data.map((e: TEvent) => {
            const startDate = dayjs(e.start_datetime);
            return {
              id: e.id,
              date: startDate.date(),
              month: startDate.format("MMMM"),
              time: startDate.format("HH:mm") + " WIB",
              type: e.category || "Kegiatan",
              title: e.name,
              description: e.place || "Tidak ada lokasi",
            };
          });
          setEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    selectedFilter === "semua"
      ? events
      : events.filter(
        (event) => event.type.toLowerCase() === selectedFilter.toLowerCase(),
      );

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Jadwal Kegiatan Anda
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Kiri: Filter + Events */}
          <div className="flex-1 lg:max-w-3xl">
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
              {[
                "semua",
                "Rapat",
                "Pelatihan",
                "Workshop",
                "Seminar",
                "Lainnya",
              ].map((type) => (
                <Button
                  key={type}
                  variant={
                    selectedFilter.toLowerCase() === type.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelectedFilter(type)}
                  className="capitalize rounded-full px-6"
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-10 text-slate-500">
                  Memuat data...
                </div>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          </div>


          {/* Kanan: Kalender */}
          <div className="lg:w-[400px] xl:w-[450px]">
            {" "}
            {/* Sedikit penyesuaian lebar */}
            {/* UPDATED: Mengirim data events ke sidebar */}
            <CalendarSidebar events={rawEvents} />
          </div>

        </div>
      </div>
    </main>
  );
}
