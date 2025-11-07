"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";

type Mode = "signin" | "signup";

export default function SignInPage() {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isSignIn = mode === "signin";
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  const [passwordTouched, setPasswordTouched] = useState(false);
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);
  const isPhoneValid = /^\d{10}$/.test(phone);

  // For signup: we require all three to be valid
  const canSubmitSignup = isEmailValid && isPasswordValid && isPhoneValid;

  function validatePassword(pw: string) {
    if (!passwordRegex.test(pw)) {
      throw new Error(
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol."
      );
    }
  }

  function validatePhone(phoneDigits: string) {
    // Expect exactly 10 digits for Canadian numbers (without +1)
    if (!/^\d{10}$/.test(phoneDigits)) {
      throw new Error("Please enter a valid 10-digit Canadian phone number.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (loading) return;

    try {
      setLoading(true);

      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.replace("/dashboard");
      } else {
        // Sign Up flow
        validatePassword(password);
        validatePhone(phone);

        const fullPhone = `+1${phone}`;

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              phone: fullPhone,
            },
          },
        });

        if (error) throw error;

        setMsg(
          "Account created. Please check your email to confirm your signup."
        );
        // Optional: reset sensitive fields
        setPassword("");
      }
    } catch (err: any) {
      setMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(next: Mode) {
    if (next === mode) return;
    setMode(next);
    setMsg("");
    // Do not wipe email by default; it’s convenient to keep.
    setPassword("");
  }

  return (
    <div className="min-h-[40vh] grid place-items-center p-4 text-white">
      <form onSubmit={handleSubmit} className="w-full text-center">
        {/* Mode Toggle */}
        <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all
              ${
                isSignIn
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/30"
                  : "text-white/70 hover:text-white"
              }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all
              ${
                !isSignIn
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/30"
                  : "text-white/70 hover:text-white"
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">
          {isSignIn ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mb-6 text-sm text-white/70">
          {isSignIn
            ? "Access your dashboard, classes, and bookings."
            : "Join the community and start booking training sessions."}
        </p>

        {/* Email */}
        <div className="mb-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.trim());
                if (!emailTouched) setEmailTouched(true);
              }}
              onBlur={() => {
                if (!emailTouched && email.length > 0) setEmailTouched(true);
              }}
              placeholder="Email"
              className={`
        w-full p-2.5 pr-8 rounded-lg bg-black/30 border text-sm
        placeholder:text-white/40 focus:outline-none
        ${
          // Before interaction → neutral
          !emailTouched || email.length === 0
            ? "border-white/10 focus:ring-2 focus:ring-amber-300/40"
            : // After interaction → evaluate format
            emailRegex.test(email)
            ? "border-emerald-400 focus:ring-2 focus:ring-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            : "border-red-500/80 focus:ring-2 focus:ring-red-500/70"
        }
      `}
              required
            />

            {/* Status Dot */}
            {emailTouched && email.length > 0 && (
              <span
                className={`
          pointer-events-none absolute inset-y-0 right-2 my-auto h-2.5 w-2.5 rounded-full
          ${
            emailRegex.test(email)
              ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
              : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
          }
        `}
              />
            )}
          </div>

          {/* Helper / feedback */}
          {emailTouched && email.length > 0 && !emailRegex.test(email) && (
            <p className="mt-1 text-[10px] text-red-400 text-left">
              Please enter a valid email address (e.g. name@example.com).
            </p>
          )}

          {emailTouched && emailRegex.test(email) && (
            <p className="mt-1 text-[10px] text-emerald-400 text-left">
              Email looks good. This will be used for secure sign-in and
              confirmations.
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-2">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!passwordTouched) setPasswordTouched(true);
              }}
              placeholder="Password"
              className={`w-full p-2.5 pr-8 rounded-lg bg-black/30 border text-sm
        placeholder:text-white/40 focus:outline-none
        ${
          // For Sign In: keep it neutral
          isSignIn
            ? "border-white/10 focus:ring-2 focus:ring-amber-300/70"
            : // For Sign Up: show live strength state
            password.length === 0 || !passwordTouched
            ? "border-white/10 focus:ring-2 focus:ring-amber-300/40"
            : passwordRegex.test(password)
            ? "border-emerald-400 focus:ring-2 focus:ring-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
            : "border-red-500/80 focus:ring-2 focus:ring-red-500/70"
        }
      `}
              required
            />

            {/* Status Dot (Sign Up only) */}
            {!isSignIn && (
              <span
                className={`
          pointer-events-none absolute inset-y-0 right-2 my-auto h-2.5 w-2.5 rounded-full
          ${
            password.length === 0 || !passwordTouched
              ? "bg-white/25"
              : passwordRegex.test(password)
              ? "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]"
              : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.85)]"
          }
        `}
              />
            )}
          </div>

          {/* Password helper for signup */}
          {!isSignIn && (
            <div className="mt-1 text-left text-[11px] leading-snug">
              <p
                className={
                  password.length === 0 || !passwordTouched
                    ? "text-white/50"
                    : passwordRegex.test(password)
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              >
                Use at least 8 characters, including uppercase, lowercase, a
                number, and a symbol.
              </p>

              {passwordTouched &&
                password.length > 0 &&
                !passwordRegex.test(password) && (
                  <p className="text-red-400 text-[10px] mt-0.5">
                    Your password is not strong enough yet. Keep adjusting until
                    the indicator turns green.
                  </p>
                )}

              {passwordTouched && passwordRegex.test(password) && (
                <p className="text-emerald-400 text-[10px] mt-0.5">
                  Strong password. You’re good to go.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Phone (Sign Up only) */}
        {!isSignIn && (
          <div className="mb-4">
            <label className="block text-left text-xs text-white/70 mb-1">
              Phone number (Canada only)
            </label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-2.5 text-xs rounded-lg bg-black/40 border border-white/15 text-white/80 select-none">
                +1
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="e.g. 6041234567"
                maxLength={10}
                className="flex-1 p-2.5 rounded-lg bg-black/30 border border-white/10 text-sm
                           placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/70"
                required
              />
            </div>
            <p className="mt-1 text-[12px] text-white/40 text-left">
              Used for booking confirmations and class communications.
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || (!isSignIn && !canSubmitSignup)}
          className={`
    w-full mt-4 rounded-xl py-2.5 text-sm font-semibold
    transition-all shadow-md
    ${
      isSignIn
        ? // Sign In button: only blocked while loading
          "bg-amber-400 hover:bg-amber-400 text-black disabled:opacity-60 disabled:cursor-not-allowed"
        : // Sign Up button: visually reflect validity
        canSubmitSignup && !loading
        ? "bg-emerald-400 text-black hover:bg-amber-400 shadow-emerald-400/40"
        : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
    }
  `}
        >
          {loading
            ? isSignIn
              ? "Signing in..."
              : "Creating account..."
            : isSignIn
            ? "Sign In"
            : "Create Account"}
        </button>

        {/* Feedback */}
        {msg && <p className="text-xs mt-3 text-amber-300/90">{msg}</p>}
      </form>
    </div>
  );
}
