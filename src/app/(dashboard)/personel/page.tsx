import { DashboardHeader } from "@/components/dashboard/personel/Landing-Page/dashboard-header"
import { InfoCards } from "@/components/dashboard/personel/Landing-Page/info-card"
import { ScheduleTable } from "@/components/dashboard/personel/Landing-Page/schedule-table"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <DashboardHeader />
        <InfoCards />
        <ScheduleTable />
      </div>
    </main>
  )
}
