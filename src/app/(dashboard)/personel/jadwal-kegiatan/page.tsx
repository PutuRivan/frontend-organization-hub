"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import "dayjs/locale/id";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import EventFilterContainer from "@/components/dashboard/admin/jadwal-kegiatan/event-filter-container";
import EventList from "@/components/dashboard/admin/jadwal-kegiatan/event-list";
import HeaderContent from "@/components/dashboard/base/header-content";
import CalendarSidebar from "@/components/dashboard/personel/jadwal-kegiatan/calendar-sidebar";
import EmptyState from "@/components/dashboard/personel/jadwal-kegiatan/empty-state";
import EventAddDialog from "@/components/dashboard/personel/jadwal-kegiatan/event-add-dialog";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/libs/apis";
import type { TEvent } from "@/libs/types";
import { getAccessTokenFromCookie } from "@/libs/utils";

dayjs.locale("id");

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pathname = usePathname();
  const itemsPerPage = 10;

  const token = getAccessTokenFromCookie();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllEvents(
        token,
        currentPage,
        itemsPerPage,
        searchQuery,
      );
      setEvents(result.data);
      setTotalItems(result.pagination.totalItems);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  }, [token, currentPage, searchQuery]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Convert API events to calendar format
  const calendarEvents: TEvent[] = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start_datetime: new Date(event.start_datetime),
      end_datetime: new Date(event.end_datetime),
    }));
  }, [events]);

  return (
    <main className="min-h-screen bg-background px-5">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Jadwal Kegiatan Anda
        </h1>
        </div> */}
      <HeaderContent
        title="Jadwal Kegiatan Anda"
        description="Lihat dan kelola jadwal kegiatan Anda."
      >
        <Button onClick={() => setShowAddEvent(true)} size="lg">
          <Plus /> Tambah Kegiatan
        </Button>
      </HeaderContent>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Kiri: Filter + Events */}
        <div className="flex-1 lg:max-w-3xl">
          <EventFilterContainer
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Events List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10 text-slate-500">
                Memuat data...
              </div>
            ) : events.length > 0 ? (
              <EventList
                events={events}
                fetchEvents={fetchEvents}
                token={token}
                pathname={pathname}
              />
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
          <CalendarSidebar events={calendarEvents} />
        </div>
      </div>
      <EventAddDialog
        open={showAddEvent}
        token={token}
        onOpenChange={setShowAddEvent}
        onSuccess={fetchEvents}
      />
    </main>
  );
}
