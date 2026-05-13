import { Copy, Printer } from 'lucide-react';
import { useState } from 'react';
import type { PlayerProfile, ReportSummary, Scores } from '../../types/game';
import { reportSummaryText } from '../../lib/report';
import { Button } from '../common/Button';
import { ScorePanel } from './ScorePanel';

export function FinalReport({ profile, scores, report, onCopyDone }: { profile: PlayerProfile; scores: Scores; report: ReportSummary; onCopyDone?: () => void }) {
  const [status, setStatus] = useState<string | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(reportSummaryText(profile, report));
      setStatus('Summary berhasil disalin.');
      onCopyDone?.();
    } catch {
      setStatus('Gagal menyalin summary. Browser tidak mengizinkan clipboard.');
    }
  }

  function printReport() {
    setStatus('Membuka dialog print.');
    window.print();
  }

  return (
    <section className="flex-grow p-6 sm:p-10">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold text-navy">Final Report</h2>
          <p className="text-slate-500">{profile.participantName} • {profile.participantRole}</p>
        </div>
        <div className="no-print flex gap-2">
          <Button variant="ghost" icon={<Printer className="h-4 w-4" />} onClick={printReport}>Print</Button>
          <Button variant="ghost" icon={<Copy className="h-4 w-4" />} onClick={copy}>Copy Summary</Button>
        </div>
      </div>
      {status && <p className={`no-print mb-4 rounded-lg p-3 text-sm font-semibold ${status.startsWith('Gagal') ? 'bg-red-50 text-danger' : 'bg-teal/10 text-teal'}`}>{status}</p>}
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-bold uppercase text-slate-500">Total Score</p>
          <p className="mb-2 text-6xl font-black text-navy">{report.totalScore}</p>
          <p className="mb-5 text-xl font-bold text-teal">{report.rating}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Info label="Strongest Area" value={report.strongestArea} />
            <Info label="Weakest Area" value={report.weakestArea} />
            <Info label="Badge" value={report.badge} />
            <Info label="Mode" value={profile.mode} />
          </div>
          <h3 className="mb-2 mt-6 font-bold text-navy">Recommended 30-Day Action Plan</h3>
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {report.actionPlan.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <ScorePanel scores={scores} />
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className="mt-1 font-bold text-slate-800">{value}</p></div>;
}
