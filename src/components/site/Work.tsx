import aroomat from "@/assets/selected-aroomat.jpg";
import gulluckwala from "@/assets/selected-gulluckwala.jpg";
import maryas from "@/assets/selected-maryas.jpg";
import mavme from "@/assets/selected-mavme.jpg";
import mure from "@/assets/selected-mure.jpg";
import zenssphere from "@/assets/selected-zenssphere.jpg";
import { Reveal, SectionLabel } from "./ui";

const projects = [
  {
    src: maryas,
    name: "Maryas Cafe",
    kind: "Digital experience · Food direction",
    index: "01",
    format: "landscape",
    href: "https://www.instagram.com/maryascafe/?hl=en",
  },
  {
    src: aroomat,
    name: "Aroomat",
    kind: "Campaign · Product story",
    index: "02",
    format: "landscape",
    href: "https://www.instagram.com/aroomat.official/?hl=en",
  },
  {
    src: gulluckwala,
    name: "Gulluckwala",
    kind: "Brand story · Gifting",
    index: "03",
    format: "landscape",
    href: "https://www.instagram.com/gulluckwala/?hl=en",
  },
  {
    src: mure,
    name: "Mure",
    kind: "Art direction · Still life",
    index: "04",
    format: "three-two",
    href: "https://www.instagram.com/mureofficial_/?hl=en",
  },
  {
    src: mavme,
    name: "Mavme",
    kind: "Social content · Floral",
    index: "05",
    format: "standard",
    href: "https://www.instagram.com/mavmeofficial/?hl=en",
  },
  {
    src: zenssphere,
    name: "Zenssphere",
    kind: "Product · Macro",
    index: "06",
    format: "standard",
    href: "https://www.instagram.com/zenssphere/?hl=en",
  },
] as const;

function Project({ project }: { project: (typeof projects)[number] }) {
  return (
    <a
      className={`work-card work-card--${project.format}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${project.name} on Instagram`}
    >
      <div
        className="work-card-media"
        style={{ "--work-image": `url("${project.src}")` } as React.CSSProperties}
      >
        <img
          src={project.src}
          alt={`${project.name} — ${project.kind}`}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"
        />
      </div>
      <div className="work-card-shade" />
      <span className="work-card-index">{project.index}</span>
      <div className="work-card-caption">
        <span>{project.kind}</span>
        <div className="work-card-title-row">
          <h3>{project.name}</h3>
          <span className="work-card-link" aria-hidden="true">
            Instagram ↗
          </span>
        </div>
      </div>
    </a>
  );
}

export function Work() {
  return (
    <section id="work" className="site-section work-section relative bg-cream px-6 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="work-heading">
          <div>
            <SectionLabel className="mb-6">Selected Work</SectionLabel>
            <h2>
              Built to be seen.
              <br />
              <span>Made to be remembered.</span>
            </h2>
          </div>
          <p>
            A selection of brand worlds shaped through strategy, art direction, production and
            digital craft.
          </p>
        </div>

        <div className="work-showcase">
          {projects.map((project, index) => (
            <Reveal key={project.name} className="work-reveal" delay={(index % 3) * 80}>
              <Project project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
