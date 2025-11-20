import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
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

        {/* Buttons */}
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1 bg-transparent"
        >
          Reset
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          Terapkan Filter
        </Button>
      </div>
    </Card>
  );
}
