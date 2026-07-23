'use client';

import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Sun, Moon, Sparkles, Terminal } from 'lucide-react';
import { profileData } from '@/data/profile';

interface MacTopBarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTabTitle: string;
}

export const MacTopBar: React.FC<MacTopBarProps> = ({ theme, toggleTheme, activeTabTitle }) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-8 px-4 flex items-center justify-between text-xs backdrop-blur-xl bg-slate-950/60 dark:bg-slate-950/60 border-b border-white/10 text-slate-200 select-none shadow-sm">
      {/* Left Menu Items */}
      <div className="flex items-center space-x-4 font-medium">
        <div className="flex items-center space-x-1.5 cursor-pointer hover:opacity-80 transition-opacity">
          <Apple className="w-3.5 h-3.5 fill-current text-sky-400" />
          <span className="font-semibold text-white tracking-tight">{profileData.name}</span>
        </div>
        
        <span className="hidden sm:inline-block text-slate-400">|</span>
        <span className="hidden sm:flex items-center space-x-1 text-slate-300 font-normal">
          <Terminal className="w-3 h-3 text-emerald-400" />
          <span>{activeTabTitle}</span>
        </span>

        <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {profileData.status}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 text-slate-300">
        <button
          onClick={toggleTheme}
          className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          title="Cambiar Tema"
          aria-label="Cambiar Tema"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
        </button>

        <div className="flex items-center space-x-1 hover:text-sky-400 cursor-pointer">
          <Wifi className="w-3.5 h-3.5" />
        </div>

        <div className="flex items-center space-x-1.5 font-medium text-[11px] text-slate-300">
          <span>{date}</span>
          <span className="font-semibold text-white">{time}</span>
        </div>
      </div>
    </header>
  );
};
