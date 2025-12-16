"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createEvent } from "@/libs/apis";
import type { TEventSchema } from "@/libs/schema";
import { cn } from "@/libs/utils";

interface EventAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string;
  onSuccess?: () => void;
}

export default function EventAddDialog({
  open,
  onOpenChange,
  token,
  onSuccess,
}: EventAddDialogProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<TEventSchema>({
    defaultValues: {
      name: "",
      place: "",
      leader: "",
      category: "",
      dress_code: "",
      start_date: "",
      end_date: "",
      visibility: "Global",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    try {
      const result = await createEvent(token, data);
      if (!result.success) {
        throw new Error("Gagal menambahkan kegiatan");
      }
      toast.success("Kegiatan berhasil ditambahkan");
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Gagal menambahkan kegiatan");
    } finally {
      setLoading(false);
      router.refresh();
      reset();
    }
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
                <p className="text-red-500">{errors.name.message}</p>
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
                  <p className="text-red-500">{errors.place.message}</p>
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
                  <p className="text-red-500">{errors.leader.message}</p>
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
                  <p className="text-red-500">{errors.category.message}</p>
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
                  <p className="text-red-500">{errors.dress_code.message}</p>
                )}
              </Field>
            </div>

            <div className="flex gap-2">
              <Controller
                control={control}
                name="start_date"
                render={({ field }) => (
                  <Field className="flex flex-col gap-2 w-full">
                    <FieldLabel htmlFor="start_date">Tanggal Mulai</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP p")
                          ) : (
                            <span>Pilih tanggal & waktu</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (!date) {
                              field.onChange("");
                              return;
                            }
                            const current = field.value ? new Date(field.value) : new Date();
                            const newDate = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                              current.getHours(),
                              current.getMinutes()
                            );
                            field.onChange(format(newDate, "yyyy-MM-dd HH:mm"));
                          }}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 opacity-50" />
                            <Input
                              type="time"
                              className="w-full"
                              value={field.value ? format(new Date(field.value), "HH:mm") : "00:00"}
                              onChange={(e) => {
                                const time = e.target.value;
                                if (!time) return;
                                const [hours, minutes] = time.split(":").map(Number);
                                const current = field.value ? new Date(field.value) : new Date();
                                const newDate = new Date(
                                  current.getFullYear(),
                                  current.getMonth(),
                                  current.getDate(),
                                  hours,
                                  minutes
                                );
                                field.onChange(format(newDate, "yyyy-MM-dd HH:mm"));
                              }}
                            />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    {errors.start_date && (
                      <p className="text-red-500">
                        {errors.start_date.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="end_date"
                render={({ field }) => (
                  <Field className="flex flex-col gap-2 w-full">
                    <FieldLabel htmlFor="end_date">Tanggal Selesai</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP p")
                          ) : (
                            <span>Pilih tanggal & waktu</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (!date) {
                              field.onChange("");
                              return;
                            }
                            const current = field.value ? new Date(field.value) : new Date();
                            const newDate = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                              current.getHours(),
                              current.getMinutes()
                            );
                            field.onChange(format(newDate, "yyyy-MM-dd HH:mm"));
                          }}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 opacity-50" />
                            <Input
                              type="time"
                              className="w-full"
                              value={field.value ? format(new Date(field.value), "HH:mm") : "00:00"}
                              onChange={(e) => {
                                const time = e.target.value;
                                if (!time) return;
                                const [hours, minutes] = time.split(":").map(Number);
                                const current = field.value ? new Date(field.value) : new Date();
                                const newDate = new Date(
                                  current.getFullYear(),
                                  current.getMonth(),
                                  current.getDate(),
                                  hours,
                                  minutes
                                );
                                field.onChange(format(newDate, "yyyy-MM-dd HH:mm"));
                              }}
                            />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    {errors.end_date && (
                      <p className="text-red-500">{errors.end_date.message}</p>
                    )}
                  </Field>
                )}
              />
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
            <Button type="submit" disabled={loading}>
              Tambah
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
