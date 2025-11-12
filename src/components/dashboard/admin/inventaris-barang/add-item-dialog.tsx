import type React from "react"
import { useState } from "react"
import type { InventoryItem } from "@/app/(dashboard)/admin/inventaris-barang/page"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddItem: (item: Omit<InventoryItem, "id">) => void
}

export function AddItemDialog({ open, onOpenChange, onAddItem }: AddItemDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    condition: "Baik" as InventoryItem["condition"],
    location: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.quantity && formData.location) {
      onAddItem({
        name: formData.name,
        quantity: Number.parseInt(formData.quantity),
        condition: formData.condition,
        location: formData.location,
      })
      setFormData({
        name: "",
        quantity: "",
        condition: "Baik",
        location: "",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Barang Baru</DialogTitle>
          <DialogDescription>Masukkan informasi lengkap untuk menambahkan item baru ke inventaris.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Barang</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Masukkan nama barang"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="quantity">Jumlah</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="Masukkan jumlah"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="condition">Kondisi</Label>
            <Select
              value={formData.condition}
              onValueChange={(value: any) => setFormData({ ...formData, condition: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baik">Baik</SelectItem>
                <SelectItem value="Rusak Ringan">Rusak Ringan</SelectItem>
                <SelectItem value="Rusak">Rusak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Masukkan lokasi penyimpanan"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Tambah Barang
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
