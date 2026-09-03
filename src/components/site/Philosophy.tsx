import { useEffect, useRef } from "react";
import { Reveal } from "./ui";

export function Philosophy() {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          el.style.transition = "stroke-dashoffset 2600ms cubic-bezier(.22,1,.36,1)";
          el.style.strokeDashoffset = "0";
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="site-section relative overflow-hidden bg-paper px-6 md:px-12">
      <svg
        aria-hidden
        viewBox="0 0 1200 400"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
      >
        <path
          ref={path}
          d="M-20 320 C 240 320, 300 90, 560 120 S 900 330, 1240 150"
          fill="none"
          stroke="var(--brown)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="urdu text-4xl text-brown md:text-6xl">بِساط</p>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-12 text-[clamp(2.2rem,5.6vw,5rem)] font-extrabold leading-[1] tracking-[-0.035em]">
            A little more space
            <br />
            for better ideas.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
