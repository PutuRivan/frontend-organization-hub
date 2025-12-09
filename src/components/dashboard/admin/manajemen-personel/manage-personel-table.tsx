import { Edit2, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletePersonnelAction } from "@/libs/action";
import type { TUser } from "@/libs/types";
import { getInitials } from "@/libs/utils";

interface ManagePersonelTableProps {
  personnel: TUser[];
  loading?: boolean;
  token: string;
  pathname: string;
  fetchUser: (page: number) => void;
  currentPage: number;
}

export default function ManagePersonelTable({
  personnel,
  loading = false,
  token,
  pathname,
  fetchUser,
  currentPage,
}: ManagePersonelTableProps) {
  const handleDelete = async (id: string) => {
    try {
      console.log({ userId: id });
      const status = await deletePersonnelAction(pathname, token, id);
      console.log(status);
      if (!status.success) {
        toast.error(status.message)
        return
      }
      toast.success("Data berhasil dihapus")
      fetchUser(currentPage);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus data")
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3">Memuat data...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : personnel.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                Tidak ada data personel
              </TableCell>
            </TableRow>
          ) : (
            personnel.map((person) => (
              <TableRow key={person.id} className="hover:bg-secondary/40">
                {/* Nama */}
                <TableCell className="flex items-center justify-center gap-3">
                  <Avatar>
                    <AvatarImage src={person.image || ""} />
                    <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Jabatan */}
                <TableCell className="text-muted-foreground">
                  {person.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {person.jabatan}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={
                      person.status === "Aktif" ? "default" : "secondary"
                    }
                  >
                    {person.status || "N/A"}
                  </Badge>
                </TableCell>

                {/* Aksi */}
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/admin/manajemen-personel/update/${person.id}`}
                    >
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(person.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
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
  );
}
