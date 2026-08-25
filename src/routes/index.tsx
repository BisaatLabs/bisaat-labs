import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "@/components/site/Nav";
import { Cursor } from "@/components/site/Cursor";
import { Hero } from "@/components/site/Hero";
import { CameraScene } from "@/components/site/CameraScene";
import { Work } from "@/components/site/Work";
import { Philosophy } from "@/components/site/Philosophy";
import { Reels } from "@/components/site/Reels";
import { Services } from "@/components/site/Services";
import { DigitalExperience } from "@/components/site/DigitalExperience";
import { Podcast } from "@/components/site/Podcast";
import { ProcessAndFooter } from "@/components/site/ProcessAndFooter";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <CameraScene />
        <Work />
        <Philosophy />
        <Reels />
        <Services />
        <DigitalExperience />
        <Podcast />
        <ProcessAndFooter />
      </main>
    </>
  );
}
