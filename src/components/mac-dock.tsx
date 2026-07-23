'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, GraduationCap, Mail, FolderGit2 } from 'lucide-react';

export type TabType = 'bio' | 'projects' | 'certificates' | 'contact';

interface MacDockProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const MacDock: React.FC<MacDockProps> = ({ activeTab, setActiveTab }) => {
  const dockItems: { id: TabType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'bio', label: 'Sobre Mí', icon: <User className="w-5 h-5" />, color: 'from-blue-500 to-cyan-400' },
    { id: 'projects', label: 'Proyectos GitHub', icon: <FolderGit2 className="w-5 h-5" />, color: 'from-violet-500 to-purple-400' },
    { id: 'certificates', label: 'Estudios & Certificados', icon: <GraduationCap className="w-5 h-5" />, color: 'from-emerald-500 to-teal-400' },
    { id: 'contact', label: 'Contacto', icon: <Mail className="w-5 h-5" />, color: 'from-amber-500 to-orange-400' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 p-2 rounded-2xl glass-panel border border-white/20 shadow-2xl backdrop-blur-2xl bg-slate-900/70"
      >
        {dockItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative group p-1 focus:outline-none"
              aria-label={item.label}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900/90 text-slate-100 border border-white/10 whitespace-nowrap shadow-lg">
                {item.label}
              </div>

              {/* Icon Container with Apple gradient */}
              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md transition-shadow ${
                  isActive
                    ? `bg-gradient-to-tr ${item.color} shadow-sky-500/30 ring-2 ring-white/40`
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300'
                }`}
              >
                {item.icon}
              </motion.div>

              {/* Active Dot */}
              {isActive && (
                <motion.div
                  layoutId="dock-active-dot"
                  className="w-1.5 h-1.5 bg-sky-400 rounded-full mx-auto mt-1 shadow-sm shadow-sky-400"
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};
