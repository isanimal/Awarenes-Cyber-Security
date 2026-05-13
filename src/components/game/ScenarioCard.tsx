import { useState } from 'react';
import type { Scenario, ScenarioOption, Scores } from '../../types/game';
import { Badge } from '../common/Badge';
import { FeedbackPanel } from './FeedbackPanel';
import { OptionButton } from './OptionButton';
import { ProgressMap } from './ProgressMap';
import { ScorePanel } from './ScorePanel';

export function ScenarioCard({
  stageScenarios,
  scenario,
  scenarioIndex,
  scores,
  saving,
  answerSaved,
  error,
  onAnswer,
  onRetryAnswer,
  onNext,
}: {
  stageScenarios: Scenario[];
  scenario: Scenario;
  scenarioIndex: number;
  scores: Scores;
  saving: boolean;
  answerSaved: boolean;
  error?: string | null;
  onAnswer: (option: ScenarioOption) => void;
  onRetryAnswer: () => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<ScenarioOption | null>(null);

  function choose(option: ScenarioOption) {
    if (selected) return;
    setSelected(option);
    onAnswer(option);
  }

  function next() {
    setSelected(null);
    onNext();
  }

  return (
    <section className="grid flex-grow gap-5 overflow-y-auto p-6 lg:grid-cols-[1fr_280px] sm:p-8">
      <div>
        <ProgressMap scenarios={stageScenarios} currentIndex={scenarioIndex} />
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone="blue">{scenario.stageTitle}</Badge>
            {scenario.tags.map((t) => <Badge key={t}>{t}</Badge>)}
          </div>
          <h2 className="mb-2 text-2xl font-bold text-navy">{scenario.title}</h2>
          <p className="mb-4 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-600">{scenario.context}</p>
          <p className="mb-4 whitespace-pre-line text-slate-700">{scenario.scenarioText.replace(/\*/g, '')}</p>
          <h3 className="mb-3 font-bold text-navy">{scenario.question}</h3>
          <div className="space-y-3">
            {scenario.options.map((option) => (
              <OptionButton key={option.id} option={option} disabled={Boolean(selected)} selected={selected?.id === option.id} onClick={() => choose(option)} />
            ))}
          </div>
          {selected && <FeedbackPanel option={selected} saving={saving} saved={answerSaved} error={error} onRetry={onRetryAnswer} onNext={next} />}
        </div>
      </div>
      <ScorePanel scores={scores} />
    </section>
  );
}
