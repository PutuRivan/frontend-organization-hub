"use client";

import Link from "next/link";
import HeaderContent from "@/components/dashboard/base/header-content";
import { InfoCards } from "@/components/dashboard/personel/dashboard/info-card";
import { ScheduleTable } from "@/components/dashboard/personel/dashboard/schedule-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function Home() {
  const { user } = useAuth();
  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title={`Selamat Datang ${user?.name}`}
        description="Berikut adalah ringkasan aktivitas Anda hari ini."
      />

      <InfoCards />

      <HeaderContent
        title={`Jadwal Kegiatan Minggu Ini`}
        description="Daftar Kegiatan yang akan datang."
      >
        <Link href="/personel/jadwal-kegiatan">
          <Button>
            Lihat Semua Jadwal
          </Button>
        </Link>
      </HeaderContent>
      <ScheduleTable />
    </main>
  );
}
