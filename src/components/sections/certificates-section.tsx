'use client';

import React, { useState } from 'react';
import { educationData } from '@/data/education';
import { certificatesData } from '@/data/certificates';
import { CertificateItem } from '@/types/portfolio';
import { GraduationCap, Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck, BookOpen, X } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);

  const categories = ['Todos', 'Desarrollo', 'Cloud/DevOps', 'Ciencia de Datos', 'Otro'];

  const filteredCertificates = certificatesData.filter(cert => {
    if (selectedCategory === 'Todos') return true;
    return cert.category === selectedCategory;
  });

  return (
    <div className="space-y-10">
      {/* Education Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <GraduationCap className="w-6 h-6 text-emerald-400" />
          Estudios y Formación Académica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationData.map((edu) => (
            <div key={edu.id} className="p-5 rounded-2xl glass-card space-y-3 relative flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {edu.startDate} — {edu.endDate}
                  </span>
                  {edu.location && (
                    <span className="text-xs text-slate-400 font-medium">{edu.location}</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                <p className="text-sm font-medium text-sky-400">{edu.institution}</p>

                {edu.description && (
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{edu.description}</p>
                )}
              </div>

              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="space-y-1 text-xs text-slate-400 pt-2 border-t border-white/5 list-disc pl-4 marker:text-emerald-400">
                  {edu.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certificates Showcase */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            Certificaciones Profesional Verificadas
          </h2>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCertificate(cert)}
              className="p-5 rounded-2xl glass-card space-y-3 cursor-pointer group border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verificado
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {cert.issueDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold text-sky-400">{cert.issuer}</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 text-[10px] rounded bg-slate-900 text-slate-300 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
                  <span className="text-[11px] font-mono text-slate-500">
                    ID: {cert.credentialId || 'Verificación oficial'}
                  </span>
                  <span className="text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
                    Ver Detalles
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Certificate Detail */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl glass-panel border border-white/20 space-y-4 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{activeCertificate.title}</h3>
                <p className="text-xs text-sky-400 font-medium">{activeCertificate.issuer}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Fecha de emisión:</span>
                <span className="font-mono text-slate-200">{activeCertificate.issueDate}</span>
              </div>
              {activeCertificate.credentialId && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">ID Credencial:</span>
                  <span className="font-mono text-slate-200">{activeCertificate.credentialId}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Estado:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Válido & Autenticado
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-400">Habilidades Certificadas:</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeCertificate.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {activeCertificate.credentialUrl && (
              <a
                href={activeCertificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors"
              >
                <span>Abrir Credencial Oficial</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
