import type { Scenario } from '../../types/game';

export function ProgressMap({ scenarios, currentIndex }: { scenarios: Scenario[]; currentIndex: number }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {scenarios.map((s, index) => (
        <span key={s.id} className={`h-2.5 w-8 rounded-full ${index < currentIndex ? 'bg-teal' : index === currentIndex ? 'bg-lightblue' : 'bg-slate-200'}`} title={s.title} />
      ))}
    </div>
  );
}
