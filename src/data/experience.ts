import { ExperienceItem } from '@/types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Fullstack Developer",
    company: "Tech Innovation Lab / Freelance",
    location: "Santiago, Chile (Remoto)",
    startDate: "2023",
    endDate: "Presente",
    current: true,
    description: "Liderazgo en el diseño y desarrollo de aplicaciones web de alto rendimiento orientadas a productos SaaS y plataformas interactivas.",
    highlights: [
      "Implementación de arquitecturas modernas utilizando Next.js App Router, TypeScript y Tailwind CSS.",
      "Optimización del rendimiento web logrando puntuaciones de 95+ en Google Lighthouse (Core Web Vitals).",
      "Integración de APIs de terceros, pasarelas de pago y autenticación segura con Supabase/NextAuth."
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"]
  },
  {
    id: "exp-2",
    role: "Frontend Developer",
    company: "Digital Studio & Solutions",
    location: "Chile",
    startDate: "2022",
    endDate: "2023",
    current: false,
    description: "Desarrollo de interfaces de usuario interactivas, responsivas y accesibles para clientes del sector retail y tecnológico.",
    highlights: [
      "Creación de bibliotecas de componentes UI reutilizables con animación mediante Framer Motion.",
      "Migración de plataformas legadas a tecnologías modernas basadas en React y TypeScript.",
      "Colaboración estrecha con equipos de diseño UI/UX en Figma."
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "REST APIs", "Git"]
  }
];
