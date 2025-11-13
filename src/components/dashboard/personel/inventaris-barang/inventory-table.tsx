import { Card } from "@/components/ui/card"
import { ConditionBadge } from "./condition-badge"

export interface InventoryItem {
  id: string
  name: string
  code: string
  category: string
  location: string
  dateAdded: string
  condition: "Baik" | "Perlu Perbaikan" | "Rusak"
}

interface InventoryTableProps {
  data: InventoryItem[]
}

export function InventoryTable({ data }: InventoryTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">NAMA BARANG</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">KODE ASET</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">KATEGORI</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">LOKASI</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">TANGGAL MASUK</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">KONDISI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.code}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.dateAdded}</td>
                <td className="px-6 py-4 text-sm">
                  <ConditionBadge condition={item.condition} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
