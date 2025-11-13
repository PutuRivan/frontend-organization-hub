import type { Personnel } from "@/app/(dashboard)/admin/manajemen-personel/page"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// --- UTILITY FUNCTIONS DIBUAT INTERNAL UNTUK MENGHINDARI ERROR IMPOR ---

// Fungsi untuk mendapatkan inisial nama
const getInitials = (name: string): string => {
  if (!name) return "";
  const parts = name.split(" ").filter(part => part.length > 0);
  
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  } else if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return "";
};

// Daftar warna background yang akan digunakan untuk avatar
const COLORS = [
  "bg-indigo-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-600",
];

// Fungsi untuk memilih warna avatar secara deterministik berdasarkan ID
const getAvatarColor = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
};

// --- END UTILITY FUNCTIONS ---


interface PersonnelTableProps {
  personnel: Personnel[]
}

export default function PersonnelTable({ personnel }: PersonnelTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead className="w-[25%] font-semibold text-foreground">Nama</TableHead>
            <TableHead className="w-[25%] font-semibold text-foreground">Jabatan</TableHead>
            <TableHead className="w-[25%] font-semibold text-foreground">Status</TableHead>
            {/* Class "text-right" ditambahkan di sini untuk menyelaraskan dengan tombol Aksi di body */}
            <TableHead className="w-[25%] font-semibold text-foreground text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {personnel.map((person) => (
            <TableRow key={person.id} className="hover:bg-secondary/40">
              {/* Nama */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor(
                      person.id,
                    )}`}
                  >
                    {getInitials(person.name)}
                  </div>
                  <span className="font-medium text-foreground">{person.name}</span>
                </div>
              </TableCell>

              {/* Jabatan */}
              <TableCell className="text-muted-foreground">{person.position}</TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={person.status === "Aktif" ? "default" : "secondary"}
                  className={`${
                    person.status === "Aktif"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                  } px-3 py-1`}
                >
                  {person.status}
                </Badge>
              </TableCell>

              {/* Aksi */}
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                    onClick={() => console.log(`Edit ${person.name}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => console.log(`Hapus ${person.name}`)}
                  >
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}