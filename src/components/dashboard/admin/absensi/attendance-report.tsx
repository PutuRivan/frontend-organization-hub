"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getAllAttendance } from "@/libs/apis";
import type { TAttandance } from "@/libs/types";
import { getAccessTokenFromCookie, getTodayDate } from "@/libs/utils";
import AttendanceFilterContainer from "./attendance-filter-container";
import AttendancePagination from "./attendance-pagination";
import AttendanceTable from "./attendance-table";

export function AttendanceReport() {
  const [date, setDate] = useState(getTodayDate());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<TAttandance[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const token = getAccessTokenFromCookie();

  const fetchData = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        console.log({ date });
        const result = await getAllAttendance(
          token,
          page,
          itemsPerPage,
          date,
          search,
          status
        );
        setData(result.data || []);
        setTotalItems(result.pagination?.totalData || 0);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi Kesalahan saat Mengambil Data");
      } finally {
        setLoading(false);
      }
    },
    [token, date, search, status]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const normalizedQuery = search.toLowerCase();
    return data.filter((item) =>
      item.user?.name?.toLowerCase().includes(normalizedQuery)
    );
  }, [data, search]);

  const handleReset = () => {
    setDate(getTodayDate());
    setSearch("");
    setStatus("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <AttendanceFilterContainer
        date={date}
        search={search}
        status={status}
        setDate={setDate}
        setSearch={setSearch}
        setStatus={setStatus}
        setCurrentPage={setCurrentPage}
        handleReset={handleReset}
      />

      {/* Table */}
      {loading ? (
        <p className="text-center text-muted-foreground py-10">
          Memuat data...
        </p>
      ) : (
        <AttendanceTable data={filteredData} />
      )}

      {/* Pagination */}
      <AttendancePagination
        searchTerm={search}
        filteredData={filteredData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </div>
  );
}
