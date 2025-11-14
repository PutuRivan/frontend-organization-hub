import CreateInventarisForm from "@/components/dashboard/admin/inventaris-barang/create/create-inventaris-form";
import { Card } from "@/components/ui/card";


export default function page() {
  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold">Add New Inventory Item</h1>
      <p className="text-muted-foreground">
        Fill in the details below to add a new item to the inventory
      </p>

      <Card className="mt-3 p-3">
        <CreateInventarisForm />
      </Card>
    </section>
  );
}
