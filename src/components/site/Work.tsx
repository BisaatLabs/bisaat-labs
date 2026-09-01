import gullak from "@/assets/work-gullakwala.webp";
import mure from "@/assets/work-mure.webp";
import mavme from "@/assets/work-mavme.webp";
import zen from "@/assets/work-zensphere.webp";
import arooma from "@/assets/work-arooma.webp";
import maryas from "@/assets/work-maryas.webp";
import { Reveal, SectionLabel } from "./ui";

const projects = [
  {
    src: maryas,
    name: "Maryas Cafe",
    kind: "Digital experience · Food direction",
    index: "01",
    layout: "hero",
    position: "center",
  },
  {
    src: arooma,
    name: "Arooma",
    kind: "Campaign · Product story",
    index: "02",
    layout: "wide",
    position: "center 58%",
  },
  {
    src: gullak,
    name: "Gullakwala",
    kind: "Brand story · Gifting",
    index: "03",
    layout: "tall",
    position: "center",
  },
  {
    src: mure,
    name: "Mure",
    kind: "Art direction · Still life",
    index: "04",
    layout: "tile",
    position: "center",
  },
  {
    src: mavme,
    name: "Mavme",
    kind: "Social content · Floral",
    index: "05",
    layout: "tile",
    position: "center",
  },
  {
    src: zen,
    name: "Zensphere",
    kind: "Product · Macro",
    index: "06",
    layout: "tile",
    position: "center",
  },
] as const;

function Project({ project }: { project: (typeof projects)[number] }) {
  return (
    <figure className={`work-card work-card--${project.layout}`}>
      <div className="work-card-media">
        <img
          src={project.src}
          alt={`${project.name} — ${project.kind}`}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: project.position }}
          sizes={
            project.layout === "hero"
              ? "(max-width: 767px) 100vw, 92vw"
              : project.layout === "tile"
                ? "(max-width: 767px) 100vw, 31vw"
                : "(max-width: 767px) 100vw, 52vw"
          }
        />
      </div>
      <div className="work-card-shade" />
      <span className="work-card-index">{project.index}</span>
      <figcaption className="work-card-caption">
        <span>{project.kind}</span>
        <h3>{project.name}</h3>
      </figcaption>
    </figure>
  );
}

export function Work() {
  return (
    <section id="work" className="work-section relative bg-cream px-6 py-28 md:px-12 md:py-40">
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
            <Reveal
              key={project.name}
              className={`work-reveal work-reveal--${project.layout}`}
              delay={(index % 3) * 80}
            >
              <Project project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
