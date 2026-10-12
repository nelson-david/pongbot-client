'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/pongcast/Navbar';
import { SystemTicker } from '@/components/pongcast/SystemTicker';
import { IngestSection } from '@/components/pongcast/IngestSection';
import { PipelineSection } from '@/components/pongcast/PipelineSection';
import { BroadcastSection } from '@/components/pongcast/BroadcastSection';
import { ActiveMode, PlayerConfig, PipelineStage, LogEntry, MatchTelemetry } from '@/components/pongcast/types';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<ActiveMode>('ingest');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasProcessed, setHasProcessed] = useState<boolean>(false);
  const [hasJobStarted, setHasJobStarted] = useState<boolean>(false);
  const [videoName, setVideoName] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  // Sync theme class to root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Player state
  const [p1, setP1] = useState<PlayerConfig>({
    name: 'Player 1',
    country: 'NG',
    countryName: 'Nigeria',
  });

  const [p2, setP2] = useState<PlayerConfig>({
    name: 'Player 2',
    country: 'DE',
    countryName: 'Germany',
  });

  const [scoreState, setScoreState] = useState({
    p1Pts: 0,
    p2Pts: 0,
    p1Games: 0,
    p2Games: 0,
    server: 1,
  });

  // Telemetry metrics
  const [telemetry, setTelemetry] = useState<MatchTelemetry>({
    totalRallies: 24,
    longestExchange: 14,
    peakSmashSpeed: 118.4,
    edgeCalls: 2,
    letCalls: 1,
    p1FirstServeWin: 78,
    p1ForehandRatio: 64,
    p1UnforcedErrors: 3,
    p2FirstServeWin: 62,
    p2ForehandRatio: 48,
    p2UnforcedErrors: 5,
  });

  // Pipeline execution state
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [eta, setEta] = useState<string>('00:00.0s');

  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Engine Execution Handler
  const handleStartEngine = useCallback(
    async (
      file: File | null,
      isSample: boolean,
      newP1: PlayerConfig,
      newP2: PlayerConfig,
      initialServer: number,
      enableUpscale: boolean
    ) => {
      const vName = isSample ? 'test_clip_2.mov' : file?.name || 'uploaded_match.mp4';
      setVideoName(vName);
      setP1(newP1);
      setP2(newP2);
      setScoreState({ p1Pts: 0, p2Pts: 0, p1Games: 0, p2Games: 0, server: initialServer });
      setIsProcessing(true);
      setHasProcessed(false);
      setHasJobStarted(true);
      setOverallProgress(5);
      setEta('00:08.5s');
      setActiveMode('pipeline'); // Switch to pipeline view to watch live stream

      // Initialize clean human-friendly pipeline stages
      setStages([
        {
          id: 1,
          title: 'PLAYER RECOGNITION & IDENTITY LOCK',
          subtitle: 'Identifies Player 1 and Player 2 across camera angles',
          model: 'Vision Engine',
          status: 'IN PROCESS',
          progress: 10,
        },
        {
          id: 2,
          title: 'BALL TRAJECTORY & BOUNCE SPOTTING',
          subtitle: 'Tracks high-speed ball motion and spots table bounces',
          model: 'Trajectory Tracker',
          status: 'QUEUED',
          progress: 0,
        },
        {
          id: 3,
          title: 'ITTF MATCH SCORING ENGINE',
          subtitle: 'Enforces 11-point game rules, deuce, and service rotation',
          model: 'Match Rules Engine',
          status: 'QUEUED',
          progress: 0,
        },
        {
          id: 4,
          title: 'WTT BROADCAST GRAPHICS & AUDIO MERGE',
          subtitle: enableUpscale ? 'Renders TV scoreboard, merges audio, and upscales to 4K' : 'Renders TV scorecard overlay and merges original match audio',
          model: enableUpscale ? 'Broadcast Engine (4K)' : 'Broadcast Engine',
          status: 'QUEUED',
          progress: 0,
        },
      ]);

      setLogs([]);

      try {
        const formData = new FormData();
        if (file) {
          formData.append('file', file);
        }
        formData.append('is_sample', isSample ? 'true' : 'false');
        formData.append('p1_name', newP1.name);
        formData.append('p1_country', newP1.country);
        formData.append('p2_name', newP2.name);
        formData.append('p2_country', newP2.country);
        formData.append('initial_server', initialServer.toString());
        formData.append('enable_upscale', enableUpscale ? 'true' : 'false');

        const response = await fetch(`${API_BASE}/api/process`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const chunks = buffer.split('\n\n');
            buffer = chunks.pop() || '';

            for (const chunk of chunks) {
              const trimmed = chunk.trim();
              if (!trimmed.startsWith('data: ')) continue;

              try {
                const payload = JSON.parse(trimmed.slice(6));

                if (payload.type === 'log') {
                  setLogs((prev) => [...prev, payload.log]);
                } else if (payload.type === 'progress') {
                  const pct = payload.progress;
                  setOverallProgress(pct);

                  setStages((s) => [
                    { ...s[0], status: pct >= 20 ? 'COMPLETED' : 'IN PROCESS', progress: Math.min(100, Math.max(10, pct * 5)) },
                    { ...s[1], status: pct >= 20 && pct < 70 ? 'IN PROCESS' : pct >= 70 ? 'COMPLETED' : 'QUEUED', progress: Math.max(0, Math.min(100, (pct - 20) * 2)) },
                    { ...s[2], status: pct >= 50 && pct < 90 ? 'IN PROCESS' : pct >= 90 ? 'COMPLETED' : 'QUEUED', progress: Math.max(0, Math.min(100, (pct - 50) * 2.5)) },
                    { ...s[3], status: pct >= 85 ? 'IN PROCESS' : 'QUEUED', progress: Math.max(0, Math.min(100, (pct - 85) * 6.6)) },
                  ]);

                  if (payload.score) {
                    setScoreState({
                      p1Pts: payload.score.p1_pts,
                      p2Pts: payload.score.p2_pts,
                      p1Games: payload.score.p1_games,
                      p2Games: payload.score.p2_games,
                      server: payload.score.server,
                    });
                  }
                } else if (payload.type === 'done') {
                  const res = payload.result;
                  setOverallProgress(100);
                  setEta('00:00.0s');
                  setIsProcessing(false);
                  setHasProcessed(true);
                  if (res.video_url) {
                    setVideoUrl(res.video_url);

                    // Automatically trigger direct download to user's device
                    try {
                      const downloadLink = document.createElement('a');
                      downloadLink.href = res.video_url;
                      downloadLink.download = `pongcast_${newP1.name.split(' ')[0]}_vs_${newP2.name.split(' ')[0]}_broadcast.mp4`;
                      document.body.appendChild(downloadLink);
                      downloadLink.click();
                      document.body.removeChild(downloadLink);
                    } catch (dlErr) {
                      console.warn('Auto-download error:', dlErr);
                    }
                  }
                  setStages((s) => s.map((st) => ({ ...st, status: 'COMPLETED', progress: 100 })));

                  if (res.score_state) {
                    setScoreState({
                      p1Pts: res.score_state.p1_pts,
                      p2Pts: res.score_state.p2_pts,
                      p1Games: res.score_state.p1_games,
                      p2Games: res.score_state.p2_games,
                      server: res.score_state.server,
                    });
                  }
                  if (res.telemetry) {
                    setTelemetry(res.telemetry);
                  }

                  // Automatically switch to Broadcast Suite view when done!
                  setActiveMode('broadcast');
                } else if (payload.type === 'error') {
                  const errorMsg = payload.error || 'Unknown processing error occurred in engine.';
                  console.error('Server processing error:', errorMsg);
                  setIsProcessing(false);
                  setHasProcessed(false);
                  setStages((s) =>
                    s.map((st) => (st.status === 'IN PROCESS' ? { ...st, status: 'QUEUED' } : st))
                  );
                  setLogs((prev) => [
                    ...prev,
                    {
                      id: Date.now().toString(),
                      timestamp: new Date().toTimeString().split(' ')[0],
                      level: 'ERROR',
                      message: `ENGINE ERROR: ${errorMsg}`,
                    },
                  ]);
                }
              } catch (parseErr) {
                console.error('Parse error on stream chunk', parseErr);
              }
            }
          }
          return;
        } else {
          // Response returned non-200 status code (e.g. 500, 413, 404)
          let serverErrMsg = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errJson = await response.json();
            if (errJson.error) serverErrMsg = errJson.error;
          } catch {
            // body was not JSON
          }
          console.error('Server request failed:', serverErrMsg);
          setIsProcessing(false);
          setLogs((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              timestamp: new Date().toTimeString().split(' ')[0],
              level: 'ERROR',
              message: `SERVER ERROR: ${serverErrMsg}`,
            },
          ]);
          return;
        }
      } catch (err: any) {
        console.error(`Backend server error at ${API_BASE}:`, err);
        setIsProcessing(false);
        setLogs((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            timestamp: new Date().toTimeString().split(' ')[0],
            level: 'ERROR',
            message: `NETWORK / SERVER ERROR: Could not connect to engine at ${API_BASE}. ${err?.message || ''}`,
          },
        ]);
        return;
      }

      // Fallback simulation if backend is unavailable
      let progressVal = 10;
      const interval = setInterval(() => {
        progressVal += 15;
        setOverallProgress(progressVal);

        const currentNow = new Date().toTimeString().split(' ')[0];

        if (progressVal === 40) {
          setStages((s) => [
            { ...s[0], status: 'COMPLETED', progress: 100 },
            { ...s[1], status: 'IN PROCESS', progress: 50 },
            s[2],
            s[3],
          ]);
          setLogs((l) => [
            ...l,
            { id: Date.now().toString(), timestamp: `${currentNow}.22`, level: 'TRAJECTORY', message: `Ball candidate locked. Tracking rally motion...` },
          ]);
        } else if (progressVal === 70) {
          setStages((s) => [
            s[0],
            { ...s[1], status: 'COMPLETED', progress: 100 },
            { ...s[2], status: 'IN PROCESS', progress: 75 },
            s[3],
          ]);
          setLogs((l) => [
            ...l,
            { id: Date.now().toString(), timestamp: `${currentNow}.45`, level: 'BOUNCE', message: `Table bounce spotted on Side 1` },
            { id: Date.now().toString(), timestamp: `${currentNow}.50`, level: 'SCORE', message: `Point scored! Score: ${newP1.name}=1, ${newP2.name}=0` },
          ]);
        } else if (progressVal >= 100) {
          clearInterval(interval);
          setOverallProgress(100);
          setEta('00:00.0s');
          setIsProcessing(false);
          setHasProcessed(true);
          setStages((s) => s.map((st) => ({ ...st, status: 'COMPLETED', progress: 100 })));
          setLogs((l) => [
            ...l,
            { id: Date.now().toString(), timestamp: `${currentNow}.99`, level: 'SUCCESS', message: `Broadcast output rendered successfully: main_clip.mp4` },
          ]);
          setActiveMode('broadcast');
        }
      }, 500);
    },
    []
  );

  const hasStarted = isProcessing || hasProcessed || hasJobStarted;

  return (
    <div className="min-h-screen bg-brand-lightBg text-neutral-900 dark:bg-brand-dark dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. Header & Navigation */}
      <Navbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isProcessing={isProcessing}
        hasStarted={hasStarted}
      />

      {/* 2. System Hardware Ticker (Only show if video uploaded or processing) */}
      {hasStarted && (
        <SystemTicker
          hasVideo={videoName !== ''}
          isProcessing={isProcessing}
          videoName={videoName}
        />
      )}

      {/* 3. Main Content Area */}
      <main className="flex-1 w-full pb-12">
        
        {/* INITIAL STATE: ONLY Section 01 is shown! Clean, simple, un-intimidating */}
        {!hasStarted && (
          <div className="pt-4">
            <IngestSection onStartEngine={handleStartEngine} isProcessing={isProcessing} />
          </div>
        )}

        {/* AFTER PROCESSING STARTS: User can navigate between sections */}
        {hasStarted && (
          <div className="pt-2">
            {activeMode === 'ingest' && (
              <IngestSection onStartEngine={handleStartEngine} isProcessing={isProcessing} />
            )}

            {activeMode === 'pipeline' && (
              <PipelineSection
                stages={stages}
                logs={logs}
                overallProgress={overallProgress}
                eta={eta}
                isProcessing={isProcessing}
                hasProcessed={hasProcessed}
                onNavigateToIngest={() => setActiveMode('ingest')}
              />
            )}

            {activeMode === 'broadcast' && (
              <BroadcastSection
                p1={p1}
                p2={p2}
                scoreState={scoreState}
                telemetry={telemetry}
                hasProcessed={hasProcessed}
                videoUrl={videoUrl}
                onNavigateToIngest={() => setActiveMode('ingest')}
              />
            )}
          </div>
        )}

      </main>

      {/* 4. Footer */}
      <footer className="w-full bg-white dark:bg-brand-surface border-t border-neutral-200 dark:border-neutral-800 py-4 px-6 font-mono text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 PONGCAST ENGINE // <Link href={"https://theurbandev.xyz"} target="_blank" className='underline text-sage-500'>DAVID OGWU-NELSON</Link></span>
        <div className="flex items-center gap-4">
          <span className="text-sage-500 font-bold">[ ITTF RULES VERIFIED ]</span>
          {/* <span>AUTOMATED BROADCAST ENGINE</span> */}
        </div>
      </footer>

    </div>
  );
}
