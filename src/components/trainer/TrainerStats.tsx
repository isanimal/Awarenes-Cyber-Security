import type { GameAnswerRow, GameAttemptRow } from '../../types/database';

export function TrainerStats({ attempts, answers }: { attempts: GameAttemptRow[]; answers: GameAnswerRow[] }) {
  const completed = attempts.filter((a) => a.status === 'completed');
  const inProgress = attempts.filter((a) => a.status === 'in_progress');
  const avg = (key: keyof GameAttemptRow) => completed.length ? Math.round(completed.reduce((sum, a) => sum + Number(a[key] || 0), 0) / completed.length) : 0;
  const weakMap = new Map<string, number>();
  completed.forEach((a) => a.weakest_area && weakMap.set(a.weakest_area, (weakMap.get(a.weakest_area) || 0) + 1));
  const weakest = [...weakMap.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  const decision = {
    good: answers.filter((a) => a.feedback_type === 'good').length,
    risky: answers.filter((a) => a.feedback_type === 'risky').length,
    dangerous: answers.filter((a) => a.feedback_type === 'dangerous').length,
  };
  const decisionTotal = decision.good + decision.risky + decision.dangerous;
  const scoreBars = [
    { label: 'Total', value: avg('total_score'), color: 'bg-navy' },
    { label: 'Security', value: avg('security_score'), color: 'bg-teal' },
    { label: 'Operation', value: avg('operation_score'), color: 'bg-lightblue' },
    { label: 'Compliance', value: avg('compliance_score'), color: 'bg-slate-700' },
    { label: 'Recovery', value: avg('recovery_score'), color: 'bg-warning' },
  ];
  const decisionBars = [
    { label: 'Good', value: decision.good, color: 'bg-teal' },
    { label: 'Risky', value: decision.risky, color: 'bg-warning' },
    { label: 'Dangerous', value: decision.dangerous, color: 'bg-danger' },
  ];

  const cards = [
    ['Total Attempts', attempts.length],
    ['Completed', completed.length],
    ['In Progress', inProgress.length],
    ['Avg Total', avg('total_score')],
    ['Weakest Area', weakest],
    ['Avg Security', avg('security_score')],
    ['Avg Operation', avg('operation_score')],
    ['Avg Compliance', avg('compliance_score')],
    ['Avg Recovery', avg('recovery_score')],
  ];
  return (
    <>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-black text-navy">{value}</p>
          </div>
        ))}
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Decision label="Good" value={decision.good} className="text-teal" />
        <Decision label="Risky" value={decision.risky} className="text-warning" />
        <Decision label="Dangerous" value={decision.dangerous} className="text-danger" />
      </div>
      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-bold text-navy">Average Score from Completed Attempts</h3>
          <div className="space-y-3">
            {scoreBars.map((bar) => (
              <Bar key={bar.label} label={bar.label} value={bar.value} max={100} color={bar.color} suffix="/100" />
            ))}
          </div>
          {completed.length === 0 && <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-500">Belum ada peserta yang menyelesaikan game.</p>}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-bold text-navy">Decision Summary from Game Answers</h3>
          <div className="space-y-3">
            {decisionBars.map((bar) => (
              <Bar key={bar.label} label={bar.label} value={bar.value} max={Math.max(decisionTotal, 1)} color={bar.color} />
            ))}
          </div>
          {decisionTotal === 0 && <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-500">Belum ada jawaban peserta yang tersimpan.</p>}
        </div>
      </div>
    </>
  );
}

function Decision({ label, value, className }: { label: string; value: number; className: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"><p className="text-xs font-bold uppercase text-slate-500">{label} Decisions</p><p className={`text-2xl font-black ${className}`}>{value}</p></div>;
}

function Bar({ label, value, max, color, suffix = '' }: { label: string; value: number; max: number; color: string; suffix?: string }) {
  const width = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-black text-navy">{value}{suffix}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
