"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/auth-context";
import { updatePersonel } from "@/libs/apis";
import { personelSchema, type TPersonelSchema } from "@/libs/schema";
import { getAccessTokenFromCookie } from "@/libs/utils";
import ImagePreview from "../../inventaris-barang/create/image-preview";

interface IUpdatePersonelForm {
  data: TPersonelSchema;
  personelId: string
}

export default function UpdatePersonelForm({ data, personelId }: IUpdatePersonelForm) {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuth();
  const token = getAccessTokenFromCookie();
  const form = useForm<TPersonelSchema>({
    resolver: zodResolver(personelSchema),
    defaultValues: {
      name: data.name,
      nrp: data.nrp,
      jabatan: data.jabatan,
      pangkat: data.pangkat,
      password: "",
      image: null,
      email: data.email,
      role: data.role,
      status: (data.status as unknown as string) === "Aktif",
    },
  });

  const handleDrop = (acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);
    setFilePreviews(newFiles.map((file) => URL.createObjectURL(file)));

    // Sinkron ke react-hook-form
    form.setValue("image", newFiles);
  };

  // Hapus file
  const handleRemoveImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFilePreviews(updatedFiles.map((file) => URL.createObjectURL(file)));

    // Sinkron ke react-hook-form
    form.setValue("image", updatedFiles);
  };

  const onSubmit = async (values: TPersonelSchema) => {
    if (!user?.id) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("nrp", values.nrp);
    formData.append("jabatan", values.jabatan);
    formData.append("password", values.password);
    formData.append("role", "Personel");
    formData.append("pangkat", values.pangkat);

    if (values.status) {
      formData.append("status", "Aktif");
    } else {
      formData.append("status", "Tidak_Aktif");
    }

    files.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("userId", user.id);
    try {
      const response = await updatePersonel(token, personelId, formData);
      if (!response.success) {
        toast.error(response.message)
        return
      }
      toast.success("Personel berhasil ditambahkan");
      router.push("/admin/manajemen-personel");
    } catch (error) {
      toast.error("Terjadi kesalahan saat submit");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Nama Lengkap */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* NRP / ID */}
          <FormField
            control={form.control}
            name="nrp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NRP / ID Personel</FormLabel>
                <FormControl>
                  <Input placeholder="NRP / ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Jabatan */}
          <FormField
            control={form.control}
            name="jabatan"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Jabatan</FormLabel>
                <FormControl>
                  <Input placeholder="jabatan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* pangkat */}
          <FormField
            control={form.control}
            name="pangkat"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Divisi / Satuan</FormLabel>
                <FormControl>
                  <Input placeholder="Pangkat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@domain.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Foto Personel */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Foto Personel</FormLabel>
              <FormControl>
                <div className="w-full">
                  <Dropzone
                    maxFiles={5}
                    accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                    onDrop={(files) => {
                      handleDrop(files);
                      field.onChange(files); // update react-hook-form
                    }}
                  >
                    <DropzoneEmptyState />
                    <DropzoneContent />
                  </Dropzone>
                  {filePreviews.length > 0 && (
                    <ImagePreview
                      filePreviews={filePreviews}
                      onRemove={(index) => {
                        handleRemoveImage(index);
                        // update form value juga
                        const newFiles = files.filter((_, i) => i !== index);
                        field.onChange(newFiles);
                      }}
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Status Aktif */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Status Aktif</FormLabel>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-5">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => form.reset()}
          >
            Batal
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
