"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllAttendance } from "@/libs/apis";
import { getAccessTokenFromCookie, getTodayDate } from "@/libs/utils";
import AttendanceFilterContainer from "./attendance-filter-container";
import AttendancePagination from "./attendance-pagination";
import AttendanceTable from "./attendance-table";

export function AttendanceReport() {
  const [date, setDate] = useState(getTodayDate());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [loading, setLoading] = useState(false);

  const token = getAccessTokenFromCookie();

  const fetchData = useCallback(async () => {
    setLoading(true);
    console.log({date})
    try {
      const result = await getAllAttendance(
        token,
        currentPage,
        itemsPerPage,
        date,
        search,
        status
      );
      setData(result.data);
      setTotalItems(result.pagination.totalData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [token, currentPage, date, search, status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
