import { curriculumManifest } from '../../data/curriculumManifest';

export function CurriculumManifestView() {
  return (
    <div className="space-y-4">
      {curriculumManifest.map((m) => (
        <details key={m.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <summary className="cursor-pointer font-bold text-navy">Stage {m.stageId}: {m.title} <span className="font-normal text-slate-500">({m.moduleChapter})</span></summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase text-slate-500">Learning Objective</h4>
              <ul className="list-disc pl-5 text-sm text-slate-700">{m.learningObjective.map((o) => <li key={o}>{o}</li>)}</ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase text-slate-500">Connected Scenarios</h4>
              <p className="text-sm text-slate-700">{m.connectedGameScenarios.join(', ')}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
