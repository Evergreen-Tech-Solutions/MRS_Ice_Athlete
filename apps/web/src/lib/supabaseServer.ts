import { cookies } from "next/headers";
import { createServerClient as _createServerClient } from "@supabase/ssr";

export async function createServerClientSafe() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    console.error("Supabase envs missing at runtime", {
      HAS_URL: !!url,
      HAS_ANON: !!anon,
    });
    return null;
  }
  
  const cookieStore = await cookies();
  return _createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value ?? null;
      },
      set() {},
      remove() {},
    },
  });
}
