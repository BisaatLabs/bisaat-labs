import { useEffect, useRef, useState } from "react";
import { Reveal, SectionLabel, useReducedMotion } from "./ui";

const testimonials = [
  {
    quote:
      "They turned a simple product brief into a visual world that feels warm, premium and unmistakably ours.",
    client: "Maryas Cafe",
    service: "Brand content & food direction",
    tone: "paper",
  },
  {
    quote:
      "Every product detail was given a clear purpose. The final campaign feels considered, elegant and commercially sharp.",
    client: "Aroomat",
    service: "Campaign & product story",
    tone: "brown",
  },
  {
    quote:
      "Bisaat understood the emotion behind the brand and translated it into content people immediately connected with.",
    client: "Gulluckwala",
    service: "Brand story & production",
    tone: "soft",
  },
  {
    quote:
      "From styling to final delivery, the process was calm, collaborative and exceptionally well directed.",
    client: "Mure",
    service: "Art direction & still life",
    tone: "teal",
  },
  {
    quote:
      "The team found the balance we needed—soft, modern visuals with a brand presence that still feels distinctive.",
    client: "Mavme",
    service: "Social content & creative direction",
    tone: "paper",
  },
  {
    quote:
      "Thoughtful strategy, polished production and a digital-first eye made the work stronger at every touchpoint.",
    client: "Zenssphere",
    service: "Product content & digital craft",
    tone: "ink",
  },
] as const;

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [arranged, setArranged] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setArranged(true);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        timer = window.setTimeout(() => setArranged(true), 180);
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="site-section testimonials-section bg-cream px-6 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="testimonials-heading">
          <Reveal>
            <SectionLabel>Client notes</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2>
              The work speaks.
              <br />
              <span>So do our clients.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p>Real partnerships, considered craft and work designed to leave an impression.</p>
          </Reveal>
        </div>

        <div
          className={`testimonials-stage ${arranged ? "is-arranged" : ""}`}
          aria-label="Client testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.client}
              className={`testimonial-card testimonial-card--${testimonial.tone}`}
              style={{ "--testimonial-index": index } as React.CSSProperties}
            >
              <div className="testimonial-card-top">
                <span className="testimonial-quote" aria-hidden="true">
                  “
                </span>
                <span className="testimonial-number">0{index + 1}</span>
              </div>
              <blockquote>{testimonial.quote}</blockquote>
              <footer>
                <span className="testimonial-mark" aria-hidden="true" />
                <span>
                  <strong>{testimonial.client}</strong>
                  <small>{testimonial.service}</small>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
