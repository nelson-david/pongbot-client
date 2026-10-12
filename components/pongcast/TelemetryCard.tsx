'use client';

import React from 'react';
import { MatchTelemetry, PlayerConfig } from './types';
import { Activity, Zap, Flame, Shield, Award, BarChart3, Palette } from 'lucide-react';

interface TelemetryCardProps {
  telemetry: MatchTelemetry;
  p1: PlayerConfig;
  p2: PlayerConfig;
  scoreTheme: 'WTT' | 'ITTF';
  setScoreTheme: (theme: 'WTT' | 'ITTF') => void;
}

export const TelemetryCard: React.FC<TelemetryCardProps> = ({
  telemetry,
  p1,
  p2,
  scoreTheme,
  setScoreTheme,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Scorecard Overlay Theme Selector */}
      <div className="p-4 bg-brand-surface dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-sage-500" />
            BROADCAST OVERLAY THEME
          </span>
          <span className="font-mono text-[10px] text-sage-500 font-bold">[ PIL RENDERED ]</span>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <button
            onClick={() => setScoreTheme('WTT')}
            className={`py-2 px-3 font-bold border transition-all ${
              scoreTheme === 'WTT'
                ? 'bg-sage-500 text-white border-sage-600 shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-sage-500'
            }`}
          >
            [ WTT OFFICIAL ]
          </button>

          <button
            onClick={() => setScoreTheme('ITTF')}
            className={`py-2 px-3 font-bold border transition-all ${
              scoreTheme === 'ITTF'
                ? 'bg-sage-500 text-white border-sage-600 shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-sage-500'
            }`}
          >
            [ ITTF CLASSIC ]
          </button>
        </div>
      </div>

      {/* Key Metric Grid Cards */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Total Rallies */}
        <div className="p-3 bg-brand-surface dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
            TOTAL RALLIES
          </span>
          <div className="font-mono text-xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.totalRallies}</span>
            <Activity className="w-4 h-4 text-sage-500" />
          </div>
          <span className="font-mono text-[9px] text-sage-500 block mt-1">[ 100% AUTOMATED ]</span>
        </div>

        {/* Longest Exchange */}
        <div className="p-3 bg-brand-surface dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
            LONGEST EXCHANGE
          </span>
          <div className="font-mono text-xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.longestExchange} <span className="text-xs font-normal text-neutral-400">shots</span></span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-mono text-[9px] text-amber-500 block mt-1">[ VITAL CLIP LOGGED ]</span>
        </div>

        {/* Peak Smash Speed */}
        <div className="p-3 bg-brand-surface dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
            PEAK SMASH SPEED
          </span>
          <div className="font-mono text-xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.peakSmashSpeed} <span className="text-xs font-normal text-neutral-400">km/h</span></span>
            <Zap className="w-4 h-4 text-yellow-500" />
          </div>
          <span className="font-mono text-[9px] text-sage-500 block mt-1">[ CV BALL VELOCITY ]</span>
        </div>

        {/* Edge / Let Calls */}
        <div className="p-3 bg-brand-surface dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
            EDGE / NET CALLS
          </span>
          <div className="font-mono text-xl font-bold text-neutral-900 dark:text-white tabular-nums flex items-baseline justify-between">
            <span>{telemetry.edgeCalls} / {telemetry.letCalls}</span>
            <Shield className="w-4 h-4 text-sky-500" />
          </div>
          <span className="font-mono text-[9px] text-neutral-500 block mt-1">[ ITTF RULE RULED ]</span>
        </div>

      </div>

      {/* Set Breakdown & Performance Ratios */}
      <div className="p-4 bg-brand-surface dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-sage-500" />
            ADVANCED MATCH ANALYTICS
          </span>
          <span className="font-mono text-[10px] text-neutral-500">[ STATS ENGINE ]</span>
        </div>

        {/* Metric 1: 1st Serve Win Ratio */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
            <span>1ST SERVICE WIN %</span>
            <span className="font-bold text-sage-500">{telemetry.p1FirstServeWin}% vs 62%</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 flex">
            <div className="h-full bg-sage-500" style={{ width: `${telemetry.p1FirstServeWin}%` }}></div>
            <div className="h-full bg-amber-500" style={{ width: `${100 - telemetry.p1FirstServeWin}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>{p1.name.split(' ')[0]}: {telemetry.p1FirstServeWin}%</span>
            <span>{p2.name.split(' ')[0]}: 62%</span>
          </div>
        </div>

        {/* Metric 2: Forehand Attack Ratio */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
            <span>FOREHAND ATTACK RATIO</span>
            <span className="font-bold text-amber-500">{telemetry.p1ForehandRatio}% vs 48%</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 flex">
            <div className="h-full bg-sage-500" style={{ width: `${telemetry.p1ForehandRatio}%` }}></div>
            <div className="h-full bg-amber-500" style={{ width: `${100 - telemetry.p1ForehandRatio}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>{p1.name.split(' ')[0]}: {telemetry.p1ForehandRatio}%</span>
            <span>{p2.name.split(' ')[0]}: 48%</span>
          </div>
        </div>

        {/* Metric 3: Unforced Errors */}
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center font-mono text-xs">
          <span className="text-neutral-500">UNFORCED ERRORS:</span>
          <div className="flex gap-4">
            <span className="text-neutral-900 dark:text-white font-bold">{p1.name.split(' ')[0]}: {telemetry.p1UnforcedErrors}</span>
            <span className="text-neutral-900 dark:text-white font-bold">{p2.name.split(' ')[0]}: {telemetry.p2UnforcedErrors}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
