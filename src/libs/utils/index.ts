import { type ClassValue, clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
import type { TAttendanceStatus, TUser } from "../types";

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

export function getAttendanceStatus(status: TAttendanceStatus) {
  const config: Record<string, { label: string; className: string }> = {
    Hadir: { label: "Hadir", className: "bg-green-100 text-green-800" },
    Izin: { label: "Izin", className: "bg-yellow-100 text-yellow-800" },
    Alfa: { label: "Alpha", className: "bg-red-100 text-red-800" },
    Sakit: { label: "Sakit", className: "bg-blue-100 text-blue-800" },
  };

  return config[status];
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}, ${hours}:${minutes}`;
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