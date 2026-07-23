import { FeaturedProject } from '@/types/portfolio';

export const featuredProjectsData: FeaturedProject[] = [
  {
    id: "proj-1",
    title: "Apple Glass OS Portfolio",
    description: "Portafolio interactivo fullstack inspirado en la estética glassmorfista de macOS y Apple Vision, construido con Next.js y Tailwind CSS.",
    longDescription: "Un sistema de portafolio ultra fluido con soporte de ventanas interactivas, modo oscuro/claro, consulta en tiempo real de la API de GitHub, y arquitectura de contenido modular fácil de mantener.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
    stars: 18,
    forks: 5,
    githubUrl: "https://github.com/bastiivc/apple-glass-portfolio",
    demoUrl: "https://bastiivc.vercel.app",
    featured: true,
    category: "Fullstack"
  },
  {
    id: "proj-2",
    title: "SaaS Dashboard Architecture",
    description: "Plataforma de métricas e inteligencia en tiempo real con widgets personalizables, gráficos analíticos y gestión de usuarios.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Node.js"],
    stars: 32,
    forks: 9,
    githubUrl: "https://github.com/bastiivc/saas-dashboard-pro",
    demoUrl: "https://saas-dashboard-demo.vercel.app",
    featured: true,
    category: "Web App"
  },
  {
    id: "proj-3",
    title: "E-Commerce Headless Storefront",
    description: "Tienda en línea de ultra alta velocidad con micro-animaciones, carrito de compras persistente e integración con Stripe.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    stars: 24,
    forks: 7,
    githubUrl: "https://github.com/bastiivc/ecommerce-headless-next",
    demoUrl: "https://storefront-demo.vercel.app",
    featured: true,
    category: "Fullstack"
  }
];
