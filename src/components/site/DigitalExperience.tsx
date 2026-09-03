import maryas from "@/assets/work-maryas.webp";
import { Reveal, SectionLabel } from "./ui";

export function DigitalExperience() {
  return (
    <section className="digital-section overflow-hidden bg-teal px-6 py-28 text-white md:px-12 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <SectionLabel className="text-white/55">Websites</SectionLabel>
        </Reveal>
        <div className="mt-8 grid items-end gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="section-title">
              From the feed
              <br />
              to the full experience.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-base leading-7 text-white/68 md:ml-auto">
              Maryas Cafe needed more than beautiful bakes. We gave the brand a digital home made to
              feel as warm as the kitchen.
            </p>
          </Reveal>
        </div>
        <div className="device-scene mt-20">
          <div className="laptop">
            <div className="screen">
              <img
                src={maryas}
                alt="Maryas Cafe website on laptop"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="base" />
          </div>
          <div className="tablet">
            <img src={maryas} alt="" aria-hidden loading="lazy" decoding="async" />
          </div>
          <div className="phone">
            <img src={maryas} alt="" aria-hidden loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
