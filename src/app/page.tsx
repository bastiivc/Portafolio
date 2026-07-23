'use client';

import React, { useState, useEffect } from 'react';
import { MacTopBar } from '@/components/mac-top-bar';
import { MacDock, TabType } from '@/components/mac-dock';
import { WindowFrame } from '@/components/window-frame';
import { BioSection } from '@/components/sections/bio-section';
import { GitHubProjectsSection } from '@/components/sections/github-projects-section';
import { CertificatesSection } from '@/components/sections/certificates-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('bio');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const getTabTitles = () => {
    switch (activeTab) {
      case 'bio':
        return { title: 'Sobre Mí — Biografía y Experiencia', subtitle: '~/profile/overview' };
      case 'projects':
        return { title: 'Proyectos GitHub y Destacados', subtitle: '~/projects/github-api' };
      case 'certificates':
        return { title: 'Estudios y Certificados Verificados', subtitle: '~/credentials/education' };
      case 'contact':
        return { title: 'Contacto y Canales Directos', subtitle: '~/contact/send-message' };
      default:
        return { title: 'Portafolio', subtitle: '~/home' };
    }
  };

  const { title, subtitle } = getTabTitles();

  return (
    <main className="min-h-screen relative pt-12 pb-24 px-4 sm:px-6 md:px-8 flex flex-col justify-between overflow-x-hidden selection:bg-sky-500 selection:text-white">
      {/* Ambient background glows */}
      <div className="ambient-glow" />
      <div className="fixed top-1/4 left-10 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 w-80 h-80 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* macOS Top Bar */}
      <MacTopBar
        theme={theme}
        toggleTheme={toggleTheme}
        activeTabTitle={title}
      />

      {/* Center Main Window Frame */}
      <div className="flex-1 flex items-center justify-center my-auto z-10 w-full">
        <WindowFrame
          title={title}
          subtitle={subtitle}
          activeTab={activeTab}
        >
          {activeTab === 'bio' && (
            <BioSection onNavigateToProjects={() => setActiveTab('projects')} />
          )}

          {activeTab === 'projects' && (
            <GitHubProjectsSection />
          )}

          {activeTab === 'certificates' && (
            <CertificatesSection />
          )}

          {activeTab === 'contact' && (
            <ContactSection />
          )}
        </WindowFrame>
      </div>

      {/* Apple Dock Navigation */}
      <MacDock
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </main>
  );
}
