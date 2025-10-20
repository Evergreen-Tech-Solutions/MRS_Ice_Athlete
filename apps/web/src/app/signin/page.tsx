"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <div className="max-w-sm w-full rounded-xl border border-white/10 bg-white/5 p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Sign in</h1>
        <p className="opacity-70 mb-6 text-sm">Use your Google account to continue.</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
