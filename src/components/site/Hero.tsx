import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-agency-transparent.webp";
import { Magnetic } from "./ui";

const metrics = [
  { value: 20, suffix: "+", label: "Clients partnered" },
  { value: 30, suffix: "+", label: "Influencers onboard" },
  { value: 50, suffix: "+", label: "Campaigns delivered" },
  { value: 5, suffix: "", label: "Services, one studio", pad: 2 },
];

function AnimatedNumber({
  value,
  suffix,
  pad = 0,
}: {
  value: number;
  suffix: string;
  pad?: number;
}) {
  const [display, setDisplay] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }

        const startedAt = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={numberRef}>
      {display.toString().padStart(pad, "0")}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <>
      <section id="top" className="agency-hero">
        <div className="agency-hero-grid" aria-hidden="true" />

        <div className="agency-hero-inner">
          <div className="agency-hero-copy">
            <h1>
              <span>We help brands</span>
              <span>show up better.</span>
            </h1>

            <p className="agency-hero-description">
              Strategy, content, social, websites, and production—built as one clear, connected
              brand experience.
            </p>

            <div className="agency-hero-actions">
              <Magnetic href="#contact" className="agency-hero-primary">
                Start a Project <span>↗</span>
              </Magnetic>
              <a href="#work" className="agency-hero-secondary">
                Explore selected work <span>↓</span>
              </a>
            </div>
          </div>

          <div className="agency-hero-image-wrap" aria-hidden="true">
            <img
              src={heroImage}
              alt=""
              width={1536}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className="agency-hero-image"
            />
          </div>
        </div>
      </section>

      <section className="agency-metrics" aria-label="Bisaat Labs in numbers">
        <div className="agency-metrics-inner">
          {metrics.map((metric) => (
            <div key={metric.label} className="agency-metric">
              <strong>
                <AnimatedNumber value={metric.value} suffix={metric.suffix} pad={metric.pad} />
              </strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
