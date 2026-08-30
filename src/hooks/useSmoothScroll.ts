import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Mounts one Lenis instance for the whole app and drives it off gsap's own
 * ticker instead of a second requestAnimationFrame loop. This keeps Lenis and
 * ScrollTrigger (used for the pinned/scrubbed sections) perfectly in sync and
 * avoids the extra rAF callback + layout thrash of running two independent
 * update loops. Respects prefers-reduced-motion and cleans up on unmount.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      // gsap ticker time is in seconds, lenis expects milliseconds
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}
