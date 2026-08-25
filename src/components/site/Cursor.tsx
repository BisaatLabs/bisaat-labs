import { useEffect, useRef, useState } from "react";

/** Minimal desktop cursor. Reads data-cursor="VIEW | PLAY | dot" from hovered elements. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t ? t.dataset.cursor || null : null);
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    >
      <div
        className="flex items-center justify-center rounded-full border border-ink/25 bg-brown/95 text-[10px] font-semibold tracking-[0.18em] text-[color:var(--paper)] transition-all duration-300 ease-out"
        style={{
          width: label ? 76 : 12,
          height: label ? 76 : 12,
          opacity: label ? 1 : 0.7,
        }}
      >
        {label && label !== "dot" ? label : ""}
      </div>
    </div>
  );
}
