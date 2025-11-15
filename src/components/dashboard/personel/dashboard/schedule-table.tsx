import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ScheduleTable() {
  const schedules = [
    {
      date: "Senin, 20 Mei 2024",
      activity: "Rapat Koordinasi Tim",
      time: "10:00 - 11:30 WIB",
      location: "Ruang Rapat A",
    },
    {
      date: "Selasa, 21 Mei 2024",
      activity: "Sesi Pelatihan Produk Baru",
      time: "14:00 - 16:00 WIB",
      location: "Auditorium",
    },
    {
      date: "Rabu, 22 Mei 2024",
      activity: "Presentasi Klien",
      time: "09:00 - 10:00 WIB",
      location: "Online (Zoom)",
    },
    {
      date: "Jumat, 24 Mei 2024",
      activity: "Diskusi Proyek Mingguan",
      time: "15:00 - 16:00 WIB",
      location: "Ruang Diskusi C",
    },
  ]

  return (
    <Card className="border border-border">
      <CardHeader>
        <div>
          <CardTitle className="text-2xl font-bold mb-1">Jadwal Kegiatan Minggu Ini</CardTitle>
          <p className="text-muted-foreground">Daftar kegiatan yang akan datang.</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">HARI/TANGGAL</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">NAMA KEGIATAN</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">WAKTU</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">LOKASI</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, idx) => (
                <tr key={idx} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-foreground font-medium">{schedule.date}</td>
                  <td className="py-4 px-4 text-muted-foreground">{schedule.activity}</td>
                  <td className="py-4 px-4 text-muted-foreground">{schedule.time}</td>
                  <td className="py-4 px-4 text-muted-foreground">{schedule.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            href="/personel/jadwal-kegiatan" >
            <Button className="flex items-center gap-2">
                Lihat Semua Jadwal
                <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
