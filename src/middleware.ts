/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrenUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoute;

const roleBasedRoute = {
  ADMIN: [/^\/admin/],
  VENDOR: [/^\/vendor/],
  CUSTOMER: [/^\/customer/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrenUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user?.role && roleBasedRoute[user?.role as Role]) {
    const routes = roleBasedRoute[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:page*",
    "/customer",
    "/customer/:page*",
    "/vendor",
    "/vendor/:page*",
  ],
};
