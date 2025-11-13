"use client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";

import type React from "react";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

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
  const [fullName, setFullName] = useState("Budi Santoso");
  const [personnelId, setPersonnelId] = useState("USR-12345");
  const [attendanceType, setAttendanceType] = useState("present");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "duplicate">(
    "success",
  );
  const [submitTime, setSubmitTime] = useState("");

  const [submittedList, setSubmittedList] = useState<
    {
      fullName: string;
      personnelId: string;
      attendanceType: string;
      remarks: string;
    }[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("attendanceRecords");
    if (saved) setSubmittedList(JSON.parse(saved));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isDuplicate = submittedList.some(
      (r) =>
        r.fullName === fullName &&
        r.personnelId === personnelId &&
        r.attendanceType === attendanceType &&
        r.remarks === remarks,
    );

    if (isDuplicate) {
      setDialogType("duplicate");
      setIsDialogOpen(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const now = new Date();
      const formattedTime = formatAttendanceTime(now); // Gunakan format waktu yang diminta

      const newRecord = { fullName, personnelId, attendanceType, remarks };
      const updatedList = [...submittedList, newRecord];
      localStorage.setItem("attendanceRecords", JSON.stringify(updatedList));
      setSubmittedList(updatedList);

      setSubmitTime(formattedTime);
      setDialogType("success");
      setIsDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const radioClass = (value: string) =>
    `flex items-center space-x-2 p-4 rounded-lg cursor-pointer border-2 transition ${attendanceType === value
      ? "border-green-600 bg-green-50 shadow-md scale-[1.02]"
      : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <>
      <Card className="p-8 shadow-lg hover:shadow-xl transition">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Form Absensi</h2>

          <div className="space-y-2">
            <Label htmlFor="fullName">Nama Lengkap</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Budi Santoso"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personnelId">ID Personel</Label>
            <Input
              id="personnelId"
              type="text"
              placeholder="USR-12345"
              value={personnelId}
              onChange={(e) => setPersonnelId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Jenis Absensi</Label>
            <RadioGroup
              value={attendanceType}
              onValueChange={setAttendanceType}
            >
              <div className="grid grid-cols-3 gap-4">
                <div className={radioClass("present")}>
                  <RadioGroupItem value="present" id="present" />
                  <Label
                    htmlFor="present"
                    className="cursor-pointer flex-1 m-0"
                  >
                    Hadir
                  </Label>
                </div>

                <div className={radioClass("permission")}>
                  <RadioGroupItem value="permission" id="permission" />
                  <Label
                    htmlFor="permission"
                    className="cursor-pointer flex-1 m-0"
                  >
                    Izin
                  </Label>
                </div>

                <div className={radioClass("sick")}>
                  <RadioGroupItem value="sick" id="sick" />
                  <Label htmlFor="sick" className="cursor-pointer flex-1 m-0">
                    Sakit
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Tampilkan kolom keterangan hanya jika bukan hadir */}
          {attendanceType !== "present" && (
            <div className="space-y-2">
              <Label htmlFor="remarks">Keterangan</Label>
              <Textarea
                id="remarks"
                placeholder={`Masukkan alasan ${attendanceType === "permission" ? "izin" : "sakit"}`}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 transition-transform hover:scale-105"
            >
              {isSubmitting ? "Mengirim..." : "Submit"}
            </Button>
          </div>
        </form>
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
                        Anda telah berhasil melakukan absensi masuk
                        <br />
                        pada {submitTime}
                      </DialogDescription>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mx-auto text-yellow-600 w-14 h-14 mb-2" />
                      <DialogTitle className="text-yellow-700 text-2xl font-semibold text-center">
                        Anda Sudah Absen
                      </DialogTitle>
                      <DialogDescription className="text-gray-700 text-center">
                        Data absensi dengan nama dan ID yang sama sudah tercatat
                        sebelumnya.
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
                        : "bg-yellow-600 hover:bg-yellow-700"
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
