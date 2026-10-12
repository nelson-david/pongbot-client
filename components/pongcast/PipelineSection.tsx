'use client';

import React from 'react';
import { PipelineStage, LogEntry } from './types';
import { PipelineCard } from './PipelineCard';
import { LogConsole } from './LogConsole';
import { Activity, PlaySquare } from 'lucide-react';

interface PipelineSectionProps {
  stages: PipelineStage[];
  logs: LogEntry[];
  overallProgress: number;
  eta: string;
  isProcessing: boolean;
  hasProcessed: boolean;
  onNavigateToIngest?: () => void;
}

export const PipelineSection: React.FC<PipelineSectionProps> = ({
  stages,
  logs,
  overallProgress,
  eta,
  isProcessing,
  hasProcessed,
  onNavigateToIngest,
}) => {
  if (!hasProcessed && !isProcessing) {
    return (
      <section className="w-full max-w-[1920px] mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div>
            <h2 className="font-mono text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-sage-500"></span>
              SECTION 02 — PIPELINE EXECUTION STATE
            </h2>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Real-time multi-model computer vision pipeline tracking & ITTF scoring engine state.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-500 border border-neutral-700 px-2 py-1">
            [ IDLE ]
          </span>
        </div>

        <div className="p-12 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center space-y-3">
          <PlaySquare className="w-10 h-10 text-neutral-400 dark:text-neutral-600" />
          <h3 className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            NO ACTIVE PIPELINE JOB
          </h3>
          <p className="font-mono text-xs text-neutral-500 max-w-md">
            Upload a match video and configure player metadata in Section 01 to start the broadcast engine pipeline.
          </p>
          {onNavigateToIngest && (
            <button
              onClick={onNavigateToIngest}
              className="mt-2 px-4 py-2 bg-sage-500 text-white font-mono text-xs font-bold uppercase hover:bg-sage-600 transition-colors"
            >
              [ GO TO INGEST SECTION ]
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
            SECTION 02 — PIPELINE EXECUTION STATE & LOG STREAM
          </h2>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Real-time multi-model computer vision pipeline tracking, ITTF scoring state engine, and stream encoding.
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-sage-600 dark:text-sage-400 border border-sage-500/40 px-2 py-1 bg-sage-500/10">
          [ STEP 2 ]
        </span>
      </div>

      {/* Overall Progress Master Card */}
      <div className="p-4 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Activity className={`w-5 h-5 ${isProcessing ? 'text-sage-500 animate-spin' : 'text-neutral-400'}`} />
            <div>
              <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                COMPUTE STATUS: {overallProgress === 100 ? 'COMPLETE (100%)' : isProcessing ? 'INFERENCE ACTIVE' : 'STANDBY'}
              </span>
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                {overallProgress}% COMPLETE • ETA: {eta}
              </p>
            </div>
          </div>

          <div className="font-mono text-xs flex items-center gap-4">
            <span className="text-neutral-500">
              THROUGHPUT: <strong className="text-sage-500 tabular-nums">29.97 FPS</strong>
            </span>
          </div>
        </div>

        {/* Master Progress Bar */}
        <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 overflow-hidden border border-neutral-300 dark:border-neutral-700">
          <div
            className="h-full bg-sage-500 transition-all duration-300 relative"
            style={{ width: `${overallProgress}%` }}
          >
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Grid: 4 Stage Cards (Left 6) + Log Console (Right 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 4 Pipeline Stage Cards */}
        <div className="lg:col-span-6 space-y-3">
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
            PIPELINE STAGES & SUB-MODULES
          </span>
          <div className="grid grid-cols-1 gap-3">
            {stages.map((stage) => (
              <PipelineCard key={stage.id} stage={stage} />
            ))}
          </div>
        </div>

        {/* Real-time Terminal Log Console */}
        <div className="lg:col-span-6 space-y-3">
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
            SYSTEM TELEMETRY LOG CONSOLE
          </span>
          <LogConsole logs={logs} />
        </div>

      </div>

    </section>
  );
};
