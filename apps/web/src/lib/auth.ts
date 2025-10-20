// apps/web/src/lib/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "admin" | "user";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT { role?: "admin" | "user" }
}

function req(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: SupabaseAdapter({
    url: req("NEXT_PUBLIC_SUPABASE_URL"),
    secret: req("SUPABASE_SERVICE_ROLE_KEY"),
  }),
  providers: [
    GoogleProvider({
      clientId: req("GOOGLE_ID"),
      clientSecret: req("GOOGLE_SECRET"),
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?select=role&user_id=eq.${token.sub}`,
          {
            headers: {
              apikey: req("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
              // service role so RLS can't block this server-side call
              Authorization: `Bearer ${req("SUPABASE_SERVICE_ROLE_KEY")}`,
            },
            cache: "no-store",
          }
        );
        const [row] = await res.json();
        token.role = (row?.role ?? "user") as "admin" | "user";
      } catch (e) {
        console.error("JWT callback failed:", e);
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: { ...(session.user ?? {}), role: (token.role ?? "user") as "admin" | "user" },
      };
    },
  },

  events: {
    async createUser({ user }) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: req("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
            Authorization: `Bearer ${req("SUPABASE_SERVICE_ROLE_KEY")}`, // server-only
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify({ user_id: user.id, role: "user" }),
        });
      } catch (e) {
        console.error("Failed to upsert profile:", e);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
