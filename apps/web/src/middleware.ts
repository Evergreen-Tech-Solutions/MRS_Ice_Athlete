import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(_req: NextRequest) {},
  {
    callbacks: {
      authorized: ({ token }) => (token as any)?.role === "admin",
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
