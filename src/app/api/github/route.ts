import { NextResponse } from 'next/server';
import { profileData } from '@/data/profile';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || profileData.githubUsername || 'bastiivc';

  // List of extra organization or team repositories to include
  const extraReposList = ['Mx4-2V/intervee'];

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

    // Fetch extra organization repositories (like Mx4-2V/intervee)
    for (const extraRepoPath of extraReposList) {
      const alreadyIncluded = repos.some((r: any) => r.full_name?.toLowerCase() === extraRepoPath.toLowerCase() || r.name?.toLowerCase() === extraRepoPath.split('/')[1]?.toLowerCase());
      if (!alreadyIncluded) {
        try {
          const extraRes = await fetch(`https://api.github.com/repos/${extraRepoPath}`, {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Portfolio-App',
              ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
            },
            next: { revalidate: 60 }
          });
          if (extraRes.ok) {
            const extraRepo = await extraRes.json();
            repos.unshift(extraRepo);
          }
        } catch (e) {
          console.error(`Could not fetch ${extraRepoPath}:`, e);
        }
      }
    }

    // Map to simplified structure
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || (repo.name.includes('MARC-IA') ? 'Asistente virtual usando RAG para orientación institucional.' : (repo.name === 'intervee' ? 'Desarrollo web 3D interactivo con Three.js' : null)),
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      language: repo.language || (repo.name.includes('MARC-IA') ? 'Python' : 'TypeScript'),
      topics: repo.topics && repo.topics.length > 0 ? repo.topics : (repo.name.includes('MARC-IA') ? ['rag', 'ia', 'python', 'asistente-virtual'] : (repo.name === 'intervee' ? ['threejs', 'typescript', '3d-web'] : [])),
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
    
    // Fallback response with real repos including MARC-IA-Project and intervee
    return NextResponse.json({
      success: false,
      isFallback: true,
      username,
      repos: [
        {
          id: 1208021191,
          name: "intervee",
          full_name: "Mx4-2V/intervee",
          description: "Desarrollo web 3D interactivo construido con Three.js y TypeScript.",
          html_url: "https://github.com/Mx4-2V/intervee",
          homepage: null,
          stargazers_count: 1,
          forks_count: 0,
          language: "TypeScript",
          topics: ["threejs", "typescript", "3d-web"],
          updated_at: "2026-05-23T00:55:37Z",
          created_at: "2026-04-11T17:58:57Z",
          fork: false
        },
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
        }
      ]
    });
  }
}
