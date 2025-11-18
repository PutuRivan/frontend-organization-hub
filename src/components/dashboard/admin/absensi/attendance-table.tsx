import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAttendanceStatus } from '@/libs/utils'

interface AttendanceTableProps {
  sampleData: any
}

export default function AttendanceTable({ sampleData }: AttendanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>NAMA PERSONEL</TableHead>
          <TableHead>JABATAN</TableHead>
          <TableHead>TANGGAL</TableHead>
          <TableHead>STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {item.position}
            </TableCell>
            <TableCell>{item.date}</TableCell>
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
  )
}
