// apps/web/src/app/(auth)/signin/layout.tsx
import { Suspense, ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClientSafe } from "@/lib/supabaseServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SignInLayout({
  children,
}: {
  children: ReactNode;
}) {
  // If already authenticated, don't leave user on /signin
  const supabase = await createServerClientSafe();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* Left: brand / message (desktop only) */}
      <aside className="hidden lg:flex flex-col justify-between p-8 border-r border-white/10">
        <header className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10" />
          <span className="text-sm opacity-80">Mohammad Reza Safdarian</span>
        </header>

        <div>
          <h1 className="text-3xl font-bold mb-3">Welcome back</h1>
          <p className="opacity-70 max-w-md">
            Sign in to manage classes, bookings, and payments.
          </p>
        </div>

        <footer className="text-xs opacity-60">
          <div className="mt-3 text-xs text-white/80">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.thedevnest.ca/"
              className="hover:text-amber-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by DevNest Studio
            </a>
          </div>
        </footer>
      </aside>

      {/* Right: centered auth card + Suspense fallback */}
      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile top bar */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white/10" />
              <span className="text-sm opacity-80">Ice Athlete</span>
            </div>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
            >
              Back to site
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur p-6 shadow-xl">
            <Suspense
              fallback={
                <div className="min-h-[50vh] grid place-items-center p-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    Loading…
                  </div>
                </div>
              }
            >
              {children}
            </Suspense>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm opacity-80">
            <Link href="/" className="underline underline-offset-4">
              Home
            </Link>
            <Link href="/help" className="underline underline-offset-4">
              Need help?
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
