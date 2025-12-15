"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderContent from "@/components/dashboard/base/header-content";
import { InfoCards } from "@/components/dashboard/personel/dashboard/info-card";
import { ScheduleTable } from "@/components/dashboard/personel/dashboard/schedule-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { countTable } from "@/libs/apis";
import { formatDateTime, getAccessTokenFromCookie } from "@/libs/utils";

export default function Home() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const token = getAccessTokenFromCookie();

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      const result = await countTable(token);
      setDashboardData(result?.data);
    };
    fetchData();
  }, [token]);

  const eventMapper = {
    name: dashboardData?.upcomingEvents[0]?.name,
    start_datetime: formatDateTime(dashboardData?.upcomingEvents[0]?.start_datetime, "LONG_DATE_TIME"),
    end_datetime: formatDateTime(dashboardData?.upcomingEvents[0]?.end_datetime, "LONG_DATE_TIME"),
    place: dashboardData?.upcomingEvents[0]?.place,
    leader: dashboardData?.upcomingEvents[0]?.leader,
    category: dashboardData?.upcomingEvents[0]?.category,
    dress_code: dashboardData?.upcomingEvents[0]?.dress_code,
    created_by: dashboardData?.upcomingEvents[0]?.created_by,
    description: dashboardData?.upcomingEvents[0]?.description,
    image: dashboardData?.upcomingEvents[0]?.image,
    updated_by: dashboardData?.upcomingEvents[0]?.updated_by,
    created_at: dashboardData?.upcomingEvents[0]?.created_at,
    updated_at: dashboardData?.upcomingEvents[0]?.updated_at,
    id: dashboardData?.upcomingEvents[0]?.id,
  }

  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title={`Selamat Datang ${user?.name}`}
        description="Berikut adalah ringkasan aktivitas Anda hari ini."
      />

      <InfoCards
        user={user}
        events={eventMapper}
      />

      <HeaderContent
        title={`Jadwal Kegiatan Minggu Ini`}
        description="Daftar Kegiatan yang akan datang."
      >
        <Link href="/personel/jadwal-kegiatan">
          <Button>Lihat Semua Jadwal</Button>
        </Link>
      </HeaderContent>
      <ScheduleTable events={dashboardData?.upcomingEvents ?? []} />
    </main>
  );
}
