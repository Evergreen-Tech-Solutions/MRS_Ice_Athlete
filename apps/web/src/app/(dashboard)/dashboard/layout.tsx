import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerClientSafe } from "@/lib/supabaseServer";
import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Server-side signout (cookie cleanup) — used if you keep a <form action={logout} />
export async function logout() {
  "use server";
  const supabase = await createServerClientSafe();
  if (supabase) {
    // Revoke + clear auth cookies
    await supabase.auth.signOut({ scope: "global" });
  }
  redirect("/signin");
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerClientSafe();
  if (!supabase) redirect("/signin");

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) redirect("/signin");

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("user_id", user.id)
    .single();

  if (profileErr || !profile) redirect("/signin?reason=profile-missing");
  if (!["admin", "athlete"].includes(profile.role)) {
    redirect("/signin?reason=forbidden");
  }

  return (
    <div className="flex h-screen min-h-0">
      <Sidebar />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto p-4 md:p-8">
        {/* Header: user label + client logout (prevents refresh-token console error) */}
        <header className="mb-6 flex items-center justify-end gap-3">
          <span className="text-sm opacity-80 hidden sm:inline">
            {profile.full_name || user.email || "Signed in"}
          </span>

          {/* Prefer client logout to avoid console "Invalid Refresh Token" */}
          <LogoutButton />
          {/*
            If you want server-only logout instead, you can keep this form:
            <form action={logout}><button ...>Log out</button></form>
            But the client button above is what stops the console warning.
          */}
        </header>

        {children}
      </main>
    </div>
  );
}
