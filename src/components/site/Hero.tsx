import { useEffect, useRef, useState } from "react";
import camera from "@/assets/camera.png";
import reel1 from "@/assets/reel-1.jpg";
import mavme from "@/assets/work-mavme.jpg";
import { Diamond, Magnetic } from "./ui";

/** Floating object with depth-based mouse parallax. */
function Float({
  depth,
  className,
  children,
  delay,
}: {
  depth: number;
  className?: string;
  children: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${-nx * depth * 40}px`);
        el.style.setProperty("--py", `${-ny * depth * 32}px`);
        el.style.setProperty("--rz", `${nx * depth * 2.4}deg`);
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [depth]);

  return (
    <div
      ref={ref}
      className={`absolute ${className ?? ""}`}
      style={{
        animation: `heroIn 1400ms cubic-bezier(.16,1,.3,1) ${delay}ms both`,
      }}
    >
      <div
        style={{
          transform: "translate3d(var(--px, 0), var(--py, 0), 0) rotate(var(--rz, 0deg))",
          transition: "transform 700ms cubic-bezier(.16,1,.3,1)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  const line = (text: string, delay: number) => (
    <span className="mask-line">
      <span
        className="block"
        style={{
          transform: ready ? "translateY(0)" : "translateY(105%)",
          transition: `transform 1200ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        }}
      >
        {text}
      </span>
    </span>
  );

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-cream pt-28">
      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translate3d(0, 40px, 0) scale(.94); filter: blur(6px); }
          to { opacity: 1; transform: none; filter: none; }
        }
      `}</style>

      {/* hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(28,24,21,.06) 1px, transparent 1px)",
          backgroundSize: "12.5% 100%",
        }}
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-6 pb-24 md:px-12">
        <div className="col-span-12 pt-10 md:col-span-7 md:pt-24">
          <div
            className="label-xs mb-10 flex items-center gap-3 text-brown"
            style={{
              opacity: ready ? 1 : 0,
              transition: "opacity 900ms ease 200ms",
            }}
          >
            <Diamond className="size-1.5" />
            Bisaat Labs / Karachi
          </div>

          <h1 className="text-[clamp(2.9rem,7.4vw,7rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
            {line("We help brands", 250)}
            {line("show up better.", 380)}
          </h1>

          <p
            className="urdu mt-8 max-w-md text-2xl text-brown md:text-3xl"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(18px)",
              transition: "opacity 1000ms ease 700ms, transform 1000ms cubic-bezier(.16,1,.3,1) 700ms",
            }}
          >
            آپ کا برانڈ، آپ کی کہانی
          </p>

          <p
            className="mt-10 max-w-lg text-base leading-relaxed text-ink/70 md:text-lg"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(18px)",
              transition: "opacity 900ms ease 850ms, transform 900ms cubic-bezier(.16,1,.3,1) 850ms",
            }}
          >
            Content, social, websites and creative production — brought together under one roof.
          </p>

          <div
            className="mt-12 flex flex-wrap items-center gap-6"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(18px)",
              transition: "opacity 900ms ease 1000ms, transform 900ms cubic-bezier(.16,1,.3,1) 1000ms",
            }}
          >
            <Magnetic href="#contact">Start a Project ↗</Magnetic>
            <a
              href="#work"
              className="text-sm font-semibold text-ink underline decoration-brown/40 underline-offset-8 transition-colors hover:text-brown"
            >
              See Our Work
            </a>
          </div>
        </div>

        {/* Art-directed floating objects */}
        <div className="relative col-span-12 min-h-[46vh] md:col-span-5 md:min-h-[70vh]">
          <Float depth={1.5} delay={900} className="right-[4%] top-[6%] w-[46%] md:w-[74%]">
            <img
              src={camera}
              alt="Cinema camera"
              width={1280}
              height={1280}
              className="w-full drop-shadow-[0_40px_60px_rgba(28,24,21,0.22)]"
            />
          </Float>

          <Float depth={2.6} delay={1150} className="left-[2%] top-[38%] w-[30%] md:w-[36%]">
            <div className="overflow-hidden rounded-[2px] bg-paper p-2 shadow-[0_24px_50px_rgba(28,24,21,0.16)]">
              <img
                src={reel1}
                alt="Reel frame from a brand shoot"
                width={720}
                height={1280}
                loading="lazy"
                className="aspect-[9/16] w-full object-cover"
              />
            </div>
          </Float>

          <Float depth={0.9} delay={1300} className="bottom-[6%] right-[10%] w-[34%] md:w-[40%]">
            <img
              src={mavme}
              alt="Floral brand photograph"
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[2px] object-cover shadow-[0_30px_60px_rgba(28,24,21,0.18)]"
            />
          </Float>

          <Float depth={3.4} delay={1450} className="left-[24%] top-[10%]">
            <Diamond className="size-3" />
          </Float>
          <Float depth={4} delay={1550} className="bottom-[26%] left-[-2%]">
            <Diamond className="size-2 bg-teal" />
          </Float>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-6 label-xs text-ink/40 md:left-12">
        Scroll
      </div>
    </section>
  );
}
