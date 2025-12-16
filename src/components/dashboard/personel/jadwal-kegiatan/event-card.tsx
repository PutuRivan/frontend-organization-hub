import { Eye, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { deleteEventAction } from "@/libs/action";
import type { TEvent } from "@/libs/types";

interface EventCardProps {
  event: TEvent;
  token: string;
  pathname: string;
  fetchEvents: () => void;
}

const typeColors: Record<string, { badge: string; text: string }> = {
  Rapat: { badge: "bg-blue-100 text-blue-700", text: "bg-blue-200" },
  Pelatihan: { badge: "bg-green-100 text-green-700", text: "bg-green-200" },
  Workshop: { badge: "bg-purple-100 text-purple-700", text: "bg-purple-200" },
};

const defaultColor = {
  badge: "bg-slate-100 text-slate-700",
  text: "bg-slate-200",
};

export default function EventCard({
  event,
  token,
  pathname,
  fetchEvents,
}: EventCardProps) {
  const colors = typeColors[event.type] || defaultColor;
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

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
    setSelectedEvent(event);
    setShowUpdateDialog(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-6">
        {/* Date Box */}
        <div
          className={`${colors.text} rounded-lg p-4 min-w-24 text-center flex flex-col items-center justify-center`}
        >
          <div className="text-2xl font-bold text-blue-600">{event.date}</div>
          <div className="text-xs text-slate-600 mt-1">{event.month}</div>
          <div className="text-xs text-slate-600 font-medium">{event.time}</div>
        </div>

        {/* Event Details */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className={`${colors.badge} border-0`}>
              {event.type}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {event.title}
          </h3>
          <p className="text-sm text-slate-600">{event.description}</p>
          <p className="text-sm text-slate-600">{event.leader}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => handleUpdate(event)}
          >
            <Pen size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => handleDelete(event.id)}
          >
            <Trash size={24} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
