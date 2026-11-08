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
  title: "Bastián Mejías — Desarrollo web & IA",
  description: "Ideas en código. Soluciones reales. Proyectos de desarrollo web, inteligencia artificial y experiencia en infraestructura TI de Bastián Mejías, estudiante de Ingeniería en Informática PUCV.",
  keywords: ["Bastián Mejías", "Portafolio", "Desarrollo web", "Inteligencia artificial", "Next.js", "React", "TypeScript", "Chile"],
  authors: [{ name: "Bastián VC" }],
  openGraph: {
    title: "Bastián Mejías — Desarrollo web & IA",
    description: "Proyectos, experiencia y aprendizaje. Desarrollo web e inteligencia artificial desde Valparaíso, Chile.",
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
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
