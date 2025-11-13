"use client"

import { Button } from "@/components/ui/button"

interface InventoryPaginationProps {
  currentPage: number
  totalPages: number
  itemsShowing: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function InventoryPagination({
  currentPage,
  totalPages,
  itemsShowing,
  itemsPerPage,
  totalItems,
  onPageChange,
}: InventoryPaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage + 1

  return (
    <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
      <p className="text-sm text-gray-600">
        Menampilkan {startIndex}-{Math.min(startIndex + itemsPerPage - 1, totalItems)} dari {totalItems}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className="w-10"
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
