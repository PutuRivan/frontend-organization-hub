"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import InventoryPagination from "@/components/dashboard/admin/inventaris-barang/inventory-pagination";
import InventoryTable from "@/components/dashboard/admin/inventaris-barang/inventory-table";
import SearchBar from "@/components/dashboard/admin/inventaris-barang/search-bar";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Button } from "@/components/ui/button";
import { getInventory } from "@/libs/apis";
import type { TInventory } from "@/libs/types";
import { getAccessTokenFromCookie } from "@/libs/utils";

export default function InventoryPage() {
  const [items, setItems] = useState<TInventory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const itemsPerPage = 10;
  const token = getAccessTokenFromCookie();

  const fetchInventory = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const result = await getInventory(token, page, itemsPerPage);

        setItems(result.data || []);
        setTotalItems(result.pagination?.totalItems || 0);
        setTotalPages(result.pagination?.totalPages || 1);
      } catch (err) {
        console.error(err);
        toast.error("Terjadi Kesalahan saat Mengambil Data");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchInventory(currentPage);
  }, [fetchInventory, currentPage]);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    const normalizedQuery = searchTerm.toLowerCase();
    return items.filter((item) =>
      item.item_name.toLowerCase().includes(normalizedQuery),
    );
  }, [items, searchTerm]);

  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title="Inventaris Barang"
        description="Lihat dan kelola daftar inventaris yang tersedia."
      />
      {/* Search & Add */}
      <div className="mb-6 flex justify-between">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Link href={"inventaris-barang/create"}>
          <Button>
            <Plus className="h-4 w-4" />
            Tambah Barang
          </Button>
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-muted-foreground py-10">
          Memuat data...
        </p>
      ) : (
        <InventoryTable
          items={filteredItems}
          pathname={pathname}
          token={token}
          fetchInventory={fetchInventory}
          page={currentPage}
        />
      )}

      {/* Pagination Info */}
      <InventoryPagination
        currentPage={currentPage}
        filteredItems={filteredItems}
        itemsPerPage={itemsPerPage}
        searchTerm={searchTerm}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </main>
  );
}
