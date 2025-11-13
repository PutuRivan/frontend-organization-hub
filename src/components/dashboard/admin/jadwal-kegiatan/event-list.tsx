interface Event {
  id: string
  title: string
  date: Date
  category: "meeting" | "presentation" | "deadline"
}

interface EventListProps {
  events: Event[]
}

export default function EventList({ events }: EventListProps) {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "meeting":
        return { label: "Rapat", color: "bg-blue-100 text-blue-700" }
      case "presentation":
        return { label: "Presentasi", color: "bg-green-100 text-green-700" }
      case "deadline":
        return { label: "Deadline", color: "bg-purple-100 text-purple-700" }
      default:
        return { label: "Lainnya", color: "bg-gray-100 text-gray-700" }
    }
  }

  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="space-y-2">
      {sortedEvents.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Tidak ada kegiatan ditemukan</p>
      ) : (
        sortedEvents.map((event) => {
          const badge = getCategoryBadge(event.category)
          const dateStr = event.date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          return (
            <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition">
              <div className="flex-1">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{dateStr}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>{badge.label}</span>
            </div>
          )
        })
      )}
    </div>
  )
}
