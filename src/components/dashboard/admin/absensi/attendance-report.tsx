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
  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getTodayDate());
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
    setStartDate(getTodayDate());
    setSearch("");
    setCurrentPage(1);
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
