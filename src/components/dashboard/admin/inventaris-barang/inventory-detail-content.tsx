import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { TInventory } from "@/libs/types";
import { getInventoryCategory } from "@/libs/utils";

interface InventoryDetailContentProps {
  selectedItem: TInventory;
}

export default function InventoryDetailContent({ selectedItem }: InventoryDetailContentProps) {
  return (
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
              {selectedItem.quantity} {selectedItem.quantity_description}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Kategori</p>
            <Badge className={getInventoryCategory(selectedItem.category)}>
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
                ? new Date(selectedItem.updated_at).toLocaleDateString("id-ID")
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
