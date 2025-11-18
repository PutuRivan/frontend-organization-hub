import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TInventory } from "@/libs/types";
import InventoryDetailContent from "./inventory-detail-content";

type InventoryDetailDialogProps = {
  isDialogOpen: boolean;
  selectedItem: TInventory | null;
  handleDialogChange: (open: boolean) => void;
  handleViewItem: (item: TInventory) => void
  handleDeleteItem: (id: string) => void

};

export default function InventoryDetailDialog({
  isDialogOpen,
  handleDialogChange,
  selectedItem,
  handleDeleteItem
}: InventoryDetailDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl">
        {selectedItem && (
          <>
            <DialogHeader className="space-y-1">
              <DialogTitle>{selectedItem.item_name}</DialogTitle>
            </DialogHeader>

            <InventoryDetailContent selectedItem={selectedItem} />

            <DialogFooter className="justify-between gap-2 sm:justify-end">
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDeleteItem(selectedItem.id)}
              >
                Delete
              </Button>
              <div className="flex gap-2">
                <Link
                  href={`/admin/inventaris-barang/update/${selectedItem.id}`}
                >
                  <Button>Edit Item</Button>
                </Link>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
