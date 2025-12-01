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
import { getAllEvents } from "@/libs/apis";
import { getAccessTokenFromCookie } from "@/libs/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    position: string;
  };
}

interface EventForCalendar {
  id: string;
  title: string;
  date: Date;
  category: "meeting" | "presentation" | "deadline";
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
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
  const calendarEvents: EventForCalendar[] = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      date: new Date(event.start_datetime),
      category: "meeting" as const, // Default category, can be enhanced later
    }));
  }, [events]);

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month, 1));
  };

  const handleAddEvent = (title: string, date: Date, category: string) => {
    // TODO: Implement API call to create event
    console.log("Add event:", { title, date, category });
    setShowAddEvent(false);
    // Refresh events after adding
    fetchEvents();
  };

  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title="Kalender Kegiatan"
        description="Kelola semua kegiatan dan rapat di satu tempat."
      >
        <Button
          onClick={() => setShowAddEvent(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
          size="lg"
        >
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
        onOpenChange={setShowAddEvent}
        onAddEvent={handleAddEvent}
      />
    </main>
  );
}
