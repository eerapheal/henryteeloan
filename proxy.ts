import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdmin = token?.role === "admin";

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
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // This determines if the middleware function above runs.
        // Returning true here allows us to handle the logic manually in the function.
        return true; 
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
