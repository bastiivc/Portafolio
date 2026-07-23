import { EducationItem } from '@/types/portfolio';

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    institution: "Universidad Tecnológica / Instituto Profesional",
    degree: "Ingeniería en Informática / Ciencia de la Computación",
    fieldOfStudy: "Desarrollo de Software y Arquitectura de Sistemas",
    startDate: "2020",
    endDate: "2024",
    location: "Chile",
    description: "Formación especializada en ingeniería de software, estructuras de datos, algoritmos, bases de datos relacionales y no relacionales, desarrollo web fullstack y metodologías ágiles.",
    achievements: [
      "Proyecto de título enfocado en arquitecturas basadas en microservicios y Next.js.",
      "Participante activo en talleres de desarrollo colaborativo y hackathons."
    ]
  },
  {
    id: "edu-2",
    institution: "Cursos Especializados & Bootcamps",
    degree: "Especialización Fullstack & Cloud Architecture",
    fieldOfStudy: "Desarrollo Frontend Avanzado & Backend Serverless",
    startDate: "2023",
    endDate: "Presente",
    description: "Capacitación continua en Next.js 14/15, Tailwind CSS, TypeScript avanzadas, patrones de diseño de software y despliegue continuo en Vercel & AWS."
  }
];
