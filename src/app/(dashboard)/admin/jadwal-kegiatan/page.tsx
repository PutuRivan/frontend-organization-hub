"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import AddEventDialog from "@/components/dashboard/admin/jadwal-kegiatan/add-event-dialog";
import EventCalendarHeader from "@/components/dashboard/admin/jadwal-kegiatan/event-calendar-header";
import EventCalendarGrid from "@/components/dashboard/admin/jadwal-kegiatan/event-calender-grid";
import EventList from "@/components/dashboard/admin/jadwal-kegiatan/event-list";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [view, setView] = useState<"calendar" | "list">("calendar");
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
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Cari kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs
          value={view}
          onValueChange={(v) => setView(v as "calendar" | "list")}
        >
          <TabsList>
            <TabsTrigger value="calendar">Tampilan Kalender</TabsTrigger>
            <TabsTrigger value="list">Tampilan Daftar</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <Card className="p-6">
        {view === "calendar" ? (
          <>
            {/* Calendar Header */}
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
          </>
        ) : (
          <EventList events={filteredEvents} />
        )}
      </Card>

      <AddEventDialog
        open={showAddEvent}
        onOpenChange={setShowAddEvent}
        onAddEvent={handleAddEvent}
      />
    </main>
  );
}
