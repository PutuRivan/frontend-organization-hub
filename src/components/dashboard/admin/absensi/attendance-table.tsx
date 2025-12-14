import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TAttandance } from "@/libs/types";
import { formatDateTime, getAttendanceStatus } from "@/libs/utils";

interface AttendanceTableProps {
  data: TAttandance[];
}

export default function AttendanceTable({ data }: AttendanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>Nama Personel</TableHead>
          <TableHead>jabatan</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
              Tidak ada data kehadiran
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.user.name}</TableCell>
              <TableCell>
                {item.user.jabatan}
              </TableCell>
              <TableCell>{formatDateTime(item.date, "LONG_DATE")}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getAttendanceStatus(item.status).className}
                >
                  {getAttendanceStatus(item.status).label}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
