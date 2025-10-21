// apps/web/src/app/signin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowser";

export default function SignInPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Update this to your deployed/site URL in Supabase "Site URL" setting
  const emailRedirectTo =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") + "/auth/callback";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Minimal: let server guards decide destination.
        router.replace("/dashboard"); 
      } else {
        // SIGN UP (will send a verification email when confirmations are enabled)
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo },
        });
        if (error) throw error;
        setMsg(
          "Check your inbox for a confirmation link. After confirming, come back and sign in."
        );
      }
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome</h1>
        <p className="opacity-70 mb-6 text-sm">
          {mode === "signin" ? "Sign in to your account." : "Create an account to book classes."}
        </p>

        <div className="mb-4 flex gap-2">
          <button
            className={`flex-1 rounded-lg px-3 py-2 ${
              mode === "signin" ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
            }`}
            onClick={() => setMode("signin")}
            disabled={busy}
          >
            Sign in
          </button>
          <button
            className={`flex-1 rounded-lg px-3 py-2 ${
              mode === "signup" ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
            }`}
            onClick={() => setMode("signup")}
            disabled={busy}
          >
            Sign up
          </button>
        </div>

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
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-lg bg-white/10 px-3 py-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={busy}
          />

          <button
            type="submit"
            className="w-full rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-60"
            disabled={busy}
          >
            {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="mt-3 text-right">
          <a href="/reset-password" className="text-sm opacity-80 hover:opacity-100 underline">
            Forgot password?
          </a>
        </div>

        {msg && (
          <div className="mt-4 rounded-lg bg-black/30 p-3 text-sm">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
