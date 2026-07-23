'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { experienceData } from '@/data/experience';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { MapPin, Mail, Briefcase, Code, Sparkles, Layers } from 'lucide-react';

interface BioSectionProps {
  onNavigateToProjects?: () => void;
}

export const BioSection: React.FC<BioSectionProps> = () => {
  return (
    <div className="space-y-10">
      {/* Header Profile Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl glass-card relative overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Avatar */}
        <div className="relative">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 p-1 shadow-xl">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md" title="En línea" />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
              {profileData.name}
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h1>
            <p className="text-sky-400 font-medium text-sm md:text-base">{profileData.role}</p>
          </div>

          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            {profileData.tagline}
          </p>

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {profileData.location}
            </span>
            <a
              href={`mailto:${profileData.socials.email}`}
              className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              {profileData.socials.email}
            </a>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
              GitHub
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Biography Paragraphs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-2">
          <Code className="w-5 h-5 text-sky-400" />
          Biografía y Enfoque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profileData.bio.map((paragraph, idx) => (
            <div key={idx} className="p-4 rounded-xl glass-card space-y-2 text-sm text-slate-300 leading-relaxed">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-mono text-xs font-bold">
                0{idx + 1}
              </div>
              <p>{paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Categories */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-2">
          <Layers className="w-5 h-5 text-purple-400" />
          Stack Tecnológico
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profileData.skills.map((skillGroup, idx) => (
            <div key={idx} className="p-5 rounded-xl glass-card space-y-3">
              <h3 className="text-sm font-semibold text-slate-200 tracking-wide">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/80 text-sky-300 border border-sky-500/20 hover:border-sky-400/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-2">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          Experiencia Laboral
        </h2>
        <div className="space-y-4">
          {experienceData.map((item) => (
            <div key={item.id} className="p-5 rounded-xl glass-card space-y-3 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2">
                <div>
                  <h3 className="text-base font-bold text-white">{item.role}</h3>
                  <p className="text-sm text-sky-400 font-medium">{item.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-white/10">
                    {item.startDate} — {item.endDate}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>

              <ul className="space-y-1.5 text-xs text-slate-400 pl-4 list-disc marker:text-sky-400">
                {item.highlights.map((hl, hIdx) => (
                  <li key={hIdx}>{hl}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 text-[11px] rounded bg-white/5 text-slate-300 border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
