import type { FormEvent } from "react";
import { Diamond, Reveal, SectionLabel } from "./ui";

const process = [
  ["01", "سمجھنا", "Discover"],
  ["02", "سوچنا", "Think"],
  ["03", "بنانا", "Create"],
  ["04", "دکھانا", "Launch"],
];

function ProjectForm() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) || "Not provided");
    const subject = `Project enquiry — ${value("brand")}`;
    const body = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Brand: ${value("brand")}`,
      `Project type: ${value("project")}`,
      `Budget: ${value("budget")}`,
      "",
      "Project details:",
      value("message"),
    ].join("\n");
    window.location.href = `mailto:bisaatlabs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="project-form" onSubmit={submit} aria-label="Start a project enquiry">
      <div className="project-form-grid">
        <label>
          <span>Your name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label>
          <span>Email address</span>
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
        </label>
        <label>
          <span>Brand / business</span>
          <input name="brand" required placeholder="Brand name" />
        </label>
        <label>
          <span>What do you need?</span>
          <select name="project" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option>Brand shoot</option>
            <option>Social media</option>
            <option>Reels & video</option>
            <option>Website</option>
            <option>Podcast production</option>
            <option>Creative campaign</option>
            <option>Something else</option>
          </select>
        </label>
      </div>
      <label>
        <span>Estimated budget</span>
        <select name="budget" defaultValue="">
          <option value="">Prefer to discuss</option>
          <option>Under PKR 100k</option>
          <option>PKR 100k–250k</option>
          <option>PKR 250k–500k</option>
          <option>PKR 500k+</option>
        </select>
      </label>
      <label>
        <span>Tell us about the project</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you building, and what would make it successful?"
        />
      </label>
      <button type="submit">
        Send project enquiry <span aria-hidden>↗</span>
      </button>
    </form>
  );
}

export function ProcessAndFooter() {
  return (
    <>
      <section id="studio" className="site-section studio-section bg-cream px-6 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <SectionLabel>How we work</SectionLabel>
          </Reveal>
          <div className="process-line mt-16 grid md:grid-cols-4">
            {process.map(([n, urdu, title], i) => (
              <Reveal key={n} delay={i * 90} className="process-step">
                <span className="label-xs text-brown">{n}</span>
                <span className="urdu text-2xl text-ink/45">{urdu}</span>
                <strong>{title}</strong>
              </Reveal>
            ))}
          </div>
          <div className="mt-32 grid gap-8 border-t border-ink/12 pt-12 md:grid-cols-2 md:items-end">
            <Reveal>
              <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-[-.045em]">
                Creative,
                <br />
                clear, human.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-xl text-lg leading-8 text-ink/65 md:ml-auto">
                We're a creative team helping growing brands bring content, social, websites and
                production together.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="site-section final-cta relative overflow-hidden bg-cream px-6 md:px-12"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[.045] urdu flex items-center justify-center text-[34vw] text-brown"
        >
          بساط
        </div>
        <Diamond className="floating-diamond left-[14%] top-[22%]" />
        <Diamond className="floating-diamond right-[18%] top-[28%] bg-teal" />
        <Diamond className="floating-diamond bottom-[20%] left-[28%] size-1.5" />
        <div className="contact-layout relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div className="contact-copy lg:sticky lg:top-32">
            <Reveal>
              <p className="urdu text-3xl text-brown md:text-5xl">کچھ اچھا بناتے ہیں۔</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-8 text-[clamp(2.7rem,5.8vw,6rem)] font-extrabold leading-[.94] tracking-[-.045em]">
                Let's make something
                <br />
                worth remembering.
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-8 max-w-md text-base leading-7 text-ink/60">
                Tell us what you're building. We'll reply with the right next step, clearly and
                without the agency theatre.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ProjectForm />
          </Reveal>
        </div>
      </section>
      <footer className="bg-ink px-6 py-10 text-white md:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <img
            src="/bisaat-logo-transparent.webp"
            alt="Bisaat Labs"
            loading="lazy"
            decoding="async"
            className="h-24 w-40 object-contain"
          />
          <div className="footer-contact text-left md:text-right">
            <nav aria-label="Social links" className="footer-socials">
              <a href="https://www.instagram.com/bisaat.labs/" target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
              <span aria-disabled="true" title="LinkedIn profile coming soon">
                LinkedIn
              </span>
              <a href="mailto:bisaatlabs@gmail.com">Email ↗</a>
            </nav>
            <p className="text-sm text-white/65">Karachi, Pakistan · Available worldwide</p>
            <p className="mt-3 label-xs text-white/35">© {new Date().getFullYear()} Bisaat Labs</p>
          </div>
        </div>
      </footer>
    </>
  );
}
