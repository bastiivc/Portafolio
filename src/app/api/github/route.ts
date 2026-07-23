import { NextResponse } from 'next/server';
import { profileData } from '@/data/profile';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || profileData.githubUsername || 'bastiivc';

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos = await res.json();

    // Map to simplified structure
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      fork: repo.fork
    }));

    return NextResponse.json({
      success: true,
      username,
      repos: formattedRepos
    });
  } catch (error: any) {
    console.error('Error fetching GitHub repos:', error.message);
    
    // Fallback response with synthetic repos if rate-limited or offline
    return NextResponse.json({
      success: false,
      isFallback: true,
      username,
      repos: [
        {
          id: 101,
          name: "portfolio-macos-next",
          full_name: `${username}/portfolio-macos-next`,
          description: "Portafolio estilo macOS/Apple desarrollado con Next.js 15, TypeScript y Tailwind CSS.",
          html_url: `https://github.com/${username}/portfolio-macos-next`,
          homepage: `https://${username}.vercel.app`,
          stargazers_count: 14,
          forks_count: 3,
          language: "TypeScript",
          topics: ["nextjs", "typescript", "tailwindcss", "framer-motion", "apple-ui"],
          updated_at: new Date().toISOString(),
          created_at: "2024-01-15T00:00:00Z",
          fork: false
        },
        {
          id: 102,
          name: "react-ui-glassmorphism",
          full_name: `${username}/react-ui-glassmorphism`,
          description: "Componentes de interfaz en React con efecto cristal translúcido (Glassmorphism UI Library).",
          html_url: `https://github.com/${username}/react-ui-glassmorphism`,
          homepage: null,
          stargazers_count: 28,
          forks_count: 6,
          language: "TypeScript",
          topics: ["react", "ui-components", "glassmorphism", "tailwind"],
          updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          created_at: "2024-02-10T00:00:00Z",
          fork: false
        },
        {
          id: 103,
          name: "fullstack-auth-template",
          full_name: `${username}/fullstack-auth-template`,
          description: "Plantilla de autenticación fullstack con NextAuth, Prisma ORM y PostgreSQL.",
          html_url: `https://github.com/${username}/fullstack-auth-template`,
          homepage: null,
          stargazers_count: 19,
          forks_count: 4,
          language: "TypeScript",
          topics: ["nextjs", "prisma", "postgresql", "auth"],
          updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
          created_at: "2024-03-01T00:00:00Z",
          fork: false
        },
        {
          id: 104,
          name: "dev-tools-cli",
          full_name: `${username}/dev-tools-cli`,
          description: "CLI de productividad para desarrollo web y generación automática de componentes.",
          html_url: `https://github.com/${username}/dev-tools-cli`,
          homepage: null,
          stargazers_count: 9,
          forks_count: 1,
          language: "JavaScript",
          topics: ["cli", "devtools", "node"],
          updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
          created_at: "2023-11-20T00:00:00Z",
          fork: false
        }
      ]
    });
  }
}
