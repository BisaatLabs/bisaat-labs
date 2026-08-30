import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function Diamond({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2 rotate-45 bg-brown", className)} />;
}

/** Fade / mask reveal driven by IntersectionObserver (cheap, no scroll listeners). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 900ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 1100ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

/** Magnetic CTA: subtly attracts the cursor. Desktop only. */
export function Magnetic({
  children,
  className,
  href = "#contact",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-[color:var(--paper)]",
        "transition-[background-color,transform] duration-500 ease-out hover:bg-brown",
        className,
      )}
      style={{
        transition: "transform 600ms cubic-bezier(.16,1,.3,1), background-color 400ms ease",
      }}
    >
      {children}
    </a>
  );
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-muted-foreground label-xs", className)}>
      <Diamond className="size-1.5" />
      {children}
    </div>
  );
}
