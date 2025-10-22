// apps/web/src/lib/getSessionProfile.ts
import { createServerClient } from "@/lib/supabaseServer";

export async function getSessionProfile() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,email,role")
    .eq("user_id", user.id)
    .single();

  if (!profile) return null;
  return { userId: user.id, ...profile }; // { userId, full_name, email, role }
}
