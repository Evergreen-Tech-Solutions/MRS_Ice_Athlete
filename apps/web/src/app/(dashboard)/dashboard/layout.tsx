// apps/web/src/app/(dashboard)/dashboard/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerClientSafe } from "@/lib/supabaseServer";

export const runtime = "nodejs";           // defensive: ensure Node runtime
export const dynamic = "force-dynamic";    // optional: avoid caching for auth-gated area
export const revalidate = 0;

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerClientSafe();

  // ✅ Narrow early — redirect() returns never, so TS knows supabase is non-null after this line
  if (!supabase) redirect("/signin");

  // Fetch the user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) redirect("/signin");

  // Fetch the user profile/role
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileErr || !profile) redirect("/signin?reason=profile-missing");

  if (!["admin", "athlete"].includes(profile.role)) {
    redirect("/signin?reason=forbidden");
  }

  return <>{children}</>;
}
