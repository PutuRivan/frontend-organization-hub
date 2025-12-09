import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EventFilterContainerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function EventFilterContainer({
  searchQuery,
  setSearchQuery,
}: EventFilterContainerProps) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
