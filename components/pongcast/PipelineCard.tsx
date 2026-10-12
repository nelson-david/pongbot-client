'use client';

import React from 'react';
import { PipelineStage } from './types';
import { CheckCircle2, Loader2, Clock, Film } from 'lucide-react';

interface PipelineCardProps {
  stage: PipelineStage;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ stage }) => {
  const getStatusBadge = () => {
    switch (stage.status) {
      case 'COMPLETED':
        return (
          <span className="px-2 py-0.5 bg-sage-500/20 text-sage-600 dark:text-sage-400 border border-sage-500/40 font-mono text-[10px] font-bold tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-sage-500" />
            [ OK ] COMPLETED
          </span>
        );
      case 'IN PROCESS':
        return (
          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 animate-pulse">
            <Loader2 className="w-3 h-3 text-amber-500 animate-spin" />
            [ &gt;&gt; ] PROCESSING
          </span>
        );
      case 'QUEUED':
        return (
          <span className="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 font-mono text-[10px] font-bold tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-400" />
            [ -- ] QUEUED
          </span>
        );
    }
  };

  return (
    <div className={`p-4 bg-white dark:bg-brand-surface border transition-all ${
      stage.status === 'IN PROCESS'
        ? 'border-sage-500 shadow-sm bg-sage-50/50 dark:bg-sage-950/20'
        : 'border-neutral-200 dark:border-neutral-800'
    }`}>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono font-bold text-xs flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
            0{stage.id}
          </span>
          <h3 className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            {stage.title}
          </h3>
        </div>
        {getStatusBadge()}
      </div>

      <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2">
        {stage.subtitle}
      </p>

      <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 mb-1">
        <span className="flex items-center gap-1">
          <Film className="w-3 h-3 text-sage-500" />
          MODULE: <strong className="text-neutral-700 dark:text-neutral-300">{stage.model}</strong>
        </span>
        <span className="font-bold text-neutral-900 dark:text-white">{stage.progress}%</span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            stage.status === 'COMPLETED'
              ? 'bg-sage-500'
              : stage.status === 'IN PROCESS'
              ? 'bg-amber-500'
              : 'bg-neutral-600'
          }`}
          style={{ width: `${stage.progress}%` }}
        ></div>
      </div>
    </div>
  );
};
