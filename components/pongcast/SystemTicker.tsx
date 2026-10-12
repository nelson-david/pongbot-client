'use client';

import React from 'react';
import { Activity, Layers, HardDrive } from 'lucide-react';

interface SystemTickerProps {
  hasVideo: boolean;
  isProcessing: boolean;
  videoName?: string;
}

export const SystemTicker: React.FC<SystemTickerProps> = ({
  hasVideo,
  isProcessing,
  videoName,
}) => {
  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-mono py-1.5 px-4 overflow-x-auto select-none transition-colors">
      <div className="flex items-center justify-between min-w-max gap-8">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
            <span className={`w-2 h-2 ${isProcessing ? 'bg-amber-500 animate-ping' : hasVideo ? 'bg-sage-500' : 'bg-neutral-400 dark:bg-neutral-600'}`}></span>
            <span className="text-neutral-500 dark:text-neutral-400">ENGINE STATUS:</span>
            <span className="font-bold text-neutral-900 dark:text-white uppercase">
              {isProcessing ? '[ PROCESSING MATCH VIDEO ]' : hasVideo ? `[ READY: ${videoName} ]` : '[ IDLE • AWAITING MATCH VIDEO ]'}
            </span>
          </span>

          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-sage-500" />
            <span>FRAME RATE:</span>
            <span className="text-neutral-200 tabular-nums font-semibold">{hasVideo ? '29.97 FPS' : '--'}</span>
          </span>

          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-neutral-500" />
            <span>MATCH FORMAT:</span>
            <span className="text-neutral-200">ITTF OFFICIAL (11-PT GAMES)</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-neutral-500" />
            <span>BROADCAST OUTPUT:</span>
            <span className="text-neutral-300 font-mono">1080p H.264 (AAC AUDIO)</span>
          </span>

          <span className="text-sage-500 font-semibold tracking-wider uppercase">
            [ AUTOMATED SCORING ]
          </span>
        </div>
      </div>
    </div>
  );
};
