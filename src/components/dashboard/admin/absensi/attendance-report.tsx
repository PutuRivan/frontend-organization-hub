"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PersonnelData {
  id: string;
  name: string;
  position: string;
  date: string;
  status: "hadir" | "izin" | "alpha" | "sakit";
}

const sampleData: PersonnelData[] = [
  {
    id: "1",
    name: "Ahmad Yani",
    position: "Software Engineer",
    date: "2023-10-25",
    status: "hadir",
  },
  {
    id: "2",
    name: "Budi Santoso",
    position: "UI/UX Designer",
    date: "2023-10-25",
    status: "hadir",
  },
  {
    id: "3",
    name: "Citra Lestari",
    position: "Project Manager",
    date: "2023-10-25",
    status: "izin",
  },
  {
    id: "4",
    name: "Dewi Anggraini",
    position: "QA Engineer",
    date: "2023-10-25",
    status: "alpha",
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    position: "DevOps Engineer",
    date: "2023-10-25",
    status: "sakit",
  },
];

const statusConfig = {
  hadir: { label: "Hadir", className: "bg-green-100 text-green-800" },
  izin: { label: "Izin", className: "bg-yellow-100 text-yellow-800" },
  alpha: { label: "Alpha", className: "bg-red-100 text-red-800" },
  sakit: { label: "Sakit", className: "bg-blue-100 text-blue-800" },
};

export function AttendanceReport() {
  const [startDate, setStartDate] = useState("10/01/2023");
  const [endDate, setEndDate] = useState("10/31/2023");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleReset = () => {
    setStartDate("10/01/2023");
    setEndDate("10/31/2023");
    setCurrentPage(1);
  };

  const handleExport = () => {
    alert("Export data functionality would be implemented here");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Rekap Kehadiran Personel
        </h1>
        <p className="text-muted-foreground">
          Lihat dan kelola rekapitulasi kehadiran seluruh personel.
        </p>
      </div>

      {/* Filters Card */}
      <Card className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tanggal Mulai</label>
            <Input
              type="date"
              value={startDate.split("/").reverse().join("-")}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                setStartDate(`${month}/${day}/${year}`);
              }}
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tanggal Selesai</label>
            <Input
              type="date"
              value={endDate.split("/").reverse().join("-")}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                setEndDate(`${month}/${day}/${year}`);
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 bg-transparent"
            >
              Reset
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Terapkan Filter
            </Button>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExport}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Ekspor Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Table Card */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>NAMA PERSONEL</TableHead>
              <TableHead>JABATAN</TableHead>
              <TableHead>TANGGAL</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {item.position}
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusConfig[item.status].className}
                  >
                    {statusConfig[item.status].label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t bg-muted/50 px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Menampilkan 1-{itemsPerPage} dari {totalItems} hasil
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
    </div>
  );
}
