import { NextResponse } from 'next/server';
import { profileData } from '@/data/profile';

export const revalidate = 60;

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || profileData.githubUsername || 'bastiivc';


  const extraReposList = ['Mx4-2V/intervee'];

  const collaborativeRepos = [
    {
      id: 99887766,
      name: "eye-tracking-analysis",
      full_name: "DiegoRNR/eye-tracking-analysis",
      description: "Análisis y modelado de datos de seguimiento ocular (Eye-Tracking Scanpaths) desarrollado en R y Python.",
      html_url: "https://github.com/DiegoRNR/eye-tracking-analysis",
      homepage: null,
      stargazers_count: 0,
      forks_count: 0,
      language: "R",
      topics: ["eye-tracking", "r", "python", "data-analysis", "scanpath-networks"],
      updated_at: new Date().toISOString(),
      created_at: "2026-08-01T00:00:00Z",
      fork: false
    }
  ];

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      },
      next: { revalidate: 60 }
    });

    let repos: any[] = [];
    if (res.ok) {
      repos = await res.json();
    }

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

    for (const collabRepo of collaborativeRepos) {
      const alreadyIncluded = repos.some((r: any) => r.name?.toLowerCase() === collabRepo.name.toLowerCase() || r.full_name?.toLowerCase() === collabRepo.full_name.toLowerCase());
      if (!alreadyIncluded) {
        try {
          const collabRes = await fetch(`https://api.github.com/repos/${collabRepo.full_name}`, {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Portfolio-App',
              ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
            },
            next: { revalidate: 60 }
          });
          if (collabRes.ok) {
            const fetchedCollab = await collabRes.json();
            repos.unshift(fetchedCollab);
          } else {
            repos.unshift(collabRepo);
          }
        } catch (e) {
          repos.unshift(collabRepo);
        }
      }
    }

    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || (repo.name.includes('MARC-IA') ? 'Asistente virtual usando RAG para orientación institucional.' : (repo.name === 'intervee' ? 'Desarrollo web 3D interactivo con Three.js' : (repo.name === 'eye-tracking-analysis' ? 'Análisis y modelado de datos de seguimiento ocular en R y Python.' : null))),
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      language: repo.language || (repo.name.includes('MARC-IA') ? 'Python' : (repo.name === 'eye-tracking-analysis' ? 'R' : 'TypeScript')),
      topics: repo.topics && repo.topics.length > 0 ? repo.topics : (repo.name.includes('MARC-IA') ? ['rag', 'ia', 'python', 'asistente-virtual'] : (repo.name === 'intervee' ? ['threejs', 'typescript', '3d-web'] : (repo.name === 'eye-tracking-analysis' ? ['eye-tracking', 'r', 'python', 'scanpath'] : []))),
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

    return NextResponse.json({
      success: false,
      isFallback: true,
      username,
      repos: [
        {
          id: 99887766,
          name: "eye-tracking-analysis",
          full_name: "DiegoRNR/eye-tracking-analysis",
          description: "Análisis y modelado de datos de seguimiento ocular (Eye-Tracking Scanpaths) desarrollado en R y Python.",
          html_url: "https://github.com/DiegoRNR/eye-tracking-analysis",
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          language: "R",
          topics: ["eye-tracking", "r", "python", "data-analysis", "scanpath-networks"],
          updated_at: new Date().toISOString(),
          created_at: "2026-08-01T00:00:00Z",
          fork: false
        },
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
