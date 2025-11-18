import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";

interface AttendancePaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function AttendancePagination({
  itemsPerPage,
  totalItems,
  currentPage,
  totalPages,
  setCurrentPage,
}: AttendancePaginationProps) {
  return (
    <div className="flex items-center justify-between border-t bg-muted/50 px-6 py-4">
      <p className="text-sm text-muted-foreground">
        Menampilkan 1-{itemsPerPage} dari {totalItems} hasil
      </p>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
