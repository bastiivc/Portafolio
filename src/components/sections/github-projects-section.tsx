"use client";
import { useEffect, useState } from "react";
import { Search, RefreshCw, ArrowUpRight } from "lucide-react";
import { GitHubRepo } from "@/types/portfolio";

export function GitHubProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("Todos");
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/github", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("No disponible");
        const data = await response.json();
        if (!Array.isArray(data.repos)) throw new Error("Respuesta no válida");
        setRepos(
          data.repos.filter((repo: GitHubRepo) => !repo.isLiveProduction),
        );
        if (data.isFallback)
          setError(
            "Mostrando una selección guardada. Puedes consultar todos los repositorios en GitHub.",
          );
      } catch {
        if (!controller.signal.aborted)
          setError(
            "No se pudo actualizar el catálogo. Los proyectos destacados siguen disponibles arriba.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [version]);
  const languages = [
    "Todos",
    ...new Set(repos.flatMap((repo) => (repo.language ? [repo.language] : []))),
  ];
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = repos.filter(
    (repo) =>
      (language === "Todos" || language === repo.language) &&
      [repo.name, repo.description, repo.language, ...(repo.topics || [])].some(
        (value) => value?.toLowerCase().includes(normalizedQuery),
      ),
  );
  function refresh() {
    setLoading(true);
    setError("");
    setVersion((value) => value + 1);
  }
  return (
    <div aria-busy={loading}>
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={16} />
          <span className="sr-only">Buscar repositorios</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar proyecto o tecnología…"
          />
        </label>
        <button className="small-button" onClick={refresh} disabled={loading}>
          <RefreshCw size={13} /> Actualizar
        </button>
      </div>
      <div
        className="filter-list"
        aria-label="Filtrar repositorios por lenguaje"
      >
        {languages.map((item) => (
          <button
            key={item}
            aria-pressed={language === item}
            onClick={() => setLanguage(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {error && (
        <p className="catalog-message" role="status">
          {error}{" "}
          <a
            className="text-link"
            href="https://github.com/bastiivc?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir GitHub <ArrowUpRight size={14} />
          </a>
        </p>
      )}
      {loading ? (
        <div
          className="repo-grid"
          role="status"
          aria-label="Cargando repositorios"
        >
          {[1, 2, 3, 4].map((item) => (
            <div className="repo-skeleton" key={item} />
          ))}
        </div>
      ) : filtered.length ? (
        <div className="repo-grid">
          {filtered.map((repo) => (
            <a
              key={repo.id}
              className="repo-card"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>
                {repo.name}
                <ArrowUpRight size={15} />
              </h4>
              <p>
                {repo.description ||
                  "Explora el código, la documentación y los detalles del proyecto en GitHub."}
              </p>
              <small>{repo.language || "Código abierto"}</small>
            </a>
          ))}
        </div>
      ) : (
        <p role="status" className="catalog-message">
          {error
            ? "El catálogo no está disponible en este momento."
            : "No hay proyectos que coincidan con tu búsqueda."}
        </p>
      )}
    </div>
  );
}
