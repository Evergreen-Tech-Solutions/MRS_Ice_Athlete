// apps/web/src/lib/supabaseBrowser.ts
"use client";
import { createBrowserClient } from "@supabase/ssr";

export function getBrowserSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // Avoid cryptic crashes during local dev
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }
    throw new Error("Supabase client not configured");
  }

  return createBrowserClient(url, anon);
}
