export type ActiveMode = 'full' | 'ingest' | 'pipeline' | 'broadcast';

export interface PlayerConfig {
  name: string;
  country: string;
  countryName: string;
}

export interface PipelineStage {
  id: number;
  title: string;
  subtitle: string;
  model: string;
  status: 'COMPLETED' | 'IN PROCESS' | 'QUEUED';
  progress: number;
  duration?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'TRAJECTORY' | 'BOUNCE' | 'SCORE' | 'SUCCESS' | 'ERROR';
  message: string;
}

export interface MatchTelemetry {
  totalRallies: number;
  longestExchange: number;
  peakSmashSpeed: number; // km/h
  edgeCalls: number;
  letCalls: number;
  p1FirstServeWin: number; // percentage
  p1ForehandRatio: number; // percentage
  p1UnforcedErrors: number;
  p2FirstServeWin: number;
  p2ForehandRatio: number;
  p2UnforcedErrors: number;
}
