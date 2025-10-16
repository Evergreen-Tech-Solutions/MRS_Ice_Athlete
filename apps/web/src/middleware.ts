import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(_req: NextRequest) {},
  {
    callbacks: {
      // TEMP while wiring: allow anyone; later enforce admin:
      // authorized: ({ token }) => (token as any)?.role === "admin"
      authorized: () => true,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
