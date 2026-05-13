import type { FeedbackType, Mode, ScoreDelta, Scores } from './game';

export interface GameAttemptRow {
  id: string;
  participant_name: string;
  participant_role: string;
  mode: Mode;
  team_name: string | null;
  started_at: string;
  completed_at: string | null;
  total_score: number;
  security_score: number;
  operation_score: number;
  compliance_score: number;
  recovery_score: number;
  rating: string | null;
  strongest_area: string | null;
  weakest_area: string | null;
  badge: string | null;
  status: 'in_progress' | 'completed';
  created_at: string;
}

export interface GameAnswerRow {
  id: string;
  attempt_id: string;
  scenario_id: string;
  stage: number;
  selected_option_id: string;
  selected_option_label: string;
  feedback_type: FeedbackType;
  score_delta: ScoreDelta;
  score_after: Scores;
  answered_at: string;
}

export interface Database {
  public: {
    Tables: {
      game_attempts: {
        Row: GameAttemptRow;
        Insert: Partial<GameAttemptRow> & Pick<GameAttemptRow, 'participant_name' | 'participant_role' | 'mode'>;
        Update: Partial<GameAttemptRow>;
        Relationships: [];
      };
      game_answers: {
        Row: GameAnswerRow;
        Insert: Omit<GameAnswerRow, 'id' | 'answered_at'>;
        Update: Partial<GameAnswerRow>;
        Relationships: [
          {
            foreignKeyName: 'game_answers_attempt_id_fkey';
            columns: ['attempt_id'];
            isOneToOne: false;
            referencedRelation: 'game_attempts';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
