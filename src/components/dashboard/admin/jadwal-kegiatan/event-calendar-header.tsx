import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCalendarHeaderProps {
  handlePreviousMonth: () => void
  handleNextMonth: () => void
  handleToday: () => void
  monthName: string

}

export default function EventCalendarHeader({
  handleNextMonth,
  handlePreviousMonth,
  handleToday,
  monthName
}:
  EventCalendarHeaderProps
) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <h2 className="text-2xl font-semibold">{monthName}</h2>

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
