interface Event {
  id: string
  title: string
  date: Date
  category: "meeting" | "presentation" | "deadline"
}

interface CalendarGridProps {
  currentDate: Date
  events: Event[]
}

const DAYS_OF_WEEK_ID = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"]

export default function CalendarGrid({ currentDate, events }: CalendarGridProps) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)

  const firstDayOfWeek = firstDay.getDay()
  const lastDayOfMonth = lastDay.getDate()
  const prevLastDayOfMonth = prevLastDay.getDate()

  const days: (number | null)[] = []

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push(-(prevLastDayOfMonth - i))
  }

  // Current month days
  for (let i = 1; i <= lastDayOfMonth; i++) {
    days.push(i)
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push(-(lastDayOfMonth + i))
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate(),
    )
  }

  const isToday = (day: number) => {
    if (day <= 0) return false
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "meeting":
        return "bg-blue-100 text-blue-600"
      case "presentation":
        return "bg-green-100 text-green-600"
      case "deadline":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div>
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAYS_OF_WEEK_ID.map((day) => (
          <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Cells */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCurrentMonth = day > 0
          const displayDay = Math.abs(day)
          const dateObj = new Date(year, month, isCurrentMonth ? day : day * -1)
          const dayEvents = isCurrentMonth ? getEventsForDate(dateObj) : []
          const today = isToday(day)

          return (
            <div
              key={index}
              className={`min-h-24 p-3 border rounded-lg ${
                isCurrentMonth ? "bg-card text-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="flex flex-col h-full">
                <div
                  className={`text-sm font-semibold mb-2 ${
                    today ? "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center" : ""
                  }`}
                >
                  {displayDay}
                </div>
                <div className="space-y-1 flex-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded truncate ${getCategoryColor(event.category)}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} lebih</div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
