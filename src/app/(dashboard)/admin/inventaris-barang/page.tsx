"use client";
import { useState } from "react";
import { Header } from "@/components/dashboard/admin/inventaris-barang/header";
import { InventoryTable } from "@/components/dashboard/admin/inventaris-barang/inventory-table";
import { AddItemDialog } from "@/components/dashboard/admin/inventaris-barang/add-item-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  condition: "Baik" | "Rusak Ringan" | "Rusak";
  location: string;
}

export default function Page() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Laptop Pro 15",
      quantity: 25,
      condition: "Baik",
      location: "Gudang A",
    },
    {
      id: "2",
      name: "Monitor UltraWide",
      quantity: 40,
      condition: "Baik",
      location: "Gudang B",
    },
    {
      id: "3",
      name: "Keyboard Mekanikal",
      quantity: 15,
      condition: "Rusak Ringan",
      location: "Ruang Servis",
    },
    {
      id: "4",
      name: "Mouse Wireless",
      quantity: 50,
      condition: "Baik",
      location: "Gudang A",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = 38;

  const handleAddItem = (newItem: Omit<InventoryItem, "id">) => {
    const item: InventoryItem = {
      ...newItem,
      id: Date.now().toString(),
    };
    setItems([...items, item]);
    setIsDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (
    id: string,
    updatedItem: Omit<InventoryItem, "id">,
  ) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Daftar Barang</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau semua item inventaris Anda di satu tempat.
          </p>
        </div>

        <div className="mb-6 flex justify-end">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Tambah Barang
          </Button>
        </div>

        <InventoryTable
          items={items.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
          )}
          onDelete={handleDeleteItem}
          onEdit={handleEditItem}
        />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            items
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {"<"}
            </Button>
            {[1, 2, 3, "...", 10].map((page, i) => (
              <Button
                key={i}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= totalItems}
            >
              {">"}
            </Button>
          </div>
        </div>
      </div>

      <AddItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddItem={handleAddItem}
      />
    </main>
  );
}
