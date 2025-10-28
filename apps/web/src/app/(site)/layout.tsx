import Sidebar from "@/components/Sidebar";
import { getSessionProfile } from "@/lib/getSessionProfile";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getSessionProfile(); // { full_name, email, image? }

  return (
    <div className="flex h-screen min-h-0">
      <Sidebar me={me ? { full_name: me.full_name || me.email } : null} />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
