import { useEffect, useMemo, useState } from 'react';
import { scenarios } from '../data/scenarios';
import { AppShell } from '../components/layout/AppShell';
import { LandingPage } from '../components/game/LandingPage';
import { PlayerSetup } from '../components/game/PlayerSetup';
import { Onboarding } from '../components/game/Onboarding';
import { StageSelector } from '../components/game/StageSelector';
import { LearnMode } from '../components/game/LearnMode';
import { ScenarioCard } from '../components/game/ScenarioCard';
import { FinalReport } from '../components/game/FinalReport';
import { TrainerLogin } from '../components/trainer/TrainerLogin';
import { TrainerDashboard } from '../components/trainer/TrainerDashboard';
import { buildReport, initialScores, applyScoreDelta } from '../lib/scoring';
import { clearDraft, loadDraft, saveDraft } from '../lib/storage';
import { completeAttempt, createAttempt, saveAnswer } from '../lib/gameRepository';
import { hasTrainerAccess } from '../lib/trainerAuth';
import type { GameDraft, PlayerProfile, ScenarioOption, Scores } from '../types/game';
import { getRoute, navigate, type Route } from './routes';

type View = 'landing' | 'setup' | 'onboarding' | 'selector' | 'learn' | 'scenario' | 'report';

export function App() {
  const [route, setRoute] = useState<Route>(getRoute());
  const [view, setView] = useState<View>(() => (loadDraft() ? 'selector' : 'landing'));
  const [draft, setDraft] = useState<GameDraft | null>(() => loadDraft());
  const [scores, setScores] = useState<Scores>(() => loadDraft()?.scores || initialScores);
  const [selectedStage, setSelectedStage] = useState(() => scenarios[loadDraft()?.currentScenarioIndex || 0]?.stage || 1);
  const [trainerAllowed, setTrainerAllowed] = useState(hasTrainerAccess());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [answerSaved, setAnswerSaved] = useState(false);
  const [pendingOption, setPendingOption] = useState<ScenarioOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const listener = () => setRoute(getRoute());
    window.addEventListener('popstate', listener);
    return () => window.removeEventListener('popstate', listener);
  }, []);

  useEffect(() => {
    if (draft) saveDraft({ ...draft, scores });
  }, [draft, scores]);

  const stageScenarios = useMemo(() => scenarios.filter((s) => s.stage === selectedStage), [selectedStage]);
  const currentScenario = scenarios[draft?.currentScenarioIndex || 0];
  const currentStageIndex = stageScenarios.findIndex((s) => s.id === currentScenario?.id);
  const completedStages = useMemo(() => {
    const ids = new Set(draft?.completedScenarioIds || []);
    return [...new Set(scenarios.filter((s) => ids.has(s.id)).map((s) => s.stage))].filter((stage) => scenarios.filter((s) => s.stage === stage).every((s) => ids.has(s.id)));
  }, [draft]);
  const report = buildReport(scores);

  async function start(profile: PlayerProfile) {
    setError(null);
    setLoading(true);
    try {
      const attempt = await createAttempt(profile);
      const nextDraft: GameDraft = {
        attemptId: attempt.id,
        profile,
        currentScenarioIndex: 0,
        completedScenarioIds: [],
        scores: initialScores,
        answers: [],
      };
      setDraft(nextDraft);
      setScores(initialScores);
      setSelectedStage(1);
      saveDraft(nextDraft);
      setView('onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal membuat attempt.');
    } finally {
      setLoading(false);
    }
  }

  async function answer(option: ScenarioOption) {
    if (!draft || !currentScenario) return;
    setPendingOption(option);
    setAnswerSaved(false);
    const nextScores = applyScoreDelta(scores, option.scoreDelta);
    const nextDraft = {
      ...draft,
      scores: nextScores,
      completedScenarioIds: [...new Set([...draft.completedScenarioIds, currentScenario.id])],
      answers: [...draft.answers, { scenarioId: currentScenario.id, selectedOptionId: option.id }],
    };
    setScores(nextScores);
    setDraft(nextDraft);
    setSaving(true);
    setError(null);
    try {
      await saveAnswer(draft.attemptId, currentScenario, option, nextScores);
      setAnswerSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Jawaban gagal disimpan.');
    } finally {
      setSaving(false);
    }
  }

  async function retryAnswerSave() {
    if (!draft || !currentScenario || !pendingOption) return;
    setSaving(true);
    setError(null);
    try {
      await saveAnswer(draft.attemptId, currentScenario, pendingOption, scores);
      setAnswerSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Jawaban gagal disimpan.');
    } finally {
      setSaving(false);
    }
  }

  async function nextScenario() {
    if (!draft) return;
    const nextIndex = draft.currentScenarioIndex + 1;
    setAnswerSaved(false);
    setPendingOption(null);
    if (nextIndex >= scenarios.length) {
      await finishGame();
      return;
    }
    const next = scenarios[nextIndex];
    setDraft({ ...draft, currentScenarioIndex: nextIndex });
    setSelectedStage(next.stage);
    if (next.stage !== currentScenario?.stage) setView('selector');
  }

  async function finishGame() {
    if (!draft) return;
    setSaving(true);
    try {
      await completeAttempt(draft.attemptId, { scores, ...report });
      setView('report');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Final report gagal disimpan.');
    } finally {
      setSaving(false);
    }
  }

  function selectStage(stage: number) {
    const index = scenarios.findIndex((s) => s.stage === stage);
    if (index >= 0 && draft) setDraft({ ...draft, currentScenarioIndex: index });
    setSelectedStage(stage);
    setView('learn');
  }

  function reset() {
    clearDraft();
    setDraft(null);
    setScores(initialScores);
    setSelectedStage(1);
    setView('landing');
    setError(null);
    setAnswerSaved(false);
    setPendingOption(null);
    navigate('/');
  }

  if (route === 'trainer') {
    return (
      <AppShell>
        {trainerAllowed ? <TrainerDashboard onLogout={() => setTrainerAllowed(false)} /> : <TrainerLogin onSuccess={() => setTrainerAllowed(true)} />}
      </AppShell>
    );
  }

  return (
    <AppShell profile={draft?.profile} onReset={reset}>
      {view === 'landing' && <LandingPage onStart={() => setView('setup')} onTrainer={() => navigate('/trainer')} />}
      {view === 'setup' && <PlayerSetup loading={loading} error={error} onSubmit={start} />}
      {view === 'onboarding' && <Onboarding onContinue={() => setView('selector')} />}
      {view === 'selector' && <StageSelector currentStage={selectedStage} completedStages={completedStages} onSelect={selectStage} />}
      {view === 'learn' && <LearnMode stage={selectedStage} onContinue={() => setView('scenario')} />}
      {view === 'scenario' && currentScenario && draft && (
        <ScenarioCard
          stageScenarios={stageScenarios}
          scenario={currentScenario}
          scenarioIndex={Math.max(0, currentStageIndex)}
          scores={scores}
          saving={saving}
          answerSaved={answerSaved}
          error={error}
          onAnswer={answer}
          onRetryAnswer={retryAnswerSave}
          onNext={nextScenario}
        />
      )}
      {view === 'report' && draft && <FinalReport profile={draft.profile} scores={scores} report={report} />}
    </AppShell>
  );
}
