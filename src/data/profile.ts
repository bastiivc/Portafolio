import { ProfileData } from '@/types/portfolio';

export const profileData: ProfileData = {
  name: "Bastián VC",
  role: "Fullstack Developer & Software Engineer",
  tagline: "Construyendo soluciones web modernas, escalables y con alto impacto visual.",
  bio: [
    "¡Hola! Soy un Desarrollador Fullstack apasionado por la creación de aplicaciones web innovadoras, fluidas y de alto rendimiento.",
    "Mi enfoque se centra en combinar arquitectura limpia y escalable con experiencias de usuario excepcionales (UI/UX), inspiradas en la elegancia y simplicidad del diseño escandinavo y de Apple.",
    "Constantemente aprendiendo y explorando nuevas tecnologías en el ecosistema JavaScript/TypeScript, React, Next.js, Node.js y Cloud."
  ],
  location: "Santiago, Chile",
  status: "🟢 Disponible para nuevos proyectos",
  githubUsername: "bastiivc",
  socials: {
    github: "https://github.com/bastiivc",
    linkedin: "https://linkedin.com/in/bastiivc",
    email: "bastian@example.com",
    twitter: "https://x.com/bastiivc"
  },
  skills: [
    {
      category: "Frontend",
      items: ["TypeScript", "JavaScript (ES6+)", "React.js", "Next.js (App Router)", "Tailwind CSS", "Framer Motion", "HTML5/CSS3", "Redux Toolkit / Zustand"]
    },
    {
      category: "Backend & DB",
      items: ["Node.js", "Express", "Next.js API Routes", "RESTful APIs", "PostgreSQL", "MongoDB", "Prisma ORM", "Supabase"]
    },
    {
      category: "Herramientas & Cloud",
      items: ["Git & GitHub", "Vercel", "Docker", "Jest / Vitest", "CI/CD Workflows", "Figma", "VS Code", "Postman"]
    }
  ]
};
