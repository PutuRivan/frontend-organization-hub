import { cookies } from "next/headers";
import UpdateInventarisForm from "@/components/dashboard/admin/inventaris-barang/update/update-inventaris-form";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Card } from "@/components/ui/card";
import { getInventoryById } from "@/libs/apis";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const { id } = await params;
  const data = await getInventoryById(token ?? "", id);
  return (
    <section className="p-5">
      <HeaderContent
        title="Update Inventory Item"
        description="Fill in the details below to update a new item to the inventory"
      />

      <Card className="mt-3 p-3">
        <UpdateInventarisForm data={data.data} />
      </Card>
    </section>
  );
}
