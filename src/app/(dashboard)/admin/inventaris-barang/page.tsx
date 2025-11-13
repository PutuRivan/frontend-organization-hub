"use client";

import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AddItemDialog } from "@/components/dashboard/admin/inventaris-barang/add-item-dialog";
import { InventoryTable } from "@/components/dashboard/admin/inventaris-barang/inventory-table";
import SearchBar from "@/components/dashboard/admin/inventaris-barang/search-bar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
  quantity: number;
  quantity_description: string;
  category: string;
  location: string;
  description: string;
  image: string;
}

export default function Page() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5; // nilai tetap
  const token = getAccessTokenFromCookie();

  // ✅ Hapus itemsPerPage dari dependency karena nilainya tidak berubah
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
    [token] // hanya token yang bisa berubah
  );

  // 🔹 Ambil data ketika page berubah
  useEffect(() => {
    fetchInventory(currentPage);
  }, [fetchInventory, currentPage]);

  const handleAddItem = async (newItem: Omit<InventoryItem, "id">) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Gagal menambah barang");

      fetchInventory(currentPage);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${id}`, {
        method: "DELETE",
      });
      fetchInventory(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItem = async (
    id: string,
    updatedItem: Omit<InventoryItem, "id">
  ) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      fetchInventory(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

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
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Tambah Barang
          </Button>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-muted-foreground py-10">
            Memuat data...
          </p>
        ) : (
          <InventoryTable
            items={items}
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
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
                let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
                let endPage = startPage + visiblePages - 1;

                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(1, endPage - visiblePages + 1);
                }

                return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
                  (page) => (
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
                  )
                );
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

      {/* Dialog Add Item */}
      <AddItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddItem={handleAddItem}
      />
    </main>
  );
}
