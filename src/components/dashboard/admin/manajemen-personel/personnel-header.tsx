import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PersonnelHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Daftar Personel</h1>
        <p className="mt-1 text-muted-foreground">Kelola semua data personel yang terdaftar dalam sistem.</p>
      </div>
      <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
        <Plus className="h-4 w-4" />
        Tambah Personel Baru
      </Button>
    </div>
  )
}
