import { Suspense } from "react";
import { AttendanceReport } from "@/components/dashboard/admin/absensi/attendance-report";
import HeaderContent from "@/components/dashboard/base/header-content";

export default function Page() {
  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title="Rekap Kehadiran Personel"
        description="Lihat dan kelola rekapitulasi kehadiran seluruh personel."
      />
      <Suspense fallback={<div>Loading...</div>}>
        <AttendanceReport />
      </Suspense>
    </main>
  )
}
