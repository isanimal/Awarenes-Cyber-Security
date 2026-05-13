import type { GameDraft } from '../types/game';

const DRAFT_KEY = 'stv_player_draft';

export function saveDraft(draft: GameDraft): void {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function loadDraft(): GameDraft | null {
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GameDraft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
}
