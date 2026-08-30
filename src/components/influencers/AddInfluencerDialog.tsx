import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddInfluencer } from "@/hooks/useInfluencers";
import { avatarFor } from "@/data/demo-influencers";
import { isSupabaseConfigured, type InfluencerInsert } from "@/lib/supabase";

const LANGUAGE_OPTIONS = ["Urdu", "English", "Punjabi", "Sindhi", "Pashto"];
const PLATFORM_OPTIONS = ["Instagram", "TikTok", "YouTube", "Facebook", "Snapchat"];

const EMPTY_FORM = {
  name: "",
  avatar_url: "",
  rating: "4.5",
  reach: "",
  content_type: "",
  instagram_url: "",
  reviewer: "",
  reviewComment: "",
};

export function AddInfluencerDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [languages, setLanguages] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const { mutate, isPending } = useAddInfluencer();

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setLanguages([]);
    setPlatforms([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.content_type.trim()) return;

    const payload: InfluencerInsert = {
      name: form.name.trim(),
      avatar_url: form.avatar_url.trim() || avatarFor(form.name.trim()),
      rating: Math.min(5, Math.max(0, Number(form.rating) || 4.5)),
      reach: form.reach.trim() || "—",
      content_type: form.content_type.trim(),
      instagram_url: form.instagram_url.trim() || "https://instagram.com/",
      languages,
      platforms,
      reviews:
        form.reviewer.trim() && form.reviewComment.trim()
          ? [{ reviewer: form.reviewer.trim(), comment: form.reviewComment.trim(), rating: 5 }]
          : [],
    };

    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(28,24,21,0.18)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brown">
          <Plus className="size-4" /> Add influencer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-[20px] border border-ink/10 bg-paper p-0 shadow-[0_30px_80px_rgba(28,24,21,0.12)] sm:max-w-xl">
        <div className="border-b border-ink/10 bg-cream px-6 py-5">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold tracking-[-0.03em] text-ink">
              Add an influencer
            </DialogTitle>
            <DialogDescription className="text-sm text-ink/60">
              This gets added to the roster{" "}
              {isSupabaseConfigured ? "and saved to Supabase." : "for this demo session."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Sara Malik"
                className="border-ink/10 bg-paper"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="avatar_url">Avatar image URL</Label>
              <Input
                id="avatar_url"
                value={form.avatar_url}
                onChange={(e) => setForm((f) => ({ ...f, avatar_url: e.target.value }))}
                placeholder="Leave blank to auto-generate one"
                className="border-ink/10 bg-paper"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="content_type">Content type *</Label>
              <Input
                id="content_type"
                required
                value={form.content_type}
                onChange={(e) => setForm((f) => ({ ...f, content_type: e.target.value }))}
                placeholder="e.g. Beauty & Skincare"
                className="border-ink/10 bg-paper"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reach">Reach</Label>
              <Input
                id="reach"
                value={form.reach}
                onChange={(e) => setForm((f) => ({ ...f, reach: e.target.value }))}
                placeholder="e.g. 120K"
                className="border-ink/10 bg-paper"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rating">Rating (0–5)</Label>
              <Input
                id="rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                className="border-ink/10 bg-paper"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={form.instagram_url}
                onChange={(e) => setForm((f) => ({ ...f, instagram_url: e.target.value }))}
                placeholder="https://instagram.com/…"
                className="border-ink/10 bg-paper"
              />
            </div>
          </div>

          <div className="rounded-[18px] border border-ink/10 bg-cream/70 p-4">
            <Label className="mb-2.5 block text-sm font-semibold text-ink">Makes reels in</Label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => (
                <label
                  key={lang}
                  className="flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-sm text-ink/70"
                >
                  <Checkbox
                    checked={languages.includes(lang)}
                    onCheckedChange={() => toggle(languages, setLanguages, lang)}
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border border-ink/10 bg-cream/70 p-4">
            <Label className="mb-2.5 block text-sm font-semibold text-ink">Active on</Label>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_OPTIONS.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-sm text-ink/70"
                >
                  <Checkbox
                    checked={platforms.includes(platform)}
                    onCheckedChange={() => toggle(platforms, setPlatforms, platform)}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="reviewer">Sample review — brand</Label>
              <Input
                id="reviewer"
                value={form.reviewer}
                onChange={(e) => setForm((f) => ({ ...f, reviewer: e.target.value }))}
                placeholder="Optional"
                className="border-ink/10 bg-paper"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reviewComment">Sample review — comment</Label>
              <Textarea
                id="reviewComment"
                rows={1}
                value={form.reviewComment}
                onChange={(e) => setForm((f) => ({ ...f, reviewComment: e.target.value }))}
                placeholder="Optional"
                className="border-ink/10 bg-paper"
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              Add to roster
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
