// apps/web/src/app/(site)/layout.tsx
import { getSessionProfile } from "@/lib/getSessionProfile";
import SiteShell from "@/components/SiteShell";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getSessionProfile();

  return (
    <SiteShell
      me={me ? { full_name: me.full_name || me.email, email: me.email } : null}
    >
      {children}
    </SiteShell>
  );
}
