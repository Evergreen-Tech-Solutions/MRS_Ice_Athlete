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

type ProfileRow = {
  role: "admin" | "athlete" | "user";
  full_name: string | null;
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1) Auth guard
  const supabase = await createServerClientSafe();
  if (!supabase) redirect("/signin");

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) redirect("/signin");

  // 2) Profile & role
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("user_id", user.id)
    .single<ProfileRow>();

  if (profileErr || !profile) redirect("/signin?reason=profile-missing");

  const role = profile.role;
  const isAdmin = role === "admin" || role === "athlete";
  const isUser = role === "user";

  if (!isAdmin && !isUser) {
    redirect("/signin?reason=forbidden");
  }

  const me: ProfileRow = {
    role,
    full_name: profile.full_name,
  };

  // 3) Render
  return (
    <div className="flex h-screen min-h-0">
      {/* Sidebar can remain generic; admin-only links can be hidden inside Sidebar if it already handles role.
         If not, we'll update Sidebar later; for now we keep it unchanged. */}
      <Sidebar me={me}/>

      <main className="flex-1 min-w-0 h-screen overflow-y-auto p-4 md:p-8">
        {/* Header: identity + logout */}
        <header className="mb-6 flex items-center justify-end gap-3">
          {/* Role badge */}
          <span
            className={[
              "hidden sm:inline px-2 py-0.5 rounded text-xs border",
              isAdmin
                ? "border-amber-500/40 bg-amber-500/10"
                : "border-sky-500/40 bg-sky-500/10",
            ].join(" ")}
            title="Your role"
          >
            {isAdmin ? "Admin" : "User"}
          </span>

          {/* Display name */}
          <span className="text-sm opacity-80 hidden sm:inline">
            {profile.full_name || user.email || "Signed in"}
          </span>

          {/* Prefer client logout to avoid console 'Invalid Refresh Token' warnings */}
          <LogoutButton />
          {/*
            If you want server-only logout instead, you can keep this form:
            <form action={logout}><button ...>Log out</button></form>
          */}
        </header>

        {children}
      </main>
    </div>
  );
}
