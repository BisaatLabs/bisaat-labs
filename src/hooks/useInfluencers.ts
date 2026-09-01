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
export const adminInfluencersQueryKey = ["influencers", "admin"] as const;

async function fetchInfluencers(): Promise<Influencer[]> {
  if (!isSupabaseConfigured || !supabase) return demoInfluencers;
  const { data, error } = await supabase
    .from(INFLUENCERS_TABLE)
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Influencer[];
}

async function fetchAdminInfluencers(): Promise<Influencer[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(INFLUENCERS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Influencer[];
}

export function useInfluencers() {
  return useQuery({
    queryKey: influencersQueryKey,
    queryFn: fetchInfluencers,
    staleTime: 30_000,
    placeholderData: isSupabaseConfigured ? undefined : demoInfluencers,
  });
}

export function useAdminInfluencers(enabled = true) {
  return useQuery({
    queryKey: adminInfluencersQueryKey,
    queryFn: fetchAdminInfluencers,
    enabled: enabled && isSupabaseConfigured,
  });
}

async function insertInfluencer(input: InfluencerInsert): Promise<Influencer> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.from(INFLUENCERS_TABLE).insert(input).select().single();
  if (error) throw new Error(error.message);
  return data as Influencer;
}

async function updateInfluencer({ id, input }: { id: string; input: InfluencerInsert }) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from(INFLUENCERS_TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Influencer;
}

async function deleteInfluencer(id: string) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from(INFLUENCERS_TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
  return id;
}

function refreshInfluencers(queryClient: ReturnType<typeof useQueryClient>) {
  void queryClient.invalidateQueries({ queryKey: influencersQueryKey });
  void queryClient.invalidateQueries({ queryKey: adminInfluencersQueryKey });
}

export function useAddInfluencer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertInfluencer,
    onSuccess: (created) => {
      refreshInfluencers(queryClient);
      toast.success(`${created.name} added to the roster`);
    },
    onError: (error: Error) =>
      toast.error("Couldn't add that profile", { description: error.message }),
  });
}

export function useUpdateInfluencer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInfluencer,
    onSuccess: (updated) => {
      refreshInfluencers(queryClient);
      toast.success(`${updated.name} updated`);
    },
    onError: (error: Error) => toast.error("Couldn't save changes", { description: error.message }),
  });
}

export function useDeleteInfluencer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInfluencer,
    onSuccess: () => {
      refreshInfluencers(queryClient);
      toast.success("Influencer removed");
    },
    onError: (error: Error) =>
      toast.error("Couldn't remove profile", { description: error.message }),
  });
}

export async function uploadInfluencerAvatar(file: File) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("influencer-avatars").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from("influencer-avatars").getPublicUrl(path).data.publicUrl;
}
