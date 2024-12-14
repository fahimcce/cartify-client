import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Helper function to decode the user from the cookie
function getUserFromCookies(request: NextRequest) {
  const userCookie = request.cookies.get("user");

  if (userCookie) {
    try {
      // Access the value of the cookie and parse it
      return JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  return null;
}

// Define routes that don't require authentication
const AuthRoutes = ["/login", "/register"];

// Define roles and their corresponding routes
type Role = keyof typeof roleBasedRoute;

const roleBasedRoute = {
  ADMIN: [/^\/admin/],
  VENDOR: [/^\/vendor/],
  CUSTOMER: [/^\/customer/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the user from cookies
  const user = getUserFromCookies(request);
  // console.log(user);

  // If there's no user and the path is not part of the AuthRoutes, redirect to login
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the user has a role, check if they are authorized for the requested route
  if (user?.role && roleBasedRoute[user?.role as Role]) {
    const routes = roleBasedRoute[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If the user is not authorized for the route, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// Configure the routes to match
export const config = {
  matcher: ["/admin", "/admin/dashboard", "/customer", "/vendor"],
};
