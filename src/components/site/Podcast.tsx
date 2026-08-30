import mic from "@/assets/mic.webp";
import { Reveal, SectionLabel } from "./ui";

export function Podcast() {
  return (
    <section className="podcast-section relative overflow-hidden bg-ink px-6 py-32 text-white md:px-12 md:py-52">
      <div className="waveform" aria-hidden>
        {Array.from({ length: 34 }, (_, i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="relative mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <Reveal>
            <SectionLabel className="text-white/45">Podcast production</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-title mt-8">Some stories need more than 30 seconds.</h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-md text-lg leading-8 text-white/60">
              Podcasts built to be heard, watched and remembered.
            </p>
          </Reveal>
        </div>
        <div className="mic-stage" data-cursor="dot">
          <div className="mic-halo" />
          <img src={mic} alt="Studio podcast microphone" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
