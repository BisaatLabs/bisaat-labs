import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  CalendarDays,
  Clapperboard,
  Megaphone,
  MonitorSmartphone,
  Shapes,
} from "lucide-react";
import { SectionLabel } from "./ui";

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
    description: "A clear, usable system that keeps every expression of your brand consistent.",
    deliverables: "Logo usage · Typography · Colour · Voice",
    icon: Shapes,
    tone: "paper",
  },
  {
    number: "02",
    title: "Product & brand shoots",
    description: "Art-directed imagery that gives every product a world of its own.",
    deliverables: "Concept · Styling · Photography",
    icon: Aperture,
    tone: "brown",
  },
  {
    number: "03",
    title: "Social & reels",
    description: "Platform-native stories designed to earn attention and keep it.",
    deliverables: "Content plans · Reels · Editing",
    icon: Clapperboard,
    tone: "soft",
  },
  {
    number: "04",
    title: "Web & digital",
    description: "Fast, considered websites that turn brand presence into experience.",
    deliverables: "UX · Design · Development",
    icon: MonitorSmartphone,
    tone: "paper",
  },
  {
    number: "05",
    title: "Social media management",
    description:
      "Planned content calendars, polished post and reel editing, and consistent publishing across your channels.",
    deliverables: "Content calendar · Editing · Posting",
    icon: CalendarDays,
    tone: "teal",
  },
  {
    number: "06",
    title: "Creative campaigns",
    description: "One strong idea, shaped consistently across every audience touchpoint.",
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
          {capabilities.map(({ number, title, description, deliverables, icon: Icon, tone }) => (
            <article key={number} className={`capability-card capability-card--${tone}`}>
              <div className="capability-card-top">
                <span>{number}</span>
                <Icon aria-hidden="true" strokeWidth={1.5} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <small>{deliverables}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
