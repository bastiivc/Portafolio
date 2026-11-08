"use client";
import { useEffect, useState } from "react";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    links.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
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
