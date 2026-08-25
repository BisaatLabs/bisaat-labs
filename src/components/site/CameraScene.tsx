import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import camera from "@/assets/camera.png";
import gullak from "@/assets/work-gullakwala.jpg";
import mure from "@/assets/work-mure.jpg";
import mavme from "@/assets/work-mavme.jpg";
import zen from "@/assets/work-zensphere.jpg";
import arooma from "@/assets/work-arooma.jpg";

const orbit = [
  { src: gullak, label: "Gullakwala", x: -34, y: -26, r: -7, s: 0.78, cls: "w-[30vw] md:w-[19vw] aspect-[4/5]" },
  { src: mure, label: "Mure", x: 34, y: -22, r: 6, s: 0.82, cls: "w-[34vw] md:w-[22vw] aspect-[3/2]" },
  { src: mavme, label: "Mavme", x: -30, y: 25, r: 5, s: 0.72, cls: "w-[28vw] md:w-[17vw] aspect-[4/5]" },
  { src: zen, label: "Zensphere", x: 32, y: 27, r: -5, s: 0.76, cls: "w-[32vw] md:w-[20vw] aspect-[7/5]" },
  { src: arooma, label: "Arooma", x: 0, y: 2, r: 0, s: 1.15, cls: "w-[52vw] md:w-[30vw] aspect-[4/5]" },
];

export function CameraScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".cam-photo", { opacity: 1 });
        gsap.set(".cam-body", { opacity: 1, scale: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".cam-body",
        { y: "42vh", scale: 0.6, rotateY: -26, rotateX: 10, opacity: 0 },
        { y: "0vh", scale: 1, rotateY: -6, rotateX: 2, opacity: 1, ease: "power2.out", duration: 1.1 },
      )
        .fromTo(".cam-line-1", { opacity: 1, y: 0 }, { opacity: 0, y: -60, duration: 0.5 }, 0.55)
        .fromTo(".cam-line-2", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.6 }, 0.85)
        .fromTo(".cam-glint", { xPercent: -140, opacity: 0 }, { xPercent: 140, opacity: 0.85, duration: 0.7 }, 1.35)
        .to(".cam-glint", { opacity: 0, duration: 0.2 }, 2.0);

      orbit.forEach((o, i) => {
        tl.fromTo(
          `.cam-photo-${i}`,
          { xPercent: 0, yPercent: 0, scale: 0.4, opacity: 0, rotate: 0, filter: "blur(10px)" },
          {
            xPercent: o.x * 3.1,
            yPercent: o.y * 3.1,
            scale: 1,
            rotate: o.r,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1.1,
          },
          1.6 + i * 0.22,
        );
      });

      tl.to(".cam-body", { scale: 0.55, opacity: 0.12, filter: "blur(4px)", duration: 0.9 }, 2.9)
        .to(".cam-line-2", { opacity: 0, y: -40, duration: 0.5 }, 3.0)
        .to(".cam-photo", { scale: 1.35, duration: 1 }, 3.2);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-cream"
      aria-label="How we shoot"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
        <h2 className="relative text-[clamp(2rem,5.4vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          <span className="cam-line-1 block">We don't just shoot content.</span>
          <span className="cam-line-2 absolute inset-x-0 top-0 block opacity-0">
            We build worlds around brands.
          </span>
        </h2>
      </div>

      <div className="relative h-full w-full" style={{ perspective: "1400px" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="cam-body relative w-[64vw] max-w-[560px] opacity-0 md:w-[34vw]">
            <img
              src={camera}
              alt="Professional cinema camera"
              width={1280}
              height={1280}
              loading="lazy"
              className="w-full drop-shadow-[0_60px_80px_rgba(28,24,21,0.28)]"
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="cam-glint absolute inset-y-0 w-1/3 opacity-0"
                style={{
                  background:
                    "linear-gradient(100deg, transparent, rgba(255,255,255,.75), transparent)",
                }}
              />
            </div>
          </div>
        </div>

        {orbit.map((o, i) => (
          <figure
            key={o.label}
            className={`cam-photo cam-photo-${i} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 ${o.cls}`}
            style={{ zIndex: i === 4 ? 1 : 3 }}
          >
            <img
              src={o.src}
              alt={`${o.label} brand photography`}
              loading="lazy"
              className="h-full w-full rounded-[2px] object-cover shadow-[0_40px_70px_rgba(28,24,21,0.22)]"
            />
            <figcaption className="mt-2 label-xs text-ink/45">{o.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
