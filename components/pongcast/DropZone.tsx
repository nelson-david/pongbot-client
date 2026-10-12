'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle, FileVideo, X } from 'lucide-react';

interface DropZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onSelectSample: () => void;
  onClearFile: () => void;
  isSample: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  selectedFile,
  onFileSelect,
  onSelectSample,
  onClearFile,
  isSample,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB limit
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndSelectFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMessage(
        `FILE EXCEEDS MAXIMUM SIZE: ${fileSizeMB} MB uploaded. Limit is 100 MB.`
      );
      return;
    }
    setErrorMessage(null);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const hasVideo = selectedFile !== null || isSample;

  return (
    <div className="space-y-4">
      {/* Drag & Drop Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative p-8 md:p-10 border border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer bg-white dark:bg-brand-surface ${
          isDragging
            ? 'border-sage-500 bg-sage-50/50 dark:bg-sage-950/20'
            : hasVideo
            ? 'border-sage-500/80 bg-neutral-100/70 dark:bg-neutral-900/40'
            : 'border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
        }`}
      >
        <input
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {hasVideo ? (
          <div className="flex flex-col items-center gap-3 py-3 relative z-10">
            <div className="w-12 h-12 bg-sage-500/20 border border-sage-500 flex items-center justify-center text-sage-500">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {isSample ? 'test_clip_2.mov' : selectedFile?.name}
              </p>
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {isSample
                  ? '1080p @ 60FPS • 23.4 MB • READY FOR BROADCAST PROCESSING'
                  : `${(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB • FILE LOADED`}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-1 bg-sage-500 text-white font-mono text-[11px] font-bold tracking-widest uppercase">
                [ VIDEO LOADED ]
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearFile();
                }}
                className="p-1 bg-neutral-800 hover:bg-rose-900/60 text-neutral-400 hover:text-rose-300 border border-neutral-700 transition-colors"
                title="Remove video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                UPLOAD MATCH FOOTAGE
              </p>
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Drag & drop video file or browse from local storage (.mp4, .mov)
              </p>
              <p className="font-mono text-[10px] text-sage-600 dark:text-sage-400 mt-1.5 font-bold tracking-wider">
                MAXIMUM FILE SIZE: 100 MB
              </p>
            </div>
            <button type="button" className="mt-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-semibold hover:border-sage-500 transition-colors">
              [ CHOOSE FILE ]
            </button>
          </div>
        )}
      </div>

      {/* File Size Error Alert */}
      {errorMessage && (
        <div className="p-3 bg-rose-950/40 border border-rose-800/80 text-rose-300 font-mono text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-500 shrink-0"></span>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Preset Sample Trigger Button */}
      {!hasVideo && (
        <div className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <FileVideo className="w-4 h-4 text-sage-500" />
            <span className="font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400">
              NO VIDEO YET? TRY DEMO FOOTAGE:
            </span>
          </div>
          <button
            type="button"
            onClick={onSelectSample}
            className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-sage-500 hover:text-white text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold border border-neutral-300 dark:border-neutral-700 transition-all"
          >
            [ LOAD DEMO CLIP (30s) ]
          </button>
        </div>
      )}
    </div>
  );
};
