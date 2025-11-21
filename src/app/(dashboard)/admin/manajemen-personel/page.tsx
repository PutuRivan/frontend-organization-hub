"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import ManageFilterContainer from "@/components/dashboard/admin/manajemen-personel/manage-filter-container";
import PersonnelPagination from "@/components/dashboard/admin/manajemen-personel/manage-personel-pagination";
import ManagePersonelPagination from "@/components/dashboard/admin/manajemen-personel/manage-personel-pagination";
import PersonnelTable from "@/components/dashboard/admin/manajemen-personel/personnel-table";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Button } from "@/components/ui/button";

export interface Personnel {
  id: string;
  name: string;
  position: string;
  status: "Aktif" | "Nonaktif";
  avatar?: string;
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
];

const ITEMS_PER_PAGE = 4;

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "Semua" | "Aktif" | "Nonaktif"
  >("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPersonnel = useMemo(() => {
    return MOCK_PERSONNEL.filter((person) => {
      const matchesSearch = person.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "Semua" || person.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredPersonnel.length / ITEMS_PER_PAGE);
  const paginatedPersonnel = filteredPersonnel.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredPersonnel.length,
  );

  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title="Daftar Personel"
        description=" Kelola semua data personel yang terdaftar dalam sistem."
      >
        <Link href="/admin/manajemen-personel/tambah-personel-baru">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Tambah Personel Baru
          </Button>
        </Link>
      </HeaderContent>

      <div className="mt-8 space-y-6">
        {/* Search and Filter Section */}
        <ManageFilterContainer
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          setCurrentPage={setCurrentPage}
          setSearchQuery={setSearchQuery}
          setStatusFilter={setStatusFilter}
        />

        {/* Table Section */}
        <PersonnelTable personnel={paginatedPersonnel} />

        {/* Pagination Section */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Menampilkan {startIndex}-{endIndex} dari {filteredPersonnel.length}{" "}
            personel
          </span>
          <ManagePersonelPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
