import Image from "next/image";
import React from "react";
import type { TUser } from "@/libs/types";

interface ManagePersonelDetailContentProps {
  selectedItem: TUser;
}

export default function ManagePersonelDetailContent({
  selectedItem,
}: ManagePersonelDetailContentProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
      <div className="flex items-start justify-center rounded-lg bg-muted p-4">
        {selectedItem.image ? (
          <div className="relative h-48 w-48 overflow-hidden rounded-md">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${selectedItem.image}`}
              alt={selectedItem.name}
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-48 w-48 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
            Tidak ada gambar
          </div>
        )}
      </div>
      <div className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Nama</p>
          <p className="text-base font-medium">
            {selectedItem.name || "-"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">Jabatan</p>
            <p className="font-medium">
              {selectedItem.jabatan || "-"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">
              {selectedItem.email || "-"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Posisi</p>
            <p className="font-medium">{selectedItem.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
