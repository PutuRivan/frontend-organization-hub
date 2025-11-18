import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AttendanceFilterContainerProps {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  handleReset: () => void
}

export default function AttendanceFilterContainer({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleReset
}: AttendanceFilterContainerProps) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
        {/* Start Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tanggal Mulai</Label>
          <Input
            type="date"
            value={startDate.split("/").reverse().join("-")}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split("-");
              setStartDate(`${month}/${day}/${year}`);
            }}
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tanggal Selesai</Label>
          <Input
            type="date"
            value={endDate.split("/").reverse().join("-")}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split("-");
              setEndDate(`${month}/${day}/${year}`);
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
