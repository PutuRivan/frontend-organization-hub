import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    {
      date: "Jumat, 24 Mei 2024",
      activity: "Diskusi Proyek Mingguan",
      time: "15:00 - 16:00 WIB",
      location: "Ruang Diskusi C",
    },
  ];

  return (
    <Card className="border border-border">
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead>
                HARI/TANGGAL
              </TableHead>
              <TableHead>
                NAMA KEGIATAN
              </TableHead>
              <TableHead>
                WAKTU
              </TableHead>
              <TableHead>
                LOKASI
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule, idx) => (
              <TableRow
                key={idx}
              >
                <TableCell>
                  {schedule.date}
                </TableCell>
                <TableCell>
                  {schedule.activity}
                </TableCell>
                <TableCell>
                  {schedule.time}
                </TableCell>
                <TableCell>
                  {schedule.location}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
