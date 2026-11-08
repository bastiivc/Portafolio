import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  MapPin,
  Terminal,
  Cloud,
  Database,
  Sparkles,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import { PortfolioNav } from "@/components/portfolio-nav";
import { ProjectVisual } from "@/components/project-visual";
import { GitHubProjectsSection } from "@/components/sections/github-projects-section";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { ContactSection } from "@/components/sections/contact-section";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { featuredProjectsData } from "@/data/projects";

function SectionHeading({
  index,
  path,
  title,
  description,
}: {
  index: string;
  path: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span>{index}</span> ~/ {path}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <PortfolioNav />
      <main id="contenido" className="portfolio-shell">
        <section
          id="inicio"
          className="hero section-anchor"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <a href="#contacto" className="availability">
              <span /> Disponible para trabajar <ArrowUpRight size={13} />
            </a>
            <p className="hero-intro">
              Hola, soy Bastián Mejías <span className="wave">✳</span>
            </p>
            <h1 id="hero-title">
              Ideas en código.
              <br />
              <span>Soluciones reales.</span>
            </h1>
            <p className="hero-description">
              Desarrollo experiencias web y soluciones con IA. Estudiante de
              Ingeniería en Informática en la PUCV, con experiencia en
              desarrollo web e infraestructura TI.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#proyectos">
                Explorar proyectos <ArrowRight size={17} />
              </a>
              <a className="button button-secondary" href="#contacto">
                Conversemos <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-location">
              <MapPin size={14} /> Valparaíso / Quilpué, Chile{" "}
              <span className="location-divider" />
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Bastián"
              >
                <Github className="size-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="terminal-window">
              <div className="terminal-bar">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>bastian — portfolio.ts</span>
                <Terminal size={13} />
              </div>
              <div className="terminal-body">
                <p className="terminal-comment">
                  // Curiosidad convertida en soluciones.
                </p>
                <p>
                  <span className="syntax-purple">const</span> developer{" "}
                  <span className="syntax-purple">=</span> {"{"}
                </p>
                <div className="code-indent">
                  <p>
                    name:{" "}
                    <span className="syntax-string">'Bastián Mejías'</span>,
                  </p>
                  <p>
                    focus: [<span className="syntax-string">'Web'</span>,{" "}
                    <span className="syntax-string">'IA'</span>],
                  </p>
                  <p>stack: [</p>
                  <div className="code-indent">
                    <p>
                      <span className="syntax-string">'Next.js'</span>,{" "}
                      <span className="syntax-string">'TypeScript'</span>,
                    </p>
                    <p>
                      <span className="syntax-string">'Python'</span>,{" "}
                      <span className="syntax-string">'AWS'</span>
                    </p>
                  </div>
                  <p>],</p>
                  <p>
                    mindset:{" "}
                    <span className="syntax-string">'Siempre aprendiendo'</span>
                  </p>
                </div>
                <p>{"};"}</p>
                <div className="terminal-output">
                  <p>
                    <span>❯</span> npm run create-impact
                  </p>
                  <p className="terminal-comment">
                    Listo para el próximo desafío
                    <span className="cursor" />
                  </p>
                </div>
              </div>
            </div>
            <div className="art-caption">
              <span className="status-dot" /> Aprender. Construir. Iterar.
            </div>
          </div>
          <div className="hero-bottom">
            <span className="eyebrow">
              DESARROLLO WEB · INTELIGENCIA ARTIFICIAL · CLOUD
            </span>
            <a href="#proyectos">
              Conoce mi trabajo <ArrowDown size={14} />
            </a>
          </div>
        </section>
        <section id="proyectos" className="content-section section-anchor">
          <div className="heading-row">
            <SectionHeading
              index="01"
              path="proyectos"
              title="Menos teoría. Más construir."
              description="Una selección de proyectos donde el código se convierte en algo útil."
            />
            <a
              className="text-link desktop-link"
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mi GitHub <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="featured-projects">
            {featuredProjectsData.map((project, index) => (
              <article
                className={`project-card project-${index}`}
                key={project.id}
              >
                <ProjectVisual kind={index} />
                <div className="project-copy">
                  <div className="project-meta">
                    <span className="eyebrow">
                      {String(index + 1).padStart(2, "0")} / {project.category}
                    </span>
                    {index === 0 && (
                      <span className="live-label">
                        <span /> En producción
                      </span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visitar sitio <ArrowUpRight size={16} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="size-4" /> Ver código{" "}
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                  <details className="project-case">
                    <summary>
                      Problema y aporte <ArrowDown size={14} />
                    </summary>
                    <p>{project.longDescription}</p>
                  </details>
                </div>
              </article>
            ))}
          </div>
          <details className="catalog-disclosure">
            <summary>
              <span>
                <Github className="size-5" /> Más código, más experimentos
              </span>
              <span className="summary-action">
                Explorar repositorios <ArrowDown size={15} />
              </span>
            </summary>
            <div className="disclosure-content">
              <GitHubProjectsSection />
            </div>
          </details>
        </section>
        <section
          id="experiencia"
          className="content-section section-anchor experience-section"
        >
          <div>
            <SectionHeading
              index="02"
              path="experiencia"
              title="Tecnología con los pies en la tierra."
              description="Desde una web en producción hasta la infraestructura que hace posible el trabajo diario."
            />
            <div className="about-note">
              <Terminal size={17} />
              <p>
                Me interesa entender el problema, construir una solución y
                seguir mejorándola. Actualmente curso el 8.º semestre en la
                PUCV, con egreso previsto para diciembre de 2026.
              </p>
            </div>
          </div>
          <div className="experience-timeline">
            {experienceData.slice(0, 2).map((exp) => (
              <article key={exp.id} className="experience-item">
                <span
                  className={`timeline-dot ${exp.current ? "current" : ""}`}
                />
                <p className="eyebrow">
                  {exp.startDate} — {exp.endDate}
                </p>
                <h3>{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-description">{exp.description}</p>
                <ul>
                  {exp.highlights.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="tag-list">
                  {exp.techStack.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <details className="project-case">
                  <summary>
                    Más sobre mi aporte <ArrowDown size={14} />
                  </summary>
                  <ul>
                    {exp.highlights.slice(2).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="tag-list">
                    {exp.techStack.slice(4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </details>
              </article>
            ))}
            <details className="earlier-experience">
              <summary>
                Otras experiencias y liderazgo <ArrowDown size={14} />
              </summary>
              {experienceData.slice(2).map((exp) => (
                <article key={exp.id}>
                  <p className="eyebrow">
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <h3>
                    {exp.role} · {exp.company}
                  </h3>
                  <p>{exp.description}</p>
                </article>
              ))}
            </details>
          </div>
        </section>
        <section className="content-section stack-section">
          <SectionHeading
            index="03"
            path="herramientas"
            title="Mi caja de herramientas."
            description="Las tecnologías que conectan mis ideas con su implementación."
          />
          <div className="stack-grid">
            {[
              {
                icon: Code2,
                title: "Desarrollo web",
                text: "Interfaces cuidadas y aplicaciones funcionales.",
                items: ["Next.js", "React", "TypeScript", "JavaScript", "PHP"],
              },
              {
                icon: Sparkles,
                title: "IA & software",
                text: "Explorando nuevas formas de resolver problemas.",
                items: ["Python", "Java", "RAG", "LLMs"],
              },
              {
                icon: Cloud,
                title: "Cloud & infraestructura",
                text: "La base que sostiene cada solución.",
                items: [
                  "AWS",
                  "Windows Server",
                  "Active Directory",
                  "Redes Cisco",
                ],
              },
              {
                icon: Database,
                title: "Datos & herramientas",
                text: "Estructura, colaboración y mejora continua.",
                items: ["PostgreSQL", "Oracle", "Git & GitHub", "PowerShell"],
              },
            ].map(({ icon: Icon, title, text, items }) => (
              <article key={title} className="stack-card">
                <Icon size={23} />
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="tag-list">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="formacion" className="content-section section-anchor">
          <SectionHeading
            index="04"
            path="formacion"
            title="La curiosidad sigue en marcha."
            description="Formación académica, cursos y credenciales de mi recorrido."
          />
          <CertificatesSection />
        </section>
        <section
          id="contacto"
          className="content-section section-anchor contact-section"
        >
          <div className="contact-intro">
            <p className="eyebrow">
              <span>05</span> ~/ contacto
            </p>
            <h2>
              El próximo proyecto
              <br />
              puede empezar <span>aquí.</span>
            </h2>
            <p>
              ¿Una idea, una oportunidad o un desafío técnico? Me encantará
              conocerlo.
            </p>
            <a
              className="contact-email"
              href={`mailto:${profileData.socials.email}`}
            >
              {profileData.socials.email} <ArrowUpRight size={19} />
            </a>
          </div>
          <ContactSection />
        </section>
      </main>
      <footer className="site-footer portfolio-shell">
        <a href="#inicio" className="brand">
          <span>~/</span> bastian<span className="brand-dot">.</span>
        </a>
        <p>Hecho con curiosidad, código y café.</p>
        <a href="#inicio">
          Volver al inicio <ArrowUpRight size={15} />
        </a>
      </footer>
    </>
  );
}
