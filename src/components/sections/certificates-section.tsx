'use client';

import React, { useState } from 'react';
import { educationData } from '@/data/education';
import { certificatesData } from '@/data/certificates';
import { CertificateItem } from '@/types/portfolio';
import { 
  GraduationCap, 
  Award, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  X,
  FileCheck
} from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todos', 'Desarrollo', 'Cloud/DevOps', 'Ciencia de Datos', 'Ciberseguridad', 'Otro'];

  const filteredCertificates = certificatesData.filter(cert => {
    if (selectedCategory === 'Todos') return true;
    return cert.category === selectedCategory;
  });

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

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
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              Certificaciones & Cursos Verificados
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {certificatesData.length} certificaciones profesionales con credenciales oficiales verificables.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const count = cat === 'Todos' 
                ? certificatesData.length 
                : certificatesData.filter(c => c.category === cat).length;
              if (cat !== 'Todos' && count === 0) return null;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
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
                <div className="flex items-center justify-between gap-2">
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

                {/* ID & Actions footer */}
                <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
                  {cert.credentialId && (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 truncate max-w-[210px] sm:max-w-[260px]">
                        <FileCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate" title={`ID: ${cert.credentialId}`}>ID: {cert.credentialId}</span>
                      </div>
                      <button
                        onClick={(e) => handleCopyId(e, cert.credentialId!)}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 shrink-0"
                        title="Copiar ID de credencial"
                      >
                        {copiedId === cert.credentialId ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar ID</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Clic para ver ficha completa
                    </span>

                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>Ver Credencial</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
                        Ver Detalles
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Certificate Detail */}
      {activeCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveCertificate(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md p-6 rounded-2xl glass-panel border border-white/20 space-y-5 relative shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="pr-6">
                <h3 className="text-lg font-bold text-white leading-tight">{activeCertificate.title}</h3>
                <p className="text-xs text-sky-400 font-medium mt-0.5">{activeCertificate.issuer}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Fecha de emisión:</span>
                <span className="font-mono text-slate-200">{activeCertificate.issueDate}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Categoría:</span>
                <span className="text-slate-200">{activeCertificate.category}</span>
              </div>

              {activeCertificate.credentialId && (
                <div className="flex items-center justify-between py-1 border-b border-white/5 gap-2">
                  <span className="text-slate-400 shrink-0">ID Credencial:</span>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-mono text-slate-200 text-[11px] truncate max-w-[170px]" title={activeCertificate.credentialId}>
                      {activeCertificate.credentialId}
                    </span>
                    <button
                      onClick={(e) => handleCopyId(e, activeCertificate.credentialId!)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                      title="Copiar ID"
                    >
                      {copiedId === activeCertificate.credentialId ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Estado de verificación:</span>
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
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
              >
                <span>Abrir Credencial Oficial en Línea</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
