"use client";
import { useState } from "react";
import { GraduationCap, Award, ArrowUpRight, Check, Copy } from "lucide-react";
import { educationData } from "@/data/education";
import { certificatesData } from "@/data/certificates";

const categories = [
  "Todos",
  ...new Set(certificatesData.map((item) => item.category)),
];
export function CertificatesSection() {
  const [category, setCategory] = useState("Todos");
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState("");
  const education = educationData[0];
  const filtered = certificatesData.filter(
    (item) => category === "Todos" || item.category === category,
  );
  async function copy(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(id);
      setCopyError("");
    } catch {
      setCopyError("No se pudo copiar. Puedes seleccionar el ID directamente.");
    }
  }
  return (
    <div>
      <article className="education-main">
        <div>
          <p className="eyebrow">
            {education.startDate} — {education.endDate} / {education.location}
          </p>
          <h3>{education.degree}</h3>
          <p>{education.institution}</p>
          <p>{education.fieldOfStudy}</p>
          <details className="education-previous">
            <summary>Ver formación y asignaturas</summary>
            <p>{education.description}</p>
            {education.achievements?.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </details>
        </div>
        <GraduationCap size={38} strokeWidth={1} />
      </article>
      <details className="education-previous">
        <summary>Formación anterior</summary>
        {educationData.slice(1).map((item) => (
          <p key={item.id}>
            {item.degree} · {item.institution}
            <br />
            {item.startDate} — {item.endDate}
            <br />
            {item.description}
          </p>
        ))}
      </details>
      <div className="credentials-header">
        <h3>Certificaciones & aprendizaje continuo</h3>
        <span>{certificatesData.length} cursos y credenciales</span>
      </div>
      <div className="filter-list" aria-label="Filtrar certificaciones">
        {categories.map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} credenciales mostradas
      </p>
      {copyError && (
        <p className="catalog-message" role="status">
          {copyError}
        </p>
      )}
      <div className="credential-grid">
        {filtered.map((cert) => (
          <details className="credential" key={cert.id}>
            <summary>
              <Award size={19} strokeWidth={1.5} />
              <span>
                <h4>{cert.title}</h4>
                <small>{cert.issuer}</small>
                <small>{cert.issueDate}</small>
              </span>
              <span className="credential-count">+</span>
            </summary>
            <div className="credential-body">
              <div className="tag-list">
                {cert.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver credencial <ArrowUpRight size={14} />
                </a>
              )}
              {cert.credentialId && (
                <>
                  <p>ID: {cert.credentialId}</p>
                  <button
                    className="small-button"
                    onClick={() => copy(cert.credentialId!)}
                  >
                    {copied === cert.credentialId ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copied === cert.credentialId ? "ID copiado" : "Copiar ID"}
                  </button>
                </>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
