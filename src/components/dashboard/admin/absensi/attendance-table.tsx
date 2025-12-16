import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttendanceStatus } from "@/libs/utils";

interface AttendanceTableProps {
  data: any[];
}

export default function AttendanceTable({ data }: AttendanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>Nama Personel</TableHead>
          <TableHead>jabatan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center py-4 text-muted-foreground"
            >
              Tidak ada data kehadiran
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => {
            const attendanceStatus =
              item.status === "Hadir"
                ? "Hadir"
                : item.AbsentReason
                  ? item.AbsentReason
                  : "Default";

            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.jabatan}</TableCell>
                {/* <TableCell>{formatDateTime(item., "LONG_DATE")}</TableCell> */}
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getAttendanceStatus(attendanceStatus).className}
                  >
                    {getAttendanceStatus(attendanceStatus).label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {!attendanceStatus && (
                    <Link href={`/admin/absensi/create/${item.id}`}>
                      <Button variant="link" size="icon">
                        <Pencil />
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
