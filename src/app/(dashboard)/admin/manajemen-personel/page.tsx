"use client"

import { useState, useMemo } from "react"
import PersonnelHeader from "@/components/dashboard/admin/manajemen-personel/personnel-header"
import PersonnelTable from "@/components/dashboard/admin/manajemen-personel/personnel-table"
import PersonnelPagination from "@/components/dashboard/admin/manajemen-personel/personnel-pagination"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export interface Personnel {
  id: string
  name: string
  position: string
  status: "Aktif" | "Nonaktif"
  avatar?: string
}

const MOCK_PERSONNEL: Personnel[] = [
  {
    id: "1",
    name: "Budi Santoso",
    position: "Manajer Proyek",
    status: "Aktif",
  },
  {
    id: "2",
    name: "Citra Lestari",
    position: "Frontend Developer",
    status: "Aktif",
  },
  {
    id: "3",
    name: "Agung Wijaya",
    position: "Backend Developer",
    status: "Nonaktif",
  },
  {
    id: "4",
    name: "Dewi Anggraini",
    position: "UI/UX Designer",
    status: "Aktif",
  },
  {
    id: "5",
    name: "Ajeng Putri",
    position: "Project Manager",
    status: "Aktif",
  },
  {
    id: "6",
    name: "Hendra Kusuma",
    position: "QA Engineer",
    status: "Aktif",
  },
  {
    id: "7",
    name: "Siti Nurhaliza",
    position: "DevOps Engineer",
    status: "Nonaktif",
  },
  {
    id: "8",
    name: "Bambang Irawan",
    position: "Data Analyst",
    status: "Aktif",
  },
  {
    id: "9",
    name: "Maya Sari",
    position: "Product Designer",
    status: "Aktif",
  },
  {
    id: "10",
    name: "Rudi Hermawan",
    position: "System Administrator",
    status: "Aktif",
  },
  {
    id: "11",
    name: "Lina Wijaya",
    position: "Business Analyst",
    status: "Aktif",
  },
  {
    id: "12",
    name: "Doni Sutrisno",
    position: "Technical Lead",
    status: "Nonaktif",
  },
]

const ITEMS_PER_PAGE = 4

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"Semua" | "Aktif" | "Nonaktif">("Semua")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPersonnel = useMemo(() => {
    return MOCK_PERSONNEL.filter((person) => {
      const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "Semua" || person.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const totalPages = Math.ceil(filteredPersonnel.length / ITEMS_PER_PAGE)
  const paginatedPersonnel = filteredPersonnel.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredPersonnel.length)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <PersonnelHeader />

        <div className="mt-8 space-y-6">
          {/* Search and Filter Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari personel berdasarkan nama..."
                  className="pl-10 bg-secondary"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select
                value={statusFilter}
                onValueChange={(value: any) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Status: Semua</SelectItem>
                  <SelectItem value="Aktif">Status: Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Status: Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Section */}
          <PersonnelTable personnel={paginatedPersonnel} />

          {/* Pagination Section */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Menampilkan {startIndex}-{endIndex} dari {filteredPersonnel.length} personel
            </span>
            <PersonnelPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </main>
  )
}
