import { cookies } from 'next/headers';
import {
  createServerClient as _createServerClient,
  type CookieOptions,
} from '@supabase/ssr';

/**
 * Main server-side Supabase client.
 * Throws if env vars are missing.
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    console.error('Supabase envs missing at runtime', {
      HAS_URL: !!url,
      HAS_ANON: !!anon,
    });
    throw new Error('Supabase configuration is incomplete.');
  }

  const cookieStore = await cookies();

  return _createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      // For RSC/server actions we usually no-op writes here.
      set(_name: string, _value: string, _options: CookieOptions) {},
      remove(_name: string, _options: CookieOptions) {},
    },
  });
}

/**
 * Legacy safe version: returns null instead of throwing if envs are missing.
 */
export async function createServerClientSafe() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    console.error('Supabase envs missing at runtime', {
      HAS_URL: !!url,
      HAS_ANON: !!anon,
    });
    return null;
  }

  const cookieStore = await cookies();

  return _createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value ?? null;
      },
      set(_name: string, _value: string, _options: CookieOptions) {},
      remove(_name: string, _options: CookieOptions) {},
    },
  });
}
