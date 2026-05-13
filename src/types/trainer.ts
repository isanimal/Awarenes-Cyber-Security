import type { GameAnswerRow, GameAttemptRow } from './database';

export interface TrainerData {
  attempts: GameAttemptRow[];
  answers: GameAnswerRow[];
}
