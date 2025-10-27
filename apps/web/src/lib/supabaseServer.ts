import { cookies } from "next/headers";
import { createServerClient as _createServerClient } from "@supabase/ssr";

export async function createServerClient() {
  const cookieStore = await cookies(); 
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    // Fail fast at runtime (never at build now that /auth/callback is dynamic)
    throw new Error("@supabase/ssr: missing env at runtime");
  }

  return _createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value ?? null;
      },
      // no-ops in RSC; implement set/remove in route handlers if you need to write cookies
      set() {},
      remove() {},
    },
  });
}
