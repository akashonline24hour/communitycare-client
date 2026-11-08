import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PRIVATE_ROUTES = ["/events/create", "/events/manage", "/events/joined"];
const AUTH_PAGES = ["/login", "/register"];

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Verify the real session, not just that a cookie exists
  let session = null;
  try {
    session = await auth.api.getSession({ headers: request.headers });
  } catch {
    session = null;
  }

  // Logged-in users can't open Login or Register: send them Home
  if (AUTH_PAGES.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Logged-out users can't open private pages: send them to Login
  if (PRIVATE_ROUTES.includes(pathname) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/events/create",
    "/events/manage",
    "/events/joined",
  ],
};
