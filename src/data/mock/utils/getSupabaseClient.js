import { createClient } from "@supabase/supabase-js";
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const PASS = process.env.NEXT_PUBLIC_SUPABASE_PASS
const supabase = createClient(URL, PASS);

export default function getSupabaseClient() {
  return supabase;
}