import { attemptsToCsv } from './csv';
import { supabase, isSupabaseConfigured } from './supabase';
import type { GameAnswerRow, GameAttemptRow } from '../types/database';
import type { FeedbackType, Mode, PlayerProfile, Scenario, ScenarioOption, ScoreDelta, Scores } from '../types/game';

const LOCAL_ATTEMPTS_KEY = 'stv_local_game_attempts';
const LOCAL_ANSWERS_KEY = 'stv_local_game_answers';
const CURRENT_ATTEMPT_KEY = 'stv_current_attempt_id';
const PENDING_ANSWERS_KEY = 'stv_pending_answers';
const FINAL_REPORTS_KEY = 'stv_local_final_reports';

export interface CreateAttemptPayload {
  participantName: string;
  participantRole: string;
  mode: Mode;
  teamName?: string;
}

export interface SaveAnswerPayload {
  attemptId: string;
  scenarioId: string;
  stage: number;
  selectedOptionId: string;
  selectedOptionLabel: string;
  feedbackType: FeedbackType;
  scoreDelta: ScoreDelta;
  scoreAfter: Scores;
}

export interface CompleteAttemptPayload {
  scores: Scores;
  totalScore: number;
  rating: string;
  strongestArea: string;
  weakestArea: string;
  badge: string;
}

export async function createAttempt(payload: CreateAttemptPayload | PlayerProfile): Promise<GameAttemptRow> {
  const normalized = normalizeAttemptPayload(payload);
  if (supabase) {
    try {
      const { data, error } = await (supabase as any)
        .from('game_attempts')
        .insert({
          participant_name: normalized.participantName,
          participant_role: normalized.participantRole,
          mode: normalized.mode,
          team_name: normalized.teamName || null,
          status: 'in_progress',
        })
        .select()
        .single();
      if (error) throw error;
      const attempt = data as GameAttemptRow;
      localStorage.setItem(CURRENT_ATTEMPT_KEY, attempt.id);
      return attempt;
    } catch {
      return createLocalAttempt(normalized);
    }
  }
  return createLocalAttempt(normalized);
}

export async function saveAnswer(payload: SaveAnswerPayload): Promise<void>;
export async function saveAnswer(attemptId: string, scenario: Scenario, option: ScenarioOption, scores: Scores): Promise<void>;
export async function saveAnswer(
  payloadOrAttemptId: SaveAnswerPayload | string,
  scenario?: Scenario,
  option?: ScenarioOption,
  scores?: Scores,
): Promise<void> {
  const payload = typeof payloadOrAttemptId === 'string'
    ? normalizeAnswerPayload(payloadOrAttemptId, scenario!, option!, scores!)
    : payloadOrAttemptId;

  if (supabase) {
    try {
      const { error } = await (supabase as any).from('game_answers').insert({
        attempt_id: payload.attemptId,
        scenario_id: payload.scenarioId,
        stage: payload.stage,
        selected_option_id: payload.selectedOptionId,
        selected_option_label: payload.selectedOptionLabel,
        feedback_type: payload.feedbackType,
        score_delta: payload.scoreDelta,
        score_after: payload.scoreAfter,
      });
      if (error) throw error;
      return;
    } catch {
      enqueuePendingAnswer(payload);
      saveLocalAnswer(payload);
      return;
    }
  }

  saveLocalAnswer(payload);
}

export async function completeAttempt(attemptId: string, finalReport: CompleteAttemptPayload): Promise<void> {
  if (supabase) {
    try {
      const { error } = await (supabase as any)
        .from('game_attempts')
        .update({
          completed_at: new Date().toISOString(),
          total_score: finalReport.totalScore,
          security_score: finalReport.scores.security,
          operation_score: finalReport.scores.operation,
          compliance_score: finalReport.scores.compliance,
          recovery_score: finalReport.scores.recovery,
          rating: finalReport.rating,
          strongest_area: finalReport.strongestArea,
          weakest_area: finalReport.weakestArea,
          badge: finalReport.badge,
          status: 'completed',
        })
        .eq('id', attemptId);
      if (error) throw error;
      saveFinalReportCopy(attemptId, finalReport);
      return;
    } catch {
      completeLocalAttempt(attemptId, finalReport);
      return;
    }
  }

  completeLocalAttempt(attemptId, finalReport);
}

export async function getTrainerAttempts(): Promise<GameAttemptRow[]> {
  if (supabase) {
    const { data, error } = await (supabase as any).from('game_attempts').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as GameAttemptRow[];
  }
  return readLocalAttempts().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getTrainerAnswers(): Promise<GameAnswerRow[]> {
  if (supabase) {
    const { data, error } = await (supabase as any).from('game_answers').select('*').order('answered_at', { ascending: true });
    if (error) throw error;
    return (data || []) as GameAnswerRow[];
  }
  return readLocalAnswers().sort((a, b) => a.answered_at.localeCompare(b.answered_at));
}

export async function getAttemptDetail(attemptId: string): Promise<{ attempt: GameAttemptRow | null; answers: GameAnswerRow[] }> {
  const [attempts, answers] = await Promise.all([getTrainerAttempts(), getTrainerAnswers()]);
  return {
    attempt: attempts.find((attempt) => attempt.id === attemptId) || null,
    answers: answers.filter((answer) => answer.attempt_id === attemptId),
  };
}

export async function fetchTrainerData(): Promise<{ attempts: GameAttemptRow[]; answers: GameAnswerRow[] }> {
  const [attempts, answers] = await Promise.all([getTrainerAttempts(), getTrainerAnswers()]);
  return { attempts, answers };
}

export async function exportAttemptsToCSV(): Promise<string> {
  return attemptsToCsv(await getTrainerAttempts());
}

export function isUsingSupabase(): boolean {
  return isSupabaseConfigured;
}

function normalizeAttemptPayload(payload: CreateAttemptPayload | PlayerProfile): CreateAttemptPayload {
  if ('participantName' in payload) {
    return {
      participantName: payload.participantName,
      participantRole: payload.participantRole,
      mode: payload.mode,
      teamName: payload.teamName,
    };
  }
  return payload;
}

function normalizeAnswerPayload(attemptId: string, scenario: Scenario, option: ScenarioOption, scores: Scores): SaveAnswerPayload {
  return {
    attemptId,
    scenarioId: scenario.id,
    stage: scenario.stage,
    selectedOptionId: option.id,
    selectedOptionLabel: option.label,
    feedbackType: option.feedbackType,
    scoreDelta: option.scoreDelta,
    scoreAfter: scores,
  };
}

function createLocalAttempt(payload: CreateAttemptPayload): GameAttemptRow {
  const now = new Date().toISOString();
  const attempt: GameAttemptRow = {
    id: createId(),
    participant_name: payload.participantName,
    participant_role: payload.participantRole,
    mode: payload.mode,
    team_name: payload.teamName || null,
    started_at: now,
    completed_at: null,
    total_score: 0,
    security_score: 50,
    operation_score: 50,
    compliance_score: 50,
    recovery_score: 50,
    rating: null,
    strongest_area: null,
    weakest_area: null,
    badge: null,
    status: 'in_progress',
    created_at: now,
  };
  writeLocalAttempts([attempt, ...readLocalAttempts()]);
  localStorage.setItem(CURRENT_ATTEMPT_KEY, attempt.id);
  return attempt;
}

function saveLocalAnswer(payload: SaveAnswerPayload): void {
  const answer: GameAnswerRow = {
    id: createId(),
    attempt_id: payload.attemptId,
    scenario_id: payload.scenarioId,
    stage: payload.stage,
    selected_option_id: payload.selectedOptionId,
    selected_option_label: payload.selectedOptionLabel,
    feedback_type: payload.feedbackType,
    score_delta: payload.scoreDelta,
    score_after: payload.scoreAfter,
    answered_at: new Date().toISOString(),
  };
  writeLocalAnswers([...readLocalAnswers(), answer]);
}

function completeLocalAttempt(attemptId: string, finalReport: CompleteAttemptPayload): void {
  writeLocalAttempts(readLocalAttempts().map((attempt) => {
    if (attempt.id !== attemptId) return attempt;
    return {
      ...attempt,
      completed_at: new Date().toISOString(),
      total_score: finalReport.totalScore,
      security_score: finalReport.scores.security,
      operation_score: finalReport.scores.operation,
      compliance_score: finalReport.scores.compliance,
      recovery_score: finalReport.scores.recovery,
      rating: finalReport.rating,
      strongest_area: finalReport.strongestArea,
      weakest_area: finalReport.weakestArea,
      badge: finalReport.badge,
      status: 'completed' as const,
    };
  }));
  saveFinalReportCopy(attemptId, finalReport);
}

function enqueuePendingAnswer(payload: SaveAnswerPayload): void {
  localStorage.setItem(PENDING_ANSWERS_KEY, JSON.stringify([...readJson<SaveAnswerPayload[]>(PENDING_ANSWERS_KEY, []), payload]));
}

function saveFinalReportCopy(attemptId: string, finalReport: CompleteAttemptPayload): void {
  const copies = readJson<Array<CompleteAttemptPayload & { attemptId: string; savedAt: string }>>(FINAL_REPORTS_KEY, []);
  localStorage.setItem(FINAL_REPORTS_KEY, JSON.stringify([...copies, { ...finalReport, attemptId, savedAt: new Date().toISOString() }]));
}

function readLocalAttempts(): GameAttemptRow[] {
  return readJson<GameAttemptRow[]>(LOCAL_ATTEMPTS_KEY, []);
}

function writeLocalAttempts(attempts: GameAttemptRow[]): void {
  localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(attempts));
}

function readLocalAnswers(): GameAnswerRow[] {
  return readJson<GameAnswerRow[]>(LOCAL_ANSWERS_KEY, []);
}

function writeLocalAnswers(answers: GameAnswerRow[]): void {
  localStorage.setItem(LOCAL_ANSWERS_KEY, JSON.stringify(answers));
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function createId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
