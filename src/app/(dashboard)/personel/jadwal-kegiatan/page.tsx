'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarSidebar from '@/components/dashboard/personel/jadwal-kegiatan/calendar-sidebar';
import EventCard from '@/components/dashboard/personel/jadwal-kegiatan/event-card';
import EmptyState from '@/components/dashboard/personel/jadwal-kegiatan/empty-state';

type EventType = 'semua' | 'rapat' | 'pelatihan' | 'workshop';

interface Event {
  id: string;
  date: number;
  month: string;
  time: string;
  type: 'Rapat' | 'Pelatihan' | 'Workshop';
  title: string;
  description: string;
}

const events: Event[] = [
  {
    id: '1',
    date: 15,
    month: 'Juli',
    time: '10:00 WIB',
    type: 'Rapat',
    title: 'Rapat Koordinasi Tim Marketing',
    description: 'Membahas strategi kampanye Q3 dan alokasi anggaran.',
  },
  {
    id: '2',
    date: 22,
    month: 'Juli',
    time: '09:00 WIB',
    type: 'Pelatihan',
    title: 'Pelatihan Desain Produk Dasar',
    description: 'Sesi pelatihan dasar untuk anggota tim baru.',
  },
  {
    id: '3',
    date: 28,
    month: 'Juli',
    time: '14:00 WIB',
    type: 'Workshop',
    title: 'Workshop Fotografi Mobile',
    description:
      'Pempelajari teknik-teknik dasar fotografi hanya dengan menggunakan smartphone.',
  },
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<EventType>('semua');

  const filteredEvents =
    selectedFilter === 'semua'
      ? events
      : events.filter((event) => event.type.toLowerCase() === selectedFilter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Jadwal Kegiatan Anda</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Kiri: Filter + Events */}
          <div className="flex-1 lg:max-w-3xl">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant={selectedFilter === 'semua' ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  selectedFilter === 'semua' ? 'bg-blue-500 hover:bg-blue-600' : ''
                }`}
                onClick={() => setSelectedFilter('semua')}
              >
                Juli 2024
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedFilter === 'semua' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('semua')}
                className={selectedFilter === 'semua' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                Semua
              </Button>
              <Button
                variant={selectedFilter === 'rapat' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('rapat')}
                className={selectedFilter === 'rapat' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                Rapat
              </Button>
              <Button
                variant={selectedFilter === 'pelatihan' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('pelatihan')}
                className={selectedFilter === 'pelatihan' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                Pelatihan
              </Button>
              <Button
                variant={selectedFilter === 'workshop' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('workshop')}
                className={selectedFilter === 'workshop' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                Workshop
              </Button>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          {/* Kanan: Kalender */}
          <div className="lg:w-[500px] mt-17">
            <CalendarSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
