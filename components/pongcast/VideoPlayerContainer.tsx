'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Eye, Sparkles, Layers } from 'lucide-react';
import { PlayerConfig } from './types';

interface VideoPlayerContainerProps {
  p1: PlayerConfig;
  p2: PlayerConfig;
  scoreState: {
    p1Pts: number;
    p2Pts: number;
    p1Games: number;
    p2Games: number;
    server: number;
  };
  scoreTheme: 'WTT' | 'ITTF';
}

export const VideoPlayerContainer: React.FC<VideoPlayerContainerProps> = ({
  p1,
  p2,
  scoreState,
  scoreTheme,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(14.2);
  const duration = 30.0;
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'split' | 'processed' | 'raw'>('split');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 0.1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const seekRelative = (delta: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + delta)));
  };

  return (
    <div className="bg-brand-surface dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 p-4 space-y-4">
      
      {/* Player Header & View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sage-500" />
          <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            DUAL-STREAM SYNCHRONIZED INSPECTOR
          </span>
        </div>

        {/* View mode toggle tabs */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab('split')}
            className={`px-3 py-1 font-bold ${
              activeTab === 'split'
                ? 'bg-sage-500 text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-white'
            }`}
          >
            [ SPLIT VIEW ]
          </button>
          <button
            onClick={() => setActiveTab('processed')}
            className={`px-3 py-1 font-bold ${
              activeTab === 'processed'
                ? 'bg-sage-500 text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-white'
            }`}
          >
            [ PONGCAST BROADCAST ]
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1 font-bold ${
              activeTab === 'raw'
                ? 'bg-sage-500 text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-white'
            }`}
          >
            [ RAW FOOTAGE ]
          </button>
        </div>
      </div>

      {/* Main Video Screen Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        
        {/* Left Screen: RAW FOOTAGE */}
        {(activeTab === 'split' || activeTab === 'raw') && (
          <div className="relative aspect-video bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between p-3 select-none">
            {/* Simulated Raw Camera Feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-neutral-950 to-zinc-900 flex items-center justify-center opacity-90">
              {/* Simulated ping pong table outline */}
              <div className="w-[75%] h-[55%] border-2 border-neutral-700 relative transform rotate-x-12 perspective-500 flex items-center justify-center">
                <div className="w-[2px] h-full bg-neutral-600"></div>
              </div>
            </div>

            {/* Top Bar Overlay */}
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-neutral-400 bg-neutral-900/80 px-2 py-1 border border-neutral-800">
              <span className="font-bold text-white flex items-center gap-1">
                <Eye className="w-3 h-3 text-neutral-400" />
                RAW FOOTAGE (UNPROCESSED)
              </span>
              <span>1080p @ 60FPS • SHUTTER 1/1000s • ISO 400</span>
            </div>

            {/* Simulated Player Bounding Box (Raw view) */}
            <div className="absolute top-[28%] left-[22%] w-[16%] h-[40%] border border-emerald-500/50 flex flex-col justify-between p-1 font-mono text-[9px] text-emerald-400">
              <span>YOLO_P1</span>
            </div>
            <div className="absolute top-[28%] right-[22%] w-[16%] h-[40%] border border-amber-500/50 flex flex-col justify-between p-1 font-mono text-[9px] text-amber-400">
              <span>YOLO_P2</span>
            </div>

            {/* Bottom Metadata */}
            <div className="relative z-10 font-mono text-[10px] text-neutral-400 bg-neutral-900/80 px-2 py-1 border border-neutral-800 flex justify-between">
              <span>INPUT STREAM: test_clip_2.mov</span>
              <span className="text-amber-400 font-bold">UNFILTERED AUDIO</span>
            </div>
          </div>
        )}

        {/* Right Screen: PONGCAST BROADCAST (PROCESSED WITH OVERLAYS) */}
        {(activeTab === 'split' || activeTab === 'processed') && (
          <div className="relative aspect-video bg-neutral-950 border border-sage-500/60 overflow-hidden flex flex-col justify-between p-3 select-none">
            {/* Simulated Processed Broadcast Feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-zinc-900 to-black flex items-center justify-center opacity-95">
              
              {/* Simulated Court & Net */}
              <div className="w-[80%] h-[60%] border-2 border-cyan-500/40 relative flex items-center justify-center">
                {/* Net */}
                <div className="w-[3px] h-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>

                {/* Glowing Trajectory Arc */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 60 120 Q 180 20 300 130 T 420 80"
                    fill="none"
                    stroke="cyan"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                    className="animate-pulse"
                  />
                  <circle cx="300" cy="130" r="6" fill="#00ffff" />
                  <circle cx="300" cy="130" r="10" fill="none" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Top Bar Header */}
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-sage-400 bg-neutral-900/90 px-2 py-1 border border-sage-500/40">
              <span className="font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sage-400" />
                PONGCAST BROADCAST STREAM
              </span>
              <span className="text-sage-400 font-bold">[ WTT ENGINE OVERLAY ACTIVE ]</span>
            </div>

            {/* WTT BROADCAST SCORECARD OVERLAY (BURNED IN TOP LEFT) */}
            <div className="relative z-20 top-2 left-2 w-[220px] bg-neutral-900/90 border border-neutral-700 shadow-2xl p-2 font-mono text-xs space-y-1">
              
              {/* Row 1: Player 1 */}
              <div className="flex items-center justify-between bg-neutral-800/80 px-2 py-1 border-l-4 border-sage-500">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${scoreState.server === 1 ? 'bg-sage-400 animate-pulse' : 'bg-neutral-600'}`}></span>
                  <span className="px-1 bg-neutral-700 text-[10px] text-white font-bold">{p1.country}</span>
                  <span className="font-bold text-white uppercase truncate max-w-[90px]">{p1.name}</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-neutral-400">{scoreState.p1Games}</span>
                  <span className="text-sage-400 text-sm bg-neutral-950 px-1.5 py-0.5">{scoreState.p1Pts}</span>
                </div>
              </div>

              {/* Row 2: Player 2 */}
              <div className="flex items-center justify-between bg-neutral-800/80 px-2 py-1 border-l-4 border-amber-500">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${scoreState.server === 2 ? 'bg-amber-400 animate-pulse' : 'bg-neutral-600'}`}></span>
                  <span className="px-1 bg-neutral-700 text-[10px] text-white font-bold">{p2.country}</span>
                  <span className="font-bold text-white uppercase truncate max-w-[90px]">{p2.name}</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-neutral-400">{scoreState.p2Games}</span>
                  <span className="text-amber-400 text-sm bg-neutral-950 px-1.5 py-0.5">{scoreState.p2Pts}</span>
                </div>
              </div>

            </div>

            {/* Bottom Metadata Bar */}
            <div className="relative z-10 font-mono text-[10px] text-neutral-400 bg-neutral-900/90 px-2 py-1 border border-neutral-800 flex justify-between">
              <span className="text-emerald-400 font-bold">REMUXED LOSSLESS AAC AUDIO</span>
              <span className="text-sage-400 font-bold">H.264 HIGH BITRATE (avc1)</span>
            </div>
          </div>
        )}

      </div>

      {/* Video Control Bar */}
      <div className="p-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-2 font-mono text-xs">
        
        {/* Scrubber Bar */}
        <div className="flex items-center gap-3">
          <span className="text-neutral-500 text-[11px] tabular-nums font-bold w-10">
            {currentTime.toFixed(1)}s
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
            className="flex-1 accent-sage-500 cursor-pointer h-1.5 bg-neutral-300 dark:bg-neutral-700"
          />
          <span className="text-neutral-500 text-[11px] tabular-nums font-bold w-10">
            {duration.toFixed(1)}s
          </span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="px-3 py-1.5 bg-sage-500 hover:bg-sage-600 text-white font-bold flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? '[ PAUSE ]' : '[ PLAY ]'}</span>
            </button>

            <button
              onClick={() => seekRelative(-1)}
              className="px-2.5 py-1.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 border border-neutral-300 dark:border-neutral-700 font-bold"
            >
              [ -1s ]
            </button>

            <button
              onClick={() => seekRelative(1)}
              className="px-2.5 py-1.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-500 border border-neutral-300 dark:border-neutral-700 font-bold"
            >
              [ +1s ]
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-neutral-500 text-[11px]">LOOP STREAM: ENABLED</span>
          </div>
        </div>

      </div>

    </div>
  );
};
