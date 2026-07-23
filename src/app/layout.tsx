import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bastián VC | Fullstack Developer & Software Engineer Portfolio",
  description: "Portafolio profesional interactivo de Bastián VC desarrollado con Next.js 15, TypeScript, Tailwind CSS y Framer Motion. Expone proyectos de GitHub, experiencia laboral y certificaciones.",
  keywords: ["Portafolio", "Fullstack Developer", "Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub API", "Apple UI", "macOS style"],
  authors: [{ name: "Bastián VC" }],
  openGraph: {
    title: "Bastián VC | Portafolio Fullstack Developer",
    description: "Explora mis proyectos de GitHub, experiencia laboral, educación y certificados en un entorno web estilo Apple macOS.",
    type: "website",
    locale: "es_CL"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
