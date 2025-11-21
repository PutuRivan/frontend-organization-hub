import type { Personnel } from "@/app/(dashboard)/admin/manajemen-personel/page"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Edit2, Eye, Trash2 } from "lucide-react";

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


interface ManagePersonelTableProps {
  personnel: Personnel[]
  loading?: boolean
}

export default function ManagePersonelTable({ personnel, loading = false }: ManagePersonelTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead className="font-semibold text-foreground">Profile</TableHead>
            <TableHead className="font-semibold text-foreground">Nama</TableHead>
            <TableHead className="font-semibold text-foreground">Jabatan</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-semibold text-foreground">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3">Memuat data...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : personnel.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                Tidak ada data personel
              </TableCell>
            </TableRow>
          ) : (
            personnel.map((person) => (
              <TableRow key={person.id} className="hover:bg-secondary/40">
                {/* Nama */}
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor(
                        person.id,
                      )}`}
                    >
                      {getInitials(person.name)}
                    </div>
                  </div>
                </TableCell>

                {/* Jabatan */}
                <TableCell className="text-muted-foreground">{person.name}</TableCell>
                <TableCell className="text-muted-foreground">{person.position}</TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={person.status === "Aktif" ? "default" : "secondary"}
                    className={`${person.status === "Aktif"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      } px-3 py-1`}
                  >
                    {person.status || "N/A"}
                  </Badge>
                </TableCell>

                {/* Aksi */}
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/manajemen-personel/update/${person.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}