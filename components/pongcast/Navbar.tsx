'use client';

import React from 'react';
import { ActiveMode } from './types';
import { Sun, Moon, Radio } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activeMode: ActiveMode;
  setActiveMode: (mode: ActiveMode) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isProcessing: boolean;
  hasStarted: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  setActiveMode,
  isDarkMode,
  setIsDarkMode,
  isProcessing,
  hasStarted,
}) => {
  const modes: { id: ActiveMode; label: string }[] = [
    { id: 'ingest', label: '[ 01-SETUP ]' },
    { id: 'pipeline', label: '[ 02-PROCESSING ]' },
    { id: 'broadcast', label: '[ 03-BROADCAST ]' },
  ];

  return (
    <header className="w-full bg-brand-surface dark:bg-brand-surface border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <Logo size="md" showSubtitle={true} />

        {/* Middle: Mode Switcher Tabs (Only shown when a job has started!) */}
        {hasStarted ? (
          <nav className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1 overflow-x-auto">
            {modes.map((mode) => {
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`px-3 py-1 font-mono text-xs tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-sage-500 text-white font-bold border border-sage-600 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-neutral-500">
            <span className="w-2 h-2 bg-sage-500 animate-pulse"></span>
            <span>READY TO PROCESS MATCH FOOTAGE</span>
          </div>
        )}

        {/* Right: Telemetry & Theme Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-mono text-xs">
            <Radio className={`w-3.5 h-3.5 ${isProcessing ? 'text-amber-500 animate-spin' : 'text-sage-500'}`} />
            <span className="text-neutral-500 dark:text-neutral-400">STATUS:</span>
            <span className="font-semibold text-neutral-900 dark:text-white">
              {isProcessing ? 'PROCESSING' : 'READY'}
            </span>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark/Light Theme"
            className="p-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-sage-500 dark:hover:border-sage-500 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

      </div>
    </header>
  );
};
