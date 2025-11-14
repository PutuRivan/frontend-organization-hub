import { cookies } from "next/headers";
import UpdateInventarisForm from "@/components/dashboard/admin/inventaris-barang/update/update-inventaris-form";
import { Card } from "@/components/ui/card";
import { getInventoryById } from "@/libs/apis";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const { id } = await params
  const data = await getInventoryById(token ?? "", id);
  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold">Update Inventory Item</h1>
      <p className="text-muted-foreground">
        Fill in the details below to update a new item to the inventory
      </p>

      <Card className="mt-3 p-3">
        <UpdateInventarisForm data={data.data} />
      </Card>
    </section>
  );
}
