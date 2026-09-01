import { useState } from "react";
import { ChevronDown, Eye, Instagram, MapPin, PlayCircle, Star, UsersRound } from "lucide-react";
import type { Influencer } from "@/lib/supabase";
import { avatarFor } from "@/data/demo-influencers";
import { cn } from "@/lib/utils";

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-brown">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
          {label}
        </span>
        <strong className="mt-0.5 block truncate text-sm font-bold text-ink">{value}</strong>
      </span>
    </div>
  );
}

export function InfluencerCard({ influencer }: { influencer: Influencer }) {
  const [expanded, setExpanded] = useState(false);
  const avatar = influencer.avatar_url || avatarFor(influencer.name);
  const averageViews = influencer.average_views || "Not shared";
  const engagement = influencer.engagement_rate
    ? `${influencer.engagement_rate.toFixed(1)}%`
    : `${influencer.rating.toFixed(1)} / 5`;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-ink/[0.08] bg-paper shadow-[0_18px_55px_rgba(28,24,21,0.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(28,24,21,0.12)]">
      <div className="relative p-5 sm:p-6">
        <div className="grid items-center gap-6 sm:grid-cols-[150px_1fr]">
          <div className="mx-auto size-36 overflow-hidden rounded-full border border-ink/10 bg-cream p-1 shadow-[0_12px_35px_rgba(28,24,21,0.1)] sm:mx-0 sm:size-[150px]">
            <img
              src={avatar}
              alt={influencer.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div className="min-w-0 text-center sm:text-left">
            <h3 className="pr-6 text-xl font-extrabold tracking-[-0.03em] text-ink sm:text-2xl">
              {influencer.name}
            </h3>
            <p className="mt-1.5 text-xs font-semibold text-brown">{influencer.content_type}</p>
            {influencer.location && (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-ink/40 sm:justify-start">
                <MapPin className="size-3.5" /> {influencer.location}
              </p>
            )}

            <div className="mt-5 grid grid-cols-1 gap-3 text-left min-[430px]:grid-cols-3 sm:grid-cols-1">
              <Stat
                icon={<UsersRound className="size-4" />}
                label="Reach"
                value={influencer.reach || "—"}
              />
              <Stat icon={<Eye className="size-4" />} label="Avg. views" value={averageViews} />
              <Stat
                icon={<PlayCircle className="size-4" />}
                label="Engagement"
                value={engagement}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-3 border-t border-ink/[0.08] pt-5">
          <a
            href={influencer.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-xs font-bold text-white transition-colors hover:bg-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2"
          >
            <Instagram className="size-4" /> View profile
          </a>
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-ink/10 bg-cream px-4 text-xs font-bold text-ink transition-colors hover:border-brown hover:text-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2"
            aria-expanded={expanded}
          >
            Details
            <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-ink/[0.08] bg-cream/45 px-5 py-5 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">
                  Languages
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(influencer.languages.length ? influencer.languages : ["Not specified"]).map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs text-ink/60"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">
                  Platforms
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(influencer.platforms.length ? influencer.platforms : ["Not specified"]).map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-teal/25 bg-teal/10 px-3 py-1 text-xs text-teal"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
            {influencer.reviews[0] && (
              <blockquote className="mt-5 rounded-2xl bg-paper p-4 text-xs leading-5 text-ink/60">
                “{influencer.reviews[0].comment}”
                <footer className="mt-2 flex items-center justify-between gap-3 font-bold text-ink/45">
                  <span>— {influencer.reviews[0].reviewer}</span>
                  <span className="inline-flex items-center gap-1 text-brown">
                    <Star className="size-3 fill-current" />{" "}
                    {influencer.reviews[0].rating.toFixed(1)}
                  </span>
                </footer>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
