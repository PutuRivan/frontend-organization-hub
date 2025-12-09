"use client";

import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import EventAddDialog from "@/components/dashboard/admin/jadwal-kegiatan/event-add-dialog";
import EventCalendarHeader from "@/components/dashboard/admin/jadwal-kegiatan/event-calendar-header";
import EventCalendarGrid from "@/components/dashboard/admin/jadwal-kegiatan/event-calender-grid";
import EventFilterContainer from "@/components/dashboard/admin/jadwal-kegiatan/event-filter-container";
import EventList from "@/components/dashboard/admin/jadwal-kegiatan/event-list";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCalendarView } from "@/hooks/use-calendar-view";
import { getAllEvents } from "@/libs/apis";
import type { TEvent } from "@/libs/types";
import { getAccessTokenFromCookie } from "@/libs/utils";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const {
    currentDate,
    handleNextMonth,
    handlePreviousMonth,
    handleToday,
    handleDateChange,
  } = useCalendarView();
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
      <HeaderContent
        title="Kalender Kegiatan"
        description="Kelola semua kegiatan dan rapat di satu tempat."
      >
        <Button onClick={() => setShowAddEvent(true)} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Tambah Kegiatan
        </Button>
      </HeaderContent>

      {/* Search and Tabs */}
      <EventFilterContainer
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Tampilan Kalender</TabsTrigger>
          <TabsTrigger value="list">Tampilan Daftar</TabsTrigger>
        </TabsList>

        {/* Content */}
        <Card className="p-6">
          {loading ? (
            <p className="text-center py-6">Memuat data...</p>
          ) : (
            <>
              <TabsContent value="calendar">
                <EventCalendarHeader
                  currentDate={currentDate}
                  handleNextMonth={handleNextMonth}
                  handlePreviousMonth={handlePreviousMonth}
                  handleToday={handleToday}
                  onDateChange={handleDateChange}
                />

                {/* Calendar Grid */}
                <EventCalendarGrid
                  currentDate={currentDate}
                  events={calendarEvents}
                />
              </TabsContent>

              <TabsContent value="list">
                <EventList events={calendarEvents} />
              </TabsContent>
            </>
          )}
        </Card>
      </Tabs>

      <EventAddDialog
        open={showAddEvent}
        token={token}
        onOpenChange={setShowAddEvent}
        onSuccess={fetchEvents}
      />
    </main>
  );
}
