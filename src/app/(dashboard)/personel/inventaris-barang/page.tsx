"use client"

import { useState } from "react"
import { InventoryHeader } from "@/components/dashboard/personel/inventaris-barang/inventory-header"
import { InventoryFilters } from "@/components/dashboard/personel/inventaris-barang/inventory-filters"
import { InventoryTable } from "@/components/dashboard/personel/inventaris-barang/inventory-table"
import { InventoryPagination } from "@/components/dashboard/personel/inventaris-barang/inventory-pagination"
import type { InventoryItem } from "@/components/dashboard/personel/inventaris-barang"

const inventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Laptop Dell XPS 15",
    code: "AST-2023-001",
    category: "Elektronik",
    location: "Gudang A",
    dateAdded: "2023-01-15",
    condition: "Baik",
  },
  {
    id: "2",
    name: "Proyektor Epson EB-S41",
    code: "AST-2023-002",
    category: "Elektronik",
    location: "Ruang Meeting Lt. 2",
    dateAdded: "2023-02-20",
    condition: "Perlu Perbaikan",
  },
  {
    id: "3",
    name: "Kursi Kantor Ergonomis",
    code: "AST-2023-003",
    category: "Furnitur",
    location: "Area Kerja",
    dateAdded: "2023-03-10",
    condition: "Baik",
  },
  {
    id: "4",
    name: "Keyboard Mechanical",
    code: "AST-2023-004",
    category: "Aksesoris Komputer",
    location: "Stok Gudang B",
    dateAdded: "2023-04-05",
    condition: "Rusak",
  },
  {
    id: "5",
    name: "Whiteboard Magnetik",
    code: "AST-2023-005",
    category: "Perlengkapan Kantor",
    location: "Ruang Diskusi",
    dateAdded: "2023-05-12",
    condition: "Baik",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("Semua Kondisi")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCondition = selectedCondition === "Semua Kondisi" || item.condition === selectedCondition
    return matchesSearch && matchesCondition
  })

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition)
    setCurrentPage(1)
  }

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <InventoryHeader />
        <InventoryFilters
          onSearchChange={handleSearchChange}
          onConditionChange={handleConditionChange}
          selectedCondition={selectedCondition}
        />
        <InventoryTable data={paginatedData} />
        <InventoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsShowing={paginatedData.length}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  )
}
