import { ExperienceItem } from '@/types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-agencia-mejias",
    role: "Desarrollador Web & Consultor TI",
    company: "Agencia de Aduanas Mejías",
    location: "Valparaíso / Santiago, Chile",
    startDate: "Abr 2021",
    endDate: "Actualidad",
    current: true,
    description: "Desarrollo, modernización continua y mantención de la plataforma web oficial (agenciamejias.cl), junto con el soporte tecnológico para operaciones de comercio exterior.",
    highlights: [
      "Diseño y desarrollo del sitio web corporativo oficial para casa matriz en Valparaíso y sucursal en Santiago.",
      "Integración de módulos dinámicos de consulta y despliegue de indicadores económicos (UF, UTM, Dólar Aduanero, Euro).",
      "Optimización de arquitectura de información para servicios de importación, exportación, regímenes especiales y tramitación aduanera.",
      "Mejora continua en posicionamiento SEO, rendimiento técnico, diseño responsivo y canales de contacto digital."
    ],
    techStack: ["WordPress", "Elementor Pro", "PHP", "JavaScript", "CSS3", "SEO", "Soporte TI"]
  },
  {
    id: "exp-1",
    role: "Práctica Profesional — Desarrollo & Infraestructura TI",
    company: "Watt’s S.A",
    location: "San Bernardo, Región Metropolitana (Híbrido)",
    startDate: "Dic 2024",
    endDate: "Mar 2025",
    current: false,
    description: "Desarrollo de un sistema interno para el control y asignación de activos informáticos de la empresa Watt's S.A. y administración de infraestructura corporativa.",
    highlights: [
      "Desarrollo de plataforma web interna para control, seguimiento y asignación de activos informáticos corporativos utilizando Next.js, React.js y PostgreSQL bajo metodologías ágiles.",
      "Administración de usuarios y reglas de dominio en entornos corporativos con Windows Server (Active Directory), conectividad IPv4 y gestión de identidades en SAP.",
      "Diseño e implementación de un procedimiento técnico de preparación masiva de equipos sin software de terceros, optimizando tiempos de producción y reduciendo vulnerabilidades críticas.",
      "Modelado de bases de datos utilizando Oracle 10g y ERD Plus, junto con el levantamiento de flujos de procesos en Visio y ejecución de tareas avanzadas en PowerShell/CMD."
    ],
    techStack: ["Next.js", "React.js", "PostgreSQL", "Windows Server", "Active Directory", "Oracle 10g", "SAP", "PowerShell", "Metodologías Ágiles"]
  },
  {
    id: "exp-2",
    role: "Reponedor de Productos",
    company: "Fides Cygnus - Watt's",
    location: "Chile",
    startDate: "Dic 2023",
    endDate: "Feb 2024",
    current: false,
    description: "Reposición de mercadería en importantes cadenas de supermercados, asegurando la correcta exhibición y disponibilidad de productos.",
    highlights: [
      "Gestión de stock en punto de venta y control de inventarios.",
      "Atención y colaboración con supervisores y personal de logística en sala."
    ],
    techStack: ["Gestión de Inventarios", "Logística", "Atención al Cliente"]
  },
  {
    id: "exp-3",
    role: "Ayudante de Peoneta",
    company: "Evercrisp",
    location: "Chile",
    startDate: "Ene 2021",
    endDate: "Feb 2021",
    current: false,
    description: "Participación en la logística de carga y descarga de camiones, entrega de mercancía y atención directa al cliente.",
    highlights: [
      "Cumplimiento eficiente de rutas de distribución y apoyo logístico.",
      "Atención directa y cordial con clientes en ruta."
    ],
    techStack: ["Logística", "Distribución", "Trabajo en Equipo"]
  },
  {
    id: "exp-4",
    role: "Guía de Patrulla",
    company: "Grupo Scout / Organización sin fines de lucro",
    location: "Chile",
    startDate: "Mar 2017",
    endDate: "Jun 2019",
    current: false,
    description: "Liderazgo de equipo y desarrollo de actividades comunitarias y de recaudación de fondos.",
    highlights: [
      "Desarrollo de habilidades de liderazgo, sociabilidad y servicio al cliente.",
      "Organización de ventas y eventos de empaque para financiamiento de proyectos scouts."
    ],
    techStack: ["Liderazgo", "Trabajo en Equipo", "Organización", "Atención al Cliente"]
  }
];
