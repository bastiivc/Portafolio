import { FeaturedProject } from '@/types/portfolio';

export const featuredProjectsData: FeaturedProject[] = [
  {
    id: "proj-agencia-mejias",
    title: "Agencia de Aduanas Mejías",
    description: "Sitio web corporativo y plataforma de servicios aduaneros para la Agencia de Aduanas Mejías (Valparaíso y Santiago).",
    longDescription: "Desarrollo y mantención del sitio web oficial de la Agencia de Aduanas Mejías. Implementación de diseño responsivo moderno, visualización de indicadores económicos en tiempo real (UF, UTM, Dólar, Euro), arquitectura de información para servicios de importación/exportación, optimización SEO y formularios de contacto.",
    technologies: ["WordPress", "Elementor Pro", "PHP", "JavaScript", "CSS3", "SEO", "Responsive Design"],
    stars: 14,
    forks: 3,
    demoUrl: "https://agenciamejias.cl/",
    featured: true,
    category: "Producción Web"
  },
  {
    id: "proj-marc-ia",
    title: "MARC-IA Assistant",
    description: "Asistente inteligente con arquitectura RAG para orientación institucional y consultas documentales automatizadas.",
    longDescription: "Sistema impulsado por modelos de lenguaje e indexación vectorial (RAG) diseñado para asistir en consultas normativas y documentación con respuestas precisas basadas en contexto verificado.",
    technologies: ["Python", "RAG", "LLMs", "LangChain", "Vector DB", "FastAPI"],
    stars: 8,
    forks: 2,
    githubUrl: "https://github.com/bastiivc/MARC-IA-Project",
    featured: true,
    category: "Inteligencia Artificial"
  },
  {
    id: "proj-1",
    title: "Mi espacio en la web",
    description: "Diseño y desarrollo de este portafolio: una experiencia visual que conecta proyectos, trayectoria y aprendizaje.",
    longDescription: "El desafío: presentar proyectos y experiencia sin convertir la navegación en un currículum extenso. Mi aporte: diseño adaptable con desplazamiento natural, identidad oscura con detalles de terminal, catálogo de GitHub y credenciales organizadas por categoría.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
    stars: 18,
    forks: 5,
    githubUrl: "https://github.com/bastiivc/Portafolio",
    demoUrl: "https://bastiivc.vercel.app",
    featured: true,
    category: "Diseño & Desarrollo"
  }
];
