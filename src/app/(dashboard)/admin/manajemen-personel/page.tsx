"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ManageFilterContainer from "@/components/dashboard/admin/manajemen-personel/manage-filter-container";
import ManagePersonelPagination from "@/components/dashboard/admin/manajemen-personel/manage-personel-pagination";
import ManagePersonelTable from "@/components/dashboard/admin/manajemen-personel/manage-personel-table";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Button } from "@/components/ui/button";
import { getAllPersonel } from "@/libs/apis";
import type { TUser } from "@/libs/types";
import { getAccessTokenFromCookie } from "@/libs/utils";

export default function Page() {
  const [data, setData] = useState<TUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "Semua" | "Aktif" | "Tidak_Aktif"
  >("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const UserPerPage = 10;
  const token = getAccessTokenFromCookie();

  const fetchUser = useCallback(
    async (page: number, name: string, status: string) => {
      try {
        setLoading(true);

        // Prepare filter parameters
        const statusParam = status === "Semua" ? "Aktif" : status;
        const nameParam = name.trim() || undefined;

        const result = await getAllPersonel(
          token,
          page,
          UserPerPage,
          statusParam,
          nameParam,
        );

        setData(result.data || []);
        setTotalItems(result.pagination.totalUser || 0);
        setTotalPages(result.pagination.totalPages || 1);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchUser(currentPage, searchQuery, statusFilter);
  }, [currentPage, searchQuery, statusFilter, fetchUser]);

  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title="Daftar Personel"
        description=" Kelola semua data personel yang terdaftar dalam sistem."
      >
        <Link href="/admin/manajemen-personel/tambah-personel-baru">
          <Button>
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
        <ManagePersonelTable
          personnel={data}
          loading={loading}
          token={token}
          pathname={pathname}
          fetchUser={() => fetchUser(currentPage, searchQuery, statusFilter)}
          currentPage={currentPage}
        />

        {/* Pagination Section */}
        <ManagePersonelPagination
          searchTerm={searchQuery}
          filteredItems={data}
          currentPage={currentPage}
          itemsPerPage={UserPerPage}
          totalItems={totalItems}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}
