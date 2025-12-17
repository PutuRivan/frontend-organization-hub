import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TUser } from "@/libs/types";
import ManagePersonelDetailContent from "./manage-personel-detail-content";

interface ManagePersonelDetailDialogProps {
  isDialogOpen: boolean;
  selectedItem: TUser | null;
  handleDialogChange: (open: boolean) => void;
  handleDeleteItem: (id: string) => void;
}

export default function ManagePersonelDetailDialog({
  isDialogOpen,
  handleDialogChange,
  selectedItem,
  handleDeleteItem,
}: ManagePersonelDetailDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent>
        {selectedItem && (
          <>
            <ManagePersonelDetailContent selectedItem={selectedItem} />

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
                  href={`/admin/manajemen-personel/update/${selectedItem.id}`}
                >
                  <Button>Edit</Button>
                </Link>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
