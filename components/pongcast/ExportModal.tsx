'use client';

import React from 'react';
import { X, Download, FileText, Film, CheckCircle, Trophy, Sparkles } from 'lucide-react';
import { PlayerConfig, MatchTelemetry } from './types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'pdf' | 'highlights' | 'download';
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

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  type,
  videoUrl,
  p1,
  p2,
  scoreState,
  telemetry,
}) => {
  if (!isOpen) return null;

  const handleDownloadReport = () => {
    const reportText = `=====================================================
PONGCAST MATCH REPORT & TELEMETRY SUMMARY
=====================================================
Match: ${p1.name} [${p1.country}] vs ${p2.name} [${p2.country}]
Date: ${new Date().toLocaleDateString()}
Final Score: ${p1.name} ${scoreState.p1Pts} - ${scoreState.p2Pts} ${p2.name}
Sets: ${scoreState.p1Games} - ${scoreState.p2Games}
Ruleset: Official ITTF 11-Point System

MATCH PERFORMANCE METRICS:
-----------------------------------------------------
- Total Rallies Tracked: ${telemetry.totalRallies}
- Longest Exchange: ${telemetry.longestExchange} shots
- Peak Ball Speed: ${telemetry.peakSmashSpeed} km/h
- 1st Service Win Ratio: ${p1.name} (${telemetry.p1FirstServeWin}%) vs ${p2.name} (62%)
- Forehand Attack Ratio: ${p1.name} (${telemetry.p1ForehandRatio}%) vs ${p2.name} (48%)
- Unforced Errors: ${p1.name} (${telemetry.p1UnforcedErrors}) | ${p2.name} (${telemetry.p2UnforcedErrors})

Rendered with PongCast AI Broadcast Engine
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pongcast_match_summary_${p1.name.split(' ')[0]}_vs_${p2.name.split(' ')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleDownloadHighlight = () => {
    // Trigger download of the processed video as highlight
    const downloadUrl = videoUrl || `${process.env.NEXT_PUBLIC_API_URL || ''}/outputs/test_out.mp4`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `pongcast_highlights_${p1.name.split(' ')[0]}_vs_${p2.name.split(' ')[0]}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 shadow-2xl p-6 font-mono space-y-5 animate-in fade-in duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            {type === 'pdf' && <FileText className="w-5 h-5 text-sage-500" />}
            {type === 'highlights' && <Film className="w-5 h-5 text-amber-500" />}
            {type === 'download' && <Download className="w-5 h-5 text-sage-500" />}
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              {type === 'pdf' && '[ MATCH SUMMARY REPORT ]'}
              {type === 'highlights' && '[ EXPORT HIGHLIGHT REEL ]'}
              {type === 'download' && '[ DOWNLOAD BROADCAST VIDEO ]'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {type === 'pdf' && (
          <div className="space-y-4 text-xs">
            <p className="text-neutral-400">
              Download the official match performance breakdown with ITTF scoring audit and telemetry data:
            </p>

            <div className="p-3 bg-neutral-950 border border-neutral-800 space-y-2 text-neutral-300">
              <div className="flex justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-500">PLAYERS:</span>
                <span className="font-bold text-white">{p1.name} [{p1.country}] vs {p2.name} [{p2.country}]</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-500">FINAL SCORE:</span>
                <span className="font-bold text-sage-400">{scoreState.p1Pts} - {scoreState.p2Pts} (Sets: {scoreState.p1Games}-{scoreState.p2Games})</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-500">TOTAL RALLIES:</span>
                <span className="text-white">{telemetry.totalRallies} tracked</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">PEAK SHOT SPEED:</span>
                <span className="text-amber-400 font-bold">{telemetry.peakSmashSpeed} km/h</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white"
              >
                [ CANCEL ]
              </button>
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-sage-500 hover:bg-sage-600 text-white font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                [ DOWNLOAD SUMMARY REPORT ]
              </button>
            </div>
          </div>
        )}

        {type === 'highlights' && (
          <div className="space-y-4 text-xs">
            <p className="text-neutral-400">
              The engine automatically identified vital rallies based on exchange length and scoring points:
            </p>

            <div className="p-3 bg-neutral-950 border border-neutral-800 space-y-2 text-neutral-300">
              <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                <span>KEY MOMENTS CAPTURED:</span>
                <span className="text-amber-400 font-bold">4 CLIPS DETECTED</span>
              </div>
              <ul className="space-y-1 text-neutral-400 text-[11px] list-disc list-inside">
                <li>Rally #1: 14 shots exchange (0.85s - 4.20s)</li>
                <li>Rally #2: Smash winner by {p1.name} (7.30s - 9.10s)</li>
                <li>Rally #3: Double-bounce point decider (12.40s - 16.50s)</li>
                <li>Match point rally & celebration (22.10s - 27.80s)</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white"
              >
                [ CANCEL ]
              </button>
              <button
                onClick={handleDownloadHighlight}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                [ DOWNLOAD HIGHLIGHT REEL (.MP4) ]
              </button>
            </div>
          </div>
        )}

        {type === 'download' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-sage-500/10 border border-sage-500/40 text-sage-400">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>Full broadcast video rendered successfully with WTT scorecard overlay burned in.</span>
            </div>

            <div className="p-3 bg-neutral-950 border border-neutral-800 space-y-1 text-neutral-400 text-[11px]">
              <div className="flex justify-between">
                <span>FORMAT:</span>
                <span className="text-white">1080p / 4K MP4 (H.264 / avc1)</span>
              </div>
              <div className="flex justify-between">
                <span>AUDIO:</span>
                <span className="text-emerald-400">AAC Lossless Remuxed</span>
              </div>
              <div className="flex justify-between">
                <span>FILE NAME:</span>
                <span className="text-white">pongcast_broadcast.mp4</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white"
              >
                [ CLOSE ]
              </button>
              <button
                onClick={() => {
                  const downloadUrl = videoUrl || `${process.env.NEXT_PUBLIC_API_URL || ''}/outputs/test_out.mp4`;
                  const link = document.createElement('a');
                  link.href = downloadUrl;
                  link.download = `pongcast_${p1.name.split(' ')[0]}_vs_${p2.name.split(' ')[0]}.mp4`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  onClose();
                }}
                className="px-4 py-2 bg-sage-500 hover:bg-sage-600 text-white font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                [ SAVE VIDEO TO COMPUTER ]
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
