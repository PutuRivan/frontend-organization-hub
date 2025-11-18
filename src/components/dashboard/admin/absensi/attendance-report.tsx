"use client";

import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttendanceStatus } from "@/libs/utils";
import AttendanceFilterContainer from "./attendance-filter-container";
import AttendancePagination from "./attendance-pagination";
import AttendanceTable from "./attendance-table";

interface PersonnelData {
  id: string;
  name: string;
  position: string;
  date: string;
  status: "Hadir" | "Izin" | "Alfa" | "Sakit";
}

const sampleData: PersonnelData[] = [
  {
    id: "1",
    name: "Ahmad Yani",
    position: "Software Engineer",
    date: "2023-10-25",
    status: "Hadir",
  },
  {
    id: "2",
    name: "Budi Santoso",
    position: "UI/UX Designer",
    date: "2023-10-25",
    status: "Hadir",
  },
  {
    id: "3",
    name: "Citra Lestari",
    position: "Project Manager",
    date: "2023-10-25",
    status: "Izin",
  },
  {
    id: "4",
    name: "Dewi Anggraini",
    position: "QA Engineer",
    date: "2023-10-25",
    status: "Alfa",
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    position: "DevOps Engineer",
    date: "2023-10-25",
    status: "Sakit",
  },
];

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
    <div className="space-y-5">
      {/* Filters Card */}
      <AttendanceFilterContainer
        startDate={startDate}
        endDate={endDate}
        handleReset={handleReset}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
      {/* Export Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="lg"
          onClick={handleExport}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Ekspor Data
        </Button>
      </div>

      {/* Table Card */}
      <AttendanceTable sampleData={sampleData} />

      {/* Pagination */}
      <AttendancePagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </div>
  );
}
