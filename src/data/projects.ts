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
    githubUrl: "https://github.com/bastiivc",
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
    title: "Apple Glass OS Portfolio",
    description: "Portafolio interactivo fullstack inspirado en la estética glassmorfista de macOS y Apple Vision, construido con Next.js y Tailwind CSS.",
    longDescription: "Un sistema de portafolio ultra fluido con soporte de ventanas interactivas, modo oscuro/claro, consulta en tiempo real de la API de GitHub, y arquitectura de contenido modular fácil de mantener.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
    stars: 18,
    forks: 5,
    githubUrl: "https://github.com/bastiivc/Portafolio",
    demoUrl: "https://bastiivc.vercel.app",
    featured: true,
    category: "Fullstack"
  }
];
