import { useRef } from "react";
import gullak from "@/assets/work-gullakwala.webp";
import mure from "@/assets/work-mure.webp";
import mavme from "@/assets/work-mavme.webp";
import zen from "@/assets/work-zensphere.webp";
import arooma from "@/assets/work-arooma.webp";
import maryas from "@/assets/work-maryas.webp";
import { Reveal, SectionLabel } from "./ui";

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1200px) rotateY(${nx * 3.2}deg) rotateX(${-ny * 3.2}deg) scale(1.03)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "perspective(1200px) rotateY(0) rotateX(0) scale(1)";
      }}
      style={{ transition: "transform 700ms cubic-bezier(.16,1,.3,1)", willChange: "transform" }}
      className="h-full w-full"
    >
      {children}
    </div>
  );
}

function Project({
  src,
  name,
  kind,
  ratio,
  index,
}: {
  src: string;
  name: string;
  kind: string;
  ratio: string;
  index: string;
}) {
  return (
    <figure className="group" data-cursor="VIEW">
      <div className="overflow-hidden bg-paper">
        <Tilt>
          <img
            src={src}
            alt={`${name} — ${kind}`}
            loading="lazy"
            className={`w-full object-cover ${ratio}`}
          />
        </Tilt>
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-3">
        <span className="text-lg font-bold tracking-[-0.02em] transition-colors duration-300 group-hover:text-brown">
          {name}
        </span>
        <span className="label-xs text-ink/45">
          {kind} <span className="ml-3 text-brown">{index}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Work() {
  return (
    <section id="work" className="relative bg-cream px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
          <div>
            <SectionLabel className="mb-6">Selected Work</SectionLabel>
            <h2 className="max-w-2xl text-[clamp(2.2rem,5vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              Six brands.
              <br />
              Six different rooms.
            </h2>
          </div>
          <p className="urdu max-w-xs text-xl text-brown md:text-2xl">نظر آئے۔ یاد رہے۔</p>
        </div>

        {/* Editorial, deliberately uneven grid */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-24">
          <div className="col-span-12 md:col-span-5 md:col-start-2">
            <Reveal>
              <Project
                src={arooma}
                name="Arooma"
                kind="Fragrance / Campaign"
                ratio="aspect-[4/5]"
                index="01"
              />
            </Reveal>
          </div>
          <div className="col-span-12 self-end md:col-span-4 md:col-start-8">
            <Reveal delay={120}>
              <Project
                src={zen}
                name="Zensphere"
                kind="Jewellery / Macro"
                ratio="aspect-[7/5]"
                index="02"
              />
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-4">
            <Reveal>
              <Project
                src={mure}
                name="Mure"
                kind="Candles / Interiors"
                ratio="aspect-[16/9]"
                index="03"
              />
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-2">
            <Reveal>
              <Project
                src={gullak}
                name="Gullakwala"
                kind="Umrah Gifting"
                ratio="aspect-[4/5]"
                index="04"
              />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-7 md:pt-20">
            <Reveal delay={120}>
              <Project
                src={mavme}
                name="Mavme"
                kind="Flowers / Studio"
                ratio="aspect-[4/5]"
                index="05"
              />
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <Reveal>
              <Project
                src={maryas}
                name="Maryas Cafe"
                kind="Baking / Website"
                ratio="aspect-[21/9]"
                index="06"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
