import { scenarios } from '../../data/scenarios';
import { curriculumManifest } from '../../data/curriculumManifest';

export function ContentAlignmentMatrix() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr><th className="px-4 py-3">Stage</th><th className="px-4 py-3">Module Chapter</th><th className="px-4 py-3">Scenario</th><th className="px-4 py-3">Learning Objective</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {curriculumManifest.map((m) => {
              const stageScenarios = scenarios.filter((s) => s.stage === m.stageId);
              return stageScenarios.map((s, index) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-bold">Stage {m.stageId}</td>
                  <td className="px-4 py-3">{m.moduleChapter}</td>
                  <td className="px-4 py-3">{s.title}</td>
                  <td className="px-4 py-3">{index === 0 ? m.learningObjective.join('; ') : ''}</td>
                  <td className="px-4 py-3 font-bold text-teal">Aligned</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
