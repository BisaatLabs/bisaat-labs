import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/#studio" },
] as const;

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const showSolid = solid || pathname !== "/" || menuOpen;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-nav ${showSolid ? "is-solid" : ""} ${menuOpen ? "is-open" : ""}`}>
      <nav className="site-nav-shell" aria-label="Main navigation">
        <Link
          to="/"
          hash="top"
          className="site-nav-logo"
          aria-label="Bisaat Labs home"
          onClick={closeMenu}
        >
          <img src="/bisaat-logo-transparent.webp" alt="" width={500} height={333} />
        </Link>

        <ul className="site-nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <Link to="/influencers" activeProps={{ "aria-current": "page" }}>
              Influencers
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </nav>

      <div id="mobile-navigation" className="site-nav-mobile" aria-hidden={!menuOpen}>
        <div className="site-nav-mobile-inner">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              <strong>{link.label}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
          <Link to="/influencers" onClick={closeMenu}>
            <strong>Influencers</strong>
            <i aria-hidden="true">↗</i>
          </Link>
        </div>
      </div>
    </header>
  );
}
