'use client';

import React, { useState } from 'react';
import { DropZone } from './DropZone';
import { PlayerConfig } from './types';
import { Play, UserCheck, Sparkles } from 'lucide-react';

interface IngestSectionProps {
  onStartEngine: (
    file: File | null,
    isSample: boolean,
    p1: PlayerConfig,
    p2: PlayerConfig,
    initialServer: number,
    enableUpscale: boolean
  ) => void;
  isProcessing: boolean;
}

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'DE', name: 'Germany' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'Great Britain' },
  { code: 'US', name: 'United States' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SE', name: 'Sweden' },
  { code: 'BR', name: 'Brazil' },
];

export const IngestSection: React.FC<IngestSectionProps> = ({
  onStartEngine,
  isProcessing,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSample, setIsSample] = useState<boolean>(false);

  // Player configurations matching CLI inputs
  const [p1Name, setP1Name] = useState<string>('Player-1');
  const [p1Country, setP1Country] = useState<string>('NG');

  const [p2Name, setP2Name] = useState<string>('Player-2');
  const [p2Country, setP2Country] = useState<string>('DE');

  const [initialServer, setInitialServer] = useState<number>(1);
  const [enableUpscale, setEnableUpscale] = useState<boolean>(false);

  const handleSelectSample = () => {
    setIsSample(true);
    setSelectedFile(null);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsSample(false);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setIsSample(false);
  };

  const hasVideo = selectedFile !== null || isSample;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasVideo) return;

    const p1: PlayerConfig = {
      name: p1Name,
      country: p1Country,
      countryName: COUNTRIES.find((c) => c.code === p1Country)?.name || p1Country,
    };
    const p2: PlayerConfig = {
      name: p2Name,
      country: p2Country,
      countryName: COUNTRIES.find((c) => c.code === p2Country)?.name || p2Country,
    };

    onStartEngine(selectedFile, isSample, p1, p2, initialServer, enableUpscale);
  };

  return (
    <section className="w-full max-w-[1920px] mx-auto p-4 md:p-6 space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <div>
          <h2 className="font-mono text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-sage-500"></span>
            SECTION 01 — UPLOAD FOOTAGE & SET PLAYERS
          </h2>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Select raw match video and enter player details to generate your broadcast overlay.
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-sage-600 dark:text-sage-400 border border-sage-500/40 px-2 py-1 bg-sage-500/10">
          [ STEP 1 ]
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Video Ingest DropZone */}
        <div className="lg:col-span-7 space-y-4 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
            <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              1. MATCH VIDEO SOURCE
            </span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase">
              RAW MATCH FOOTAGE
            </span>
          </div>

          <DropZone
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            onSelectSample={handleSelectSample}
            onClearFile={handleClearFile}
            isSample={isSample}
          />
        </div>

        {/* Right 5 Cols: Player & Match Configuration */}
        <div className="lg:col-span-5 space-y-4 bg-white dark:bg-brand-surface border border-neutral-200 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
            <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-sage-500" />
              2. PLAYER DETAILS & SETUP
            </span>
            <span className="font-mono text-[10px] text-sage-500 uppercase font-bold">
              [ ITTF RULES ]
            </span>
          </div>

          <div className="space-y-3">
            {/* Player 1 */}
            <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-sage-600 dark:text-sage-400 uppercase">PLAYER 1 (LEFT SIDE)</span>
                <span className="text-[10px] text-neutral-500">[ SERVING FIRST ]</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] text-neutral-500 mb-1">PLAYER NAME</label>
                  <input
                    type="text"
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 bg-white dark:bg-brand-surface border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono text-xs focus:border-sage-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-neutral-500 mb-1">COUNTRY</label>
                  <select
                    value={p1Country}
                    onChange={(e) => setP1Country(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-brand-surface border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono text-xs focus:border-sage-500 outline-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Player 2 */}
            <div className="p-3 bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">PLAYER 2 (RIGHT SIDE)</span>
                <span className="text-[10px] text-neutral-500">[ RECEIVING ]</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] text-neutral-500 mb-1">PLAYER NAME</label>
                  <input
                    type="text"
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 bg-white dark:bg-brand-surface border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono text-xs focus:border-sage-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-neutral-500 mb-1">COUNTRY</label>
                  <select
                    value={p2Country}
                    onChange={(e) => setP2Country(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-brand-surface border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono text-xs focus:border-sage-500 outline-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Server & Resolution Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs pt-1">
              <div className="p-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <label className="block text-[10px] text-neutral-500 mb-1">INITIAL SERVER</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="server"
                      checked={initialServer === 1}
                      onChange={() => setInitialServer(1)}
                      className="accent-sage-500"
                    />
                    <span>{p1Name.split(' ')[0] || 'Player 1'}</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="server"
                      checked={initialServer === 2}
                      onChange={() => setInitialServer(2)}
                      className="accent-sage-500"
                    />
                    <span>{p2Name.split(' ')[0] || 'Player 2'}</span>
                  </label>
                </div>
              </div>

              <div className="p-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <label className="block text-[10px] text-neutral-500 mb-1">OUTPUT ENHANCEMENT</label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sage-500" />
                    High Quality 4K
                  </span>
                  <input
                    type="checkbox"
                    checked={enableUpscale}
                    onChange={(e) => setEnableUpscale(e.target.checked)}
                    className="accent-sage-500 w-3.5 h-3.5"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!hasVideo || isProcessing}
              className={`w-full py-3 px-4 font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                !hasVideo
                  ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                  : isProcessing
                  ? 'bg-amber-600 text-white cursor-not-allowed border border-amber-500'
                  : 'bg-sage-500 hover:bg-sage-600 text-white border border-sage-600 shadow-md'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              {isProcessing
                ? '[ RUNNING BROADCAST ENGINE... ]'
                : !hasVideo
                ? '[ SELECT MATCH VIDEO FIRST ]'
                : '[ START BROADCAST ENGINE ]'}
            </button>
          </div>

        </div>

      </form>
    </section>
  );
};
