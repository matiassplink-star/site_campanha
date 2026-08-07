import { createClient as createServerClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com service role — apenas para operações administrativas server-side.
 * NUNCA exponha este cliente no browser.
 */
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
