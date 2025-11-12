import type { InventoryItem } from "@/app/page"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface InventoryTableProps {
  items: InventoryItem[]
  onDelete: (id: string) => void
  onEdit: (id: string, item: Omit<InventoryItem, "id">) => void
}

export function InventoryTable({ items, onDelete }: InventoryTableProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Baik":
        return "bg-green-100 text-green-800"
      case "Rusak Ringan":
        return "bg-yellow-100 text-yellow-800"
      case "Rusak":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="font-semibold">Nama Barang</TableHead>
            <TableHead className="font-semibold">Jumlah</TableHead>
            <TableHead className="font-semibold">Kondisi</TableHead>
            <TableHead className="font-semibold">Lokasi</TableHead>
            <TableHead className="font-semibold text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-b border-border hover:bg-muted/50">
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Badge className={getConditionColor(item.condition)}>{item.condition}</Badge>
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

