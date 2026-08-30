import { useState } from "react";
import camera from "@/assets/camera.webp";
import mic from "@/assets/mic.webp";
import reel from "@/assets/reel-2.webp";
import work from "@/assets/work-mure.webp";
import { Reveal, SectionLabel } from "./ui";

const services = [
  {
    name: "Brand Shoots",
    note: "Still life, people and product worlds.",
    kind: "image",
    src: camera,
  },
  {
    name: "Social Media",
    note: "A feed with taste, rhythm and a point of view.",
    kind: "portrait",
    src: reel,
  },
  {
    name: "Reels & Video",
    note: "Short-form stories people choose to watch.",
    kind: "portrait",
    src: work,
  },
  { name: "Editing", note: "Pacing, colour and sound with purpose.", kind: "timeline" },
  { name: "Websites", note: "Digital homes that feel unmistakably yours.", kind: "browser" },
  { name: "Podcasts", note: "Conversations built to travel further.", kind: "image", src: mic },
  { name: "Creative Campaigns", note: "One clear idea across every screen.", kind: "type" },
];

function ServiceVisual({ item }: { item: (typeof services)[number] }) {
  if (item.kind === "timeline")
    return (
      <div className="service-timeline">
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  if (item.kind === "browser")
    return (
      <div className="service-browser">
        <span />
        <strong>
          Ideas need
          <br />a good home.
        </strong>
        <i />
      </div>
    );
  if (item.kind === "type")
    return (
      <div className="service-type">
        <span>ONE</span>
        <span>GOOD</span>
        <span>IDEA.</span>
      </div>
    );
  return (
    <img
      src={item.src}
      alt=""
      loading="lazy"
      decoding="async"
      className={item.kind === "portrait" ? "service-portrait" : "service-object"}
    />
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="bg-paper px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <SectionLabel>What we do</SectionLabel>
        </Reveal>
        <div className="mt-8 grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="section-title">
                One Bisaat.
                <br />
                Many ways to show up.
              </h2>
            </Reveal>
            <div className="service-stage mt-14" aria-live="polite">
              <ServiceVisual item={services[active] ?? services[0]!} />
            </div>
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10 self-end">
            {services.map((item, index) => (
              <button
                key={item.name}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`service-row ${active === index ? "is-active" : ""}`}
              >
                <span className="label-xs">0{index + 1}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.note}</small>
                </span>
                <span aria-hidden>↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
