import type { Scores } from '../../types/game';

export function ScorePanel({ scores }: { scores: Scores }) {
  const rows = [
    ['Security', scores.security, 'bg-teal'],
    ['Operation', scores.operation, 'bg-lightblue'],
    ['Compliance', scores.compliance, 'bg-navy'],
    ['Recovery', scores.recovery, 'bg-warning'],
  ] as const;
  return (
    <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-4 font-bold text-navy">Score Panel</h3>
      <div className="space-y-4">
        {rows.map(([label, value, color]) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-xs font-bold text-slate-600"><span>{label}</span><span>{value}</span></div>
            <div className="h-2 rounded-full bg-slate-200"><div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </div>
    </aside>
  );
}
