"use client";

import { Download } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllAttendance } from "@/libs/apis";
import { getAccessTokenFromCookie } from "@/libs/utils";
import AttendanceFilterContainer from "./attendance-filter-container";
import AttendancePagination from "./attendance-pagination";
import AttendanceTable from "./attendance-table";

export function AttendanceReport() {
  const [startDate, setStartDate] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [loading, setLoading] = useState(false);

  const token = getAccessTokenFromCookie();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllAttendance(
        token,
        currentPage,
        itemsPerPage,
        startDate,
        search
      );
      setData(result.data);
      setTotalItems(result.pagination.totalData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [token, currentPage, startDate, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReset = () => {
    setStartDate("");
    setSearch("");
    setCurrentPage(1);
  };

  const handleExport = () => {
    alert("Export data functionality would be implemented here");
  };


  return (
    <div className="space-y-5">
      {/* Filters */}
      <AttendanceFilterContainer
        startDate={startDate}
        search={search}
        setStartDate={setStartDate}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
        handleReset={handleReset}
      />

      {/* Export */}
      <div className="flex justify-end">
        <Button variant="outline" size="lg" onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Ekspor Data
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center py-6">Memuat data...</p>
      ) : (
        <AttendanceTable data={data} />
      )}

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
