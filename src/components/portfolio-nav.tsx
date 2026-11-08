"use client";
import { useEffect, useState } from "react";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
import { getActiveSection } from "@/lib/active-section";
const links = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" },
];
export function PortfolioNav() {
  const [theme, setTheme] = useState("dark");
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const sections = links.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    let frame: number | null = null;
    function updateActiveSection() {
      frame = null;
      // Match the browser's anchor landing position, including responsive offsets.
      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      const next = getActiveSection(
        sections.map((section) => ({
          id: section.id,
          top:
            section.getBoundingClientRect().top -
            (parseFloat(getComputedStyle(section).scrollMarginTop) || 0),
        })),
        padding + 1,
      ); // Allow subpixel rounding at the end of smooth scrolling.
      if (next) setActive(next);
    }
    function scheduleUpdate() {
      if (frame === null) frame = requestAnimationFrame(updateActiveSection);
    }
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    // Expanded credentials/repositories can shift sections without a scroll event.
    const observer = new ResizeObserver(scheduleUpdate);
    sections.forEach((section) => observer.observe(section));
    scheduleUpdate();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a href="#inicio" className="brand" aria-label="Bastián Mejías, inicio">
          <span>~/</span> bastian<span className="brand-dot">.</span>
        </a>
        <nav aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? "active" : ""}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={
              theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="nav-cta" href="#contacto">
            Hablemos <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
