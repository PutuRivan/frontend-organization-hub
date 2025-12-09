import type { TEvent } from "@/libs/types";

interface CalendarGridProps {
  currentDate: Date;
  events: TEvent[];
}

const DAYS_OF_WEEK_ID = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];

export default function EventCalendarGrid({
  currentDate,
  events,
}: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfMonth = lastDay.getDate();
  const prevLastDayOfMonth = prevLastDay.getDate();

  // Generate calendar days including previous and next month
  const calendarDays: Array<{
    day: number;
    isCurrentMonth: boolean;
    isPrevMonth: boolean;
    isNextMonth: boolean;
  }> = [];

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevLastDayOfMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
      isNextMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= lastDayOfMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isPrevMonth: false,
      isNextMonth: false,
    });
  }

  // Next month days (fill to make 42 cells - 6 rows)
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isPrevMonth: false,
      isNextMonth: true,
    });
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => {
        const eventDate = new Date(event.start_datetime);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      }
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case "meeting":
        return "bg-blue-100 text-blue-600";
      case "presentation":
        return "bg-green-100 text-green-600";
      case "deadline":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAYS_OF_WEEK_ID.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-sm text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Cells */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((dayInfo, index) => {
          const { day, isCurrentMonth, isPrevMonth, isNextMonth } = dayInfo;

          // Calculate the actual date for this cell
          let cellMonth = month;
          if (isPrevMonth) cellMonth = month - 1;
          if (isNextMonth) cellMonth = month + 1;

          const dateObj = new Date(year, cellMonth, day);
          const dayEvents = isCurrentMonth ? getEventsForDate(dateObj) : [];
          const today = isCurrentMonth && isToday(day);

          return (
            <div
              key={index}
              className={`min-h-24 p-3 border rounded-lg ${isCurrentMonth
                ? "bg-card text-foreground"
                : "bg-muted/50 text-muted-foreground"
                }`}
            >
              <div className="flex flex-col h-full">
                <div
                  className={`text-sm font-semibold mb-2 ${today
                    ? "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center"
                    : ""
                    }`}
                >
                  {day}
                </div>
                <div className="space-y-1 flex-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded truncate ${getCategoryColor(event.category)}`}
                    >
                      {event.name}
                      <p className="text-xs text-muted-foreground">{event.start_datetime.toString().split(" ")[4]}</p>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayEvents.length - 2} lebih
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
