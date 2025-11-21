"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import EventCalendarHeader from "@/components/dashboard/admin/jadwal-kegiatan/event-calendar-header";
import EventCalendarGrid from "@/components/dashboard/admin/jadwal-kegiatan/event-calender-grid";
import EventList from "@/components/dashboard/admin/jadwal-kegiatan/event-list";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventFilterContainer from "@/components/dashboard/admin/jadwal-kegiatan/event-filter-container";
import EventAddDialog from "@/components/dashboard/admin/jadwal-kegiatan/event-add-dialog";

interface Event {
  id: string;
  title: string;
  date: Date;
  category: "meeting" | "presentation" | "deadline";
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 11, 1));
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Rapat Tim",
      date: new Date(2023, 11, 6),
      category: "meeting",
    },
    {
      id: "2",
      title: "Presentasi Klien",
      date: new Date(2023, 11, 6),
      category: "presentation",
    },
    {
      id: "3",
      title: "Project Deadline",
      date: new Date(2023, 11, 21),
      category: "deadline",
    },
  ]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [events, searchQuery]);

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

  const handleAddEvent = (title: string, date: Date, category: string) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      date,
      category: category as "meeting" | "presentation" | "deadline",
    };
    setEvents([...events, newEvent]);
    setShowAddEvent(false);
  };

  const monthName = currentDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

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
          <TabsContent value="calendar">
            <EventCalendarHeader
              handleNextMonth={handleNextMonth}
              handlePreviousMonth={handlePreviousMonth}
              handleToday={handleToday}
              monthName={monthName}
            />

            {/* Calendar Grid */}
            <EventCalendarGrid
              currentDate={currentDate}
              events={filteredEvents}
            />
          </TabsContent>

          <TabsContent value="list">
            <EventList events={filteredEvents} />
          </TabsContent>
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
