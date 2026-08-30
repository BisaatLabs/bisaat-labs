import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  INFLUENCERS_TABLE,
  isSupabaseConfigured,
  supabase,
  type Influencer,
  type InfluencerInsert,
} from "@/lib/supabase";
import { demoInfluencers } from "@/data/demo-influencers";

export const influencersQueryKey = ["influencers"] as const;

async function fetchInfluencers(): Promise<Influencer[]> {
  if (!isSupabaseConfigured || !supabase) return demoInfluencers;

  const { data, error } = await supabase
    .from(INFLUENCERS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error, falling back to demo data:", error.message);
    return demoInfluencers;
  }

  return data && data.length > 0 ? (data as Influencer[]) : demoInfluencers;
}

/** List of influencer cards. Always resolves — falls back to demo data on any failure. */
export function useInfluencers() {
  return useQuery({
    queryKey: influencersQueryKey,
    queryFn: fetchInfluencers,
    staleTime: 30_000,
    // Demo data keeps the page fully usable even before Supabase is configured.
    placeholderData: demoInfluencers,
  });
}

async function insertInfluencer(input: InfluencerInsert): Promise<Influencer> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      ...input,
      id: `local-${crypto.randomUUID()}`,
      created_at: new Date().toISOString(),
    };
  }

  const { data, error } = await supabase.from(INFLUENCERS_TABLE).insert(input).select().single();

  if (error) throw new Error(error.message);
  return data as Influencer;
}

/** Adds a new influencer card, optimistically inserting it at the top of the list. */
export function useAddInfluencer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertInfluencer,
    onSuccess: (created) => {
      queryClient.setQueryData<Influencer[]>(influencersQueryKey, (current) => {
        const base = (current ?? []).filter((i) => !i.id.startsWith("demo-"));
        return [created, ...base];
      });
      toast.success(`${created.name} added to the roster`, {
        description: isSupabaseConfigured
          ? "Saved to Supabase."
          : "Saved locally — connect Supabase to persist this across visits.",
      });
    },
    onError: (error: Error) => {
      toast.error("Couldn't add that card", { description: error.message });
    },
  });
}
