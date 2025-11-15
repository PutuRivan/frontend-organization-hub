"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { createInventory, type TCreateInventory } from "@/libs/schema";
import type { TInventory } from "@/libs/types";
import ImagePreview from "../tambah-barang/image-preview";

interface UpdateInventarisForm {
  data: TInventory;
}

export default function UpdateInventarisForm({ data }: UpdateInventarisForm) {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
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

  const onSubmit = async (values: TCreateInventory) => {
    console.log(values);
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

        <div className="flex justify-end gap-5">
          <Button variant={"outline"}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
