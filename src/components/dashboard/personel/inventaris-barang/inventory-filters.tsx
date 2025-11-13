"use client"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"

interface InventoryFiltersProps {
  onSearchChange: (term: string) => void
  onConditionChange: (condition: string) => void
  selectedCondition: string
}

const CONDITIONS = ["Semua Kondisi", "Baik", "Perlu Perbaikan", "Rusak"]

export function InventoryFilters({ onSearchChange, onConditionChange, selectedCondition }: InventoryFiltersProps) {
  return (
    <Card className="mb-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari nama barang..." className="pl-10" onChange={(e) => onSearchChange(e.target.value)} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              {selectedCondition}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {CONDITIONS.map((condition) => (
              <DropdownMenuItem
                key={condition}
                onClick={() => {
                  onConditionChange(condition)
                }}
              >
                {condition}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}
