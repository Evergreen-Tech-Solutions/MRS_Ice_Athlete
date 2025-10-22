// apps/web/src/lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient as _createServerClient } from "@supabase/ssr";

/**
 * Server-side Supabase client for RSC/SSR (Next 15).
 * NOTE: cookies() is async in your environment → await it.
 */
export async function createServerClient() {
  const cookieStore = await cookies(); // ✅ await the Promise<ReadonlyRequestCookies>

  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // no-ops in RSC; do real set/remove in route handlers if needed
        set() {},
        remove() {},
      },
    }
  );
}
