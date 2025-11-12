"use client";

import { createContext, useContext } from "react";
import type { TUser } from "@/libs/types";
import { TUserLoginSchema } from "@/libs/schema";

export const AuthContext = createContext(
  {} as {
    user: TUser | null;
    authenticated: boolean
    token: string
    login: ({ email, password }: TUserLoginSchema) => void;
    logout: () => void;
  },
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
