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
  sessionStorage.setItem("user_data", JSON.stringify(user));
}

export function getUserDataFromSessionStorage(): TUser | null {
  const user = sessionStorage.getItem("user_data");

  return user ? JSON.parse(user) : null;
}

export function removeUserDataFromSessionStorage() {
  sessionStorage.removeItem("user_data");
}
