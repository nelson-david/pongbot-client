'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Geometric SVG Icon Mark */}
      <div className={`${iconDimensions} bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center relative overflow-hidden shrink-0 group`}>
        <svg viewBox="0 0 32 32" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Table Outline */}
          <polygon points="4,24 28,24 24,12 8,12" stroke="#4A7C59" strokeWidth="1.5" className="fill-neutral-100 dark:fill-neutral-900" />
          {/* Net Line */}
          <line x1="16" y1="10" x2="16" y2="24" className="stroke-neutral-800 dark:stroke-white" strokeWidth="1.5" />
          {/* Ball Arc */}
          <path d="M 6 22 Q 16 6 26 21" stroke="#50A168" strokeWidth="1.5" strokeDasharray="2,1.5" />
          {/* Ball */}
          <circle cx="16" cy="10" r="2" fill="#50A168" />
        </svg>
      </div>

      {/* Typography */}
      <div>
        <div className="flex items-center gap-2">
          <span className={`font-mono font-bold tracking-widest ${titleSize} text-neutral-900 dark:text-white uppercase leading-none`}>
            PONGCAST
          </span>
          <span className="px-1.5 py-0.2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-sage-600 dark:text-sage-400 font-mono text-[9px] font-bold tracking-wider">
            [ PROD ]
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 tracking-wider uppercase mt-0.5">
            AI-POWERED TABLE TENNIS BROADCAST SUITE
          </p>
        )}
      </div>
    </div>
  );
};
