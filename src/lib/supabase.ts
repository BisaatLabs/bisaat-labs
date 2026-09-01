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
  email?: string;
  phone?: string;
  location?: string;
  engagement_rate?: number;
  average_views?: string;
  rate_per_reel?: string;
  status?: "onboarding" | "active" | "paused";
  notes?: string;
  is_published?: boolean;
  created_at?: string;
};

export type InfluencerInsert = Omit<Influencer, "id" | "created_at">;

const env = import.meta.env as Record<string, string | undefined>;
const supabaseUrl = env["VITE_SUPABASE_URL"];
const supabaseAnonKey = env["VITE_SUPABASE_ANON_KEY"];

/** True once real Supabase project credentials are supplied via env vars. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

import { createClient } from "@supabase/supabase-js";

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export const INFLUENCERS_TABLE = "influencers";
