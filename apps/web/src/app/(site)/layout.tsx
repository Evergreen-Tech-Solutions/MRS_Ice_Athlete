// src/app/(site)/layout.tsx
import Sidebar from "@/components/Sidebar";
import { getSessionProfile } from "@/lib/getSessionProfile";
import Avatar from "@/components/Avatar";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getSessionProfile();
  return (
    <div className="flex h-screen min-h-0">
      <Sidebar />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto p-4 md:p-8">
        <body>
          <header className="flex justify-end">
            <div>
              {me ? (
                <div className="flex items-center gap-3">
                  <Avatar fullName={me.full_name} email={me.email} size={32} />
                  <span className="text-sm opacity-80">
                    {me.full_name || me.email}
                  </span>
                </div>
              ) : (
                <a href="/signin" className="underline">
                  Sign in
                </a>
              )}
            </div>
          </header>
          {children}
        </body>
      </main>
    </div>
  );
}
