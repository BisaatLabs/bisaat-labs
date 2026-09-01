import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  LogOut,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { avatarFor } from "@/data/demo-influencers";
import {
  uploadInfluencerAvatar,
  useAddInfluencer,
  useAdminInfluencers,
  useDeleteInfluencer,
  useUpdateInfluencer,
} from "@/hooks/useInfluencers";
import {
  isSupabaseConfigured,
  supabase,
  type Influencer,
  type InfluencerInsert,
} from "@/lib/supabase";
import { cn } from "@/lib/utils";

const LANGUAGES = ["Urdu", "English", "Punjabi", "Sindhi", "Pashto"];
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Facebook", "Snapchat"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
  content_type: string;
  reach: string;
  engagement_rate: string;
  average_views: string;
  rate_per_reel: string;
  instagram_url: string;
  rating: string;
  status: "onboarding" | "active" | "paused";
  notes: string;
  reviewer: string;
  reviewComment: string;
  is_published: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  location: "",
  avatar_url: "",
  content_type: "",
  reach: "",
  engagement_rate: "",
  average_views: "",
  rate_per_reel: "",
  instagram_url: "",
  rating: "4.5",
  status: "onboarding",
  notes: "",
  reviewer: "",
  reviewComment: "",
  is_published: true,
};

function formFor(influencer?: Influencer): FormState {
  if (!influencer) return EMPTY_FORM;
  const review = influencer.reviews?.[0];
  return {
    name: influencer.name,
    email: influencer.email ?? "",
    phone: influencer.phone ?? "",
    location: influencer.location ?? "",
    avatar_url: influencer.avatar_url,
    content_type: influencer.content_type,
    reach: influencer.reach,
    engagement_rate: influencer.engagement_rate?.toString() ?? "",
    average_views: influencer.average_views ?? "",
    rate_per_reel: influencer.rate_per_reel ?? "",
    instagram_url: influencer.instagram_url,
    rating: influencer.rating.toString(),
    status: influencer.status ?? "onboarding",
    notes: influencer.notes ?? "",
    reviewer: review?.reviewer ?? "",
    reviewComment: review?.comment ?? "",
    is_published: influencer.is_published ?? false,
  };
}

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setCheckingSession(false);
      return;
    }
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  if (checkingSession) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream">
        <Loader2 className="size-6 animate-spin text-brown" />
      </div>
    );
  }
  if (!isSupabaseConfigured) return <ConfigurationNotice />;
  if (!session) return <AdminLogin />;
  return <RosterWorkspace session={session} />;
}

function ConfigurationNotice() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6">
      <div className="max-w-md rounded-[3px] border border-ink/10 bg-paper p-8 text-center shadow-[0_24px_70px_rgba(28,24,21,.08)]">
        <img
          src="/bisaat-logo-transparent.webp"
          alt="Bisaat Labs"
          className="mx-auto h-20 w-36 object-contain"
        />
        <h1 className="mt-6 text-2xl font-extrabold tracking-[-.03em] text-ink">
          Connect Supabase first
        </h1>
        <p className="mt-3 text-sm leading-6 text-ink/55">
          Add the project URL and anonymous key to your local environment to open the admin
          workspace.
        </p>
      </div>
    </main>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error("Sign in failed", { description: error.message });
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-cream px-5 py-10 sm:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(28,24,21,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(28,24,21,.05)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_460px]">
        <div className="hidden max-w-xl lg:block">
          <span className="label-xs text-brown">Private studio workspace</span>
          <h1 className="mt-5 text-6xl font-extrabold leading-[.94] tracking-[-.055em] text-ink">
            The roster,
            <br />
            beautifully managed.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-ink/55">
            Onboard creators, keep commercial details organised, and control exactly what appears on
            the public site.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="w-full rounded-[3px] border border-ink/10 bg-paper p-7 shadow-[0_30px_90px_rgba(28,24,21,.1)] sm:p-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-ink/50 hover:text-brown"
          >
            <ArrowLeft className="size-3.5" /> Website
          </Link>
          <img
            src="/bisaat-logo-transparent.webp"
            alt="Bisaat Labs"
            className="mt-8 h-16 w-32 object-contain object-left"
          />
          <h2 className="mt-6 text-3xl font-extrabold tracking-[-.04em] text-ink">Admin sign in</h2>
          <p className="mt-2 text-sm leading-6 text-ink/50">
            Use an account created in Supabase Authentication.
          </p>
          <div className="mt-8 space-y-5">
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 h-12 border-ink/10 bg-cream/40"
              />
            </div>
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 h-12 border-ink/10 bg-cream/40"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="mt-7 h-12 w-full rounded-full bg-ink text-white hover:bg-brown"
          >
            {loading && <Loader2 className="size-4 animate-spin" />} Sign in securely
          </Button>
        </form>
      </div>
    </main>
  );
}

function RosterWorkspace({ session }: { session: Session }) {
  const { data = [], isLoading, isError, refetch } = useAdminInfluencers(true);
  const updateMutation = useUpdateInfluencer();
  const deleteMutation = useDeleteInfluencer();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "onboarding" | "active" | "paused">("all");
  const [editing, setEditing] = useState<Influencer | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<Influencer | null>(null);

  const filtered = useMemo(
    () =>
      data.filter((item) => {
        const matchesStatus = filter === "all" || (item.status ?? "onboarding") === filter;
        const haystack = `${item.name} ${item.content_type} ${item.location ?? ""}`.toLowerCase();
        return matchesStatus && haystack.includes(query.toLowerCase());
      }),
    [data, filter, query],
  );

  const active = data.filter((item) => item.status === "active").length;
  const published = data.filter((item) => item.is_published).length;

  const togglePublished = (item: Influencer) => {
    const { id: _id, created_at: _createdAt, ...input } = item;
    updateMutation.mutate({ id: item.id, input: { ...input, is_published: !item.is_published } });
  };

  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="border-b border-ink/10 bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 md:px-10">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src="/bisaat-logo-transparent.webp"
              alt="Bisaat Labs"
              className="h-11 w-20 object-contain"
            />
            <span className="hidden h-7 w-px bg-ink/10 sm:block" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold">Influencer desk</p>
              <p className="truncate text-[11px] text-ink/45">{session.user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/influencers"
              className="hidden rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink/60 hover:border-brown hover:text-brown sm:inline-flex"
            >
              View public roster ↗
            </Link>
            <button
              onClick={() => void supabase?.auth.signOut()}
              className="grid size-10 place-items-center rounded-full border border-ink/10 text-ink/55 hover:border-brown hover:text-brown"
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-10 md:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label-xs text-brown">Roster operations</span>
            <h1 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-.05em]">
              Creator management
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-ink/55 md:text-base">
              A single source of truth for onboarding, commercial details, and public profiles.
            </p>
          </div>
          <Button
            onClick={() => setEditing(null)}
            className="h-12 self-start rounded-full bg-ink px-6 text-white hover:bg-brown lg:self-auto"
          >
            <Plus className="size-4" /> Add influencer
          </Button>
        </div>

        <section className="mt-9 grid gap-3 sm:grid-cols-3">
          <Metric label="Total creators" value={data.length} icon={<Users className="size-4" />} />
          <Metric label="Active partnerships" value={active} icon={<Check className="size-4" />} />
          <Metric label="Published profiles" value={published} icon={<Eye className="size-4" />} />
        </section>

        <section className="mt-8 rounded-[3px] border border-ink/10 bg-paper shadow-[0_20px_60px_rgba(28,24,21,.06)]">
          <div className="flex flex-col gap-4 border-b border-ink/10 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, category or city"
                className="h-11 border-ink/10 bg-cream/45 pl-11"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto rounded-full bg-cream/60 p-1">
              {(["all", "onboarding", "active", "paused"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold capitalize text-ink/45",
                    filter === status && "bg-ink text-white",
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid min-h-72 place-items-center">
              <Loader2 className="size-6 animate-spin text-brown" />
            </div>
          ) : isError ? (
            <div className="grid min-h-72 place-items-center p-8 text-center">
              <div>
                <p className="font-bold">Roster couldn't be loaded.</p>
                <button
                  onClick={() => void refetch()}
                  className="mt-3 text-sm font-semibold text-brown"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="grid min-h-72 place-items-center p-8 text-center">
              <div>
                <p className="font-bold">No creators found.</p>
                <p className="mt-2 text-sm text-ink/45">
                  Adjust the search or add a new influencer.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-ink/8">
              {filtered.map((item) => (
                <CreatorRow
                  key={item.id}
                  influencer={item}
                  onEdit={() => setEditing(item)}
                  onDelete={() => setDeleting(item)}
                  onPublish={() => togglePublished(item)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {editing !== undefined && (
        <InfluencerEditor influencer={editing ?? undefined} onClose={() => setEditing(undefined)} />
      )}
      <AlertDialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent className="border-ink/10 bg-paper">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {deleting?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the profile from the roster and public website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep profile</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleting &&
                deleteMutation.mutate(deleting.id, { onSuccess: () => setDeleting(null) })
              }
              className="bg-destructive text-white"
            >
              Remove profile
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function Metric({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-[3px] border border-ink/10 bg-paper p-5">
      <div>
        <p className="label-xs text-ink/40">{label}</p>
        <p className="mt-2 text-3xl font-extrabold tracking-[-.04em]">
          {value.toString().padStart(2, "0")}
        </p>
      </div>
      <span className="grid size-10 place-items-center rounded-full bg-cream text-brown">
        {icon}
      </span>
    </div>
  );
}

function CreatorRow({
  influencer,
  onEdit,
  onDelete,
  onPublish,
}: {
  influencer: Influencer;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
}) {
  const status = influencer.status ?? "onboarding";
  return (
    <article className="grid gap-4 p-4 transition-colors hover:bg-cream/25 sm:grid-cols-[1fr_auto] sm:items-center md:p-5 lg:grid-cols-[minmax(280px,1.2fr)_minmax(140px,.65fr)_minmax(170px,.7fr)_auto]">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={influencer.avatar_url || avatarFor(influencer.name)}
          alt=""
          className="size-12 shrink-0 rounded-full border border-ink/10 bg-cream object-cover md:size-14"
        />
        <div className="min-w-0">
          <h2 className="truncate font-bold tracking-[-.02em]">{influencer.name}</h2>
          <p className="mt-1 truncate text-xs text-ink/45">{influencer.content_type}</p>
        </div>
      </div>
      <div className="hidden lg:block">
        <p className="label-xs text-ink/35">Market / reach</p>
        <p className="mt-1 text-sm font-semibold">
          {influencer.location || "—"} · {influencer.reach || "—"}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:justify-end lg:justify-start">
        <span
          className={cn(
            "size-2 rounded-full",
            status === "active" ? "bg-teal" : status === "paused" ? "bg-ink/25" : "bg-brown",
          )}
        />
        <span className="text-xs font-semibold capitalize text-ink/60">{status}</span>
        <span className="mx-1 text-ink/15">·</span>
        <span className="text-xs text-ink/45">
          {influencer.is_published ? "Published" : "Private"}
        </span>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={onPublish}
          className="grid size-9 place-items-center rounded-full border border-ink/10 text-ink/50 hover:border-brown hover:text-brown"
          aria-label={influencer.is_published ? "Unpublish profile" : "Publish profile"}
        >
          {influencer.is_published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
        <button
          onClick={onEdit}
          className="grid size-9 place-items-center rounded-full border border-ink/10 text-ink/50 hover:border-brown hover:text-brown"
          aria-label="Edit profile"
        >
          <Pencil className="size-4" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="grid size-9 place-items-center rounded-full text-ink/40 hover:bg-cream"
              aria-label="More actions"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="size-4" /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}

function InfluencerEditor({
  influencer,
  onClose,
}: {
  influencer?: Influencer;
  onClose: () => void;
}) {
  const [form, setForm] = useState(() => formFor(influencer));
  const [languages, setLanguages] = useState<string[]>(influencer?.languages ?? []);
  const [platforms, setPlatforms] = useState<string[]>(influencer?.platforms ?? []);
  const [uploading, setUploading] = useState(false);
  const addMutation = useAddInfluencer();
  const updateMutation = useUpdateInfluencer();
  const pending = addMutation.isPending || updateMutation.isPending || uploading;

  const update = (key: keyof FormState, value: string | boolean) =>
    setForm((current) => ({ ...current, [key]: value }));
  const toggle = (items: string[], setItems: (next: string[]) => void, value: string) =>
    setItems(items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);

  const upload = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5_000_000) {
      toast.error("Choose an image smaller than 5MB.");
      return;
    }
    setUploading(true);
    try {
      update("avatar_url", await uploadInfluencerAvatar(file));
      toast.success("Photo uploaded");
    } catch (error) {
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = form.name.trim();
    const payload: InfluencerInsert = {
      name,
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      avatar_url: form.avatar_url.trim() || avatarFor(name),
      content_type: form.content_type.trim(),
      reach: form.reach.trim(),
      engagement_rate: Number(form.engagement_rate) || 0,
      average_views: form.average_views.trim(),
      rate_per_reel: form.rate_per_reel.trim(),
      instagram_url: form.instagram_url.trim() || "https://instagram.com/",
      rating: Math.min(5, Math.max(0, Number(form.rating) || 4.5)),
      status: form.status,
      notes: form.notes.trim(),
      is_published: form.is_published,
      languages,
      platforms,
      reviews:
        form.reviewer.trim() && form.reviewComment.trim()
          ? [{ reviewer: form.reviewer.trim(), comment: form.reviewComment.trim(), rating: 5 }]
          : [],
    };
    const success = { onSuccess: onClose };
    if (influencer) updateMutation.mutate({ id: influencer.id, input: payload }, success);
    else addMutation.mutate(payload, success);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-ink/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={influencer ? "Edit influencer" : "Add influencer"}
    >
      <button
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close editor"
      />
      <form
        onSubmit={submit}
        className="relative h-full w-full max-w-3xl overflow-y-auto bg-paper shadow-[-30px_0_80px_rgba(28,24,21,.2)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-paper/90 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div>
            <p className="label-xs text-brown">{influencer ? "Edit profile" : "New onboarding"}</p>
            <h2 className="mt-1 text-xl font-extrabold tracking-[-.03em]">
              {influencer?.name ?? "Add an influencer"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-ink/10 text-ink/50 hover:text-brown"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="space-y-9 p-5 sm:p-8">
          <EditorSection
            title="Identity & contact"
            description="The essentials your team needs during onboarding."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                required
                value={form.name}
                onChange={(v) => update("name", v)}
              />
              <Field
                label="Content niche"
                required
                value={form.content_type}
                onChange={(v) => update("content_type", v)}
                placeholder="Beauty, food, tech…"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
              <Field
                label="Phone / WhatsApp"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
              <Field
                label="City / market"
                value={form.location}
                onChange={(v) => update("location", v)}
              />
              <Field
                label="Instagram profile"
                type="url"
                value={form.instagram_url}
                onChange={(v) => update("instagram_url", v)}
                placeholder="https://instagram.com/…"
              />
            </div>
            <div className="mt-5">
              <Label>Profile image</Label>
              <div className="mt-2 flex items-center gap-4 rounded-[3px] border border-dashed border-ink/15 bg-cream/35 p-4">
                <img
                  src={form.avatar_url || avatarFor(form.name || "Creator")}
                  alt="Preview"
                  className="size-16 rounded-full border border-ink/10 bg-paper object-cover"
                />
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-paper px-4 py-2 text-xs font-semibold hover:border-brown hover:text-brown">
                  {uploading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ImagePlus className="size-4" />
                  )}{" "}
                  Upload photo
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => void upload(e.target.files?.[0])}
                  />
                </label>
              </div>
            </div>
          </EditorSection>

          <EditorSection
            title="Audience & commercials"
            description="Performance and pricing kept private in the admin workspace."
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Total reach"
                value={form.reach}
                onChange={(v) => update("reach", v)}
                placeholder="245K"
              />
              <Field
                label="Average views"
                value={form.average_views}
                onChange={(v) => update("average_views", v)}
                placeholder="110K"
              />
              <Field
                label="Engagement rate %"
                type="number"
                step="0.1"
                value={form.engagement_rate}
                onChange={(v) => update("engagement_rate", v)}
              />
              <Field
                label="Internal rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(v) => update("rating", v)}
              />
              <Field
                label="Rate per reel"
                value={form.rate_per_reel}
                onChange={(v) => update("rate_per_reel", v)}
                placeholder="PKR 50,000"
              />
              <div>
                <Label className="text-xs">Onboarding status</Label>
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-ink/10 bg-paper px-3 text-sm outline-none focus:border-brown"
                >
                  <option value="onboarding">Onboarding</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>
            <ChoiceGroup
              label="Languages"
              items={LANGUAGES}
              selected={languages}
              onToggle={(value) => toggle(languages, setLanguages, value)}
            />
            <ChoiceGroup
              label="Platforms"
              items={PLATFORMS}
              selected={platforms}
              onToggle={(value) => toggle(platforms, setPlatforms, value)}
            />
          </EditorSection>

          <EditorSection
            title="Profile details"
            description="Public-facing proof plus internal context."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Review brand"
                value={form.reviewer}
                onChange={(v) => update("reviewer", v)}
              />
              <div>
                <Label className="text-xs">Review comment</Label>
                <Textarea
                  value={form.reviewComment}
                  onChange={(e) => update("reviewComment", e.target.value)}
                  className="mt-2 min-h-24 border-ink/10"
                />
              </div>
            </div>
            <div className="mt-5">
              <Label className="text-xs">Private team notes</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Availability, briefing preferences, negotiations…"
                className="mt-2 min-h-28 border-ink/10"
              />
            </div>
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[3px] border border-ink/10 bg-cream/40 p-4">
              <Checkbox
                checked={form.is_published}
                onCheckedChange={(checked) => update("is_published", checked === true)}
              />
              <span>
                <strong className="block text-sm">Publish on the website</strong>
                <span className="mt-1 block text-xs leading-5 text-ink/50">
                  When enabled, this profile appears immediately on the public influencer page.
                </span>
              </span>
            </label>
          </EditorSection>
        </div>
        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-ink/10 bg-paper/95 p-5 backdrop-blur-xl sm:flex-row sm:justify-end sm:px-8">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={pending}
            className="rounded-full bg-ink px-6 text-white hover:bg-brown"
          >
            {pending && <Loader2 className="size-4 animate-spin" />}
            {influencer ? "Save changes" : "Add influencer"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function EditorSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 border-b border-ink/10 pb-4">
        <h3 className="text-lg font-extrabold tracking-[-.025em]">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-ink/45">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  ...props
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
}) {
  return (
    <div>
      <Label className="text-xs">
        {label}
        {required ? " *" : ""}
      </Label>
      <Input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 border-ink/10"
        {...props}
      />
    </div>
  );
}

function ChoiceGroup({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mt-5">
      <Label className="text-xs">{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <label
            key={item}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
              selected.includes(item)
                ? "border-teal bg-teal/10 text-teal"
                : "border-ink/10 text-ink/55",
            )}
          >
            <Checkbox checked={selected.includes(item)} onCheckedChange={() => onToggle(item)} />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
