'use client';

import React, { useState } from 'react';
import { PlayerConfig, MatchTelemetry } from './types';
import { VideoPlayerContainer } from './VideoPlayerContainer';
import { TelemetryCard } from './TelemetryCard';
import { ExportBar } from './ExportBar';
import { Tv } from 'lucide-react';

interface BroadcastSectionProps {
  p1: PlayerConfig;
  p2: PlayerConfig;
  scoreState: {
    p1Pts: number;
    p2Pts: number;
    p1Games: number;
    p2Games: number;
    server: number;
  };
  telemetry: MatchTelemetry;
  hasProcessed: boolean;
  videoUrl?: string;
  onNavigateToIngest?: () => void;
}

export const BroadcastSection: React.FC<BroadcastSectionProps> = ({
  p1,
  p2,
  scoreState,
  telemetry,
  hasProcessed,
  videoUrl,
  onNavigateToIngest,
}) => {
  const [scoreTheme, setScoreTheme] = useState<'WTT' | 'ITTF'>('WTT');

  if (!hasProcessed) {
    return (
      <section className="w-full max-w-[1920px] mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div>
            <h2 className="font-mono text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-sage-500"></span>
              SECTION 03 — POST-PROCESSING BROADCAST SUITE
            </h2>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Synchronized dual-stream inspector & broadcast export suite.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-500 border border-neutral-700 px-2 py-1">
            [ AWAITING RESULT ]
          </span>
        </div>

        <div className="p-12 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center space-y-3">
          <Tv className="w-10 h-10 text-neutral-400 dark:text-neutral-600" />
          <h3 className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            NO PROCESSED BROADCAST FOOTAGE YET
          </h3>
          <p className="font-mono text-xs text-neutral-500 max-w-md">
            Start the broadcast engine in Section 01 to generate the dual-stream viewer, WTT scorecard overlays, and match telemetry statistics.
          </p>
          {onNavigateToIngest && (
            <button
              onClick={onNavigateToIngest}
              className="mt-2 px-4 py-2 bg-sage-500 text-white font-mono text-xs font-bold uppercase hover:bg-sage-600 transition-colors"
            >
              [ LOAD MATCH VIDEO ]
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1920px] mx-auto p-4 md:p-6 space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <div>
          <h2 className="font-mono text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-sage-500"></span>
            SECTION 03 — POST-PROCESSING BROADCAST SUITE
          </h2>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Synchronized dual-stream inspector, WTT scoreboard rendering preview, and match telemetry statistics.
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-sage-600 dark:text-sage-400 border border-sage-500/40 px-2 py-1 bg-sage-500/10">
          [ STEP 3 ]
        </span>
      </div>

      {/* Main Grid: Split Video Player (Left 8) + Telemetry Sidebar (Right 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Dual Video Player */}
        <div className="lg:col-span-8 space-y-4">
          <VideoPlayerContainer
            p1={p1}
            p2={p2}
            scoreState={scoreState}
            scoreTheme={scoreTheme}
          />
        </div>

        {/* Right 4 Cols: Match Telemetry Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <TelemetryCard
            telemetry={telemetry}
            p1={p1}
            p2={p2}
            scoreTheme={scoreTheme}
            setScoreTheme={setScoreTheme}
          />
        </div>

      </div>

      {/* Export Action Bar (Bottom Full Width) */}
      <ExportBar
        videoUrl={videoUrl}
        p1={p1}
        p2={p2}
        scoreState={scoreState}
        telemetry={telemetry}
      />

    </section>
  );
};
