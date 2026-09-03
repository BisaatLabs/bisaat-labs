import servicesVisual from "@/assets/services-under-one-roof.webp";
import { Reveal, SectionLabel } from "./ui";

export function Services() {
  return (
    <section id="services" className="site-section services-section bg-paper px-6 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="services-layout">
          <div className="services-copy">
            <Reveal>
              <SectionLabel>Everything under one umbrella</SectionLabel>
            </Reveal>
            <Reveal>
              <h2 className="section-title mt-7">
                You bring the ambition.
                <br />
                <span>We handle everything.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="services-intro">
                One creative partner from the first idea to the final launch—so every part of your
                brand feels considered, connected and unmistakably yours.
              </p>
            </Reveal>
          </div>

          <Reveal className="services-visual-wrap">
            <div className="services-visual" aria-label="Bisaat Labs services under one roof">
              <img
                src={servicesVisual}
                alt="A creative director working beneath an umbrella, surrounded by Bisaat Labs services"
                width={1448}
                height={1086}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
