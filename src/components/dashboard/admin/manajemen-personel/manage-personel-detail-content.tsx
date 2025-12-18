import Image from "next/image";
import type { TUser } from "@/libs/types";

interface ManagePersonelDetailContentProps {
  selectedItem: TUser;
}



export default function ManagePersonelDetailContent({
  selectedItem,
}: ManagePersonelDetailContentProps) {
  const detailItems = [
    { label: "Nama", value: selectedItem.name },
    { label: "NRP", value: selectedItem.nrp },
    { label: "Jabatan", value: selectedItem.jabatan },
    { label: "Email", value: selectedItem.email },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-center rounded-lg  p-4">
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
      <div className="grid grid-cols-2 gap-4">
        {detailItems.map((item, index) => (
          <DetailField
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
}

interface DetailFieldProps {
  label: string;
  value?: string | null;
};

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-muted-foreground">{label}</h3>
      <p className="text-base font-medium wrap-break-word">
        {value || "-"}
      </p>
    </div>
  );
}
