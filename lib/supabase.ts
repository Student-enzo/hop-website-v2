import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const raw = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // Only use the service key if it looks like a real JWT (starts with "eyJ")
  const serviceKey = raw && raw.startsWith("eyJ") ? raw : undefined;
  const key = serviceKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, serviceKey ? { auth: { autoRefreshToken: false, persistSession: false } } : undefined);
}
