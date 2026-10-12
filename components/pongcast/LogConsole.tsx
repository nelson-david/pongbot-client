'use client';

import React, { useEffect, useRef } from 'react';
import { LogEntry } from './types';
import { Terminal, Copy, Trash2 } from 'lucide-react';

interface LogConsoleProps {
  logs: LogEntry[];
  onClearLogs?: () => void;
}

export const LogConsole: React.FC<LogConsoleProps> = ({ logs, onClearLogs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'INFO':
        return 'text-sky-400';
      case 'TRAJECTORY':
        return 'text-amber-400';
      case 'BOUNCE':
        return 'text-purple-400';
      case 'SCORE':
        return 'text-sage-400 font-bold';
      case 'SUCCESS':
        return 'text-emerald-400 font-bold';
      case 'ERROR':
        return 'text-rose-400 font-bold';
      default:
        return 'text-neutral-400';
    }
  };

  const copyToClipboard = () => {
    const text = logs.map((l) => `[${l.timestamp}] [${l.level}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300 flex flex-col h-[360px] select-text">
      
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-sage-500" />
          <span className="font-bold text-white uppercase tracking-wider">
            TERMINAL LOG STREAM
          </span>
          <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] text-sage-400">
            STDOUT / STDERR
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
            title="Copy Logs"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {onClearLogs && (
            <button
              onClick={onClearLogs}
              className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
              title="Clear Console"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Log Lines Area */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 font-mono text-[11px] leading-relaxed">
        {logs.length === 0 ? (
          <div className="text-neutral-600 italic py-4">
            [ ENGINE IDLE — AWAITING INGESTION STREAM ]
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 hover:bg-neutral-900/60 p-0.5">
              <span className="text-neutral-500 shrink-0 select-none">[{log.timestamp}]</span>
              <span className={`shrink-0 font-bold ${getLevelColor(log.level)}`}>
                [{log.level}]
              </span>
              <span className="text-neutral-200 break-all">{log.message}</span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Console Footer */}
      <div className="pt-2 border-t border-neutral-900 mt-2 flex items-center justify-between text-[10px] text-neutral-500">
        <span>STREAMING 60FPS TELEMETRY METRICS</span>
        <span className="text-sage-500 animate-pulse">● LIVE CONNECTION</span>
      </div>

    </div>
  );
};
