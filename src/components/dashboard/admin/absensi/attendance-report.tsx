/** biome-ignore-all lint/suspicious/noExplicitAny: explicit any is needed for dynamic data */
/** biome-ignore-all lint/suspicious/noImplicitAnyLet: variable initialized later */
"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllAttendance, getAllPersonel } from "@/libs/apis";
import { getAccessTokenFromCookie, getTodayDate } from "@/libs/utils";
import AttendanceFilterContainer from "./attendance-filter-container";
import AttendancePagination from "./attendance-pagination";
import AttendanceTable from "./attendance-table";

export function AttendanceReport() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState(searchParams.get("date") || getTodayDate());
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [currentPage, setCurrentPage] = useState(1);
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const [data, setData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const token = getAccessTokenFromCookie();

  const fetchData = useCallback(
    async (page: number) => {
      try {
        setLoading(true);

        // Check if there are any filters applied
        // Default state: today's date, empty search, empty status
        const isDefaultDate = date === getTodayDate();
        const isFiltered = search !== "" || status !== "" || !isDefaultDate;

        let result;
        let mappedData = [];

        if (isFiltered) {
          // If filtered, fetch from getAllAttendance
          result = await getAllAttendance(
            token,
            page,
            itemsPerPage,
            date,
            search,
            status,
          );

          // Normalize getAllAttendance data for the table
          // Attendance object -> { ..., name: user.name, jabatan: user.jabatan }
          mappedData = (result.data || []).map((item: any) => ({
            ...item,
            name: item.user?.name,
            jabatan: item.user?.jabatan,
          }));
        } else {
          // If no filters (initial state), fetch from getAllPersonel
          result = await getAllPersonel(token, page, itemsPerPage);

          // Normalize getAllPersonel data for the table
          // User object -> { ..., status: user.attendance[0]?.status, AbsentReason: user.attendance[0]?.AbsentReason }
          mappedData = (result.data || []).map((item: any) => {
            const attendance = item.attendance?.[0];
            return {
              ...item,
              status: attendance?.status,
              AbsentReason: attendance?.AbsentReason,
            };
          });
        }

        setData(mappedData);
        setTotalItems(
          isFiltered
            ? result.pagination?.totalData || 0
            : result.pagination?.totalUser || 0,
        );
      } catch (error) {
        console.error(error);
        toast.error("Terjadi Kesalahan saat Mengambil Data");
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [token, date, search, status],
  );

  useEffect(() => {
    // Reset page to 1 if search/status/date changes?
    // Usually good UX, but might cause loop if not careful.
    // The user handles calling setCurrentPage(1) in the FilterContainer explicitly?
    // Let's just call fetchData when page or dependencies change.
    // However, if search/status changes, we usually want to go to page 1.
    // Let's assume the FilterContainer handles setPage(1).
    fetchData(currentPage);
  }, [fetchData, currentPage]);

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
        <AttendanceTable data={data} />
      )}

      {/* Pagination */}
      <AttendancePagination
        searchTerm={search}
        filteredData={data}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </div>
  );
}
