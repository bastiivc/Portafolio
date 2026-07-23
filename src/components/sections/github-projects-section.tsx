'use client';

import React, { useState, useEffect } from 'react';
import { GitHubRepo } from '@/types/portfolio';
import { GithubIcon } from '@/components/icons';
import { Star, GitFork, ExternalLink, Search, Code2, Filter, RefreshCw } from 'lucide-react';

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
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GithubIcon className="w-6 h-6 text-purple-400" />
            Repositorios GitHub en Tiempo Real
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Explora mis repositorios públicos sincronizados dinámicamente desde la API oficial de GitHub.
          </p>
        </div>

        <button
          onClick={fetchGitHubRepos}
          disabled={loading}
          className="self-start md:self-auto px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar GitHub
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar repositorio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900/90 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Language Pills */}
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
              <div key={n} className="h-36 rounded-xl bg-slate-900/50 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm glass-card rounded-2xl">
            No se encontraron repositorios que coincidan con la búsqueda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl glass-card flex flex-col justify-between space-y-3 group border border-white/5 hover:border-sky-500/30 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-sky-400" />
                      {repo.name}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {repo.description || 'Repositorio público sin descripción.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
