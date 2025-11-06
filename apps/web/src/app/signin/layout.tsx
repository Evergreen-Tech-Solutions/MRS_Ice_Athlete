// apps/web/src/app/(auth)/signin/layout.tsx
import { Suspense, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createServerClientSafe } from "@/lib/supabaseServer";
import { FaHouse, FaCircleQuestion } from "react-icons/fa6";

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
    <div
      className="
      relative isolate min-h-screen grid lg:grid-cols-3 text-white
      bg-[url('/images/bg-rock.png')] bg-cover bg-center bg-no-repeat
      before:content-[''] before:absolute before:inset-0
      before:bg-gradient-to-l before:from-black/80 before:via-black/50 before:to-zinc-400/30
      before:-z-10
    "
    >
      {/* Left: brand / message (desktop only) */}
      <aside className="hidden lg:flex flex-col lg:col-span-1 justify-between p-8 border-r border-white/50">
        <header className="flex ">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/bg-orange.png"
              alt="Ice Athlete"
              width={48}
              height={48}
              className="hover:scale-120 transition-transform"
            />
          </Link>
        </header>

        <div>
          <h1 className="text-3xl font-bold mb-3">Welcome back</h1>
          <p className="max-w-md">
            Sign in to manage classes, bookings, and payments.
          </p>
        </div>

        <footer className="text-sm">
          <div className="mt-3 text-sm text-white">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.thedevnest.ca/"
              className="hover:text-amber-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by DevNest Studio
            </a>
          </div>
        </footer>
      </aside>

      {/* Right: centered auth card + Suspense fallback */}
      <main className="flex items-center lg:col-span-2 justify-center p-6">
        <div className="w-full max-w-md">
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

          <div className="mt-2 flex flex-wrap justify-between gap-3">
            <Link
              href="/"
              className="inline-flex gap-2 rounded-xl border border-white/25 px-3 py-2 text-sm font-medium text-white/90
                   hover:border-white/60 hover:bg-white/5 hover:text-white
                   focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            >
              <FaHouse className="size-4 shrink-0" />
              Home
            </Link>

            <Link
              href="/contact/"
              className="inline-flex gap-2 rounded-xl border border-white/25 px-3 py-2 text-sm font-medium text-white/90
                   hover:border-white/60 hover:bg-white/5 hover:text-white
                   focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            >
              <FaCircleQuestion className="size-4 shrink-0" />
              Need help?
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
