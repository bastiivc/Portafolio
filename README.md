# Portafolio Web Moderno & Minimalista (Estilo Apple / macOS Glass)

Este es un portafolio web fullstack interactivo, moderno y escalable, diseñado con la estética de **Apple macOS Glassmorphism**. Permite exponer repositorios de GitHub en tiempo real, biografía personal, historial de experiencia laboral, estudios y certificaciones verificadas.

---

## 🛠 Stack Tecnológico

- **Frontend & Backend API**: [Next.js 15 (App Router)](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos y Glassmorphism**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografía**: [Lucide React](https://lucide.dev/) + Custom Brand Icons
- **Integración de Datos**: Next.js API Routes + [GitHub REST API](https://docs.github.com/en/rest)
- **Despliegue**: [Vercel](https://vercel.com/)

---

## 📁 Estructura del Proyecto

```text
c:\Code\Portafolio
├── public/                # Archivos estáticos e imágenes
├── src/
│   ├── app/
│   │   ├── api/github/   # Endpoint Next.js API para sincronizar repos de GitHub
│   │   ├── globals.css   # Sistema de diseño, Glassmorphic UI & temas
│   │   ├── layout.tsx    # Configuración SEO, OpenGraph y Root Layout
│   │   └── page.tsx      # Vista principal con contenedor macOS y animación de pestañas
│   ├── components/
│   │   ├── mac-top-bar.tsx # Barra de menú superior de macOS con reloj en vivo
│   │   ├── mac-dock.tsx    # Dock de Apple para navegación entre secciones
│   │   ├── window-frame.tsx# Ventana flotante estilo macOS con botones semáforo
│   │   ├── icons.tsx       # Iconos vectoriales de marcas (GitHub, LinkedIn, Twitter)
│   │   └── sections/
│   │       ├── bio-section.tsx             # Biografía, habilidades y experiencia
│   │       ├── github-projects-section.tsx # Repositorios de GitHub en vivo
│   │       ├── certificates-section.tsx    # Títulos y certificados verificados
│   │       └── contact-section.tsx         # Formulario y canales de contacto
│   ├── data/             # 💡 Módulos de contenido fácil de actualizar
│   │   ├── profile.ts      # Datos personales, biografía, habilidades y links
│   │   ├── experience.ts   # Historial laboral y logros
│   │   ├── education.ts    # Antecedentes académicos
│   │   ├── certificates.ts # Certificaciones y credenciales
│   │   └── projects.ts     # Proyectos curados/destacados
│   └── types/
│       └── portfolio.ts    # Definiciones de tipos TypeScript
└── package.json
```

---

## 🚀 Cómo Ejecutar en Desarrollo

```bash
# 1. Instalar dependencias (si no están instaladas)
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# Abrir http://localhost:3000 en el navegador.
```

---

## ⚡ Cómo Actualizar tu Información

Toda la información del sitio está desacoplada de la interfaz gráfica y centralizada en `src/data/`:

1. **Biografía y Habilidades**: Modifica `src/data/profile.ts`.
2. **Experiencia Laboral**: Añade o modifica objetos en `src/data/experience.ts`.
3. **Estudios y Certificados**: Edita `src/data/education.ts` y `src/data/certificates.ts`.
4. **Proyectos Destacados**: Edita `src/data/projects.ts`.
5. **Repositorios de GitHub**: Se obtienen **automáticamente** desde tu usuario de GitHub configurado en `src/data/profile.ts` (`githubUsername`) o mediante la variable de entorno `NEXT_PUBLIC_GITHUB_USERNAME`.

---

## 🌐 Despliegue en Vercel

1. Sube tu código a un repositorio de **GitHub**.
2. Ingresa a [Vercel](https://vercel.com/) y haz clic en **New Project**.
3. Importa tu repositorio `portafolio`.
4. *(Opcional)* Configura las variables de entorno en Vercel:
   - `NEXT_PUBLIC_GITHUB_USERNAME`: tu usuario de GitHub (ej. `bastiivc`).
   - `GITHUB_TOKEN`: *(Opcional)* Token personal de GitHub para mayor límite de peticiones API.
5. Haz clic en **Deploy**.
