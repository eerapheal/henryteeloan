import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(function middleware(req) {
  const token = req.auth;
  const isAuth = !!token;
  const isAdmin = token?.user && (token.user as any).role === "admin";

  // Proxy-like behavior: If trying to access admin without permissions,
  // we rewrite to the sign-in page instead of a hard redirect,
  // or we rewrite to home to mask the admin route.
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!isAuth) {
      // Rewrite to signin page to maintain the admin URL in the browser
      return NextResponse.rewrite(new URL("/auth/signin", req.url));
    }

    if (!isAdmin) {
      // If authenticated but not admin, proxy them back to the home page content
      return NextResponse.rewrite(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
