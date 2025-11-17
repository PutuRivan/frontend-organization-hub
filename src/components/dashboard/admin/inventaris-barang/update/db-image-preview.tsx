"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ImagePreviewProps = {
  filePreviews: string;
  onRemove: () => void;
};

export default function DbImagePreview({
  filePreviews,
  onRemove
}: ImagePreviewProps) {
  if (!filePreviews || filePreviews.length === 0) return null;

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      <div
        className="relative group h-[100px] w-full rounded-lg overflow-hidden border"
      >
        <Image
          alt={`Preview`}
          src={filePreviews}
          className="h-full w-full object-cover"
          fill
        />
        <Button
          type="button"
          onClick={handleRemove}
          variant="destructive"
          size="icon"
          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  );
}
