// apps/web/src/app/(dashboard)/dashboard/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabaseServer";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerClient();

  // 1) Require auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // 2) Fetch role from profiles
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error || !profile) {
    redirect("/signin?reason=profile-missing");
  }

  if (!["admin", "athlete"].includes(profile.role)) {
    redirect("/signin?reason=forbidden");
  }

  return <>{children}</>;
}
