import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Cursor } from "@/components/site/Cursor";
import { Hero } from "@/components/site/Hero";
import { CameraScene } from "@/components/site/CameraScene";
import { Work } from "@/components/site/Work";
import { Philosophy } from "@/components/site/Philosophy";
import { Reels } from "@/components/site/Reels";
import { Services } from "@/components/site/Services";
import { Podcast } from "@/components/site/Podcast";
import { ProcessAndFooter } from "@/components/site/ProcessAndFooter";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
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
        <Podcast />
        <ProcessAndFooter />
      </main>
    </>
  );
}
