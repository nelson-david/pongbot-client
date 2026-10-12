'use client';

import React from 'react';
import { PlayerConfig, MatchTelemetry } from './types';
import { ExportBar } from './ExportBar';
import { Tv, Activity, Zap, Flame, Shield, BarChart3, CheckCircle2 } from 'lucide-react';

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
  if (!hasProcessed) {
    return (
      <section className="w-full max-w-[1920px] mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div>
            <h2 className="font-mono text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-sage-500"></span>
              SECTION 03 — BROADCAST RESULTS
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
            Start the broadcast engine in Section 01 to generate match telemetry and the broadcast video output.
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
            SECTION 03 — BROADCAST RESULTS
          </h2>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Match telemetry statistics and broadcast video export.
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-sage-600 dark:text-sage-400 border border-sage-500/40 px-2 py-1 bg-sage-500/10">
          [ STEP 3 ]
        </span>
      </div>

      {/* Match Result Banner */}
      <div className="p-5 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sage-500" />
            <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              MATCH RESULT
            </span>
          </div>
          <span className="font-mono text-[10px] text-sage-500 font-bold">[ ITTF VERIFIED ]</span>
        </div>

        <div className="flex items-center justify-center gap-8 py-4">
          {/* Player 1 */}
          <div className="text-center space-y-1">
            <span className="font-mono text-[10px] text-neutral-500 block">{p1.country}</span>
            <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase">{p1.name}</span>
          </div>

          {/* Score */}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-4xl font-bold text-neutral-900 dark:text-white tabular-nums">
              {scoreState.p1Games}
            </span>
            <span className="font-mono text-lg text-neutral-400">—</span>
            <span className="font-mono text-4xl font-bold text-neutral-900 dark:text-white tabular-nums">
              {scoreState.p2Games}
            </span>
          </div>

          {/* Player 2 */}
          <div className="text-center space-y-1">
            <span className="font-mono text-[10px] text-neutral-500 block">{p2.country}</span>
            <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase">{p2.name}</span>
          </div>
        </div>

        <div className="text-center font-mono text-[10px] text-neutral-500">
          CURRENT SET: {scoreState.p1Pts} — {scoreState.p2Pts} • SERVER: {scoreState.server === 1 ? p1.name : p2.name}
        </div>
      </div>

      {/* Key Metric Grid Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        
        {/* Total Rallies */}
        <div className="p-4 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1.5">
            TOTAL RALLIES
          </span>
          <div className="font-mono text-2xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.totalRallies}</span>
            <Activity className="w-4 h-4 text-sage-500" />
          </div>
          <span className="font-mono text-[9px] text-sage-500 block mt-1">[ 100% AUTOMATED ]</span>
        </div>

        {/* Longest Exchange */}
        <div className="p-4 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1.5">
            LONGEST EXCHANGE
          </span>
          <div className="font-mono text-2xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.longestExchange} <span className="text-xs font-normal text-neutral-400">shots</span></span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-mono text-[9px] text-amber-500 block mt-1">[ VITAL CLIP LOGGED ]</span>
        </div>

        {/* Peak Smash Speed */}
        <div className="p-4 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1.5">
            PEAK SMASH SPEED
          </span>
          <div className="font-mono text-2xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.peakSmashSpeed} <span className="text-xs font-normal text-neutral-400">km/h</span></span>
            <Zap className="w-4 h-4 text-yellow-500" />
          </div>
          <span className="font-mono text-[9px] text-sage-500 block mt-1">[ CV BALL VELOCITY ]</span>
        </div>

        {/* Edge / Let Calls */}
        <div className="p-4 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1.5">
            EDGE / NET CALLS
          </span>
          <div className="font-mono text-2xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.edgeCalls} / {telemetry.letCalls}</span>
            <Shield className="w-4 h-4 text-sky-500" />
          </div>
          <span className="font-mono text-[9px] text-neutral-500 block mt-1">[ ITTF RULE RULED ]</span>
        </div>
      </div>

      {/* Advanced Match Analytics */}
      <div className="p-5 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-sage-500" />
            ADVANCED MATCH ANALYTICS
          </span>
          <span className="font-mono text-[10px] text-neutral-500">[ STATS ENGINE ]</span>
        </div>

        {/* 1st Serve Win Ratio */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
            <span>1ST SERVICE WIN %</span>
            <span className="font-bold text-sage-500">{telemetry.p1FirstServeWin}% vs {telemetry.p2FirstServeWin}%</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 flex">
            <div className="h-full bg-sage-500" style={{ width: `${telemetry.p1FirstServeWin}%` }}></div>
            <div className="h-full bg-amber-500" style={{ width: `${100 - telemetry.p1FirstServeWin}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>{p1.name}: {telemetry.p1FirstServeWin}%</span>
            <span>{p2.name}: {telemetry.p2FirstServeWin}%</span>
          </div>
        </div>

        {/* Forehand Attack Ratio */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
            <span>FOREHAND ATTACK RATIO</span>
            <span className="font-bold text-amber-500">{telemetry.p1ForehandRatio}% vs {telemetry.p2ForehandRatio}%</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 flex">
            <div className="h-full bg-sage-500" style={{ width: `${telemetry.p1ForehandRatio}%` }}></div>
            <div className="h-full bg-amber-500" style={{ width: `${100 - telemetry.p1ForehandRatio}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>{p1.name}: {telemetry.p1ForehandRatio}%</span>
            <span>{p2.name}: {telemetry.p2ForehandRatio}%</span>
          </div>
        </div>

        {/* Unforced Errors */}
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center font-mono text-xs">
          <span className="text-neutral-500">UNFORCED ERRORS:</span>
          <div className="flex gap-4">
            <span className="text-neutral-900 dark:text-white font-bold">{p1.name}: {telemetry.p1UnforcedErrors}</span>
            <span className="text-neutral-900 dark:text-white font-bold">{p2.name}: {telemetry.p2UnforcedErrors}</span>
          </div>
        </div>
      </div>

      {/* Download Bar */}
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
