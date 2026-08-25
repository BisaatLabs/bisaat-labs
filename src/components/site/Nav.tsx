import { useEffect, useState } from "react";
import logo from "@/assets/bisaat-logo.png.asset.json";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: solid ? "rgba(243,230,215,0.82)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="flex items-center gap-3" aria-label="Bisaat Labs home">
          <img
            src={logo.url}
            alt="Bisaat Labs"
            width={140}
            height={140}
            className="h-11 w-auto mix-blend-multiply"
          />
        </a>
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
          </ul>
          <a
            href="#contact"
            className="label-xs rounded-full border border-ink/20 px-5 py-2.5 text-ink transition-colors duration-300 hover:border-brown hover:text-brown"
          >
            Start a Project ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
