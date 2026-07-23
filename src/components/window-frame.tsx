'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Minus, X, RefreshCw } from 'lucide-react';

interface WindowFrameProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  activeTab: string;
  onRefresh?: () => void;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  subtitle,
  children,
  activeTab,
  onRefresh
}) => {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/15 backdrop-blur-2xl bg-slate-950/70 text-slate-100"
    >
      {/* Window Header Bar */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-white/10 flex items-center justify-between select-none">
        {/* Left: Title & Path */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <span className="text-slate-300 font-semibold">{title}</span>
          {subtitle && (
            <>
              <span>—</span>
              <span className="text-slate-400">{subtitle}</span>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 text-slate-400 text-xs">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
              title="Actualizar datos"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Window Body Content */}
      <div className="p-6 md:p-8 min-h-[500px] overflow-y-auto max-h-[calc(85vh-120px)]">
        {children}
      </div>
    </motion.div>
  );
};
