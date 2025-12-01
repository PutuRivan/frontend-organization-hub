"use client";

import { createContext, useContext } from "react";
import type { TUserLoginSchema } from "@/libs/schema";
import type { TUser } from "@/libs/types";

export const AuthContext = createContext(
  {} as {
    user: TUser | null;
    authenticated: boolean;
    token: string;
    loading: boolean;
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
