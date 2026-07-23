'use client';

import React, { useState } from 'react';
import { profileData } from '@/data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons';
import { Mail, Send, MapPin, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-amber-400" />
          Ponte en Contacto
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          ¿Tienes un proyecto en mente, una consulta laboral o deseas colaborar? Escríbeme directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Contact Form (3 cols) */}
        <div className="md:col-span-3 p-6 rounded-2xl glass-card border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            Enviar Mensaje Directo
          </h3>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
              <p className="text-xs text-slate-300">
                Gracias por comunicarte. Te responderé a la brevedad posible a tu correo electrónico.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. María González"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900/90 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Tu Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900/90 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Asunto</label>
                <input
                  type="text"
                  placeholder="Propuesta de proyecto / Consulta"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900/90 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Escribe los detalles de tu consulta aquí..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900/90 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Enviando mensaje...</span>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Socials & Info Card (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Canales Oficiales
            </h3>

            <div className="space-y-3 text-xs">
              <a
                href={`mailto:${profileData.socials.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 text-slate-200 border border-white/5 hover:border-sky-400/40 hover:text-sky-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <p className="text-[10px] text-slate-400">Email Directo</p>
                  <p className="font-semibold">{profileData.socials.email}</p>
                </div>
              </a>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 text-slate-200 border border-white/5 hover:border-purple-400/40 hover:text-purple-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">GitHub Profile</p>
                  <p className="font-semibold">@{profileData.githubUsername}</p>
                </div>
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 text-slate-200 border border-white/5 hover:border-blue-400/40 hover:text-blue-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">LinkedIn</p>
                  <p className="font-semibold">{profileData.name}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Estado de Disponibilidad
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Abierto a oportunidades de trabajo remoto, roles Fullstack / Frontend con Next.js & React, y desarrollo de aplicaciones a medida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
