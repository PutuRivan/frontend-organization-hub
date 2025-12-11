import { cookies } from "next/headers";
import AttendanceChart from "@/components/dashboard/admin/home/attendance-chart";
import DashboardStats from "@/components/dashboard/admin/home/dashboard-stats";
import InventorySummary from "@/components/dashboard/admin/home/inventory-summary";
import UpcomingActivities from "@/components/dashboard/admin/home/upcoming-activities";
import { countTable } from "@/libs/apis";

export default async function page() {
  const token = (await cookies()).get("access_token")?.value;
  const result = await countTable(token ?? "");
  const dashboardData = result?.data;

  // Prepare data for components
  const countData = {
    user: dashboardData?.summary?.totalPersonel ?? 0,
    inventory: dashboardData?.summary?.totalInventoryItems ?? 0,
    events: dashboardData?.upcomingEvents?.length ?? 0,
  };

  return (
    <main className="px-5">
      <div className="mx-auto max-w-7xl">
        <DashboardStats countData={countData} />
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          <UpcomingActivities events={dashboardData?.upcomingEvents ?? []} />
          <InventorySummary inventoryData={dashboardData?.inventory} />
          <div className="lg:col-span-2">
            <AttendanceChart attendanceData={dashboardData?.attendance} />
          </div>
        </div>
      </div>
    </main>
  );
}
