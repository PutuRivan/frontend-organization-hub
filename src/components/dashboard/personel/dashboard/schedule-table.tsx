import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TEvent } from "@/libs/types";
import { formatDateTime } from "@/libs/utils";

interface ScheduleTableProps {
  events: TEvent[];
}

export function ScheduleTable({ events }: ScheduleTableProps) {
  const schedules = events;

  return (
    <Card className="border border-border">
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead>HARI/TANGGAL</TableHead>
              <TableHead>NAMA KEGIATAN</TableHead>
              <TableHead>WAKTU</TableHead>
              <TableHead>LOKASI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule, idx) => (
              <TableRow key={idx}>
                <TableCell>{formatDateTime(schedule.start_datetime.toString())}</TableCell>
                <TableCell>{schedule.name}</TableCell>
                <TableCell>{formatDateTime(schedule.end_datetime.toString())}</TableCell>
                <TableCell>{schedule.place}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
