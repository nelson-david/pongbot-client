'use client';

import React, { useState } from 'react';
import { Download, FileText, Film, CheckCircle2 } from 'lucide-react';
import { ExportModal } from './ExportModal';
import { PlayerConfig, MatchTelemetry } from './types';

interface ExportBarProps {
  videoUrl?: string;
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
}

export const ExportBar: React.FC<ExportBarProps> = ({
  videoUrl,
  p1,
  p2,
  scoreState,
  telemetry,
}) => {
  const [modalType, setModalType] = useState<'pdf' | 'highlights' | 'download' | null>(null);

  const handleDirectDownload = () => {
    const downloadUrl = videoUrl || `${process.env.NEXT_PUBLIC_API_URL || ''}/outputs/test_out.mp4`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `pongcast_${p1.name.split(' ')[0]}_vs_${p2.name.split(' ')[0]}_broadcast.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="p-5 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 space-y-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sage-500" />
            <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              EXPORTS & MATCH HIGHLIGHTS
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-500">
            BROADCAST OUTPUT: <strong className="text-sage-500 font-bold">1080p H.264 (AAC AUDIO)</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          
          {/* Summary Report Modal */}
          <button
            onClick={() => setModalType('pdf')}
            className="py-3 px-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 text-neutral-800 dark:text-neutral-200 font-bold flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-neutral-500" />
            [ MATCH SUMMARY REPORT ]
          </button>

          {/* Highlights Modal */}
          <button
            onClick={() => setModalType('highlights')}
            className="py-3 px-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 text-neutral-800 dark:text-neutral-200 font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Film className="w-4 h-4 text-amber-500" />
            [ EXPORT HIGHLIGHT REEL ]
          </button>

          {/* Download Final Video */}
          <button
            onClick={handleDirectDownload}
            className="py-3 px-4 bg-sage-500 hover:bg-sage-600 text-white font-bold border border-sage-600 shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-white" />
            [ DOWNLOAD BROADCAST VIDEO ]
          </button>

        </div>

      </div>

      {/* Custom Modal */}
      {modalType && (
        <ExportModal
          isOpen={modalType !== null}
          onClose={() => setModalType(null)}
          type={modalType}
          videoUrl={videoUrl}
          p1={p1}
          p2={p2}
          scoreState={scoreState}
          telemetry={telemetry}
        />
      )}
    </>
  );
};
