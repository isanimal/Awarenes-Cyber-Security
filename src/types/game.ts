export type Mode = 'individual' | 'team';
export type FeedbackType = 'good' | 'risky' | 'dangerous';
export type ScoreKey = 'security' | 'operation' | 'compliance' | 'recovery';

export type ScoreDelta = Record<ScoreKey, number>;
export type Scores = Record<ScoreKey, number>;

export interface ScenarioOption {
  id: string;
  label: string;
  feedbackType: FeedbackType;
  explanation: string;
  scoreDelta: ScoreDelta;
  recommendedAction: string;
}

export interface Scenario {
  id: string;
  stage: number;
  stageTitle: string;
  title: string;
  context: string;
  scenarioText: string;
  question: string;
  tags: string[];
  frameworkFunction: string;
  trainerPoints: string[];
  options: ScenarioOption[];
}

export interface PlayerProfile {
  participantName: string;
  participantRole: string;
  mode: Mode;
  teamName?: string;
}

export interface AnswerRecord {
  scenarioId: string;
  selectedOptionId: string;
}

export interface GameDraft {
  attemptId: string;
  profile: PlayerProfile;
  currentScenarioIndex: number;
  completedScenarioIds: string[];
  scores: Scores;
  answers: AnswerRecord[];
}

export interface ReportSummary {
  totalScore: number;
  rating: string;
  strongestArea: string;
  weakestArea: string;
  badge: string;
  actionPlan: string[];
}

export interface CurriculumManifestItem {
  id: string;
  stageId: number;
  moduleChapter: string;
  title: string;
  trainerCode: string;
  estimatedSlideRange: string;
  keyMessage: string;
  moduleSummary: string;
  learningObjective: string[];
  participantLearningCapsule: {
    shortExplanation: string;
    keyPoints: string[];
    analogy: string;
    commonMistake: string;
    practicalReminder: string;
  };
  trainerTalkingPoints: string[];
  suggestedSlideTitles: Array<{ title: string; points: string[] }>;
  connectedGameScenarios: string[];
  discussionQuestions: string[];
  expectedTakeaway: string;
  relatedFramework: string[];
  relatedControls: string[];
  visualSuggestion: string;
}
