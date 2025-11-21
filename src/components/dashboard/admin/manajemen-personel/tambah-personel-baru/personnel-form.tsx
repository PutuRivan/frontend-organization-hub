'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone'
import ImagePreview from '../../inventaris-barang/create/image-preview'
import { useState } from 'react'
import { personelSchema, TPersonelSchema } from '@/libs/schema'

export default function PersonnelForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<TPersonelSchema>({
    resolver: zodResolver(personelSchema),
    defaultValues: {
      nama: '',
      nrp: '',
      jabatan: '',
      pangkat: '',
      password: '',
      image: null,
      email: '',
      role: 'Personel',
      status: true
    },
  })

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
    setLoading(true)
    console.log('Form submitted:', values)
    setLoading(false)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Nama Lengkap */}
          <FormField
            control={form.control}
            name="nama"
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
          {/* Nomor Telepon */}
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
                  <Input type="email" placeholder="email@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Foto Personel */}
        <FormField
          control={form.control}
          name='image'
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
          <Button variant="outline" disabled={loading}>
            Batal
          </Button>
          <Button type="submit" disabled={loading}>
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  )
}
