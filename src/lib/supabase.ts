import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://svrgwvuizhvtktyfgibu.supabase.co";

const supabaseAnonKey = "sb_publishable_r-arpXbvESftiYdFEGbslw_R1SfPZbU";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);