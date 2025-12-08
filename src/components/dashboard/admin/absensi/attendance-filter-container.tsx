import { Download } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AttendanceFilterContainerProps {
  startDate: string;
  search: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleReset: () => void;
}

export default function AttendanceFilterContainer({
  startDate,
  search,
  setStartDate,
  setSearch,
  setCurrentPage,
  handleReset,
}: AttendanceFilterContainerProps) {
  const handleExport = () => {
    alert("Export data functionality would be implemented here");
  };
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:items-end">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Nama Personel</Label>
          <Input
            type="text"
            placeholder="Cari nama personel..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tanggal</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Status</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="present">Hadir</SelectItem>
              <SelectItem value="absent">Tidak Hadir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <Button className="w-full" onClick={handleReset}>
          Reset
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleExport}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Ekspor Data
        </Button>
      </div>
    </Card>
  );
}
