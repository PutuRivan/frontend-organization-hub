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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { createAttendance, getTodayAttendance } from "@/libs/apis";
import { attendanceSchema, type TAttendanceSchema } from "@/libs/schema";
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
  const personnelId = user?.id || "";

  const form = useForm<TAttendanceSchema>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      attendanceType: "alfa",
      remarks: "",
    },
  });

  const attendanceType = form.watch("attendanceType");

  // Check attendance status on mount
  useEffect(() => {
    const checkTodayAttendance = async () => {
      try {
        const token = getAccessTokenFromCookie();
        if (!token || token === "null") {
          setIsLoadingAttendance(false);
          return;
        }

        const todayAttendance = await getTodayAttendance(token);

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
  }, []);

  // Map form values to backend status values
  const mapStatusToBackend = (
    status: string,
  ): "Hadir" | "Izin" | "Sakit" | "Alfa" | undefined => {
    const statusMap: Record<string, "Hadir" | "Izin" | "Sakit" | "Alfa"> = {
      present: "Hadir",
      permission: "Izin",
      sick: "Sakit",
      alfa: "Alfa",
    };
    return statusMap[status];
  };

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
        status?: "Hadir" | "Izin" | "Sakit" | "Alfa";
        note?: string;
      } = {};

      const mappedStatus = mapStatusToBackend(values.attendanceType);
      if (mappedStatus) {
        requestData.status = mappedStatus;
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
      if (values.attendanceType === "present") {
        form.setValue("remarks", "");
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
    const colorMap: Record<
      string,
      { active: string; inactive: string; hover: string }
    > = {
      present: {
        active: "border-green-600 bg-green-50",
        inactive: "border-gray-200",
        hover: "hover:border-green-300",
      },
      permission: {
        active: "border-yellow-600 bg-yellow-50",
        inactive: "border-gray-200",
        hover: "hover:border-yellow-300",
      },
      sick: {
        active: "border-blue-600 bg-blue-50",
        inactive: "border-gray-200",
        hover: "hover:border-blue-300",
      },
      alfa: {
        active: "border-red-600 bg-red-50",
        inactive: "border-gray-200",
        hover: "hover:border-red-300",
      },
    };

    const colors = colorMap[value] || colorMap.present;
    const isActive = attendanceType === value;

    return `flex items-center space-x-2 p-4 rounded-lg cursor-pointer border-2 transition ${isActive
      ? `${colors.active} shadow-md scale-[1.02]`
      : `${colors.inactive} ${colors.hover}`
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
              <FormLabel>ID Personel</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Loading..."
                  value={personnelId}
                  readOnly
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
              </FormControl>
            </FormItem>

            {/* Jenis Absensi */}
            <FormField
              control={form.control}
              name="attendanceType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Jenis Absensi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-1"
                    >
                      <div className="grid grid-cols-4 gap-4">
                        <div className={getRadioClass("present")}>
                          <RadioGroupItem
                            value="present"
                            id="present"
                            className="mt-1"
                          />
                          <FormLabel
                            htmlFor="present"
                            className="cursor-pointer flex-1 m-0 font-normal"
                          >
                            Hadir
                          </FormLabel>
                        </div>

                        <div className={getRadioClass("permission")}>
                          <RadioGroupItem
                            value="permission"
                            id="permission"
                            className="mt-1"
                          />
                          <FormLabel
                            htmlFor="permission"
                            className="cursor-pointer flex-1 m-0 font-normal"
                          >
                            Izin
                          </FormLabel>
                        </div>

                        <div className={getRadioClass("sick")}>
                          <RadioGroupItem
                            value="sick"
                            id="sick"
                            className="mt-1"
                          />
                          <FormLabel
                            htmlFor="sick"
                            className="cursor-pointer flex-1 m-0 font-normal"
                          >
                            Sakit
                          </FormLabel>
                        </div>

                        <div className={getRadioClass("alfa")}>
                          <RadioGroupItem
                            value="alfa"
                            id="alfa"
                            className="mt-1"
                          />
                          <FormLabel
                            htmlFor="alfa"
                            className="cursor-pointer flex-1 m-0 font-normal"
                          >
                            Alfa
                          </FormLabel>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Keterangan - Conditional */}
            {attendanceType !== "present" && (
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keterangan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          attendanceType === "permission"
                            ? "Masukkan alasan izin"
                            : attendanceType === "sick"
                              ? "Masukkan alasan sakit"
                              : "Masukkan keterangan alfa"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  isAttendanceCompleted ||
                  isLoadingAttendance
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
