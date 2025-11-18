import { type ClassValue, clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
import type { TUser } from "../types";

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