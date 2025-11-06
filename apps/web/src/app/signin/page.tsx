// apps/web/src/app/signin/page.tsx
"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";

export default function SignInPage() {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setMsg("");
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg("Check your email to confirm the signup link.");
      }
    } catch (err: any) {
      setMsg(err.message);
    }
  }

  return (
    <div className="min-h-[60vh] grid place-items-center p-6 text-white">
      <form onSubmit={handleSubmit} className="max-w-sm w-full rounded-xl border border-white/10 bg-white/5 p-6 hover:shadow-lg shadow-zinc-300 transition-shadow duration-300 text-center">
        <h1 className="text-2xl font-bold mb-2">{mode === "signin" ? "Sign In" : "Sign Up"}</h1>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 rounded bg-black/20" required/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 rounded bg-black/20" required/>
        <button type="submit" className="w-full bg-white/10 hover:bg-amber-300/70 rounded-lg py-2">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </button>
        <p onClick={()=>setMode(mode==='signin'?'signup':'signin')} className="mt-4 text-sm underline cursor-pointer">
          {mode === "signin" ? "No account? Sign up" : "Already have one? Sign in"}
        </p>
        {msg && <p className="text-sm mt-2 text-red-400">{msg}</p>}
      </form>
    </div>
  );
}
