import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

// Hash links always target the homepage sections. From any other route this
// still works: the browser navigates to "/" and then jumps/smooth-scrolls to
// the section once it mounts (Lenis handles the smooth part via `anchors`).
const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/#studio" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Off the homepage there's nothing to scroll to yet, so keep the bar solid
  // for legibility instead of floating transparent over page content.
  const isHome = pathname === "/";
  const showSolid = solid || !isHome;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: showSolid ? "rgba(243,230,215,0.82)" : "transparent",
        backdropFilter: showSolid ? "blur(14px)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" hash="top" className="flex items-center gap-3" aria-label="Bisaat Labs home">
          <img
            src="/bisaat-logo-transparent.webp"
            alt="Bisaat Labs"
            width={140}
            height={140}
            className="h-12 w-24 object-contain md:h-14 md:w-28"
          />
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="label-xs text-ink/70 transition-colors hover:text-brown"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/influencers"
                className="label-xs text-ink/70 transition-colors hover:text-brown data-[status=active]:text-brown"
              >
                Influencers
              </Link>
            </li>
          </ul>
          <a
            href="/#contact"
            className="label-xs rounded-full border border-ink/20 px-5 py-2.5 text-ink transition-colors duration-300 hover:border-brown hover:text-brown"
          >
            Start a Project ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
