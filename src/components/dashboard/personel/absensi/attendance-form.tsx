"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { createAttendance, getTodayAttendance } from "@/libs/apis";
import { attendanceSchema, type TAttendanceSchema } from "@/libs/schema";
import type { TAttendanceAbsentReason } from "@/libs/types";
import { getAccessTokenFromCookie } from "@/libs/utils";

const formatAttendanceTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  };

  const formattedDate = date.toLocaleString("id-ID", options);

  return formattedDate.replace(",", ", ").replace(/:\d{2}/, "") + " WIB.";
};

export default function AttendanceForm() {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "success" | "error" | "duplicate"
  >("success");
  const [submitTime, setSubmitTime] = useState("");
  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [isAttendanceCompleted, setIsAttendanceCompleted] = useState(false);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(true);

  // Get user data for form
  const fullName = user?.name || "";
  const personelNRP = user?.nrp || "";

  const form = useForm<TAttendanceSchema>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      status: "Hadir",
      remarks: "",
    },
  });

  const status = form.watch("status");

  // Check attendance status on mount
  useEffect(() => {
    const checkTodayAttendance = async () => {
      try {
        const token = getAccessTokenFromCookie();
        if (!token || token === "null") {
          setIsLoadingAttendance(false);
          return;
        }

        const todayAttendance = await getTodayAttendance(token, user?.id ?? "");
        form.setValue("status", todayAttendance?.status ?? "Hadir");
        form.setValue("absentReason", todayAttendance?.AbsentReason ?? "");
        // Check if attendance is completed (has time_out)
        if (todayAttendance?.time_out) {
          setIsAttendanceCompleted(true);
        }
      } catch (error) {
        // Silently fail - user might not have attendance today
        console.error("Error checking attendance:", error);
      } finally {
        setIsLoadingAttendance(false);
      }
    };

    checkTodayAttendance();
  }, [user?.id, form]);

  const onSubmit = async (values: TAttendanceSchema) => {
    try {
      const token = getAccessTokenFromCookie();

      if (!token || token === "null") {
        toast.error("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      const now = new Date();
      const formattedTime = formatAttendanceTime(now);

      // Prepare request data
      const requestData: {
        status?: string;
        absentReason?: TAttendanceAbsentReason;
        note?: string;
      } = {
        status: values.status,
      };

      if (values.status === "Kurang" && values.absentReason) {
        requestData.absentReason = values.absentReason;
      }

      if (values.remarks?.trim()) {
        requestData.note = values.remarks.trim();
      }

      // Call API
      const response = await createAttendance(token, requestData);

      // Set success message based on API response
      setAttendanceMessage(response.message || "Berhasil melakukan absensi");
      setSubmitTime(formattedTime);
      setDialogType("success");
      setIsDialogOpen(true);

      // Check if attendance is completed (checkout)
      if (response.data?.time_out) {
        setIsAttendanceCompleted(true);
      }

      // Reset form remarks if present
      if (values.status === "Hadir") {
        form.setValue("remarks", "");
        form.setValue("absentReason", undefined);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal melakukan absensi";

      // Check if error is about duplicate/complete attendance
      if (
        errorMessage.includes("sudah menyelesaikan") ||
        errorMessage.includes("sudah")
      ) {
        setDialogType("duplicate");
        setAttendanceMessage(errorMessage);
      } else {
        setDialogType("error");
        setAttendanceMessage(errorMessage);
        toast.error(errorMessage);
      }

      setIsDialogOpen(true);
    }
  };

  const getRadioClass = (value: string) => {
    const isActive = status === value;
    const activeColor =
      value === "Hadir"
        ? "border-green-600 bg-green-50"
        : "border-yellow-600 bg-yellow-50";
    const hoverColor =
      value === "Hadir" ? "hover:border-green-300" : "hover:border-yellow-300";

    return `flex items-center space-x-2 p-4 rounded-lg cursor-pointer border-2 transition w-full ${isActive
      ? `${activeColor} shadow-md scale-[1.02]`
      : `border-gray-200 ${hoverColor}`
      }`;
  };

  return (
    <>
      <Card className="p-8 shadow-lg hover:shadow-xl transition">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Form Absensi
            </h2>

            {/* Nama Lengkap - Read Only */}
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Loading..."
                  value={fullName}
                  readOnly
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
              </FormControl>
            </FormItem>

            {/* ID Personel - Read Only */}
            <FormItem>
              <FormLabel>NRP Personel</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Loading..."
                  value={personelNRP}
                  readOnly
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
              </FormControl>
            </FormItem>

            {/* Status Absensi */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status Kehadiran</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className={getRadioClass("Hadir")}>
                        <RadioGroupItem
                          value="Hadir"
                          id="Hadir"
                          className="mt-1"
                        />
                        <FormLabel
                          htmlFor="Hadir"
                          className="cursor-pointer flex-1 m-0 font-normal"
                        >
                          Hadir
                        </FormLabel>
                      </div>

                      <div className={getRadioClass("Kurang")}>
                        <RadioGroupItem
                          value="Kurang"
                          id="Kurang"
                          className="mt-1"
                        />
                        <FormLabel
                          htmlFor="Kurang"
                          className="cursor-pointer flex-1 m-0 font-normal"
                        >
                          Kurang (Tidak Hadir)
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alasan Absen - Conditional */}
            {status === "Kurang" && (
              <FormField
                control={form.control}
                name="absentReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alasan Ketidakhadiran</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih alasan..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Dinas",
                          "DIK",
                          "Izin",
                          "Cuti",
                          "Sakit",
                          "Hamil",
                          "BKO",
                          "TK",
                          "Terlambat",
                        ].map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Keterangan */}
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan Tambahan (Opsional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan keterangan tambahan jika ada..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  isAttendanceCompleted ||
                  isLoadingAttendance
                }
              >
                {isLoadingAttendance
                  ? "Memuat..."
                  : isAttendanceCompleted
                    ? "Absensi Selesai"
                    : form.formState.isSubmitting
                      ? "Mengirim..."
                      : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {/* ✨ Popup interaktif */}
      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {/* Kunci lebar dan hapus padding default dari DialogContent */}
            <DialogContent className="max-w-[300px] p-5 overflow-hidden rounded-xl border-none">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center p-5"
              >
                <DialogHeader className="p-4 pt-8 pb-6 text-center space-y-4">
                  {dialogType === "success" ? (
                    <>
                      <div className="mx-auto w-14 h-14 rounded-full bg-green-100/50 flex items-center justify-center mb-2">
                        <CheckCircle className="text-green-500 w-14 h-14 mb-2" />
                      </div>
                      <DialogTitle className="text-gray-900 text-xl font-bold p-0 m-0 text-center">
                        Absensi Berhasil!
                      </DialogTitle>
                      <DialogDescription className="text-gray-700 text-sm p-0 m-0 leading-relaxed font-normal text-center">
                        {attendanceMessage ||
                          "Anda telah berhasil melakukan absensi"}
                        <br />
                        pada {submitTime}
                      </DialogDescription>
                    </>
                  ) : dialogType === "duplicate" ? (
                    <>
                      <AlertTriangle className="mx-auto text-yellow-600 w-14 h-14 mb-2" />
                      <DialogTitle className="text-yellow-700 text-2xl font-semibold text-center">
                        Absensi Gagal
                      </DialogTitle>
                      <DialogDescription className="text-gray-700 text-center">
                        {attendanceMessage ||
                          "Data absensi dengan nama dan ID yang sama sudah tercatat sebelumnya."}
                      </DialogDescription>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mx-auto text-red-600 w-14 h-14 mb-2" />
                      <DialogTitle className="text-red-700 text-2xl font-semibold text-center">
                        Error
                      </DialogTitle>
                      <DialogDescription className="text-gray-700 text-center">
                        {attendanceMessage ||
                          "Terjadi kesalahan saat melakukan absensi."}
                      </DialogDescription>
                    </>
                  )}
                </DialogHeader>
                <DialogFooter className="flex py-3 w-full mt-4">
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    className={`
                    w-[70%] h-12 rounded-lg text-base font-medium
                    ${dialogType === "success"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : dialogType === "duplicate"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white
                    `}
                  >
                    Tutup
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
