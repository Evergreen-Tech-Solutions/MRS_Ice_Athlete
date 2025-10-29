"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    // Clear browser-side session & refresh token
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    try {
      await supabase.auth.signOut({ scope: "global" });
    } catch {
      // ignore — we’re redirecting anyway
    }
    router.replace("/signin");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-sm"
    >
      Log out
    </button>
  );
}
