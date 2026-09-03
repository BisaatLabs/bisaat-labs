import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import camera from "@/assets/story-camera.png";
import aroomat from "@/assets/story-aroomat.png";
import maryas from "@/assets/story-maryas.png";
import mavme from "@/assets/story-mavme.png";
import mure from "@/assets/story-mure.png";
import zenssphere from "@/assets/story-zenssphere.png";
import background from "@/assets/story-background.jpg";

const brands = [
  { src: mavme, name: "Mavme", position: "top-left" },
  { src: maryas, name: "Maryas Cafe", position: "top-right" },
  { src: mure, name: "Mure", position: "bottom-left" },
  { src: aroomat, name: "Aroomat", position: "middle-right" },
  { src: zenssphere, name: "Zenssphere", position: "bottom-right" },
] as const;

export function CameraScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".brand-story-card");

      if (reducedMotion) {
        gsap.set(
          [".brand-story-intro", ".brand-story-message--final", ".brand-story-camera", ...cards],
          {
            clearProps: "all",
            autoAlpha: 1,
          },
        );
        gsap.set(".brand-story-message--initial", { autoAlpha: 0 });
        return;
      }

      gsap.set(".brand-story-message--final", { autoAlpha: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerWidth < 768 ? 175 : 230}%`,
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          ".brand-story-intro",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
        )
        .fromTo(
          ".brand-story-camera",
          { autoAlpha: 0, y: "14vh", scale: 0.64, rotateX: 8 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 0.8 },
          0.42,
        )
        .to(
          ".brand-story-message--initial",
          { autoAlpha: 0, y: -18, duration: 0.34, ease: "power2.in" },
          1.16,
        )
        .fromTo(
          ".brand-story-message--final",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.42 },
          1.32,
        )
        .to(".brand-story-camera", { scale: 0.92, y: "2vh", duration: 0.5 }, 1.22);

      cards.forEach((card, index) => {
        timeline.fromTo(
          card,
          {
            autoAlpha: 0,
            x: () => {
              const bounds = card.getBoundingClientRect();
              return window.innerWidth / 2 - (bounds.left + bounds.width / 2);
            },
            y: () => {
              const bounds = card.getBoundingClientRect();
              return window.innerHeight * 0.59 - (bounds.top + bounds.height / 2);
            },
            scale: 0.28,
          },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.68 },
          1.4 + index * 0.07,
        );
      });

      timeline.to(".brand-story-camera", { scale: 0.88, duration: 0.45 }, 1.92);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={root}
      className="brand-story"
      aria-labelledby="brand-story-title"
      style={{ "--brand-story-background": `url("${background}")` } as CSSProperties}
    >
      <header className="brand-story-intro">
        <span className="brand-story-label">Our approach</span>
        <div className="brand-story-message brand-story-message--initial">
          <h2 id="brand-story-title">
            We don't just shoot <em>content.</em>
          </h2>
          <p>We craft visuals that tell stories, build brands and create lasting impact.</p>
        </div>
        <div className="brand-story-message brand-story-message--final" aria-hidden="true">
          <h2>
            We build brands <em>people remember.</em>
          </h2>
          <p>Distinct ideas, beautifully made and designed to stay with your audience.</p>
        </div>
      </header>

      <div className="brand-story-camera">
        <img
          src={camera}
          alt="Vintage professional camera"
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
        />
        <span className="brand-story-focus" aria-hidden="true" />
      </div>

      <div className="brand-story-brands" aria-label="Brands featured in our work">
        {brands.map((brand) => (
          <div key={brand.name} className={`brand-story-slot brand-story-slot--${brand.position}`}>
            <figure className="brand-story-card">
              <img
                src={brand.src}
                alt={`${brand.name} brand card`}
                width={520}
                height={520}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{brand.name}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
