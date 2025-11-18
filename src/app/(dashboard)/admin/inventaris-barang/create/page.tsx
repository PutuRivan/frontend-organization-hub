import CreateInventarisForm from "@/components/dashboard/admin/inventaris-barang/create/create-inventaris-form";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Card } from "@/components/ui/card";

export default function page() {
  return (
    <section className="p-5">
      <HeaderContent
        title="Tambah Barang Baru Disini"
        description="Isi detail di bawah ini untuk menambahkan barang baru ke inventaris"
      />

      <Card className="mt-3 p-3">
        <CreateInventarisForm />
      </Card>
    </section>
  );
}
