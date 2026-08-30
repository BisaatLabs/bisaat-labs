import { useState } from "react";
import { Star, Instagram, Globe2, Radio, Quote } from "lucide-react";
import type { Influencer } from "@/lib/supabase";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i && rating < i + 1;
        return (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              filled || half ? "fill-brown text-brown" : "fill-transparent text-ink/25",
            )}
            style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
          />
        );
      })}
      <span className="ml-1 text-xs font-semibold text-ink/70">{rating.toFixed(1)}</span>
    </div>
  );
}

export function InfluencerCard({ influencer }: { influencer: Influencer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={cn("flip-card group h-[440px] w-full cursor-pointer", flipped && "is-flipped")}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${influencer.name} — tap to ${flipped ? "see summary" : "see details"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-face flip-card-front overflow-hidden rounded-[3px] border border-ink/10 bg-paper p-6 shadow-[0_20px_50px_rgba(28,24,21,0.08)]">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="relative mb-5 size-28 overflow-hidden rounded-full border-2 border-brown/30 bg-cream">
              <img
                src={influencer.avatar_url}
                alt={influencer.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-ink">{influencer.name}</h3>
            <p className="label-xs mt-2 text-brown">{influencer.content_type}</p>
            <div className="mt-4">
              <Stars rating={influencer.rating} />
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-full bg-cream px-4 py-2">
              <Radio className="size-3.5 text-teal" />
              <span className="text-sm font-semibold text-ink">{influencer.reach}</span>
              <span className="label-xs text-ink/45">reach</span>
            </div>
          </div>
          <p className="label-xs mt-4 text-center text-ink/35">Tap to see details ↻</p>
        </div>

        {/* Back */}
        <div className="flip-card-face flip-card-back flex flex-col overflow-hidden rounded-[3px] border border-ink/10 bg-ink p-6 text-white shadow-[0_20px_50px_rgba(28,24,21,0.25)]">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <img
              src={influencer.avatar_url}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="size-10 rounded-full border border-white/20 object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{influencer.name}</p>
              <p className="label-xs text-white/45">{influencer.content_type}</p>
            </div>
          </div>

          <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1 text-sm">
            <a
              href={influencer.instagram_url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-full bg-brown px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brown/85"
            >
              <Instagram className="size-4" /> View Instagram profile ↗
            </a>

            <div>
              <p className="label-xs mb-1.5 flex items-center gap-1.5 text-white/45">
                <Globe2 className="size-3.5" /> Makes reels in
              </p>
              <div className="flex flex-wrap gap-1.5">
                {influencer.languages.length > 0 ? (
                  influencer.languages.map((lang) => (
                    <span key={lang} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-white/40">Not specified</span>
                )}
              </div>
            </div>

            <div>
              <p className="label-xs mb-1.5 text-white/45">Active on</p>
              <div className="flex flex-wrap gap-1.5">
                {influencer.platforms.length > 0 ? (
                  influencer.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full border border-teal/50 bg-teal/15 px-3 py-1 text-xs text-teal-100"
                    >
                      {platform}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-white/40">Not specified</span>
                )}
              </div>
            </div>

            {influencer.reviews.length > 0 && (
              <div>
                <p className="label-xs mb-1.5 text-white/45">Reviews</p>
                <div className="space-y-2">
                  {influencer.reviews.map((review, i) => (
                    <div key={i} className="rounded-md bg-white/5 p-3">
                      <div className="flex items-start gap-2">
                        <Quote className="mt-0.5 size-3 shrink-0 text-brown" />
                        <p className="text-xs leading-5 text-white/75">{review.comment}</p>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between pl-5">
                        <span className="text-[11px] font-semibold text-white/55">
                          — {review.reviewer}
                        </span>
                        <span className="text-[11px] text-brown">{review.rating.toFixed(1)} ★</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="label-xs mt-3 text-center text-white/30">Tap to flip back ↻</p>
        </div>
      </div>
    </div>
  );
}
