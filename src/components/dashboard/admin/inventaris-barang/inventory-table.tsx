import { Edit2, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { InventoryItem } from "@/app/(dashboard)/admin/inventaris-barang/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteInventoryAction } from "@/libs/action";

interface InventoryTableProps {
  items: InventoryItem[];
  pathname: string;
  token: string;
  page: number;
  fetchInventory: (page: number) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Baik":
      return "bg-green-100 text-green-800";
    case "Rusak Ringan":
      return "bg-yellow-100 text-yellow-800";
    case "Rusak":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function InventoryTable({
  items,
  pathname,
  token,
  page,
  fetchInventory,
}: InventoryTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleDeleteItem = async (id: string) => {
    try {
      const status = await deleteInventoryAction(pathname, token, id);
      if (status.success) fetchInventory(page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setSelectedItem(null);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="font-semibold">Gambar</TableHead>
              <TableHead className="font-semibold">Nama Barang</TableHead>
              <TableHead className="font-semibold">Jumlah</TableHead>
              <TableHead className="font-semibold">Kategori</TableHead>
              <TableHead className="font-semibold">Lokasi</TableHead>
              <TableHead className="font-semibold text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell>
                    {item.image ? (
                      <div className="relative h-14 w-14 rounded-md overflow-hidden mx-auto">
                        <Image
                          src={`${item.image}`}
                          alt={item.item_name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    ) : (
                      <div className="h-14 w-14 bg-gray-100 rounded-md mx-auto" />
                    )}
                  </TableCell>

                  <TableCell className="font-medium">{item.item_name}</TableCell>

                  <TableCell>
                    {item.quantity} {item.quantity_description}
                  </TableCell>

                  <TableCell>
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                  </TableCell>

                  <TableCell>{item.location}</TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Link href={`/admin/inventaris-barang/update/${item.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewItem(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  Tidak ada data barang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-3xl">
          {selectedItem && (
            <>
              <DialogHeader className="space-y-1">
                <DialogTitle>{selectedItem.item_name}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
                <div className="flex items-start justify-center rounded-lg bg-muted p-4">
                  {selectedItem.image ? (
                    <div className="relative h-48 w-48 overflow-hidden rounded-md">
                      <Image
                        src={`${selectedItem.image}`}
                        alt={selectedItem.item_name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 w-48 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                      Tidak ada gambar
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Deskripsi</p>
                    <p className="text-base font-medium">
                      {selectedItem.description || "-"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground">Jumlah</p>
                      <p className="font-medium">
                        {selectedItem.quantity}{" "}
                        {selectedItem.quantity_description}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Kategori</p>
                      <Badge className={getCategoryColor(selectedItem.category)}>
                        {selectedItem.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Lokasi</p>
                      <p className="font-medium">{selectedItem.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Terakhir Diperbarui</p>
                      <p className="font-medium">
                        {selectedItem.updated_at
                          ? new Date(selectedItem.updated_at).toLocaleDateString(
                            "id-ID"
                          )
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="justify-between gap-2 sm:justify-end">
                <Button
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteItem(selectedItem.id)}
                >
                  Delete
                </Button>
                <div className="flex gap-2">
                  <Link href={`/admin/inventaris-barang/update/${selectedItem.id}`}>
                    <Button>Edit Item</Button>
                  </Link>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
