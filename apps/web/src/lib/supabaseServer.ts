// apps/web/src/lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient as _createServerClient } from "@supabase/ssr";

export async function createServerClient() {
  const cookieStore = await cookies();

  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // no-ops satisfy the interface in RSC
        set() {},
        remove() {},
      },
    }
  );
}
