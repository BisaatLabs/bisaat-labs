import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarClock,
  Camera,
  Clapperboard,
  Megaphone,
  PanelsTopLeft,
} from "lucide-react";
import { Reveal, SectionLabel } from "./ui";

type Capability = {
  number: string;
  title: string;
  description: string;
  deliverables: string;
  icon: LucideIcon;
  tone: "paper" | "brown" | "teal" | "soft";
};

const capabilities: Capability[] = [
  {
    number: "01",
    title: "Brand guidelines",
    description:
      "We define how your brand should appear digitally and turn that direction into polished, high-quality posts.",
    deliverables: "Logo usage · Typography · Colour · Voice",
    icon: BookOpen,
    tone: "paper",
  },
  {
    number: "02",
    title: "Product & brand shoots",
    description:
      "Our team shoots and edits your products into professional Instagram posts and engaging reels.",
    deliverables: "Concept · Styling · Photography",
    icon: Camera,
    tone: "brown",
  },
  {
    number: "03",
    title: "Social & reels",
    description:
      "We create platform-ready posts and reels designed to capture attention and strengthen your social presence.",
    deliverables: "Content plans · Reels · Editing",
    icon: Clapperboard,
    tone: "soft",
  },
  {
    number: "04",
    title: "Web & digital",
    description:
      "We design professional, interactive and fully customized websites that help businesses grow digitally.",
    deliverables: "UX · Design · Development",
    icon: PanelsTopLeft,
    tone: "paper",
  },
  {
    number: "05",
    title: "Social media management",
    description:
      "We plan your content calendar, edit posts and reels, and publish consistently across your social channels.",
    deliverables: "Content calendar · Editing · Posting",
    icon: CalendarClock,
    tone: "teal",
  },
  {
    number: "06",
    title: "Creative campaigns",
    description:
      "We develop memorable campaign ideas and adapt them into cohesive content across every digital touchpoint.",
    deliverables: "Concept · Rollout · Digital content",
    icon: Megaphone,
    tone: "paper",
  },
];

export function Reels() {
  return (
    <section
      id="capabilities"
      className="site-section capabilities-section bg-ink px-6 text-cream md:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <header className="capabilities-heading">
          <div>
            <SectionLabel className="text-brown">What we do</SectionLabel>
            <h2>
              One idea.
              <br />
              <span>Every touchpoint.</span>
            </h2>
          </div>
          <p>
            From the first thought to the final launch, we connect strategy, content, production and
            digital into one coherent brand experience.
          </p>
        </header>

        <div className="capabilities-grid">
          {capabilities.map(({ number, title, description, deliverables, icon: Icon, tone }, index) => (
            <Reveal key={number} className="h-full" delay={index * 70} y={22}>
              <article className={`capability-card capability-card--${tone}`}>
                <div className="capability-card-top">
                  <span className="capability-card-number">{number}</span>
                  <span className="capability-icon" aria-hidden="true">
                    <span className="capability-icon-face">
                      <Icon strokeWidth={1.65} />
                    </span>
                  </span>
                </div>
                <div className="capability-card-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <small>{deliverables}</small>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
