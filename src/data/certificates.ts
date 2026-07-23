import { CertificateItem } from '@/types/portfolio';

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Fullstack Web Development Certification",
    issuer: "Udemy / Platzi",
    issueDate: "2024",
    credentialId: "UC-FULLSTACK-2024",
    credentialUrl: "https://example.com/certificate/fullstack",
    skills: ["React", "Next.js", "Node.js", "Express", "PostgreSQL"],
    category: "Desarrollo"
  },
  {
    id: "cert-2",
    title: "TypeScript Advanced & Design Patterns",
    issuer: "Frontend Masters",
    issueDate: "2024",
    credentialId: "FM-TS-ADV-992",
    credentialUrl: "https://example.com/certificate/typescript",
    skills: ["TypeScript", "Design Patterns", "Clean Code"],
    category: "Desarrollo"
  },
  {
    id: "cert-3",
    title: "Vercel & Next.js App Router Masterclass",
    issuer: "Vercel Academy",
    issueDate: "2024",
    credentialUrl: "https://example.com/certificate/nextjs",
    skills: ["Next.js", "App Router", "Server Components", "Vercel Deployment"],
    category: "Desarrollo"
  },
  {
    id: "cert-4",
    title: "AWS Cloud Practitioner & Serverless",
    issuer: "Amazon Web Services",
    issueDate: "2023",
    credentialId: "AWS-CP-2023",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["AWS Lambda", "S3", "CloudFront", "Serverless Architecture"],
    category: "Cloud/DevOps"
  }
];
