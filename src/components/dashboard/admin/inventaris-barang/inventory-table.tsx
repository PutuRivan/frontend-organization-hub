import { Edit2, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteInventoryAction } from "@/libs/action";
import type { TInventory } from "@/libs/types";
import { getInventoryCategory } from "@/libs/utils";
import InventoryDetailDialog from "./inventory-detail-dialog";

interface InventoryTableProps {
  items: TInventory[];
  pathname: string;
  token: string;
  page: number;
  fetchInventory: (page: number) => void;
}

export default function InventoryTable({
  items,
  pathname,
  token,
  page,
  fetchInventory,
}: InventoryTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TInventory | null>(null);

  const handleDeleteItem = async (id: string) => {
    try {
      const status = await deleteInventoryAction(pathname, token, id);
      if (status.success) fetchInventory(page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewItem = (item: TInventory) => {
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
                          src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                          alt={item.item_name}
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="h-14 w-14 bg-gray-100 rounded-md mx-auto" />
                    )}
                  </TableCell>

                  <TableCell className="font-medium">
                    {item.item_name}
                  </TableCell>

                  <TableCell>
                    {item.quantity} {item.quantity_description}
                  </TableCell>

                  <TableCell>
                    <Badge className={getInventoryCategory(item.category)}>
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

      <InventoryDetailDialog
        handleDeleteItem={handleDeleteItem}
        handleDialogChange={handleDialogChange}
        handleViewItem={handleViewItem}
        isDialogOpen={isDialogOpen}
        selectedItem={selectedItem}
      />
    </>
  );
}
