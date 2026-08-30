import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import r1 from "@/assets/reel-1.webp";
import r2 from "@/assets/reel-2.webp";
import r3 from "@/assets/reel-3.webp";
import r4 from "@/assets/reel-4.webp";
import { SectionLabel } from "./ui";

const reels = [
  { src: r1, brand: "Mure" },
  { src: r2, brand: "Arooma" },
  { src: r3, brand: "Mavme" },
  { src: r4, brand: "Maryas Cafe" },
];

export function Reels() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".reel", { opacity: 1, xPercent: (i) => (i - 1.5) * 105, rotate: 0 });
        return;
      }
      const spread = window.innerWidth < 768 ? 58 : 105;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=220%", pin: true, scrub: 1 },
      });

      reels.forEach((_, i) => {
        tl.fromTo(
          `.reel-${i}`,
          { opacity: 0, yPercent: 22, rotate: (i - 1.5) * 5, scale: 0.92 },
          { opacity: 1, yPercent: 0, scale: 1, ease: "power2.out", duration: 0.6 },
          i * 0.4,
        );
      });

      tl.to(".reel", {
        xPercent: (i: number) => (i - 1.5) * spread,
        rotate: 0,
        ease: "power2.inOut",
        duration: 1.4,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] flex-col justify-center overflow-hidden bg-cream px-6 md:px-12"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <SectionLabel className="mb-6">Social & Reels</SectionLabel>
        <h2 className="max-w-xl text-[clamp(2rem,4.6vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.035em]">
          Made to stop the scroll.
        </h2>
      </div>

      <div className="relative mt-14 flex h-[46vh] items-center justify-center md:h-[52vh]">
        {reels.map((r, i) => (
          <div
            key={r.brand}
            className={`reel reel-${i} absolute w-[42vw] max-w-[260px] opacity-0 md:w-[15vw]`}
            data-cursor="PLAY"
            style={{ zIndex: 10 - i }}
          >
            <img
              src={r.src}
              alt={`${r.brand} vertical reel frame`}
              loading="lazy"
              className="aspect-[9/16] w-full rounded-[3px] object-cover shadow-[0_36px_70px_rgba(28,24,21,0.24)] transition-transform duration-700 hover:scale-[1.03]"
            />
            <p className="mt-3 label-xs text-ink/45">{r.brand}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
