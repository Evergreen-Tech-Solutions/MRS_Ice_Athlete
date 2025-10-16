// apps/web/src/lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Server-only Supabase client for RSC / route handlers.
 * Note: Next 15 makes `cookies()` async, so this function is async too.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies(); // <-- await!

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // In Server Components, cookie mutation is a no-op.
        set() {},
        remove() {},
      },
    }
  );
}
