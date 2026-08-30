import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Cursor } from "@/components/site/Cursor";
import { InfluencersPage } from "@/components/influencers/InfluencersPage";

export const Route = createFileRoute("/influencers")({
  head: () => ({
    meta: [
      { title: "Influencers — Bisaat Labs" },
      {
        name: "description",
        content:
          "The creators and influencers Bisaat Labs partners with for reels, campaigns and brand content.",
      },
    ],
  }),
  component: Influencers,
});

function Influencers() {
  return (
    <>
      <Cursor />
      <Nav />
      <InfluencersPage />
    </>
  );
}
