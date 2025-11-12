"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "@/context/auth-context";
import type { TUser } from "@/libs/types";
import {
  getAccessTokenFromCookie,
  getUserDataFromSessionStorage,
  removeAccessTokenFromCookie,
  removeUserDataFromSessionStorage,
  setAccessTokenInCookie,
  setUserDataInSessionStorage
} from "@/libs/utils";
import { useRouter } from "next/navigation";

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<TUser | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("")

  const router = useRouter();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error("Email atau password salah");
        return;
      }

      const { token, data: userData } = data;
      setAccessTokenInCookie(token);
      setUserDataInSessionStorage(userData)
      setUser(data.data);
      setToken(token)
      setAuthenticated(true);

      router.push('/admin')
      toast.success(`Selamat datang, ${userData.name}!`);

    } catch (error) { }
  };

  const logout = () => {
    removeAccessTokenFromCookie()
    removeUserDataFromSessionStorage()
    setUser(null);
    setAuthenticated(false);
    setToken("")
    toast.success("Berhasil logout");
    router.push('/')
  };

  useEffect(() => {
    const storedUser = getUserDataFromSessionStorage()
    const storedToken = getAccessTokenFromCookie();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setAuthenticated(true);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, token, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
