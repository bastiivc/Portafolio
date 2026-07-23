export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  location: string;
  status: string;
  avatarUrl?: string;
  githubUsername: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  achievements?: string[];
  badgeUrl?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  image?: string;
  category: 'Desarrollo' | 'Cloud/DevOps' | 'Diseño' | 'Ciencia de Datos' | 'Otro';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  stars?: number;
  forks?: number;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
}
