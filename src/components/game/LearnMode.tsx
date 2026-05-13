import { BookOpen, CheckCircle2 } from 'lucide-react';
import { curriculumManifest } from '../../data/curriculumManifest';
import { Button } from '../common/Button';

export function LearnMode({ stage, onContinue }: { stage: number; onContinue: () => void }) {
  const manifest = curriculumManifest.find((m) => m.stageId === stage) || curriculumManifest[0];
  return (
    <section className="flex-grow overflow-y-auto p-6 sm:p-10">
      <div className="mb-5 flex items-center gap-3">
        <BookOpen className="h-9 w-9 text-teal" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{manifest.trainerCode} • {manifest.moduleChapter}</p>
          <h2 className="text-3xl font-bold text-navy">{manifest.title}</h2>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-2 font-bold text-navy">Learning Objective</h3>
          <ul className="mb-5 space-y-2">
            {manifest.learningObjective.map((o) => <li className="flex gap-2 text-sm text-slate-700" key={o}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{o}</li>)}
          </ul>
          <h3 className="mb-2 font-bold text-navy">Summary</h3>
          <p className="text-slate-600">{manifest.moduleSummary}</p>
        </div>
        <div className="space-y-3">
          <Info title="Analogy" value={manifest.participantLearningCapsule.analogy} />
          <Info title="Common Mistake" value={manifest.participantLearningCapsule.commonMistake} />
          <Info title="Practical Reminder" value={manifest.participantLearningCapsule.practicalReminder} />
        </div>
      </div>
      <div className="mt-6"><Button onClick={onContinue}>Lanjut ke Scenario Stage</Button></div>
    </section>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="mb-1 text-xs font-bold uppercase text-slate-500">{title}</p><p className="text-sm text-slate-700">{value}</p></div>;
}
