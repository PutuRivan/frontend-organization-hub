import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventCalendarHeaderProps {
  currentDate: Date;
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  handleToday: () => void;
  onDateChange: (year: number, month: number) => void;
}

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function EventCalendarHeader({
  currentDate,
  handleNextMonth,
  handlePreviousMonth,
  handleToday,
  onDateChange,
}: EventCalendarHeaderProps) {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate year options (current year ± 5 years)
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value);
    onDateChange(currentYear, newMonth);
  };

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value);
    onDateChange(newYear, currentMonth);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Month and Year Selectors */}
      <div className="flex items-center gap-2">
        <Select value={currentMonth.toString()} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month, index) => (
              <SelectItem key={month} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentYear.toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Today Button */}
      <Button
        variant="outline"
        onClick={handleToday}
        className="text-sm bg-transparent"
      >
        Hari ini
      </Button>
    </div>
  );
}
