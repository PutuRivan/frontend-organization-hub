"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TEventSchema } from "@/libs/schema";

interface EventAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EventAddDialog({
  open,
  onOpenChange,
}: EventAddDialogProps) {

  const {
    handleSubmit,
    register,
    reset,
    
    formState: { errors }
  } = useForm<TEventSchema>({
    defaultValues: {
      name: "",
      place: "",
      leader: "",
      category: "",
      dress_code: "",
      start_date: "",
      end_date: "",
    }
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onOpenChange(false);
    reset();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kegiatan</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nama Kegiatan</FieldLabel>
              <Input
                id="name"
                autoComplete="off"
                placeholder="Masukkan nama kegiatan"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">
                  {errors.name.message}
                </p>
              )}
            </Field>
            <div className="flex gap-2">
              <Field>
                <FieldLabel htmlFor="place">Tempat</FieldLabel>
                <Input
                  id="place"
                  autoComplete="off"
                  placeholder="Masukkan tempat"
                  {...register("place")}
                />
                {errors.place && (
                  <p className="text-red-500">
                    {errors.place.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="leader">Pimpinan</FieldLabel>
                <Input
                  id="leader"
                  autoComplete="off"
                  placeholder="Masukkan nama Pimpinan"
                  {...register("leader")}
                />
                {errors.leader && (
                  <p className="text-red-500">
                    {errors.leader.message}
                  </p>
                )}
              </Field>
            </div>
            <div className="flex gap-2">
              <Field>
                <FieldLabel htmlFor="category">Kategori</FieldLabel>
                <Input
                  id="category"
                  type="text"
                  placeholder="Masukkan kategori"
                  {...register("category")}
                />
                {errors.category && (
                  <p className="text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="dress_code">Pakaian</FieldLabel>
                <Input
                  id="dress_code"
                  type="text"
                  placeholder="Masukkan pakaian"
                  {...register("dress_code")}
                />
                {errors.dress_code && (
                  <p className="text-red-500">
                    {errors.dress_code.message}
                  </p>
                )}
              </Field>
            </div>

            <div className="flex gap-2">
              <Field>
                <FieldLabel htmlFor="start_date">Tanggal Mulai</FieldLabel>
                <Input
                  id="start_date"
                  type="date"
                  required
                  {...register("start_date")}
                />
                {errors.start_date && (
                  <p className="text-red-500">
                    {errors.start_date.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="end_date">Tanggal Selesai</FieldLabel>
                <Input
                  id="end_date"
                  type="date"
                  required
                  {...register("end_date")}
                />
                {errors.end_date && (
                  <p className="text-red-500">
                    {errors.end_date.message}
                  </p>
                )}
              </Field>
            </div>
          </FieldGroup>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit">
              Tambah
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
