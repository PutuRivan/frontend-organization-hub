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
  console.log(data)
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
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.user.name}</TableCell>
            <TableCell className="font-medium">
              {item.user.position}
            </TableCell>
            <TableCell>{formatDateTime(item.date)}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={getAttendanceStatus(item.status).className}
              >
                {getAttendanceStatus(item.status).label}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
