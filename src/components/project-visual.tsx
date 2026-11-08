import {
  ArrowUpRight,
  FileText,
  Globe2,
  Network,
  Terminal,
} from "lucide-react";
/** Editorial diagrams, not screenshots of the products. */
export function ProjectVisual({ kind }: { kind: number }) {
  return (
    <div
      className={`project-visual visual-${kind}`}
      role="img"
      aria-label={
        kind === 0
          ? "Ilustración conceptual de comercio exterior"
          : kind === 1
            ? "Diagrama conceptual de un asistente RAG"
            : "Ilustración del portafolio en código"
      }
    >
      <div className="visual-grid" />
      {kind === 0 ? (
        <>
          <span className="visual-corner">MEJÍAS / COMERCIO EXTERIOR</span>
          <div className="trade-visual">
            <div className="trade-orbit" />
            <Globe2 size={150} strokeWidth={0.65} />
            <span className="trade-port port-one">
              VLP <span>↗</span>
            </span>
            <span className="trade-port port-two">
              SCL <span>↗</span>
            </span>
          </div>
          <div className="visual-bottom">
            <span>
              Conectando servicios.
              <br />
              <strong>Abriendo fronteras.</strong>
            </span>
            <ArrowUpRight size={30} strokeWidth={1} />
          </div>
        </>
      ) : kind === 1 ? (
        <>
          <span className="visual-corner">
            MARC–IA / CONOCIMIENTO CON CONTEXTO
          </span>
          <div className="rag-diagram">
            <span className="rag-node">
              <FileText size={22} />
              <small>Documentos</small>
            </span>
            <span className="diagram-line" />
            <span className="rag-core">
              <Network size={34} />
              <strong>RAG</strong>
            </span>
            <span className="diagram-line" />
            <span className="rag-node">
              <Terminal size={22} />
              <small>Respuestas</small>
            </span>
          </div>
          <div className="visual-bottom">
            <span>
              La información correcta.
              <br />
              <strong>En una conversación.</strong>
            </span>
            <span className="visual-mark">IA</span>
          </div>
        </>
      ) : (
        <>
          <span className="visual-corner">PORTFOLIO / DISEÑO + DESARROLLO</span>
          <div className="portfolio-preview">
            <div>
              <span className="syntax-purple">export default</span> function{" "}
              <span className="syntax-string">Portfolio</span>() {"{"}
            </div>
            <div className="code-indent">
              <span className="syntax-purple">return</span> (
            </div>
            <div className="code-indent preview-headline">
              &lt;Ideas /&gt;
              <br />
              <span>&lt;Código /&gt;</span>
            </div>
            <div className="code-indent">);</div>
            <div>{"}"}</div>
          </div>
          <div className="visual-bottom">
            <span>
              Un espacio propio.
              <br />
              <strong>Siempre en evolución.</strong>
            </span>
            <span className="visual-mark">~/</span>
          </div>
        </>
      )}
      <span className="concept-label">Ilustración conceptual</span>
    </div>
  );
}
