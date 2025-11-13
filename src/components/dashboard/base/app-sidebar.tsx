"use client";

import { Archive, Calendar, CalendarCheck, Command, FileText, Home, UsersRound } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import Navmain from "./nav-main";
import NavUser from "./nav-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  main: [
    {
      name: "Dashboard",
      url: "",
      icon: Home,
    },
    {
      name: "Manajemen Personel",
      url: "manajemen-personel",
      icon: UsersRound,
    },
    {
      name: "Absensi",
      url: "absensi",
      icon: CalendarCheck,
    },
    {
      name: "Inventaris Barang",
      url: "inventaris-barang",
      icon: Archive,
    },
    {
      name: "laporan",
      url: "laporan",
      icon: FileText,
    },
    {
      name: "Jadwal Kegiatan",
      url: "jadwal-kegiatan",
      icon: Calendar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  // 🔹 Mapping akses berdasarkan role
  const roleAccess: Record<string, string[]> = {
    Admin: ["Dashboard", "Inventaris Barang", "Absensi", "Laporan", "Jadwal Kegiatan", "Manajemen Personel"],
    Personel: ["Dashboard", "Absensi", "Jadwal Kegiatan"],
  };

  const role = user?.role || "Personel";

  const filteredMenu = data.main.filter((item) =>
    roleAccess[role]?.includes(item.name)
  );

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">SI Rotekinfo</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Navmain projects={filteredMenu} role={user?.role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
