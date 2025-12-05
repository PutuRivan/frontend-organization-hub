import { type NextRequest, NextResponse } from "next/server";
import { CheckToken } from "./libs/apis";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value || "null";
  const dashboardPagePrefix = ["/admin", "/personel"];
  const authPagePrefix = ["/"];

  const isAuthPathname = [pathname].some((element) =>
    authPagePrefix.includes(element),
  );
  const isDashboardPathname = [pathname].some((element) =>
    dashboardPagePrefix.includes(element),
  );

  try {
    const response = await CheckToken(token);
    if (
      !response.dataToken &&
      (request.nextUrl.pathname.startsWith("/admin") ||
        request.nextUrl.pathname.startsWith("/personel")
      )
    ) {
      localStorage.removeItem("user_data");
      localStorage.removeItem("access_token");
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (response.dataToken) {
      const userRole = response.dataToken.role;

      if (isDashboardPathname) {
        if (
          request.nextUrl.pathname.startsWith("/personel") &&
          userRole === "Admin"
        ) {
          return NextResponse.redirect(new URL("/admin", request.nextUrl));
        }

        if (
          request.nextUrl.pathname.startsWith("/admin") &&
          userRole === "Personel"
        ) {
          return NextResponse.redirect(new URL("/personel", request.nextUrl));
        }

      }

      if (isAuthPathname) {
        if (userRole === "Admin") {
          return NextResponse.redirect(new URL("/admin", request.nextUrl));
        }

        if (userRole === "Personel") {
          return NextResponse.redirect(new URL("/personel", request.nextUrl));
        }
      }
    }
  } catch (error) {
    console.error("An error occurred while trying to change route.");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/personel/:path*',
  ],
}
