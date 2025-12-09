import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteEventAction } from "@/libs/action";
import type { TEvent } from "@/libs/types";

interface EventListProps {
  events: TEvent[];
  token: string;
  pathname: string;
  fetchEvents: () => void;
}

export default function EventList({
  events,
  token,
  pathname,
  fetchEvents,
}: EventListProps) {
  const getCategoryBadge = (category: string | null) => {
    switch (category) {
      case "meeting":
        return {
          label: "Rapat",
          color: "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
        };
      case "presentation":
        return {
          label: "Presentasi",
          color: "bg-green-100 text-green-700 hover:bg-green-100/80",
        };
      case "deadline":
        return {
          label: "Deadline",
          color: "bg-purple-100 text-purple-700 hover:bg-purple-100/80",
        };
      default:
        return {
          label: "Lainnya",
          color: "bg-gray-100 text-gray-700 hover:bg-gray-100/80",
        };
    }
  };

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.start_datetime).getTime() -
      new Date(b.start_datetime).getTime(),
  );

  const handleDelete = async (id: string) => {
    const response = await deleteEventAction(pathname, token, id);
    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      fetchEvents();
    }
  };

  const handleUpdate = (event: TEvent) => {
    console.log(event);
  };

  return (
    <div className="space-y-2">
      {sortedEvents.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          Tidak ada kegiatan ditemukan
        </p>
      ) : (
        sortedEvents.map((event) => {
          const badge = getCategoryBadge(event.category);
          const dateStr = new Date(event.start_datetime).toLocaleDateString(
            "id-ID",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
          );
          const dateEndStr = new Date(event.end_datetime).toLocaleDateString(
            "id-ID",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
          );

          return (
            <div
              key={event.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition bg-card text-card-foreground shadow-sm"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-muted-foreground">{dateStr} - {dateEndStr}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className={`${badge.color} border-0`}
                >
                  {badge.label}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => handleUpdate(event)}
                  >
                    <Edit className="h-4 w-4 text-foreground" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
