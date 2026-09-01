import { Diamond, SectionLabel, Reveal } from "@/components/site/ui";
import { InfluencerCard } from "./InfluencerCard";
import { useInfluencers } from "@/hooks/useInfluencers";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

export function InfluencersPage() {
  const { data: influencers, isLoading, isError, refetch } = useInfluencers();

  return (
    <main className="min-h-screen bg-cream pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionLabel className="mb-5">
              <Diamond className="size-1.5" /> Influencer Roster
            </SectionLabel>

            <h1 className="text-[clamp(2.3rem,5vw,4.5rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-ink">
              Creators we
              <br />
              love working with.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-ink/60 md:text-lg">
              Handpicked creators for product launches, cultural storytelling, and high-trust brand
              collaborations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
            <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3 py-2 shadow-[0_10px_25px_rgba(28,24,21,0.04)]">
              <span className="inline-flex size-2.5 rounded-full bg-teal" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/60">
                {influencers?.length ?? 0} profiles
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-ink/60">
          <span className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 font-medium">
            Campaign fit
          </span>
          <span className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 font-medium">
            Regional reach
          </span>
          <span className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 font-medium">
            Performance reviews
          </span>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {isLoading && !influencers
            ? Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-[330px] w-full rounded-[28px]" />
              ))
            : influencers?.map((influencer, i) => (
                <Reveal key={influencer.id} delay={Math.min(i, 4) * 80}>
                  <InfluencerCard influencer={influencer} />
                </Reveal>
              ))}
        </div>

        {isError && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-[3px] border border-ink/10 bg-paper p-8 text-center">
            <AlertCircle className="mb-4 size-7 text-brown" />
            <h2 className="text-xl font-bold text-ink">The roster is unavailable</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink/55">
              Please try again in a moment.
            </p>
            <button
              onClick={() => void refetch()}
              className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-brown"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && influencers?.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-[3px] border border-dashed border-ink/15 p-8 text-center">
            <h2 className="text-xl font-bold text-ink">Our roster is being curated.</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink/55">
              New creator profiles will appear here as they are published.
            </p>
            <Link
              to="/"
              hash="contact"
              className="mt-5 text-sm font-semibold text-brown underline-offset-4 hover:underline"
            >
              Plan a campaign ↗
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
