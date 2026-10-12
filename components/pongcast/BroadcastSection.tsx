'use client';

import React, { useState } from 'react';
import { PlayerConfig, MatchTelemetry } from './types';
import { TelemetryCard } from './TelemetryCard';
import { Tv, Download } from 'lucide-react';

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
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const downloadUrl = videoUrl || `${process.env.NEXT_PUBLIC_API_URL || ''}/outputs/test_out.mp4`;
    setIsDownloading(true);
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `pongcast_${p1.name.split(' ')[0]}_vs_${p2.name.split(' ')[0]}_broadcast.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn('Download error:', err);
      window.open(downloadUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

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
              Match telemetry statistics and broadcast video export.
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
            Start the broadcast engine in Section 01 to generate match telemetry statistics and download your broadcast video.
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
    <section className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <div>
          <h2 className="font-mono text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-sage-500"></span>
            SECTION 03 — POST-PROCESSING BROADCAST SUITE
          </h2>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Match telemetry statistics and broadcast video export.
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-sage-600 dark:text-sage-400 border border-sage-500/40 px-2 py-1 bg-sage-500/10">
          [ STEP 3 ]
        </span>
      </div>

      {/* Match Telemetry (Overlay Theme + Key Metrics + Analytics) */}
      <TelemetryCard
        telemetry={telemetry}
        p1={p1}
        p2={p2}
        scoreTheme={scoreTheme}
        setScoreTheme={setScoreTheme}
      />

      {/* Clean Single Download Action Bar */}
      <div className="p-5 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 font-mono text-xs">
          <span className="text-neutral-500 uppercase">
            BROADCAST OUTPUT: <strong className="text-sage-500 font-bold">1080p H.264 (AAC AUDIO)</strong>
          </span>
          <span className="text-sage-500 font-bold">[ READY ]</span>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-3.5 px-4 bg-sage-500 hover:bg-sage-600 disabled:opacity-50 text-white font-mono text-xs font-bold border border-sage-600 shadow-md flex items-center justify-center gap-2 transition-all"
        >
          <Download className="w-4 h-4 text-white" />
          {isDownloading ? '[ PREPARING DOWNLOAD... ]' : '[ DOWNLOAD BROADCAST VIDEO ]'}
        </button>
      </div>

    </section>
  );
};
