"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImagePreviewProps = {
  filePreviews: string[];
  onRemove: (index: number) => void;
};

export default function ImagePreview({
  filePreviews,
  onRemove,
}: ImagePreviewProps) {
  if (filePreviews.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {filePreviews.map((preview, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className="relative group h-[100px] w-full rounded-lg overflow-hidden border"
        >
          <img
            alt={`Preview ${index}`}
            src={preview}
            className="h-full w-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <X size={14} />
          </Button>
        </div>
      ))}
    </div>
  );
}
