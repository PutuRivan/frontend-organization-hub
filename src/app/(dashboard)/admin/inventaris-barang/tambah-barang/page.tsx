import CreateInventarisForm from "@/components/dashboard/admin/inventaris-barang/tambah-barang/create-inventaris-form";
import { Card } from "@/components/ui/card";

export default function page() {
  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold">Tambah Barang Baru Disini</h1>
      <p className="text-muted-foreground">
        Isi detail di bawah ini untuk menambahkan barang baru ke inventaris{" "}
      </p>

      <Card className="mt-3 p-3">
        <CreateInventarisForm />
      </Card>
    </section>
  );
}
