import AttendanceChart from "@/components/dashboard/admin/home/attendance-chart";
import DashboardStats from "@/components/dashboard/admin/home/dashboard-stats";
import InventorySummary from "@/components/dashboard/admin/home/inventory-summary";
import UpcomingActivities from "@/components/dashboard/admin/home/upcoming-activities";

export default function page() {
  return (
    <main className="min-h-screen p-10">
      <div className="mx-auto max-w-7xl">
        <DashboardStats />
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          <UpcomingActivities />
          <InventorySummary />
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>
        </div>
      </div>
    </main>
  );
}
