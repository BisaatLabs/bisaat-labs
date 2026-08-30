import { useEffect, useRef, useState } from "react";
import instantCamera from "@/assets/hero-instant-camera.webp";
import filmReel from "@/assets/hero-film-reel.webp";
import studioMic from "@/assets/hero-studio-mic.webp";
import { Diamond, Magnetic } from "./ui";

export function Hero() {
  const [ready, setReady] = useState(false);
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 80);
    const move = (event: PointerEvent) => {
      if (
        !visual.current ||
        matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches
      )
        return;
      visual.current.style.setProperty("--x", `${(event.clientX / innerWidth - 0.5) * 18}px`);
      visual.current.style.setProperty("--y", `${(event.clientY / innerHeight - 0.5) * 14}px`);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      clearTimeout(timer);
      removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section id="top" className={`hero-v3 ${ready ? "is-ready" : ""}`}>
      <div className="hero-v3-grid" aria-hidden />
      <div className="hero-v3-topline">
        <span>
          <Diamond className="size-1.5" /> Bisaat Labs / Karachi
        </span>
        <span className="hidden md:block">Rooted locally · Fluent globally</span>
      </div>

      <div className="hero-v3-layout">
        <div className="hero-v3-copy">
          <p className="hero-kicker">A space where brands come to life</p>
          <h1>
            <span>We help brands</span>
            <span>show up better.</span>
          </h1>
          <p className="hero-v3-description">
            Content, social, websites and creative production—brought together with one clear point
            of view.
          </p>
          <div className="hero-actions">
            <Magnetic href="#contact" className="hero-primary">
              Start a Project <span>↗</span>
            </Magnetic>
            <a href="#work" className="hero-secondary">
              See our work <span>↓</span>
            </a>
          </div>
        </div>

        <div ref={visual} className="hero-v3-visual" aria-label="Bisaat creative production">
          <img
            className="hero-object hero-object-camera"
            src={instantCamera}
            alt="Professional instant camera"
            fetchPriority="high"
            decoding="async"
          />
          <img
            className="hero-object hero-object-reel"
            src={filmReel}
            alt="Vintage film reel"
            decoding="async"
          />
          <img
            className="hero-object hero-object-mic"
            src={studioMic}
            alt="Professional studio microphone"
            decoding="async"
          />
        </div>
      </div>

      <div className="hero-marquee" aria-hidden>
        <div>
          BRAND SHOOTS <b>◆</b> SOCIAL <b>◆</b> REELS & VIDEO <b>◆</b> WEBSITES <b>◆</b> PODCASTS{" "}
          <b>◆</b> CREATIVE CAMPAIGNS <b>◆</b>
        </div>
        <div>
          BRAND SHOOTS <b>◆</b> SOCIAL <b>◆</b> REELS & VIDEO <b>◆</b> WEBSITES <b>◆</b> PODCASTS{" "}
          <b>◆</b> CREATIVE CAMPAIGNS <b>◆</b>
        </div>
      </div>
    </section>
  );
}
