import { cookies } from "next/headers";
import UpdatePersonelForm from "@/components/dashboard/admin/manajemen-personel/update/update-personel-form";
import HeaderContent from "@/components/dashboard/base/header-content";
import { Card } from "@/components/ui/card";
import { getPersonelById } from "@/libs/apis";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const { id } = await params;
  const data = await getPersonelById(token ?? "", id);

  return (
    <section className="p-5">
      <HeaderContent
        title="Update Personel"
        description="Fill in the details below to update a new item to the inventory"
      />

      <Card className="mt-3 p-3">
        <UpdatePersonelForm
          data={data.data}
          personelId={id}
        />
      </Card>
    </section>
  );
}
