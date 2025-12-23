import { Search } from "lucide-react";
import type React from "react";
import type { SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ManageFilterContainerProps {
  searchQuery: string;
  statusFilter: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  setStatusFilter: React.Dispatch<SetStateAction<"Semua" | "Aktif" | "Tidak_Aktif">>;
}

export default function ManageFilterContainer({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  statusFilter,
  setStatusFilter,
}: ManageFilterContainerProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari personel berdasarkan nama..."
            className="pl-10 bg-secondary"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="w-full md:w-48">
        <Select
          value={statusFilter}
          onValueChange={(value: "Semua" | "Aktif" | "Tidak_Aktif") => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="bg-secondary">
            <SelectValue placeholder="Filter berdasarkan status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Semua">Status: Semua</SelectItem>
            <SelectItem value="Aktif">Status: Aktif</SelectItem>
            <SelectItem value="Tidak_Aktif">Status: Tidak Aktif</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
