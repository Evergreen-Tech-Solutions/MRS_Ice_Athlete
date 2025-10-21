// apps/web/src/app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";

export default function AuthCallbackPage() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();
  const search = useSearchParams();

  const [status, setStatus] = useState<
    "exchanging" | "ready" | "done" | "error"
  >("exchanging");
  const [message, setMessage] = useState<string | null>(null);

  // Password fields for recovery flow
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Supabase email links (signup confirm & recovery) include a `code` param
        const code = search.get("code");
        if (code) {
          // Exchange code for a session
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }
        // If this is a signup confirmation, user has a session; we can bounce them to signin
        // For recovery, we will let them set a new password below.
        setStatus("ready");
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.message ?? "Invalid or expired link.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setUpdating(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setStatus("done");
      setMessage("Password updated. You can now sign in.");
      // small delay then redirect
      setTimeout(() => router.replace("/signin"), 800);
    } catch (err: any) {
      setMessage(err?.message ?? "Could not update password.");
    } finally {
      setUpdating(false);
    }
  }

  if (status === "exchanging") {
    return (
      <div className="min-h-[50vh] grid place-items-center p-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          Checking link…
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[50vh] grid place-items-center p-6">
        <div className="max-w-sm w-full rounded-xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-xl font-semibold mb-2">Link problem</h1>
          <p className="text-sm opacity-80 mb-4">{message}</p>
          <a href="/signin" className="underline">
            Go to sign in
          </a>
        </div>
      </div>
    );
  }

  // READY: show password form (works for recovery),
  // or let users just proceed to sign in if they confirmed their email.
  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold mb-2">Set a new password</h1>
        <p className="opacity-70 mb-6 text-sm">
          If you just confirmed your email, you can ignore this and{" "}
          <a href="/signin" className="underline">
            sign in
          </a>
          . If you’re resetting your password, set a new one below.
        </p>

        <form onSubmit={handlePasswordUpdate} className="space-y-3">
          <input
            type="password"
            required
            placeholder="New password"
            className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={updating}
          />
          <input
            type="password"
            required
            placeholder="Confirm new password"
            className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={updating}
          />
          <button
            type="submit"
            className="w-full rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-60"
            disabled={updating}
          >
            {updating ? "Updating…" : "Update password"}
          </button>
        </form>

        {message && (
          <div className="mt-4 rounded-lg bg-black/30 p-3 text-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
