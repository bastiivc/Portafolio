import { NextResponse } from 'next/server';
import { profileData } from '@/data/profile';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || profileData.githubUsername || 'bastiivc';

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    let repos = await res.json();

    // Check if MARC-IA-Project is in repos list, if not fetch it specifically
    const hasMarcIa = repos.some((r: any) => r.name.toLowerCase().includes('marc-ia') || r.name.toLowerCase().includes('marcia'));

    if (!hasMarcIa) {
      try {
        const marcRes = await fetch(`https://api.github.com/repos/${username}/MARC-IA-Project`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App',
            ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
          },
          next: { revalidate: 60 }
        });
        if (marcRes.ok) {
          const marcRepo = await marcRes.json();
          repos.unshift(marcRepo);
        }
      } catch (e) {
        console.error('Could not fetch MARC-IA-Project directly:', e);
      }
    }

    // Map to simplified structure
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || (repo.name.includes('MARC-IA') ? 'Asistente virtual usando RAG para orientación institucional.' : null),
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      language: repo.language || (repo.name.includes('MARC-IA') ? 'Python' : 'TypeScript'),
      topics: repo.topics && repo.topics.length > 0 ? repo.topics : (repo.name.includes('MARC-IA') ? ['rag', 'ia', 'python', 'asistente-virtual'] : []),
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
    
    // Fallback response with real repos including MARC-IA-Project
    return NextResponse.json({
      success: false,
      isFallback: true,
      username,
      repos: [
        {
          id: 1252706956,
          name: "MARC-IA-Project",
          full_name: `${username}/MARC-IA-Project`,
          description: "Asistente virtual usando RAG (Retrieval-Augmented Generation) para orientación institucional.",
          html_url: `https://github.com/${username}/MARC-IA-Project`,
          homepage: null,
          stargazers_count: 5,
          forks_count: 1,
          language: "Python",
          topics: ["rag", "ia", "python", "asistente-virtual", "llm"],
          updated_at: "2026-05-28T19:38:46Z",
          created_at: "2026-05-28T19:38:46Z",
          fork: false
        },
        {
          id: 1309793422,
          name: "Portafolio",
          full_name: `${username}/Portafolio`,
          description: "Portafolio web estilo macOS/Apple desarrollado con Next.js 15, TypeScript y Tailwind CSS.",
          html_url: `https://github.com/${username}/Portafolio`,
          homepage: `https://${username}.vercel.app`,
          stargazers_count: 3,
          forks_count: 0,
          language: "TypeScript",
          topics: ["nextjs", "typescript", "tailwindcss", "framer-motion", "apple-ui"],
          updated_at: new Date().toISOString(),
          created_at: "2026-07-23T10:02:06Z",
          fork: false
        },
        {
          id: 1057570904,
          name: "Racing_Web_Ionic",
          full_name: `${username}/Racing_Web_Ionic`,
          description: "Aplicación web híbrida desarrollada con Ionic Framework y TypeScript.",
          html_url: `https://github.com/${username}/Racing_Web_Ionic`,
          homepage: null,
          stargazers_count: 2,
          forks_count: 0,
          language: "TypeScript",
          topics: ["ionic", "typescript", "web-app"],
          updated_at: "2025-10-19T21:34:19Z",
          created_at: "2025-09-15T23:12:33Z",
          fork: true
        }
      ]
    });
  }
}
