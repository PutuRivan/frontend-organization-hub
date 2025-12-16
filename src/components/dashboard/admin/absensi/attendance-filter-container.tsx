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
import type { TAttendanceAbsentReason } from "@/libs/types";

interface AttendanceFilterContainerProps {
  date: string;
  search: string;
  status: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleReset: () => void;
}

export const AttendanceAbsentReasonMap: Record<
  TAttendanceAbsentReason,
  string
> = {
  Dinas: "Dinas",
  DIK: "DIK",
  Izin: "Izin",
  Cuti: "Cuti",
  Sakit: "Sakit",
  Hamil: "Hamil",
  BKO: "BKO",
  TK: "Tanpa Keterangan",
  Terlambat: "Terlambat",
};

export default function AttendanceFilterContainer({
  date,
  search,
  status,
  setDate,
  setSearch,
  setStatus,
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
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Status</Label>
          <Select
            defaultValue="Hadir"
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"Hadir"} value={"Hadir"}>
                Hadir
              </SelectItem>
              {Object.entries(AttendanceAbsentReasonMap).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <Button
          variant="outline"
          size="lg"
          onClick={handleExport}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Ekspor Data
        </Button>
        <Button className="w-full" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
