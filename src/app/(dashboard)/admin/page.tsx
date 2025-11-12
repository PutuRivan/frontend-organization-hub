import { AttendanceChart } from "@/components/dashboard/admin/home/attendance-chart";
import { DashboardStats } from "@/components/dashboard/admin/home/dashboard-stats";
import { InventorySummary } from "@/components/dashboard/admin/home/inventory-summary";
import { UpcomingActivities } from "@/components/dashboard/admin/home/upcoming-activities";

export default function page() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Selamat datang di dashboard admin</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Charts and Activities */}
        <div className="grid gap-6 lg:grid-cols-3 mt-6">
          {/* Left Column - Attendance Chart */}
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>

          {/* Right Column - Activities and Inventory */}
          <div className="space-y-6">
            <UpcomingActivities />
            <InventorySummary />
          </div>
        </div>
      </div>
    </main>
  );
}
