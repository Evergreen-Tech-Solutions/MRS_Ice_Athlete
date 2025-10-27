// apps/web/src/app/reset-password/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";


export default function ResetPasswordPage() {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const redirectTo =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") + "/auth/callback";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (error) throw error;
      setMsg("If the email exists, a reset link has been sent.");
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold mb-2">Reset password</h1>
        <p className="opacity-70 mb-6 text-sm">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
          />
          <button
            type="submit"
            className="w-full rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-60"
            disabled={busy}
          >
            {busy ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {msg && (
          <div className="mt-4 rounded-lg bg-black/30 p-3 text-sm">{msg}</div>
        )}
      </div>
    </div>
  );
}
