"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { updateInventory } from "@/libs/apis";
import { createInventory, type TCreateInventory } from "@/libs/schema";
import type { TInventory } from "@/libs/types";

import { getAccessTokenFromCookie } from "@/libs/utils";
import ImagePreview from "../create/image-preview";
import DbImagePreview from "./db-image-preview";
import { useRouter } from "next/navigation";

interface UpdateInventarisForm {
  data: TInventory;
}

export default function UpdateInventarisForm({ data }: UpdateInventarisForm) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isDbImageRemoved, setIsDbImageRemoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = getAccessTokenFromCookie();
  const form = useForm<TCreateInventory>({
    resolver: zodResolver(createInventory),
    defaultValues: {
      name: data.item_name,
      quantity: data.quantity,
      quantity_description: data.quantity_description,
      category: data.category,
      location: data.location,
      description: data.description,
    },
  });

  // === Handlers ===
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

  // Hapus gambar dari database
  const handleRemoveDbImage = () => {
    setIsDbImageRemoved(true);
    // Reset form image field untuk memastikan gambar database tidak terkirim
    form.setValue("image", []);
  };

  const onSubmit = async (values: TCreateInventory) => {
    if (!user?.id) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", values.name ?? data.item_name);
    formData.append("quantity", values.quantity.toString() ?? data.quantity);
    formData.append(
      "quantity_description",
      values.quantity_description ?? data.quantity_description,
    );
    formData.append("category", values.category ?? data.category);
    formData.append("location", values.location ?? data.location);
    formData.append("description", values.description ?? data.description);

    files.forEach((file) => {
      formData.append("image", file);
    });

    formData.append("userId", user.id);
    try {
      const response = await updateInventory(token, data.id, formData);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Item berhasil diupdate");
      form.reset();
      router.push("/admin/inventaris-barang");
    } catch (error) {
      toast.error("Terjadi kesalahan saat submit");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Item</FormLabel>
              <FormControl>
                <Input placeholder="Kursi" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="quantity" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Description</FormLabel>
                <FormControl>
                  <Input placeholder="pcs" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={data.category}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Baik">Baik</SelectItem>
                        <SelectItem value="Rusak">Rusak</SelectItem>
                        <SelectItem value="Hilang">Hilang</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Lantai 7" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="optional" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <div className="w-full">
                  {/* Jika ada image dari database dan belum dihapus → tampilkan dan tidak render dropzone */}
                  {data.image && !isDbImageRemoved ? (
                    <DbImagePreview
                      filePreviews={data.image}
                      onRemove={handleRemoveDbImage}
                    />
                  ) : (
                    <>
                      {/* Jika tidak ada image di DB atau user sudah hapus → tampilkan dropzone */}
                      <Dropzone
                        maxFiles={5}
                        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                        onDrop={(files) => {
                          handleDrop(files);
                          field.onChange(files);
                        }}
                      >
                        <DropzoneEmptyState />
                        <DropzoneContent />
                      </Dropzone>
                    </>
                  )}

                  {/* Preview gambar yang diupload user */}
                  {filePreviews.length > 0 && (
                    <ImagePreview
                      filePreviews={filePreviews}
                      onRemove={(index) => {
                        handleRemoveImage(index);
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

        <div className="flex justify-end gap-5">
          <Button variant={"outline"} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
