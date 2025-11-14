import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import type { InventoryItem } from "@/app/(dashboard)/admin/inventaris-barang/page";
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
import Link from "next/link";

interface InventoryTableProps {
  items: InventoryItem[];
  pathname: string
  token: string
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
}: InventoryTableProps) {

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteInventoryAction(pathname, token, id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
                    <div className="relative h-14 w-14 rounded-md overflow-hidden">
                      <Image
                        src={
                          `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
                        }
                        alt={item.item_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-14 w-14 bg-gray-100 rounded-md" />
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
                    <Link href={""}>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
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
  );
}
