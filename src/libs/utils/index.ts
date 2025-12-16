import { type ClassValue, clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
import type { TAttendanceAbsentReason, TAttendanceStatus, TUser } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setAccessTokenInCookie(token: string) {
  Cookies.set("access_token", JSON.stringify(token), { expires: 1 });
}

export function getAccessTokenFromCookie(): string {
  const token = Cookies.get("access_token");

  return token ?? "null";
}

export function removeAccessTokenFromCookie() {
  Cookies.remove("access_token");
}

export function setUserDataInSessionStorage(user: TUser) {
  localStorage.setItem("user_data", JSON.stringify(user));
}

export function getUserDataFromSessionStorage(): TUser | null {
  const user = localStorage.getItem("user_data");

  return user ? JSON.parse(user) : null;
}

export function removeUserDataFromSessionStorage() {
  localStorage.removeItem("user_data");
}

export function getInventoryCategory(category: string) {
  switch (category) {
    case "Baik":
      return "bg-green-100 text-green-800";
    case "Rusak Ringan":
      return "bg-yellow-100 text-yellow-800";
    case "Rusak":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function getAttendanceStatus(status: TAttendanceStatus | TAttendanceAbsentReason | "Default") {
  const config: Record<string, { label: string; className: string }> = {
    Hadir: { label: "Hadir", className: "bg-green-100 text-green-800" },
    Kurang: { label: "Kurang", className: "bg-red-100 text-red-800" },
    Dinas: { label: "Dinas", className: "bg-red-100 text-red-800" },
    DIK: { label: "DIK", className: "bg-red-100 text-red-800" },
    Izin: { label: "Izin", className: "bg-red-100 text-red-800" },
    Cuti: { label: "Cuti", className: "bg-red-100 text-red-800" },
    Sakit: { label: "Sakit", className: "bg-red-100 text-red-800" },
    Hamil: { label: "Hamil", className: "bg-red-100 text-red-800" },
    BKO: { label: "BKO", className: "bg-red-100 text-red-800" },
    TK: { label: "TK", className: "bg-red-100 text-red-800" },
    Terlambat: { label: "Terlambat", className: "bg-red-100 text-red-800" },
    Default: { label: "-", className: "bg-gray-100 text-gray-800" },
  };

  return config[status];
}

type DateFormatOption =
  | "LONG_DATE"
  | "LONG_DATE_TIME"
  | "SHORT_DATE"
  | "SHORT_DATE_TIME"
  | "TIME";

export function formatDateTime(
  dateString: string,
  format: DateFormatOption = "SHORT_DATE"
): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-";

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  switch (format) {
    case "LONG_DATE":
      // 14 Desember 2025
      return `${day} ${monthNames[month - 1]} ${year}`;

    case "LONG_DATE_TIME":
      // 14 Desember 2025, 10.00 WIB
      return `${day} ${monthNames[month - 1]} ${year}, ${hours}.${minutes} WIB`;

    case "SHORT_DATE":
      // 14 - 12 - 2025
      return `${String(day).padStart(2, "0")} - ${String(month).padStart(
        2,
        "0"
      )} - ${year}`;

    case "SHORT_DATE_TIME":
      // 14 - 12 - 2025, 10.00 WIB
      return `${String(day).padStart(2, "0")} - ${String(month).padStart(
        2,
        "0"
      )} - ${year}, ${hours}.${minutes} WIB`;

    case "TIME":
      return `${hours}.${minutes} WIB`;

    default:
      return "-";
  }
}

export function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.split(" ").filter((part) => part.length > 0);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  } else if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return "";
};

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};