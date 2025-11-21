"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ManageFilterContainer from "@/components/dashboard/admin/manajemen-personel/manage-filter-container";
import ManagePersonelPagination from "@/components/dashboard/admin/manajemen-personel/manage-personel-pagination";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Button } from "@/components/ui/button";
import { getAllPersonel } from "@/libs/apis";
import type { TUser } from "@/libs/types";
import { getAccessTokenFromCookie } from "@/libs/utils";
import ManagePersonelTable from "@/components/dashboard/admin/manajemen-personel/manage-personel-table";

export interface Personnel {
  id: string;
  name: string;
  position: string;
  status?: "Aktif" | "Nonaktif";
  avatar?: string;
}

export default function Page() {
  const [data, setData] = useState<TUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | "Aktif" | "Nonaktif">("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const UserPerPage = 10;
  const token = getAccessTokenFromCookie();

  const fetchUser = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const result = await getAllPersonel(token, page, UserPerPage);

      setData(result.data || []);
      setTotalItems(result.pagination.totalUser || 0);
      setTotalPages(result.pagination.totalPages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengambil data")
    } finally {
      setLoading(false)
    }
  }, [token]);

  // Filter data based on search query and status
  const filteredPersonnel = useMemo(() => {
    let filtered = data;

    // Filter by search query
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(normalizedQuery)
      );
    }

    // Filter by status
    if (statusFilter !== "Semua") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    return filtered;
  }, [data, searchQuery, statusFilter]);

  useEffect(() => {
    fetchUser(currentPage)
  }, [currentPage, fetchUser])

  // Calculate pagination
  const startIndex = (currentPage - 1) * UserPerPage + 1;
  const endIndex = Math.min(currentPage * UserPerPage, filteredPersonnel.length);
  const paginatedPersonnel = filteredPersonnel.slice(
    (currentPage - 1) * UserPerPage,
    currentPage * UserPerPage
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
        <ManagePersonelTable personnel={paginatedPersonnel} loading={loading} />

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
