"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { InventoryTable } from "@/components/dashboard/admin/inventaris-barang/inventory-table";
import SearchBar from "@/components/dashboard/admin/inventaris-barang/search-bar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getInventory } from "@/libs/apis";
import { getAccessTokenFromCookie } from "@/libs/utils";

export interface InventoryItem {
  id: string;
  item_name: string;
  item_code?: string;
  quantity: number;
  quantity_description: string;
  category: string;
  location: string;
  description: string;
  image: string;
  updated_at?: string;
}

export default function Page() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const itemsPerPage = 10; // nilai tetap
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
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchInventory(currentPage);
  }, [fetchInventory, currentPage]);

  return (
    <main className="min-h-screen bg-background">
      <div className="px-5">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Daftar Barang</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau semua item inventaris Anda di satu tempat.
          </p>
        </div>

        {/* Search & Add */}
        <div className="mb-6 flex justify-between">
          <SearchBar />
          <Link href={"inventaris-barang/create"}>
            <Button
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
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
            items={items}
            pathname={pathname}
            token={token}
            fetchInventory={fetchInventory}
            page={currentPage}
          />
        )}

        {/* Pagination Info */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-muted-foreground w-full">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            items
          </p>

          {/* Pagination */}
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(Math.max(1, currentPage - 1));
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {(() => {
                const visiblePages = 5; // jumlah halaman yang ingin ditampilkan
                let startPage = Math.max(
                  1,
                  currentPage - Math.floor(visiblePages / 2),
                );
                let endPage = startPage + visiblePages - 1;

                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(1, endPage - visiblePages + 1);
                }

                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i,
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ));
              })()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
