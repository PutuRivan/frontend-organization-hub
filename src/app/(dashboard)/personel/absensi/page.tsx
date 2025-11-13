import AttendanceForm from "@/components/dashboard/personel/absensi/attendance-form"

export const metadata = {
  title: "Absensi Kehadiran",
  description: "Silakan catat kehadiran Anda di sini.",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Absensi Kehadiran</h1>
          <p className="text-gray-600">Silakan catat kehadiran Anda di sini.</p>
        </div>

        <AttendanceForm />
      </div>
    </main>
  )
}
