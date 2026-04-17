import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = Boolean(url && anon);

export const supabase = supabaseConfigured
  ? createClient(url, anon, {
      auth: { persistSession: false },
    })
  : null;

export async function isSupabaseHealthy(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("galleries").select("slug").limit(1);
    return !error;
  } catch {
    return false;
  }
}
