// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { SupabaseAdapter } from "@auth/supabase-adapter";

// declare module "next-auth" {
//   interface User { role?: "admin" | "user" }
//   interface Session { user: { name?: string | null; email?: string | null; image?: string | null; role?: "admin" | "user" } }
// }
// declare module "next-auth/jwt" {
//   interface JWT { role?: "admin" | "user" }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     secret: process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only
//   }),
//   providers: [
//     // Add real credentials/providers as you like; Google example:
//     // Google({ clientId: process.env.GOOGLE_ID!, clientSecret: process.env.GOOGLE_SECRET! })
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async session({ session, token }) {
//       session.user.role = (token.role as any) ?? "user";
//       return session;
//     },
//     async jwt({ token }) {
//       // Fetch role from profiles on each request (simple & reliable)
//       if (!token.sub) return token;
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?select=role&user_id=eq.${token.sub}`, {
//           headers: {
//             apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
//           },
//           cache: "no-store",
//         });
//         const [row] = await res.json();
//         token.role = (row?.role ?? "user") as any;
//       } catch { /* noop */ }
//       return token;
//     },
//   },
// });
// v4 setup: define authOptions and default export the handler
import NextAuth, { type NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "admin" | "user";
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT { role?: "admin" | "user" }
}

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only, NOT public
  }),

  // keep empty until you add Google/etc. to avoid openid-client issues
  providers: [],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?select=role&user_id=eq.${token.sub}`,
          {
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
            },
            cache: "no-store",
          }
        );
        const [row] = await res.json();
        token.role = (row?.role ?? "user") as "admin" | "user";
      } catch {}
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role ?? "user";
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export default handler;
