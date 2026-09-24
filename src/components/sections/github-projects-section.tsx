'use client';

import React, { useState, useEffect } from 'react';
import { GitHubRepo } from '@/types/portfolio';
import { GithubIcon } from '@/components/icons';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  Search, 
  Code2, 
  Filter, 
  RefreshCw, 
  Globe, 
  Sparkles, 
  ShieldCheck,
  Activity
} from 'lucide-react';

export const GitHubProjectsSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const fetchGitHubRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/github');
      const data = await res.json();
      if (data.repos) {
        setRepos(data.repos);
      }
    } catch (err) {
      console.error('Failed to load GitHub repos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))) as string[]];

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (repo.topics && repo.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GithubIcon className="w-6 h-6 text-purple-400" />
            Repositorios GitHub & Proyectos Web
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Explora mis proyectos en producción, código abierto y repositorios sincronizados dinámicamente.
          </p>
        </div>

        <button
          onClick={fetchGitHubRepos}
          disabled={loading}
          className="self-start md:self-auto px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar Repositorios
        </button>
      </div>

      {/* Featured Production Website: Agencia de Aduanas Mejías */}
      <div className="relative overflow-hidden rounded-2xl glass-card border border-emerald-500/30 p-6 bg-gradient-to-br from-emerald-950/20 via-slate-900/60 to-slate-950/80 shadow-xl group hover:border-emerald-400/50 transition-all">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Sitio Web en Producción Activa
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                agenciamejias.cl
              </span>
            </div>

            <a
              href="https://agenciamejias.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Visitar Sitio Oficial</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
              Agencia de Aduanas Mejías
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs font-medium text-sky-400 mt-0.5">
              Comercio Exterior, Importaciones y Exportaciones — Sedes en Valparaíso & Santiago
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Desarrollo y mantención técnica continua de la plataforma web corporativa para la <strong>Agencia de Aduanas Mejías</strong>. Incluye arquitectura de información moderna, despliegue de indicadores económicos en tiempo real (UF, UTM, Dólar Aduanero, Euro), optimización de posicionamiento SEO, integración de canales directos de contacto aduanero y diseño responsivo multiplataforma.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5">
              {['WordPress', 'Elementor Pro', 'PHP', 'JavaScript', 'CSS3', 'SEO Técnico', 'Indicadores Económicos'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-900/90 text-slate-200 border border-white/10 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <Activity className="w-3.5 h-3.5" />
                Live: 100% Operativo
              </span>
              <span className="text-slate-500">•</span>
              <span>Chile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, descripción o tecnología..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900/90 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Language / Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedLanguage === lang
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-400 border border-white/5 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-40 rounded-xl bg-slate-900/50 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm glass-card rounded-2xl">
            No se encontraron repositorios o proyectos que coincidan con la búsqueda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRepos.map((repo) => {
              const isProduction = repo.isLiveProduction || repo.name === 'agenciamejias.cl';

              return (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-5 rounded-xl glass-card flex flex-col justify-between space-y-3 group border transition-all ${
                    isProduction
                      ? 'border-emerald-500/30 hover:border-emerald-400/60 bg-emerald-950/10'
                      : 'border-white/5 hover:border-sky-500/30'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5 truncate">
                        {isProduction ? (
                          <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Code2 className="w-4 h-4 text-sky-400 shrink-0" />
                        )}
                        <span className="truncate">{repo.name}</span>
                      </h3>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isProduction && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Producción
                          </span>
                        )}
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {repo.description || 'Repositorio público sin descripción.'}
                    </p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {repo.topics.slice(0, 4).map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 text-[9px] rounded bg-slate-900/90 text-slate-400 border border-white/5"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-slate-300">
                          <span className={`w-2 h-2 rounded-full ${
                            isProduction ? 'bg-emerald-400' : 'bg-sky-400'
                          }`} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 hover:text-amber-300">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 hover:text-purple-300">
                        <GitFork className="w-3.5 h-3.5 text-purple-400" />
                        {repo.forks_count}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-500">
                      {new Date(repo.updated_at).toLocaleDateString('es-CL', { month: 'short', year: '2-digit' })}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
