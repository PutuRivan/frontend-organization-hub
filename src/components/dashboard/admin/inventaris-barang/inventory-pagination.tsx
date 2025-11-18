import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { TInventory } from "@/libs/types";

interface InventoryPaginationProps {
  searchTerm: string;
  filteredItems: TInventory[];
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
  setCurrentPage: (number: number) => void
}

export default function InventoryPagination({
  searchTerm,
  filteredItems,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  setCurrentPage
}: InventoryPaginationProps) {
  return (
    <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <p className="text-sm text-muted-foreground w-full">
        {searchTerm.trim()
          ? `${filteredItems.length} hasil ditemukan`
          : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} items`}
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
  );
}
