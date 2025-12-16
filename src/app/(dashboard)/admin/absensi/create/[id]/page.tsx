import { cookies } from "next/headers";
import AttendanceForm from "@/components/dashboard/admin/absensi/attendance-form";
import { getPersonelById } from "@/libs/apis";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const { id } = await params;
  const personel = await getPersonelById(token ?? "", id);
    return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Absensi Kehadiran
          </h1>
          <p className="text-gray-600">Silakan catat kehadiran Anda di sini.</p>
        </div>

        <AttendanceForm user={personel.data} />
      </div>
    </main>
  );
}
