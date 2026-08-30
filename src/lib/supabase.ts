export type InfluencerReview = {
  reviewer: string;
  comment: string;
  rating: number;
};

export type Influencer = {
  id: string;
  name: string;
  avatar_url: string;
  rating: number;
  reach: string;
  content_type: string;
  instagram_url: string;
  languages: string[];
  platforms: string[];
  reviews: InfluencerReview[];
  created_at?: string;
};

export type InfluencerInsert = Omit<Influencer, "id" | "created_at">;

const env = import.meta.env as Record<string, string | undefined>;
const supabaseUrl = env["VITE_SUPABASE_URL"];
const supabaseAnonKey = env["VITE_SUPABASE_ANON_KEY"];

// Toggle this to true when you are ready to connect Supabase again.
// When false, the app stays entirely local/demo-first and avoids any runtime issues.
const ENABLE_SUPABASE = false;

/** True once real Supabase project credentials are supplied via env vars. */
export const isSupabaseConfigured = ENABLE_SUPABASE && Boolean(supabaseUrl && supabaseAnonKey);

// When you are ready to use Supabase again, uncomment the import and client setup below.
// import { createClient } from "@supabase/supabase-js";
// export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
//   auth: { persistSession: false },
// });
export const supabase = null;

export const INFLUENCERS_TABLE = "influencers";
